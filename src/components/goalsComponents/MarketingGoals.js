import React, { useState } from "react";
import Slider from "react-slick";
import img1 from "../../assets/images/goalsPage/marketGoals1.png";
import img2 from "../../assets/images/goalsPage/marketGoals2.png";
import img3 from "../../assets/images/goalsPage/marketGoals3.png";
import img4 from "../../assets/images/goalsPage/marketGoals4.png";
import img5 from "../../assets/images/goalsPage/marketGoals5.png";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
export default function MarketingGoals() {
  const [goalsData] = useState([
    {
      id: 1,
      data: " التعرف يالمبادرة وصناعة المواد الجاذبة لتساهم في رسم انطباع ايجابي لدي المسؤول و المجتمع",
      img: img1,
      width: "82%",
    },

    {
      id: 5,
      data: "المساهمة في ربط وتنسيق أعمال المبادرة",
      img: img5,
      width: "100%",
    },
    {
      id: 4,
      data: "جذب الداعمين و الرعاة و المشاركين في نجاح المبادرة",
      img: img4,
      width: "100%",
    },
    {
      id: 3,
      data: "رفع الوعي العام بأهمية البيئة والحفاظ عليها والعمل علي أستدامة موائلها الطبيعية",
      img: img3,
      width: "100%",
    },
    {
      id: 2,
      data: "تعزيز مفهمو المبادرة الذي تسعي اليه والترويج لأعمال المتعلقة بها",
      img: img2,
      width: "100%",
    },
  ]);
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    // draggable: false,
    slidesToScroll: 1,
    dots: false,
    autoplay: true,
    arrows: true,
    nextArrow: <FontAwesomeIcon icon={faArrowRight} />,
    prevArrow: <FontAwesomeIcon icon={faArrowLeft} />,
  };
  return (
    <div className="MarketGoals">
      <Container style={{ textAlign: "right" }}>
        <h4 className="startGoalsH4 ">الأهداف التسويقية </h4>
        <hr />
      </Container>
      <Slider {...settings} className=" pb-5 mb-2">
        {goalsData.map((n) => (
          <div className="marketSliderItem" style={{ width: n.width }}>
            <div
              style={{ margin: "auto" }}
              sm={{ span: 24 }}
              lg={{ span: 12 }}
              className="marketGoalsData"
            >
              <p>{n.data}</p>
            </div>

            <img
              // width="540px"
              // height="424px"
              src={n.img}
              alt="newsImage"
              className=""
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
