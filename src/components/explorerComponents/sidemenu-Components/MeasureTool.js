import React, { useEffect, useRef, useState } from "react";
import { Row, Col, Button, Select, Form } from "antd";
import measure1 from "../../../assets/images/measure1.png";
import measure2 from "../../../assets/images/measure2.png";
import measure3 from "../../../assets/images/measure3.png";
import esriGreen from "../../../assets/images/esriGreen.png";
import esriCursor from "../../../assets/images/esriCursor.png";
import { Tooltip } from "@mui/material";
import { Table, Container } from "react-bootstrap";
import { DownCircleFilled } from "@ant-design/icons";
import Measurement from "@arcgis/core/widgets/Measurement";
import { addPictureSymbol, project } from "../../../helper/common_func";

function getElementByXpath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

export default function MeasureTool(props) {
  const [measureType, setMeasureType] = useState("spaceMeasure");
  const [spaceMeasureUnit, setSpaceMeasureUnit] = useState("squareKilometer");
  const [distanceMeasureUnit, setDistanceMeasureUnit] = useState("kilometer");
  const [cooMeasureUnit, setCooMeasureUnit] = useState("degree");
  const [mousePoint, setMousePoint] = useState(null);
  const [mouseGreenPoint, setMouseGreenPoint] = useState(null);

  const componentRef = useRef({});
  const { current: measurmentTool } = componentRef;

  useEffect(() => {

    measurmentTool.current = new Measurement({
      view: props.map.view,
      activeTool: "area",
      container: document.getElementById("measurmentTool"),
    });


    document.getElementById("mapToolsId").style.position = 'fixed';
    document.getElementById("infoXY").style.position = 'fixed';
    document.getElementById("scaleBarDiv").style.position = 'fixed';
    document.getElementById("copyrightId").style.position = 'fixed';
    document.getElementById("measurmentId").style.top = '125px';
    document.getElementById("northCompassIcon").style.top = '135px';

    window.isMeasurmentOpened = '125px'

    setInterval(function () {
      let areaLabel =
        getElementByXpath('//*[@id="measurmentTool"]/div/div/section/div[1]/span[1]');

      if (areaLabel && measurmentTool.current.activeTool == "area") {
        areaLabel.innerText = "المساحة";
      }

    }, 500);



    props.map.view.on("pointer-move", (event) => {

      if (!measurmentTool.current.activeTool) {
        let point = props.map.view.toMap({ x: event.x, y: event.y });
        setMousePoint(point);
      }

    });

    props.map.view.on("click", (event) => {

      if (!measurmentTool.current.activeTool) {

        project([event.mapPoint], 32637, (xyPoint) => {

          project([event.mapPoint], 4326, (latlngPoint) => {
            debugger
            xyPoint[0].latitude = latlngPoint[0].latitude;
            xyPoint[0].longitude = latlngPoint[0].longitude;

            setMouseGreenPoint(xyPoint[0]);
          });
        });

        props.map.findLayerById("identifyGraphicLayer").removeAll();
        addPictureSymbol(event.mapPoint, esriGreen, "identifyGraphicLayer", props.map,
          16, 26);
      }
    });

    return () => {
      delete window.isMeasurmentOpened;    
      document.getElementById("northCompassIcon").style.top = '135px';
    }

  }, []);

  const distanceMeasure = (e) => {
    props.map.findLayerById("identifyGraphicLayer").removeAll();
    setMeasureType("distanceMeasure");
    measurmentTool.current.activeTool = "distance";
  };
  const spaceMeasure = (e) => {

    props.map.findLayerById("identifyGraphicLayer").removeAll();
    setMeasureType("spaceMeasure");
    measurmentTool.current.activeTool = "area";


  };
  const CoordinateMeasure = (e) => {
    setMeasureType("CoordinateMeasure");
    measurmentTool.current.clear();
  };

  const getFlooredFixed = (v, d) => {
    return (Math.floor(v * Math.pow(10, d)) / Math.pow(10, d)).toFixed(d);
  }


  return (
    <div>
      <Container fluid className="coordinates mt-2 measurePage">
        <Row justify="center">
          <Col span={8}>
            <Tooltip
              placement="top"
              title="حساب المساحات"
              className="MuiTooltipStyle"
            >
              <Button
                className="spaceMeasureBtn"
                onClick={spaceMeasure}
                id={measureType === "spaceMeasure" ? "activeSpaceBtn" : ""}
              >
                <img src={measure1} alt="spaceMeasure" />
              </Button>
            </Tooltip>
            <Tooltip placement="top" title="قياس المسافات والأطوال">
              <Button
                className="distanceMeasureBtn"
                onClick={distanceMeasure}
                id={measureType === "distanceMeasure" ? "activeDistanceBtn" : ""}
              >
                <img src={measure2} alt="CoordinateMeasure" />
              </Button>
            </Tooltip>
            <Tooltip placement="top" title="إحداثيات الموقع">
              <Button
                className="CoordinateMeasureBtn"
                onClick={CoordinateMeasure}
                id={measureType === "CoordinateMeasure" ? "activeCooBtn" : ""}
              >
                <img src={measure3} alt="CoordinateMeasure" />
              </Button>
            </Tooltip>
          </Col>
        </Row>



        <div>
          <div id="measurmentTool" style={(measureType != "CoordinateMeasure") ?
            { display: 'block', textAlign: 'right' } :
            { display: 'none', textAlign: 'right' }}></div>
        </div>

        {measureType === "CoordinateMeasure" && <div style={{ margin: '10px' }}>
          <Table className="table table-bordered">
            <tbody>
              <tr>
                <td>
                </td>
                <td style={{ textAlign: 'center' }} className="tableTitle">
                  <span>خط الطول</span>
                </td>
                <td style={{ textAlign: 'center' }} className="tableTitle">
                  <span>دوائر العرض</span>
                </td>
              </tr>
              <tr>
                <td>
                  <img src={esriCursor} />
                </td>
                <td style={{ textAlign: 'center' }}>
                  <span>{mousePoint ? getFlooredFixed(mousePoint.longitude, 6) : '----'}</span>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <span>{mousePoint ? getFlooredFixed(mousePoint.latitude, 6) : '----'}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <img src={esriGreen} />
                </td>
                <td style={{ textAlign: 'center' }}>
                  <span>{mouseGreenPoint ? getFlooredFixed(mouseGreenPoint.longitude, 6) : '----'}</span>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <span>{mouseGreenPoint ? getFlooredFixed(mouseGreenPoint.latitude, 6) : '----'}</span>
                </td>
              </tr>

            </tbody>
          </Table>
          {mouseGreenPoint && <Table>
            <tbody>
              <tr>
                <td style={{ textAlign: 'center' }} className="tableTitle">
                  <span>سيني</span>
                </td>
                <td style={{ textAlign: 'center' }} className="tableTitle">
                  <span>صادي</span>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: 'center' }}>
                  <span>{mouseGreenPoint ? getFlooredFixed(mouseGreenPoint.x, 6) : '----'}</span>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <span>{mouseGreenPoint ? getFlooredFixed(mouseGreenPoint.y, 6) : '----'}</span>
                </td>
              </tr>
            </tbody>
          </Table>}

          <label style={{
            whiteSpace: 'normal',
            textAlign: 'right',
            fontWeight: 'bold'
          }}>
            انقر علي الخريطة لمعرفه خطوط الطول و العرض والاحداثي السيني و الصادي للنقطة المحدده
          </label>
        </div>}

      </Container>
    </div>
  );
}
