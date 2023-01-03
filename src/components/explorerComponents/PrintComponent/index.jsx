import React, { Component } from "react";
import { Input, Select, Button, Checkbox } from 'antd';
import PrintTemplate from "@arcgis/core/rest/support/PrintTemplate";
import Extent from "@arcgis/core/geometry/Extent";
import * as print from "@arcgis/core/rest/print";
import PrintParameters from "@arcgis/core/rest/support/PrintParameters";

import { saveAs } from 'file-saver'
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import LegendLayer from "@arcgis/core/rest/support/LegendLayer";
import Graphic from "@arcgis/core/Graphic";
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol";
import logoImage from '../../../images/logo.png'
import northArrowImage from '../../../images/northarrow.png'
import Point from "@arcgis/core/geometry/Point";
import { printUrl } from "../../../config";
import { showLoading } from "../../../helper/common_func";
import { layersSetting } from "../../../helper/layers";

class PrintComponent extends Component {

    state = {
        extenstionType: null,
        printTitle: "",
        isWithBaseMap: true,
        extenstionTypes: [
            { key: 'JPG', name: 'JPG' },
            { key: 'PDF', name: 'PDF' },
            { key: 'PNG32', name: 'PNG32' },
            { key: 'PNG8', name: 'PNG8' }
        ],
        layoutTypes: [
            { key: 'Letter ANSI A Landscape', name: 'Letter ANSI A Landscape', height: 260 * 2, width: 450 * 2, offsetX: 440, offsetY: 250 },
            { key: 'Letter ANSI A Portrait', name: 'Letter ANSI A Portrait', height: 350 * 2, width: 334 * 2, offsetX: 325, offsetY: 345 },
            { key: 'Tabloid ANSI B Landscape', name: 'Tabloid ANSI B Landscape', height: 325 * 2, width: 738 * 2, offsetX: 730, offsetY: 320 },
            { key: 'MAP_ONLY', name: 'MAP_ONLY', height: 355 * 2, width: 480 * 2, offsetX: 470, offsetY: 350 },
            { key: 'Tabloid ANSI B Portrait', name: 'Tabloid ANSI B Portrait', height: 525 * 2, width: 450 * 2, offsetX: 440, offsetY: 520 },
            { key: 'A3 Landscape', name: 'A3 Landscape', height: 365 * 2, width: 730 * 2, offsetX: 720, offsetY: 360 },
            { key: 'A4 Landscape', name: 'A4 Landscape', height: 260 * 2, width: 490 * 2, offsetX: 480, offsetY: 250 },
            { key: 'A3 Portrait', name: 'A3 Portrait', height: 495 * 2, width: 490 * 2, offsetX: 480, offsetY: 490 },
            { key: 'A4 Portrait', name: 'A4 Portrait', height: 385 * 2, width: 330 * 2, offsetX: 320, offsetY: 380 }
        ],
        resolutionTypes: [
            { key: 96, name: 'low 96 dpi' },
            { key: 200, name: 'medium 200 dpi' },
            { key: 396, name: 'high 396 dpi' }
        ]
    }

    componentWillUnmount() {

        const customEvent = new CustomEvent('showPrintBox', { detail: { show: false } });
        document.dispatchEvent(customEvent);
    }
    componentDidMount() {

        //console.log('prinnnnnnnnnnnnnnt',this.props)
        window.__layerSetting = layersSetting;
    }

    onInputChange = (e) => {
        debugger
        this.setState({ [e.target.name]: e.target.value });
    };

    selectChange = (name) => (e) => {

        var param = { show: false };
        if (name == "layoutType") {
            var selectedLayout = this.state.layoutTypes.find(x => x.key == e);

            param = {
                show: true,
                style:
                {
                    'width': selectedLayout.width + 'px',
                    'height': selectedLayout.height + 'px',
                    'left': (this.props.map.view.width - selectedLayout.width) / 2 + 'px',
                    'top': (this.props.map.view.height - selectedLayout.height) / 2 + 65 + 'px',
                }
            }

            const customEvent = new CustomEvent('showPrintBox', { detail: param });
            document.dispatchEvent(customEvent);
        }



        this.setState({ [name]: e });
    }

    exportMap(res) {
        showLoading(false);
        var toPrint;
        if (res.url.indexOf(".pdf") > -1) {
            toPrint = window.open(res.url);
        }
        else {
            toPrint = window.open('', '', 'width=2500,height=2000');
            if (toPrint) {
                var img = new Image();
                img.src = res.url;

                img.onload = function () {
                    toPrint.print();
                    toPrint.close();
                }

                toPrint.document.body.appendChild(img);

                toPrint.document.close();
                toPrint.focus();
            } else {
                // $rootScope.notifySystem('warning', "mapViewer.BLOCK_POPUP_ERROR", 5000);
            }
        }
    }

    saveMap(res) {
        (async () => {
            let name = this.state.titleText;
            let blob = await fetch(res.url).then((r) => r.blob());
            showLoading(false);
            saveAs(blob, name);

        })();
    }

    addImage(url, x, y, offestX, offsetY, width, height) {

        var point = new Point(x - offestX, y - offsetY, new SpatialReference({
            wkid: this.props.map.view.spatialReference.wkid
        }));

        var symbol = new PictureMarkerSymbol({
            url: url,
            "height": height || 50,
            "width": width || 50,
        });
        var graphic = new Graphic({
            'geometry': point,
            'symbol': symbol
        });

        this.props.map.findLayerById("printGraphicLayer").add(graphic);
    }

    printMap(callbackResult) {

        this.setState({ validateForm: true });

        if (this.state.resolutionType && this.state.extenstionType
            && this.state.layoutType && this.state.printTitle) {

            var template = new PrintTemplate();

            showLoading(true);

            template.exportOptions = {};
            template.exportOptions.dpi = this.state.resolutionType;
            template.format = this.state.extenstionType;

            template.preserveScale = true;
            template.showAttribution = false;
            template.showLabels = false;
            template.layout = this.state.layoutType;

            var selectedLayout = this.state.layoutTypes.find(x => x.key == this.state.layoutType);

            var centerPoint = new Extent(this.props.map.view.extent.xmin,
                this.props.map.view.extent.ymin, this.props.map.view.extent.xmax,
                this.props.map.view.extent.ymax, this.props.map.view.spatialReference);

            var screenPoint = this.props.map.view.toScreen(centerPoint.center);

            var temp = { x: screenPoint.x, y: screenPoint.y };
            screenPoint.x += selectedLayout.offsetX;
            screenPoint.y += selectedLayout.offsetY;

            var northLocation = this.props.map.view.toMap(screenPoint);

            temp.x -= selectedLayout.offsetX;
            temp.y -= selectedLayout.offsetY;

            if (selectedLayout.name == "MAP_ONLY") {
                temp.x -= 80;
            };

            var logoLocation = this.props.map.view.toMap(temp)


            template.layoutOptions = {
                "titleText": this.state.printTitle,
            };

            if (true) {

                // add basemap only in legend

                var legendLayer = new LegendLayer();
                legendLayer.layerId = this.props.map.layers.items[0].id;
                legendLayer.subLayerIds = [];
                this.props.map.__mapInfo.info.$layers.layers.forEach((layer) => {
                    legendLayer.subLayerIds.push(layer.id);
                });


                template.layoutOptions.legendLayers = [legendLayer];
            }
            else {

                template.layoutOptions.legendLayers = [];
            }


            if (selectedLayout.name == "MAP_ONLY") {
                template.exportOptions.width = 1200;
                template.exportOptions.height = 800;
            }

            if (this.state.arrow || true) {
                this.addImage(logoImage, logoLocation.x, logoLocation.y, 40, 40);
            }
            if (this.state.logo || true) {
                this.addImage(northArrowImage, northLocation.x, northLocation.y, 40, 40);
            }



            if (!this.state.isWithBaseMap)
                this.props.map.basemap = null;

            let params = new PrintParameters({
                view: this.props.map.view,
                template: template
            });

            console.log(params)


            print.execute(printUrl, params).then((e) => {
                callbackResult(e);
                if (!this.state.isWithBaseMap)
                    this.props.map.basemap = 'streets-navigation-vector';
            },
                (error) => {
                    showLoading(false);
                });

            setTimeout(() => {
                this.props.map.findLayerById("printGraphicLayer").removeAll()
            }, 400);

        }
        else {
            return;
        }

    }

    onChangeIncludeBaseMap = (e) => {
        this.setState({ isWithBaseMap: !this.state.isWithBaseMap });
    }

    render() {

        let { printTitle, extenstionType, extenstionTypes,
            layoutType, layoutTypes, resolutionTypes, resolutionType,
            printBoxStyle, validateForm } = this.state;
        return (
            <div className="printStyle">

                <p>من فضلك أدخل عنوان الخريطة</p>
                <Input
                    className="searchInput"
                    placeholder="من فضلك أدخل عنوان الخريطة"
                    value={printTitle}
                    onChange={this.onInputChange.bind(this)}
                    name="printTitle"
                    style={{ borderColor: (!printTitle && validateForm) ? 'red' : '' }}
                />

                {validateForm && !printTitle && <div style={{ textAlign: 'center' }}>
                    <label className="requiredPrint" >- من فضلك أدخل عنوان الخريطة -</label>
                </div>}

                <p style={{ marginTop: '10px' }}>من فضلك أختر الصيغة</p>
                <Select
                    className="searchInput"
                    showSearch
                    allowClear
                    style={{
                        borderColor: (!extenstionType && validateForm) ? 'red' : 'black',
                        borderRadius: '5px',
                        border: (!extenstionType && validateForm) ? "1px solid #ff1313" : "none"
                    }}
                    onChange={this.selectChange('extenstionType')}
                    value={extenstionType}
                    placeholder="من فضلك أختر الصيغة"
                    getPopupContainer={(trigger) => trigger.parentNode}
                    optionFilterProp="v"
                    filterOption={(input, option) =>
                        option.v.indexOf(input) >= 0
                    }>
                    {extenstionTypes.map(m => {
                        return (<Select.Option v={m.name} key={m.key}
                            value={m.key}>
                            {m.name}
                        </Select.Option>)
                    })}
                </Select>

                {validateForm && !extenstionType && <div style={{ textAlign: 'center' }}>
                    <label className="requiredPrint" >- من فضلك أختر الصيغة -</label>
                </div>}

                <p style={{ marginTop: '10px' }}>من فضلك أختر القالب</p>
                <Select
                    className="searchInput"
                    showSearch
                    allowClear
                    style={{
                        borderColor: (!extenstionType && validateForm) ? 'red' : 'black',
                        borderRadius: '5px',
                        border: (!extenstionType && validateForm) ? "1px solid #ff1313" : "none"
                    }}
                    onChange={this.selectChange('layoutType')}
                    value={layoutType}
                    placeholder="من فضلك أختر القالب"
                    getPopupContainer={(trigger) => trigger.parentNode}
                    optionFilterProp="v"
                    filterOption={(input, option) =>
                        option.v.indexOf(input) >= 0
                    }>
                    {layoutTypes.map(m => {
                        return (<Select.Option v={m.name} key={m.key}
                            value={m.key}>
                            {m.name}
                        </Select.Option>)
                    })}
                </Select>

                {validateForm && !layoutType && <div style={{ textAlign: 'center' }}>
                    <label className="requiredPrint" >- من فضلك أختر القالب -</label>
                </div>}

                <p style={{ marginTop: '10px' }}>من فضلك أختر درجة الوضوح</p>
                <Select
                    className="searchInput"
                    showSearch
                    allowClear
                    style={{
                        borderColor: (!extenstionType && validateForm) ? 'red' : 'black',
                        borderRadius: '5px',
                        border: (!extenstionType && validateForm) ? "1px solid #ff1313" : "none"
                    }}
                    onChange={this.selectChange('resolutionType')}
                    value={resolutionType}
                    placeholder="من فضلك أختر درجة الوضوح"
                    getPopupContainer={(trigger) => trigger.parentNode}
                    optionFilterProp="v"
                    filterOption={(input, option) =>
                        option.v.indexOf(input) >= 0
                    }>
                    {resolutionTypes.map(m => {
                        return (<Select.Option v={m.name} key={m.key}
                            value={m.key}>
                            {m.name}
                        </Select.Option>)
                    })}
                </Select>
                {validateForm && !resolutionType && <div style={{ textAlign: 'center' }}>
                    <label className="requiredPrint" >- من فضلك أختر درجة الوضوح -</label>
                </div>}

                <div>

                    <Checkbox style={{ marginTop: '20px' }} checked={this.state.isWithBaseMap}
                        onChange={this.onChangeIncludeBaseMap}>إضافة المصور الجغرافي</Checkbox>
                </div>
                <div className="flex-container">
                    <Button className="SearchBtn" style={{ marginRight: '15px' }} onClick={this.printMap.bind(this, this.exportMap.bind(this))}>طباعة</Button>
                    <Button className="SearchBtn" onClick={this.printMap.bind(this, this.saveMap.bind(this))}>حفظ</Button>
                </div>
            </div>

        )
    }

}
export default PrintComponent