import React, { useEffect, useState } from "react";
import DefaultBarChart from "./dashDetails/DefaultBarChart";
import GovernBarChart from "./dashDetails/GovernBarChart";
import SectorsBarChart from "./dashDetails/SectorsBarChart";
import DefaultTable from "./dashTables/DefaultTable";
import SectorsTable from "./dashTables/SectorsTable";
import GovernTable from "./dashTables/GovernTable";
import { dashboardMapUrl } from "../../config";
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { getFeatureDomainName, getLayerId, queryTask, showLoading } from "../../helper/common_func";

export default function DashDetails(props) {


  const [regionData, setRegionData] = useState(null);
  const [sectorData, setSectornData] = useState(null);
  const [govData, setGovData] = useState(null);

  useEffect(() => {
    debugger
    showLoading(true);
    let where = "A_REGION_NAME is not null and SECTOR_NO is null";

    if (props.routeName == "sector") {
      where = props.where || "SECTOR_NO is not null and A_GOVERNORATE_NAME is null";
    }
    else if (props.routeName == "gov") {
      where = props.where || "A_GOVERNORATE_NAME is not null";
    }

    where += " and YEAR = '"+ window.__HijriYear +"'";

    let layerdId = getLayerId(props.map.__mapInfo, "INDICATORS");
    queryTask({
      url: dashboardMapUrl + "/" + layerdId,
      outFields: ['*'],
      where: where,
      returnGeometry: false,
      callbackResult: ({ features }) => {
        debugger
        if (features.length > 0) {
          if (props.routeName === "makkah") {
            setRegionData(features[0]);
          }
          else if (props.routeName == "sector") {
            getFeatureDomainName(features, layerdId, false, dashboardMapUrl).then((res) => {
              setSectornData(res);
            });
          }
          else if (props.routeName == "gov") {
            getFeatureDomainName(features, layerdId, false, dashboardMapUrl).then((res) => {
              setGovData(res);
            });
          }
        }
        showLoading(false);
      }
    });

  }, [props.routeName, props.where,props.year]);

  const setPrintData = () => {
    let data = regionData;

    if(props.routeName == "sector")
      data = sectorData;
    else if(props.routeName == "gov")
      data = govData;

    localStorage.setItem("chartsData", JSON.stringify(data));
  }

  return (
    <div className="dashDetails">
      <h3 className="dashDetailsTitle pr-4 mt-5 mb-3">التفاصيل</h3>

      <Link to={"/dashboardPrint/" + props.routeName} target="_blank">
        <Button className="printBtn mx-5" onClick={setPrintData()}>
          <FontAwesomeIcon icon={faPrint} className="mx-2" />
          طباعة
        </Button>
      </Link>

      {props.routeName === "makkah" && regionData ? (
        <>
          <DefaultBarChart data={regionData} />
          <DefaultTable data={regionData} />
        </>
      ) : null}
      {props.routeName === "sector" && sectorData ? (
        <>
          <SectorsBarChart data={sectorData} />
          <SectorsTable changeRoute={props.changeRoute} data={sectorData} />
        </>
      ) : null}
      {props.routeName === "gov" && govData ? (
        <>
          <GovernBarChart data={govData} />
          <GovernTable changeRoute={props.changeRoute} data={govData} />
        </>
      ) : null}
    </div>
  );
}
