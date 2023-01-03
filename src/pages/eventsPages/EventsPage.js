import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import eventImg4 from "../../assets/images/landingImages/eventsImages/event4.png";
import headNew1 from "../../assets/images/landingImages/eventsImages/event1.jpg";
import headNew2 from "../../assets/images/landingImages/eventsImages/event2.jpg";
import headNew3 from "../../assets/images/landingImages/eventsImages/event3.png";
import { Card, Row, Col } from "antd";
import { Container } from "react-bootstrap";
import Fade from "react-reveal";
import NavBar from "../../layouts/NavBar";
import Footer from "../../layouts/Footer";
import "../newsPages/news.css";
export default function EventsPage() {
  useEffect(() => {
    document.body.scrollTo(0, 0);
  }, []);
  // const [newsGallery] = useState([
  //   {
  //     id: 1,
  //     date: "20/4/1990",
  //     details:
  //       " الرئيس التنفيذي لـ #هيئة_تطوير_منطقة_مكة م.أحمد العارضي متحدثًا عن مبادرة #أخضر_مكة",
  //     to: "/events/4",
  //     img: eventImg4,
  //   },
  // ]);
  return (
    <>
      <NavBar />
      <div className="newsPage">
        <div className="pageHeader mb-5">
          {/* <div className="headLinks">
            <Link to="/"> الرئيسية </Link> <span>{">"}</span>
            <Link to="/">المركز الإعلامي </Link> <span>{">"}</span>
            <Link to="/events" className="activeLink">
              الفعاليات
            </Link>
          </div> */}
          <h3 className="headerH3">الفعاليات</h3>
        </div>
        <Container>
          <Row justify="center" className="newHead px-5 mb-4 pb-5">
            <Col md={{ span: 24 }} lg={{ span: 12 }}>
              <Fade right>
                <div className="">
                  <Link to="/events/1">
                    <div className="singleImg">
                      <img
                        width="600 px"
                        height="450 px"
                        alt="new"
                        src={headNew1}
                        className="singleImg img-fluid"
                        style={{ height: "450px" }}
                      />
                      <p className="imgDate">14/2/2022</p>
                    </div>
                    <div className="newHeadCardData">
                      <h4>ملتقى صناع العقار بغرفة مكة</h4>
                      <p>
                        شاركت هيئة تطوير منطقة مكة المكرمة في ملتقى ومعرض (صناع
                        العقار) في نسخته الثالثة والذي يعد أحد مبادرات اللجنة
                        العقارية الوطنية باتحاد الغرف السعودية
                      </p>
                    </div>
                  </Link>
                </div>
              </Fade>
            </Col>
            <Col lg={{ span: 1 }}></Col>
            <Col
              md={{ span: 24 }}
              lg={{ span: 11 }}
              className="doubleImg m-auto"
            >
              {" "}
              <Fade left>
                {" "}
                <Link to="/events/2">
                  <div
                    className="mb-5 doubleImgHover"
                    style={{ position: "relative" }}
                  >
                    <img
                      width="550 px"
                      height="270 px"
                      alt="new"
                      src={headNew2}
                      className="img-fluid doubleImgDiv"
                    />
                    <p className="imgDate">14/2/2022</p>{" "}
                    <h6 className="imgData6">
                      برعاية من #هيئة_تطوير_منطقة_مكة وبحضور الرئيس التنفيذي م.
                      أحمد العارضي نظمت جامعة الملك عبدالله للعلوم والتقنية
                      #كاوست مؤتمر الأمن الغذائي المستدام ومحافظاتها
                    </h6>
                  </div>
                </Link>
                {/* <Link to="/events/3">
                  <div
                    style={{ position: "relative" }}
                    className="doubleImgHover"
                  >
                    <img
                      width="550 px"
                      height="270 px"
                      alt="new"
                      src={headNew3}
                      className="img-fluid doubleImgDiv"
                      style={{ borderRadius: "0 0 0 50px" }}
                    />
                    <p className="imgDate">14/2/2022</p>
                    <h6 className="imgData6">
                      جانب من مشاركة #هيئة_تطوير_منطقة_مكة بجناح تعريفي في
                      فعاليات مركز #غرفة_مكة للمعارض
                    </h6>
                  </div>
                </Link> */}
              </Fade>
            </Col>
          </Row>
          {/* <Row>
            {newsGallery.map((n) => (
              <Col
                md={{ span: 10 }}
                sm={{ span: 24 }}
                lg={{ span: 6 }}
                className="px-5 my-3 newsGalleryDiv"
              >
                <Fade right>
                  <Link to={n.to}>
                    <Card
                      className="newCard"
                      hoverable
                      // style={{ width: 240 }}
                      cover={
                        <div className="newCard-img">
                          <img
                            alt="new"
                            src={n.img}
                            className="newCardImg"
                            width="228 px"
                            height="218 px"
                          />
                        </div>
                      }
                    >
                      <Card.Meta
                        className="newCardData"
                        title={n.date}
                        description={n.details}
                      />
                    </Card>
                  </Link>
                </Fade>
              </Col>
            ))}
          </Row> */}
        </Container>
      </div>
      <Footer />
    </>
  );
}
