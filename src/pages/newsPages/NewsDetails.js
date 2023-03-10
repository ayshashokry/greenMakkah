import React, { useEffect } from "react";
import new1 from "../../assets/images/newsPage/newsDetails.png";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./news.css";
import NavBar from "../../layouts/NavBar";
import Footer from "../../layouts/Footer";
import Fade from "react-reveal";
import new4 from "../../assets/images/landingImages/newsImages/new4.png";

import headNew1 from "../../assets/images/landingImages/newsImages/new1.png";
import headNew2 from "../../assets/images/landingImages/newsImages/new2.png";
import headNew3 from "../../assets/images/landingImages/newsImages/new3.png";
export default function NewsDetails() {
  useEffect(() => {
    document.body.scrollTo(0, 0);
  }, []);
  return (
    <>
      <NavBar />
      <div className="newsDetailsPage py-3">
        {" "}
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
            {window.location.pathname.slice(18) == 1
              ? " الفيصل يستعرض مبادرة أخضر مكة"
              : window.location.pathname.slice(18) == 2
              ? "	السعودية الخضراء .. حلم يتحقق"
              : window.location.pathname.slice(18) == 3
              ? "الرئيس التنفيذي لـ #هيئة_تطوير_منطقة_مكة"
              : window.location.pathname.slice(18) == 4
              ? "مؤتمر الأمن الغذائي المستدام"
              : null}
          </h3>
        </div>
        <Container>
          <Fade right>
            <div style={{ textAlign: "center" }} className="newsDetailsImg">
              <img width="600 px" height="500 px"
                src={
                  window.location.pathname.slice(18) == 1
                    ? headNew1
                    : window.location.pathname.slice(18) == 2
                    ? headNew2
                    : window.location.pathname.slice(18) == 3
                    ? headNew3
                    : window.location.pathname.slice(18) == 4
                    ? new4
                    : null
                }
                alt="newImage"
                style={{ width: "100%" }}
              />
            </div>
          </Fade>
          <Fade left>
            {window.location.pathname.slice(18) == 1 ? (
              <div className="newsData">
                <h3>
                  الفيصل يستعرض مبادرة "أخضر مكة" وآليات التوسع في المسطحات
                  الخضراء بالمنطقة
                  <span className="newsDate">14/2/2022</span>
                </h3>
                <p>
                  رأس صاحب السمو الملكي الأمير خالد الفيصل مستشار خادم الحرمين
                  الشريفين أمير منطقة مكة المكرمة رئيس هيئة تطوير المنطقة في
                  الإمارة بجدة، اجتماعاً لاستعراض أهداف مبادرة (اخضر مكة)، تم
                  خلاله مناقشة آليات التوسع في المسطحات الخضراء بالمنطقة. وشهد
                  سموه توقيع اتفاقيتي تفاهم بين هيئة تطوير منطقة مكة المكرمة،
                  وجامعة الملك عبدالعزيز، ومثلها مركز "المبدعون للدراسات
                  والاستشارات"، والمركز الوطني لتنمية الغطاء النباتي ضمن مبادرة
                  (اخضر مكة). وتأتي هاتان الاتفاقيتان اللتان وقعها عن الهيئة
                  رئيسها التنفيذي المهندس أحمد العارضي، وعن الجامعة معالي رئيسها
                  جامعة الدكتور عبدالرحمن اليوبي، ومدير المركز الوطني لتنمية
                  الغطاء النباتي الدكتور خالد العبدالقادر، بهدف المساهمة الفاعلة
                  في تحقيق رؤية المملكة 2030م وبرنامج المملكة الخضراء، وإعادة
                  تأهيل الغطاء النباتي الطبيعي في المنطقة وتنميته، وتطوير
                  المتنزهات الوطنية بالاستغلال الأمثل والمستدام للموارد الطبيعية
                  المتاحة، والحد من التصحر وانجراف التربة وزحف الرمال والمساهمة
                  في التكيف مع التغير المناخي. وتهدف الاتفاقيتان إلى تعزيز
                  التعاون في جوانب تطوير واستثمار المتنزهات الوطنية، وتعزز زيادة
                  المساحة الخضراء بمنطقة مكة المكرمة وتقديم الدراسات الاستشارات
                  الفنية والتوجيه، حيث سيتم الاعتماد عليها في دائرة اتخاذ
                  القرارات التنفيذية والتشغيلية لتحقيق مستهدفات تنمية الغطاء
                  النباتي بالتنسيق مع الجهات ذات العلاقة، مع مراعاة الاعتبارات
                  البيئية وتوفير مصادر المياه ودراسات التربة والأودية
                </p>
              </div>
            ) : window.location.pathname.slice(18) == 2 ? (
              <div className="newsData">
                <h3>
                	السعودية الخضراء .. حلم يتحقق
                  <span className="newsDate">14/2/2022</span>
                </h3>
                <p>
                أعطى سمو ولي العهد الأمير محمد بن سلمان أولوية خاصة للجانب البيئي ومكافحة التصحر اهتمامًا كبيرًا، توجه سموه بإعلان «مبادرة السعودية الخضراء»، و»مبادرة الشرق الأوسط الأخضر» اللتين سيتم إطلاقهما قريبًا، والتي أشار سمو ولي العهد إلى أنهما ترسمان توجه المملكة والمنطقة في حماية الأرض والطبيعة ووضعها في خارطة طريق ذات معالم واضحة وطموحة وستسهمان بشكل قوي بتحقيق المستهدفات العالمية، ونوه سموه إلى أن هاتين المبادرتين تأتيان كذلك انطلاقًا من دور المملكة الريادي تجاه القضايا الدولية المشتركة، واستكمالًا لجهودها لحماية كوكب الأرض خلال فترة ترؤسها مجموعة العشرين العام الماضي، الذي نتج عنه إصدار إعلان خاص حول البيئة وتبني مفهوم الاقتصاد الدائري للكربون، وتأسيس أول مجموعة عمل خاصة للبيئة فيها، وإطلاق مبادرتين دوليتين للحد من تدهور الأراضي وحماية الشعب المرجانية.

وستعمل مبادرة السعودية الخضراء على تقليل الانبعاثات الكربونية بأكثر من 4% من الإسهامات العالمية، وذلك من خلال مشروعات الطاقة المتجددة التي ستوفر 50% من إنتاج الكهرباء داخل المملكة بحلول عام 2030م، ومشروعات في مجال التقنيات الهيدروكربونية النظيفة التي ستمحو أكثر من 130 مليون طن من الانبعاثات الكربونية، إضافة إلى رفع نسبة تحويل النفايات عن المرادم إلى             94%.

                </p>
                <p>
                	وتستهدف المبادرتان رفع الغطاء النباتي، وذلك من خلال زراعة 10 مليارات شجرة داخل المملكة خلال العقود المقبلة، ما يعادل إعادة تأهيل نحو 40 مليون هكتار من الأراضي المتدهورة؛ ما يعني زيادة في المساحة المغطاة بالأشجار الحالية إلى 12 ضعفًا، تمثل مساهمة السعودية بأكثر من 4% في تحقيق مستهدفات المبادرة العالمية للحد من تدهور الأراضي والموائل الفطرية، و1% من المستهدف العالمي لزراعة تريليون شجرة.
                كما تستهدفان إيقاف تدهور الأراضي، وحماية البيئة البحرية، وذلك عبر رفع نسبة المناطق المحمية إلى أكثر من 30% من مساحة الأراضي السعودية التي تقدر بـ(600) ألف كيلومتر مربع؛ لتتجاوز المستهدف العالمي الحالي بحماية 17% من أراضي كل دولة إضافة إلى تقليل انبعاثات الكربون بأكثر من 4% من المساهمات العالمية.
                </p>
                <p> 
                خفض درجات الحرارة
                </p>
                <p>
                  وستعتمد المملكة على زراعة نوعيات من الأشجار المحلية والمتكيفة مع المناخ السائد في السعودية، التي لا تحتاج إلى كميات كبيرة من المياه، بحسب ما أوضح وزير البيئة والزراعة والمياه عبدالرحمن الفضلي.
                 ولا تتوقف أهمية الأشجار المستهدف زراعتها خلال العقود المقبلة على رفع مستوى جودة الحياة، وتحسين صحة المواطنين والمقيمين بتقليل الانبعاثات الكربونية، ومكافحة تلوث الهواء، بل إنها ستسهم أيضًا في خفض درجات الحرارة بما مقداره نحو 8 درجات مئوية.
                  وتشير دراسة، أعدتها منظمة الحفاظ على الطبيعة، المعروفة اختصارًا بـ «TNC»، ومقرها الولايات المتحدة، إلى أن أشجار المدن قادرة على تبريد الهواء، وخفض درجات الحرارة بنحو درجتَين مئويتَين في المتوسط، فضلًا عن أن معدل تخفيض جسيمات التلوث بالقرب من شجرة يتراوح بين 7 و24% حيث تقوم الأشجار والنباتات الأخرى بتبريد الهواء المحيط بها بشكل طبيعي عن طريق تظليل الأسطح، وإطلاق بخار الماء.. والأكثر من ذلك أن أوراقها تعمل وكأنها مرشحات تؤدي إلى خفض مستويات الجسيمات الدقيقة في الثلاثين مترًا المحيطة (قرابة 100 قدم) بنسبة تصل إلى الربع، ولها تأثير ملحوظ على العمل البيئي
                </p>
                <p>
                  توزيع 500 ألف شتلة في 4 مدن
                </p>
                <p>
                يبدأ «مجلس الجمعيات التعاونية» خلال الفترة المقبلة، تنفيذ مبادرة توزيع 500 ألف شتلة متنوعة من الفاكهة المحلية في الطائف والباحة وعسير وجازان، وأكد رئيس مجلس إدارة الجمعيات التعاونية، عبدالله بن كدمان، الذي شهد تشدين وزير البيئة والمياه والزراعة عبدالرحمن الفضلي، مبادرة توزيع 500 ألف شتلة، أن هذا الدور المنوط بـ«مجلس الجمعيات التعاونية»، «يُعبّر عن الثقة بالقدرات التي يمتلكها المجلس، وما اختياره أول المنفذين للمبادرة، إلا دليل على تلك الأهمية التي تنظر له من خلالها وزارة البيئة والمياه والزراعة، مما يمنح الفرصة للعمل التعاوني لأن يسعى لتحقيق تطلعات القيادة وطموحات الجهات الحكومية الشريكة للمجلس».
                وقال ابن كدمان إن «المبادرة التي أطلقها ولي العهد أخذت زخمًا وبعدًا خليجيًا وإقليميًا وعالميًا، والأرقام التي كشفت عنها المملكة وتسعى لتحقيقها، من خلال زرع 10 مليارات شجرة داخل المملكة العربية السعودية، وإعادة تأهيل 40 مليونًا من الأراضي المتدهورة خلال العقود المقبلة، تمنح الدلالة على التصميم بأن هناك رغبة رسمية صادقة بإعادة التوازن البيئي ودعم الحياة الفطرية، والمحافظة على البيئة بشكل عام، ومن هذا المنطلق سيكون الدور خلال الفترة المقبلة على مجلس الجمعيات التعاونية أكبر مما سبق، نظرًا لتجاربه وتنفيذه عددًا من المبادرات التي تنصب حول هذا المجال».
               وكانت وزارة البيئة والمياه والزراعة قامت العام ما قبل الماضي، بالمرحلة الأولى من تنفيذ مبادرة «تأهيل المدرجات الزراعية وتقنيات حصاد مياه الأمطار في الجنوب الغربي من المملكة»، بالتعاون مع «مجلس الجمعيات التعاونية»، بتكلفة مالية بلغت 62 مليون ريال، وفي مساحة تتجاوز 3 ملايين متر مربع.

               وتعدّ المبادرة إحدى مبادرات الوزارة ضمن «رؤية المملكة 2030»، وبتكلفة إجمالية بلغت 600 مليون ريال، وتشمل كلًا من مناطق الباحة وعسير وجازان ومحافظة الطائف، على مساحة تبلغ 2500 هكتار، بمعدل نحو 600 هكتار لكل منطقة.

              وتهدف مبادرة تأهيل المدرجات الزراعية إلى رفع كفاءة استخدام المياه في الأغراض الزراعية، والاعتماد على مصادر متجددة تسهم في تحقيق الأمن الغذائي والتنمية الريفية وزيادة إنتاجية المحاصيل الإستراتيجية.
               وتعتمد المبادرة على 4 محاور أساسية؛ هي: «استصلاح المدرجات الزراعية وتأهيلها، وتطبيق تقنيات حصاد مياه الأمطار ونظم الري الحديثة، وتطوير الزراعة المحصولية، وتعزيز التنمية الاجتماعية والاقتصادية».

                </p>

              </div>
            ) : window.location.pathname.slice(18) == 3 ? (
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
            ) : window.location.pathname.slice(18) == 4 ? (
              <div className="newsData">
                <h3>
                  مؤتمر الأمن الغذائي المستدام
                  <span className="newsDate">14/2/2022</span>
                </h3>
                <p>
                  برعاية من #هيئة_تطوير_منطقة_مكة وبحضور الرئيس التنفيذي م. أحمد
                  العارضي نظمت جامعة الملك عبدالله للعلوم والتقنية #كاوست مؤتمر
                  الأمن الغذائي المستدام .. الذي يجمع خبراء عالميين ومحليين
                  لتقديم حلول مستدامة للأمن الغذائي في المملكة وخارجها
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
