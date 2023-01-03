import React, { useEffect } from "react";
import NavBar from "../../layouts/NavBar";
import { Row, Col } from "antd";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../../layouts/Footer";
import albumOne1 from "../../assets/images/photosGalleryPage/1/1.jpg";
import albumOne2 from "../../assets/images/photosGalleryPage/1/2.jpg";
import albumOne3 from "../../assets/images/photosGalleryPage/1/3.jpg";
import albumTwo1 from "../../assets/images/photosGalleryPage/2/1.jpg";
import albumTwo2 from "../../assets/images/photosGalleryPage/2/2.jpg";
import albumTwo3 from "../../assets/images/photosGalleryPage/2/3.jpg";
import albumThree1 from "../../assets/images/photosGalleryPage/3/1.jpg";
import albumThree2 from "../../assets/images/photosGalleryPage/3/2.png";
import albumThree3 from "../../assets/images/photosGalleryPage/3/3.jpg";
import albumFour1 from "../../assets/images/photosGalleryPage/4/1.jpg";
import albumFour2 from "../../assets/images/photosGalleryPage/4/2.jpg";
import albumFour3 from "../../assets/images/photosGalleryPage/4/3.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import "./gallery.css";
export default function PhotoGalleryPage() {
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
            <Link to="/photoGallery" className="activeLink">
              معرض الصور
            </Link>
          </div> */}
          <h3 className="headerH3">معرض الصور</h3>
        </div>
        <Container className="">
          <div className="albumDiv my-4">
            <Row>
              <Col span={16}>
                <div className="albumDivImg">
                  <img src={albumOne1} className="img-fluid" alt="galleryImg" />
                </div>
                <h4>اللوز البجلي</h4>
              </Col>

              <Col span={8}>
                <div className="albumDivLeftImg">
                  <img src={albumOne2} className="img-fluid" alt="galleryImg" />
                </div>
                <div className="albumDivLeftImg albumDivLeftImg3">
                  <img src={albumOne3} className="img-fluid" alt="galleryImg" />
                  <p className="showAlbum">
                    3+ <br />
                    <Link to="/photoGallery/1">
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
                <div className="albumDivImg">
                  <img src={albumTwo1} className="img-fluid" alt="galleryImg" />
                </div>
                <h4>ملتقي صناع العقار</h4>
              </Col>

              <Col span={8}>
                <div className="albumDivLeftImg">
                  <img src={albumTwo2} className="img-fluid" alt="galleryImg" />
                </div>
                <div className="albumDivLeftImg albumDivLeftImg3">
                  {" "}
                  <img src={albumTwo3} className="img-fluid" alt="galleryImg" />
                  <p className="showAlbum">
                    5+ <br />
                    <Link to="/photoGallery/2">
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
                <div className="albumDivImg">
                  <img
                    src={albumThree1}
                    className="img-fluid"
                    alt="galleryImg"
                  />
                </div>
                <h4>منطقة مكة ومعالمها</h4>
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
                    3+ <br />
                    <Link to="/photoGallery/3">
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
                <div className="albumDivImg">
                  <img
                    src={albumFour1}
                    className="img-fluid"
                    alt="galleryImg"
                  />
                </div>
                <h4>مؤتمر الأمن الغذائي</h4>
              </Col>

              <Col span={8}>
                <div className="albumDivLeftImg">
                  <img
                    src={albumFour2}
                    className="img-fluid"
                    alt="galleryImg"
                  />
                </div>
                <div className="albumDivLeftImg albumDivLeftImg3">
                  {" "}
                  <img
                    src={albumFour3}
                    className="img-fluid"
                    alt="galleryImg"
                  />
                  <p className="showAlbum">
                    3+ <br />
                    <Link to="/photoGallery/4">
                      استعرض الألبوم <FontAwesomeIcon icon={faAngleLeft} />
                    </Link>
                  </p>
                </div>
              </Col>
            </Row>
          </div>{" "}
          {/* <div className="albumDiv my-4">
            <Row>
              <Col span={16}>
                <div className="albumDivImg">
                  <img
                    src={albumFive1}
                    className="img-fluid"
                    alt="galleryImg"
                  />
                </div>
                <h4>الألبوم الخامس</h4>
              </Col>

              <Col span={8}>
                <div className="albumDivLeftImg">
                  <img
                    src={albumFive2}
                    className="img-fluid"
                    alt="galleryImg"
                  />
                </div>
                <div className="albumDivLeftImg albumDivLeftImg3">
                  {" "}
                  <img
                    src={albumFive3}
                    className="img-fluid"
                    alt="galleryImg"
                  />
                  <p className="showAlbum">
                    3+ <br />
                    <Link to="/photoGallery/5">
                      استعرض الألبوم <FontAwesomeIcon icon={faAngleLeft} />
                    </Link>
                  </p>
                </div>
              </Col>
            </Row>
          </div> */}
        </Container>
      </div>
      <Footer />
    </>
  );
}
