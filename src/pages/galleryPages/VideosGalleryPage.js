import React, { useEffect } from "react";
import NavBar from "../../layouts/NavBar";
import { Row, Col } from "antd";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../../layouts/Footer";
import videoIcon from "../../assets/images/photosGalleryPage/videoIcon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import "./gallery.css";
import albumOne1 from "../../assets/images/videosGalleryPage/1/1.png";
import albumOne2 from "../../assets/images/videosGalleryPage/1/2.png";
import albumTwo1 from "../../assets/images/videosGalleryPage/2/1.jpg";
import albumTwo2 from "../../assets/images/videosGalleryPage/2/2.jpg";
import noVideoImg from "../../assets/images/plantsImages/noImg.png";
import albumThree1 from "../../assets/images/videosGalleryPage/3/1.jpg";
import albumThree2 from "../../assets/images/videosGalleryPage/3/2.jpg";
import albumThree3 from "../../assets/images/videosGalleryPage/3/3.jpg";

export default function VideosGalleryPage() {
  useEffect(() => {
    document.body.scrollTo(0, 0);
  }, []);
  return (
    <>
      <NavBar />
      <div className="galleryPage">
        <div className="pageHeader mb-5">
          {/* <div className="headLinks">
            <Link to="/"> الرئيسية </Link> <span>{">"}</span>
            <Link to="/">المركز الإعلامي</Link> <span>{">"}</span>
            <Link to="/videoGallery" className="activeLink">
              معرض الفيديوهات
            </Link>
          </div> */}
          <h3 className="headerH3">معرض الفيديوهات</h3>
        </div>
        <Container className="">
          <div className="albumDiv my-4">
            <Row>
              <Col span={16}>
                <img src={albumOne1} className="img-fluid" alt="galleryImg" />
                <h4>الألبوم الأول</h4>
                <img src={videoIcon} className="videoIcon" alt="videoIcon" />
              </Col>

              <Col span={8}>
                <div className="albumDivLeftImg">
                  <img src={albumOne2} className="img-fluid" alt="galleryImg" />
                </div>
                <div className="albumDivLeftImg albumDivLeftImg3">
                  {" "}
                  <img
                    src={noVideoImg}
                    className="img-fluid"
                    alt="galleryImg"
                  />
                  <p className="showAlbum">
                    60+ <br />
                    <Link to="/videoGallery/taeef">
                      استعرض الألبوم <FontAwesomeIcon icon={faAngleLeft} />
                    </Link>
                  </p>
                </div>
              </Col>
            </Row>
          </div>
          <div className="albumDiv my-4">
            <Row>
              <Col span={16}>
                <img src={albumTwo1} className="img-fluid" alt="galleryImg" />
                <h4>الألبوم الثاني</h4>{" "}
                <img src={videoIcon} className="videoIcon" alt="videoIcon" />
              </Col>

              <Col span={8}>
                <div className="albumDivLeftImg">
                  <img src={albumTwo2} className="img-fluid" alt="galleryImg" />
                </div>
                <div className="albumDivLeftImg albumDivLeftImg3">
                  {" "}
                  <img
                    src={noVideoImg}
                    className="img-fluid"
                    alt="galleryImg"
                  />
                  <p className="showAlbum">
                    60+ <br />
                    <Link to="/videoGallery/makkah">
                      استعرض الألبوم <FontAwesomeIcon icon={faAngleLeft} />
                    </Link>
                  </p>
                </div>
              </Col>
            </Row>
          </div>{" "}
          <div className="albumDiv my-4">
            <Row>
              <Col span={16}>
                <img src={albumThree1} className="img-fluid" alt="galleryImg" />
                <h4>الألبوم الثالث</h4>{" "}
                <img src={videoIcon} className="videoIcon" alt="videoIcon" />
              </Col>

              <Col span={8}>
                <div className="albumDivLeftImg">
                  <img
                    src={albumThree2}
                    className="img-fluid"
                    alt="galleryImg"
                  />
                </div>
                <div className="albumDivLeftImg albumDivLeftImg3">
                  {" "}
                  <img
                    src={albumThree3}
                    className="img-fluid"
                    alt="galleryImg"
                  />
                  <p className="showAlbum">
                    60+ <br />
                    <Link to="/videoGallery/gaddah">
                      استعرض الألبوم <FontAwesomeIcon icon={faAngleLeft} />
                    </Link>
                  </p>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
}
