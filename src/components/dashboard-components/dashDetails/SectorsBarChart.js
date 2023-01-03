import React, { Component } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { ReactComponent as MngrofImg } from "../../../assets/images/dashBarLabel/mngrofBlack.svg";
import { ReactComponent as TreesImg } from "../../../assets/images/dashBarLabel/treesBlack.svg";
import { ReactComponent as MiniTreesImg } from "../../../assets/images/dashBarLabel/miniTreesBlack.svg";
import { ReactComponent as Mra3yImg } from "../../../assets/images/dashBarLabel/mra3yBlack.svg";
import { ReactComponent as Zra3atImg } from "../../../assets/images/dashBarLabel/zra3atBlack.svg";
import { Tooltip } from "antd";
import { dashboardTabsTitle } from "../../../helper/layers";
export default class SectorsBarChart extends Component {
  state = { data: null };

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.drawChart();
    }
  }

  drawChart() {
    if (this.props.data) {
      let formatedData = this.props.data.map((feature, index) => {
        return {
          name: "القطاع " + feature.attributes.SECTOR_NO,
          trees: feature.attributes.TREES,
          minTrees: feature.attributes.SHRUBLANDS,
          mra3y: feature.attributes.GRASSLANDS,
          zra3at: feature.attributes.CROPLANDS,
          mngrof: feature.attributes.MANGROVES,
          id: index,
        };
      });
      this.setState({
        data: formatedData,
      });
    }
  }

  componentDidMount() {
    this.drawChart();
  }

  render() {
    const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
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
      <div className="defaultBar">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={400}
            data={this.state.data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis
              dx={2}
              dy={2}
              minTickGap={5}
              padding={{ bottom: 20 }}
              label={{
                value: "كم2",
                offset: "-10",
                position: "insideTopLeft",
              }}
              min={0}
              max={4000}
            />
            <Bar
              dataKey="trees"
              fill={dashboardTabsTitle.find((x) => x.name == "TREES").colorHex}
              label={renderCustomBarLabel}
            >
              <LabelList
                y="400"
                position="center"
                dataKey="trees"
                content={({ x, y }) => (
                  <Tooltip title="اشجار" placement="top">
                    <TreesImg x={x + 18} y={y} />
                  </Tooltip>
                )}
              />
            </Bar>
            <Bar
              dataKey="minTrees"
              fill={
                dashboardTabsTitle.find((x) => x.name == "SHRUBLANDS").colorHex
              }
              label={renderCustomBarLabel}
            >
              <LabelList
                y="400"
                dataKey="miniTrees"
                content={({ x, y }) => (
                  <Tooltip title="شجيرات" placement="top">
                    <MiniTreesImg x={x + 18} y={y} />
                  </Tooltip>
                )}
              />
            </Bar>

            <Bar
              dataKey="zra3at"
              fill={
                dashboardTabsTitle.find((x) => x.name == "CROPLANDS").colorHex
              }
              label={renderCustomBarLabel}
            >
              <LabelList
                y="400"
                dataKey="zra3at"
                content={({ x, y }) => (
                  <Tooltip title="زراعات" placement="top">
                    <Zra3atImg x={x + 18} y={y} />
                  </Tooltip>
                )}
              />
            </Bar>
            <Bar
              dataKey="mra3y"
              fill={
                dashboardTabsTitle.find((x) => x.name == "GRASSLANDS").colorHex
              }
              label={renderCustomBarLabel}
            >
              <LabelList
                y="400"
                dataKey="mra3y"
                content={({ x, y }) => (
                  <Tooltip title="مراعي" placement="top">
                    <Mra3yImg x={x + 18} y={y} />
                  </Tooltip>
                )}
              />
            </Bar>
            <Bar
              dataKey="mngrof"
              fill={
                dashboardTabsTitle.find((x) => x.name == "MANGROVES").colorHex
              }
              label={renderCustomBarLabel}
            >
              <LabelList
                y="400"
                dataKey="mngrof"
                content={({ x, y }) => (
                  <Tooltip title="مانجروف" placement="top">
                    <MngrofImg x={x + 18} y={y} />
                  </Tooltip>
                )}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
