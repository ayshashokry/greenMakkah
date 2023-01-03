import React, { useEffect } from "react";
import NavBar from "../layouts/NavBar";
import { Row, Col } from "antd";
import { Container } from "react-bootstrap";
import Footer from "../layouts/Footer";
import research1 from "../assets/images/studies/researchImg1.svg";
import research2 from "../assets/images/studies/researchImg2.svg";
import research3 from "../assets/images/studies/researchImg3.svg";
import arificial1 from "../assets/images/studies/artificial1.svg";
import arificial2 from "../assets/images/studies/artificial2.svg";
import arificial3 from "../assets/images/studies/artificial3.png";
export default function Studies() {
  useEffect(() => {
    document.body.scrollTo(0, 0);
  }, []);
  return (
    <>
      <NavBar />
      <div className="goalsPage">
        <div className="pageHeader mb-5">
          {/* <div className="headLinks">
              <Link to="/"> الرئيسية </Link> <span>{">"}</span>
              <Link to="/">عن أخضر مكة </Link> <span>{">"}</span>
              <Link to="/vision" className="activeLink">
                الأهداف
              </Link>
            </div> */}
          <h3 className="headerH3"> الدراسات والأبحاث</h3>
        </div>
        <div className="researches">
          <Container>
            <h4>تطبيق الأبحاث واتجارب العلمية</h4>
            <hr />
            <h5>الهدف</h5>
            <p>
              مواكبة التقدم العلمي والتقني في مجال استدامة الغطاء النباتي ومصادر
              المياه
            </p>
            <h5>النتيجة</h5>
            <p>
              تطبيق تجربتين علمية بالشراكة مع جامعة الملك عبدالله للعلوم
              والتقنية (KAUST) ممثلة في مركز زراعة المناطق الصحراوية (CDA) ، حيث
              يتضمن نطاق العمل :
            </p>
            <Row>
              <Col
                xl={{ span: 12 }}
                lg={{ span: 12 }}
                md={{ span: 24 }}
                sm={{ span: 24 }}
                className="studyResultDiv"
              >
                <span>1</span>
                <div>
                  <p>
                    . استخدام الكائنات الحية الدقيقة النافعة في تحفيز الإنبات
                    تحت ظروف الاجهادات البيئة مثل ملوحة التربة والمياه والجفاف
                  </p>
                </div>
              </Col>
              <Col
                xl={{ span: 12 }}
                lg={{ span: 12 }}
                md={{ span: 24 }}
                sm={{ span: 24 }}
                className="studyResultDiv"
              >
                <span style={{ marginRight: "auto" }}>2</span>
                <div>
                  <p>
                    استخدام الرمال المغلفة والفحم الحيوي والمواد عالية القدرة
                    على حفظ المياه (SAP) في المناطق الجافة
                  </p>
                </div>
              </Col>
            </Row>
            <h5 className="mt-3">أبرز المزايا</h5>
            <Row justify="center">
              <Col
                xl={{ span: 8 }}
                lg={{ span: 12 }}
                md={{ span: 24 }}
                sm={{ span: 24 }}
              >
                <div className="advantage advantageImg1">
                  <img src={research1} alt="img" className="img1" />
                  <p>
                    مقاومة النباتات للجفاف ورفع قدرتها على تحمل نقص المياه بنسبة
                    40%
                  </p>
                </div>
              </Col>
              <Col
                xl={{ span: 8 }}
                lg={{ span: 12 }}
                md={{ span: 24 }}
                sm={{ span: 24 }}
              >
                {" "}
                <div className="advantage advantageImg2">
                  <img src={research2} alt="img" className="img2" />
                  <p> تقليل تبخر المياه من التربة بنسبة 70%</p>
                </div>
              </Col>
              <Col
                xl={{ span: 8 }}
                lg={{ span: 12 }}
                md={{ span: 24 }}
                sm={{ span: 24 }}
              >
                {" "}
                <div className="advantage advantageImg3">
                  <img src={research3} alt="img" className="img3" />
                  <p> خفض استهلاك مياه الري بنسبة 45%</p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        <div className="researches-first" style={{ backgroundColor: "#fff" }}>
          <Container>
            <h4>تطبيقات الذكاء الاصطناعي</h4>
            <hr />
            <h5>الهدف</h5>
            <p>
              مواكبة التقدم العلمي والتقني في مجال استدامة الغطاء النباتي ومصادر
              المياه ، واستصلاح الأراضي المتدهورة خارج النطاق العمراني.{" "}
            </p>
            <h5>النتيجة</h5>
            <p>
              إنتاج أول منظومة سعودية مسيرة عن بعد (منظومة أخضر مكة) والتي تتكون
              من (ربوت أرضي / طائرة مجنحة / طائرة عمودية / وحدة تحكم أرضية /
              وحدة رادار) لتأدية مهام متعددة . حيث يعمل الربوت الأرضي على الحفر
              وغرس البذور في التربة على ٣ مسارات متوازية في ذات الوقت وبأعماق
              محددة وتغطيتها، وأثناء ذلك تقوم الطائرة المجنحة بالمسح الجوي ورصد
              موقع كل بذرة تم غرسها بتقنية (G.Location) فائقة الدقة، وإرسال
              الاحداثيات مباشرة إلى وحدة التحكم الأرضية لإظهارها على خرائط رقمية
              مع إنشاء رقم هوية وسجل متابعة لها. كما تتكامل الطائرة العمودية مع
              الربوت الأرضي ووحدة الرادار في أعمال التوجيه والمتابعة بالإضافة
              إلى قدرتها على الوصول إلى المناطق الوعرة ونشر البذور بها.
            </p>

            <h5 className="mt-3">أبرز المزايا</h5>
            <Row justify="center">
              <Col
                xl={{ span: 8 }}
                lg={{ span: 12 }}
                md={{ span: 24 }}
                sm={{ span: 24 }}
              >
                {" "}
                <div className="advantage1">
                  <img src={arificial1} alt="img" className="img1" />
                  <p>
                    العمل المتواصل لمدة 12 ساعة في اليوم على ثلاثة مسارات
                    متوازية مع إمكانية تنويع البذور
                  </p>
                </div>
              </Col>
              <Col
                xl={{ span: 8 }}
                lg={{ span: 12 }}
                md={{ span: 24 }}
                sm={{ span: 24 }}
              >
                {" "}
                <div className="advantage1">
                  <img src={arificial2} alt="img" className="img2" />
                  <p>
                    {" "}
                    كفاءة تشغيلية للربوت الواحد تعادل جهد 50 عامل زراعي في اليوم
                  </p>
                </div>
              </Col>
              <Col
                xl={{ span: 8 }}
                lg={{ span: 12 }}
                md={{ span: 24 }}
                sm={{ span: 24 }}
              >
                {" "}
                <div className="advantage1">
                  <img src={arificial3} alt="img" className="img3" />
                  <p>
                    {" "}
                    القدرة على زراعة مليون متر مربع في مدة قياسية لا تتجاوز ٣
                    أسابيع
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <Footer />
    </>
  );
}
