import React, { useState, useEffect, useContext } from "react";
import { Input, Form, Tooltip } from "antd";
import { mapUrl, searchFieldNameConfig } from "../../config";
import nearbyIcon from "../../assets/images/outerSearchIcon.svg";
import activeNearByIcon from "../../assets/images/outerSearchActive.svg";
import {
  addPictureSymbol,
  getFeatureDomainName,
  getLayerId,
  makeIdentify,
  queryTask,
  showLoading,
} from "../../helper/common_func";
import { layersSetting, tabsTitle } from "../../helper/layers";

let displayed = [];
export default function OuterSearchForm(props) {
  const [displayedOuterSearch, setDisplayedOuterSearch] = useState([]);
  const [outerAutoComplete, setOuterComplete] = useState(true);
  const [outerSearchText, setFormValues] = useState("");
  const [isActiveBufferSearch, setActiveBufferSearch] = useState(false);

  const handleOuterSearchText = (e) => {
    e.preventDefault();
    setOuterComplete(true);
    props.map.__selectedItem = null;
    var searchQuery = e.target.value.toLowerCase();
    setFormValues(e.target.value.toLowerCase());

    if (searchQuery.length >= 3) {
      getFilterUserSearchInput(searchQuery);
    }
  };

  const activeBufferSearch = () => {
    setActiveBufferSearch(!isActiveBufferSearch);
  };

  const getFilterUserSearchInput = (e) => {
    let selectedTabsIndex =
      props.selectedTab != null && props.selectedTab.length > 0
        ? Array.isArray(props.selectedTab)
          ? props.selectedTab
          : [props.selectedTab]
        : [...Array(tabsTitle.length).keys()];
    let layersId = [];
    let promiseQueries = [];
    selectedTabsIndex.forEach((index) => {
      let layerdId = getLayerId(
        props.map.__mapInfo,
        tabsTitle[index].layerName
      );
      layersId.push(layerdId);

      promiseQueries.push(
        queryTask({
          url: mapUrl + "/" + layerdId,
          where: searchFieldNameConfig + " Like '%" + e + "%'",
          outFields: layersSetting[tabsTitle[index].layerName].outFields,
          returnGeometry: false,
          geometry: isActiveBufferSearch ? props.map.view.extent : null,
          returnExecuteObject: true,
        })
      );
    });

    showLoading(true);
    Promise.all(promiseQueries).then((resultsData) => {
      var allResult = [];

      let filteredResultLength = resultsData.filter(
        (f) => f.features.length
      ).length;

      if (filteredResultLength) {
        resultsData.forEach((result, index) => {
          if (result.features.length) {
            getFeatureDomainName(result.features, layersId[index]).then(
              (res) => {
                let mappingRes = res.map((f) => {
                  return {
                    layerName: tabsTitle[selectedTabsIndex[index]].layerName,
                    id: f.attributes["OBJECTID"],
                    ...f.attributes,
                    //geometry:f.geometry
                  };
                });

                allResult = allResult.concat(mappingRes);
                --filteredResultLength;

                if (filteredResultLength == 0) {
                  showLoading(false);
                  let searchQuery = e;
                  displayed = allResult.filter(function (el) {
                    var searchValue = el[searchFieldNameConfig].toLowerCase();
                    return searchValue.indexOf(searchQuery) !== -1;
                  });
                  setDisplayedOuterSearch(displayed);
                  //props.getOuterSearchData(searchQuery);

                  props.setFilteredResult(displayed);
                }
              }
            );
          }
        });
      } else {
        showLoading(false);
        setDisplayedOuterSearch([]);

        props.setFilteredResult([]);
      }
    });
  };

  useEffect(() => {
    setOuterComplete(false);
  }, [props.routeName]);

  const onEnterOuterSearch = (value) => {
    if (value && value.layerName) {
      props.setFilteredResult([value]);
    }
    props.setNavRouteName("outerSearch");
    props.handleDrawerOpen();
    props.outerOpenResultMenu();
    setOuterComplete(false);
  };
  //   const openDetailsOuterSearch = () => {
  //     navigate("/search");
  //     props.handleDrawerOpen();
  //     props.outerOpenResultdetails();
  //   };
  return (
    <Form className="GeneralForm" layout="vertical" name="validate_other">
      <Form.Item name="searchText" className="outerSearchInput">
        <Input
          placeholder="... البحث عن موقع"
          allowClear
          value={outerSearchText}
          onPressEnter={onEnterOuterSearch}
          onChange={handleOuterSearchText}
          size="large"
          suffix={
            <Tooltip
              placement="bottom"
              title="لتفعيل البحث بالنطاق الجغرافي الحالي"
            >
              <img
                alt="nearbyIcon"
                src={isActiveBufferSearch ? activeNearByIcon : nearbyIcon}
                onClick={activeBufferSearch}
                className="nearbyIcon"
              />
            </Tooltip>
          }
        />
      </Form.Item>
      {outerSearchText !== "" &&
        displayedOuterSearch.length > 0 &&
        outerAutoComplete && (
          <div className="outerSearchAutoComplete">
            {displayedOuterSearch.slice(0, 50).map((x) => (
              <p onClick={() => onEnterOuterSearch(x)}>
                {x[searchFieldNameConfig]}
              </p>
            ))}
          </div>
        )}
    </Form>
  );
}
