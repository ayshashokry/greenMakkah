import React from "react";
import mngrof from "../../assets/images/mapPlantsIcons/mngrof.svg";
import TreesImg from "../../assets/images/mapPlantsIcons/treesIcon.svg";
import shrubIcon from "../../assets/images/mapPlantsIcons/shrubIcon.svg";
import mra3y from "../../assets/images/mapPlantsIcons/mra3y.svg";
import zra3at from "../../assets/images/mapPlantsIcons/zra3at.svg";
import CountUp from "react-countup";

export default function MapPlantsType(props) {
  return (
    <ul>
      <li>
        <img src={TreesImg} alt="treesIcon" />
        <div>
          <h6>الأشجار</h6>
          <p>
            {props.data && props.data.attributes ? (
              <CountUp
                start={30}
                end={props.data.attributes.TREES}
                duration={2}
                separator=" "
                decimals={2}
                delay={0}
                decimal=","
              ></CountUp>
            ) : (
              "-"
            )}
            <span style={{ paddingRight: "5px" }}>كم2 </span>
          </p>
        </div>
      </li>
      <li>
        <img src={shrubIcon} alt="treesIcon" />
        <div>
          <h6>الشجيرات</h6>
          <p>
            {props.data && props.data.attributes ? (
            
              <CountUp
                start={100}
                end={props.data.attributes.SHRUBLANDS}
                duration={2}
                separator=""
                decimals={2}
                delay={0}
                decimal=","
              ></CountUp>
            ) : (
              "-"
            )}
            <span style={{ paddingRight: "5px" }}>كم2 </span>
          </p>
        </div>
      </li>
      <li>
        <img src={mra3y} alt="treesIcon" />
        <div>
          <h6>المراعي</h6>
          <p>
            {props.data && props.data.attributes ? (
              <CountUp
                start={100}
                end={props.data.attributes.GRASSLANDS}
                duration={2}
                separator=""
                decimals={2}
                delay={0}
                decimal=","
              ></CountUp>
            ) : (
              "-"
            )}
            <span style={{ paddingRight: "5px" }}>كم2 </span>
          </p>
        </div>
      </li>
      <li>
        <img src={zra3at} alt="treesIcon" />
        <div>
          <h6>الزراعات</h6>
          <p>
            {props.data && props.data.attributes ? (
              <CountUp
                start={100}
                end={props.data.attributes.CROPLANDS}
                duration={2}
                separator=" "
                decimals={2}
                delay={0}
                decimal=","
              ></CountUp>
            ) : (
              "-"
            )}
            <span style={{ paddingRight: "5px" }}>كم2 </span>
          </p>
        </div>
      </li>
      <li>
        <img src={mngrof} alt="treesIcon" />
        <div>
          <h6>المانجروف</h6>
          <p>
            {props.data && props.data.attributes ? (
              <CountUp
                start={0}
                end={props.data.attributes.MANGROVES}
                duration={2}
                separator=" "
                decimals={2}
                delay={0}
                decimal=","
              ></CountUp>
            ) : (
              "-"
            )}
            <span style={{ paddingRight: "5px" }}>كم2 </span>
          </p>
        </div>
      </li>
    </ul>
  );
}
