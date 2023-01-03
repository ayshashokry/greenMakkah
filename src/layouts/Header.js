import React, { useState } from "react";
//import Style
import "./layout.css";
//import Packages
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
//import Images
import logo1 from "../assets/images/greenLogo1.svg";
import logo2 from "../assets/images/logo2green.png";
import lightModeImg from "../assets/images/lightModeImg.svg";
import darkModeImg from "../assets/images/darkModeImg.svg";
import { Tooltip, notification } from "antd";
import Fade from "react-reveal/Fade";
//import Components
import LoginDropDown from "./LoginDropDown";
export default function Header(props) {
  const [key, setKey] = useState(props.defaultKey);
  const [darkMode, setMode] = useState(false);
  const changeMode = () => {
    setMode(!darkMode);
    if (!darkMode) {
      props.map.basemap = "streets-night-vector";
    } else {
      props.map.basemap = "streets-navigation-vector";
    }
  };

  let navigate = useNavigate();
  const confirmationLogout = (props) => {
    const args = {
      description: "تم تسجيل الخروج بنجاح",
      duration: 5,
      placement: "bottomLeft",
      bottom: 5,
    };
    notification.open(args);
  };
  const SignOut = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("LoginCount");
    //props.history.push("/login");
    confirmationLogout();

    navigate("/", { replace: true });
  };
  const onSelect = (e) => {
    
    //document.getElementById("northCompassIcon").style.top = '80px';
    setKey(e);
    props.changeRoute(e);
  };
  return (
    <Navbar className="Header" fixed="top">
      <Container fluid>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Fade left>
            <div style={{ display: "flex" }}>
              <LoginDropDown SignOut={SignOut.bind(this)} />
              {props.dash &&
                (!darkMode ? (
                  <a onClick={changeMode} className="iconLink">
                    {" "}
                    <Tooltip
                      placement="bottom"
                      title={"للتحويل الي الوضع الليلي"}
                    >
                      <img alt="mode" src={darkModeImg} className="mx-2" />
                    </Tooltip>
                  </a>
                ) : (
                  <a onClick={changeMode} className="iconLink">
                    <Tooltip
                      placement="bottom"
                      title={"للتحويل الي الوضع النهاري"}
                    >
                      <img alt="mode" src={lightModeImg} className="mx-2" />
                    </Tooltip>
                  </a>
                ))}
            </div>
          </Fade>
          <Nav
            className="m-auto"
            style={{ paddingTop: "19px" }}
            activeKey={key}
            onSelect={onSelect}
          >
            {props.navLinks.map((l) => (
              <Fade top>
                <Nav.Item className=" ahsaaNavLink navAdminHelp">
                  <Nav.Link
                    eventKey={l.key}
                    role="button"
                    title={l.name}
                    onClick={
                      l.key !== "explorer"
                        ? props.handleDrawerOpen
                        : props.handleDrawerClose
                    }
                    as={Link}
                    className="navLink"
                    to={l.toLink}
                  >
                    {l.name}
                    <img alt="navImg" src={l.icon} />
                  </Nav.Link>
                </Nav.Item>
              </Fade>
            ))}
          </Nav>
        </Navbar.Collapse>
        <Fade right>
          {" "}
          <Navbar.Brand className="Navlogo2 headerLogo2">
            <a
              href="https://www.mrda.gov.sa/index.aspx"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              <img
                alt="logo"
                src={logo2}
                className="img-fluid"
                style={{ width: "200px" }}
              />
            </a>
          </Navbar.Brand>
          <Navbar.Brand href="#home">
            <Link to="/">
              <img
                alt="logo1"
                src={logo1}
                style={{ width: "180px" }}
                className="headerLogo1"
              />
            </Link>
          </Navbar.Brand>
        </Fade>
      </Container>
    </Navbar>
  );
}
