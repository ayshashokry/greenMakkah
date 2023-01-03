import React, { Component } from "react";
import { Row, Col } from "antd";
import Slider from "react-slick";
import eventImg1 from "../../assets/images/landingImages/eventsImages/event1.jpg";
import eventImg2 from "../../assets/images/landingImages/eventsImages/event2.jpg";
import eventImg3 from "../../assets/images/landingImages/eventsImages/event3.png";
import arrowRight from "../../assets/images/landingImages/eventsImages/arrowRight.png";
import arrowLeft from "../../assets/images/landingImages/eventsImages/arrowLeft.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import Fade from "react-reveal";
export default class LandingEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nav1: null,
      nav2: null,
      events: [
        {
          id: 1,
          title: "ملتقى صناع العقار  بغرفة مكة",
          details:
            "هيئة تطوير منطقة مكة المكرمة تشارك بجناح تعريفي في ملتقى صناع العقار بغرفة مكة",
          to: "/events/1",
          img: eventImg1,
        },
        {
          id: 2,
          title: "مؤتمر الأمن الغذائي المستدام  ",
          details:
            "برعاية من #هيئة_تطوير_منطقة_مكة وبحضور الرئيس التنفيذي م. أحمد العارضي نظمت جامعة الملك عبدالله للعلوم والتقنية #كاوست ",
          to: "/events/2",
          img: eventImg2,
        },
        // {
        //   id: 3,
        //   title: "جانب من مشاركة #هيئة_تطوير_منطقة_مكة",
        //   details:
        //     "بجناح تعريفي في فعاليات مركز #غرفة_مكة للمعارض يعرض جناح الهيئة أبرز المشاريع والمبادرات التنموية لمنطقة #مكة_المكرمة",
        //   to: "/events/3",
        //   img: eventImg3,
        // },
      ],
      secondSlider: [],
    };
  }

  componentDidMount() {
    const firstItem = this.state.events.slice(0, 1);
    const secondSlider = this.state.events.slice(1);
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2,
      secondSlider: [...secondSlider, firstItem[0]],
    });
  }

  render() {
    return (
      <div className="events px-4" ref={this.props.section5Ref}>
        <Container>
          <div style={{ textAlign: "right" }}>
            <h2 className="mx-4 py-5"> الفعاليات والأحداث </h2>
            <hr />
          </div>
          <Row className="largeRow">
            <Col md={{ span: 24 }} lg={{ span: 12 }}>
              <Row>
                <Col xl={{ span: 24 }} lg={{ span: 24 }} md={{ span: 18 }}>
                  <Fade right>
                    <Slider
                      className="eventsDataSlider"
                      asNavFor={this.state.nav2}
                      ref={(slider) => (this.slider1 = slider)}
                      slidesToShow={1}
                      focusOnSelect={true}
                      infinite={true}
                      arrows={true}
                      // autoplay={true}
                      nextArrow={<img alt="arrow" src={arrowLeft} />}
                      prevArrow={<img alt="arrow" src={arrowRight} />}
                    >
                      {this.state.events.map((n) => (
                        <div className=" eventsSliderItem ">
                          <div
                            sm={{ span: 24 }}
                            lg={{ span: 11 }}
                            className="eventsData"
                          >
                            {/* <Fade left collapse when={this.previous}> */}
                            <h4>{n.title}</h4>
                            <p>{n.details}</p>
                            <div style={{ textAlign: "right" }}>
                              <Link to={n.to} className="eventsDetailsLink">
                                <FontAwesomeIcon
                                  icon={faAngleLeft}
                                  className="mx-2"
                                />
                                اكتشف المزيد
                              </Link>
                            </div>
                            {/* </Fade> */}
                          </div>{" "}
                        </div>
                      ))}
                    </Slider>
                  </Fade>
                </Col>
                <Col
                  xl={{ span: 24 }}
                  lg={{ span: 24 }}
                  md={{ span: 6 }}
                  className="eventsPointerEvent"
                >
                  <div className="eventsSmallSlider">
                    <Fade bottom>
                      <Slider
                        // style={{ paddingTop: "32%" }}
                        asNavFor={this.state.nav1}
                        ref={(slider) => (this.slider2 = slider)}
                        slidesToShow={1}
                        focusOnSelect={true}
                        infinite={true}
                        arrows={false}
                      >
                        {this.state.secondSlider.map((e, index) => (
                          <Container
                            fluid
                            className="carouselItem secondSliderImg"
                          >
                            {/* <Link to={e.to} className="eventsDetailsLink"> */}
                            <img
                              src={e.img}
                              alt="newsImage"
                              className="newsImg"
                              width="200 px"
                              height="191 px"
                            />
                            {/* </Link> */}
                          </Container>
                        ))}
                      </Slider>
                    </Fade>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col md={{ span: 24 }} lg={{ span: 12 }} className="rightSlider">
              <Fade left>
                <Slider
                  asNavFor={this.state.nav2}
                  ref={(slider) => (this.slider1 = slider)}
                  slidesToShow={1}
                  infinite={true}
                  arrows={false}
                >
                  {this.state.events.map((n) => (
                    <div className=" eventsSliderItem eventLeftSlider">
                      {/* <Fade right collapse when={this.next}> */}
                      <img
                        src={n.img}
                        alt="newsImage"
                        className="eventImg landingNewsSlider"
                        width="636 px"
                        height="607 px"
                      />
                      {/* </Fade> */}
                    </div>
                  ))}
                </Slider>
              </Fade>
            </Col>
          </Row>
          <div className=" py-4" style={{ textAlign: "center" }}>
            <Link to="/events" className="showNews my-4">
              <FontAwesomeIcon icon={faArrowLeft} className="mx-2" /> استعراض
              جميع الفعاليات
            </Link>
          </div>
        </Container>
      </div>
    );
  }
}
