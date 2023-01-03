import React, { useEffect } from "react";
import NavBar from "../../layouts/NavBar";
import { Row, Col } from "antd";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../../layouts/Footer";
import GoalsSlider from "../../components/goalsComponents/GoalsSlider";
import goalsHeaderImg from "../../assets/images/goalsPage/goalsHeaderImg.png";
import goalsFootImg from "../../assets/images/goalsPage/goalsFootImg.png";
import goalsEndImg from "../../assets/images/goalsPage/goalsEndImg.png";
import "./goals.css";
import TypeAnimation from "react-type-animation";
import StrategicSlider from "../../components/goalsComponents/StrategicSlider";
import MarketingGoals from "../../components/goalsComponents/MarketingGoals";

export default function GoalsPage() {
  useEffect(() => {
    document.body.scrollTo(0, 0);
  }, []);
  return (
    <>
      <NavBar />
      <div className="goalsPage">
        {" "}
        <div className="pageHeader mb-5">
          {/* <div className="headLinks">
              <Link to="/"> الرئيسية </Link> <span>{">"}</span>
              <Link to="/">عن أخضر مكة </Link> <span>{">"}</span>
              <Link to="/vision" className="activeLink">
                الأهداف
              </Link>
            </div> */}
          <h3 className="headerH3">الأهداف العامة والتسويقية</h3>
        </div>
        <Container className="">
          <GoalsSlider />
        </Container>
        <div className="goalsHeader">
          <div className="data">
            {" "}
            <h6>مقدمة</h6>
            <hr />
            <TypeAnimation
              cursor={false}
              sequence={[
                "مشروع أخضر مكة هو ضمن مبادرة السعودية الخضراء والتي اطلقها صاحب السمو الملكي الأمير محمد بن سلمان ولي العهد نائب رئيس مجلس الوزراء ضمن مخرجات رؤية المملكة 2030 وبتوجيه من صاحب السمو الملكي مستشار خادم الحرمين الشريفين أمير منطقة مكة ورئيس مجلس هيئة تطوير مكة  المكرمة لاطلاق مبادرة (أخضر مكة) التي ترسخ توجه الممكلة و المنطقة في حماية الأرض و الطبيعة ووضعها في خارطة طريق ذات معالم واضحة وطموحة تسهم بشكل قوي في تحقيق بيئة مستدامه. كما تهدف المبادرة للتوسع في المسطحات الخضراء بالمنطقة، واعاده تأهيل الغطاء النباتي. وتطوير المنتزهات الوطنية بمنطقة مكه المكرمة (14 محافظه) وتسعي للحفاظ على الموائل الطبيعية ورفع مستوى الالتزام البيئي و الاستفاده من مصادر المياه والاستغلال الأمثل و المستدام",
                1000,
              ]}
              wrapper="p"
              repeat={1}
            />
          </div>
        </div>
        <MarketingGoals />
        <StrategicSlider />
      </div>
      <Footer />
    </>
  );
}
