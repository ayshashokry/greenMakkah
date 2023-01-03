import React from "react";
import mapImg from "../../assets/images/mapImg2.png";
import DashMapstatistics from "./DashMapstatistics";
function DashboardMapSection(props) {
  return (
    <div>
      <img
        src={mapImg}
        alt="map"
        style={{ height: "98vh", width: "100vw", marginTop: "45px" }}
      />
    </div>
  );
}

export default DashboardMapSection;
