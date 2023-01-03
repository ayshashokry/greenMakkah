import React, { useEffect, useState } from "react";
//import Style
import "./explorer.css";
//import Components
// import Map from "../../components/explorerComponents/Map";
import MapTools from "../../components/explorerComponents/MapTools";
import MapPlantsType from "../../components/explorerComponents/MapPlantsType";
//import Packages
import Box from "@mui/material/Box";
import Slide from "react-reveal";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import ExpSideMenu from "../../components/explorerComponents/ExpSideMenu";
import ExpMapChecks from "../../components/explorerComponents/ExpMapChecks";
import MapComponent from "../../components/explorerComponents/MapComponent";
import LoadingComponent from "../../components/explorerComponents/LoadingComponent";
import OuterSearchForm from "../../components/explorerComponents/OuterSearchForm";
import IconButton from "@mui/material/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import Header from "../../layouts/Header";
import googleplayImg from "../../assets/images/landingImages/googleplay.png";

import measureToolIcon from "../../assets/images/sidemenu/measurTool.svg";
import searchIcon from "../../assets/images/navImages/navSearchIcon.svg";
import mainIcon from "../../assets/images/navImages/navMainIcon.svg";
import printIcon from "../../assets/images/navImages/navPrintIcon.svg";
import {
  getLayerId,
  getMapInfo,
  queryTask,
  showLoading,
} from "../../helper/common_func";
import { dashboardMapUrl, mapUrl } from "../../config";
import NavBar from "../../layouts/NavBar";

let displayedOuterSearch = [];
export default function Explorer(props) {
  const [loggedIn] = useState(localStorage.user && !props.isPublic);
  const [isMapLoaded, setMapLoaded] = useState(null);
  const [selectedTab, setSelectedTab] = useState(null);
  const [indicatorsData, setIndicatorsData] = useState(null);

  const handle = useFullScreenHandle();

  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };
  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };
  const [routeName, setNavRouteName] = useState("explorer");
  const changeRoute = (route) => {
    setNavRouteName(route);
  }; /*Outer Search Functions*/
  const [outerResultMenuShown, setOuterResultMenu] = useState(true);
  const [outerResultDetailsShown, setOuterResultDetails] = useState(false);

  const outerOpenResultMenu = (e) => {
    setOuterResultMenu(true);
    setOuterResultDetails(false);
  };

  const outerOpenResultdetails = (e) => {
    setOuterResultMenu(false);
    setOuterResultDetails(true);
  };

  const [outerSearchResult, setOuterSearchResult] = useState([]);

  const setFilteredResult = (result) => {
    setOuterSearchResult(result);
  };

  const selectedIndexCallback = (tab) => {
    setSelectedTab(tab);
  };

  const onMapLoaded = (map) => {
    if (loggedIn) {
      setMapLoaded(map);
      if (props.setMapLoaded) {
        props.setMapLoaded(map);
      }
    } else {
      getMapInfo(dashboardMapUrl).then((response) => {
        map.__mapIndicatorInfo = response;
        setMapLoaded(map);

        if (props.setMapLoaded) {
          props.setMapLoaded(map);
        }

        getIndicatorsData(
          map,
          "A_GOVERNORATE_NAME is null and SECTOR_NO is null"
        );
      });
    }
  };

  useEffect(() => {
    if (props.selectGovFilter)
      getIndicatorsData(isMapLoaded, props.selectGovFilter);
  }, [props.selectGovFilter]);

  const setIndicatorFullExtent = () => {
    isMapLoaded.findLayerById("ZoomGraphicLayer").removeAll();
    getIndicatorsData(
      isMapLoaded,
      "A_GOVERNORATE_NAME is null and SECTOR_NO is null"
    );
  };

  const getIndicatorsData = (map, where) => {
    let layerdId = getLayerId(map.__mapIndicatorInfo, "INDICATORS");

    showLoading(true);

    queryTask({
      url: dashboardMapUrl + "/" + layerdId,
      outFields: [
        "TREES",
        "CROPLANDS",
        "GRASSLANDS",
        "SHRUBLANDS",
        "MANGROVES",
      ],
      where: where,
      returnGeometry: false,
      callbackResult: ({ features }) => {
        showLoading(false);
        setIndicatorsData(features.length ? features[0] : {});
      },
    });
  };

  const [navLinks] = useState([
    {
      id: 1,
      name: "طباعة",
      key: "exPrint",
      icon: printIcon,
      toLink: "/explorer",
    },
    {
      id: 4,
      name: "أدوات القياس",
      key: "exMeasurment",
      icon: measureToolIcon,
      toLink: "/explorer",
    },
    {
      id: 2,
      name: "بحث",
      key: "exSearch",
      icon: searchIcon,
      toLink: "/explorer",
    },
    {
      id: 3,
      name: "الرئيسية",
      key: "explorer",
      icon: mainIcon,
      toLink: "/explorer",
    },
  ]);

  return (
    <>
      <div className="expMobile">
        <NavBar />
        <div className="appTexts">
          <p>
            يوفر مستكشف أخضر مكة علي الجوال ﻟﻠﻤﻮاﻃﻨﻴﻦ واﻟﻤﺴﺘﺨﺪﻣﻴﻦ البحث عن
            الأماكن الخضراء المتاحة في قاعدة البيانات الجغرافيه
          </p>
          <h6>لتحميل تطبيق أخضر مكة</h6>
          <a
            rel="noreferrer"
            target="_blank"
            href="https://play.google.com/store/apps/details?id=com.green.Makkah">
            <img alt="googlePlay" src={googleplayImg} />
          </a>
        </div>
      </div>
      <div className="explorerPage">
        <LoadingComponent />

        {props.header &&
          // loggedIn
          (localStorage.getItem("isAuth") || loggedIn) && (
            <Header
              handleDrawerOpen={handleDrawerOpen}
              changeRoute={changeRoute}
              handleDrawerClose={handleDrawerClose}
              map={isMapLoaded}
              navLinks={navLinks}
              defaultKey="explorer"
            />
          )}
        <FullScreen handle={handle}>
          <Box sx={{ display: "flex" }}>
            <lable id="copyrightId" className="copyrightStyle">
              جميع الحقوق محفوظة لهيئة تطوير منطقة مكة المكرمة @ ٢٠٢٢
            </lable>

            {!(!loggedIn && indicatorsData) && (
              <label id="infoXY" className="xyStyle"></label>
            )}
            {!(!loggedIn && indicatorsData) && (
              <div id="northCompassIcon" className="compassStyle"></div>
            )}
            {!(!loggedIn && indicatorsData) && (
              <div id="scaleBarDiv" className="scaleBarStyle"></div>
            )}

            {(localStorage.getItem("isAuth") || loggedIn) && (
              <div
                className="SideMenuOpenArrow"
                style={{
                  right: "5px",
                }}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{
                    ...(openDrawer && { display: "none" }),
                  }}
                  style={{ top: props.header ? "85px" : "15px" }}>
                  <FontAwesomeIcon
                    icon={faChevronCircleLeft}
                    style={{
                      cursor: "pointer",
                    }}
                  />
                </IconButton>
              </div>
            )}
            <Slide right when={openDrawer}>
              <ExpSideMenu
                loggedIn={loggedIn}
                sideTop={props.header ? true : false}
                routeName={routeName}
                open={openDrawer}
                setNavRouteName={setNavRouteName}
                setOuterSearchResult={setOuterSearchResult}
                handleDrawerClose={handleDrawerClose}
                handleDrawerOpen={handleDrawerOpen}
                changeRoute={changeRoute}
                outerSearchResult={outerSearchResult}
                displayedOuterSearch={displayedOuterSearch}
                outerOpenResultdetails={outerOpenResultdetails}
                outerOpenResultMenu={outerOpenResultMenu}
                outerResultMenuShown={outerResultMenuShown}
                outerResultDetailsShown={outerResultDetailsShown}
                map={isMapLoaded}
              />
            </Slide>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              {(!localStorage.getItem("isAuth") && !loggedIn) || !loggedIn ? (
                <div
                  className="mapOuterSearch"
                  id={
                    openDrawer
                      ? routeName === "generalSearch" ||
                        routeName === "outerSearch"
                        ? "mapRight450"
                        : "mapRight340"
                      : "mapRight50"
                  }
                  style={{
                    position: "absolute",
                    display: "grid",
                    gridTemplateColumns: "1fr 5fr",
                    right: openDrawer
                      ? routeName === "generalSearch" ||
                        routeName === "outerSearch"
                        ? "450px"
                        : "340px"
                      : "50px",
                    top: "15px",
                  }}>
                  <ExpMapChecks
                    openDrawer={openDrawer}
                    selectedIndexCallback={selectedIndexCallback}
                  />
                  <div className="outerSearchForm ">
                    <OuterSearchForm
                      map={isMapLoaded}
                      selectedTab={selectedTab}
                      setFilteredResult={setFilteredResult}
                      routeName={routeName}
                      setNavRouteName={setNavRouteName}
                      // getOuterSearchData={getOuterSearchData}
                      handleDrawerOpen={handleDrawerOpen}
                      outerSearchResult={outerSearchResult}
                      outerOpenResultMenu={outerOpenResultMenu}
                      outerOpenResultdetails={outerOpenResultdetails}
                    />
                  </div>
                </div>
              ) : null}
              {!loggedIn && indicatorsData && (
                <div className="mapPlantsType">
                  <MapPlantsType data={indicatorsData} />
                </div>
              )}
              {isMapLoaded && (
                <div
                  id="mapToolsId"
                  className={!loggedIn ? "mapTools" : "mapToolsLogin"}
                  style={{ overflow: props.homePageProp && "visible" }}>
                  <MapTools
                    homePageProp={props.homePageProp}
                    isPublic={props.isPublic}
                    map={isMapLoaded}
                    openDrawer={openDrawer}
                    services={props.header ? true : false}
                    setIndicatorFullExtent={setIndicatorFullExtent}
                  />
                </div>
              )}
              <div
                style={{
                  height: "100%",
                }}>
                <MapComponent
                  loggedIn={loggedIn}
                  isPublic={props.isPublic}
                  key="mapKey"
                  mapExp={props.header ? true : false}
                  openDrawer={openDrawer}
                  routeName={routeName}
                  mapload={onMapLoaded}
                  handleDrawerOpen={handleDrawerOpen}
                  setNavRouteName={setNavRouteName}
                  setFilteredResult={setFilteredResult}
                />
              </div>
            </Box>
          </Box>
        </FullScreen>
      </div>
    </>
  );
}
