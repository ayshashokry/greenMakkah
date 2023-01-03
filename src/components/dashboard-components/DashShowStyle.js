import React, { useEffect, useState } from "react";
import showStyleImg from "../../assets/images/dashChecks/showStyleImg.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { Tooltip, Select } from "antd";
import Fade from "react-reveal/Fade";
import { Tab, Tabs, TabList } from "react-tabs";
import * as watchUtils from "@arcgis/core/core/watchUtils";
import dashSelectImg1 from "../../assets/images/dashChecks/dashSelect1.svg";
import dashSelectImg2 from "../../assets/images/dashChecks/dashSelect2.svg";
import dashSelectImg3 from "../../assets/images/dashChecks/dashSelect3.svg";
import "react-tabs/style/react-tabs.css";
import { draw3dBars, drawPieChart, getLayerId, queryTask } from "../../helper/common_func";
import DefaultPieChart from "../dashboard-components/dashDetails/DefaultPieChart";
import { dashboardMapUrl } from '../../config';
import { DownCircleFilled } from "@ant-design/icons";

export default function DashShowStyle(props) {
  const [showDropDown, setShowDropDown] = useState(false);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(window.__HijriYear);
  const handleShowDrop = () => {
    setShowDropDown(!showDropDown);
  };
  const [selectedTab, setSelectedTab] = useState(0);
  const [pieChartData, setPieChartData] = useState(null);

  useEffect(() => {
    setSelectedYear(window.__HijriYear)

    if (props.map) {

      if (years.length == 0) {
        let layerdId = getLayerId(props.map.__mapInfo, "INDICATORS");
        queryTask({
          url: dashboardMapUrl + "/" + layerdId,
          outFields: ['YEAR'],
          where: "1=1",
          returnDistinctValues: true,
          returnGeometry: false,
          callbackResult: ({ features }) => {
            setYears(features);
          }
        })
      }
      watchUtils.whenTrue(props.map.view, "ready", () => {
        watchUtils.whenOnce(props.map.view, "extent", () => {
          watchUtils.whenTrue(props.map.view, "stationary", () => {
            if (props.map.pieChartData != null) {


              props.map.pieChartData.forEach((feature) => {
                var screenPoint = props.map.view.toScreen(feature.geometry.centroid);
                feature.geometry.screenPoint = screenPoint;
              });

              setPieChartData([...props.map.pieChartData]);
            }
          });
        });
      });
    }
  }, [props]);

  const onSelectChange = (tabIndex) => {
    setSelectedTab(tabIndex);

    if (tabIndex == 0) {
      draw3dBars(props.map, dashboardMapUrl, props.dashBoardWhereFilter, props.activeDashBoardFields).then(() => {
        props.onShowLegend(props.activeDashBoardFields);
      });
    }
    else if (tabIndex == 1) {
      /*drawPieChart(props.map, dashboardMapUrl, props.dashBoardWhereFilter, props.activeDashBoardFields).then((data) => {
        props.onShowLegend(props.activeDashBoardFields);

        data.geometryFeatures.forEach((feature) => {
          var screenPoint = props.map.view.toScreen(feature.geometry.centroid);
          feature.geometry.screenPoint = screenPoint;
        });

        props.map.pieChartData = data.geometryFeatures;
        setPieChartData(data.geometryFeatures);

      });*/
    }
  }

  const filterSelectChange = (year) => {

    setSelectedYear(year);

    window.__HijriYear = year;

    props.changeYear(year);
  }

  return (
    <div className="mt-2 dashSelect">
      <div className="selectDiv" onClick={handleShowDrop}>
        <FontAwesomeIcon icon={faAngleDown} />
        <span>
          اختر العام
          <img alt="showStyle" src={showStyleImg} className="mx-2" />
        </span>
      </div>
      <Fade right collapse when={showDropDown}>
        <div className="selectYear">
          <div>
            {years.length > 0 && <Select
              suffixIcon={<DownCircleFilled />}
              className="dont-show"
              value={selectedYear}
              placeholder="من فضلك قم باختيار العام"
              onChange={(event) => filterSelectChange(event)}
              getPopupContainer={(trigger) => trigger.parentNode}
              optionFilterProp="value"
              filterOption={(input, option) =>
                option.value.indexOf(input) >= 0
              }
            >
              {years.map((s, index) => (
                <Select.Option value={+s.attributes["YEAR"]} id={'date' + index}>
                  {s.attributes["YEAR"]}
                </Select.Option>
              ))}
            </Select>
            }

          </div>

          {/*<Tabs
            defaultFocus={false}
            selectedIndex={selectedTab}
            onSelect={onSelectChange}
          >
            <TabList className="dashSelectDropDown">
              <Tab>
                <Tooltip placement="top" title="مخطط بياني شريطي">
                  <img src={dashSelectImg1} alt="optionImg" />
                </Tooltip>
              </Tab>
              <Tab>
                <Tooltip placement="top" title="مخطط دائرة مجزأة">
                  <img src={dashSelectImg2} alt="optionImg" />
                </Tooltip>
              </Tab>
              <Tab>
                <Tooltip placement="top" title="خريطة موضوعية">
                  <img src={dashSelectImg3} alt="optionImg" />
                </Tooltip>
              </Tab>
              </TabList>
          </Tabs>*/}
        </div>
      </Fade>
      {pieChartData && <div>
        {pieChartData.map((feature) => {
          return (<div style={{
            position: 'absolute',
            top: feature.geometry.screenPoint.y - 200,
            right: window.__view.width - feature.geometry.screenPoint.x - 100
          }}>
            <DefaultPieChart data={feature} size={props.map.view.zoom} />
          </div>)
        })}
      </div>}
    </div>
  );
}
