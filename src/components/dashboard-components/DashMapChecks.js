import React, { useState } from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Fade from "react-reveal/Fade";
import MngrofImg from "../../assets/images/dashBarLabel/mngrof.svg";
import TreesImg from "../../assets/images/dashBarLabel/trees.svg";
import MiniTreesImg from "../../assets/images/dashBarLabel/miniTrees.svg";
import Mra3yImg from "../../assets/images/dashBarLabel/mra3y.svg";
import Zra3atImg from "../../assets/images/dashBarLabel/zra3at.svg";
import DashShowStyle from "./DashShowStyle";
import { dashboardTabsTitle } from "../../helper/layers";
export default function DashMapChecks(props) {
  //Select function
  const [dropSystem, setdropSystem] = useState(undefined);
  const [activeDashBoardFields, setActiveDashBoardFields] = useState(dashboardTabsTitle);
  const handleSelect = (name) => (value, e) => setdropSystem(e.value);

  const [checkedNames, setCheck] = useState({});

  const handleChangeChild = (event) => {
    let updated_obj = {
      ...checkedNames,
      [event.target.id]: event.target.checked,
    };

    setCheck(updated_obj);

    let formatedSelected = Object.keys(updated_obj)
      .filter((index) => updated_obj[index])
      .map((i) => Number(i));

    dashboardTabsTitle.forEach((tab) => {
      let layer = props.map.findLayerById("barLayer_" + tab.name);
      if (formatedSelected.length == 0)
        layer.opacity = 1;
      else if (layer)
        layer.opacity = formatedSelected.indexOf(tab.id) > -1 ? 1 : 0;
    });

    formatedSelected = dashboardTabsTitle.filter((item) => { return formatedSelected.indexOf(item.id) > -1 });

    setActiveDashBoardFields(formatedSelected);
    props.onShowLegend(formatedSelected)

  };

  const children = (
    <Box className="dashCheckboxGroup">
      {dashboardTabsTitle.map((c) => (
        <FormControlLabel
          label={
            <>
              {c.alias} <img src={c.icon} alt="checkIcon" />
            </>
          }
          control={
            <Checkbox
              checked={checkedNames[c.id]}
              id={c.id}
              onChange={handleChangeChild}
              sx={{
                "&.Mui-checked": {
                  "&, & + .MuiFormControlLabel-label": {
                    backgroundColor: "#2e735f",
                    color: "#fff",
                    fontWeight: "bold",
                  },
                  "&, & + .MuiFormControlLabel-label img": {
                    filter: "unset",
                  },
                },
              }}
            />
          }
        />
      ))}
    </Box>
  );

  return (
    <Fade right>
      <div className="dashMapChecks">
        {children}

        <span className="navitemBorder mt-3" style={{ height: "30px" }}></span>

        <DashShowStyle map={props.map} changeYear={props.changeYear} onShowLegend={props.onShowLegend}
          dashBoardWhereFilter={props.dashBoardWhereFilter} activeDashBoardFields={activeDashBoardFields} />

      </div>
    </Fade>
  );
}
