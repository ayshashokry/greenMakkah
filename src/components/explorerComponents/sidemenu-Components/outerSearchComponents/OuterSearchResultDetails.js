import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBorderAll,
  faBuilding,
  faFilePdf,
  faInfo,
  faSearchPlus,
  faSitemap,
} from "@fortawesome/free-solid-svg-icons";
import IconButton from "@mui/material/IconButton";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Tooltip } from "@mui/material";
import { faFile } from "@fortawesome/free-regular-svg-icons";
import { layersSetting } from "../../../../helper/layers";
import {
  navigateToGoogle,
  project,
  zoomToFeatureByObjectId,
  zoomToFeatureDeafult,
} from "../../../../helper/common_func";

import googleLocation from "../../../../assets/images/googleLocation.png";

export default function OuterSearchResultDetails(props) {
  const [iconsData] = useState([
    //{ id: 0, icon: faGoogle, tooltip: "خرائط جوجل", data: "Google Data" },
    { id: 1, icon: faSearchPlus, tooltip: "تكبير", data: "Zoom Data" },
  ]);

  const makeClickAction = (index) => {

    zoomToFeatureByObjectId(props.data, props.map, props.data.isNotZoom, (feature) => {
      props.data.geometry = feature.geometry;

      if (index == 1) {
        navigateToGoogle(
          props.data.geometry.latitude || props.data.geometry.centroid.latitude,
          props.data.geometry.longitude || props.data.geometry.centroid.longitude
        );
      } else if (index == 2) {
        zoomToFeatureDeafult(props.data, props.map);
      }
    });
  };

  useEffect(() => {
    if (props.data && !props.data.isNotZoom) {
      if (!props.data.geometry) {
        zoomToFeatureByObjectId(props.data, props.map, false, (feature) => {
          props.data.geometry = feature.geometry;
        });
      } else
        zoomToFeatureDeafult(props.data, props.map);
    }
  }, []);

  return (
    <div className="generalResultDetails cardDetailsHelp">
      {props.data && (
        <Tabs
          defaultFocus={true}
          selectedIndex={0}
          onSelect={(x) => makeClickAction(x)}
        >
          <TabList>
            <Tab>
              <Tooltip title={"النتائج"} placement="top">
                <IconButton className="tooltipButton">
                  <FontAwesomeIcon
                    icon={faInfo}
                    style={{
                      cursor: "pointer",
                    }}
                  />
                </IconButton>
              </Tooltip>
            </Tab>
            <Tab>
              <Tooltip title={"خرائط جوجل"} placement="top">
                <button className="tooltipButton">
                  <img
                    style={{ width: "20px" }}
                    src={googleLocation}
                    alt="googleLocation"
                  />
                </button>
              </Tooltip>
            </Tab>
            {iconsData.map((ic, index) => (
              <Tab>
                <Tooltip title={ic.tooltip} placement="top">
                  <IconButton className="tooltipButton">
                    <FontAwesomeIcon
                      icon={ic.icon}
                      style={{
                        cursor: "pointer",
                      }}
                    />
                  </IconButton>
                </Tooltip>
              </Tab>
            ))}
          </TabList>
          <TabPanel>
            <Table
              striped
              responsive
              hover
              className="mt-2 outerSearchDetailTrStyle"
            >
              {layersSetting[props.data.layerName].outFields
                .filter((x) => x != "OBJECTID")
                .map((attribute, index) => {
                  return (
                    <tr key={index}>
                      <td className="infoTableTd">
                        {
                          layersSetting[props.data.layerName].aliasOutFields[
                          index
                          ]
                        }
                      </td>
                      <td
                        className="infoTableData"
                        style={{ textAlign: "center" }}
                      >
                        {(attribute.indexOf("_AREA") > -1
                          ? (+props.data[attribute]).toFixed(2)
                          : props.data[attribute]) || "غير متوفر"}
                      </td>
                    </tr>
                  );
                })}
            </Table>
          </TabPanel>
        </Tabs>
      )}
    </div>
  );
}
