
import Query from "@arcgis/core/rest/support/Query";
import * as query from "@arcgis/core/rest/query";
import esriRequest from "@arcgis/core/request";
import StatisticDefinition from "@arcgis/core/rest/support/StatisticDefinition";
import Graphic from "@arcgis/core/Graphic";
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import * as projection from "@arcgis/core/geometry/projection";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import IdentifyParameters from "@arcgis/core/rest/support/IdentifyParameters"
import * as identify from "@arcgis/core/rest/identify";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { dashboardTabsTitle, layersSetting } from './layers'
import { drawingCalculatedExp, initialCameraPosition, is3dZoomEnabled, mapUrl } from "../config";
import Field from "@arcgis/core/layers/support/Field";
import * as esriLang from "@arcgis/core/core/lang";


export const project = (features, outSR, callback) => {
    if (features && features.length > 0) {
        var isSameWkid = false;
        if (features[0].geometry && features[0].geometry.spatialReference.wkid == outSR
            ||
            features[0].spatialReference.wkid == outSR) {
            isSameWkid = true;
            callback(features);
        }
        if (!isSameWkid) {
            projection.load().then(() => {
                let outSpatialReference = new SpatialReference({
                    wkid: outSR
                });
                let returnFeatures = [];
                features.forEach((graphic) => {
                    if (graphic.geometry)
                        graphic.geometry = projection.project(graphic.geometry, outSpatialReference);
                    else {
                        graphic = projection.project(graphic, outSpatialReference);
                    }
                    returnFeatures.push(graphic);
                });
                callback(returnFeatures);
            });
        }
    }
    else {
        callback(features);
    }
}

export const queryTask = function (settings) {
    if (!settings.notShowLoading)
        showLoading(true);

    var queryObj = new Query();
    queryObj.returnGeometry = settings.returnGeometry || false;
    if (settings.geometry)
    queryObj.geometry = settings.geometry;

    queryObj.returnIdsOnly = settings.returnIdsOnly || false;
    //query.returnCountOnly = settings.returnCountOnly || false
    queryObj.outFields = settings.outFields || ["*"];
    queryObj.returnDistinctValues = settings.returnDistinctValues || false;

    if (queryObj.returnDistinctValues) {
        queryObj.returnGeometry = false;
    }

    if (settings.statistics) {
        queryObj.outStatistics = [];
        var statisticDefinition = {};
        settings.statistics.forEach((val) => {
            statisticDefinition = new StatisticDefinition();
            statisticDefinition.statisticType = val.type;
            statisticDefinition.onStatisticField = val.field;
            statisticDefinition.outStatisticFieldName = val.name;
            queryObj.outStatistics.push(statisticDefinition);
        });
    }

    queryObj.groupByFieldsForStatistics = settings.groupByFields;
    // query.returnCountOnly = settings.returnCountOnly || false
    if (settings.preQuery) {
        settings.preQuery(queryObj, Query);
    }

    if (settings.orderByFields) {
        queryObj.orderByFields = settings.orderByFields;
    }

    if (settings.queryWithGemoerty) {
        queryObj.geometry = settings.geometry;
        if (settings.where) {
            queryObj.where = settings.where;
        }
        if (settings.distance) {
            queryObj.distance = settings.distance || 5;
        }
        queryObj.units = "meters"; //"kilometers";
    }
    else {
        queryObj.where = settings.where || "1=1";
    }

    var token = "";
    if (window.esriToken) token = "?token=" + window.esriToken;
    // var hasPermission = $rootScope.getPermissions('splitandmerge.MAPEXPLORER', 'modules.INVESTMENTLAYERS')
    // if (hasPermission) {
    // token = '?token=' + $rootScope.User.esriToken
    // }
    if (settings.url.indexOf("?token=") > -1) {
        token = "";
    }

    var queryUrl =settings.url + token; // + "?token=" + $rootScope.User.esriToken + "&username='d'")

    function callback(data) {
        // store.dispatch({type:'Show_Loading_new',loading: false})
        if (!settings.notShowLoading)
            showLoading(false);
        settings.callbackResult(data);
    }

    function callbError(data) {
        //window.notifySystem('warning', 'حدث خطأ اثناء استرجاع البيانات')
        // store.dispatch({type:'Show_Loading_new',loading: false})
        showLoading(false);
        if (settings.callbackError) {
            settings.callbackError(data);
        }
    }

    if (settings.returnCountOnly) {
        query.executeForCount(queryUrl,queryObj).then(callback, callbError);
    }
    else if (settings.returnExecuteObject) {
        showLoading(false);
        return query.executeQueryJSON(queryUrl,queryObj);
    }
    else {
        query.executeQueryJSON(queryUrl,queryObj).then(callback, callbError);
    }

};

export const navigateToGoogle = (lat, long) => {
    window.open(`https://maps.google.com/maps?q=${lat},${long}`, '_blank');
}

export const zoomToFeatureDeafult = (feature, map, is3d) => {
    highlightFeature(feature, map, {
        layerName: "ZoomGraphicLayer",
        isZoom: true,
        zoomDuration: 1000
    });
}
export const groupBy = function (xs, key) {
    return xs.reduce((rv, x) => {
        (rv[x.attributes[key]] = rv[x.attributes[key]] || []).push(x);
        return rv;
    }, {});
};

export const DrawCirclePoints = (points, radius, center, pointIndex) => {
    let slice = 2 * Math.PI / points;
    //for (let i = 0; i < points; i++)
    //{
    let angle = slice * pointIndex;
    let newX = center.x + radius * Math.cos(angle);
    let newY = center.y + radius * Math.sin(angle);
    return { x: newX, y: newY }
    //}
}

export const clearChartFeatureLayers = (map) => {

    dashboardTabsTitle.forEach((item) => {

        let layer = map.findLayerById("barLayer_" + item.name);
        if (layer)
            map.remove(layer);
    })
}

export const isInitialExtent = (view) => {

    return view.camera.position.x == initialCameraPosition.position.x &&
        view.camera.position.y == initialCameraPosition.position.y &&
        view.camera.position.z == initialCameraPosition.position.z

}

//filterInfo { layerName : layer for get features , layerWhere : filter for layer }
//activeDashBoardFields : active categories 
export const draw3dBars = (map, mapServiceUrl, filterInfo, activeDashBoardFields) => {
    return loadDataAndDraw(map, mapServiceUrl, filterInfo, activeDashBoardFields, "3dBarChart")
}

export const drawPieChart = (map, mapServiceUrl, filterInfo, activeDashBoardFields) => {
    return loadDataAndDraw(map, mapServiceUrl, filterInfo, activeDashBoardFields, "pieChart")
}

export const loadDataAndDraw = (map, mapServiceUrl, filterInfo, activeDashBoardFields, type) => {
    return new Promise((resolve, reject) => {

        activeDashBoardFields = activeDashBoardFields || dashboardTabsTitle;
        let layerdId = getLayerId(map.__mapInfo, filterInfo.layerName);

        let geometryFeatures = [];

        let filterWhere = filterInfo.indicatorWhere;

        filterWhere += " and YEAR = '"+ window.__HijriYear +"'";

        //1- remove drawing layers
        clearChartFeatureLayers(map);
        showLoading(true);

        //2- get geometry features ( and get centriod for drawing )
        queryTask({
            url: mapServiceUrl + "/" + layerdId,
            outFields: layersSetting[filterInfo.layerName].outFields,
            where: filterInfo.layerWhere || "1=1",
            returnGeometry: true,
            callbackResult: ({ features }) => {
                if (features.length) {

                    highlightFeature(features, map, {
                        layerName: "ZoomGraphicLayer",
                        isZoom: features.length > 1 ? !isInitialExtent(map.view) : true,
                        isHighlighPolygonBorder: true,
                        isZoomMoreLevels: true,
                        isZoomToCenter: true
                    });

                    getFeatureDomainName(features, layerdId, false, mapServiceUrl).then((res) => {

                        geometryFeatures = res;

                        layerdId = getLayerId(map.__mapInfo, "INDICATORS");
                        //get indicators for features
                        queryTask({
                            url: mapServiceUrl + "/" + layerdId,
                            outFields: ['*'],
                            where: filterWhere || "1=1",
                            returnGeometry: true,
                            callbackResult: ({ features }) => {
                                let indicators_features = features;

                                if (indicators_features.length) {
                                    getFeatureDomainName(indicators_features,
                                        layerdId, false, mapServiceUrl).then((res) => {



                                            //3- add indicators fields to geomtry features

                                            geometryFeatures.forEach((g) => {
                                                let x = res.find((r) => { return r.attributes[filterInfo.indicatorMappingField] == g.attributes[filterInfo.mappingField] });
                                                if (x)
                                                    g.attributes = { ...x.attributes, ...g.attributes }
                                                else {
                                                    g.attributes["TREES"] = 0;
                                                }
                                            });


                                            if (type == "3dBarChart") {
                                                Initialize_3dBarChart(geometryFeatures, activeDashBoardFields, map);
                                                showLoading(false);
                                                resolve(true);
                                            } else if (type == "pieChart") {
                                                showLoading(false);
                                                resolve({ geometryFeatures: geometryFeatures, activeDashBoardFields: activeDashBoardFields });
                                            }

                                        });
                                }
                            }
                        })


                    })

                }
            }
        })

    });
}

export const Initialize_3dBarChart = (geometryFeatures, activeDashBoardFields, map) => {
    const fields = [
        new Field({
            name: "OBJECTID",
            alias: "OBJECTID",
            type: "oid"
        }), new Field({
            name: "A_GOVERNORATE_NAME",
            alias: "GOVERNORATE NAME",
            type: "string"
        }), new Field({
            name: "SECTOR_NO",
            alias: "SECTOR NO",
            type: "string"
        })
    ];

    activeDashBoardFields.forEach((barField) => {
        fields.push(new Field(barField))
    });

    //loop on fields and create featureLayer
    activeDashBoardFields.forEach((barField, index) => {

        let generated_geometryFeatures = esriLang.clone(geometryFeatures);
        generated_geometryFeatures = generated_geometryFeatures.map((item) => {
            return {
                "attributes": item.attributes, "geometry": item.geometry.centroid
            }
        });

        generated_geometryFeatures.forEach((item) => {
            let generated_Point = DrawCirclePoints(dashboardTabsTitle.length, 10000, item.geometry, barField.order);
            item.geometry.x = generated_Point.x;
            item.geometry.y = generated_Point.y;

        });

        //4- create feature layer for each active indicator

        var barLayer = new FeatureLayer({
            id: "barLayer_" + barField.name,
            source: generated_geometryFeatures,  // autocast as a Collection of new Graphic()
            objectIdField: "OBJECTID",
            outFields: ["OBJECTID",
                "A_GOVERNORATE_NAME", "SECTOR_NO", barField.name
            ],
            fields: fields,
            popupTemplate: {
                title: "{A_GOVERNORATE_NAME} - {SECTOR_NO}",
                content: "مساحة " + barField.alias + " : {" + barField.name + "} كم2",
                fieldInfos: [{
                    fieldName: barField.name,
                    format: {
                        digitSeparator: true,
                        places: 2
                    }
                }]
            }
        });


        const objectSymbol = {
            type: "point-3d", // autocasts as new PointSymbol3D()
            symbolLayers: [
                {
                    type: "object", // autocasts as new ObjectSymbol3DLayer()
                    width: 2500,
                    resource: {
                        primitive: "cylinder"
                    },
                    material: {
                        color: barField.color
                    }
                }
            ]
        };


        const objectSymbolRenderer = {
            type: "simple", // autocasts as new SimpleRenderer()
            symbol: objectSymbol,
            axis: "height",
            visualVariables: [
                {
                    type: "size",
                    //field: barField.name,
                    valueExpression: drawingCalculatedExp(barField.name, generated_geometryFeatures.length && generated_geometryFeatures[0].attributes.A_GOVERNORATE_NAME,
                        generated_geometryFeatures.length && generated_geometryFeatures[0].attributes.SECTOR_NO),
                    axis: "height",
                    //minSize: 1000,
                    //maxSize:1000,
                    //valueUnit:"kilometers"
                }, {
                    type: "size",
                    axis: "width-and-depth",
                    useSymbolValue: true // uses the width value defined in the symbol layer (50,000)
                }]
        };

        barLayer.renderer = objectSymbolRenderer;

        map.add(barLayer);

    });
}

export const zoomToFeatureByObjectId = (attributes, map, returnGeometryAndNotZoom, callback) => {

    if (attributes) {
        if (attributes.geometry) {

            if (!returnGeometryAndNotZoom) {
                highlightFeature(attributes, map, {
                    layerName: "ZoomGraphicLayer",
                    isZoom: true,
                    zoomDuration: 1000
                });
            }
            if (callback)
                callback(attributes)
        }
        else {

            let layerdId = getLayerId(map.__mapInfo, attributes.layerName);

            queryTask({
                url: mapUrl + "/" + layerdId,
                where: "OBJECTID = " + attributes.id || attributes.OBJECTID,
                outFields: ["OBJECTID"],
                returnGeometry: true,
                callbackResult: ({ features }) => {
                    if (!returnGeometryAndNotZoom) {
                        highlightFeature(features[0], map, {
                            layerName: "ZoomGraphicLayer",
                            isZoom: true,
                            zoomDuration: 1000
                        });
                    }
                    if (callback)
                        callback(features[0])
                },
                callbackError(error) { },
            });
        }
    }

}

export const getFromEsriRequest = function (url) {

    //store.dispatch({ type: 'Show_Loading_new', loading: true })

    var requestHandler = esriRequest(url,
        {
            responseType: "json"
        });

    return requestHandler.then(({ data }) => {
        //store.dispatch({ type: 'Show_Loading_new', loading: false })
        return data
    }, (error) => {
        //store.dispatch({ type: 'Show_Loading_new', loading: false })
        throw 'error'
    })

}
// let mapInfo

export const getMapInfo = function (url) {

    return new Promise((resolve, reject) => {

        let out = { layersSetting }
        var token = '';
        if (window.esriToken)
            token = '&token=' + window.esriToken;
        getFromEsriRequest(url + '?f=pjson' + token).then((mapInfo) => {

            out.info = {}
            out.info.mapInfo = mapInfo
            getFromEsriRequest(url + '/legend' + '?f=pjson' + token).then((legendInfo) => {
                out.info.$legends = legendInfo.layers
                getFromEsriRequest(url + '/layers' + '?f=pjson' + token).then((layerInfo) => {
                    out.info.$layers = layerInfo

                    out.info.$layers.layers = out.info.$layers.layers.map((layer, key) => {
                        if (out.layersSetting[layer.name] && out.layersSetting[layer.name].order)
                            layer.viewerOrder = out.layersSetting[layer.name].order
                        layer.alias = out.info.$layers.layers[key].name
                        return layer
                    })

                    let visibiles = []
                    
                    out.info.$legends = out.info.$legends.map((layer, key) => {
                        var findLayer = out.info.$layers.layers.find((x)=>x.id == layer.id)
                        layer.visible = findLayer.defaultVisibility
                        if (out.layersSetting[layer.name] && out.layersSetting[layer.name].order)
                            layer.viewerOrder = out.layersSetting[layer.name].order
                        // // 

                        if (layer.visible) {
                            visibiles.push(layer.id)
                        }

                        layer.isHidden = out.layersSetting[layer.name] && out.layersSetting[layer.name].isHidden
                        layer.alias = findLayer.name
                        return layer
                    })

                    out.mapVisibleLayerIDs = visibiles
                    mapInfo = out
                    resolve(out);
                })
            })
        })
    })
}

export const addPictureSymbol = function (point, icon, layerName, map,width,height) {
    var symbol = new PictureMarkerSymbol({
        url: icon,
        "height": height || 48,
        "width": width || 48,
        "yoffset": (height || 48) / 2 - 2

    });
    var graphic = new Graphic({
        'geometry': point,
        'symbol': symbol
    });

    map.findLayerById(layerName || "identifyGraphicLayer").removeAll();
    map.findLayerById(layerName || "identifyGraphicLayer").add(graphic);
}
export const highlightFeature = function (features, map, settings) {

    var symbol;
    let fillColor = settings.fillColor || [0, 0, 0, 0.3];
    let strokeColor = settings.strokeColor || "black";
    let highlighColor = settings.highlighColor || [0, 255, 255, 0.3];

    let graphicLayer = map.findLayerById(settings.layerName);

    if (!settings.noclear) graphicLayer.removeAll();

    features = features.length ? features : [features]

    features.forEach((feature) => {

        if (feature.type === "point" || feature.geometry.type === "point") {
            if (settings.isHiglightSymbol) {
                strokeColor = highlighColor;
                fillColor = settings.fillColor || highlighColor;
            }
            symbol = new SimpleMarkerSymbol({
                style: "circle",
                color: settings.isHiglightSymbol ? highlighColor : fillColor,
                size: "20px",  // pixels
                outline: {
                    color: "black",
                    width: 1  // points
                }
            });

        }
        else if (feature.type === 'polyline' || feature.geometry.type === 'polyline' || feature.geometry.paths) {

            symbol = new SimpleLineSymbol({
                color: settings.isHiglightSymbol ? highlighColor : fillColor,
                width: "10px",
                style: "solid"
            });
        }
        else {
            symbol = GetSymbol(
                settings,
                settings.fillColor || fillColor,
                strokeColor
            );
        }

        if (!settings.isZoomOnly) {

            var graphic = new Graphic({
                'geometry': feature.geometry || feature,
                'symbol': symbol,
                'attributes': settings.attr
            });

            graphicLayer.add(graphic);
        }
    });

    if (!settings.listOfFeatures && settings.isZoom) {

        var fullExtent = null;
        for (var i = 0; i < features.length; i++) {
            if (features[i].geometry && features[i].geometry.extent) {
                if (!fullExtent)
                    fullExtent = features[i].geometry.extent.clone();
                else
                    fullExtent.union(features[i].geometry.extent)
            }
        }


        if (fullExtent) {

            if (map.view.type == "3d") {

                if (settings.isZoomToCenter && features.length == 1) {
                    map.view.goTo({
                        target: features[0].geometry.centroid,
                        zoom: settings.zoomLevel || 9
                    }, { duration: 1000 })
                }
                else {
                    map.view.goTo({
                        target: features,
                        heading: 0,
                        tilt: is3dZoomEnabled ? 45 : 0
                    }).then(() => {
                        if (settings.isZoomMoreLevels) {
                            map.view.goTo({
                                zoom: map.view.zoom + 1.5
                            })
                        }
                    });
                }
            }
            else {
                var cloneExt = fullExtent.clone();

                map.view.goTo({
                    target: features,
                    extent: (settings.notExpandLevel) ? cloneExt : cloneExt.expand(2)
                },
                    {
                        duration: settings.zoomDuration || 0 // Duration of animation will be 1 seconds
                    })
            }

        }
        else {
            map.view.goTo({
                target: features,
                zoom: 16
            },
                {
                    duration: settings.zoomDuration || 0 // Duration of animation will be 1 seconds
                })
        }

    }

}

const GetSymbol = function (settings, fillColor, strokeColor) {

    let symbol;
    let highlightWidth = settings.highlightWidth || 2;
    let highlighColor = settings.highlighColor || [0, 255, 255, 0.3];

    let symbolOption = {
        style: "solid",
        color: fillColor,
        outline: {  // autocasts as new SimpleLineSymbol()
            color: strokeColor,
            width: highlightWidth + "px"
        }
    };

    if (settings.isHiglightSymbol) {
        symbolOption = {
            style: "solid",
            color: highlighColor,
            outline: {  // autocasts as new SimpleLineSymbol()
                color: highlighColor,
                width: highlightWidth + "px"
            }
        };
        symbol = new SimpleFillSymbol(symbolOption);
    }
    else if (settings.isDashStyle) {

        symbolOption = {
            style: "forward-diagonal",
            color: strokeColor,
            outline: {  // autocasts as new SimpleLineSymbol()
                color: strokeColor,
                width: highlightWidth + "px"
            }
        };
        symbol = new SimpleFillSymbol(symbolOption);
    }
    else if (settings.isHighlighPolygonBorder) {

        symbolOption = {
            style: "none",
            color: highlighColor,
            outline: {  // autocasts as new SimpleLineSymbol()
                color: strokeColor,
                width: highlightWidth + "px"
            }
        };
        symbol = new SimpleFillSymbol(symbolOption);
    }
    else {

        symbolOption = {
            style: "solid",
            color: highlighColor,
            outline: {  // autocasts as new SimpleLineSymbol()
                color: strokeColor,
                width: highlightWidth + "px"
            }
        };
        symbol = new SimpleFillSymbol(symbolOption);
    }

    return symbol;
};


// maping field with domain
export const getFeatureDomainName = function (features, layerId, notReturnCode, domainMapUrl) {

    return getDomain(layerId, {}, domainMapUrl).then(function (data) {

        var codedValue = {}
        features.forEach(function (feature) {
            Object.keys(feature.attributes).forEach(function (attr) {
                let result = data.find(d => d.name == attr);
                if (result && result.domain) {
                    codedValue = result.domain.codedValues.find(d => d.code ==
                        feature.attributes[attr]);
                    if (!codedValue) {
                        if (!isNaN(feature.attributes[attr])) {
                            codedValue = result.domain.codedValues.find(d => d.code == +feature.attributes[attr])
                        }
                    }
                    if (codedValue && codedValue.name) {
                        if (!notReturnCode)
                            feature.attributes[attr + '_Code'] = feature.attributes[attr]
                        feature.attributes[attr] = codedValue.name
                    }
                }
            })
        })
        return features;
    }, function (error) {
        return
    })
}

let mapViewerTempObj = {};

const getDomain = function (layerId, settings, domainMapUrl) {
    return new Promise((resolve, reject) => {
        let serv = mapViewerTempObj
        let loadings = []
        var returnedDomain

        if (serv.Domains && serv.Domains[layerId]) {
            const domain = serv.Domains[layerId]
            if (!settings.fieldName && !settings.code) {
                domain.fields.forEach(function (val) {
                    if (!val.domain) {
                        settings.fieldName = val.name
                        settings.isSubType = true
                        if (domain.types) {
                            returnedDomain = getSubTypes(domain, settings)

                            if (returnedDomain) {
                                if (settings.isfilterOpened)
                                    val.domain = returnedDomain
                                else
                                    val.domain = { codedValues: returnedDomain }
                            }
                            else
                                val.domain = null
                        }
                    }
                })
                returnedDomain = domain.fields
            } else if (settings.isSubType && settings.fieldName) {
                returnedDomain = getSubTypes(domain, settings)
            } else {
                domain.fields.forEach(function (field) {
                    if (field.name == settings.fieldName && field.domain) {
                        returnedDomain = field.domain.codedValues
                    }
                })
            }
        }

        if (returnedDomain) {
            resolve(returnedDomain)
            return
        } else {
            var url = (domainMapUrl || mapUrl) + '/' + layerId;
            let token = "";
            if (window.esriToken) {
                token = "&token=" + window.esriToken;
            }
            if (loadings.indexOf(url) == -1) {
                loadings.push(url)
                getFromEsriRequest(url + '?f=pjson' + token).then((res) => {

                    serv.Domains = serv.Domains || []
                    mapViewerTempObj.Domains[layerId] = {
                        fields: res.fields,
                        types: res.types
                    }
                    loadings.pop(url)
                    getDomain(layerId, settings, domainMapUrl).then((data) => {
                        resolve(data)
                        return
                    }, function () { })
                }, function () {
                    loadings.pop(url)
                })
            } else {
                return reject()
            }
        }
    })
}

const getSubTypes = function (domain, settings) {
    var returnedDomain = []
    if (domain.types) {
        domain.types.forEach(function (subType) {
            if (settings.isSubType && !settings.code) {
                if (!returnedDomain)
                    returnedDomain = []

                if (subType.domains[settings.fieldName]) {
                    if (settings.isfilterOpened)
                        returnedDomain.push({ id: subType.id, name: subType.name, isSubType: true })
                    else
                        returnedDomain.push.apply(returnedDomain, subType.domains[settings.fieldName].codedValues)
                }
            } else {
                if (subType.id == settings.code && subType.domains[settings.fieldName]) {
                    returnedDomain = subType.domains[settings.fieldName].codedValues
                }
            }
        })
    }

    return returnedDomain.length == 0
        ? null
        : returnedDomain
}

export const makeIdentify = function (mapView, mapPoint, layerIds, tolerance, layerOption) {

    // Set the parameters for the identify
    let params = new IdentifyParameters();
    params.tolerance = tolerance || 3;
    params.layerIds = layerIds || [];
    params.sublayers = [{ id: layerIds[0] }]; //added line for fix esri layerIds bug
    params.layerOption = layerOption || "visible"; //"top"|"visible"|"all"
    params.width = mapView.width;
    params.height = mapView.height;
    params.geometry = mapPoint;
    params.mapExtent = mapView.extent;

    return identify.identify(mapUrl, params);
}

export const getLayerId = function (mapInfo, layerName) {
    let findLayer = mapInfo.info.$layers.layers.find(x => x.name == layerName);
    if (!findLayer) {
        findLayer = mapInfo.info.$layers.tables.find(x => x.name == layerName);
    }
    return findLayer.id;
}


export const showLoading = function (showLoading) {

    window.__showLoadingItems = window.__showLoadingItems || [];

    if (showLoading)
        window.__showLoadingItems.push(showLoading);
    else
        window.__showLoadingItems.pop();

    if (window.__showLoadingItems.length == 0 || (window.__showLoadingItems.length == 1 && window.__showLoadingItems[0])) {
        const customEvent = new CustomEvent('showLoading', { detail: showLoading });
        document.dispatchEvent(customEvent);
    }

}
