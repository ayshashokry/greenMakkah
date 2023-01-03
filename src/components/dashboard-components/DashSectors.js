import React, { useEffect, useState } from "react";
import Fade from "react-reveal/Fade";
import { dashboardMapUrl, is3dHighlightOnly } from "../../config";
import { getFeatureDomainName, getLayerId, highlightFeature, queryTask, showLoading } from "../../helper/common_func";
import { layersSetting } from "../../helper/layers";
import Polygon from "@arcgis/core/geometry/Polygon";

export default function DashSectors(props) {
  const animatioDelays = [0, 500, 600, 700];
  const [sectors, setSectors] = useState([]);
  const [activeSector, setActiveSector] = useState("");

  var sectorFeatures;
  var clickHandler;

  useEffect(() => {

    let layerdId = getLayerId(props.map.__mapInfo, "Sectors");
    showLoading(true);

    clickHandler = props.map.view.on("click", (event) => {
      sectorFeatures.forEach((sector)=>{
        var temp = new Polygon(sector.geometry);
        if(temp.contains(event.mapPoint))
        {
          handleSelectSector(sector);
        }
      })
    });

    queryTask({
      url: dashboardMapUrl + "/" + layerdId,
      outFields: layersSetting["Sectors"].outFields,
      where: "1=1",
      returnGeometry: true,
      callbackResult: ({ features }) => {

        getFeatureDomainName(features, layerdId, false, dashboardMapUrl).then((res) => {
          debugger
          res.map((feature, index) => {
            feature.id = feature.attributes.SECTOR_NO_Code;
            feature.name = "القطاع " + feature.attributes.SECTOR_NO

          });

          sectorFeatures = res;

          res = res.sort((a, b) => a.id - b.id);

          res.map((s, index) => {
            s.animatioDelay = animatioDelays[index]
          });

          setSectors(res);
          showLoading(false);

        })

      }

    });

    return ()=>{
      clickHandler.remove();
    }
    
  }, []);

  const gotoFeature = (feature) => {
    if (feature) {
      highlightFeature(feature, props.map, {
        layerName: "SelectGraphicLayer",
        isZoom: !is3dHighlightOnly,
        isZoomToCenter: true,
        zoomLevel: 10
      });
    }
  }

  const clearFeatures = () => {
    props.map.findLayerById("SelectGraphicLayer").removeAll();
  }

  const handleSelectSector = (s) => {

    highlightFeature(s, props.map, {
      layerName: "ZoomGraphicLayer",
      isZoom: !is3dHighlightOnly,
      isHighlighPolygonBorder: true
    });

    setActiveSector(s.id);
    props.getSectorStatistics(s.id);
  };
  return (
    <ul className="dashSectors">
      {sectors.map((s) => (
        <Fade right delay={s.animatioDelay}>
          <li
            onMouseLeave={clearFeatures.bind(this)}
            onMouseEnter={gotoFeature.bind(this, s)}
            className="sectorDiv"
            id={s.id === activeSector ? "activeSector" : ""}
            onClick={() => handleSelectSector(s)}
          >
            {s.name}
          </li>
        </Fade>
      ))}
    </ul>
  );
}
