import React from "react";
//import Packages
import { Tooltip } from "antd";
import Fade from "react-reveal/Fade";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExpand,
  faSearchPlus,
  faSearchMinus,
} from "@fortawesome/free-solid-svg-icons";
function DashMapTools(props) {
  return (
    <Fade right>
      <ul className="dashMapTools">
        <li>
          <Tooltip placement="bottom" title={"تصغير"}>
            <FontAwesomeIcon icon={faSearchMinus} />
          </Tooltip>
        </li>
        <li>
          <Tooltip placement="bottom" title={"تكبير"}>
            <FontAwesomeIcon icon={faSearchPlus} />
          </Tooltip>
        </li>
        <li>
          <Tooltip placement="bottom" title={"شاشة كاملة"}>
            <FontAwesomeIcon icon={faExpand} />
          </Tooltip>
        </li>
      </ul>
    </Fade>
  );
}

export default DashMapTools;
