import React, { Component } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { Row, Col } from "antd";
import { ReactComponent as MngrofImg } from "../../../assets/images/dashBarLabel/mngrofBlack.svg";
import { ReactComponent as TreesImg } from "../../../assets/images/dashBarLabel/treesBlack.svg";
import { ReactComponent as MiniTreesImg } from "../../../assets/images/dashBarLabel/miniTreesBlack.svg";
import { ReactComponent as Mra3yImg } from "../../../assets/images/dashBarLabel/mra3yBlack.svg";
import { ReactComponent as Zra3atImg } from "../../../assets/images/dashBarLabel/zra3atBlack.svg";
import { Tooltip } from "antd";
import { groupBy } from "../../../helper/common_func";
import { dashboardTabsTitle } from "../../../helper/layers";
// const data = [
//   {
//     name: "القطاع الأول",
//     id: 1,
//     chartData: [
//       {
//         name: "القنفدة",
//         trees: 91.5,
//         minTrees: 150,
//         mra3y: 200,
//         zra3at: 1500,
//         mngrof: 2000,
//         id: 1,
//       },
//     ],
//   },
// ];

export default class GovernBarChart extends Component {
  state = { data: null };

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.drawChart();
    }
  }

  drawChart() {
    if (this.props.data) {
      let sectors = groupBy(this.props.data, "SECTOR_NO_Code");

      let formatedGov = [];

      debugger;

      Object.keys(sectors).forEach((key, index) => {
        formatedGov.push({
          name: "القطاع " + sectors[key][0].attributes.SECTOR_NO,
          id: index,
          chartData: sectors[key].map((feature, i) => {
            return {
              name: feature.attributes.A_GOVERNORATE_NAME,
              trees: feature.attributes.TREES,
              minTrees: feature.attributes.SHRUBLANDS,
              mra3y: feature.attributes.GRASSLANDS,
              zra3at: feature.attributes.CROPLANDS,
              mngrof: feature.attributes.MANGROVES,
              id: i,
            };
          }),
        });
      });

      this.setState({
        data: formatedGov,
      });
    }
  }
  componentDidMount() {
    this.drawChart();
  }

  render() {
    const renderCustomBarLabel = ({ x, y, width, value }) => {
      return (
        <text
          className="barText"
          x={x + width / 2}
          y={y}
          fill="#000"
          textAnchor="middle"
          dy={-6}
        >
          {value}
        </text>
      );
    };

    return (
      <div className="goveChartBar">
        <Row>
          {this.state.data &&
            this.state.data.map((d) => (
              <Col
                xl={this.state.data.length == 1 ? { span: 24 } : { span: 12 }}
                lg={{ span: 24 }}
              >
                <div className="goverCharCol">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      width={500}
                      height={400}
                      data={d.chartData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <XAxis dataKey="name" />
                      <YAxis
                        dx={-20}
                        dy={-20}
                        minTickGap={5}
                        padding={{ bottom: 20 }}
                        label={{
                          value: "كم2",
                          offset: "20",
                          position: "insideTopLeft",
                        }}
                        min={0}
                        max={4000}
                      />
                      <Bar
                        dataKey="trees"
                        fill={
                          dashboardTabsTitle.find((x) => x.name == "TREES")
                            .colorHex
                        }
                        label={renderCustomBarLabel}
                      >
                        <LabelList
                          y="400"
                          position="center"
                          dataKey="trees"
                          content={({ x, y }) => (
                            <Tooltip title="اشجار" placement="top">
                              <TreesImg x={x + 2} y={y} />
                            </Tooltip>
                          )}
                        />
                      </Bar>
                      <Bar
                        dataKey="minTrees"
                        fill={
                          dashboardTabsTitle.find((x) => x.name == "SHRUBLANDS")
                            .colorHex
                        }
                        label={renderCustomBarLabel}
                      >
                        <LabelList
                          y="400"
                          dataKey="miniTrees"
                          content={({ x, y }) => (
                            <Tooltip title="شجيرات" placement="top">
                              <MiniTreesImg x={x + 2} y={y} />
                            </Tooltip>
                          )}
                        />
                      </Bar>
                      <Bar
                        dataKey="zra3at"
                        fill={
                          dashboardTabsTitle.find((x) => x.name == "CROPLANDS")
                            .colorHex
                        }
                        label={renderCustomBarLabel}
                      >
                        <LabelList
                          y="400"
                          dataKey="zra3at"
                          content={({ x, y }) => (
                            <Tooltip title="زراعات" placement="top">
                              <Zra3atImg x={x + 2} y={y} />
                            </Tooltip>
                          )}
                        />
                      </Bar>
                      <Bar
                        dataKey="mra3y"
                        fill={
                          dashboardTabsTitle.find((x) => x.name == "GRASSLANDS")
                            .colorHex
                        }
                        label={renderCustomBarLabel}
                      >
                        <LabelList
                          y="400"
                          dataKey="mra3y"
                          content={({ x, y }) => (
                            <Tooltip title="مراعي" placement="top">
                              <Mra3yImg x={x + 2} y={y} />
                            </Tooltip>
                          )}
                        />
                      </Bar>

                      <Bar
                        dataKey="mngrof"
                        fill={
                          dashboardTabsTitle.find((x) => x.name == "MANGROVES")
                            .colorHex
                        }
                        label={renderCustomBarLabel}
                      >
                        <LabelList
                          y="400"
                          dataKey="mngrof"
                          content={({ x, y }) => (
                            <Tooltip title="مانجروف" placement="top">
                              <MngrofImg x={x + 2} y={y} />
                            </Tooltip>
                          )}
                        />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <h6 className="govH6">{d.name}</h6>
              </Col>
            ))}
        </Row>
      </div>
    );
  }
}
