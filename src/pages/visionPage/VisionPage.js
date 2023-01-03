import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";
import { Container } from "react-bootstrap";
import "./vision.css";
import visionTabImg from "../../assets/images/visionPage/visionTabImg.png";
import visionMsgImg from "../../assets/images/visionPage/visionMsgImg.png";
import NavBar from "../../layouts/NavBar";
import Footer from "../../layouts/Footer";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Fade from "react-reveal";
import "react-tabs/style/react-tabs.css";
export default function VisionPage() {
  useEffect(() => {
    document.body.scrollTo(0, 0);
  }, []);
  const [selectedTab, setSelectedTab] = useState(0);

  const onSelectChange = (tabIndex) => {
    setSelectedTab(tabIndex);
  };
  return (
    <>
      <NavBar />
      <div className="visionPage">
        <div className="visionHeader">
          <p>
            وفقاً لمستهدفات رؤية المملكة 2030 ، وتفعيلاً لمبادرة السعودية
            الخضراء ، وبناءً على مخرجات استراتيجية منطقة مكة المكرمة المتضمنة
            مبادرة (أخضر مكة) التي أطلقها مستشار خادم الحرمين الشريفين أمير
            منطقة مكة المكرمة رئيس مجلس هيئة تطوير منطقة مكة المكرمة بهدف زيادة
            الغطاء النباتي واستصلاح الأراضي المتدهورة عليه، فقد شرعت الهيئة
            بتفعيل المبادرة بالشراكة مع المركز الوطني لتنمية الغطاء النباتي
            ومكافحة التصحر وفق منهجية تستند إلى أفضل الممارسات العالمية وضمن
            مرحلتين هما المرحلة التأسيسية والمرحلة الاستراتيجية، حيث تتضمن
            المرحلة التأسيسية الجاري العمل عليها حزمة من الأعمال العاجلة ضمن عدة
            مسارات تم بناء نطاقاتها وتكليف (مركز المبدعون بجامعة الملك عبد
            العزيز) بالإشراف على تنفيذها ضمن فريق عمل موحد حتى نهاية المرحلة
            مارس 2022
          </p>
          <div className="pageHeader mb-5">
            {/* <div className="headLinks">
              <Link to="/"> الرئيسية </Link> <span>{">"}</span>
              <Link to="/">عن أخضر مكة </Link> <span>{">"}</span>
              <Link to="/vision" className="activeLink">
                الرؤية
              </Link>
            </div> */}
            <h3 className="headerH3">الرؤية</h3>
          </div>
        </div>
        <Container>
          <div className="visionTabs mt-5">
            <Row>
              <Col md={{ span: 24 }} lg={{ span: 13 }}>
                <Fade right>
                  <img
                    src={selectedTab === 0 ? visionTabImg : visionMsgImg}
                    alt="visionImg"
                    className="img-fluid"
                  />
                </Fade>
              </Col>
              <Col md={{ span: 24 }} lg={{ span: 11 }} className="visionCol1">
                <Fade left>
                  <Tabs
                    selectedIndex={selectedTab}
                    onSelect={onSelectChange}
                    className="visionTabsCol"
                  >
                    <TabList className="">
                      <Tab>الرؤية</Tab> <Tab>الرسالة</Tab>
                    </TabList>
                    <TabPanel>
                      <p>
                        مستقبل مستدام وبيئة خضراء تمدّ سكّان منطقة مكة المكرمة
                        بهواء نقىّ من خلال زيادة الغطاء النباتى وتقليل مستوى
                        الإنبعاثات الكربونية إلى أدنى الدرجات
                      </p>
                    </TabPanel>
                    <TabPanel>
                      <p>
                        نصنع مستقبلاً مستداماً يحمي بيئة منطقة مكة المكرمة
                        ويساهم في تحقيق أهداف مبادرة السعودية الخضراء ورؤية
                        المملكة 2030
                      </p>
                    </TabPanel>
                  </Tabs>
                </Fade>
              </Col>
            </Row>

            {/* <Tabs defaultActiveKey="1">
              <TabPane tab="Tab 1" key="1">
                <Row>
                  <Col md={{ span: 24 }} lg={{ span: 8 }}>
                    <img
                      src={visionTabImg}
                      alt="visionImg"
                      className="img-fluid"
                    />
                  </Col>
                  <Col md={{ span: 24 }} lg={{ span: 8 }}></Col>
                </Row>
              </TabPane>
              <TabPane tab="Tab 2" key="2">
                <Col md={{ span: 24 }} lg={{ span: 12 }}>
                  <img
                    src={visionMsgImg}
                    alt="visionImg"
                    className="img-fluid"
                  />
                </Col>
                <Col md={{ span: 24 }} lg={{ span: 8 }}></Col>
              </TabPane>
            </Tabs> */}
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
}
