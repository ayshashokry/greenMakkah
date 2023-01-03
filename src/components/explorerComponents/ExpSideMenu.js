import React, { useState, useEffect } from "react";
//import Components
import CoordinatesSearch from "./sidemenu-Components/CoordinatesSearch";
import GeneralSearch from "./sidemenu-Components/GeneralSearch";
import NearestServiceSearch from "./sidemenu-Components/NearestServiceSearch";
import OuterSearchMainPage from "./sidemenu-Components/outerSearchComponents/OuterSearchMainPage";
//import Packages

import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import { Nav } from "react-bootstrap";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import BarChartIcon from "@mui/icons-material/BarChart";
import general from "../../assets/images/sidemenu/general.svg";
import cooSearch from "../../assets/images/sidemenu/cooSearch.svg";
import measureToolIcon from "../../assets/images/sidemenu/measurTool.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import PrintComponent from "./PrintComponent";
import MeasureTool from "./sidemenu-Components/MeasureTool";

export default function SideMenu(props) {
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    width:
      props.routeName === "generalSearch" || props.routeName === "outerSearch"
        ? 400
        : 300,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  }));
  const openedMixin = (theme) => ({
    width:
      props.routeName === "generalSearch" || props.routeName === "outerSearch"
        ? 400
        : 300,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  });
  const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: 0,
    [theme.breakpoints.up("sm")]: {
      width: 0,
    },
  });
  const [sideLinks] = useState([
    { id: 1, name: "بحث عام", icon: general, to: "generalSearch" },
    {
      id: 2,
      name: "بحث بالإحداثيات",
      icon: cooSearch,
      to: "Coordinates",
    },
    /*{
      id: 3,
      name: "أدوات القياس",
      icon: measureToolIcon,
      to: "measurment",
    },
    {
      id: 3,
      name: "البحث عن أقرب موقع",
      icon: geoSearch,
      to: "nearLocation",
    },*/
  ]);

  /*General Search Functions*/
  const [generalSearchInputsShown, setOpenSearchInputs] = useState(true);
  const [generalResultMenuShown, setOpenResultMenu] = useState(false);
  const [generalResultDetailsShown, setOpenResultDetails] = useState(false);

  const generalOpenResultMenu = (e) => {
    setOpenResultMenu(true);
    setOpenSearchInputs(false);
    setOpenResultDetails(false);
  };
  const generalOpenSearchInputs = (e) => {
    setOpenResultMenu(false);
    setOpenSearchInputs(true);
    setOpenResultDetails(false);
  };
  const generalOpenResultdetails = (e) => {
    setOpenResultMenu(false);
    setOpenSearchInputs(false);
    setOpenResultDetails(true);
  };
  const [key, setKey] = useState("explorer");
  const onSelect = (e) => {
    setKey(e);
    props.changeRoute(e);
  };
  useEffect(() => {
    setOpenResultMenu(false);
    setOpenSearchInputs(true);
    setOpenResultDetails(false);
  }, [props.routeName]);
  return (
    <Drawer

      variant="permanent"
      open={props.open}
      anchor="right"
      className="SideMenu"
      style={{
        top: props.sideTop && localStorage.user ? (window.isMeasurmentOpened || "65px") : "0",
      }}
      id={
        props.routeName === "generalSearch" || props.routeName === "outerSearch"
          ? "SearchSidemenu"
          : "measurmentId"
      }
    >
      {console.log(props.routeName)}
      {console.log(key)}
      <DrawerHeader
        className={
          props.routeName === "generalSearch" ||
            props.routeName === "outerSearch"
            ? "generalOut"
            : "generalIn"
        }
      >
        {props.routeName !== "exSearch" && props.routeName !== "exPrint" && props.routeName !== "exMeasurment" && (
          <Link
            to=""
            onClick={() => props.changeRoute("exSearch")}
            className="backBar"
          >
            <BarChartIcon />
          </Link>
        )}
        {props.routeName === "exSearch" || props.routeName === "explorer" ? (
          <p className="sideMenuTitle">مستكشف أخضر مكة</p>
        ) : (
          <h3
            className="mb-3 m-auto"
            id={
              props.routeName === "generalSearch" ||
                props.routeName === "outerSearch"
                ? "h3SideSearch"
                : ""
            }
          >
            {props.routeName === "generalSearch" ? (
              <div className="searchStepsWizard">
                <nav class="breadcrumbs">
                  <li
                    onClick={generalOpenSearchInputs}
                    className={
                      generalSearchInputsShown
                        ? "breadcrumbs__item breadcrumbs__itemActive first"
                        : "breadcrumbs__item first"
                    }
                  >
                    بحث عام
                  </li>
                  {generalResultMenuShown || generalResultDetailsShown ? (
                    <li
                      onClick={generalOpenResultMenu}
                      className={
                        generalResultMenuShown
                          ? "breadcrumbs__item breadcrumbs__itemActive second"
                          : "breadcrumbs__item second"
                      }
                    >
                      القائمة
                    </li>
                  ) : null}
                  {generalResultDetailsShown  ? (
                    <li
                      onClick={generalOpenResultdetails}
                      className={
                        generalResultDetailsShown
                          ? "breadcrumbs__item breadcrumbs__itemActive third"
                          : "breadcrumbs__item third"
                      }
                    >
                      النتائج
                    </li>
                  ) : null}
                </nav>
              </div>
            ) : props.routeName === "outerSearch" ? (
              <div className="searchStepsWizard">
                <nav class="breadcrumbs">
                  <li
                    onClick={props.outerOpenResultMenu}
                    className={
                      props.outerResultMenuShown
                        ? "breadcrumbs__item breadcrumbs__itemActive first"
                        : "breadcrumbs__item first"
                    }
                  >
                    القائمة
                  </li>
                  {props.outerResultDetailsShown ? (
                    <li
                      onClick={props.outerOpenResultdetails}
                      className={
                        props.outerResultDetailsShown
                          ? "breadcrumbs__item breadcrumbs__itemActive second"
                          : "breadcrumbs__item second"
                      }
                    >
                      النتائج
                    </li>
                  ) : props.routeName === "exPrint" ? (
                    "طباعة"
                  ) : props.routeName === "exMeasurment" ? (
                    "أدوات القياس"
                  ) : null}
                </nav>
              </div>
            ) : props.routeName === "exPrint" ? (
              "طباعة"
            ) : props.routeName === "exMeasurment" ? (
              "أدوات القياس"
            ) : (
              sideLinks.filter((x) => key === x.to)[0] !== undefined &&
              sideLinks.filter((x) => key === x.to)[0].name
            )}
          </h3>
        )}
        <Link to="">
          <IconButton
            onClick={props.handleDrawerClose}
            className="closeMenuIcon openSideMenuHelp"
            color="inherit"
            aria-label="open drawer"
            edge="start"
          >
            <FontAwesomeIcon
              icon={faChevronCircleRight}
              style={{
                cursor: "pointer",
              }}
            />
          </IconButton>
        </Link>
      </DrawerHeader>

      <Divider />
      {(props.routeName === "exSearch" || props.routeName === "explorer") &&
        window.location.pathname === "/greenmakkah/explorer" ? (
        <>
          <Nav activeKey={key} onSelect={onSelect}>
            {sideLinks.map((text, index) => (
              <Tooltip title={props.open ? "" : text.name} placement="left">
                <div className="sideLinkDiv">
                  <Nav.Item className="">
                    <Nav.Link
                      eventKey={text.to}
                      role="button"
                      title={text.name}
                      className="navLink"
                      to=""
                    >
                      <img
                        src={text.icon}
                        alt="sidemenuIcon"
                        className="mx-2"
                      />
                      {text.name}
                    </Nav.Link>
                  </Nav.Item>
                </div>
              </Tooltip>
            ))}
          </Nav>
        </>
      ) : props.routeName === "Coordinates" ? (
        <CoordinatesSearch map={props.map} />
      ) : props.routeName === "measurment" ? (
        <MeasureTool map={props.map} />
      ) : props.routeName === "generalSearch" ? (
        <GeneralSearch
          map={props.map}
          outerOpenResultMenu={props.outerOpenResultMenu}
          setNavRouteName={props.setNavRouteName}
          setOuterSearchResult={props.setOuterSearchResult}
          generalOpenResultdetails={generalOpenResultdetails}
          generalOpenResultMenu={generalOpenResultMenu}
          generalOpenSearchInputs={generalOpenSearchInputs}
          generalResultMenuShown={generalResultMenuShown}
          generalResultDetailsShown={generalResultDetailsShown}
          generalSearchInputsShown={generalSearchInputsShown}
        />
      ) : props.routeName === "nearLocation" ? (
        <NearestServiceSearch
          map={props.map}
          setNavRouteName={props.setNavRouteName}
          setOuterSearchResult={props.setOuterSearchResult}
          outerOpenResultdetails={props.outerOpenResultdetails}
          outerOpenResultMenu={props.outerOpenResultMenu}
          outerResultMenuShown={props.outerResultMenuShown}
          outerResultDetailsShown={props.outerResultDetailsShown}
        />
      ) : props.routeName === "outerSearch" ? (
        <OuterSearchMainPage
          map={props.map}
          outerSearchResult={props.outerSearchResult}
          outerOpenResultdetails={props.outerOpenResultdetails}
          outerOpenResultMenu={props.outerOpenResultMenu}
          outerResultMenuShown={props.outerResultMenuShown}
          outerResultDetailsShown={props.outerResultDetailsShown}
        />
      ) : null}
      {props.routeName === "exPrint" && <PrintComponent map={props.map} />}

      {props.routeName === "exMeasurment" && <MeasureTool map={props.map} />}
    </Drawer>
  );
}
