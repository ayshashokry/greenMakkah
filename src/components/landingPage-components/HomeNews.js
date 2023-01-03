import React, { Component } from "react";
//Packages
import { Container } from "react-bootstrap";
import { Row, Col } from "antd";
import newImg1 from "../../assets/images/landingImages/newsImages/new1.png";
import newImg2 from "../../assets/images/landingImages/newsImages/new2.png";
// import newImg3 from "../../assets/images/landingImages/newsImages/new3.png";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Fade from "react-reveal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";
export default class HomeNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [
        {
          id: 1,
          title:
            " الفيصل يستعرض مبادرة (أخضر مكة) وآليات التوسع في المسطحات الخضراء بالمنطقة",
          details:
            "رأس صاحب السمو الملكي الأمير خالد الفيصل مستشار خادم الحرمين الشريفين أمير منطقة مكة المكرمة رئيس هيئة تطوير المنطقة في الإمارة بجدة، اجتماعاً لاستعراض أهداف مبادرة (اخضر مكة)، تم خلاله مناقشة آليات التوسع في المسطحات الخضراء بالمنطقة",
          to: "/news/1",
          img: newImg1,
        },
        {
          id: 2,
          title: " 	السعودية الخضراء .. حلم يتحقق",
          details:
            " أعطى سمو ولي العهد الأمير محمد بن سلمان أولوية خاصة للجانب البيئي ومكافحة التصحر اهتمامًا كبيرًا، توجه سموه بإعلان «مبادرة السعودية الخضراء»، و»مبادرة الشرق الأوسط الأخضر» اللتين سيتم إطلاقهما قريبًا",
          to: "/news/2",
          img: newImg2,
        },
        // {
        //   id: 3,
        //   title: " الرئيس التنفيذي لـ #هيئة_تطوير_منطقة_مكة",
        //   details:
        //     " الرئيس التنفيذي لـ #هيئة_تطوير_منطقة_مكة م.أحمد العارضي متحدثًا عن مبادرة أخضر مكه التي أطلقها أمير منطقة مكة تفخر الهيئة بأطلاقها هذه المبادره",
        //   to: "/news/3",
        //   img: newImg3,
        // },
      ],
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }
  next() {
    this.slider.slickNext();
  }
  previous() {
    this.slider.slickPrev();
  }
  render() {
    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 1,
      autoplay: true,
      slidesToScroll: 1,
      nextArrow: <FontAwesomeIcon icon={faArrowLeft} />,
      prevArrow: <FontAwesomeIcon icon={faArrowRight} />,
      // rtl: true,
    };
    return (
      <div className="news pt-5 px-4" ref={this.props.section4Ref}>
        <Container>
          <h5 className="newsTitle">الأخبار</h5>
          <Slider
            ref={(c) => (this.slider = c)}
            {...settings}
            className="newsCarouselContainer pb-5 mb-2"
          >
            {this.state.news.map((n) => (
              <div className="carouselItem newsSliderItem ">
                <Row>
                  <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                    <Fade right>
                      <img
                        src={n.img}
                        alt="newsImage"
                        className="newsImg landingNewsSlider"
                        width="583px"
                        height="557px"
                      />
                    </Fade>
                  </Col>

                  <Col sm={{ span: 24 }} lg={{ span: 12 }} className="newsData">
                    <Fade left>
                      <h6>المستجدات</h6>
                      <hr />
                      <div className="homeNewsDataDiv">
                        {" "}
                        <h4>{n.title}</h4>
                        <p>{n.details}</p>
                        <Link to={n.to} className="newsDetailsLink">
                          التفاصيل{" "}
                          <FontAwesomeIcon
                            icon={faAngleLeft}
                            className="mx-2"
                          />
                        </Link>
                      </div>
                      <span className="sliderNum">
                        {n.id} - {this.state.news.length}
                      </span>
                    </Fade>
                  </Col>
                </Row>
              </div>
            ))}
          </Slider>
          <div className=" py-4" style={{ textAlign: "center" }}>
            <Link to="/news" className="showNews my-4 py-2">
              <FontAwesomeIcon icon={faArrowLeft} className="mx-2" /> استعراض
              جميع الأخبار
            </Link>
          </div>
        </Container>
      </div>
    );
  }
}
