import React, { Component, useContext, useState } from 'react';
import { addPictureSymbol, getFeatureDomainName, getLayerId, getMapInfo, makeIdentify, project, showLoading } from '../../../helper/common_func';
import Home from '@arcgis/core/widgets/Home'
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import MapImageLayer from "@arcgis/core/layers/MapImageLayer"
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery";
import Expand from "@arcgis/core/widgets/Expand";
import Print from "@arcgis/core/widgets/Print";
import Measurement from "@arcgis/core/widgets/Measurement";
import { dashboardMapUrl, initialCameraPosition, mapUrl } from '../../../config';
import * as intl from "@arcgis/core/intl";
import ScaleBar from "@arcgis/core/widgets/ScaleBar";

import identifyIcon from '../../../assets/images/identify.gif'
import { tabsTitle } from '../../../helper/layers';
import NavigationToggle from "@arcgis/core/widgets/NavigationToggle";
import SceneView from "@arcgis/core/views/SceneView";
import * as urlUtils from "@arcgis/core/core/urlUtils";
import CoordinateConversion from "@arcgis/core/widgets/CoordinateConversion";
import Compass from "@arcgis/core/widgets/Compass";

class MapComponent extends Component {


    constructor(props) {
        super(props);

    }

    componentDidMount() {

        let mapServiceUrl = mapUrl;
        //1- get map info
        //2- query task
        //3- projection
        //4- get domain
        //5- highlight and zoom
        //6- add layers
        //7- map events
        //8- identify

        const graphicLayersIds = ["ZoomGraphicLayer", "SelectGraphicLayer",
            "printGraphicLayer", "identifyGraphicLayer", "locationGraphicLayer"]
        let map;

        debugger

        let view;

        //esri proxy
        // urlUtils.addProxyRule({
        //     proxyUrl: "https://maps.mrda.gov.sa/Proxy/proxy.ashx",
        //     urlPrefix: "webmap.mrda.gov.sa:6443"
        // });

        if (this.props.type == "3d") {

            mapServiceUrl = dashboardMapUrl;

            const params = new URLSearchParams(window.location.search);

            map = new Map({
                basemap: params.get('maptype') == "dark" ? "streets-night-vector" :
                    "streets-navigation-vector"
            });

            intl.setLocale("ar");


            var GregorianYear = (new Date()).getFullYear();
            window.__HijriYear = Math.round((GregorianYear - 622) * (33 / 32));

            view = new SceneView({
                camera: initialCameraPosition,
                container: "mapDiv",
                map: map,
                popup: {
                    dockOptions: {
                        buttonEnabled: false
                    }
                },
                extent: {
                    xmin: 4298666.192281065,
                    ymin: 2044154.877695554,
                    xmax: 4894472.25196505,
                    ymax: 2752190.9075320563,
                    spatialReference: {
                        wkid: 102100
                    }
                }
            });
            // creates a new instance of the NavigationToggle widget


            map.view = view;
            window.__view = view;

            view.on('pointer-move', (evt) => {
                view.hitTest(evt).then((response) => {
                    if (response.results.length) {

                        var graphic = response.results.filter((result) => {
                            // check if the graphic belongs to the layer of interest 
                            return result.graphic.layer.id.indexOf("barLayer_") > -1;
                        });

                        if (graphic.length) {
                            debugger
                            graphic = graphic[0].graphic;
                            view.popup.open({
                                location: graphic.geometry.centroid,
                                features: [graphic]
                            });
                        }
                        else { view.popup.close(); }

                    } else {
                        view.popup.close();
                    }
                })
            });

        }
        else {
            map = new Map({
                basemap: "streets-navigation-vector"
            });
            view = new MapView({
                container: "mapDiv",
                map: map,
                constraints: {
                    minZoom: 2
                },
                ui: {
                    components: ["attribution"]
                },
                extent: {
                    xmin: 4298666.192281065,
                    ymin: 2044154.877695554,
                    xmax: 4894472.25196505,
                    ymax: 2752190.9075320563,
                    spatialReference: {
                        wkid: 102100
                    }
                }
            });


            map.view = view;

            const compassWidget = new Compass({
                view: map.view,
                container: document.getElementById("northCompassIcon")
            });

            // Add the Compass widget to the top left corner of the view
            //map.view.ui.add(compassWidget, "bottom-left");

            function showCoordinates(evt) {

                if (document.getElementById("infoXY")) {
                    var point = view.toMap({ x: evt.x, y: evt.y });
                    project([point], 32637, (res) => {
                        //display mouse coordinates
                        document.getElementById("infoXY").innerHTML =
                            "X: " + res[0].x.toFixed(3) + ", Y: " + res[0].y.toFixed(3);
                    });
                }

            }

            view.when(function () {
                //after map loads, connect to listen to mouse move & drag events
                view.on("pointer-move", showCoordinates);
            });
        }

        const scaleBar = new ScaleBar({
            view: map.view,
            unit: "dual", // The scale bar displays both metric and non-metric units.,
            container: document.getElementById('scaleBarDiv')
        });


        /*const ccWidget = new CoordinateConversion({
            view: view,
            orientation: "expand-down"
        });

        map.view.ui.add(ccWidget, "bottom-right");*/


        //SceneView
        /*const 

       
        */
        /*const basemapGallery = new BasemapGallery({
            view: view,
            container: document.createElement("div")
        });
        const bgExpand = new Expand({
            view: view,
            content: basemapGallery
        });*/


        /*const measurement = new Measurement({
            view: view,
            activeTool: "distance"
          });

        const bgExpand2 = new Expand({
            view: view,
            content: measurement
        });

        view.ui.add(bgExpand2, "top-left");


        
        basemapGallery.watch("activeBasemap", () => {
            const mobileSize =
                view.heightBreakpoint === "xsmall" ||
                view.widthBreakpoint === "xsmall";

            if (mobileSize) {
                bgExpand.collapse();
            }
        });

        // Add the expand instance to the ui

        view.ui.add(bgExpand, "top-left");
*/



        var dynamicMapServiceLayer = new MapImageLayer({
            url: this.props.mapUrl || mapServiceUrl,
            id: 'baseMap'
        });

        map.layers.add(dynamicMapServiceLayer);

        graphicLayersIds.forEach((graphicLayerId) => {
            var graphicLayer = new GraphicsLayer({
                id: graphicLayerId
            });
            map.layers.add(graphicLayer);
        });

        /*var homeBtn = new Home({
            view: view
        });
        view.ui.add(homeBtn, "top-left");*/
        //hide esri logo
        view.ui._removeComponents(["attribution"]);


        map.view = view;

        const getSearchedLayerIds = () => {

            return tabsTitle.map((item) => {
                return getLayerId(
                    map.__mapInfo,
                    item.layerName
                )
            });

        }

        if (this.props.type != "3d") {

            // Get the screen point from the view's click event
            map.view.on("click", (event) => {

                /*makeIdentify(map.view, event.mapPoint, ['*'], 5).then((res) => {
                    debugger
                })*/
                debugger
                var identifiedLayers = getSearchedLayerIds();


                if (!localStorage.user || this.props.isPublic) {

                    addPictureSymbol(event.mapPoint, identifyIcon, "identifyGraphicLayer", map);


                    makeIdentify(map.view, event.mapPoint,
                        identifiedLayers, 5, "top").then(
                            ({ results }) => {


                                if (results.length > 0) {
                                    getFeatureDomainName([results[0].feature], results[0].layerId).then(
                                        (res) => {

                                            let mappingRes = res.map((f) => {
                                                return {
                                                    layerName: results[0].layerName,
                                                    id: f.attributes["OBJECTID"],
                                                    ...f.attributes,
                                                    geometry: f.geometry
                                                };
                                            });


                                            this.props.setNavRouteName("outerSearch");
                                            this.props.handleDrawerOpen();

                                            map.__selectedItem = mappingRes[0];
                                            map.__selectedItem.isNotZoom = true;

                                            this.props.setFilteredResult(mappingRes);
                                        });

                                }

                                else {
                                    map.findLayerById("identifyGraphicLayer").removeAll();
                                }
                            }
                        );
                }
            });
        }


        view.when(() => {

            
            getMapInfo(mapServiceUrl).then((response) => {
                debugger
                map.__mapInfo = response;

                this.props.mapload(map);

            });
        }, function (error) {
            // Use the errback function to handle when the view doesn't load properly
            console.log("The view's resources failed to load: ", error);
        });


    }

    render() {
        return (
            <div id='mapDiv' style={{
                height: "100%",
                marginTop: this.props.openDrawer && this.props.mapExp && localStorage.user
                    ? "57px" : "",
                marginRight:
                    this.props.openDrawer &&
                        this.props.routeName !== "generalSearch" &&
                        this.props.routeName !== "outerSearch"
                        ? "300px"
                        : this.props.openDrawer &&
                            (this.props.routeName === "generalSearch" ||
                                this.props.routeName === "outerSearch")
                            ? "400px"
                            : "unset",
            }}>
            </div>
        )
    }
}

export default MapComponent;
