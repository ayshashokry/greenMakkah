import React, { Component } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { ReactComponent as MngrofImg } from "../../../assets/images/dashBarLabel/mngrofBlack.svg";
import { ReactComponent as TreesImg } from "../../../assets/images/dashBarLabel/treesBlack.svg";
import { ReactComponent as MiniTreesImg } from "../../../assets/images/dashBarLabel/miniTreesBlack.svg";
import { ReactComponent as Mra3yImg } from "../../../assets/images/dashBarLabel/mra3yBlack.svg";
import { ReactComponent as Zra3atImg } from "../../../assets/images/dashBarLabel/zra3atBlack.svg";
import { dashboardTabsTitle } from "../../../helper/layers";

export default class Example extends Component {
  state = { data: null };

  componentDidUpdate(prevProps) {
    if (this.props.data != prevProps.data) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
    {
      this.updateData();
    }
  }

  updateData() {
    if (this.props.data) {
      this.setState({
        data: [
          {
            name: "اشجار",
            colorHex: dashboardTabsTitle.find((x) => x.name == "TREES")
              .colorHex,
            km: this.props.data.attributes.TREES,
            amt: 2400,
            id: 1,
          },
          {
            name: "شجيرات",
            km: this.props.data.attributes.SHRUBLANDS,
            colorHex: dashboardTabsTitle.find((x) => x.name == "SHRUBLANDS")
              .colorHex,
            amt: 2210,
            id: 2,
          },
          {
            name: "مراعي",
            km: this.props.data.attributes.GRASSLANDS,
            colorHex: dashboardTabsTitle.find((x) => x.name == "GRASSLANDS")
              .colorHex,
            amt: 2290,
            id: 3,
          },
          {
            name: "زراعات",
            km: this.props.data.attributes.CROPLANDS,
            colorHex: dashboardTabsTitle.find((x) => x.name == "CROPLANDS")
              .colorHex,
            amt: 2000,
            id: 4,
          },
          {
            name: "مانجروف",
            km: this.props.data.attributes.MANGROVES,
            colorHex: dashboardTabsTitle.find((x) => x.name == "MANGROVES")
              .colorHex,
            amt: 2181,
            id: 5,
          },
        ],
      });
    }
  }

  componentDidMount() {
    this.updateData()
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

    const renderCustomBarColorHex = ({ x, y, payload }) => {
      return this.state.data[payload - 1].colorHex;
    };

    const renderCustomAxisTick = ({ x, y, payload }) => {
      let path = "";
      let tickName = "";

      switch (payload.value) {
        case 1:
          path = <TreesImg x={x + 30} y={420} />;
          tickName = "اشجار";
          break;
        case 2:
          path = <MiniTreesImg x={x + 50} y={420} />;
          tickName = "شجيرات";
          break;
        case 3:
          path = <Mra3yImg x={x + 35} y={420} />;
          tickName = "مراعي";
          break;
        case 4:
          path = <Zra3atImg x={x + 30} y={420} />;
          tickName = "زراعات";
          break;
        case 5:
          path = <MngrofImg x={x + 50} y={420} />;
          tickName = "مانجروف";
          break;
        default:
          path = "";
      }

      return (
        <>
          {path}
          <text x={x - 12} y={y + 10}>
            {tickName}
          </text>
        </>
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
            <XAxis dataKey="id" tick={renderCustomAxisTick} />
            <YAxis
              dx={2}
              dy={2}
              minTickGap={5}
              // padding={{ bottom: 20 }}
              label={{
                value: "كم2",
                offset: "-10",
                position: "insideTopLeft",
              }}
              min={0}
              max={4000}
            />
            <Bar dataKey="km" label={renderCustomBarLabel}>
              {this.state.data &&
                this.state.data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.colorHex} />
                ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
