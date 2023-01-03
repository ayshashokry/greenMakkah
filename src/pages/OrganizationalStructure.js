import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import baseImg from "../assets/images/organizationalBase.png";
import treeImg from "../assets/images/organizationalTree.png";

import { Card, Row, Col } from "antd";
import { Container } from "react-bootstrap";
import Fade from "react-reveal";
import NavBar from "../layouts/NavBar";
import Footer from "../layouts/Footer";
export default function OrganizationalStructure() {
  useEffect(() => {
    document.body.scrollTo(0, 0);
  }, []);
  return (
    <>
      <NavBar />
      <div className="newsPage organPage">
        <div className="pageHeader mb-5">
          {/* <div className="headLinks">
            <Link to="/"> الرئيسية </Link> <span>{">"}</span>
            <Link to="/">المركز الإعلامي </Link> <span>{">"}</span>
            <Link to="/organizationalStructure" className="activeLink">
              الهيكل التنظيمي
            </Link>
          </div> */}
          <h3 className="headerH3"> الهيكل التنظيمي لفريق العمل </h3>
        </div>
        <Container fluid>
          <Fade top>
            <div style={{ textAlign: "center" }}>
              <img src={treeImg} className="img-fluid" alt="orgImg" />
            </div>
          </Fade>
          <Fade bottom>
            <div style={{ textAlign: "center" }}>
              <img src={baseImg} className="img-fluid" alt="orgImg" />
            </div>
          </Fade>
        </Container>
      </div>
      <Footer />
    </>
  );
}
