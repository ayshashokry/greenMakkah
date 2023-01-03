import React, { useState, useEffect } from "react";
import NavBar from "../../layouts/NavBar";
import { Container } from "react-bootstrap";
import Footer from "../../layouts/Footer";
import albumOne1 from "../../assets/images/photosGalleryPage/1/1.jpg";
import albumOne2 from "../../assets/images/photosGalleryPage/1/2.jpg";
import albumOne3 from "../../assets/images/photosGalleryPage/1/3.jpg";
import albumOne4 from "../../assets/images/photosGalleryPage/1/4.jpg";
import albumTwo1 from "../../assets/images/photosGalleryPage/2/1.jpg";
import albumTwo2 from "../../assets/images/photosGalleryPage/2/2.jpg";
import albumTwo3 from "../../assets/images/photosGalleryPage/2/3.jpg";
import albumTwo4 from "../../assets/images/photosGalleryPage/2/4.jpg";
import albumTwo5 from "../../assets/images/photosGalleryPage/2/5.jpg";
import albumTwo6 from "../../assets/images/photosGalleryPage/2/6.jpg";
import albumTwo7 from "../../assets/images/photosGalleryPage/2/7.jpg";
import albumTwo8 from "../../assets/images/photosGalleryPage/2/8.jpg";
import albumThree1 from "../../assets/images/photosGalleryPage/3/1.jpg";
import albumThree2 from "../../assets/images/photosGalleryPage/3/2.png";
import albumThree3 from "../../assets/images/photosGalleryPage/3/3.jpg";
import albumThree4 from "../../assets/images/photosGalleryPage/3/4.jpg";
import albumThree5 from "../../assets/images/photosGalleryPage/3/5.jpg";
import albumThree6 from "../../assets/images/photosGalleryPage/3/6.jpg";
import albumThree7 from "../../assets/images/photosGalleryPage/3/7.jpg";
import albumThree8 from "../../assets/images/photosGalleryPage/3/8.jpg";
import albumThree9 from "../../assets/images/photosGalleryPage/3/9.jpg";
import albumThree10 from "../../assets/images/photosGalleryPage/3/10.jpg";
import albumThree11 from "../../assets/images/photosGalleryPage/3/11.jpg";
import albumThree12 from "../../assets/images/photosGalleryPage/3/12.jpg";
import albumThree13 from "../../assets/images/photosGalleryPage/3/13.jpg";
import albumThree14 from "../../assets/images/photosGalleryPage/3/14.jpg";
import albumFour1 from "../../assets/images/photosGalleryPage/4/1.jpg";
import albumFour2 from "../../assets/images/photosGalleryPage/4/2.jpg";
import albumFour3 from "../../assets/images/photosGalleryPage/4/3.jpg";
import albumFour4 from "../../assets/images/photosGalleryPage/4/4.jpg";
import albumFour5 from "../../assets/images/photosGalleryPage/4/5.jpg";
import albumFour6 from "../../assets/images/photosGalleryPage/4/6.jpg";
import albumFour7 from "../../assets/images/photosGalleryPage/4/7.jpg";
import albumFour8 from "../../assets/images/photosGalleryPage/4/8.jpg";

// import albumFive1 from "../../assets/images/photosGalleryPage/5/1.jpg";
// import albumFive2 from "../../assets/images/photosGalleryPage/5/2.jpg";
// import albumFive3 from "../../assets/images/photosGalleryPage/5/3.jpg";
// import albumFive4 from "../../assets/images/photosGalleryPage/5/4.jpg";
// import albumFive5 from "../../assets/images/photosGalleryPage/5/5.jpg";
// import albumFive6 from "../../assets/images/photosGalleryPage/5/6.jpg";
// import albumFive7 from "../../assets/images/photosGalleryPage/5/7.jpg";

import Slider from "react-slick";
import "./gallery.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
export default function PhotosGalleryDetails() {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);

  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
    // document.body.scrollTo(0, 0);
  });
  useEffect(() => {
    document.body.scrollTo(0, 0);
  }, []);
  const slidesData1 = [
    {
      id: 1,
      img: albumOne1,
    },
    {
      id: 2,
      img: albumOne2,
    },
    {
      id: 3,
      img: albumOne3,
    },
    {
      id: 4,
      img: albumOne4,
    },
  ];
  const slidesData2 = [
    {
      id: 1,
      img: albumTwo1,
    },
    {
      id: 2,
      img: albumTwo2,
    },
    {
      id: 3,
      img: albumTwo3,
    },
    {
      id: 4,
      img: albumTwo4,
    },
    {
      id: 5,
      img: albumTwo5,
    },
    {
      id: 6,
      img: albumTwo6,
    },
    {
      id: 7,
      img: albumTwo7,
    },
    {
      id: 8,
      img: albumTwo8,
    },
  ];
  const slidesData3 = [
    {
      id: 1,
      img: albumThree1,
    },
    {
      id: 2,
      img: albumThree2,
    },
    {
      id: 3,
      img: albumThree3,
    },
    {
      id: 4,
      img: albumThree4,
    },
    {
      id: 5,
      img: albumThree5,
    },
    {
      id: 6,
      img: albumThree6,
    },
    {
      id: 7,
      img: albumThree7,
    },
    {
      id: 8,
      img: albumThree8,
    },
    {
      id: 9,
      img: albumThree9,
    },
    {
      id: 10,
      img: albumThree10,
    },
    {
      id: 11,
      img: albumThree11,
    },
    {
      id: 12,
      img: albumThree12,
    },
    {
      id: 13,
      img: albumThree13,
    },
    {
      id: 14,
      img: albumThree14,
    },
  ];
  const slidesData4 = [
    {
      id: 1,
      img: albumFour1,
    },
    {
      id: 2,
      img: albumFour2,
    },
    {
      id: 3,
      img: albumFour3,
    },
    {
      id: 4,
      img: albumFour4,
    },
    {
      id: 5,
      img: albumFour5,
    },
    {
      id: 6,
      img: albumFour6,
    },
    {
      id: 7,
      img: albumFour7,
    },
    {
      id: 8,
      img: albumFour8,
    },
  ];
  // const slidesData5 = [
  //   {
  //     id: 1,
  //     img: albumFive1,
  //   },
  //   {
  //     id: 2,
  //     img: albumFive2,
  //   },
  //   {
  //     id: 3,
  //     img: albumFive3,
  //   },
  //   {
  //     id: 4,
  //     img: albumFive4,
  //   },
  //   {
  //     id: 5,
  //     img: albumFive5,
  //   },
  //   {
  //     id: 6,
  //     img: albumFive6,
  //   },
  //   {
  //     id: 7,
  //     img: albumFive7,
  //   },
  // ];
  const settingsMain = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <FontAwesomeIcon icon={faArrowRight} />,
    prevArrow: <FontAwesomeIcon icon={faArrowLeft} />,
    asNavFor: ".slider-nav",
  };

  const settingsThumbs1 = {
    asNavFor: ".slider-for",
    slidesToShow: slidesData1.length,
    dots: false,
    centerMode: false,
    swipeToSlide: false,
    focusOnSelect: true,
  };
  const settingsThumbs2 = {
    asNavFor: ".slider-for",
    slidesToShow: slidesData2.length,
    dots: false,
    centerMode: false,
    swipeToSlide: false,
    focusOnSelect: true,
  };
  const settingsThumbs3 = {
    asNavFor: ".slider-for",
    slidesToShow: slidesData3.length,
    dots: false,
    centerMode: false,
    swipeToSlide: false,
    focusOnSelect: true,
  };
  const settingsThumbs4 = {
    asNavFor: ".slider-for",
    slidesToShow: slidesData4.length,
    dots: false,
    centerMode: false,
    swipeToSlide: false,
    focusOnSelect: true,
  };
  // const settingsThumbs5 = {
  //   asNavFor: ".slider-for",
  //   slidesToShow: slidesData5.length,
  //   dots: false,
  //   centerMode: false,
  //   swipeToSlide: false,
  //   focusOnSelect: true,
  // };

  return (
    <>
      <NavBar />
      <div className="galleryPage galleryDetails">
        <div className="pageHeader mb-5">
          {/* <div className="headLinks">
            <Link to="/"> الرئيسية </Link> <span>{">"}</span>
            <Link to="/">المركز الإعلامي</Link> <span>{">"}</span>
            <Link to="/goals" className="activeLink">
              معرض الصور
            </Link>
          </div> */}
          {window.location.pathname.slice(26) == 1 ? (
            <h3 className="headerH3">اللوز البجلي</h3>
          ) : window.location.pathname.slice(26) == 2 ? (
            <h3 className="headerH3">ملتقي صناع العقار</h3>
          ) : window.location.pathname.slice(26) == 3 ? (
            <h3 className="headerH3">منطقة مكة ومعالمها</h3>
          ) : window.location.pathname.slice(26) == 4 ? (
            <h3 className="headerH3">مؤتمر الأمن الغذائي</h3>
          ) : (
            <h3 className="headerH3">الألبوم الخامس</h3>
          )}
        </div>
        {window.location.pathname.slice(26) == 1 ? (
          <Container className="">
            <div className="galleryMainSlider">
              <Slider
                {...settingsMain}
                asNavFor={nav2}
                ref={(slider) => setSlider1(slider)}
                className="newsCarouselContainer mb-2"
              >
                {slidesData1.map((slide) => (
                  <div className="videoCarouselItem " key={slide.id}>
                    <img
                      src={slide.img}
                      alt="newsImage"
                      className="videoSliderImg"
                    />
                  </div>
                ))}
              </Slider>
            </div>
            <div className="slider-wrapper">
              <div className="thumbnail-slider">
                <Slider
                  {...settingsThumbs1}
                  asNavFor={nav1}
                  ref={(slider) => setSlider2(slider)}
                >
                  {slidesData1.map((slide) => (
                    <div className="slick-slide" key={slide.id}>
                      <img
                        className="slick-slide-image1"
                        src={slide.img}
                        alt="slideImg"
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </Container>
        ) : window.location.pathname.slice(26) == 2 ? (
          <Container className="">
            <div className="galleryMainSlider">
              <Slider
                {...settingsMain}
                asNavFor={nav2}
                ref={(slider) => setSlider1(slider)}
                className="newsCarouselContainer mb-2"
              >
                {slidesData2.map((slide) => (
                  <div className="videoCarouselItem " key={slide.id}>
                    <img
                      src={slide.img}
                      alt="newsImage"
                      className="videoSliderImg"
                    />
                  </div>
                ))}
              </Slider>
            </div>
            <div className="slider-wrapper">
              <div className="thumbnail-slider">
                <Slider
                  {...settingsThumbs2}
                  asNavFor={nav1}
                  ref={(slider) => setSlider2(slider)}
                >
                  {slidesData2.map((slide) => (
                    <div className="slick-slide" key={slide.id}>
                      <img
                        className="slick-slide-image1"
                        src={slide.img}
                        alt="slideImg"
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </Container>
        ) : window.location.pathname.slice(26) == 3 ? (
          <Container className="">
            <div className="galleryMainSlider">
              <Slider
                {...settingsMain}
                asNavFor={nav2}
                ref={(slider) => setSlider1(slider)}
                className="newsCarouselContainer mb-2"
              >
                {slidesData3.map((slide) => (
                  <div className="videoCarouselItem " key={slide.id}>
                    <img
                      src={slide.img}
                      alt="newsImage"
                      className="videoSliderImg"
                    />
                  </div>
                ))}
              </Slider>
            </div>
            <div className="slider-wrapper">
              <div className="thumbnail-slider">
                <Slider
                  {...settingsThumbs3}
                  asNavFor={nav1}
                  ref={(slider) => setSlider2(slider)}
                >
                  {slidesData3.map((slide) => (
                    <div className="slick-slide" key={slide.id}>
                      <img
                        className="slick-slide-image1"
                        src={slide.img}
                        alt="slideImg"
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </Container>
        ) : window.location.pathname.slice(26) == 4 ? (
          <Container className="">
            <div className="galleryMainSlider">
              <Slider
                {...settingsMain}
                asNavFor={nav2}
                ref={(slider) => setSlider1(slider)}
                className="newsCarouselContainer mb-2"
              >
                {slidesData4.map((slide) => (
                  <div className="videoCarouselItem " key={slide.id}>
                    <img
                      src={slide.img}
                      alt="newsImage"
                      className="videoSliderImg"
                    />
                  </div>
                ))}
              </Slider>
            </div>
            <div className="slider-wrapper">
              <div className="thumbnail-slider">
                <Slider
                  {...settingsThumbs4}
                  asNavFor={nav1}
                  ref={(slider) => setSlider2(slider)}
                >
                  {slidesData4.map((slide) => (
                    <div className="slick-slide" key={slide.id}>
                      <img
                        className="slick-slide-image1"
                        src={slide.img}
                        alt="slideImg"
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </Container>
        ) : // <Container className="">
        //   <div className="galleryMainSlider">
        //     <Slider
        //       {...settingsMain}
        //       asNavFor={nav2}
        //       ref={(slider) => setSlider1(slider)}
        //       className="newsCarouselContainer mb-2"
        //     >
        //       {slidesData5.map((slide) => (
        //         <div className="videoCarouselItem " key={slide.id}>
        //           <img
        //             src={slide.img}
        //             alt="newsImage"
        //             className="videoSliderImg"
        //           />
        //         </div>
        //       ))}
        //     </Slider>
        //   </div>
        //   <div className="slider-wrapper">
        //     <div className="thumbnail-slider">
        //       <Slider
        //         {...settingsThumbs5}
        //         asNavFor={nav1}
        //         ref={(slider) => setSlider2(slider)}
        //       >
        //         {slidesData5.map((slide) => (
        //           <div className="slick-slide" key={slide.id}>
        //             <img
        //               className="slick-slide-image1"
        //               src={slide.img}
        //               alt="slideImg"
        //             />
        //           </div>
        //         ))}
        //       </Slider>
        //     </div>
        //   </div>
        // </Container>
        null}
      </div>
      <Footer />
    </>
  );
}
