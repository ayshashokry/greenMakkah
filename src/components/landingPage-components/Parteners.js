import React, { useState } from "react";
import Slider from "react-slick";
import img1 from "../../assets/images/landingImages/partenerImg/1.png";
import img2 from "../../assets/images/landingImages/partenerImg/2.png";
import img3 from "../../assets/images/landingImages/partenerImg/3.png";
import img4 from "../../assets/images/landingImages/partenerImg/4.png";
import img5 from "../../assets/images/landingImages/partenerImg/5.png";
import img6 from "../../assets/images/landingImages/partenerImg/6.png";
import img7 from "../../assets/images/landingImages/partenerImg/7.png";
import img8 from "../../assets/images/landingImages/partenerImg/8.png";
import img9 from "../../assets/images/landingImages/partenerImg/9.png";
import img10 from "../../assets/images/landingImages/partenerImg/10.png";
import img11 from "../../assets/images/landingImages/partenerImg/11.png";
import img12 from "../../assets/images/landingImages/partenerImg/12.png";
import img13 from "../../assets/images/landingImages/partenerImg/13.png";
import img14 from "../../assets/images/landingImages/partenerImg/14.png";
import img15 from "../../assets/images/landingImages/partenerImg/15.png";
import img16 from "../../assets/images/landingImages/partenerImg/16.png";
import img17 from "../../assets/images/landingImages/partenerImg/17.png";
import img18 from "../../assets/images/landingImages/partenerImg/18.png";
import img19 from "../../assets/images/landingImages/partenerImg/19.png";
import img20 from "../../assets/images/landingImages/partenerImg/20.png";
import img21 from "../../assets/images/landingImages/partenerImg/21.png";
import img22 from "../../assets/images/landingImages/partenerImg/22.png";
import img23 from "../../assets/images/landingImages/partenerImg/23.png";
import img24 from "../../assets/images/landingImages/partenerImg/24.png";
import img25 from "../../assets/images/landingImages/partenerImg/25.png";
import img26 from "../../assets/images/landingImages/partenerImg/26.png";
import img27 from "../../assets/images/landingImages/partenerImg/27.png";
import img28 from "../../assets/images/landingImages/partenerImg/28.png";
import img29 from "../../assets/images/landingImages/partenerImg/29.png";
import img30 from "../../assets/images/landingImages/partenerImg/30.png";
import img31 from "../../assets/images/landingImages/partenerImg/31.png";
import img32 from "../../assets/images/landingImages/partenerImg/32.png";
import img33 from "../../assets/images/landingImages/partenerImg/33.png";
import img34 from "../../assets/images/landingImages/partenerImg/34.png";
import img35 from "../../assets/images/landingImages/partenerImg/35.png";
import img36 from "../../assets/images/landingImages/partenerImg/36.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
export default function Parteners(props) {
  const [parteners] = useState([
    { id: 1, img: img36 },
    { id: 2, img: img35 },
    { id: 3, img: img34 },
    { id: 4, img: img33 },
    { id: 5, img: img32 },
    { id: 6, img: img31 },
    { id: 7, img: img30 },
    { id: 8, img: img29 },
    { id: 9, img: img28 },
    { id: 10, img: img27 },
    { id: 11, img: img26 },
    { id: 12, img: img25 },
    { id: 13, img: img24 },
    { id: 14, img: img23 },
    { id: 15, img: img22 },
    { id: 16, img: img21 },
    { id: 17, img: img20 },
    { id: 18, img: img19 },
    { id: 19, img: img18 },
    { id: 20, img: img17 },
    { id: 21, img: img16 },
    { id: 22, img: img15 },
    { id: 23, img: img14 },
    { id: 24, img: img13 },
    { id: 25, img: img12 },
    { id: 26, img: img11 },
    { id: 27, img: img10 },
    { id: 28, img: img9 },
    { id: 29, img: img8 },
    { id: 30, img: img7 },
    { id: 31, img: img6 },
    { id: 32, img: img5 },
    { id: 33, img: img4 },
    { id: 34, img: img3 },
    { id: 35, img: img2 },
    { id: 36, img: img1 },
  ]);
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    dots: false,
    autoplay: true,
    nextArrow: <FontAwesomeIcon icon={faArrowRight} />,
    prevArrow: <FontAwesomeIcon icon={faArrowLeft} />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };
  return (
    <div className="parteners" ref={props.section6Ref}>
      <h4>شركاء المبادرة</h4>
      <hr />
      <Slider {...settings}>
        {parteners.map((p) => (
          <div className="partenerDiv">
            <img src={p.img} alt="partenerImg" />
          </div>
        ))}
      </Slider>
    </div>
  );
}
