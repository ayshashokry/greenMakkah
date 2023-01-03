import React, { Component } from "react";
import { Button } from "antd";
//import Images
import logo1 from "../../../assets/images/greenLogo1.svg";
import logo2 from "../../../assets/images/logo2.png";
import DefaultTable from "./DefaultTable";
import DefaultBarChart from "../dashDetails/DefaultBarChart";
import GovernBarChart from "../dashDetails/GovernBarChart";
import SectorsBarChart from "../dashDetails/SectorsBarChart";
import GovernTable from "./GovernTable";
import SectorsTable from "./SectorsTable";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";

export default class DashTablePrint extends Component {
  state = {
    isMediaPrint: false,
  };
  constructor(props) {
    super(props);
    this.printTable = React.createRef();
  }

  getRouteName() {
    var url = window.location.pathname.split("/");
    return url[url.length - 1];
  }

  onBeforePrint(handlePrint) {
    this.setState({ isMediaPrint: true });
    setTimeout(() => {
      handlePrint();
    }, 1000);
  }
  onAfterPrint() {
    this.setState({ isMediaPrint: false });
  }
  render() {
    const routeName = this.getRouteName();
    const chartsData = JSON.parse(localStorage.getItem("chartsData"));

    return (
      <div className="dashPrint">
        {" "}
        <ReactToPrint
          content={() => this.printTable.current}
          onAfterPrint={this.onAfterPrint.bind(this)}
        >
          <PrintContextConsumer>
            {({ handlePrint }) => (
              <Button
                onClick={this.onBeforePrint.bind(this, handlePrint)}
                className="printBtn mx-5 my-3"
              >
                <FontAwesomeIcon icon={faPrint} className="mx-2" />
                طباعة
              </Button>
            )}
          </PrintContextConsumer>
        </ReactToPrint>
        <div className="dashPrintTable" ref={this.printTable}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr" }}>
            <div>
              <img alt="logo" src={logo2} style={{ paddingLeft: "20px" }} />
            </div>
            <h4 style={{ marginTop: "50px" }}>مؤشرات الاداء للوحة التحكم</h4>
            <div style={{ textAlign: "right", marginTop: "20px" }}>
              <img alt="logo" src={logo1} style={{ paddingRight: "20px" }} />
            </div>
          </div>
          {routeName === "makkah" ? (
            <>
              <div className={this.state.isMediaPrint ? "printDefaultBar" : ""}>
                <DefaultBarChart data={chartsData} />
              </div>
              <DefaultTable data={chartsData} />
            </>
          ) : routeName === "sector" ? (
            <>
              <div className={this.state.isMediaPrint ? "printDefaultBar" : ""}>
                <SectorsBarChart data={chartsData} />
              </div>
              <SectorsTable data={chartsData} />
            </>
          ) : (
            <>
              <GovernBarChart data={chartsData} />
              <GovernTable data={chartsData} />
            </>
          )}
        </div>
      </div>
    );
  }
}
