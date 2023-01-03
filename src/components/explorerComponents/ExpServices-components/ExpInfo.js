import React, { useEffect, useState } from "react";
//import Packages
import Fade from "react-reveal/Fade";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  addPictureSymbol,
  getFeatureDomainName,
  makeIdentify,
  showLoading,
} from "../../../helper/common_func";
import { layersSetting } from "../../../helper/layers";
import { Select } from "antd";
import { DownCircleFilled } from "@ant-design/icons";
import { Table } from "react-bootstrap";
import identifyIcon from '../../../assets/images/identify.gif'


function BaseMapGallery(props) {
  const [searchLayer, setSearchLayer] = useState(undefined);
  const [identifyResults, setIdentifyResults] = useState(undefined);
  const groupByKey = (list, key) =>
    list.reduce(
      (hash, obj) => ({
        ...hash,
        [obj[key]]: (hash[obj[key]] || []).concat(obj),
      }),
      {}
    );

  var handler;

  const handleSelect = (layer) => {
    setSearchLayer(layer);
  };
  const mapIdentifyResultWithDomain = (results) => {
    return new Promise((resolve, reject) => {
      results = groupByKey(results, "layerName");
      let count = Object.keys(results).length;

      Object.keys(results).forEach((layerkey, index) => {
        let layerFeatures = results[layerkey];

        getFeatureDomainName(
          layerFeatures.map((layer) => {
            return layer.feature;
          }),
          layerFeatures[0].layerId
        ).then((domainResult) => {
          domainResult.forEach((d, index) => {
            layerFeatures[index].feature = d;
          });

          --count;
          if (count == 0) {
            resolve(results);
          }
        });
      });
    });
  };

  useEffect(() => {

    window.DisableActiveTool();

    handler = props.map.view.on("click", (event) => {

      addPictureSymbol(event.mapPoint, identifyIcon, "identifyGraphicLayer", props.map);


      showLoading(true);
      makeIdentify(props.map.view, event.mapPoint, ["*"], 5).then(
        ({ results }) => {
          if (results.length > 0) {
            mapIdentifyResultWithDomain(results).then((res) => {

              setIdentifyResults(res);
              setSearchLayer(Object.keys(res)[0]);
              showLoading(false);

            });
          }
          else {
            showLoading(false);
            setIdentifyResults(null)
          }
        }
      );
    });
  }, []);

  const closeIdentify = () => {
    props.map.findLayerById("identifyGraphicLayer").removeAll();
    props.closeServiceMenu();
    handler.remove();
  };
  return (
    <Fade left collapse>
      <div className="ServiceMenu ">

        <p className="galleryHead">
          <span>
            <FontAwesomeIcon
              className="closeServMenu"
              icon={faTimes}
              style={{
                marginTop: "5px",
                marginRight: "5px",
                cursor: "pointer",
              }}
              onClick={closeIdentify}
            />
          </span>
          {!identifyResults ? <span>قم بالضغط على الخريطة لتفعيل الخاصية </span> : <span></span>}
        </p>


        {identifyResults && (
          <div className="identifyScreen">
            <div>
              <Select
                suffixIcon={<DownCircleFilled />}
                className="dont-show"
                onChange={handleSelect}
                value={searchLayer}
                placeholder="إختر الطبقة "
                getPopupContainer={(trigger) => trigger.parentNode}
                optionFilterProp="value"
                filterOption={(input, option) =>
                  option.value.indexOf(input) >= 0
                }
              >
                {Object.keys(identifyResults).map((s) => (
                  <Select.Option value={s} id={s}>
                    {layersSetting[s].name}
                  </Select.Option>
                ))}
              </Select>

              <div>
                {identifyResults[searchLayer] &&
                  identifyResults[searchLayer].map((feature) => {
                    return (
                      <Table
                        striped
                        responsive
                        hover
                        className="identifyTableStyle"
                      >
                        {layersSetting[searchLayer].outFields
                          .filter((x) => x != "OBJECTID")
                          .map((attribute, index) => {
                            return (
                              <tr key={index} className="identifyTR">
                                <td className="infoTableTd">
                                  {
                                    layersSetting[searchLayer].aliasOutFields[
                                    index
                                    ]
                                  }
                                </td>
                                <td
                                  style={{ textAlign: "center" }}
                                  className="infoTableData"
                                >
                                  {(attribute.indexOf("_AREA") > -1
                                    ? (+feature.feature.attributes[
                                      attribute
                                    ]).toFixed(2)
                                    : feature.feature.attributes[attribute]) ||
                                    "غير متوفر"}
                                </td>
                              </tr>
                            );
                          })}
                      </Table>
                    );
                  })}
              </div>
            </div>
          </div>
        )}
      </div>
    </Fade>
  );
}

export default BaseMapGallery;
