import React, { useState } from "react";
import "react-tabs/style/react-tabs.css";
import Fade from "react-reveal";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { tabsTitle } from "../../helper/layers";
function ExpMapChecks(props) {
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

    props.selectedIndexCallback(formatedSelected);
  };

  const children = (
    <Box className="expCheckboxGroup">
      {tabsTitle.map((c) => (
        <FormControlLabel
          label={
            <>
              <img
                src={c.icon}
                alt="checkIcon"
                style={{ paddingLeft: "5px" }}
              />
              {c.name}
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
      <div
        className="expMapTags"
        style={{
          order: !props.openDrawer ? "1" : "2",
          position: !props.openDrawer ? "absolute" : "unset",
          right: !props.openDrawer ? "300px" : "unset",
        }}
      >
        {children}
      </div>
    </Fade>
  );
}

export default ExpMapChecks;
