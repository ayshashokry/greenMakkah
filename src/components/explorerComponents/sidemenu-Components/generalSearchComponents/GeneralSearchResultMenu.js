import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faSearchPlus,
  faSort,
} from "@fortawesome/free-solid-svg-icons";
import { Row, Col } from "antd";
import { Tooltip } from "@mui/material";
import googleLocation from "../../../../assets/images/googleLocation.png";
export default function GeneralSearchResultMenu(props) {
  const [result] = useState([
    { id: 1, name: "ارض 1", mun: "الدمام", dist: "حي الشمال" },
    { id: 2, name: "ارض 2", mun: "الخبر", dist: "حي الشمال" },
    { id: 3, name: "ارض 3", mun: "الدمام", dist: "حي الشمال" },
    { id: 4, name: "ارض 4", mun: "المبرز", dist: "حي الشمال" },
    { id: 5, name: "ارض 5", mun: "الدمام", dist: "حي الشمال" },
    { id: 6, name: "ارض 6", mun: "الدمام", dist: "حي الشمال" },
    { id: 7, name: "ارض 7", mun: "الدمام", dist: "حي الشمال" },
    { id: 8, name: "ارض 8", mun: "الخبر", dist: "حي الشمال" },
    { id: 9, name: "ارض 9", mun: "الدمام", dist: "حي الشمال" },
    { id: 10, name: "ارض 10", mun: "الدمام", dist: "حي الشمال" },
    { id: 11, name: "ارض 11", mun: "المبرز", dist: "حي الشمال" },
    { id: 12, name: "ارض 12", mun: "الدمام", dist: "حي الشمال" },
    { id: 13, name: "ارض 13", mun: "الهفوف", dist: "حي الشمال" },
    { id: 14, name: "ارض 14", mun: "الدمام", dist: "حي الشمال" },
    { id: 15, name: "ارض 15", mun: "الدمام", dist: "حي الشمال" },
  ]);
  return (
    <div className="generalSearchResult cardsResultHelp">
      <ul className="menuIcons">
        <li>
          <Tooltip title={"تصفية"} placement="top">
            <button className="tooltipButton">
              <FontAwesomeIcon
                className="zoomIcon"
                icon={faFilter}
                style={{
                  cursor: "pointer",
                }}
              />
            </button>
          </Tooltip>
        </li>
        <li>
          <Tooltip title={"ترتيب"} placement="top">
            <button className="tooltipButton ">
              <FontAwesomeIcon
                className="zoomIcon"
                icon={faSort}
                style={{
                  cursor: "pointer",
                }}
              />
            </button>
          </Tooltip>
        </li>
      </ul>
      <div class="resultTitle">عدد نتائج البحث : {result.length}</div>
      {result.map((r, index) => (
        <div
          className="generalSearchCard"
          onClick={props.generalOpenResultdetails}
        >
          <Row>
            <Col span={16}>
              <h5>{r.name}</h5>
              <p>
                <span className="munSpan">{r.A_REGION_NAME}</span> -
                <span className="distSpan">{r.A_GOVERNORATE_NAME}</span>
              </p>
            </Col>
            <Col span={8} style={{ margin: "auto", textAlign: "center" }}>
              <Tooltip title={"تكبير"} placement="top">
                <button className="tooltipButton">
                  <FontAwesomeIcon
                    className="zoomIcon"
                    icon={faSearchPlus}
                    style={{
                      cursor: "pointer",
                    }}
                  />
                </button>
              </Tooltip>

              <Tooltip title={"خرائط جوجل"} placement="top">
                <button className="tooltipButton">
                  {/*  
                    <FontAwesomeIcon
                      icon={faGoogle}
                      className="googleIcon"
                      style={{
                        cursor: "pointer",
                      }}
                    /> */}
                  <img
                    style={{ width: "20px" }}
                    src={googleLocation}
                    alt="googleLocation"
                  />
                </button>
              </Tooltip>
            </Col>
          </Row>
        </div>
      ))}
    </div>
  );
}
