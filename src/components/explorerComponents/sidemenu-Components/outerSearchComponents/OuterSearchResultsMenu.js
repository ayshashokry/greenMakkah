import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col } from "antd";
import { Tooltip } from "@mui/material";
import googleLocation from "../../../../assets/images/googleLocation.png";

import {
  faFilter,
  faSearchPlus,
  faSort,
} from "@fortawesome/free-solid-svg-icons";
import { getLayerId, highlightFeature, navigateToGoogle, queryTask, zoomToFeatureByObjectId } from "../../../../helper/common_func";
import { mapUrl, searchFieldNameConfig } from "../../../../config";
export default function OuterSearchResultsMenu(props) {


  const navigateGeometry = (index) => {
    if (props.outerSearchResult[index].geometry) {
      navigateToGoogle(props.outerSearchResult[index].geometry.latitude || props.outerSearchResult[index].geometry.centroid.latitude
        , props.outerSearchResult[index].geometry.longitude || props.outerSearchResult[index].geometry.centroid.longitude
      );
    }
    else {
      zoomToFeatureByObjectId(props.outerSearchResult[index], props.map,false, (feature) => {
        props.outerSearchResult[index].geometry = feature.geometry;
        navigateToGoogle(props.outerSearchResult[index].geometry.latitude || props.outerSearchResult[index].geometry.centroid.latitude
          , props.outerSearchResult[index].geometry.longitude || props.outerSearchResult[index].geometry.centroid.longitude
        );
      });
    }

  }
  /*highlightFeature(
      props.outerSearchResult, props.map, {
      layerName: "ZoomGraphicLayer",
      isZoom: true,
      zoomDuration: 1000
    });*/
  useEffect(() => {

    /*if (props.outerSearchResult && !props.outerSearchResult.find((feature)=>{return !feature.geometry}))
    {
      highlightFeature(
        props.outerSearchResult, props.map, {
        layerName: "ZoomGraphicLayer",
        isZoom: true,
        zoomDuration: 1000
      });
    }*/
    if (props.outerSearchResult && props.outerSearchResult.length == 1) {
      
      props.outerOpenResultdetails(props.outerSearchResult[0]);

      /*zoomToFeatureByObjectId(props.outerSearchResult[0], props.map, (feature) => {
        props.outerSearchResult[0].geometry = feature.geometry;
      });*/
    }
  }, [])

  return (
    <div className="generalSearchResult cardsResultHelp">
      
      <div class="resultTitle">عدد نتائج البحث : {props.outerSearchResult.length}</div>
      {props.outerSearchResult.map((attributes, index) => (
        <div
          className="generalSearchCard"

        >
          <Row>
            <Col span={16} onClick={() => props.outerOpenResultdetails(attributes)}>
              <h5>{attributes[searchFieldNameConfig]}</h5>
              <p>
                <span className="munSpan">{attributes.A_REGION_NAME}</span> -
                <span className="distSpan">{attributes.A_GOVERNORATE_NAME}</span>
              </p>
            </Col>
            <Col span={8} style={{ margin: "auto", textAlign: "center" }}
            >
              <Tooltip title={"تكبير"} placement="top">
                <button className="tooltipButton" onClick={() => zoomToFeatureByObjectId(attributes, props.map,false, (feature) => {
                  props.outerSearchResult[index].geometry = feature.geometry;
                })}>
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
                <button className="tooltipButton" onClick={() => navigateGeometry(index)}>

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
