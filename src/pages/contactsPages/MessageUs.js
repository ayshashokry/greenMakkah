import React, { Component } from "react";
import "./contactus.css";
//Packages
import { Container } from "react-bootstrap";
import { Row, Col, Form, Input, Button, notification } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faAt,
  faGlobe,
  faPhone,
  faFax,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faSnapchat,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import NavBar from "../../layouts/NavBar";
import Footer from "../../layouts/Footer";
const validateMessages = {
  required: "من فضلك قم بإدخال البريد الإلكتروني",
  types: {
    email: "البريد الإلكتروني غير صحيح",
  },
};
export default class MessageUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      userName: "",
      userMsg: "",
      errorMsg: "",
      loading: false,
      msgCounter: 10,
      emailError: "",
      current: 0,
    };
    this.content = React.createRef();
    this.formRef = React.createRef();
    this.emailRef = React.createRef();
  }
  handleUserInput = (e) => {
    if (
      e.target.name === "email" &&
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        e.target.value
      )
    ) {
      this.setState({ emailError: "" });
    }
    if (
      e.target.name === "email" &&
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        e.target.value
      ) === false
    ) {
      this.setState({ emailError: "البريد الإلكتروني غير صحيح" });
    }

    if (e.target.name === "email" && e.target.value === "") {
      this.setState({ emailError: "من فضلك أدخل البريد الإلكتروني" });
    }

    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
      errorMsg: "",
      msgCounter: this.state.msgCounter - 1,
    });
  };

  confirmationSend = () => {
    const args = {
      description: "تم الإرسال بنجاح",
      duration: 5,
      placement: "bottomLeft",
      bottom: 5,
    };
    notification.open(args);
  };
  componentDidMount() {
    document.body.scrollTo(0, 0);
    console.log(window.location.pathname);
    if (window.location.pathname === "/greenmakkah/messageUs") {
      document.body.scrollTo(0, 0);
    } else {
      const content = this.content.current;
      document.body.scrollTo({
        top: content.offsetTop,
        left: 0,
        behavior: "smooth",
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    document.body.scrollTo(0, 0);
    console.log(window.location.pathname);
    if (window.location.pathname === "/greenmakkah/messageUs") {
      document.body.scrollTo(0, 0);
    } else {
      const content = this.content.current;
      document.body.scrollTo({
        top: content.offsetTop,
        left: 0,
        behavior: "smooth",
      });
    }
  }
  sendMsg = async (e) => {
    if (this.state.email === "") {
      this.setState({ emailError: "من فضلك أدخل البريد الإلكتروني" });
    }
    if (
      this.state.email !== "" &&
      this.state.userName !== "" &&
      this.state.userMsg !== "" &&
      this.state.emailError === ""
    ) {
      this.confirmationSend();
      this.setState({
        loading: true,
        emailError: "",
        userMsg: "",
        userName: "",
        email: "",
      });
    }
  };
  handleMsgInput = (e) => {
    var characterCount = e.target.value.length;
    this.setState({ current: characterCount, userMsg: e.target.value });
  };

  render() {
    return (
      <>
        <NavBar />
        <div className="messageUsPage">
          <div className="pageHeader mb-5">
            {/* <div className="headLinks">
              <Link to="/"> الرئيسية </Link> <span>{">"}</span>
              <Link to="/">تواصل معنا </Link> <span>{">"}</span>
              <Link to="/messageUs" className="activeLink">
                راسلنا{" "}
              </Link>
            </div> */}
            <h3 className="headerH3 my-3">راسلنا </h3>
          </div>
          <Container className="inquiryForm mt-5  px-lg-5 mr-lg-5">
            <div className="messageUs mb-5 pb-5">
              <h4>شاركنا اقتراحاتك</h4>
              <h6 style={{ fontWeight: "500" }}>
                سعداء لتلقى مقتراحتكم فهى فى غاية الأهمية لنا
              </h6>
              <Form
                ref={this.formRef}
                validateMessages={validateMessages}
                className="mt-5  "
                layout="vertical"
                name="nest-messages"
              >
                <Row>
                  <Col sm={{ span: 24 }} xs={{ span: 24 }} lg={{ span: 10 }}>
                    <Row>
                      <Col span={24}>
                        <Form.Item
                          name="userName"
                          label="الإسم بالكامل"
                          rules={[
                            {
                              message: " من فضلك ادخل الإسم",
                              required: true,
                            },
                          ]}
                        >
                          <Input
                            name="userName"
                            onChange={this.handleUserInput}
                            value={this.state.userName}
                            placeholder=" ادخل الإسم بالكامل"
                          />
                        </Form.Item>
                      </Col>

                      <Col span={24}>
                        <Form.Item
                          name="email"
                          label="البريد الإلكتروني"
                          hasFeedback={
                            this.state.emailError !== "" ? true : false
                          }
                        >
                          <Input
                            className={
                              this.state.emailError !== "" ? "emailErr" : ""
                            }
                            ref={this.emailRef}
                            type="email"
                            name="email"
                            onChange={this.handleUserInput}
                            value={this.state.email}
                            placeholder=" ادخل البريد الإلكتروني"
                          />
                          {this.state.emailError !== "" ? (
                            <div className="ant-form-item-explain ant-form-item-explain-error">
                              <div role="alert"> {this.state.emailError}</div>
                            </div>
                          ) : null}
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                  <Col lg={{ span: 2 }}></Col>
                  <Col
                    sm={{ span: 24 }}
                    xs={{ span: 24 }}
                    lg={{ span: 12 }}
                    className="contactUsMsg pr-lg-5"
                  >
                    <Form.Item
                      name="userMsg"
                      label="اكتب رسالتك أو اقتراحك"
                      rules={[
                        {
                          message: " من فضلك ادخل مقترحك",
                          required: true,
                        },
                      ]}
                    >
                      <textArea
                        maxLength={300}
                        name="userMsg"
                        showCount
                        onChange={this.handleMsgInput}
                        value={this.state.userMsg}
                      />
                    </Form.Item>
                    {/* <div id="the-count">
                    <span id="current">{this.state.current}</span>
                    <span id="maximum">/ 300</span>
                  </div> */}

                    <Button
                      htmlType="submit"
                      onClick={this.sendMsg}
                      className="contactUcButton mt-2"
                    >
                      إرسال
                    </Button>
                  </Col>
                </Row>
              </Form>

              <div className="mt-5" ref={this.content}>
                <h4 className="mt-5">اتصل بنا</h4>
                <h6 style={{ fontWeight: "500" }}>
                  يمكنك التواصل معنا من خلال التالي
                </h6>
                <div className="contactInfo">
                  <p>
                    <a
                      href="https://makkahgreen.mrda.gov.sa"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="ContactsData">
                        https://makkahgreen.mrda.gov.sa
                      </span>
                      :الموقع الإلكتروني
                      <FontAwesomeIcon
                        className="contactIcon "
                        icon={faGlobe}
                      />
                    </a>
                  </p>
                  <p>
                    <a
                      href="g.makkah@mrda.gov.sa"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="ContactsData">g.makkah@mrda.gov.sa</span>
                      : البريد الإلكتروني
                      <FontAwesomeIcon className="contactIcon " icon={faAt} />
                    </a>
                  </p>

                  <p>
                    <a>
                      <span className="ContactsData">+966 12-5404040 </span>
                      : الهاتف
                      <FontAwesomeIcon
                        className="contactIcon "
                        icon={faPhone}
                      />
                    </a>
                  </p>

                  <p>
                    <a>
                      <span className="ContactsData">+966 12-5404040 </span>
                      : الفاكس
                      <FontAwesomeIcon className="contactIcon " icon={faFax} />
                    </a>
                  </p>

                  <ul>
                    <li>
                      <a
                        href="https://www.snapchat.com/add/GI_makkah?share_id=RUY2RkU4&locale=en_SA@calendar=gregorian"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FontAwesomeIcon
                          className="contactIcon "
                          icon={faSnapchat}
                        />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.facebook.com/GI_makkah"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {" "}
                        <FontAwesomeIcon
                          className="contactIcon facebookIcon"
                          icon={faFacebook}
                        />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://twitter.com/GI_makkah"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {" "}
                        <FontAwesomeIcon
                          className="contactIcon twitterIcon "
                          icon={faTwitter}
                        />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://instagram.com/GI_makkah"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FontAwesomeIcon
                          className="contactIcon instaIcon "
                          icon={faInstagram}
                        />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.linkedin.com/company/GI_makkah/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FontAwesomeIcon
                          className="contactIcon linkedIcon "
                          icon={faLinkedin}
                        />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Container>
        </div>
        <Footer />
      </>
    );
  }
}
