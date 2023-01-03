import React, { useState } from "react";
//Packages
import { Row, Col } from "antd";
import img1 from "../../assets/images/landingImages/videoSlider/1.png";
import img2 from "../../assets/images/landingImages/videoSlider/2.png";
import img3 from "../../assets/images/landingImages/videoSlider/3.png";
// import img4 from "../../assets/images/landingImages/videoSlider/4.png";
import img5 from "../../assets/images/landingImages/videoSlider/5.png";
import img6 from "../../assets/images/landingImages/videoSlider/6.png";
import videoIcon from "../../assets/images/photosGalleryPage/videoIcon.png";
import landingVideo from "../../assets/videos/landingVideo.mp4";
// import videoDataLogo from "../../assets/images/landingImages/videoSlider/videoDataLogo.png";
import Fade from "react-reveal";
import Slider from "react-slick";
import { color } from "@mui/system";
export default function VideoSlider(props) {
  const [images] = useState([
    {
      id: 1,
      title: "إطلاق مبادرة اخضر مكة إطلاق مبادرة اخضر مكة مبادرة صاحب السمو",
      img: img6,
    },
    {
      id: 2,
      title: "إطلاق مبادرة اخضر مكة إطلاق مبادرة اخضر مكة مبادرة صاحب السمو",
      img: img5,
    },
    // {
    //   id: 3,
    //   title: "إطلاق مبادرة اخضر مكة إطلاق مبادرة اخضر مكة مبادرة صاحب السمو",
    //   img: img4,
    // },
    {
      id: 4,
      title: "إطلاق مبادرة اخضر مكة إطلاق مبادرة اخضر مكة مبادرة صاحب السمو",
      img: img3,
    },
    {
      id: 5,
      title: "إطلاق مبادرة اخضر مكة إطلاق مبادرة اخضر مكة مبادرة صاحب السمو",
      img: img2,
    },
    {
      id: 6,
      title: "إطلاق مبادرة اخضر مكة إطلاق مبادرة اخضر مكة مبادرة صاحب السمو",
      img: img1,
    },
  ]);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };
  return (
    <div className="videoSlider">
      {props.videoOpened ? (
        <video
          controls
          autostart
          autoPlay
          src={landingVideo}
          className="landingVideo"
          type="video/mp4"
        />
      ) : (
        <>
          <Slider
            {...settings}
            className="newsCarouselContainer videoSliderContainer "
          >
            {images.map((n) => (
              <div className="videoCarouselItem ">
                <img src={n.img} alt="newsImage" className="videoSliderImg1" />
              </div>
            ))}
          </Slider>
          <Fade top delay={600}>
            <div className="videoData">
              <Row>
                <Col span={20}>
                  <h6>مرحبا بكم في</h6>
                  <h3>بوابة اخضر مكة</h3>
                  <p className="pt-4">ضمن مبادرة السعودية الخضراء</p>{" "}
                </Col>
              </Row>
              <p>
                لتحقيق رؤية المملكة 2030 والتى ترسخ توجه المملكة والمنطقة فى
                حماية الأرض
                <br /> والطبيعة ووضعها فى خارطة طريق ذات معالم واضحة وطموحة تسهم
                بشكل قوي فى تحقيق بيئة مستدامة
              </p>
            </div>{" "}
          </Fade>
        </>
      )}
      <p className="videoSliderIcon" onClick={props.openVideo}  style={{ color: "000000" }}>
        {props.videoOpened ? "إغلاق الفيديو" : " شاهد الفيديو"}
        <img src={videoIcon} className="videoIcon px-1" alt="videoIcon" />
      </p>
    </div>
  );
}
