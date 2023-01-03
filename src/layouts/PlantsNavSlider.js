import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ApiUrl, hostUrl } from "../config";
import axios from "axios";
import {
  faAngleLeft,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import defaultImg from "../assets/images/navImages/navTree1.png";
import Slider from "react-slick";
import { Menu } from "antd";
import noImg from "../assets/images/plantsImages/noImgNav.png";
import { Link, NavLink } from "react-router-dom";
//import Images
export default function PlantsNavSlider() {
  const [Trees, setTrees] = useState([]);
  const [shrub, setshrub] = useState([]);
  const [soliCover, setsoliCover] = useState([]);
  const [climber, setclimber] = useState([]);
  const [greens, setgreens] = useState([]);
  const [shrubClimber, setshrubClimber] = useState([]);
  const [soilClimber, setsoilClimber] = useState([]);
  const [everyGreenArray, seteveryGreenArray] = useState([]);
  const [irrigationArray, setArrigArray] = useState([]);
  useEffect(() => {
    axios.get(`${ApiUrl}/Lookup/EvergreenStatus`).then((res) => {
      seteveryGreenArray(res.data);
    });
    axios.get(`${ApiUrl}/Lookup/IrrigationNeed`).then((res) => {
      setArrigArray(res.data);
    });
    axios
      .get(`${ApiUrl}/Plant?pageSize=9&plantTypeId=1`)
      .then((res) => {
        setTrees(res.data.plants);
      })
      .catch((error) => {});
    axios
      .get(`${ApiUrl}/Plant?pageSize=9&plantTypeId=2`)
      .then((res) => {
        setshrub(res.data.plants);
      })
      .catch((error) => {});
    axios
      .get(`${ApiUrl}/Plant?pageSize=9&plantTypeId=3`)
      .then((res) => {
        setsoliCover(res.data.plants);
      })
      .catch((error) => {});
    axios
      .get(`${ApiUrl}/Plant?pageSize=9&plantTypeId=4`)
      .then((res) => {
        setclimber(res.data.plants);
      })
      .catch((error) => {});
    axios
      .get(`${ApiUrl}/Plant?pageSize=9&plantTypeId=5`)
      .then((res) => {
        setgreens(res.data.plants);
      })
      .catch((error) => {});
    axios
      .get(`${ApiUrl}/Plant?pageSize=9&plantTypeId=6`)
      .then((res) => {
        setshrubClimber(res.data.plants);
      })
      .catch((error) => {});
    axios
      .get(`${ApiUrl}/Plant?pageSize=9&plantTypeId=7`)
      .then((res) => {
        setsoilClimber(res.data.plants);
      })
      .catch((error) => {});
  }, []);
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
    nextArrow: <FontAwesomeIcon icon={faArrowRight} />,
    prevArrow: <FontAwesomeIcon icon={faArrowLeft} />,
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
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          centerMode: false,
        },
      },
    ],
  };
  return (
    <div>
      <Slider {...settings} className="newsCarouselContainer ">
        <div className="navSliderDiv">
          {climber.length > 0 &&
            climber
              .slice(0, 1)
              .map((t) => (
                <img
                  style={{ height: "240px" }}
                  alt="new"
                  src={
                    t.mainImage !== null
                      ? `${hostUrl + t.mainImage.path}`
                      : defaultImg
                  }
                  className="newCardImg"
                />
              ))}
          <Menu.Item>
            <NavLink
              to="/4/climbers"
              activeClassName="navitem-active"
              exact
              className="navitem "
            >
              <h4>
                المتسلقات
                <FontAwesomeIcon icon={faAngleLeft} className="mx-2" />
              </h4>
              <p>تعرف علي انواع المتسلقات المتوفرة </p>
            </NavLink>
            <h5 className="moreFamousH5">الأكثر انتشارا</h5>
            <div className="">
              {climber.length > 0 &&
                climber.slice(0, 2).map((t) => (
                  <Link to={`/plantDetails/${t.id}`}>
                    <div className="miniNavPlantes">
                      <img
                        alt="new"
                        src={
                          t.mainImage !== null
                            ? `${hostUrl + t.mainImage.path}`
                            : noImg
                        }
                        className="newCardImg"
                      />
                      <Menu.Item>
                        <h4>
                          {t.name}
                          <FontAwesomeIcon
                            icon={faAngleLeft}
                            className="mx-2"
                          />
                        </h4>
                        <p>
                          {t.isBeeFriendly
                            ? "مناسبة للنحل"
                            : "غير مناسبة للنحل"}
                          -
                          {everyGreenArray.length > 0 &&
                            everyGreenArray.filter(
                              (i) => i.id === t.evergreenStatusId
                            )[0].name}
                        </p>
                      </Menu.Item>
                    </div>
                  </Link>
                ))}
            </div>
          </Menu.Item>
        </div>
        <div className="navSliderDiv">
          {greens.length > 0 &&
            greens
              .slice(0, 1)
              .map((t) => (
                <img
                  style={{ height: "240px" }}
                  alt="new"
                  src={
                    t.mainImage !== null
                      ? `${hostUrl + t.mainImage.path}`
                      : defaultImg
                  }
                  className="newCardImg"
                />
              ))}
          <Menu.Item>
            <NavLink
              to="/5/greens"
              activeClassName="navitem-active"
              exact
              className="navitem "
            >
              <h4>
                المساحات الخضراء
                <FontAwesomeIcon icon={faAngleLeft} className="mx-2" />
              </h4>
              <p>تعرف علي انواع المساحات الخضراء المتوفرة </p>
            </NavLink>
            <h5 className="moreFamousH5">الأكثر انتشارا</h5>
            <div className="">
              {greens.length > 0 &&
                greens.slice(0, 2).map((t) => (
                  <Link to={`/plantDetails/${t.id}`}>
                    <div className="miniNavPlantes">
                      <img
                        alt="new"
                        src={
                          t.mainImage !== null
                            ? `${hostUrl + t.mainImage.path}`
                            : noImg
                        }
                        className="newCardImg"
                      />
                      <Menu.Item>
                        <h4>
                          {t.name}
                          <FontAwesomeIcon
                            icon={faAngleLeft}
                            className="mx-2"
                          />
                        </h4>
                        <p>
                          {t.isBeeFriendly
                            ? "مناسبة للنحل"
                            : "غير مناسبة للنحل"}
                          -
                          {everyGreenArray.length > 0 &&
                            everyGreenArray.filter(
                              (i) => i.id === t.evergreenStatusId
                            )[0].name}
                        </p>
                      </Menu.Item>
                    </div>
                  </Link>
                ))}
            </div>
          </Menu.Item>
        </div>
        <div className="navSliderDiv">
          {shrubClimber.length > 0 &&
            shrubClimber
              .slice(0, 1)
              .map((t) => (
                <img
                  style={{ height: "240px" }}
                  alt="new"
                  src={
                    t.mainImage !== null
                      ? `${hostUrl + t.mainImage.path}`
                      : defaultImg
                  }
                  className="newCardImg"
                />
              ))}
          <Menu.Item>
            <NavLink
              to="/6/shrubClimber"
              activeClassName="navitem-active"
              exact
              className="navitem "
            >
              <h4>
                شجيرة + متسلقات
                <FontAwesomeIcon icon={faAngleLeft} className="mx-2" />
              </h4>
              <p>تعرف علي انواع شجيرة + متسلقات المتوفرة </p>
            </NavLink>
            <h5 className="moreFamousH5">الأكثر انتشارا</h5>
            <div className="">
              {shrubClimber.length > 0 &&
                shrubClimber.slice(0, 2).map((t) => (
                  <Link to={`/plantDetails/${t.id}`}>
                    <div className="miniNavPlantes">
                      <img
                        alt="new"
                        src={
                          t.mainImage !== null
                            ? `${hostUrl + t.mainImage.path}`
                            : noImg
                        }
                        className="newCardImg"
                      />
                      <Menu.Item>
                        <h4>
                          {t.name}
                          <FontAwesomeIcon
                            icon={faAngleLeft}
                            className="mx-2"
                          />
                        </h4>
                        <p>
                          {t.isBeeFriendly
                            ? "مناسبة للنحل"
                            : "غير مناسبة للنحل"}
                          -
                          {everyGreenArray.length > 0 &&
                            everyGreenArray.filter(
                              (i) => i.id === t.evergreenStatusId
                            )[0].name}
                        </p>
                      </Menu.Item>
                    </div>
                  </Link>
                ))}
            </div>
          </Menu.Item>
        </div>
        <div className="navSliderDiv">
          {soilClimber.length > 0 &&
            soilClimber
              .slice(0, 1)
              .map((t) => (
                <img
                  style={{ height: "240px" }}
                  alt="new"
                  src={
                    t.mainImage !== null
                      ? `${hostUrl + t.mainImage.path}`
                      : defaultImg
                  }
                  className="newCardImg"
                />
              ))}
          <Menu.Item>
            <NavLink
              to="/7/soilClimber"
              activeClassName="navitem-active"
              exact
              className="navitem "
            >
              <h4>
                مغطيات التربة + متسلقات
                <FontAwesomeIcon icon={faAngleLeft} className="mx-2" />
              </h4>
              <p>تعرف علي انواع مغطيات التربة + متسلقات المتوفرة </p>
            </NavLink>
            <h5 className="moreFamousH5">الأكثر انتشارا</h5>
            <div className="">
              {soilClimber.length > 0 &&
                soilClimber.slice(0, 2).map((t) => (
                  <Link to={`/plantDetails/${t.id}`}>
                    <div className="miniNavPlantes">
                      <img
                        alt="new"
                        src={
                          t.mainImage !== null
                            ? `${hostUrl + t.mainImage.path}`
                            : noImg
                        }
                        className="newCardImg"
                      />
                      <Menu.Item>
                        <h4>
                          {t.name}
                          <FontAwesomeIcon
                            icon={faAngleLeft}
                            className="mx-2"
                          />
                        </h4>
                        <p>
                          {t.isBeeFriendly
                            ? "مناسبة للنحل"
                            : "غير مناسبة للنحل"}
                          -
                          {everyGreenArray.length > 0 &&
                            everyGreenArray.filter(
                              (i) => i.id === t.evergreenStatusId
                            )[0].name}
                        </p>
                      </Menu.Item>
                    </div>
                  </Link>
                ))}
            </div>
          </Menu.Item>
        </div>
        <div className="navSliderDiv">
          {Trees.length > 0 &&
            Trees.slice(0, 1).map((t) => (
              <img
                style={{ height: "240px" }}
                alt="new"
                src={
                  t.mainImage !== null
                    ? `${hostUrl + t.mainImage.path}`
                    : defaultImg
                }
                className="newCardImg"
              />
            ))}
          <Menu.Item>
            <NavLink
              to="/1/trees"
              activeClassName="navitem-active"
              exact
              className="navitem "
            >
              <h4>
                الأشجار
                <FontAwesomeIcon icon={faAngleLeft} className="mx-2" />
              </h4>
              <p>تعرف علي انواع الاشجار المتوفرة </p>
            </NavLink>
            <h5 className="moreFamousH5">الأكثر انتشارا</h5>
            <div className="">
              {Trees.length > 0 &&
                Trees.slice(0, 2).map((t) => (
                  <Link to={`/plantDetails/${t.id}`}>
                    <div className="miniNavPlantes">
                      <img
                        alt="new"
                        src={
                          t.mainImage !== null
                            ? `${hostUrl + t.mainImage.path}`
                            : noImg
                        }
                        className="newCardImg"
                      />
                      <Menu.Item>
                        <h4>
                          {t.name}
                          <FontAwesomeIcon
                            icon={faAngleLeft}
                            className="mx-2"
                          />
                        </h4>
                        <p>
                          {t.isBeeFriendly
                            ? "مناسبة للنحل"
                            : "غير مناسبة للنحل"}
                          -
                          {everyGreenArray.length > 0 &&
                            everyGreenArray.filter(
                              (i) => i.id === t.evergreenStatusId
                            )[0].name}
                        </p>
                      </Menu.Item>
                    </div>
                  </Link>
                ))}
            </div>
          </Menu.Item>
        </div>
        <div className="navSliderDiv">
          {shrub.length > 0 &&
            shrub
              .slice(0, 1)
              .map((t) => (
                <img
                  style={{ height: "240px" }}
                  alt="new"
                  src={
                    t.mainImage !== null
                      ? `${hostUrl + t.mainImage.path}`
                      : defaultImg
                  }
                  className="newCardImg"
                />
              ))}
          <Menu.Item>
            <NavLink
              to="/2/Shrubbery"
              activeClassName="navitem-active"
              exact
              className="navitem "
            >
              <h4>
                الشجيرات <FontAwesomeIcon icon={faAngleLeft} className="mx-2" />
              </h4>
              <p>تعرف علي انواع الشجيرات المتوفرة </p>
            </NavLink>
            <h5 className="moreFamousH5">الأكثر انتشارا</h5>
            <div className="">
              {shrub.length > 0 &&
                shrub.slice(0, 2).map((t) => (
                  <Link to={`/plantDetails/${t.id}`}>
                    <div className="miniNavPlantes">
                      <img
                        alt="new"
                        src={
                          t.mainImage !== null
                            ? `${hostUrl + t.mainImage.path}`
                            : noImg
                        }
                        className="newCardImg"
                      />
                      <Menu.Item>
                        <h4>
                          {t.name}
                          <FontAwesomeIcon
                            icon={faAngleLeft}
                            className="mx-2"
                          />
                        </h4>
                        <p>
                          {t.isBeeFriendly
                            ? "مناسبة للنحل"
                            : "غير مناسبة للنحل"}
                          -
                          {everyGreenArray.length > 0 &&
                            everyGreenArray.filter(
                              (i) => i.id === t.evergreenStatusId
                            )[0].name}
                        </p>
                      </Menu.Item>
                    </div>
                  </Link>
                ))}
            </div>
          </Menu.Item>
        </div>
        <div className="navSliderDiv">
          {soliCover.length > 0 &&
            soliCover
              .slice(0, 1)
              .map((t) => (
                <img
                  style={{ height: "240px" }}
                  alt="new"
                  src={
                    t.mainImage !== null
                      ? `${hostUrl + t.mainImage.path}`
                      : defaultImg
                  }
                  className="newCardImg"
                />
              ))}
          <Menu.Item>
            <NavLink
              to="/3/SoilCover"
              activeClassName="navitem-active"
              exact
              className="navitem "
            >
              <h4>
                مغطيات التربة
                <FontAwesomeIcon icon={faAngleLeft} className="mx-2" />
              </h4>
              <p>تعرف علي انواع مغطيات التربة المتوفرة </p>
            </NavLink>
            <h5 className="moreFamousH5">الأكثر انتشارا</h5>
            <div className="">
              {soliCover.length > 0 &&
                soliCover.slice(0, 2).map((t) => (
                  <Link to={`/plantDetails/${t.id}`}>
                    <div className="miniNavPlantes">
                      <img
                        alt="new"
                        src={
                          t.mainImage !== null
                            ? `${hostUrl + t.mainImage.path}`
                            : noImg
                        }
                        className="newCardImg"
                      />
                      <Menu.Item>
                        <h4>
                          {t.name}
                          <FontAwesomeIcon
                            icon={faAngleLeft}
                            className="mx-2"
                          />
                        </h4>
                        <p>
                          {t.isBeeFriendly
                            ? "مناسبة للنحل"
                            : "غير مناسبة للنحل"}
                          -
                          {everyGreenArray.length > 0 &&
                            everyGreenArray.filter(
                              (i) => i.id === t.evergreenStatusId
                            )[0].name}
                        </p>
                      </Menu.Item>
                    </div>
                  </Link>
                ))}
            </div>
          </Menu.Item>
        </div>
      </Slider>
    </div>
  );
}
