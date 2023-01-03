import React, { useRef, useEffect } from "react";
import NavBar from "../../layouts/NavBar";
import { Button } from "antd";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../../layouts/Footer";
import "./designGuide.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
export default function DesignGuidePage() {
  const makkahRef = useRef(null);
  const taeefRef = useRef(null);
  useEffect(() => {
    if (window.location.pathname === "/greenmakkah/gaddahGuide") {
      document.body.scrollTo(0, 0);
    } else if (window.location.pathname === "/greenmakkah/makkahGuide") {
      const content = makkahRef.current;
      document.body.scrollTo({
        top: content.offsetTop,
        left: 0,
        behavior: "smooth",
      });
    } else {
      const contentTaeef = taeefRef.current;
      document.body.scrollTo({
        top: contentTaeef.offsetTop,
        left: 0,
        behavior: "smooth",
      });
    }
  }, []);
  useEffect(() => {
    if (window.location.pathname === "/greenmakkah/gaddahGuide") {
      document.body.scrollTo(0, 0);
    } else if (window.location.pathname === "/greenmakkah/makkahGuide") {
      const content = makkahRef.current;
      document.body.scrollTo({
        top: content.offsetTop,
        left: 0,
        behavior: "smooth",
      });
    } else {
      const contentTaeef = taeefRef.current;
      document.body.scrollTo({
        top: contentTaeef.offsetTop,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [window.location.pathname]);
  return (
    <>
      <NavBar />
      <div className="goalsPage">
        <div className="pageHeader mb-5">
          {/* <div className="headLinks">
            <Link to="/"> الرئيسية </Link> <span>{">"}</span>
            <Link to="/designGuide" className="activeLink">
              دليل التصاميم
            </Link>
          </div> */}
          <h3 className="headerH3">دليل التصاميم</h3>
        </div>
        <Container className="">
          <div className="amanaDiv1 amanaDiv my-5">
            <h6>أمانة محافظة جدة</h6>
            <p>
              يمكنكم دليل تصاميم محافظة جدة من إنشاء التصاميم طبقا للمعاير الى
              أقرتها امانة المحافظة تحميل دليل تصاميم محافظة جدة من هنا
            </p>
            <Button>
              <FontAwesomeIcon icon={faDownload} className="mx-2" />
              تحميل ملف التصميم
            </Button>
          </div>
          <div className="amanaDiv2 amanaDiv my-5 " ref={makkahRef}>
            <h6>أمانة محافظة مكة</h6>
            <p>
              يمكنكم دليل تصاميم محافظة مكة من إنشاء التصاميم طبقا للمعاير الى
              أقرتها امانة المحافظة تحميل دليل تصاميم محافظة مكة من هنا
            </p>
            <Button>
              {" "}
              <FontAwesomeIcon icon={faDownload} className="mx-2" />
              تحميل ملف التصميم
            </Button>
          </div>{" "}
          <div className="amanaDiv3 amanaDiv my-5" ref={taeefRef}>
            <h6>أمانة محافظة الطائف</h6>
            <p>
              يمكنكم دليل تصاميم محافظة الطائف من إنشاء التصاميم طبقا للمعاير
              الى أقرتها امانة المحافظة تحميل دليل تصاميم محافظة الطائف من هنا
            </p>
            <Button>
              <FontAwesomeIcon icon={faDownload} className="mx-2" />
              تحميل ملف التصميم
            </Button>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
}
