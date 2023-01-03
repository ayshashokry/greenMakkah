import React, { useState, useEffect } from "react";
import NavBar from "../../layouts/NavBar";
import { Row, Col } from "antd";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../../layouts/Footer";

import "./gallery.css";
export default function VideoGalleryDetails() {
  useEffect(() => {
    document.body.scrollTo(0, 0);
  }, []);
  const [videos] = useState([
    {
      id: 1,
      videoSrc: "https://www.youtube.com/embed/qULkjDccCeY?controls=0",
    },
    { id: 2, videoSrc: "https://www.youtube.com/embed/RzVvThhjAKw?controls=0" },
    { id: 3, videoSrc: "https://www.youtube.com/embed/d0tU18Ybcvk?controls=0" },
    { id: 4, videoSrc: "https://www.youtube.com/embed/4KzFe50RQkQ?controls=0" },
    {
      id: 5,
      videoSrc: "https://www.youtube.com/embed/qULkjDccCeY?controls=0",
    },
    { id: 6, videoSrc: "https://www.youtube.com/embed/RzVvThhjAKw?controls=0" },
    { id: 7, videoSrc: "https://www.youtube.com/embed/d0tU18Ybcvk?controls=0" },
    { id: 8, videoSrc: "https://www.youtube.com/embed/4KzFe50RQkQ?controls=0" },
    {
      id: 9,
      videoSrc: "https://www.youtube.com/embed/w77zPAtVTuI?controls=0",
    },
  ]);
  return (
    <>
      <NavBar />
      <div className="galleryPage galleryDetails">
        <div className="pageHeader mb-5">
          {/* <div className="headLinks">
            <Link to="/"> الرئيسية </Link> <span>{">"}</span>
            <Link to="/">المركز الإعلامي</Link> <span>{">"}</span>
            <Link to="/videoGallery" className="activeLink">
              معرض الفيديوهات
            </Link>
          </div> */}
          {window.location.pathname.slice(26) === "taeef" ? (
            <h3 className="headerH3">الألبوم الأول</h3>
          ) : window.location.pathname.slice(26) === "makkah" ? (
            <h3 className="headerH3">الألبوم الثاني </h3>
          ) : (
            <h3 className="headerH3">الألبوم الثالث </h3>
          )}
        </div>
        <Container className="">
          <div className="galleryMainSlider">
            <iframe
              title="main/Video"
              width="100%"
              height="345"
              src="https://www.youtube.com/embed/w77zPAtVTuI?controls=0"
            ></iframe>
          </div>
          <Row className="videoGalleryRow">
            {videos.map((v) => (
              <Col md={{ span: 12 }} sm={{ span: 24 }} lg={{ span: 8 }}>
                <iframe
                  title="main/Video"
                  width="100%"
                  height="345"
                  src={v.videoSrc}
                ></iframe>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
}
