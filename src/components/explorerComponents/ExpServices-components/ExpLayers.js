import React, { useEffect } from "react";
//import Packages
import Fade from "react-reveal/Fade";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import LayerList from "@arcgis/core/widgets/LayerList";
import TocComponent from "../TocComponent";

function ExpLayers(props) {
  return (
    <Fade left collapse>
      <div className="ServiceMenu ">
         
        <p className="galleryHead">
           
          <span>
            
            <span>
              <FontAwesomeIcon
                icon={faTimes}
                className="closeServMenu"
                style={{
                  marginTop: "5px",
                  marginRight: "5px",
                  cursor: "pointer",
                }}
                onClick={props.closeServiceMenu}
              />
            </span>
          </span>
          <span>طبقات</span>
        </p>
        <TocComponent map={props.map} />
      </div>
    </Fade>
  );
}

export default ExpLayers;
