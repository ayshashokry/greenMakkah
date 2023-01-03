import { faCaretSquareLeft } from "@fortawesome/free-regular-svg-icons";
import {
  faCaretDown,
  faCaretLeft,
  faCaretSquareDown,
  faCartPlus,
  faPlus,
  faPlusSquare,
  faSearchPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { layersSetting } from "../../../helper/layers";
export const LayerComponent = ({ layer, zoomToLayer, expand, changeLayer }) => {
  return (
    <section className={` ${layer.disable}`}>
      <div className="toc-gallery">
        <div onClick={expand} style={{ cursor: "pointer" }}>
          {layer.show ? (
            <FontAwesomeIcon icon={faCaretDown} />
          ) : (
            <FontAwesomeIcon icon={faCaretLeft} />
          )}
        </div>
        <input
          type="checkbox"
          style={{ marginTop: "-10px" }}
          defaultChecked={layer.visible}
          disabled={layer.disable == 'disableLabel'}
          onChange={changeLayer}
        />
        <label
          style={{
            fontSize: "13px",
            fontWeight: "normal",
          }}
        >
          {(layersSetting[layer.layerName] &&
            layersSetting[layer.layerName].name) ||
            layer.layerName}
        </label>
        <div style={{ cursor: "pointer" }} onClick={zoomToLayer}>
          <FontAwesomeIcon icon={faSearchPlus} style={{ fontSize: "15px" }} />
        </div>
      </div>
      {layer.show &&
        layer.legend.map((legend, key) => {
          return (
            <ul key={key}>
              <img src={"data:image/jpeg;base64," + legend.imageData} />
              <div
                style={{
                  fontSize: "13px",
                  marginBottom: "10px",
                }}
              >
                {legend.label}
              </div>
            </ul>
          );
        })}
    </section>
  );
};
