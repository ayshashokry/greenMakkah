import React, { useState, useEffect, useRef } from "react";
import $ from "jquery";

//import Style
import "./layout.css";
//import Packages
import { Navbar, Button, Nav, Container } from "react-bootstrap";
import { Dropdown, Menu, Row, Col, notification } from "antd";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { LogOut } from "../redux/actions/authActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faAngleLeft } from "@fortawesome/free-solid-svg-icons"; //import Images
import logo2White from "../assets/images/footerLogo2.png";
import logo2 from "../assets/images/logo2green.png";
import newImg from "../assets/images/navImages/navNewImg.png";
// import amana1 from "../assets/images/navImages/amana1.png";
// import amana2 from "../assets/images/navImages/amana2.png";
// import amana3 from "../assets/images/navImages/amana3.png";
import navLogoWhite from "../assets/images/whiteLogo1.svg";
import navLogoGreen from "../assets/images/greenLogo1.svg";

import { useNavigate } from "react-router-dom";
//import Components
import LoginDropDown from "./LoginDropDown";
import Fade from "react-reveal";
import PlantsNavSlider from "./PlantsNavSlider";
function NavBar(props) {
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
    props.LogOut();
    //props.history.push("/login");
    confirmationLogout();

    navigate("/", { replace: true });
  };
  const closeNavBar = () => {
    $(".navbar-toggler").click();
  };
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const onVisibleChange = (e) => {
    setDropDownOpen(e);
  };
  const [dropActive, setDropActive] = useState(0);
  const [navBackground, setNavBackground] = useState(false);
  const navRef = useRef();

  // navRef.current = navBackground;
  useEffect(() => {
    if (window.scrollY >= 100) {
      setNavBackground(true);
    } else {
      setNavBackground(false);
    }
    if (
      window.location.pathname.slice(13) == "organizationalStructure" ||
      window.location.pathname.slice(13) == "goals" ||
      window.location.pathname.slice(13) == "vision"
    ) {
      setDropActive(1);
    }
    if (
      window.location.pathname.slice(13, 17) == "news" ||
      window.location.pathname.slice(13, 19) == "events" ||
      window.location.pathname.slice(13, 25) == "photoGallery" ||
      window.location.pathname.slice(13, 25) == "videoGallery" ||
      window.location.pathname.slice(13) == "notifications"
    ) {
      setDropActive(2);
    }
    if (
      window.location.pathname.slice(13, 14) == "1" ||
      window.location.pathname.slice(13, 14) == "2" ||
      window.location.pathname.slice(13, 14) == "3" ||
      window.location.pathname.slice(13, 14) == "4" ||
      window.location.pathname.slice(13, 14) == "5" ||
      window.location.pathname.slice(13, 14) == "6" ||
      window.location.pathname.slice(13, 14) == "7" ||
      window.location.pathname.slice(13, 25) == "plantDetails"
    ) {
      setDropActive(3);
    }

    if (
      window.location.pathname.slice(13) == "gaddahGuide" ||
      window.location.pathname.slice(13) == "taeefGuide" ||
      window.location.pathname.slice(13) == "makkahGuide"
    ) {
      setDropActive(4);
    }
  }, [window.location.pathname]);
  return (
    <Navbar
      style={
        {
          // transition: "1s ease",
        }
      }
      collapseOnSelect
      expand="lg"
      fixed="top"
      className={
        !props.landingNav ||
        (props.section1InView && props.landingNav) ||
        (props.section2InView && props.landingNav) ||
        (props.section3InView && props.landingNav) ||
        (props.section4InView && props.landingNav) ||
        (props.section5InView && props.landingNav) ||
        (props.section6InView && props.landingNav) ||
        (props.section7InView && props.landingNav) ||
        (dropDownOpen && props.landingNav)
          ? "NavBar"
          : "landingNav"
      }
    >
      <Container fluid style={{ marginTop: "auto" }}>
        <Fade left>
          <div className="navUser">
            <LoginDropDown
              closeNavBar={closeNavBar}
              SignOut={SignOut}
              user={props.user}
              isAuth={props.isAuth}
            />
          </div>
        </Fade>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Brand className="logo1NavMobile">
          <Link to="/">
            <img
              alt="logo1"
              src={navLogoGreen}
              style={{ width: "200px", paddingBottom: "30px" }}
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="navRight navBarDrops">
            <div className="navRightFlex navbar-nav">
              <Fade top>
                <Nav.Item
                  className=" drasatNavLink"
                  style={{ paddingTop: "7px" }}
                >
                  <NavLink className="navLink navHover" to="/studies">
                    الدراسات والأبحاث
                  </NavLink>
                </Nav.Item>
                {/* <Dropdown
                getPopupContainer={(trigger) => trigger.parentNode}
                trigger={["click"]}
                onVisibleChange={onVisibleChange}
                overlay={
                  <Menu className="navDropDesigns navdesignGuide">
                    <Row style={{ marginTop: "20px" }}>
                      <Col span={8} style={{ textAlign: "center" }}>
                        <img src={amana1} alt="logo" />
                        <Menu.Item>
                          <NavLink
                            to="/gaddahGuide"
                            activeClassName="navitem-active"
                            exact
                            className="navitem "
                          >
                            <h4>
                              أمانة منطقة جدة
                              <FontAwesomeIcon
                                icon={faAngleLeft}
                                className="mx-2"
                              />
                            </h4>
                            <p>
                              تعرف علي دليل تصميم أمانة محافظة جدة كما يمكنك
                              تحميل الملف
                            </p>
                          </NavLink>
                        </Menu.Item>
                      </Col>
                      <Col span={8} style={{ textAlign: "center" }}>
                        <img src={amana2} alt="logo" />
                        <Menu.Item>
                          <NavLink
                            to="/makkahGuide"
                            activeClassName="navitem-active"
                            exact
                            className="navitem "
                          >
                            <h4>
                              أمانة محافظة مكة
                              <FontAwesomeIcon
                                icon={faAngleLeft}
                                className="mx-2"
                              />
                            </h4>
                            <p>
                              تعرف علي دليل تصميم أمانة محافظة مكة كما يمكنك
                              تحميل الملف
                            </p>
                          </NavLink>
                        </Menu.Item>
                      </Col>{" "}
                      <Col span={8} style={{ textAlign: "center" }}>
                        <img src={amana3} alt="logo" />
                        <Menu.Item>
                          <NavLink
                            to="/taeefGuide"
                            activeClassName="navitem-active"
                            exact
                            className="navitem "
                          >
                            <h4>
                              أمانة محافظة الطائف
                              <FontAwesomeIcon
                                icon={faAngleLeft}
                                className="mx-2"
                              />
                            </h4>
                            <p>
                              تعرف علي دليل تصميم أمانة محافظة الطائف كما يمكنك
                              تحميل الملف
                            </p>
                          </NavLink>
                        </Menu.Item>
                      </Col>
                    </Row>
                  </Menu>
                }
                placement="bottomLeft"
                arrow
              >
                <Button className={dropActive == 4 ? "navDropActive" : ""}>
                  <span className="navitem">دليل التصاميم</span>
                  <FontAwesomeIcon
                    className=" mx-2"
                    icon={faChevronDown}
                    style={{ fontSize: "15px" }}
                  />
                </Button>
              </Dropdown> */}
                <Dropdown
                  onVisibleChange={onVisibleChange}
                  getPopupContainer={(trigger) => trigger.parentNode}
                  trigger={["click"]}
                  overlay={
                    <Menu className="navDropDesigns navplantGuide">
                      <PlantsNavSlider />
                    </Menu>
                  }
                  placement="bottomLeft"
                  arrow
                >
                  <Button className={dropActive == 3 ? "navDropActive" : ""}>
                    <span className="navitem">دليل النباتات</span>
                    <FontAwesomeIcon
                      className=" mx-2"
                      icon={faChevronDown}
                      style={{ fontSize: "15px" }}
                    />
                  </Button>
                </Dropdown>
                <Dropdown
                  onVisibleChange={onVisibleChange}
                  getPopupContainer={(trigger) => trigger.parentNode}
                  trigger={["click"]}
                  overlay={
                    <Menu className="navDropMedia navNewsdrop">
                      <Row style={{ marginTop: "20px" }}>
                        <Col
                          lg={{ span: 7 }}
                          md={{ span: 11 }}
                          sm={{ span: 24 }}
                          style={{ textAlign: "center" }}
                        >
                          <img
                            src={newImg}
                            alt="logo"
                            style={{ paddingBottom: "10px", height: "100%" }}
                          />
                        </Col>
                        <Col
                          lg={{ span: 6 }}
                          md={{ span: 12 }}
                          sm={{ span: 24 }}
                        >
                          <Menu.Item>
                            <NavLink
                              to="/news"
                              activeClassName="navitem-active"
                              exact
                              className="navitem "
                            >
                              <h4>
                                الأخبار
                                <FontAwesomeIcon
                                  icon={faAngleLeft}
                                  className="mx-2"
                                />
                              </h4>
                              <p>
                                أخر أخبار اخضر مكة ومتابعة للمستجدات الجارية في
                                المنطقة
                              </p>
                            </NavLink>
                          </Menu.Item>
                          <Menu.Item>
                            <NavLink
                              to="/events"
                              activeClassName="navitem-active"
                              exact
                              className="navitem "
                            >
                              <h4>
                                الأحداث والفعاليات
                                <FontAwesomeIcon
                                  icon={faAngleLeft}
                                  className="mx-2"
                                />
                              </h4>
                              <p>
                                متابعة لاخر الاحداث والفعاليات التي تنظمها
                                الهيئة
                              </p>
                            </NavLink>
                          </Menu.Item>
                          <Menu.Item>
                            <NavLink
                              to="/photoGallery"
                              activeClassName="navitem-active"
                              exact
                              className="navitem "
                            >
                              <h4>
                                معرض الصور
                                <FontAwesomeIcon
                                  icon={faAngleLeft}
                                  className="mx-2"
                                />
                              </h4>
                              <p>
                                استعرض الصور الخاصة بمبادرة أخضر مكة لرؤية ما تم
                                من أعمال
                              </p>
                            </NavLink>
                          </Menu.Item>
                        </Col>
                        <Col
                          lg={{ span: 6 }}
                          md={{ span: 12 }}
                          sm={{ span: 24 }}
                        >
                          {/* <Menu.Item>
                          <NavLink
                            to="/videoGallery"
                            activeClassName="navitem-active"
                            exact
                            className="navitem "
                          >
                            <h4>
                              الفيديوهات
                              <FontAwesomeIcon
                                icon={faAngleLeft}
                                className="mx-2"
                              />
                            </h4>
                            <p>
                              استعرض اخر الفيديوهات لرؤية الأحداث وما لم يتم علي
                              الأرض
                            </p>
                          </NavLink>
                        </Menu.Item> */}
                          <Menu.Item>
                            <NavLink
                              to="/logo"
                              activeClassName="navitem-active"
                              exact
                              className="navitem "
                            >
                              <h4>
                                تحميل الشعارات
                                <FontAwesomeIcon
                                  icon={faAngleLeft}
                                  className="mx-2"
                                />
                              </h4>
                              <p>
                                يمكنك تحميل شعارات المبادرة والهيئة من هنا
                                بطريقة مباشرة
                              </p>
                            </NavLink>
                          </Menu.Item>
                        </Col>
                      </Row>
                    </Menu>
                  }
                  placement="bottomLeft"
                  arrow
                >
                  <Button className={dropActive == 2 ? "navDropActive" : ""}>
                    <span className="navitem">المركز الإعلامي</span>
                    <FontAwesomeIcon
                      className=" mx-2"
                      icon={faChevronDown}
                      style={{ fontSize: "15px" }}
                    />
                  </Button>
                </Dropdown>
                <Dropdown
                  getPopupContainer={(trigger) => trigger.parentNode}
                  trigger={["click"]}
                  onVisibleChange={onVisibleChange}
                  overlay={
                    <Menu className="aboutMakkah">
                      <Row>
                        <Col
                          lg={{ span: 4 }}
                          md={{ span: 8 }}
                          sm={{ span: 24 }}
                          className="aboutMakkahCol"
                        >
                          <img
                            src={logo2}
                            alt="logo"
                            style={{ marginTop: "70px", width: "200px" }}
                          />
                        </Col>
                        <Col lg={{ span: 1 }} md={{ span: 2 }}></Col>
                        <Col
                          lg={{ span: 8 }}
                          md={{ span: 16 }}
                          sm={{ span: 24 }}
                        >
                          <Menu.Item>
                            <NavLink
                              to="/vision"
                              activeClassName="navitem-active"
                              exact
                              className="navitem "
                            >
                              <h4>
                                الرؤية
                                <FontAwesomeIcon
                                  icon={faAngleLeft}
                                  className="mx-2"
                                />
                              </h4>
                              <p>
                                مشروع أخضر مكة هو ضمن مبادرة السعودية <br />
                                الخضراء ضمن مخرجات رؤية المملكة 2030
                              </p>
                            </NavLink>
                          </Menu.Item>
                          {/* <Menu.Item>
                          <NavLink
                            to="/organizationalStructure"
                            activeClassName="navitem-active"
                            exact
                            className="navitem "
                          >
                            <h4>
                              الهيكل التنظيمي
                              <FontAwesomeIcon
                                icon={faAngleLeft}
                                className="mx-2"
                              />
                            </h4>
                            <p>الهيكل التنظيمي لفريق عمل مبادرة أخضر مكة </p>
                          </NavLink>
                        </Menu.Item> */}
                          <Menu.Item>
                            <NavLink
                              to="/goals"
                              activeClassName="navitem-active"
                              exact
                              className="navitem "
                            >
                              <h4>
                                الأهداف
                                <FontAwesomeIcon
                                  icon={faAngleLeft}
                                  className="mx-2"
                                />
                              </h4>
                              <p>الأهداف العامة والتسويقية لمبادرة أخضر مكة</p>
                            </NavLink>
                          </Menu.Item>
                        </Col>
                      </Row>
                    </Menu>
                  }
                  placement="bottomLeft"
                  arrow
                >
                  <Button className={dropActive == 1 ? "navDropActive" : ""}>
                    <span className="navitem">عن بوابة أخضر مكة</span>
                    <FontAwesomeIcon
                      className=" mx-2"
                      icon={faChevronDown}
                      style={{ fontSize: "15px" }}
                    />
                  </Button>
                </Dropdown>
                <Nav.Item
                  className="drasatNavLink"
                  style={{ paddingTop: "7px" }}
                >
                  <NavLink className="navLink navHover" to="/">
                    الرئيسية
                  </NavLink>
                </Nav.Item>
              </Fade>
            </div>
          </Nav>
        </Navbar.Collapse>
        <Fade right>
          <Navbar.Brand className="Navlogo2">
            <a
              href="https://www.mrda.gov.sa/index.aspx"
              target="_blank"
              rel="noopener noreferrer"
            >
              {!props.landingNav ||
              (props.section1InView && props.landingNav) ||
              (props.section2InView && props.landingNav) ||
              (props.section3InView && props.landingNav) ||
              (props.section4InView && props.landingNav) ||
              (props.section5InView && props.landingNav) ||
              (props.section6InView && props.landingNav) ||
              (props.section7InView && props.landingNav) ||
              (dropDownOpen && props.landingNav) ? (
                <img
                  alt="logo"
                  src={logo2}
                  className="img-fluid"
                  style={{ width: "230px" }}
                />
              ) : (
                <img
                  alt="logo"
                  src={logo2White}
                  className="img-fluid"
                  style={{ width: "230px" }}
                />
              )}
            </a>
          </Navbar.Brand>
          <Navbar.Brand className="logo1Nav">
            <Link to="/">
              {!props.landingNav ||
              (props.section1InView && props.landingNav) ||
              (props.section2InView && props.landingNav) ||
              (props.section3InView && props.landingNav) ||
              (props.section4InView && props.landingNav) ||
              (props.section5InView && props.landingNav) ||
              (props.section6InView && props.landingNav) ||
              (props.section7InView && props.landingNav) ||
              (dropDownOpen && props.landingNav) ? (
                <img
                  alt="logo1"
                  src={navLogoGreen}
                  style={{ width: "200px", paddingBottom: "5px" }}
                />
              ) : (
                <img
                  alt="logo1"
                  src={navLogoWhite}
                  style={{ width: "200px", paddingBottom: "5px" }}
                />
              )}
            </Link>
          </Navbar.Brand>
        </Fade>
      </Container>
    </Navbar>
  );
}
const mapStateToProps = function (state) {
  return {
    isAuth: state.auth.isAuth,
    user: state.auth.user,
    token: state.auth.token,
  };
};
const mapDispatchToProps = {
  LogOut,
};
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
