import "./App.css";
//import Packages
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
//import Components
import Explorer from "./pages/explorerPages/Explorer";
import Dashboard from "./pages/dashboardPages/Dashboard";
import LandingPage from "./pages/landingPage/LandingPage";
import NewsPage from "./pages/newsPages/NewsPage";
import NewsDetails from "./pages/newsPages/NewsDetails";
import EventsPage from "./pages/eventsPages/EventsPage";
import EventsDetails from "./pages/eventsPages/EventsDetails";
import MessageUs from "./pages/contactsPages/MessageUs";
import VisionPage from "./pages/visionPage/VisionPage";
import GoalsPage from "./pages/goalsPages/GoalsPage";
import DesignGuidePage from "./pages/designGuidePage/DesignGuidePage";
import LoginForm from "./pages/loginPages/LoginForm";
import ForgetPasswordForm from "./pages/loginPages/ForgetPasswordForm";
import OrganizationalStructure from "./pages/OrganizationalStructure";
import jwt_decode from "jwt-decode";
import { connect } from "react-redux";
import React, { createContext, useEffect } from "react";
import PhotoGalleryPage from "./pages/galleryPages/PhotoGalleryPage";
import VideosGalleryPage from "./pages/galleryPages/VideosGalleryPage";
import PhotosGalleryDetails from "./pages/galleryPages/PhotosGalleryDetails";
import VideoGalleryDetails from "./pages/galleryPages/VideoGalleryDetails";
import Aos from "aos";
import DownloadNotifications from "./pages/DownloadNotifications";
import {
  setCurrentUser,
  setCurrentToken,
  LogOut,
  setCurrentCounter,
} from "./redux/actions/authActions";
import Studies from "./pages/Studies";
import * as intl from "@arcgis/core/intl";
import setAuthToken from "./redux/helpers/setAuthToken";
import store from "./redux/store";
import PlantsDetailsPage from "./pages/plantsGuidePages/PlantsDetailsPage";
import PlantsGuidePage from "./pages/plantsGuidePages/PlantsGuidePage";
import OpeningPage from "./pages/OpeningPage";
import IndincatorAdmin from "./components/indincatorAdmin";

intl.setLocale("ar");
if (localStorage.token) {
  setAuthToken(localStorage.token);
  const decoded = jwt_decode(localStorage.token);
  store.dispatch(setCurrentToken(decoded));
  // if (localStorage.user !== undefined) {
  store.dispatch(setCurrentUser(JSON.parse(localStorage.user)));
  // }
}
if (localStorage.LoginCount) {
  store.dispatch(setCurrentCounter(JSON.parse(localStorage.LoginCount)));
}

function App(props) {
  useEffect(() => {
    if (localStorage.token) {
      const decoded = jwt_decode(localStorage.token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        localStorage.clear();
        props.LogOut();
      }
    }
  }, []);
  Aos.init();
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <Routes>
          <Route exact path="/explorer" element={<Explorer header />} />
          {localStorage.user!==undefined&&JSON.parse(localStorage.user)?.isSuperAdmin === true && (
            <Route exact path="/admin" element={<IndincatorAdmin />} />
          )}
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/dashboardPrint/:type" element={<Dashboard />} />
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/news" element={<NewsPage />} />
          <Route exact path="/news/:id" element={<NewsDetails />} />{" "}
          <Route exact path="/events" element={<EventsPage />} />
          <Route exact path="/events/:id" element={<EventsDetails />} />
          <Route exact path="/vision" element={<VisionPage />} />
          <Route exact path="/goals" element={<GoalsPage />} />
          <Route exact path="/messageUs" element={<MessageUs />} />
          <Route exact path="/contactUs" element={<MessageUs />} />
          <Route
            exact
            path="/organizationalStructure"
            element={<OrganizationalStructure />}
          />
          <Route exact path="/designGuide" element={<DesignGuidePage />} />
          <Route exact path="/gaddahGuide" element={<DesignGuidePage />} />
          <Route exact path="/makkahGuide" element={<DesignGuidePage />} />
          <Route exact path="/taeefGuide" element={<DesignGuidePage />} />
          <Route exact path="/login" element={<LoginForm />} />
          <Route
            exact
            path="/login/forgetPassword"
            element={<ForgetPasswordForm />}
          />
          <Route exact path="/photoGallery" element={<PhotoGalleryPage />} />
          <Route exact path="/videoGallery" element={<VideosGalleryPage />} />
          <Route
            exact
            path="/photoGallery/:id"
            element={<PhotosGalleryDetails />}
          />{" "}
          <Route
            exact
            path="/videoGallery/:id"
            element={<VideoGalleryDetails />}
          />
          <Route exact path="/logo" element={<DownloadNotifications />} />
          <Route
            exact
            path="/plantDetails/:id"
            element={<PlantsDetailsPage />}
          />
          <Route exact path="/1/trees" element={<PlantsGuidePage />} />
          <Route exact path="/3/SoilCover" element={<PlantsGuidePage />} />
          <Route exact path="/2/Shrubbery" element={<PlantsGuidePage />} />
          <Route exact path="/4/climbers" element={<PlantsGuidePage />} />
          <Route exact path="/5/greens" element={<PlantsGuidePage />} />
          <Route exact path="/6/shrubClimber" element={<PlantsGuidePage />} />
          <Route exact path="/7/soilClimber" element={<PlantsGuidePage />} />
          <Route exact path="/studies" element={<Studies />} />
          <Route exact path="/opening" element={<OpeningPage />} />
        </Routes>
      </div>
    </Router>
  );
}

const mapStateToProps = function (state) {
  return {
    user: state.auth.user,
    isAuth: state.auth.isAuth,
    failedLoginAttempts: state.failedLoginAttempts,
  };
};
const mapDispatchToProps = {
  setCurrentUser,
  LogOut,
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
