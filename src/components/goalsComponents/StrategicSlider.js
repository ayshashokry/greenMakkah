import React, { useState } from "react";
//Packages
import { Container } from "react-bootstrap";
import { Row, Col } from "antd";
import img1 from "../../assets/images/goalsPage/strategicImg4.png";
import img2 from "../../assets/images/goalsPage/strategicImg1.png";
import img3 from "../../assets/images/goalsPage/strategicImg2.png";
import img4 from "../../assets/images/goalsPage/strategicImg3.png";
import Slider from "react-slick";
import Fade from "react-reveal";

export default function StrategicSlider() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrow: false,
     autoplay: true,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          centerMode: false,
          arrow: false,
          autoplay: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrow: false,
          dots: true,
          centerMode: false,
          autoplay: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          centerMode: false,
          arrow: false,
          autoplay: true,
        },
      },
    ],
  };
  const [goalsData] = useState([
    {
      id: 1,
      data: "بناء خريطة أساس للغطاء النباتي على مستوى المنطقة والمحافظات وتحديد المؤشرات القياسية.",
      img: img1,
    },

    {
      id: 2,
      data: "  مواكبة التقدم العلمي والتقني في مجال استدامة الغطاء النباتي ومصادر المياه",
      img: img2,
    },
    {
      id: 3,
      data: "  زيادة الغطاء النباتي داخل المدن والمحافظات واستصلاح الأراضي المتدهورة خارج النطاق العمراني",
      img: img3,
    },
    {
      id: 4,
      data: "جذب الداعمين و الرعاة و المشاركين في نجاح المبادرة",
      img: img4,
    },
  ]);
  return (
    <div className="startGoals">
      <Container fluid>
        <div style={{ textAlign: "right" }}>
          <h4 className="startGoalsH4 ">
            الغايات الاستراتيجية للمرحلة التأسيسية
          </h4>
          <hr />
        </div>
        <Slider {...settings} className=" pb-5 mb-2 pr-4">
          {goalsData.map((n) => (
            <div className=" StratSliderItem">
              <Row justify="center">
                <Col
                  style={{ margin: "auto" }}
                  sm={{ span: 24 }}
                  lg={{ span: 12 }}
                  md={{ span: 12 }}
                  className="strategcData"
                >
                  <Fade left>
                    <p>{n.data}</p>
                  </Fade>
                </Col>{" "}
                <Col sm={{ span: 24 }} lg={{ span: 12 }} md={{ span: 12 }}>
                  <Fade right>
                    <img
                      // width="540px"
                      // height="424px"
                      src={n.img}
                      alt="newsImage"
                      className=""
                    />
                  </Fade>
                </Col>
              </Row>
            </div>
          ))}
        </Slider>
      </Container>
    </div>
  );
}
