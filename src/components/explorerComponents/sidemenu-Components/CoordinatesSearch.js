import React, { useState } from "react";
import { Tabs, Tab, Container } from "react-bootstrap";
import { Row, Col, Input, Form, Select, Button, Tooltip } from "antd";
// import Loader from "../containers/Loader";
import { SearchOutlined } from "@ant-design/icons";
import { DownCircleFilled } from "@ant-design/icons";
import { CopyOutlined } from '@ant-design/icons';
import Point from "@arcgis/core/geometry/Point";
import {
  addPictureSymbol,
  highlightFeature,
  project,
} from "../../../helper/common_func";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import locationIcon from "../../../assets/images/location.gif";

export default function CoordinatesSearch(props) {
  // const [loading] = useState(false);
  const [loggedIn] = useState(localStorage.user);
  const [formValues, setFormValues] = useState({
    coordinateWidth: 0,
    coordinateTall: 0,
    lngInMeters: 0,
    latInMeters: 0,
  });
  const [WGS_Geographic, setWGS_Geographic] = useState(null);
  const [WGS_Projected, setWGS_Projected] = useState(null);
  const [Ain_El_Abd_Projected, setAin_El_Abd_Projected] = useState(null);
  const [Ain_El_Abd_Geographic, setAin_El_Abd_Geographic] = useState(null);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  const CoordinateSearch = (e) => { };
  const degSearch = (e) => { };

  const [dropSystem, setdropSystem] = useState(2);
  const [dropType, setdropType] = useState(undefined);

  const onFinish = (values) => {
    setWGS_Projected(null);
    setWGS_Geographic(null);

    let point;
    if (dropType == 2) {
      point = new Point({
        x: formValues.x,
        y: formValues.y,
        spatialReference: new SpatialReference({ wkid: 32637 }),
      });

    } else if (dropType == 1) {
      //point = zoomToDegreePoint(values);
      point = new Point({
        latitude: formValues.latitude,
        longitude: formValues.longitude,
      });
      //wgs 84 utm
      project([point], 32637, (res) => {
        setWGS_Projected({ x: res[0].x, y: res[0].y });
      });
    }

    project([point], 102100, (res) => {
      setWGS_Geographic({
        latitude: fromLatLngToDegree(res[0].latitude),
        longitude: fromLatLngToDegree(res[0].longitude),
      });

      addPictureSymbol(
        res[0],
        locationIcon,
        "locationGraphicLayer",
        props.map
      );

      highlightFeature(res[0], props.map, {
        layerName: "ZoomGraphicLayer",
        isZoom: true,
        isZoomOnly: true,
        zoomDuration: 1000,
      });
    });

    //Ain el abd utm
    project([point], 20439, (res) => {
      setAin_El_Abd_Projected({ x: res[0].x, y: res[0].y });
    });

    //Ain el abd geographic
    project([point], 4204, (res) => {
      setAin_El_Abd_Geographic({
        latitude: fromLatLngToDegree(res[0].latitude),
        longitude: fromLatLngToDegree(res[0].longitude),
      });
    });
  };

  const zoomToDegreePoint = (values) => {
    let latitudeResult =
      +values.latitudeDeg +
      +values.latitudeMinutes / 60 +
      +values.latitudeSeconds / 3600;
    let longitudeResult =
      +values.longitudeDeg +
      +values.longitudeMinutes / 60 +
      +values.longitudeSeconds / 3600;

    let point = new Point({
      latitude: latitudeResult,
      longitude: longitudeResult,
    });

    addPictureSymbol(point, locationIcon, "locationGraphicLayer", props.map);

    highlightFeature(point, props.map, {
      layerName: "ZoomGraphicLayer",
      isZoom: true,
      isZoomOnly: true,
      zoomDuration: 1000,
    });

    return point;
  };

  const onPublicUserDecimalSubmit = (values) => {
    if (values.latitude && values.longitude) {
      let point = new Point({
        latitude: values.latitude,
        longitude: values.longitude,
      });

      addPictureSymbol(point, locationIcon, "locationGraphicLayer", props.map);

      highlightFeature(point, props.map, {
        layerName: "ZoomGraphicLayer",
        isZoom: true,
        isZoomOnly: true,
        zoomDuration: 1000,
      });
    }
  };

  const fromLatLngToDegree = (angleInDegrees) => {
    while (angleInDegrees < -180.0) angleInDegrees += 360.0;

    while (angleInDegrees > 180.0) angleInDegrees -= 360.0;

    var result = {};

    angleInDegrees = Math.abs(angleInDegrees);

    //gets the degree
    result.deg = Math.floor(angleInDegrees);
    var delta = angleInDegrees - result.deg;

    //gets minutes and seconds
    var seconds = 3600.0 * delta;
    result.sec = seconds % 60;
    result.min = Math.floor(seconds / 60.0);

    return (
      "''" +
      (+result.sec).toFixed(3) +
      " '" +
      result.min +
      " " +
      result.deg +
      "° "
    );
    //return result;
  };

  const onPublicUserDegreesSubmit = (values) => {
    // convert (deg, min, sec) to value of (lat,lng)
    zoomToDegreePoint(values);
  };

  const getClipboard = (isProjected) => {
    navigator.clipboard.readText()
      .then(text => {
        if (text.indexOf(',') > -1) {
          let coordinate = text.trim().replace('\n', '').replace('\r', '').split(',')

          if (isProjected) {
            formValues.x = +coordinate[0];
            formValues.y = +coordinate[1];
          }
          else {
            formValues.latitude = +coordinate[0];
            formValues.longitude = +coordinate[1];
          }
          setFormValues({ ...formValues })
        }
      })
      .catch(err => {
        console.error('Failed to read clipboard contents: ', err);
      });
  }

  const handleSelect = (name) => (value, e) =>
    e !== undefined
      ? name === "dropSystem"
        ? setdropSystem(e.id)
        : name === "dropType"
          ? setdropType(e.id)
          : null
      : null;
  return (
    <div className="coordinates mt-2">
      {/* {loading ? <Loader /> : null} */}
      {!loggedIn ? (
        <Tabs
          defaultActiveKey="coord"
          id="uncontrolled-tab-example"
          className=""
        >
          <Tab eventKey="coord" title="احداثيات عشرية">
            <Form
              onFinish={onPublicUserDecimalSubmit}
              className="coordinateForm"
              layout="vertical"
              name="validate_other"
            >
              <Container>
                <Row>
                  <Col span={24} className="">
                    <h5 className="mt-4 ">دائرة العرض</h5>
                    <Form.Item
                      name="latitude"
                      rules={[
                        {
                          message: "إختر دائرة العرض",
                          required: true,
                        },
                      ]}
                    >
                      <Input
                        // type="number"
                        name="latitude"
                        onChange={handleChange}
                        value={formValues.latitude}
                        placeholder="دائرة العرض"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24} className="">
                    <h5 className="mt-2">خطوط الطول</h5>
                    <Form.Item
                      rules={[
                        {
                          message: "إختر خطوط الطول",
                          required: true,
                        },
                      ]}
                      name="longitude"
                    >
                      <Input
                        // type="number"
                        name="longitude"
                        onChange={handleChange}
                        value={formValues.longitude}
                        placeholder="حط الطول"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <div style={{ textAlign: "center" }}>
                  <button
                    icon={<SearchOutlined />}
                    onClick={CoordinateSearch}
                    className="SearchBtn mt-3 w-25"
                    size="large"
                    htmlType="submit"
                  >
                    بحث
                  </button>
                </div>
              </Container>
            </Form>
          </Tab>

          <Tab eventKey="deg-min" title="درجات-دقائق-ثواني">
            <Form
              onFinish={onPublicUserDegreesSubmit}
              className="coordinateForm"
              layout="vertical"
              name="validate_other"
            >
              <Container fluid>
                <h5 className="mt-4 mr-1">دائرة العرض</h5>
                <Row>
                  <Col span={8}>
                    <Form.Item
                      name="latitudeSeconds"
                      rules={[
                        {
                          message: "إختر الثانية",
                          required: true,
                        },
                      ]}
                    // help="Should be combination of numbers & alphabets"
                    >
                      <Input
                        // type="number"
                        name="latitudeSeconds"
                        onChange={handleChange}
                        value={formValues.latitudeSeconds}
                        placeholder="ثانية"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={7} className="mr-1">
                    <Form.Item
                      rules={[
                        {
                          message: "إختر الدقيقة",
                          required: true,
                        },
                      ]}
                      name="latitudeMinutes"

                    // help="Should be combination of numbers & alphabets"
                    >
                      <Input
                        // type="number"
                        name="latitudeMinutes"
                        onChange={handleChange}
                        value={formValues.latitudeMinutes}
                        placeholder="دقيقة"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={7} className="mr-1 ml-2">
                    <Form.Item
                      rules={[
                        {
                          message: "إختر الدرجة",
                          required: true,
                        },
                      ]}
                      name="latitudeDeg"

                    // help="Should be combination of numbers & alphabets"
                    >
                      <Input
                        // type="number"
                        name="latitudeDeg"
                        onChange={handleChange}
                        value={formValues.latitudeDeg}
                        placeholder="درجة"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <h5 className="mt-4 mr-1">خطوط الطول </h5>
                <Row>
                  <Col span={8}>
                    <Form.Item
                      name="longitudeSeconds"
                      rules={[
                        {
                          message: "إختر الثانية",
                          required: true,
                        },
                      ]}

                    // help="Should be combination of numbers & alphabets"
                    >
                      <Input
                        // type="number"
                        name="longitudeSeconds"
                        onChange={handleChange}
                        value={formValues.longitudeSeconds}
                        placeholder="ثانية"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={7} className="mr-1">
                    <Form.Item
                      name="longitudeMinutes"
                      rules={[
                        {
                          message: "إختر الدقيقة",
                          required: true,
                        },
                      ]}
                    // help="Should be combination of numbers & alphabets"
                    >
                      <Input
                        // type="number"
                        name="longitudeMinutes"
                        onChange={handleChange}
                        value={formValues.longitudeMinutes}
                        placeholder="دقيقة"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={7} className="mr-1 ml-2">
                    <Form.Item
                      name="longitudeDeg"
                      rules={[
                        {
                          message: "إختر الدرجة",
                          required: true,
                        },
                      ]}
                    >
                      <Input
                        // type="number"
                        name="longitudeDeg"
                        onChange={handleChange}
                        value={formValues.longitudeDeg}
                        placeholder="درجة"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <div style={{ textAlign: "center" }}>
                  <button
                    icon={<SearchOutlined />}
                    onClick={degSearch}
                    className="SearchBtn mt-3 w-25"
                    size="large"
                    htmlType="submit"
                  >
                    بحث
                  </button>
                </div>
              </Container>
            </Form>
          </Tab>
        </Tabs>
      ) : (
        <Container fluid>
          <Form
            onFinish={onFinish}
            className="coordinateForm"
            layout="vertical"
            name="validate_other"
          >
            <Form.Item label="نظام الإسقاط" name="dropSystem">
              <Select
                suffixIcon={<DownCircleFilled />}
                showSearch
                allowClear
                defaultValue="WGS-84"
                className="dont-show"
                onChange={handleSelect("dropSystem")}
                value={dropSystem}
                placeholder="إختر نظام إسقاط "
                getPopupContainer={(trigger) => trigger.parentNode}
                onClear={() => setdropSystem(undefined)}
                optionFilterProp="value"
                filterOption={(input, option) =>
                  option.value.indexOf(input) >= 0
                }
              >
                <Select.Option value="WGS-84" id={2}>
                  WGS-84
                </Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="نوع الإسقاط"
              name="dropType"
              rules={[
                {
                  message: "إختر نوع الإسقاط",
                  required: true,
                },
              ]}
            >
              <Select
                suffixIcon={<DownCircleFilled />}
                showSearch
                allowClear
                className="dont-show"
                onChange={handleSelect("dropType")}
                value={dropType}
                placeholder="إختر نوع إسقاط "
                getPopupContainer={(trigger) => trigger.parentNode}
                onClear={() => setdropSystem(undefined)}
                optionFilterProp="value"
                filterOption={(input, option) =>
                  option.value.indexOf(input) >= 0
                }
              >
                <Select.Option value="جغرافي" id={1}>
                  جغرافي
                </Select.Option>
                <Select.Option value="متري" id={2}>
                  متري
                </Select.Option>
              </Select>
            </Form.Item>
            {dropType === 1 ? (
              <>
                <Row>
                  <Col span={24} style={{ textAlign: 'left' }} >

                    <Tooltip title="لصق الإحداثيات" placement="top">
                      <Button style={{ background: '#2e735f' }} onClick={()=>getClipboard(false)} type="primary" icon={<CopyOutlined />} size={'large'} />
                    </Tooltip>
                  </Col>
                  <Col span={24} className="">
                    <div style={{ display: 'grid' }}>
                      <label className="formLabel">دوائر العرض</label>
                      <Input
                        // type="number"
                        name="latitude"
                        onChange={handleChange}
                        value={formValues.latitude}
                        placeholder="دوائر العرض"
                      />
                    </div>
                  </Col>

                  <Col span={24} className="">

                    <div style={{ display: 'grid', marginTop: '10px' }}>
                      <label className="formLabel">خطوط الطول</label>
                      <Input
                        // type="number"
                        name="longitude"
                        onChange={handleChange}
                        value={formValues.longitude}
                        placeholder="خطوط الطول"
                      />
                    </div>
                  </Col>
                </Row>
              </>
            ) : dropType === 2 ? (
              <>
                <Row>
                  <Col span={24} style={{ textAlign: 'left' }} >

                    <Tooltip title="لصق الإحداثيات" placement="top">
                      <Button style={{ background: '#2e735f' }} onClick={()=>getClipboard(true)} type="primary" icon={<CopyOutlined />} size={'large'} />
                    </Tooltip>
                  </Col>
                  <Col span={24} className="">
                    <div style={{ display: 'grid' }}>
                      <label className="formLabel">الاحداث السيني</label>
                      <Input
                        // type="number"
                        name="x"
                        onChange={handleChange}
                        value={formValues.x}
                        placeholder="الاحداث السيني"
                      />
                    </div>
                  </Col>
                  <Col span={24} className="">
                    <div style={{ display: 'grid' }}>
                      <label className="formLabel">الاحداث الصادي</label>
                      <Input
                        // type="number"
                        name="y"
                        onChange={handleChange}
                        value={formValues.y}
                        placeholder="الاحداث الصادي"
                      />
                    </div>
                  </Col>

                </Row>
              </>
            ) : null}
            {dropSystem !== undefined && dropType !== undefined ? (
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
            ) : null}

            {WGS_Geographic && (
              <div>
                <p className="coordinateData">WGS ( Geographic )</p>
                <table className="table table-bordered">
                  <tr>
                    <td>
                      <span>دوائر العرض</span>
                    </td>
                    <td>
                      <span>{WGS_Geographic.latitude}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>خطوط الطول</span>
                    </td>
                    <td>
                      <span>{WGS_Geographic.longitude}</span>
                    </td>
                  </tr>
                </table>
              </div>
            )}
            {WGS_Projected && (
              <div>
                <p className="coordinateData">WGS Projected ( UTM )</p>
                <table className="table table-bordered">
                  <tr>
                    <td>
                      <span>الاحداثى السينى</span>
                    </td>
                    <td>
                      <span>{WGS_Projected.x}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>الاحداثى الصادى</span>
                    </td>
                    <td>
                      <span>{WGS_Projected.y}</span>
                    </td>
                  </tr>
                </table>
              </div>
            )}

            {Ain_El_Abd_Projected && (
              <div>
                <p className="coordinateData">Ain El-Abd Projected ( UTM )</p>
                <table className="table table-bordered">
                  <tr>
                    <td>
                      <span>الاحداثى السينى</span>
                    </td>
                    <td>
                      <span>{Ain_El_Abd_Projected.x}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>الاحداثى الصادى</span>
                    </td>
                    <td>
                      <span>{Ain_El_Abd_Projected.y}</span>
                    </td>
                  </tr>
                </table>
              </div>
            )}

            {Ain_El_Abd_Geographic && (
              <div>
                <p className="coordinateData">Ain El-Abd ( Geographic )</p>
                <table className="table table-bordered">
                  <tr>
                    <td>
                      <span>دوائر العرض</span>
                    </td>
                    <td>
                      <span>{Ain_El_Abd_Geographic.latitude}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>خطوط الطول</span>
                    </td>
                    <td>
                      <span>{Ain_El_Abd_Geographic.longitude}</span>
                    </td>
                  </tr>
                </table>
              </div>
            )}
          </Form>
        </Container>
      )}
    </div>
  );
}
