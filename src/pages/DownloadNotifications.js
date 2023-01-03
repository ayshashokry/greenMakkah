import React, { useEffect } from "react";
import logo1 from "../assets/images/downloadLogo1.png";
import logo2 from "../assets/images/logo2green.png";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavBar from "../layouts/NavBar";
import Footer from "../layouts/Footer";
import Fade from "react-reveal";
import { Row, Col, Card } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

export default function DownloadNotifications() {
  useEffect(() => {
    document.body.scrollTo(0, 0);
  }, []);

  return (
    <>
      <NavBar />
      <div className="newsDetailsPage py-3 notifiPage ">
        <div className="pageHeader mb-5">
          {/* <div className="headLinks">
            <Link to="/"> الرئيسية </Link> <span>{">"}</span>
            <Link to="/">المركز الإعلامي </Link> <span>{">"}</span>
            <Link to="/logo/" className="activeLink">
              تحميل الشعارات
            </Link>
          </div> */}
          <h3 className="headerH3 my-3">تحميل الشعارات </h3>
        </div>
        <Container className="mt-5 downloadNoti ">
          <Row justify="center">
            <Col lg={{ span: 8 }} md={{ span: 12 }} sm={{ span: 24 }}>
              <Fade right>
                <Card
                  className="NotifCard"
                  hoverable
                  // style={{ width: 240 }}
                  cover={
                    <div style={{ textAlign: "center" }}>
                      <img
                        src={logo1}
                        alt="newImage"
                        style={{
                          padding: "0px",
                          paddingTop: "35px",
                          width: "200px",
                        }}
                      />
                    </div>
                  }
                >
                  <Card.Meta
                    className="newCardData"
                    description={
                      <div className="notiCardDes">
                        <h6>شعار أخضر مكة </h6>
                        <div className="notiA">
                          <a
                            rel="noreferrer"
                            target="_blank"
                            href={`${process.env.PUBLIC_URL}/greenLogo1.svg`}
                            download
                          >
                            تحميل
                            <FontAwesomeIcon
                              icon={faDownload}
                              className="mx-2"
                            />
                          </a>
                        </div>
                      </div>
                    }
                  />
                </Card>
              </Fade>
            </Col>
            <Col lg={{ span: 8 }} md={{ span: 12 }} sm={{ span: 24 }}>
              <Fade right>
                <Card
                  className="NotifCard"
                  hoverable
                  // style={{ width: 240 }}
                  cover={
                    <div style={{ textAlign: "center" }}>
                      <img
                        src={logo2}
                        alt="newImage"
                        style={{ padding: "20px", paddingTop: "40px" }}
                      />
                    </div>
                  }
                >
                  <Card.Meta
                    className="newCardData"
                    description={
                      <div className="notiCardDes">
                        <h6>شعار هيئة تطوير منطقة مكة المكرمة</h6>
                        <div className="notiA">
                          <a
                            rel="noreferrer"
                            target="_blank"
                            href={`${process.env.PUBLIC_URL}/logo2.png`}
                            download
                          >
                            تحميل
                            <FontAwesomeIcon
                              icon={faDownload}
                              className="mx-2"
                            />
                          </a>
                        </div>
                      </div>
                    }
                  />
                </Card>
              </Fade>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
}
