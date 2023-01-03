import React, { useEffect } from "react";
import new1 from "../../assets/images/newsPage/newsDetails.png";
import { Container } from "react-bootstrap";
import "../newsPages/news.css";
import eventImg4 from "../../assets/images/landingImages/eventsImages/event4.png";
import headNew1 from "../../assets/images/landingImages/eventsImages/event1.jpg";
import headNew2 from "../../assets/images/landingImages/eventsImages/event2.jpg";
import headNew3 from "../../assets/images/landingImages/eventsImages/event3.png";
import dateIcon from "../../assets/images/newsPage/calendarIcon.svg";
import timeIcon from "../../assets/images/newsPage/timeIcon.svg";
import periodIcon from "../../assets/images/newsPage/periodIcon.svg";
import NavBar from "../../layouts/NavBar";
import Footer from "../../layouts/Footer";
import Fade from "react-reveal";
export default function NewsDetails() {
  useEffect(() => {
    document.body.scrollTo(0, 0);
  }, []);
  return (
    <>
      <NavBar />
      <div className="newsDetailsPage py-3">
        <div className="pageHeader mb-5">
          {/* <div className="headLinks">
            <Link to="/"> الرئيسية </Link> <span>{">"}</span>
            <Link to="/">المركز الإعلامي </Link> <span>{">"}</span>
            <Link to="/news">الأخبار </Link> <span>{">"}</span>
            <Link to="/news/1" className="activeLink">
              تفاصيل الخبر
            </Link>
          </div> */}
          <h3 className="headerH3 my-3">
            {window.location.pathname.slice(20) == 1
              ? " ملتقى صناع العقار  بغرفة مكة"
              : window.location.pathname.slice(20) == 2
              ? "مؤتمر الأمن الغذائي المستدام"
              : window.location.pathname.slice(20) == 3
              ? "جانب من مشاركة #هيئة_تطوير_منطقة_مكة"
              : window.location.pathname.slice(20) == 4
              ? " الرئيس التنفيذي لـ #هيئة_تطوير_منطقة_مكة    "
              : null}
          </h3>
        </div>
        <Container>
          <Fade right>
            <div style={{ textAlign: "center" }} className="newsDetailsImg">
              <img
                width="600 px"
                height="500 px"
                src={
                  window.location.pathname.slice(20) == 1
                    ? headNew1
                    : window.location.pathname.slice(20) == 2
                    ? headNew2
                    : window.location.pathname.slice(20) == 3
                    ? headNew3
                    : window.location.pathname.slice(20) == 4
                    ? eventImg4
                    : null
                }
                alt="newImage"
                style={{ width: "100%" }}
              />
            </div>
          </Fade>
          <Fade left>
            {window.location.pathname.slice(20) == 1 ? (
              <div className="newsData">
                <h3>
                  ملتقى صناع العقار بغرفة مكة
                  {/* <span className="newsDate">14/2/2022</span> */}
                </h3>
                <div className="dateDetailsDiv">
                  <p>
                    من 18 شوال 1443
                    <img src={dateIcon} alt="dateIcon" />
                  </p>
                  <p>
                    إلي 20 شوال 1443
                    <img src={dateIcon} alt="dateIcon" />
                  </p>
                  <p>
                    المدة ثلاثة أيام
                    <img src={periodIcon} alt="periodIcon" />
                  </p>
                  <p>
                    من ال8 صباحا حتي ال5 مساء
                    <img src={timeIcon} alt="timeIcon" />
                  </p>
                </div>
                <p>
                  حظي الجناح بزيارة عدد من المسؤولين والمهتمين بالعقار هيئة
                  تطوير منطقة مكة المكرمة تشارك بجناح تعريفي في ملتقى "صناع
                  العقار" بغرفة مكة شاركت هيئة تطوير منطقة مكة المكرمة في ملتقى
                  ومعرض " صناع العقار" في نسخته الثالثة والذي يعد أحد مبادرات
                  اللجنة العقارية الوطنية باتحاد الغرف السعودية، والذي دشنه
                  مستشار خادم الحرمين الشريفين أمير منطقة مكة المكرمة رئيس مجلس
                  الهيئة صاحب السمو الملكي الامير خالد الفيصل الاربعاء الماضي من
                  خلال جناح تعريفي يعرض أبرز المشاريع والمبادرات التنموية لمنطقة
                  مكة المكرمة، ويسلط الضوء على أبرز مشاريعها ومبادراتها التنموية
                  للمنطقة. وأحتوى الجناح التعريفي على إبراز المبادرات التي
                  تنفذها الهيئة كمبادرة أخضر مكة والتي تهدف الى زيادة الغطاء
                  النباتي، وحماية الموائل الطبيعية، ورفع مستوى الإلتزام البيئي،
                  والاستفادة من مصادر المياه. ووضعت الهيئة في مبادرة أخضر مكة
                  الغايات الاستراتيجية للمرحلة التأسيسية وهي بناء خريطة أساس
                  للغطاء النباتي على مستوى المنطقة والمحافظات وتحديد المؤشرات
                  القياسية، ومواكبة التقدم العلمي والتقني في مجال استدامة الغطاء
                  النباتي ومصادر المياه، وزيادة الغطاء النباتي داخل المدن
                  والمحافظات واستصلاح الأراضي المتدهورة خارج النطاق
                  العمراني،ورفع الوعي المجتمعي وتفعيل مشاركة الأفراد في استدامة
                  الغطاء النباتي. وعرض الجناح معلومات تعريفية عن مشروع الطريق
                  السياحي الذي تشرع الهيئة في تنفيذه ويعدّ الطريق السياحي أحد
                  مخرجات استراتيجية المنطقة المتوائمة مع رؤية المملكة 2030 ، حيث
                  يسعى المشروع إلى تطوير مجموعة من المواقع ذات المميزات الطبيعية
                  والأثرية والحفاظ عليها وحمايتها ، للوصول إلى تنمية مستدامة
                  لقطاع السياحة البيئية في المنطقة. وتشتمل نطاق أعمال المرحلة
                  الاولى لمشروع الطريق السياحي على تطوير عدد من المواقع المختارة
                  ذات الميز النسبية ، بالإضافة إلى استكمال عدد من الطرق الحيوية
                  جنوب المنطقة وشمالها ضمن مسار المشروع المحدد ، وذلك بالتعاون
                  مع الجهات والقطاعات ذات العلاقة. وحظي الجناح بزيارات عديدة من
                  أصحاب المعالي والسعادة، ومنهم معالي وزير التجارة ووزير الاعلام
                  الدكتور ماجد بن عبدالله القصبي، ومعالي محافظ الهيئة العامة
                  لعقارات الدولة الاستاذ إحسان بافقيه، حيث اطلعوا على مكونات
                  الجناح وأبدوا سعادتهم بالعمل والمجهود الذي تقوم به هيئة تطوير
                  منطقة مكة المكرمة في تعزيز التنمية والتطوير في المنطقة
                </p>
              </div>
            ) : window.location.pathname.slice(20) == 2 ? (
              <div className="newsData">
                <h3>
                  مؤتمر الأمن الغذائي المستدام
                  {/* <span className="newsDate">14/2/2022</span> */}
                </h3>{" "}
                <div className="dateDetailsDiv">
                  <p>
                    من 18 شوال 1443
                    <img src={dateIcon} alt="dateIcon" />
                  </p>
                  <p>
                    إلي 20 شوال 1443
                    <img src={dateIcon} alt="dateIcon" />
                  </p>
                  <p>
                    المدة ثلاثة أيام
                    <img src={periodIcon} alt="periodIcon" />
                  </p>
                  <p>
                    من ال8 صباحا حتي ال5 مساء
                    <img src={timeIcon} alt="timeIcon" />
                  </p>
                </div>
                <p>
                  برعاية من #هيئة_تطوير_منطقة_مكة وبحضور الرئيس التنفيذي م. أحمد
                  العارضي نظمت جامعة الملك عبدالله للعلوم والتقنية #كاوست مؤتمر
                  الأمن الغذائي المستدام .. الذي يجمع خبراء عالميين ومحليين
                  لتقديم حلول مستدامة للأمن الغذائي في المملكة وخارجها
                </p>
              </div>
            ) : window.location.pathname.slice(20) == 3 ? (
              <div className="newsData">
                <h3>
                  الرئيس التنفيذي لـ #هيئة_تطوير_منطقة_مكة
                  <span className="newsDate">14/2/2022</span>
                </h3>
                <p>
                  الرئيس التنفيذي لـ #هيئة_تطوير_منطقة_مكة م.أحمد العارضي
                  متحدثًا عن مبادرة أخضر مكه التي أطلقها أمير منطقة مكة تفخر
                  الهيئة بأطلاقها هذه المبادره تعزيزًا لتوجه مبادرات الوطن في
                  حماية الأرض والطبيعة التي تشكل أحدى مستهدفات رؤية 2030 من خلال
                  #مبادرة_السعودية_الخضراء"
                </p>
              </div>
            ) : window.location.pathname.slice(20) == 4 ? (
              <div className="newsData">
                <h3>
                  الرئيس التنفيذي لـ #هيئة_تطوير_منطقة_مكة م.أحمد العارضي
                  متحدثًا عن مبادرة #أخضر_مكة
                  <span className="newsDate">14/2/2022</span>
                </h3>
                <p>
                  م.أحمد العارضي متحدثًا عن مبادرة #أخضر_مكة التي اطلقها أمير
                  منطقة مكة #خالد_الفيصل "تفخر الهيئة باطلاقها هذه المبادرة
                  تعزيزًا لتوجه مبادرات الوطن في حماية الأرض والطبيعة التي تشكل
                  أحدى مستهدفات رؤية 2030 من خلال #مبادرة_السعودية_الخضراء"
                </p>
              </div>
            ) : null}
          </Fade>
        </Container>
      </div>

      <Footer />
    </>
  );
}
