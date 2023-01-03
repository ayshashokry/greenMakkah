import React, { useState } from "react";
import Slider from "react-slick";
import { Row, Col } from "antd";
import img1 from "../../assets/images/goalsPage/goalSliderImg2.png";
import img2 from "../../assets/images/goalsPage/goalSliderImg3.png";
import img3 from "../../assets/images/goalsPage/goalSliderImg4.png";
import img4 from "../../assets/images/goalsPage/goalSliderImg5.png";
export default function GoalsSlider() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    draggable: false,
    slidesToScroll: 1,
    dots: false,
    centerPadding: "60px",
    autoplay: true,
    // fade: true,
    className: "center",
    centerMode: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          centerMode: false,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false,
          centerMode: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          centerMode: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          centerMode: false,
        },
      },
    ],
  };
  const [showBack, setShowCardBack] = useState(false);
  const flipCard = () => {
    setShowCardBack(!showBack);
  };
  return (
    <div className="goalsSlider">
      <h6 className="goalsSliderFirstTitle">الأهداف العامة للمبادرة</h6>
      <Row>
        <Col md={{ span: 6 }} sm={{ span: 6 }} lg={{ span: 5 }}>
          <div className="goalsSliderFirst">
            <p>الأهداف العامة للمبادرة</p>
          </div>
        </Col>
        <Col
          md={{ span: 18 }}
          sm={{ span: 24 }}
          lg={{ span: 19 }}
          className="goalsSliderCol"
        >
          <Slider {...settings}>
            <div class="flip-card">
              <div class="flip-card-inner ">
                <div
                  class="flip-card-front"
                  onClick={flipCard}
                  id={showBack ? "none" : "showFront"}
                >
                  <img alt="goalImg" src={img1} className="img-fluid" />
                  <p>زيادة نسبة الغطاء النباتي</p>
                </div>
                <div
                  class="flip-card-back"
                  onClick={flipCard}
                  id={showBack ? "showBack" : "none"}
                >
                  <p>
                    زيادة نسبة الغطاء النباتي في محافظات ومراكز منطقة مكة
                    المكرمة
                  </p>
                </div>
              </div>
            </div>
            <div class="flip-card">
              <div class="flip-card-inner ">
                <div
                  class="flip-card-front"
                  onClick={flipCard}
                  id={showBack ? "none" : "showFront"}
                >
                  <img alt="goalImg" src={img2} className="img-fluid" />
                  <p>رفع مستوى الإلتزام البيئي</p>
                </div>
                <div class="flip-card-back"
                  onClick={flipCard}
                  id={showBack ? "showBack" : "none"}>
                  <p>
                    رفع مستوى الإلتزام البيئي لتعزيز إستدامة البيئة وتحسين جودة
                    الحياة
                  </p>
                </div>
              </div>
            </div>
            <div class="flip-card">
              <div class="flip-card-inner ">
                <div
                  class="flip-card-front"
                  onClick={flipCard}
                  id={showBack ? "none" : "showFront"}
                >
                  <img alt="goalImg" src={img3} className="img-fluid" />
                  <p>حماية وتنمية الموائل الطبيعية</p>
                </div>
                <div class="flip-card-back"
                  onClick={flipCard}
                  id={showBack ? "showBack" : "none"}>
                  <p>حماية وتنمية الموائل الطبيعية وازدهارها وتعزيز وظائفها</p>
                </div>
              </div>
            </div>

            <div class="flip-card">
              <div class="flip-card-inner ">
                <div
                  class="flip-card-front"
                  onClick={flipCard}
                  id={showBack ? "none" : "showFront"}
                >
                  <img alt="goalImg" src={img4} className="img-fluid" />
                  <p>الاستفادة من مصادر المياه</p>
                </div>
                <div class="flip-card-back"
                  onClick={flipCard}
                  id={showBack ? "showBack" : "none"}>
                  <p>
                    {" "}
                    الاستفادة من مصادر المياه واستدامتها والحفاظ عليها كثروة
                    وطنية
                  </p>{" "}
                </div>
              </div>
            </div>
          </Slider>
        </Col>
      </Row>
    </div>
  );
}
