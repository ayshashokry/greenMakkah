/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.24/esri/copyright.txt for details.
*/
import e from "../config.js";
import {
    id as t
} from "../kernel.js";
import i from "../request.js";
import r from "../core/Error.js";
import {
    JSONMap as a
} from "../core/jsonMap.js";
import {
    isSome as n
} from "../core/maybe.js";
import {
    createScreenPoint as s,
    pt2px as o,
    px2pt as l
} from "../core/screenUtils.js";
import {
    normalize as c,
    dataComponents as y
} from "../core/urlUtils.js";
import u from "../geometry/Polygon.js";
import {
    collectLabelingFields as m
} from "../layers/support/fieldUtils.js";
import {
    getFloorFilterClause as f
} from "../layers/support/floorFilterUtils.js";
import {
    getSizeRangeAtScale as p
} from "../renderers/visualVariables/support/visualVariableUtils.js";
import {
    execute as d
} from "./geoprocessor/execute.js";
import {
    submitJob as g
} from "./geoprocessor/submitJob.js";
import {
    toJSON as b
} from "./support/fileFormat.js";
import {
    toJSON as h
} from "./support/layoutTemplate.js";
import {
    getVisibleLayerViews as w,
    isScreenshotRequired as S,
    isBingMapsLayer as x,
    isCSVLayer as v,
    isBlendLayer as D,
    applyVisualVariables as I,
    getContextBoundingBox as L,
    createPolygonLayer as T,
    createPolylineLayer as E,
    createPointLayer as M,
    createMultipointLayer as O
} from "./support/printTaskUtils.js";
import V from "./support/PrintTemplate.js";
import {
    supportsApiKey as P
} from "../support/apiKeyUtils.js";
const F = {
    Feet: "ft",
    Kilometers: "km",
    Meters: "m",
    Miles: "mi"
},
    R = new a({
        esriFeet: "Feet",
        esriKilometers: "Kilometers",
        esriMeters: "Meters",
        esriMiles: "Miles"
    }),
    N = new a({
        esriExecutionTypeSynchronous: "sync",
        esriExecutionTypeAsynchronous: "async"
    }),
    U = new Map;
async function j(e, t, r) {
    const a = C(e);
    let n = U.get(a);
    return Promise.resolve().then((() => n ? {
        data: n.gpMetadata
    } : (n = {
        gpServerUrl: a,
        is11xService: !1,
        legendLayerNameMap: {},
        legendLayers: []
    }, i(a, {
        query: {
            f: "json"
        }
    })))).then((e => (n.gpMetadata = e.data, n.cimVersion = n.gpMetadata.cimVersion, n.is11xService = !!n.cimVersion, U.set(a, n), A(t, n)))).then((i => {
        const a = me(n);
        let s;
        const o = e => "sync" === a ? e.results && e.results[0] && e.results[0].value : s.fetchResultData("Output_File", null, r).then((e => e.value));
        return "async" === a ? g(e, i, null, r).then((e => (s = e, e.waitForJobCompletion({
            interval: t.updateDelay
        }).then(o)))) : d(e, i, null, r).then(o)
    }))
}
async function J(e) {
    const t = C(e);
    return me(U.get(t))
}
async function A(e, t) {
    t = t || {
        is11xService: !1,
        legendLayerNameMap: {},
        legendLayers: []
    };
    const i = e.template || new V;
    null == i.showLabels && (i.showLabels = !0);
    const a = i.exportOptions;
    let n;
    const s = h(i.layout);
    if (a) {
        if (n = {
            dpi: a.dpi
        }, "map_only" === s.toLowerCase() || "" === s) {
            const e = a.width,
                t = a.height;
            n.outputSize = [e, t]
        }
    }
    const o = i.layoutOptions;
    let l;
    if (o) {
        let e, t;
        "Miles" === o.scalebarUnit || "Kilometers" === o.scalebarUnit ? (e = "Kilometers", t = "Miles") : "Meters" !== o.scalebarUnit && "Feet" !== o.scalebarUnit || (e = "Meters", t = "Feet"), l = {
            titleText: o.titleText,
            authorText: o.authorText,
            copyrightText: o.copyrightText,
            customTextElements: o.customTextElements,
            elementOverrides: o.elementOverrides,
            scaleBarOptions: {
                metricUnit: R.toJSON(e),
                metricLabel: F[e],
                nonMetricUnit: R.toJSON(t),
                nonMetricLabel: F[t]
            }
        }
    }
    let c = null;
    o?.legendLayers && (c = o.legendLayers.map((e => {
        t.legendLayerNameMap[e.layerId] = e.title;
        const i = {
            id: e.layerId
        };
        return e.subLayerIds && (i.subLayerIds = e.subLayerIds), i
    })));
    const y = await k(e, i, t);
    if (y.operationalLayers) {
        const e = new RegExp("[\\u4E00-\\u9FFF\\u0E00-\\u0E7F\\u0900-\\u097F\\u3040-\\u309F\\u30A0-\\u30FF\\u31F0-\\u31FF]"),
            i = /[\u0600-\u06FF]/,
            a = t => {
                const r = t.text,
                    a = t.font,
                    n = a && a.family && a.family.toLowerCase();
                r && a && ("arial" === n || "arial unicode ms" === n) && (a.family = e.test(r) ? "Arial Unicode MS" : "Arial", "normal" !== a.style && i.test(r) && (a.family = "Arial Unicode MS"))
            },
            n = () => {
                throw new r("print:cim-symbol-unsupported", "CIMSymbol is not supported by a print service published from ArcMap")
            };
        y.operationalLayers.forEach((e => {
            e.featureCollection?.layers ? e.featureCollection.layers.forEach((e => {
                if (e.layerDefinition?.drawingInfo?.renderer?.symbol) {
                    const i = e.layerDefinition.drawingInfo.renderer;
                    "esriTS" === i.symbol.type ? a(i.symbol) : "CIMSymbolReference" !== i.symbol.type || t.is11xService || n()
                }
                e.featureSet?.features && e.featureSet.features.forEach((e => {
                    e.symbol && ("esriTS" === e.symbol.type ? a(e.symbol) : "CIMSymbolReference" !== e.symbol.type || t.is11xService || n())
                }))
            })) : !t.is11xService && e.layerDefinition?.drawingInfo?.renderer && JSON.stringify(e.layerDefinition.drawingInfo.renderer).includes('"type":"CIMSymbolReference"') && n()
        }))
    }
    e.outSpatialReference && (y.mapOptions.spatialReference = e.outSpatialReference.toJSON()), Object.assign(y, {
        exportOptions: n,
        layoutOptions: l || {}
    }), Object.assign(y.layoutOptions, {
        legendOptions: {
            operationalLayers: null != c ? c : t.legendLayers.slice()
        }
    }), t.legendLayers.length = 0, U.set(t.gpServerUrl, t);
    const u = {
        Web_Map_as_JSON: JSON.stringify(y),
        Format: b(i.format),
        Layout_Template: s
    };
    return e.extraParameters && Object.assign(u, e.extraParameters), u
}
async function k(e, t, i) {
    const r = e.view;
    let a = r.spatialReference;
    const s = {
        operationalLayers: await z(r, t, i)
    };
    let o = i.ssExtent || e.extent || r.extent;
    if (a && a.isWrappable && (o = o.clone()._normalize(!0), a = o.spatialReference), s.mapOptions = {
        extent: o && o.toJSON(),
        spatialReference: a && a.toJSON(),
        showAttribution: t.attributionVisible
    }, i.ssExtent = null, r.background && (s.background = r.background.toJSON()), r.rotation && (s.mapOptions.rotation = -r.rotation), t.scalePreserved && (s.mapOptions.scale = t.outScale || r.scale), n(r.timeExtent)) {
        const e = n(r.timeExtent.start) ? r.timeExtent.start.getTime() : null,
            t = n(r.timeExtent.end) ? r.timeExtent.end.getTime() : null;
        s.mapOptions.time = [e, t]
    }
    return s
}

function C(e) {
    let t = e;
    const i = t.lastIndexOf("/GPServer/");
    return i > 0 && (t = t.slice(0, i + 9)), t
}
async function z(e, t, i) {
    const r = [],
        a = {
            layerView: null,
            printTemplate: t,
            view: e
        };
    let n = 0;
    t.scalePreserved && (n = t.outScale || e.scale);
    const s = w(e, n);
    for (const o of s) {
        const e = o.layer;
        if (!e.loaded || "group" === e?.type) continue;
        let t;
        a.layerView = o, t = S(o) ? await ee(e, a, i) : x(e) ? $(e) : v(e) ? await K(e, a, i) : "feature" === e?.type ? await q(e, a, i) : "geojson" === e?.type ? await W(e, a, i) : "graphics" === e?.type ? await B(e, a, i) : "imagery" === e?.type ? G(e, i) : "imagery-tile" === e?.type ? await Q(e, a, i) : "kml" === e?.type ? await H(e, a, i) : "map-image" === e?.type ? X(e, a, i) : "map-notes" === e?.type ? await Y(a, i) : "open-street-map" === e?.type ? Z() : "stream" === e?.type ? await te(e, a, i) : "tile" === e?.type ? ie(e, i) : "vector-tile" === e?.type ? await re(e, a, i) : "web-tile" === e?.type ? ae(e) : "wms" === e?.type ? ne(e) : "wmts" === e?.type ? se(e) : await ee(e, a, i), t && (Array.isArray(t) ? r.push(...t) : (t.id = e.id, t.title = i.legendLayerNameMap[e.id] || e.title, t.opacity = e.opacity, t.minScale = e.minScale || 0, t.maxScale = e.maxScale || 0, D(e) && e.blendMode && "normal" !== e.blendMode && (t.blendMode = e.blendMode), r.push(t)))
    }
    if (n && r.forEach((e => {
        e.minScale = 0, e.maxScale = 0
    })), e.graphics && e.graphics.length) {
        const a = await _(null, e.graphics, t, i);
        a && r.push(a)
    }
    return r
}

function $(e) {
    return {
        culture: e.culture,
        key: e.key,
        type: "BingMaps" + ("aerial" === e.style ? "Aerial" : "hybrid" === e.style ? "Hybrid" : "Road")
    }
}
async function K(e, t, i) {
    e.legendEnabled && i.legendLayers.push({
        id: e.id
    });
    const r = t.layerView,
        a = t.printTemplate;
    let n;
    if (!i.is11xService || r.filter) {
        return _(e, await ue(r), a, i)
    }
    return n = {
        type: "CSV"
    }, e.write(n, {
        origin: "web-map"
    }), delete n.popupInfo, delete n.layerType, n.showLabels = a.showLabels && e.labelsVisible, n
}
async function _(e, t, i, r) {
    let a;
    const n = T(),
        s = E(),
        o = M(),
        l = O(),
        c = M();
    if (c.layerDefinition.name = "textLayer", delete c.layerDefinition.drawingInfo, e) {
        if ("esri.layers.FeatureLayer" === e.declaredClass || "esri.layers.StreamLayer" === e.declaredClass ? n.layerDefinition.name = s.layerDefinition.name = o.layerDefinition.name = l.layerDefinition.name = r.legendLayerNameMap[e.id] || e.get("arcgisProps.title") || e.title : "esri.layers.GraphicsLayer" === e.declaredClass && (t = e.graphics.items), e.renderer) {
            const t = e.renderer.toJSON();
            n.layerDefinition.drawingInfo.renderer = t, s.layerDefinition.drawingInfo.renderer = t, o.layerDefinition.drawingInfo.renderer = t, l.layerDefinition.drawingInfo.renderer = t
        }
        if (i.showLabels && e.labelsVisible && "function" == typeof e.write) {
            const t = e.write({}, {
                origin: "web-map"
            }).layerDefinition?.drawingInfo?.labelingInfo;
            t && (a = !0, n.layerDefinition.drawingInfo.labelingInfo = t, s.layerDefinition.drawingInfo.labelingInfo = t, o.layerDefinition.drawingInfo.labelingInfo = t, l.layerDefinition.drawingInfo.labelingInfo = t)
        }
    }
    let y;
    e?.renderer || a || (delete n.layerDefinition.drawingInfo, delete s.layerDefinition.drawingInfo, delete o.layerDefinition.drawingInfo, delete l.layerDefinition.drawingInfo);
    const f = e?.fieldsIndex,
        p = e?.renderer;
    if (f) {
        const t = new Set;
        a && await m(t, e), p && "function" == typeof p.collectRequiredFields && await p.collectRequiredFields(t, f), y = Array.from(t);
        const i = f.fields.map((e => e.toJSON()));
        n.layerDefinition.fields = i, s.layerDefinition.fields = i, o.layerDefinition.fields = i, l.layerDefinition.fields = i
    }
    const d = t && t.length;
    let g;
    for (let m = 0; m < d; m++) {
        const a = t[m] || t.getItemAt(m);
        if (!1 === a.visible || !a.geometry) continue;
        if (g = a.toJSON(), g.hasOwnProperty("popupTemplate") && delete g.popupTemplate, g.geometry && g.geometry.z && delete g.geometry.z, g.symbol && g.symbol.outline && "esriCLS" === g.symbol.outline.type && !r.is11xService) continue;
        !r.is11xService && g.symbol && g.symbol.outline && g.symbol.outline.color && g.symbol.outline.color[3] && (g.symbol.outline.color[3] = 255);
        const f = e && e.renderer && ("valueExpression" in e.renderer && e.renderer.valueExpression || "hasVisualVariables" in e.renderer && e.renderer.hasVisualVariables());
        if (!g.symbol && e && e.renderer && f && !r.is11xService) {
            const t = e.renderer,
                i = await t.getSymbolAsync(a);
            if (!i) continue;
            g.symbol = i.toJSON(), "hasVisualVariables" in t && t.hasVisualVariables() && I(g.symbol, {
                renderer: t,
                graphic: a,
                symbol: i
            })
        }
        if (g.symbol && (g.symbol.angle || delete g.symbol.angle, fe(g.symbol) ? g.symbol = await ce(g.symbol, r) : g.symbol.text && delete g.attributes), (!i || !i.forceFeatureAttributes) && y?.length) {
            const e = {};
            y.forEach((t => {
                g.attributes && g.attributes.hasOwnProperty(t) && (e[t] = g.attributes[t])
            })), g.attributes = e
        }
        "polygon" === a.geometry.type ? n.featureSet.features.push(g) : "polyline" === a.geometry.type ? s.featureSet.features.push(g) : "point" === a.geometry.type ? g.symbol && g.symbol.text ? c.featureSet.features.push(g) : o.featureSet.features.push(g) : "multipoint" === a.geometry.type ? l.featureSet.features.push(g) : "extent" === a.geometry.type && (g.geometry = u.fromExtent(a.geometry).toJSON(), n.featureSet.features.push(g))
    }
    const b = [n, s, l, o, c].filter((e => e.featureSet.features.length > 0));
    for (const u of b) {
        const e = u.featureSet.features.every((e => e.symbol));
        !e || i && i.forceFeatureAttributes || u.featureSet.features.forEach((e => {
            delete e.attributes
        })), e && delete u.layerDefinition.drawingInfo, u.layerDefinition.drawingInfo && u.layerDefinition.drawingInfo.renderer && await ye(u.layerDefinition.drawingInfo.renderer, r)
    }
    return b.length ? {
        featureCollection: {
            layers: b
        },
        showLabels: a
    } : null
}
async function q(e, t, i) {
    let r;
    const a = e.renderer,
        n = parseFloat(i.cimVersion);
    if ("binning" === e.featureReduction?.type || "cluster" === e.featureReduction?.type && (!i.is11xService || n < 2.9) || "pie-chart" === a?.type || "dot-density" === a?.type && (!i.is11xService || n < 2.6)) return ee(e, t, i);
    e.legendEnabled && i.legendLayers.push({
        id: e.id
    });
    const s = t.layerView,
        {
            printTemplate: o,
            view: l
        } = t,
        c = a && ("valueExpression" in a && a.valueExpression || "hasVisualVariables" in a && a.hasVisualVariables()),
        y = "feature-layer" !== e.source?.type && "ogc-feature" !== e.source?.type;
    if (!i.is11xService && c || s.filter || y || !a || "field" in a && null != a.field && ("string" != typeof a.field || !e.getField(a.field))) {
        const t = await ue(s);
        r = await _(e, t, o, i)
    } else {
        if (r = {
            id: (u = e.write()).id,
            title: u.title,
            opacity: u.opacity,
            minScale: u.minScale,
            maxScale: u.maxScale,
            url: u.url,
            layerType: u.layerType,
            customParameters: u.customParameters,
            layerDefinition: u.layerDefinition
        }, r.showLabels = o.showLabels && e.labelsVisible, oe(r, e), r.layerDefinition?.drawingInfo?.renderer && (delete r.layerDefinition.minScale, delete r.layerDefinition.maxScale, await ye(r.layerDefinition.drawingInfo.renderer, i), "visualVariables" in a && a.visualVariables && a.visualVariables[0])) {
            const e = a.visualVariables[0];
            if ("size" === e.type && e.maxSize && "number" != typeof e.maxSize && e.minSize && "number" != typeof e.minSize) {
                const t = p(e, l.scale);
                r.layerDefinition.drawingInfo.renderer.visualVariables[0].minSize = t.minSize, r.layerDefinition.drawingInfo.renderer.visualVariables[0].maxSize = t.maxSize
            }
        }
        const t = f(s);
        t && (r.layerDefinition || (r.layerDefinition = {}), r.layerDefinition.definitionExpression = r.layerDefinition.definitionExpression ? `(${r.layerDefinition.definitionExpression}) AND (${t})` : t)
    }
    var u;
    return r
}
async function W(e, {
    layerView: t,
    printTemplate: i
}, r) {
    e.legendEnabled && r.legendLayers.push({
        id: e.id
    });
    return _(e, await ue(t), i, r)
}
async function B(e, {
    printTemplate: t
}, i) {
    return _(e, null, t, i)
}

function G(e, t) {
    e.legendEnabled && t.legendLayers.push({
        id: e.id
    });
    const i = {
        layerType: (r = e.write()).layerType,
        customParameters: r.customParameters
    };
    var r;
    if (i.bandIds = e.bandIds, i.compressionQuality = e.compressionQuality, i.format = e.format, i.interpolation = e.interpolation, (e.mosaicRule || e.definitionExpression) && (i.mosaicRule = e.exportImageServiceParameters.mosaicRule.toJSON()), e.renderingRule || e.renderer)
        if (t.is11xService) e.renderingRule && (i.renderingRule = e.renderingRule.toJSON()), e.renderer && (i.layerDefinition = i.layerDefinition || {}, i.layerDefinition.drawingInfo = i.layerDefinition.drawingInfo || {}, i.layerDefinition.drawingInfo.renderer = e.renderer.toJSON());
        else {
            const t = e.exportImageServiceParameters.combineRendererWithRenderingRule();
            t && (i.renderingRule = t.toJSON())
        } return oe(i, e), i
}
async function Q(e, t, i) {
    if ("flow" === e.renderer?.type) return ee(e, t, i);
    e.legendEnabled && i.legendLayers.push({
        id: e.id
    });
    const r = {
        bandIds: (a = e.write() || {}).bandIds,
        customParameters: a.customParameters,
        interpolation: a.interpolation,
        layerDefinition: a.layerDefinition
    };
    var a;
    return r.layerType = "ArcGISImageServiceLayer", oe(r, e), r
}
async function H(e, t, i) {
    const r = t.printTemplate;
    if (i.is11xService) {
        const t = {
            type: "kml"
        };
        return e.write(t, {
            origin: "web-map"
        }), delete t.layerType, t.url = c(e.url), t
    } {
        const a = [],
            n = t.layerView;
        n.allVisibleMapImages.forEach(((t, i) => {
            const r = {
                id: `${e.id}_image${i}`,
                type: "image",
                title: e.id,
                minScale: e.minScale || 0,
                maxScale: e.maxScale || 0,
                opacity: e.opacity,
                extent: t.extent
            };
            "data:image/png;base64," === t.href.substr(0, 22) ? r.imageData = t.href.substr(22) : r.url = t.href, a.push(r)
        }));
        const s = [...n.allVisiblePoints.items, ...n.allVisiblePolylines.items, ...n.allVisiblePolygons.items],
            o = {
                id: e.id,
                ...await _(null, s, r, i)
            };
        return a.push(o), a
    }
}

function X(e, {
    view: t
}, i) {
    let r;
    const a = {
        id: e.id,
        subLayerIds: []
    };
    let n = [];
    const s = t.scale,
        o = e => {
            const t = 0 === s,
                i = 0 === e.minScale || s <= e.minScale,
                r = 0 === e.maxScale || s >= e.maxScale;
            if (e.visible && (t || i && r))
                if (e.sublayers) e.sublayers.forEach(o);
                else {
                    const t = e.toExportImageJSON(),
                        i = {
                            id: e.id,
                            name: window.__layerSetting[e.title] ? window.__layerSetting[e.title].name : e.title,
                            layerDefinition: {
                                drawingInfo: t.drawingInfo,
                                definitionExpression: t.definitionExpression,
                                source: t.source
                            }
                        };
                    n.unshift(i), a.subLayerIds.push(e.id)
                }
        };
    var l;
    return e.sublayers && e.sublayers.forEach(o), n.length && (n = n.map((({
        id: e,
        name: t,
        layerDefinition: i
    }) => ({
        id: e,
        name: t,
        layerDefinition: i
    }))), r = {
        layerType: (l = e.write()).layerType,
        customParameters: l.customParameters
    }, r.layers = n, r.visibleLayers = e.capabilities.exportMap.supportsDynamicLayers ? void 0 : a.subLayerIds, oe(r, e), e.legendEnabled && i.legendLayers.push(a)), r
}
async function Y({
    layerView: e,
    printTemplate: t
}, i) {
    const r = [],
        a = e.layer;
    if (n(a.featureCollections))
        for (const n of a.featureCollections) {
            const e = await _(n, n.source, t, i);
            e && r.push(...e.featureCollection.layers)
        } else if (n(a.sublayers))
        for (const n of a.sublayers) {
            const e = await _(null, n.graphics, t, i);
            e && r.push(...e.featureCollection.layers)
        }
    return {
        featureCollection: {
            layers: r
        }
    }
}

function Z() {
    return {
        type: "OpenStreetMap"
    }
}
async function ee(e, {
    printTemplate: t,
    view: i
}, r) {
    const a = {
        type: "image"
    },
        n = {
            format: "png",
            ignoreBackground: !0,
            layers: [e],
            rotation: 0
        },
        o = r.ssExtent || i.extent.clone();
    let l = 96,
        c = !0,
        u = !0;
    if (t.exportOptions) {
        const e = t.exportOptions;
        e.dpi > 0 && (l = e.dpi), e.width > 0 && (c = e.width % 2 == i.width % 2), e.height > 0 && (u = e.height % 2 == i.height % 2)
    }
    if ("map-only" === t.layout && t.scalePreserved && (!t.outScale || t.outScale === i.scale) && 96 === l && (!c || !u) && (n.area = {
        x: 0,
        y: 0,
        width: i.width,
        height: i.height
    }, c || (n.area.width -= 1), u || (n.area.height -= 1), !r.ssExtent)) {
        const e = i.toMap(s(n.area.width, n.area.height));
        o.ymin = e.y, o.xmax = e.x, r.ssExtent = o
    }
    a.extent = o.clone()._normalize(!0).toJSON();
    const m = await i.takeScreenshot(n),
        {
            data: f
        } = y(m.dataUrl);
    return a.imageData = f, a
}
async function te(e, {
    layerView: t,
    printTemplate: i
}, r) {
    e.legendEnabled && r.legendLayers.push({
        id: e.id
    });
    return _(e, await ue(t), i, r)
}

function ie(e, t) {
    e.legendEnabled && t.legendLayers.push({
        id: e.id
    });
    const i = {
        layerType: (r = e.write()).layerType,
        customParameters: r.customParameters
    };
    var r;
    return oe(i, e), i
}
async function re(e, t, i) {
    if (i.is11xService && e.serviceUrl && e.styleUrl) {
        const t = le(e.styleUrl, e.apiKey),
            r = le(e.serviceUrl, e.apiKey);
        if (!t && !r || "2.1.0" !== i.cimVersion) {
            const i = {
                type: "VectorTileLayer"
            };
            return i.styleUrl = c(e.styleUrl), i.token = t, r !== t && (i.additionalTokens = [{
                url: e.serviceUrl,
                token: r
            }]), i
        }
    }
    return ee(e, t, i)
}

function ae(e) {
    const t = {
        type: "WebTiledLayer",
        urlTemplate: e.urlTemplate.replace(/\${/g, "{"),
        credits: e.copyright
    };
    return e.subDomains && e.subDomains.length > 0 && (t.subDomains = e.subDomains), t
}

function ne(e) {
    let t;
    const i = [],
        r = e => {
            e.visible && (e.sublayers ? e.sublayers.forEach(r) : e.name && i.unshift(e.name))
        };
    return e.sublayers && e.sublayers.forEach(r), i.length && (t = {
        type: "wms",
        customLayerParameters: e.customLayerParameters,
        customParameters: e.customParameters,
        transparentBackground: e.imageTransparency,
        visibleLayers: i,
        url: c(e.url),
        version: e.version
    }), t
}

function se(e) {
    const t = e.activeLayer;
    return {
        type: "wmts",
        customLayerParameters: e.customLayerParameters,
        customParameters: e.customParameters,
        format: t.imageFormat,
        layer: t.id,
        style: t.styleId,
        tileMatrixSet: t.tileMatrixSetId,
        url: c(e.url)
    }
}

function oe(e, t) {
    t.url && (e.url = c(e.url || t.url), e.token = le(e.url, t.apiKey))
}

function le(i, r) {
    try {
        return P(i) && (r || e.apiKey) ? r || e.apiKey : t?.findCredential(i)?.token
    } catch (error) {
        return null;
    }

}
async function ce(e, t) {
    t.canvas || (t.canvas = document.createElement("canvas"));
    const r = 1024;
    t.canvas.width = r, t.canvas.height = r;
    const a = t.canvas.getContext("2d");
    let n, s;
    if (e.path) {
        const t = new Path2D(e.path);
        t.closePath(), a.fillStyle = Array.isArray(e.color) ? `rgba(${e.color[0]},${e.color[1]},${e.color[2]},${e.color[3] / 255})` : "rgb(0,0,0)", a.fill(t);
        const i = L(a);
        if (!i) return null;
        a.clearRect(0, 0, r, r);
        const l = o(e.size) / Math.max(i.width, i.height);
        a.scale(l, l);
        const c = r / l,
            y = c / 2 - i.width / 2 - i.x,
            u = c / 2 - i.height / 2 - i.y;
        if (a.translate(y, u), Array.isArray(e.color) && a.fill(t), e.outline?.width && Array.isArray(e.outline.color)) {
            const r = e.outline;
            a.lineWidth = o(r.width) / l, a.lineJoin = "round", a.strokeStyle = `rgba(${r.color[0]},${r.color[1]},${r.color[2]},${r.color[3] / 255})`, a.stroke(t), i.width += a.lineWidth, i.height += a.lineWidth
        }
        i.width *= l, i.height *= l;
        const m = a.getImageData(r / 2 - i.width / 2, r / 2 - i.height / 2, Math.ceil(i.width), Math.ceil(i.height));
        n = m.width, s = m.height, a.canvas.width = n, a.canvas.height = s, a.putImageData(m, 0, 0)
    } else {
        const t = "image/svg+xml" === e.contentType ? "data:image/svg+xml;base64," + e.imageData : e.url,
            r = (await i(t, {
                responseType: "image"
            })).data;
        n = o(e.width), s = o(e.height), a.canvas.width = n, a.canvas.height = s, a.drawImage(r, 0, 0, a.canvas.width, a.canvas.height)
    }
    return {
        type: "esriPMS",
        imageData: a.canvas.toDataURL("image/png").substr(22),
        angle: e.angle,
        contentType: "image/png",
        height: l(s),
        width: l(n),
        xoffset: e.xoffset,
        yoffset: e.yoffset
    }
}
async function ye(e, t) {
    const i = e.type;
    if ("simple" === i && fe(e.symbol)) e.symbol = await ce(e.symbol, t);
    else if ("uniqueValue" === i || "classBreaks" === i) {
        fe(e.defaultSymbol) && (e.defaultSymbol = await ce(e.defaultSymbol, t));
        const r = e["uniqueValue" === i ? "uniqueValueInfos" : "classBreakInfos"];
        if (r)
            for (const e of r) fe(e.symbol) && (e.symbol = await ce(e.symbol, t))
    }
}
async function ue(e) {
    return e.queryFeatures(e.createQuery()).then((e => e.features))
}

function me(e) {
    return e.gpMetadata && e.gpMetadata.executionType ? N.fromJSON(e.gpMetadata.executionType) : "sync"
}

function fe(e) {
    return e && (e.path || "image/svg+xml" === e.contentType || e.url && e.url.endsWith(".svg"))
}
export {
    j as execute, A as getGpPrintParams, C as getGpServerUrl, J as getMode, U as printCacheMap
};