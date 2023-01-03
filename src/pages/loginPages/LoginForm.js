import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Form, Input, Row, Col, Button, notification } from "antd";
import { useNavigate } from "react-router-dom";
import "./login.css";
import NavBar from "../../layouts/NavBar";
import Loader from "../../layouts/Loader";
import Footer from "../../layouts/Footer";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import { ApiUrl } from "../../config";
import { connect } from "react-redux";

import { Login } from "../../redux/actions/authActions";
function LoginForm(props) {
  let navigate = useNavigate();

  const [userName, setUserName] = useState("");

  const [password, setpassword] = useState("");
  const [errorMsg, seterrorMsg] = useState("");
  const [loading, setloading] = useState(false);
  const [capatcha, setcapatcha] = useState(false);
  const [valueCap, setvalueCap] = useState("");
  const [capatchError, setcapatchError] = useState("");

  useEffect(() => {
    document.body.scrollTo(0, 0);
    if (localStorage.user) {
      navigate("/", { replace: true });
    }
  }, []);

  const onRecapchaChange = (valueCap) => {
    const { setCaptha } = props;
    setcapatchError("");
    setcapatcha(true);
    setvalueCap(valueCap);
    setCaptha(valueCap);
  };
  const handlePassword = (e) => {
    setpassword(e.target.value);
  };
  const handleUserName = (e) => {
    setUserName(e.target.value);
  };

  const confirmationLogin = () => {
    const args = {
      description: "تم تسجيل الدخول بنجاح",
      duration: 5,
      placement: "bottomLeft",
      bottom: 5,
    };
    notification.open(args);
  };
  const errorHappend = () => {
    const args = {
      description: "برجاء مراجعة الدعم الفني",
      duration: 15,
      placement: "bottomLeft",
      bottom: 5,
    };
    notification.open(args);
  };
  const systemProblem = () => {
    const args = {
      description: "حدث خطأ في النظام, من فضلك حاول في وقت لاحق",
      duration: 30,
      placement: "bottomLeft",
      bottom: 5,
    };
    notification.open(args);
  };

  const Signin = async (e) => {
    let userData = {
      password: password,
      rememberMe: true,
      username: userName,
      capatcha: valueCap,
    };
    if (!capatcha) {
      setcapatchError("capatchaError");
    }
    if (userName !== "" && password !== "" && valueCap !== "" && capatcha) {
      setcapatchError("");
      setloading(true);
      await new Promise((resolve, reject) => {
        axios
          .post(ApiUrl + "/auth", userData)
          .then((res) => {
            resolve(res.data);
            if (res.data) {
              setloading(false);

              navigate("/", { replace: true });
              props.Login(res.data, props.history);
            }
          })
          .catch((error) => {
            setloading(false);

            if (
              (error.response !== undefined && error.response.status === 403) ||
              (error.response !== undefined && error.response.status === 400) ||
              (error.response !== undefined && error.response.status === 500)
            ) {
              setloading(false);
              seterrorMsg("برجاء التأكد من اسم المستخدم أو كلمة المرور");
            }

            if (
              (error.response !== undefined &&
                error.response.status === 401 &&
                error.response.data.message === "User not authorized") ||
              (error.response !== undefined &&
                error.response.status === 401 &&
                error.response.data === "")
            ) {
              setloading(false);
              seterrorMsg("برجاء التأكد من اسم المستخدم أو كلمة المرور");
            }
            if (
              error.response !== undefined &&
              error.response.status === 401 &&
              error.response.data.message === "Change Password"
            ) {
              setloading(false);
              seterrorMsg("");
              // props.history.push("/ChangePassword");
            }
            if (
              error.response !== undefined &&
              error.response.status === 401 &&
              error.response.data.user_stopped
            ) {
              setloading(false);
              errorHappend();
            }
            if (
              error.response !== undefined &&
              error.response.status === 401 &&
              error.response.data.user_active === false
            ) {
              setloading(false);
              // props.history.push("/Login/Activate");
            }
            if (error.response !== undefined && error.response.status === 500) {
              setloading(false);
              seterrorMsg("");
              systemProblem();
            }
          });
      });
      confirmationLogin();
    }
  };
  const expireCap = () => {
    setcapatchError("capatchError");
    setcapatcha(false);
    setvalueCap("");
  };
  return (
    <>
      <NavBar />
      {loading ? <Loader /> : null}
      <div className="loginPage">
        <div className="loginBox">
          <h5>تسجيل الدخول</h5>
          <Form
            className="mt-2 px-2"
            layout="vertical"
            name="validate_other"
            onFinish={Signin}
          >
            <Container>
              <Row>
                <Col span={24}>
                  <Form.Item
                    rules={[
                      {
                        message: "من فضلك ادخل اسم المستخدم",
                        required: true,
                      },
                    ]}
                    name="userName"
                    hasFeedback
                    label="اسم المستخدم"
                  >
                    <Input
                      name="userName"
                      onChange={handleUserName}
                      value={userName}
                      placeholder="اسم المستخدم"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item
                    className="passwordInputt"
                    rules={[
                      {
                        message: "من فضلك ادخل كلمة المرور",
                        required: true,
                      },
                    ]}
                    name="password"
                    hasFeedback
                    label="كلمة المرور"
                  >
                    <Input.Password
                      size="large"
                      name="password"
                      onChange={handlePassword}
                      value={password}
                      placeholder="كلمة المرور"
                    />
                  </Form.Item>{" "}
                  <ReCAPTCHA
                    className="my-2"
                    onExpired={expireCap}
                    onChange={onRecapchaChange}
                    sitekey="6LdL_JIbAAAAANEnukVEATtXKQ_InEvsT5NWJdsQ"
                  />
                  {capatchError !== "" ? (
                    <p className="errMsg">هذا الحقل مطلوب</p>
                  ) : (
                    ""
                  )}
                </Col>
                {errorMsg !== "" ? <p className="errMsg">{errorMsg}</p> : null}
              </Row>
              <Row className="formButtons ">
                <Col span={24} style={{ textAlign: "center" }}>
                  <Button htmlType="submit" className=" signInBtn">
                    تسجيل الدخول
                  </Button>
                </Col>
                {/* <Link to="/login/forgetPassword" className="formAnswer">
                  نسيت كلمة المرور؟
                </Link> */}
              </Row>
            </Container>
          </Form>
        </div>
      </div>
      <Footer />
    </>
  );
}

const mapStateToProps = function (state) {
  return {
    isAuth: state.auth.isAuth,
    auth: state.auth,
    user: state.auth.user,
  };
};
const mapDispatchToProps = {
  Login,
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
