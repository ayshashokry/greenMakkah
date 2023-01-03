import React, { useContext, useEffect, useState } from "react";

import { Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToolbox } from "@fortawesome/free-solid-svg-icons";
import {
  faSearchPlus,
  faSearchMinus,
  faGlobeAmericas,
  faChevronLeft,
  faChevronRight,
  faArrowsAlt,
  faThLarge,
} from "@fortawesome/free-solid-svg-icons";
import * as watchUtils from "@arcgis/core/core/watchUtils";
import Draw from "@arcgis/core/views/draw/Draw";
import Extent from "@arcgis/core/geometry/Extent";
import Graphic from "@arcgis/core/Graphic";
import ExpServices from "./ExpServices";
import Zoom from "@arcgis/core/widgets/Zoom";
import BaseMapGallery from "./ExpServices-components/BaseMapGallery";

export default function MapTools(props) {
  //props --> map
  const [activeTool, setActiveTool] = useState("");
  const [showBaseMapGallery, setShowBaseMapGallery] = useState(false)

  const removeActiveTool = () => {
    setActiveTool("");
  };
  const [loggedIn] = useState(localStorage.user && !props.isPublic);
  const [mapToolsDisplay, setMapToolsDisplay] = useState(true);
  const openMapTools = () => {
    setMapToolsDisplay(!mapToolsDisplay);
  };

  let evtViewDragHandler;
  let evtViewKeyDownHandler;

  // const initToolbar = () => {};

  
  const enableViewPanning = () => {
    if (window.__evtViewDragHandler) {
      window.__evtViewDragHandler.remove();
      window.__evtViewDragHandler = null;
    }
    if (window.__evtViewKeyDownHandler) {
      window.__evtViewKeyDownHandler.remove();
      window.__evtViewKeyDownHandler = null;
    }
  };

  const disableViewPanning = () => {
    if (window.__evtViewDragHandler) {
      window.__evtViewDragHandler.remove();
      window.__evtViewDragHandler = null;
    }
    if (window.__evtViewKeyDownHandler) {
      window.__evtViewKeyDownHandler.remove();
      window.__evtViewKeyDownHandler = null;
    }
    window.__evtViewDragHandler = props.map.view.on("drag", (event) => {
      // prevents panning with the mouse drag event
      if (activeTool != "dis") event.stopPropagation();
    });

    window.__evtViewKeyDownHandler = props.map.view.on("key-down", (event) => {
      // prevents panning with the arrow keys
      var keyPressed = event.key;
      if (keyPressed.slice(0, 5) === "Arrow") {
        if (activeTool != "dis") event.stopPropagation();
      }
    });
  };


  const displayCrosshairCursor = () => {
    props.map.view.container.style.cursor = "crosshair";
  };
  // const displayPointerCursor = () => {
  //   props.map.view &&
  //     props.map.view.container &&
  //     props.map.view.container.style &&
  //     "pointer" !== props.map.view.container.style.cursor &&
  //     (props.map.view.container.style.cursor = "pointer");
  // };
  const displayDefaultCursor = () => {
    props.map.view &&
      props.map.view.container &&
      props.map.view.container.style &&
      "default" !== props.map.view.container.style.cursor &&
      (props.map.view.container.style.cursor = "default");
  };

  const removeCurrentSelTool = () => {
    props.map.view.popup.close();
  };

  const getExtentfromVertices = (vertices) => {
    var sx = vertices[0][0],
      sy = vertices[0][1];
    var ex = vertices[1][0],
      ey = vertices[1][1];
    var rect = {
      x: Math.min(sx, ex),
      y: Math.max(sy, ey),
      width: Math.abs(sx - ex),
      height: Math.abs(sy - ey),
      spatialReference: props.map.view.spatialReference,
    };
    if (rect.width !== 0 || rect.height !== 0) {
      return new Extent({
        xmin: parseFloat(rect.x),
        ymin: parseFloat(rect.y) - parseFloat(rect.height),
        xmax: parseFloat(rect.x) + parseFloat(rect.width),
        ymax: parseFloat(rect.y),
        spatialReference: rect.spatialReference,
      });
    } else {
      return null;
    }
  };

  const drawRect = (event) => {
    var vertices = event.vertices;
    //remove existing graphic
    props.map.view.graphics.removeAll();
    if (vertices.length < 2) {
      return;
    }

    // create a new extent
    var extent = getExtentfromVertices(vertices);

    var graphic = new Graphic({
      geometry: extent,
      symbol: {
        type: "simple-fill", // autocasts as SimpleFillSymbol
        color: [0, 0, 0, 0.3],
        style: "solid",
        outline: {
          // autocasts as SimpleLineSymbol
          color: [255, 0, 0],
          width: 1,
        },
      },
    });

    props.map.view.graphics.add(graphic);
  };

  function zoomOut(evt) {
    var vertices = evt.vertices;
    if (!window.__draw) {
      window.__draw = new Draw({
        view: props.map.view,
      });
    }
    window.__draw.reset();
    props.map.view.graphics.removeAll();
    var action = window.__draw.create("rectangle");
    //view.focus();
    action.on("vertex-add", drawRect);
    action.on("draw-complete", zoomOut);
    action.on("cursor-update", drawRect);
    if (evt.vertices.length === 1) {
      props.map.view.goTo({ scale: props.map.view.scale * 2 });
      return;
    }
    var sx = vertices[0][0],
      sy = vertices[0][1];
    var ex = vertices[1][0],
      ey = vertices[1][1];
    var rect = {
      x: Math.min(sx, ex),
      y: Math.max(sy, ey),
      width: Math.abs(sx - ex),
      height: Math.abs(sy - ey),
      spatialReference: props.map.view.spatialReference,
    };
    if (rect.width !== 0 || rect.height !== 0) {
      var scrPnt1 = props.map.view.toScreen(rect);
      var scrPnt2 = props.map.view.toScreen({
        x: rect.x + rect.width,
        y: rect.y,
        spatialReference: rect.spatialReference,
      });
      var mWidth = props.map.view.extent.width;
      var delta =
        ((mWidth * props.map.view.width) / Math.abs(scrPnt2.x - scrPnt1.x) -
          mWidth) /
        2;
      var vExtent = props.map.view.extent;
      props.map.view.goTo(
        new Extent({
          xmin: vExtent.xmin - delta,
          ymin: vExtent.ymin - delta,
          xmax: vExtent.xmax + delta,
          ymax: vExtent.ymax + delta,
          spatialReference: vExtent.spatialReference,
        })
      );
    }
  }

  const zoomIn = (evt) => {
    if (!window.__draw) {
      window.__draw = new Draw({
        view: props.map.view,
      });
    }
    window.__draw.reset();
    props.map.view.graphics.removeAll();
    var action = window.__draw.create("rectangle");
    //props.map.view.focus();
    action.on("vertex-add", drawRect);
    action.on("draw-complete", zoomIn);
    action.on("cursor-update", drawRect);
    if (evt.vertices.length === 1) {
      props.map.view.goTo({ scale: props.map.view.scale * 0.5 });
      return;
    }
    var extent = getExtentfromVertices(evt.vertices);
    if (extent.width !== 0 || extent.height !== 0) {
      props.map.view.goTo(extent);
    }
  };

  const activeZoomIn = (e) => {

    if (loggedIn) {
      setActiveTool("zoomIn");
      removeCurrentSelTool();
      disableViewPanning();
      props.map.view.graphics.removeAll();
      if (!window.__draw) {
        window.__draw = new Draw({
          view: props.map.view,
        });
      }
      var action = window.__draw.create("rectangle");
      displayCrosshairCursor();
      //props.map.view.focus();
      action.on("vertex-add", drawRect);
      action.on("draw-complete", zoomIn);
      action.on("cursor-update", drawRect);
    }
    else {

      var zoom = new Zoom({
        view: props.map.view,
        visible: false
      });

      zoom.zoomIn();


    }
  };

  const activeZoomOut = () => {

    if (loggedIn) {
      setActiveTool("zoomOut");
      removeCurrentSelTool();
      disableViewPanning();
      props.map.view.graphics.removeAll();
      if (!window.__draw) {
        window.__draw = new Draw({
          view: props.map.view,
        });
      }
      var action = window.__draw.create("rectangle");
      displayCrosshairCursor();
      //view.focus();
      action.on("vertex-add", drawRect);
      action.on("draw-complete", zoomOut);
      action.on("cursor-update", drawRect);
    }
    else {

      var zoom = new Zoom({
        view: props.map.view,
        visible: false
      });

      zoom.zoomOut();
    }
  };

  const goToPreviousExtent = () => {
    setActiveTool("prev");
    if (window.__extentHistory[window.__extentHistoryIndx].preExtent) {
      window.__prevExtent = true;
      if (window.__extentHistoryIndx > 0) {
        props.map.view.goTo(
          window.__extentHistory[window.__extentHistoryIndx].preExtent
        );
        window.__extentHistoryIndx--;
      }
    }
  };

  const goToNextExtent = () => {
    setActiveTool("next");
    window.__nextExtent = true;
    if (window.__extentHistory.length > window.__extentHistoryIndx + 1) {
      window.__extentHistoryIndx++;
      props.map.view.goTo(
        window.__extentHistory[window.__extentHistoryIndx].currentExtent
      );
    }
  };

  const goToFullExtent = () => {
    setActiveTool("fullExt");
    props.map.view.goTo(window.__fullExtent);
    if (props.setIndicatorFullExtent) {
      props.setIndicatorFullExtent();
    }
  };

  const showBaseMap = () => {
    setShowBaseMapGallery(true);
  }

  const disableActiveTool = () => {
    setActiveTool("dis");
    removeCurrentSelTool();
    enableViewPanning();
    displayDefaultCursor();
    if (!window.__draw) {
      window.__draw = new Draw({
        view: props.map.view,
      });
    }
    window.__draw.reset();
  };

  window.DisableActiveTool = () => {
    disableActiveTool();
  };

  // const removeAllGraphicsOnMap = () => {
  //   props.map.view.graphics.removeAll();
  // };

  const extentChangeHandler = (evt) => {
    if (window.__prevExtent || window.__nextExtent) {
      window.__currentExtent = evt;
    } else {
      window.__preExtent = window.__currentExtent;
      window.__currentExtent = evt;
      window.__extentHistory = window.__extentHistory || [];
      window.__extentHistory.push({
        preExtent: window.__preExtent,
        currentExtent: window.__currentExtent,
      });
      window.__extentHistoryIndx = window.__extentHistory.length - 1;
    }
    window.__prevExtent = window.__nextExtent = false;
    //console.log('extent--------',_extentHistory);
    //extentHistoryChange();
  };

  useEffect(() => {
    watchUtils.whenTrue(props.map.view, "ready", () => {
      window.__fullExtent = props.map.view.extent.clone();
      window.__draw = new Draw({
        view: props.map.view,
      });
      watchUtils.whenOnce(props.map.view, "extent", () => {
        watchUtils.when(props.map.view, "stationary", (evt) => {
          if (evt) {
            extentChangeHandler(props.map.view.extent);
          }
        });
      });
    });
  }, []);

  return (
    <>
      
      <div className={mapToolsDisplay ? "mapToolsDisplay" : "mapToolsHide"}>
          <ExpServices loggedIn={loggedIn} servi={props.services}
            removeActiveTool={removeActiveTool}homePageProp={props.homePageProp}
            map={props.map}
            openDrawer={props.openDrawer}
            activeTab={activeTool === "" ? true : false}
          />
      
        <ul className="mapToolsUL">
          <div className="merge">
            <li
              style={{ marginBottom: "10px" }}
              onClick={activeZoomIn}
              className={activeTool === "zoomIn" ? "activeMapTool" : ""}
            >
              <Tooltip placement="left" title={"تكبير "}>
                <FontAwesomeIcon icon={faSearchPlus} />
              </Tooltip>
            </li>
            <li
              onClick={activeZoomOut}
              className={activeTool === "zoomOut" ? "activeMapTool" : ""}
            >
              <Tooltip placement="left" title={"تصغير "}>
                <FontAwesomeIcon icon={faSearchMinus} />
              </Tooltip>
            </li>
          </div>
          <li
            onClick={goToFullExtent}
            className={activeTool === "fullExt" ? "activeMapTool" : ""}
          >
            <Tooltip placement="left" title={"الخريطة كاملة "}>
              <FontAwesomeIcon icon={faGlobeAmericas} />
            </Tooltip>
          </li>
          {loggedIn && (
            <div className="merge">
              <li
                style={{ marginBottom: "10px" }}
                onClick={goToPreviousExtent}
                className={activeTool === "prev" ? "activeMapTool" : ""}
              >
                <Tooltip placement="left" title={"السابق "}>
                  <FontAwesomeIcon icon={faChevronLeft} />
                </Tooltip>
              </li>
              <li
                onClick={goToNextExtent}
                className={activeTool === "next" ? "activeMapTool" : ""}
              >
                <Tooltip placement="left" title={"التالي "}>
                  <FontAwesomeIcon icon={faChevronRight} />
                </Tooltip>
              </li>
            </div>
          )}
          {loggedIn && <li
            onClick={disableActiveTool}
            className={activeTool === "dis" ? "activeMapTool" : ""}
          >
            <Tooltip placement="left" title={"تحريك "}>
              <FontAwesomeIcon icon={faArrowsAlt} />
            </Tooltip>
          </li>}
          {/*<li onClick={disableActiveTool}>
        <Tooltip placement="left" title={"تعطيل"}>
          <FontAwesomeIcon icon={faTimes} />
        </Tooltip>
  </li>*/}
          {/* <li onClick={removeAllGraphicsOnMap}>
            <Tooltip placement="left" title={"مسح الكل "}>
              <FontAwesomeIcon icon={faTrash} />
            </Tooltip>
          </li> */}
        </ul>
      </div>
      {loggedIn && (
        <div className="mapToolIcon" onClick={openMapTools}>
          <FontAwesomeIcon icon={faToolbox} />
        </div>
      )}
    </>
  );
}
