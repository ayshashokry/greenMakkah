import React, { useState, useEffect, useContext } from "react";
//import Style
import "./dashboard.css";
//import Components
import DashMapstatistics from "../../components/dashboard-components/DashMapstatistics";
import DashMapChecks from "../../components/dashboard-components/DashMapChecks";
import DashSectors from "../../components/dashboard-components/DashSectors";
import DashGovern from "../../components/dashboard-components/DashGovern";
import DashDetails from "../../components/dashboard-components/DashDetails";
import Header from "../../layouts/Header";
import govImg from "../../assets/images/navImages/gov.svg";
import secImg from "../../assets/images/navImages/sec.svg";
import areaImg from "../../assets/images/navImages/area.svg";
import MapComponent from "../../components/explorerComponents/MapComponent";
import { dashboardMapUrl } from "../../config";

import Fade from "react-reveal/Fade";
import { dashboardTabsTitle } from "../../helper/layers";
import {
  draw3dBars,
  getLayerId,
  queryTask,
  showLoading,
} from "../../helper/common_func";
import LoadingComponent from "../../components/explorerComponents/LoadingComponent";
import DashTablePrint from "../../components/dashboard-components/dashTables/DashTablePrint";
import { useNavigate } from "react-router-dom";

function Dashboard(props) {
  const [routeName, setNavRouteName] = useState("makkah");
  const [isMapLoaded, setMapLoaded] = useState(null);
  const [activeDashBoardFields, setShowLegend] = useState(null);
  const [dashBoardInfo, setDashboardInfo] = useState(null);
  const [isDrawEnd, setDrawEnd] = useState(null);
  const [loggedIn] = useState(localStorage.user);

  let navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login", { replace: true });
    }
  }, [loggedIn]);
  const [navLinks] = useState([
    {
      id: 1,
      name: "المحافظات",
      key: "gov",
      icon: govImg,
      layerName: "Governorate_Boundary",
      chart_where: "1=1",
      mappingField: "A_GOVERNORATE_NAME",
      indicatorMappingField: "A_GOVERNORATE_NAME",
      toLink: "/dashboard",
    },
    {
      id: 2,
      name: "القطاعات",
      key: "sector",
      icon: secImg,
      layerName: "Sectors",
      chart_where: "1=1",
      mappingField: "SECTOR_NO",
      indicatorMappingField: "SECTOR_NO",
      toLink: "/dashboard",
    },
    {
      id: 3,
      name: "منطقة مكة المكرمة",
      key: "makkah",
      icon: areaImg,
      layerName: "Region_Boundary",
      where: "A_REGION_NAME is not null and SECTOR_NO is null",
      statistics_where: "A_REGION_NAME is not null and SECTOR_NO is null",
      chart_where: "A_NAME is not null",
      mappingField: "A_NAME",
      indicatorMappingField: "A_REGION_NAME",
      toLink: "/dashboard",
    },
  ]);

  const [dashBoardWhereFilter, setDashboardWhereFilter] = useState({
    ...navLinks.find((n) => {
      return n.key == "makkah";
    }),
    layerWhere: "A_NAME is not null",
    indicatorWhere: "A_GOVERNORATE_NAME is null and SECTOR_NO is null",
  });

  const changeRoute = (route) => {

    setNavRouteName(route);
    let navLink = navLinks.find((n) => {
      return n.key == route;
    });

    let filterObj;

    if (isMapLoaded && route == "makkah") {
      filterObj = {
        ...navLinks.find((n) => {
          return n.key == "makkah";
        }),
        layerWhere: navLink.chart_where,
        indicatorWhere: "A_GOVERNORATE_NAME is null and SECTOR_NO is null",
      };
      setDashboardWhereFilter(filterObj);
    } else if (isMapLoaded && route == "sector") {
      setDrawEnd(false);
      filterObj = {
        ...navLinks.find((n) => {
          return n.key == "sector";
        }),
        layerWhere: navLink.chart_where,
        indicatorWhere: "A_GOVERNORATE_NAME is null and SECTOR_NO is not null",
      };
      setDashboardWhereFilter(filterObj);
    } else if (isMapLoaded && route == "gov") {
      setDrawEnd(false);
      filterObj = {
        ...navLinks.find((n) => {
          return n.key == "gov";
        }),
        layerWhere: navLink.chart_where,
        indicatorWhere: "A_GOVERNORATE_NAME is not null",
      };
      setDashboardWhereFilter(filterObj);
    }

    drawChart(filterObj).then(() => {
      setDrawEnd(true);
      if (route == "makkah")
        getStatistics(navLink.where, isMapLoaded);
    });
  };

  const drawChart = (filterObj) => {
    return new Promise((resolve, reject) => {
      draw3dBars(isMapLoaded, dashboardMapUrl, filterObj).then(() => {
        setShowLegend(activeDashBoardFields || dashboardTabsTitle);
        resolve(true);
      });
    });
  };

  const getStatistics = (where, map) => {
    
    let layerdId = getLayerId(map.__mapInfo, "INDICATORS");

    showLoading(true);

    where += " and YEAR = '" + window.__HijriYear + "'";

    queryTask({
      url: dashboardMapUrl + "/" + layerdId,
      outFields: [
        "INDIVIDUAL_SHARE",
        "LU_AREA",
        "TREES",
        "CROPLANDS",
        "GRASSLANDS",
        "SHRUBLANDS",
        "MANGROVES",
        "TOTAL_AREA",
        "LU_VS_TOTAL",
      ],
      where: where,
      returnGeometry: false,
      callbackResult: ({ features }) => {
        showLoading(false);
        if (features.length > 0) setDashboardInfo(features[0].attributes);
      },
    });
  };

  const getSectorStatistics = (sector_no) => {
    let filterObj = {
      ...navLinks.find((n) => {
        return n.key == "sector";
      }),
      layerWhere: "SECTOR_NO = " + sector_no,
      indicatorWhere:
        "SECTOR_NO = " + sector_no + " and A_GOVERNORATE_NAME is null",
    };
    setDashboardWhereFilter(filterObj);

    drawChart(filterObj).then(() => {
      getStatistics(
        "SECTOR_NO = " + sector_no + " and A_GOVERNORATE_NAME is null",
        isMapLoaded
      );
    });
  };

  const getGovernorateStatistics = (gov_code) => {
    let filterObj = {
      ...navLinks.find((n) => {
        return n.key == "gov";
      }),
      layerWhere: "A_GOVERNORATE_NAME = " + gov_code,
      indicatorWhere: "A_GOVERNORATE_NAME ='" + gov_code + "'",
    };
    setDashboardWhereFilter(filterObj);

    drawChart(filterObj).then(() => {
      getStatistics("A_GOVERNORATE_NAME ='" + gov_code + "'", isMapLoaded);
    });
  };

  const getGovernorateStatisticsBySector = (sector_no) => {
    let filterObj = {
      ...navLinks.find((n) => {
        return n.key == "gov";
      }),
      layerWhere:
        "SECTOR_NO = '" + sector_no + "' and A_GOVERNORATE_NAME is not null",
      indicatorWhere:
        "SECTOR_NO = '" + sector_no + "' and A_GOVERNORATE_NAME is not null",
    };
    setDashboardWhereFilter(filterObj);

    drawChart(filterObj).then(() => {
      getStatistics(filterObj.layerWhere, isMapLoaded);
    });
  };

  const onMapLoaded = (map) => {
    setMapLoaded(map);
    getStatistics(
      navLinks.find((n) => {
        return n.key == routeName;
      }).statistics_where,
      map
    );

    draw3dBars(map, dashboardMapUrl, dashBoardWhereFilter).then(() => {
      setShowLegend(dashboardTabsTitle);
    });
  };

  const changeYear=(year)=>{
    
    dashBoardWhereFilter.year = year; 
    setDashboardWhereFilter({...dashBoardWhereFilter});

    draw3dBars(isMapLoaded, dashboardMapUrl, dashBoardWhereFilter, activeDashBoardFields).then(() => {
      setShowLegend(activeDashBoardFields);
    });

    getStatistics(dashBoardWhereFilter.indicatorWhere,isMapLoaded);
    
  
  }

  const onShowLegend = (activeDashBoardFields) => {
    setShowLegend(activeDashBoardFields);
  };

  return (
    <div className="dashboardPage">
      <LoadingComponent />
      <Header
        changeRoute={changeRoute}
        defaultKey="makkah"
        dash
        navLinks={navLinks}
        map={isMapLoaded}
      />
      {window.location.pathname === "/greenmakkah/dashboard" ? (
        <>
          <div className="dashMap">
            <div
              style={{
                height: "100vh",
              }}
            >
              <MapComponent
                key="mapKey"
                type="3d"
                mapUrl={dashboardMapUrl}
                mapload={onMapLoaded}
              />
            </div>
            {activeDashBoardFields && (
              <Fade right collapse>
                <div className="LegendMenu">
                  {activeDashBoardFields
                    .slice(0)
                    .reverse()
                    .map((item) => {
                      return (
                        <div
                          style={{
                            display: "flex",
                            float: "right",
                            padding: "5px",
                          }}
                        >
                          <div style={{ marginRight: "10px" }}>
                            {item.alias}
                          </div>
                          <div
                            style={{
                              width: "20px",
                              height: "20px",
                              background:
                                "rgb(" +
                                item.color[0] +
                                "," +
                                item.color[1] +
                                "," +
                                item.color[2] +
                                ")",
                            }}
                          ></div>
                        </div>
                      );
                    })}
                </div>
              </Fade>
            )}
            {/* <DashMapTools /> */}
            <DashMapChecks
              map={isMapLoaded}
              onShowLegend={onShowLegend}
              changeYear={changeYear}
              dashBoardWhereFilter={dashBoardWhereFilter}
            />
            {dashBoardInfo && (
              <DashMapstatistics
                activeDashBoardFields={activeDashBoardFields}
                dashBoardInfo={dashBoardInfo}
              />
            )}
            {routeName === "sector" && isDrawEnd && (
              <DashSectors
                map={isMapLoaded}
                getSectorStatistics={getSectorStatistics}
              />
            )}
            {routeName === "gov" && isDrawEnd && (
              <DashGovern
                map={isMapLoaded}
                getGovernorateStatistics={getGovernorateStatistics}
                getGovernorateStatisticsBySector={
                  getGovernorateStatisticsBySector
                }
              />
            )}
          </div>
          {isMapLoaded && (
            <DashDetails
              where={dashBoardWhereFilter.indicatorWhere}
              year={dashBoardWhereFilter.year}
              routeName={routeName}
              map={isMapLoaded}
            />
          )}
        </>
      ) : window.location.pathname.slice(13, 27) === "dashboardPrint" ? (
        <DashTablePrint changeRoute={changeRoute} />
      ) : null}
    </div>
  );
}

export default Dashboard;
