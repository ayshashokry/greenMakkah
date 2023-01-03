import React, { useState } from "react";
import { Row, Col } from "antd";
import { Container } from "react-bootstrap";
import { Fade } from "react-reveal";
//Images
import greensIcon from "../../assets/images/landingImages/greensIcon.svg";
import waterIcon from "../../assets/images/landingImages/waterIcon.svg";
import treesICon from "../../assets/images/landingImages/treesICon.svg";
import farmsIcon from "../../assets/images/landingImages/farmsIcon.svg";

import stat1 from "../../assets/images/landingImages/stat1.png";
import stat2 from "../../assets/images/landingImages/stat2.png";
import stat3 from "../../assets/images/landingImages/stat3.png";
import stat4 from "../../assets/images/landingImages/stat4.png";
export default function LandingStatistics(props) {
  const [stat] = useState([
    {
      id: 1,
      number: 5871.32,
      name: "المساحات الخضراء",
      icon: greensIcon,
      img: stat4,
      animationDelay: 100,
      borderRadius: "0 40px 0 0 ",
    },
    {
      id: 2,
      number: 132615.26,
      name: "المناطق الصحراوية",
      icon: treesICon,
      img: stat3,
      animationDelay: 400,
      borderRadius: "0 0 0 0 ",
    },
    {
      id: 3,
      number: 174.85,
      name: "المسطحات المائية",
      icon: waterIcon,
      img: stat2,
      animationDelay: 700,
      borderRadius: "0 0 0 0 ",
    },
    {
      id: 4,
      number: 7.02,
      name: "الأراضي الرطبة",
      icon: farmsIcon,
      img: stat1,
      animationDelay: 1000,
      borderRadius: "0 0 0 40px ",
    },
  ]);
  return (
    <div className="landingStats">
      <Container>
        <Row>
          {stat.map((s) => (
            <Col lg={{ span: 6 }} md={{ span: 12 }} xs={{ span: 24 }}>
              <Fade right delay={s.animationDelay}>
                <div
                  className="statDiv"
                  id={s.id === 2 || s.id === 4 ? "statTop" : ""}
                >
                  <div className="statDiv-img">
                    <img
                      className="img-fluid bg"
                      src={s.img}
                      alt="statBG"
                      style={{ borderRadius: s.borderRadius }}
                    />
                  </div>

                  <div className="statDiv-info">
                    <img alt="statImage" src={s.icon} className="statIcon" />
                    <h4>{s.number} كم2</h4>
                    <p ref={props.section1Ref}>{s.name}</p>
                  </div>
                </div>
              </Fade>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
