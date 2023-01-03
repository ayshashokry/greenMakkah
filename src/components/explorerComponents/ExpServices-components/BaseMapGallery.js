import React, { useEffect } from "react";
//import Packages
import Fade from "react-reveal/Fade";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery";

function BaseMapGallery(props) {
  useEffect(() => {
    let basemapGallery = new BasemapGallery({
      view: props.map.view,
      container: document.getElementById("basemapGallery"),
    });
  });

  return (
    <Fade left collapse>
      <div className={props.homePageProp ? "serviceMenuHome" : "ServiceMenu"}>
        <p className="galleryHead">
          <span>
            <FontAwesomeIcon
              icon={faTimes}
              style={{
                marginTop: "5px",
                marginRight: "5px",
                cursor: "pointer",
              }}
              onClick={props.closeServiceMenu}
              className="closeServMenu"
            />
          </span>
          <span>معرض خرائط الاساس</span>
        </p>

        <div id="basemapGallery"></div>
      </div>
    </Fade>
  );
}

export default BaseMapGallery;
