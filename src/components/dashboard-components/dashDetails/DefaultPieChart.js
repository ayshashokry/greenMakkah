import React, { Component } from "react";
import {
    PieChart, Pie, Tooltip, Cell, ResponsiveContainer
} from "recharts";
import { ReactComponent as MngrofImg } from "../../../assets/images/dashBarLabel/mngrofBlack.svg";
import { ReactComponent as TreesImg } from "../../../assets/images/dashBarLabel/treesBlack.svg";
import { ReactComponent as MiniTreesImg } from "../../../assets/images/dashBarLabel/miniTreesBlack.svg";
import { ReactComponent as Mra3yImg } from "../../../assets/images/dashBarLabel/mra3yBlack.svg";
import { ReactComponent as Zra3atImg } from "../../../assets/images/dashBarLabel/zra3atBlack.svg";
import { dashboardTabsTitle } from "../../../helper/layers";

export default class Example extends Component {
    state = { data: null };

    componentDidMount() {
        if (this.props.data) {
            this.setState({
                data: [
                    {
                        name: "اشجار",
                        colorHex: dashboardTabsTitle.find((x) => x.name == "TREES")
                            .colorHex,
                        value: this.props.data.attributes.TREES,
                        id: 1,
                    },
                    {
                        name: "شجيرات",
                        value: this.props.data.attributes.SHRUBLANDS,
                        colorHex: dashboardTabsTitle.find((x) => x.name == "SHRUBLANDS")
                            .colorHex,
                        id: 2,
                    },
                    {
                        name: "مراعي",
                        value: this.props.data.attributes.GRASSLANDS,
                        colorHex: dashboardTabsTitle.find((x) => x.name == "GRASSLANDS")
                            .colorHex,
                        id: 3,
                    },
                    {
                        name: "زراعات",
                        value: this.props.data.attributes.CROPLANDS,
                        colorHex: dashboardTabsTitle.find((x) => x.name == "CROPLANDS")
                            .colorHex,
                        id: 4,
                    },
                    {
                        name: "مانجروف",
                        value: this.props.data.attributes.MANGROVES,
                        colorHex: dashboardTabsTitle.find((x) => x.name == "MANGROVES")
                            .colorHex,
                        id: 5,
                    },
                ],
            });
        }
    }
    render() {

        const RADIAN = Math.PI / 180;
        const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {

            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);

            return (
                <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                    {`${(percent * 100).toFixed(0)}%`}
                </text>
            );
        };

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
            this.state.data && <div className="pieChartClass">
                <PieChart isAnimationActive={false} width={200} height={200}>
                    <Pie
                        isAnimationActive={false}
                        data={this.state.data}
                        cx="50%"
                        cy="50%"
                        width={50}
                        height={50}
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {this.state.data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.colorHex} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </div>

        );
    }
}
