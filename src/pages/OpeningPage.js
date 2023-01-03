import { Button } from "antd";
import React, { useState, useEffect } from "react";
import logo2White from "../assets/images/footerLogo2.png";
import navLogoWhite from "../assets/images/whiteLogo1.svg";
import { Link, useNavigate } from "react-router-dom";
import splash from "../assets/videos/splash.mp4";

export default function OpeningPage() {
  const [isVideoEnded, setVideoEnd] = useState(false);
  const [showSplash, setSplash] = useState(false);

  let navigate = useNavigate();

  const openVideo = () => {
    setSplash(true);
    setTimeout(() => {
      let video = document.getElementById("Splash-video");
      video.pause()
      //navigate("/", { replace: true });
    }, 46000);
  };

  return (
    <>
      {!isVideoEnded && showSplash ? (
        <div className="video-container"
          style={{ 'height': '100vh' }}>
          <video
            id="Splash-video"
            
            autostart
            autoPlay
            src={splash}
            className="landingVideo"
            type="video/mp4"
          />
        </div>
      ) : (
        <div className="openingPage">
          <div className="openingData">
            <h2>
              تدشين مبادرة أخضر مكة تحت رعاية 
              <br />
              مستشار خادم الحرمين الشريفين
               <br />
               أمير منطقة مكة المكرمة
               <br />
الأمير خالد الفيصل      
      </h2>
            <div style={{ textAlign: "center" }}>
            <br />
              <Button onClick={openVideo}>على بركة الله</Button>
            </div>
          </div>
          <div className="logos">
            <a
              href="https://www.mrda.gov.sa/index.aspx"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                alt="logo"
                src={logo2White}
                className="img-fluid"
                style={{ width: "350px" }}
              />
            </a>

            <Link to="/">
              <img
                alt="logo1"
                src={navLogoWhite}
                style={{ width: "300px", paddingBottom: "25px" }}
              />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
