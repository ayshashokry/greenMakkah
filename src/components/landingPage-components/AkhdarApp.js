import React from "react";
import { Row, Col } from "antd";
import AkhdarAppImg from "../../assets/images/landingImages/expAppImg.png";
import googleplayImg from "../../assets/images/landingImages/googleplay.png";
import appStoreImg from "../../assets/images/landingImages/appStore.png";
import Fade from "react-reveal";
export default function AkhdarApp(props) {
  return (
    <div className="akhdarApp" ref={props.section3Ref} >
      <Row justify="center">
        <Col md={{ span: 12 }} lg={{ span: 10 }}>
          <Fade right>
            <img
              alt="akhdarApp"
              style={{ height: "90%", padding: "25px 0" }}
              src={AkhdarAppImg}
              className="akhdarAppImg"
            />
          </Fade>
        </Col>
        <Col
          md={{ span: 12 }}
          lg={{ span: 8 }}
          className="akhdarAppTextCol"
          style={{ marginTop: "150px" }}
        >
          <Fade bottom>
            <div className="appTexts">
              <h5>تطبيق أخضر مكة</h5>
              <hr />
              <p>
                يوفر مستكشف أخضر مكة علي الجوال ﻟﻠﻤﻮاﻃﻨﻴﻦ واﻟﻤﺴﺘﺨﺪﻣﻴﻦ البحث عن
                الأماكن الخضراء المتاحة في قاعدة البيانات الجغرافية
              </p>
              <Row className="appStoreRow">
                {/* <Col span={12}>
                  <img alt="appStore" src={appStoreImg} />
                </Col> */}
                <Col span={12}>
                  <a
                    rel="noreferrer"
                    target="_blank"
                    href="https://play.google.com/store/apps/details?id=com.green.Makkah"
                  >
                    {" "}
                    <img alt="googlePlay" src={googleplayImg} />
                  </a>
                </Col>
              </Row>
            </div>
          </Fade>
        </Col>
      </Row>
    </div>
  );
}
