import React, { useEffect, useState } from "react";
import { Collapse, Row, Col } from "antd";
import govImg from "../../assets/images/navImages/gov.svg";
import secImg from "../../assets/images/navImages/sec.svg";
import { dashboardMapUrl, is3dHighlightOnly } from "../../config";
import { getFeatureDomainName, getLayerId, groupBy, highlightFeature, queryTask, showLoading } from "../../helper/common_func";
import { layersSetting } from "../../helper/layers";
import Fade from "react-reveal/Fade";
import Polygon from "@arcgis/core/geometry/Polygon";

export default function DashGovern(props) {
  const { Panel } = Collapse;
  const [sectors, setSectors] = useState([]);
  const [selectGovId, setSelectGovId] = useState(null);

  var clickHandler;
  var govFeatures;

  const gotoFeature = (feature) => {
    if (feature) {
      highlightFeature(feature, props.map, {
        layerName: "SelectGraphicLayer",
        isZoom: !is3dHighlightOnly,
        isZoomToCenter: true,
        zoomLevel:10,
      });
    }
  }

  const clearFeatures = () => {
    props.map.findLayerById("SelectGraphicLayer").removeAll();
  }

  const getGovernorateStatistics = (g) => {

    setSelectGovId(g.attributes.OBJECTID);

    highlightFeature(g, props.map, {
      layerName: "ZoomGraphicLayer",
      isZoom: !is3dHighlightOnly,
      isHighlighPolygonBorder: true,
    });

    props.getGovernorateStatistics(g.attributes.A_GOVERNORATE_NAME_Code || g.attributes.A_GOVERNORATE_NAME);
  }

  const getGovernorateStatisticsBySector = (sector_no) => {

    if (sector_no)
      props.getGovernorateStatisticsBySector(sector_no);

    setSelectGovId(null);
  }

  useEffect(() => {

    let layerdId = getLayerId(props.map.__mapInfo, "Governorate_Boundary");
    let sectors = [];
    showLoading(true);


    clickHandler = props.map.view.on("click", (event) => {
      govFeatures.forEach((gov)=>{
        var temp = new Polygon(gov.geometry);
        if(temp.contains(event.mapPoint))
        {
          getGovernorateStatistics(gov);
        }
      })
    });

    queryTask({
      url: dashboardMapUrl + "/" + layerdId,
      outFields: layersSetting["Governorate_Boundary"].outFields,
      where: "1=1",
      returnGeometry: true,
      callbackResult: ({ features }) => {
        
        govFeatures = features;

        getFeatureDomainName(features, layerdId, false, dashboardMapUrl).then((res) => {

          let data = groupBy(res, "SECTOR_NO_Code");
          Object.keys(data).forEach((key, index) => {
            if (data[key][0].attributes.SECTOR_NO != null) {
              sectors.push({
                id: data[key][0].attributes.SECTOR_NO_Code,
                name: "القطاع " + data[key][0].attributes.SECTOR_NO,
                className: "sec" + (index + 1),
                govern: data[key],
              })
            }
          });
          setSectors(sectors);
          showLoading(false);

        })


      }

    });

    return ()=>{
      clickHandler.remove();
    }

  }, []);

  return (
    <Collapse accordion className="dashSectors dashGov" onChange={getGovernorateStatisticsBySector}>

      {sectors.map((s) => (
        <Panel
          header={
            <>
              <img alt="navImg" src={secImg} className="mx-2" /> {s.name}
            </>
          }
          key={s.id}
          className={s.className}
        >
          {" "}
          {s.govern.map((g) => (
            <div className={g.attributes.OBJECTID == selectGovId ? "govDivSelect" : "govDiv"} onMouseLeave={clearFeatures.bind(this)} onMouseEnter={gotoFeature.bind(this, g)} onClick={getGovernorateStatistics.bind(this, g)}>
              <img alt="navImg" src={govImg} className="mx-2 govImg" /> {g.attributes.A_GOVERNORATE_NAME}
            </div>
          ))}
        </Panel>
      ))}
    </Collapse>
  );
}
