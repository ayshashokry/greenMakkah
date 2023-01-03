import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import new4 from "../../assets/images/landingImages/newsImages/new4.png";

import headNew1 from "../../assets/images/landingImages/newsImages/new1.png";
import headNew2 from "../../assets/images/landingImages/newsImages/new2.png";
import headNew3 from "../../assets/images/landingImages/newsImages/new3.png";
import { Card, Row, Col } from "antd";
import { Container } from "react-bootstrap";
import Fade from "react-reveal";
import NavBar from "../../layouts/NavBar";
import Footer from "../../layouts/Footer";
import "./news.css";
export default function NewsPage() {
  useEffect(() => {
    document.body.scrollTo(0, 0);
  }, []);
  const [newsGallery] = useState([
    {
      id: 4,
      date: "20/3/1990",
      details: "مؤتمر الأمن الغذائي المستدام",
      to: "/news/4",
      img: new4,
    },
  ]);
  return (
    <>
      <NavBar />
      <div className="newsPage">
        <div className="pageHeader mb-5">
          {/* <div className="headLinks">
            <Link to="/"> الرئيسية </Link> <span>{">"}</span>
            <Link to="/">المركز الإعلامي </Link> <span>{">"}</span>
            <Link to="/news" className="activeLink">
              الأخبار
            </Link>
          </div> */}
          <h3 className="headerH3">الأخبار</h3>
        </div>
        <Container>
          <Row justify="center" className="newHead px-5 mb-4 pb-5">
            <Col md={{ span: 24 }} lg={{ span: 12 }}>
              <Fade right>
                <div className="">
                  <Link to="/news/1">
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
                      <h4>
                        الفيصل يستعرض مبادرة "أخضر مكة" وآليات التوسع في
                        المسطحات الخضراء بالمنطقة
                      </h4>
                      <p>
                        رأس صاحب السمو الملكي الأمير خالد الفيصل مستشار خادم
                        الحرمين الشريفين أمير منطقة مكة المكرمة رئيس هيئة تطوير
                        المنطقة في الإمارة بجدة، اجتماعاً لاستعراض أهداف مبادرة
                        (اخضر مكة)، تم خلاله مناقشة آليات التوسع في المسطحات
                        الخضراء بالمنطقة.
                      </p>
                    </div>
                  </Link>
                </div>
              </Fade>
            </Col>
            <Col span={1}></Col>
            <Col
              md={{ span: 24 }}
              lg={{ span: 11 }}
              className="doubleImg m-auto"
            >
              <Fade left>
                {" "}
                <Link to="/news/2">
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
                      السعودية الخضراء .. حلم يتحقق ومحافظاتها
                    </h6>
                  </div>
                </Link>
                {/* <Link to="/news/3">
                  <div
                    style={{ position: "relative" }}
                    className="doubleImgHover"
                  >
                    <img
                      alt="new" width="550 px" height="270 px"
                      src={headNew3}
                      className="img-fluid doubleImgDiv"
                      style={{ borderRadius: "0 0 0 50px" }}
                    />
                    <p className="imgDate">14/2/2022</p>
                    <h6 className="imgData6">
                    الرئيس التنفيذي لـ #هيئة_تطوير_منطقة_مكة م.أحمد العارضي متحدثًا عن مبادرة أخضر مكه
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
                          <img alt="new" src={n.img} className="newCardImg" width="228 px" height="218 px"/>
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
