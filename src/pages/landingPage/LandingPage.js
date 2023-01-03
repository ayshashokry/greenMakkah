import React, { useEffect, useState } from "react";
import "./landing.css";
import "aos/dist/aos.css";
import DiscoverMakkah from "../../components/landingPage-components/DiscoverMakkah";
import LandingStatistics from "../../components/landingPage-components/LandingStatistics";
import Parteners from "../../components/landingPage-components/Parteners";
import AkhdarApp from "../../components/landingPage-components/AkhdarApp";
import HomeNews from "../../components/landingPage-components/HomeNews";
import LandingEvents from "../../components/landingPage-components/LandingEvents";
import VideoSlider from "../../components/landingPage-components/VideoSlider";
import NewsTrack from "../../components/landingPage-components/NewsTrack";
import NavBar from "../../layouts/NavBar";
import Footer from "../../layouts/Footer";
import { useInView } from "react-intersection-observer";

export default function LandingPage(props) {
  const [section0Ref, section0InView] = useInView({ threshold: 0.5 });
  const [section1Ref, section1InView] = useInView({ threshold: 0.5 });
  const [section2Ref, section2InView] = useInView({ threshold: 0.5 });
  const [section3Ref, section3InView] = useInView({ threshold: 0.5 });
  const [section4Ref, section4InView] = useInView({ threshold: 0.5 });
  const [section5Ref, section5InView] = useInView({ threshold: 0.5 });
  const [section6Ref, section6InView] = useInView({ threshold: 0.5 });
  const [section7Ref, section7InView] = useInView({ threshold: 0.5 });

  useEffect(() => {
    document.body.scrollTo(0, 0);
  },[]);

  const [videoOpened, setVideoOpen] = useState(false);
  const openVideo = () => {
    setVideoOpen(!videoOpened);
  };

  return (
    <div className="landingPage">
      {videoOpened ? null : (
        <NavBar
          section1InView={section1InView}
          section2InView={section2InView}
          section3InView={section3InView}
          section4InView={section4InView}
          section5InView={section5InView}
          section6InView={section6InView}
          section7InView={section7InView}
          section0InView={section0InView}
          landingNav
        />
      )}
      <VideoSlider openVideo={openVideo} videoOpened={videoOpened} />
      <NewsTrack section0Ref={section0Ref} />
      <LandingStatistics section1Ref={section1Ref} />
      <DiscoverMakkah section2Ref={section2Ref} />
      <AkhdarApp section3Ref={section3Ref} />
      <HomeNews section4Ref={section4Ref} />
      <LandingEvents section5Ref={section5Ref} />
      <Parteners section6Ref={section6Ref} />{" "}
      <Footer section7Ref={section7Ref} />
    </div>
  );
}
