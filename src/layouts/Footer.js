import React from "react";
import { Row, Col } from "antd";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toArabic } from "arabic-digits";
import Logo from "../assets/images/whiteLogo1.svg";
import Logo2 from "../assets/images/footerLogo2.png";
import {
  faEdgeLegacy,
  faFirefoxBrowser,
  faChrome,
  faYoutube,
  faTwitter,
  faSafari,
} from "@fortawesome/free-brands-svg-icons";
import "./layout.css";
export default function Footer(props) {
  return (
    <div className="footer" ref={props.section7Ref}>
      <Container fluid>
        <Row className="mb-4 pt-3 ">
          <Col
            xs={{ span: 12 }}
            lg={{ span: 12 }}
            style={{ textAlign: "right" }}
            push={2}
          >
            <img
              src={Logo}
              alt="whiteLogo"
              style={{
                width: "200px",
                paddingBottom: "14px",
              }}
            />
            <img
              src={Logo2}
              alt="whiteLogo"
              className="footerLogo2"
              style={{
                width: "auto",
                paddingRight: "15px",
              }}
            />
          </Col>
          <Col xs={{ span: 2 }} lg={{ span: 4 }}></Col>
          <Col
            xs={{ span: 10 }}
            lg={{ span: 6 }}
            style={{ textAlign: "left" }}
            className=""
          >
            <span>
              <a
                className="iconLink"
                // href="https://www.youtube.com/channel/UC5k-pTxG2WTlj0Bbzcmk6RA"
                href="https://youtube.com/makkahauthority"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon
                  icon={faYoutube}
                  className="fa-2x youtubeIcon"
                />
              </a>
            </span>
            <span
              className="navitemBorder mt-3"
              style={{ height: "30px" }}
            ></span>

            <span>
              <a
                className="iconLink"
                href="https://twitter.com/GI_makkah"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon
                  icon={faTwitter}
                  className="fa-2x twitterIcon"
                />
              </a>
            </span>
          </Col>
        </Row>
        <Row className="footerGrid">
          <Col
            md={{ span: 12 }}
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            lg={{ span: 6 }}
            push={2}
          >
            <h5>روابط هامة</h5>
            <ul>
              <li>
                <a
                  className="iconLink"
                  href="https://www.mrda.gov.sa/index.aspx"
                  target="_blank"
                  rel="noreferrer"
                >
                  هيئة تطوير منطقة مكة المكرمة
                </a>
              </li>
              <li>
                {" "}
                <a
                  className="iconLink"
                  href="https://www.makkah.gov.sa/"
                  target="_blank"
                  rel="noreferrer"
                >
                  {" "}
                  أمانة مكة المكرمة
                </a>
              </li>
              <li>
                {" "}
                <a
                  className="iconLink"
                  href="https://almobdioon.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  مركز المبدعون
                </a>
              </li>
            </ul>
          </Col>
          <Col
            md={{ span: 12 }}
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            lg={{ span: 6 }}
            push={2}
          >
            <h5>مبادرة أخضر مكة</h5>
            <ul>
              <Link to="/vision">
                <li>الرؤية</li>
              </Link>
              {/* <Link to="/organizationalStructure">
                <li> الهيكل التنظيمي</li>{" "}
              </Link> */}

              <Link to="/goals">
                <li>الأهداف</li>{" "}
              </Link>
            </ul>
          </Col>
          <Col
            md={{ span: 12 }}
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            lg={{ span: 6 }}
            push={2}
          >
            <h5>المركز الإعلامي</h5>
            <ul>
              <Link to="/news">
                <li>الأخبار</li>
              </Link>
              <Link to="/events">
                <li> الأحداث والفعاليات</li>
              </Link>
              <Link to="/photoGallery">
                <li>معرض الصور</li>
              </Link>
              {/* <Link to="/videoGallery">
                <li>الفيديوهات</li>
              </Link> */}
            </ul>
          </Col>
          <Col
            md={{ span: 12 }}
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            lg={{ span: 6 }}
            push={2}
          >
            <h5>تواصل معنا </h5>
            <ul>
              <Link to="/contactUs">
                <li>جهات الاتصال </li>
              </Link>

              <Link to="/messageUs">
                <li>راسلنا</li>
              </Link>
            </ul>
          </Col>
        </Row>
      </Container>

      <div className="footCondition">
        <p>الشروط اللازمة التي يجب توافرها في البنية المشغلة للموقع</p>
        <p>
          مقاس الشاشة لا يقل عن 600 يدعم متصفحات جوجل كروم - فايرفوكس - سفاري و
          إيدج بالإضافة لجميع الأجهزة الذكية
        </p>
        <FontAwesomeIcon className=" footIcon" icon={faFirefoxBrowser} />
        <FontAwesomeIcon className=" footIcon" icon={faChrome} />
        <FontAwesomeIcon className=" footIcon" icon={faEdgeLegacy} />
        <FontAwesomeIcon className=" footIcon" icon={faSafari} />
      </div>
      <div className="footerYear">
        <h6>
          جميع الحقوق محفوظة {toArabic(new Date().getFullYear())} لهيئة تطوير
          منطقة مكة المكرمة
        </h6>
      </div>
    </div>
  );
}
