import React, { useEffect, useRef, useState } from "react";
import { Select, Form, Input } from "antd";
import { Container } from "react-bootstrap";
import { SearchOutlined, DownCircleFilled } from "@ant-design/icons";
import { layersSetting } from "../../../helper/layers";
import { getFeatureDomainName, getLayerId, queryTask } from "../../../helper/common_func";
import { mapUrl } from "../../../config";

export default function GeneralSearch(props) {
  const [searchLayer, setSearchLayer] = useState(undefined);
  const [noData, setNoData] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [searchLayers] = useState(Object.keys(layersSetting).map((key) => {
    return { layerName: key, layer: layersSetting[key], name: layersSetting[key].name }
  }).filter((l) => {
    return l.layer.isSearchable
  }));

  const [formValues, setFormValues] = useState({
    bufferLength: "",
  });

  const bufferSearchData = useRef(null);

  const handleChangeInput = (e) => {

    setNoData(false);
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  const handleSelect = (name) => (value, e) => setSearchLayer(e.id);

  const nearestSearch = (values) => {

    setNoData(false);
    setShowInfo(true);
    bufferSearchData.current = values;

    var handler = props.map.view.on("click", (event) => {
      handler.remove();
      setShowInfo(false);
      searchForPointBuffer(event.mapPoint);
    });

  };

  const searchForPointBuffer = (bufferPoint) => {

    let layerdId = getLayerId(props.map.__mapInfo, bufferSearchData.current.searchLayer);

    queryTask({
      url: mapUrl + "/" + layerdId,
      outFields: layersSetting[bufferSearchData.current.searchLayer].outFields,
      geometry: bufferPoint,
      distance: bufferSearchData.current.bufferLength,
      returnGeometry: true,
      queryWithGemoerty:true,
      callbackResult: ({ features }) => {
        if (features.length) {
          getFeatureDomainName(features, layerdId).then((res) => {
            let mappingRes = res.map((f) => {
              return {
                layerName: bufferSearchData.current.searchLayer,
                id: f.attributes["OBJECTID"],
                ...f.attributes,
                geometry:f.geometry
              };
            });

            props.setOuterSearchResult(mappingRes);
            props.setNavRouteName("outerSearch");
            //props.handleDrawerOpen();

          });
        }
        else {
          setNoData(true);
        }
      },
      callbackError(error) { },
    });

  }

  return (
    <div className="coordinates mb-4 mt-2">
      <Container>
        <Form
          className="GeneralForm"
          layout="vertical"
          name="validate_other"
          onFinish={nearestSearch}
        >
          <Form.Item
            label="طبقة البحث"
            name="searchLayer"
            rules={[
              {
                message: "إختر طبقة البحث",
                required: true,
              },
            ]}
          >
            <Select
              suffixIcon={<DownCircleFilled />}
              showSearch
              allowClear
              className="dont-show"
              onChange={handleSelect("searchLayer")}
              value={searchLayer}
              placeholder="إختر طبقة البحث "
              getPopupContainer={(trigger) => trigger.parentNode}
              onClear={() => setSearchLayer(undefined)}
              optionFilterProp="value"
              filterOption={(input, option) => option.value.indexOf(input) >= 0}
            >
              {searchLayers.map((s, index) => (
                <Select.Option value={s.layerName} id={s.layerName}>
                  {s.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="المسافة (م)"
            rules={[
              {
                message: "المسافة يجب أن تكون ما بين 10 الى 100000",
                required: true,
              },
            ]}
            name="bufferLength"
          >
            <Input
              name="bufferLength"
              onChange={handleChangeInput}
              value={formValues.bufferLength}
              placeholder="المسافة (م)"
            />
          </Form.Item>

          <div style={{ textAlign: "center" }}>
            <button
              icon={<SearchOutlined />}
              className="SearchBtn mt-3 w-25"
              size="large"
              htmlType="submit"
            >
              بحث
            </button>
          </div>
          <div className="searchInfoStyle">
            {showInfo && <p>من فضلك قم بالضغط على الخريطة لبدأ البحث</p>}
            {noData && <p>عفوا لا يوجد بيانات متاحة</p>}
          </div>
        </Form>
      </Container>
    </div>
  );
}
