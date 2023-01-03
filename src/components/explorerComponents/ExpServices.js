import React, { useState } from "react";
//import Components
import BaseMapGallery from "./ExpServices-components/BaseMapGallery";
// import ExpFavMenu from "./ExpServices-components/ExpFavMenu";
import ExpInfo from "./ExpServices-components/ExpInfo";
import ExpLayers from "./ExpServices-components/ExpLayers";
//import Packages
import { Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThLarge,
  faInfo,
  // faStar,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
function ExpServices(props) {
  const [selectedTab, setSelectedTab] = useState(-1);

  const closeServiceMenu = () => {
    setSelectedTab(-1);
  };
  {
    console.log(selectedTab);
  }
  return (
    <Tabs
      id={props.activeTab ? "activeTabss" : ""}
      className="expServTabs"
      defaultFocus={false}
      selectedIndex={selectedTab}
      onSelect={(x) => {
        setSelectedTab(x);
        props.removeActiveTool();
      }}>
      <TabList className="roundedUL">
        <Tab>
          <Tooltip title="معرض خارطة الاساس" placement="top">
            <FontAwesomeIcon icon={faThLarge} />
          </Tooltip>
        </Tab>
        {props.loggedIn && props.servi && (
          <>
            {" "}
            <Tab>
              <Tooltip title="استعلام" placement="top">
                <FontAwesomeIcon icon={faInfo} />
              </Tooltip>
            </Tab>
            {/* <Tab>
              <Tooltip title="مفضلة" placement="top">
                <FontAwesomeIcon icon={faStar} />
              </Tooltip>
            </Tab> */}
            <Tab>
              <Tooltip title="طبقات" placement="top">
                <FontAwesomeIcon icon={faLayerGroup} />
              </Tooltip>
            </Tab>
          </>
        )}
      </TabList>
      {/* {props.activeTab ? ( */}
   
          <TabPanel>
            <BaseMapGallery
              closeServiceMenu={closeServiceMenu}
              map={props.map}homePageProp={props.homePageProp}
            />
          </TabPanel>
          {props.loggedIn && props.servi && (
        <>   <TabPanel>
            <ExpInfo closeServiceMenu={closeServiceMenu} map={props.map} />
          </TabPanel>
          {/* <TabPanel>
            <ExpFavMenu closeServiceMenu={closeServiceMenu} />
          </TabPanel> */}
          <TabPanel>
            <ExpLayers closeServiceMenu={closeServiceMenu} map={props.map} />
          </TabPanel>
        </>
      )}
      {/* ) : null} */}
    </Tabs>
  );
}

export default ExpServices;
