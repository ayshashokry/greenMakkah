import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Dropdown, Menu } from "antd";
import AvatarImg from "../assets/images/AvatarImg.png";
import explorerImg from "../assets/images/navImages/explorer.svg";
// import settingsImg from "../assets/images/navImages/settings.svg";
import dashboardImg from "../assets/images/navImages/dashboard.svg";
import logoSvg from "../assets/images/navImages/logoSvg.svg";
import logoutImg from "../assets/images/navImages/logout.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faWrench,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
function LoginDropDown(props) {
  return (
    <div className="userDropDown">
      {localStorage.user ? (
        <Dropdown
          getPopupContainer={(trigger) => trigger.parentNode}
          trigger={["click"]}
          overlay={
            <Menu>
              <Menu.Item>
                <Link to="/" className="navitem ">
                  <img
                    src={logoSvg}
                    alt="navIcon"
                    className="mx-2 "
                    style={{ width: "20px" }}
                  />
                  <span className="userBreak"> بوابة أخضر مكة</span>{" "}
                </Link>
              </Menu.Item>
              <hr />
              <Menu.Item>
                <Link to="/explorer" className="navitem ">
                  <img src={explorerImg} alt="navIcon" className="mx-2 " />
                  <span className="userBreak"> مستكشف أخضر مكة</span>{" "}
                </Link>
              </Menu.Item>
              <hr />
              <Menu.Item>
                <Link to="/dashboard" className="navitem ">
                  <img src={dashboardImg} alt="navIcon" className="mx-2 " />
                  <span className="userBreak">
                    لوحة الأحصائيات والخرائط
                  </span>
                  <p className="" style={{ marginBottom: "0" }}>
                    التفاعلية
                  </p>
                </Link>
              </Menu.Item>
              <hr />
              {localStorage.user!==undefined&&JSON.parse(localStorage.user)?.isSuperAdmin === true ? (
                <>
                  <Menu.Item>
                    <Link to="/admin" className="navitem ">
                      {/* <img src={explorerImg} alt="navIcon" className="mx-2 " /> */}
                      <FontAwesomeIcon icon={faWrench} className='mx-2'/>

                      <span className="userBreak">لوحة التحكم</span>
                    </Link>
                  </Menu.Item>
                  <hr />
                </>
              ) : null}
              {/* <hr />
              <Menu.Item>
                <Link to="/explorer" className="navitem ">
                  <img src={settingsImg} alt="navIcon" className="mx-2 " />
                  الإعدادات
                </Link>
              </Menu.Item> */}

              <Menu.Item
                style={{ cursor: "pointer" }}
                className="navitem "
                onClick={props.SignOut}>
                <img src={logoutImg} alt="navIcon" className="mx-2 " />
                <span className="userBreak"> تسجيـل خروج </span>
              </Menu.Item>
            </Menu>
          }
          placement="bottomLeft"
          arrow>
          <Button>
            <img
              style={{ width: "auto", height: "30px" }}
              src={AvatarImg}
              className="img-fluid"
              alt="userPhoto"
            />
            <span className="navitem px-2">المهندس / حسن جواح</span>
            <FontAwesomeIcon
              className=" mr-2 "
              icon={faChevronDown}
              style={{ fontSize: "15px" }}
            />
          </Button>
        </Dropdown>
      ) : (
        <ul className="leftUl">
          {/* <li>
           
            AR
            <FontAwesomeIcon
              className=" mx-2 "
              icon={faGlobe}
              style={{ fontSize: "15px" }}
            />
           
          </li> */}
          {/* <span className="navitemBorder"></span> */}
          <li>
            <Link to="/Login" className="loginButton">
              الدخول
              <FontAwesomeIcon
                className=" mx-2 "
                icon={faUser}
                style={{ fontSize: "15px" }}
              />
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}

export default LoginDropDown;
