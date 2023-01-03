import React, { Component } from "react";
import { Form, Select, Button, Input } from 'antd';
import { mapUrl } from "../../../../config";
import { getFeatureDomainName, getLayerId, highlightFeature, queryTask, showLoading } from "../../../../helper/common_func";
import { layersSetting } from "../../../../helper/layers";
import { DownCircleFilled } from "@ant-design/icons";
import Checkbox from "antd/lib/checkbox/Checkbox";

class FilterComponent extends Component {

    state = {
        searchLayer: null,
        searchLayers: [],
        formValues: {},
        searchFields: [],
        isActiveBufferSearch: false,
        showInfo: false,
        noData: false
    }
    self = this;
    mapPoint = null;

    componentDidMount() {

        this.setState({
            searchLayers: Object.keys(layersSetting).map((key) => {
                return { layerName: key, layer: layersSetting[key], name: layersSetting[key].name }
            }).filter((l) => {
                return l.layer.isSearchable && l.layer.searchFields
            })
        });

    }

    handleSearchSelect = () => (layer) => {

        this.setState({ searchLayer: layer, showInfo: false, noData: false,formValues:{} });

        this.getListsValue(layer);

    }

    getListsValue = (layer, getListsAfterFieldName, parentFilter) => {

        //get all filters
        let promiseQueries = [];
        let fieldsName = [];
        let layerdId = getLayerId(
            this.props.map.__mapInfo,
            layer
        );

        layersSetting[layer].searchFields.filter((x) => !x.isSearch).forEach((item, index) => {

            if (!getListsAfterFieldName) {
                fieldsName.push(item.field);

                let filterQuery = (parentFilter ? parentFilter : "1=1") + " and " + item.field + " is not null";

                promiseQueries.push(queryTask({
                    url: mapUrl + "/" + layerdId,
                    where: filterQuery,
                    outFields: [item.field],
                    returnGeometry: false,
                    returnExecuteObject: true,
                    returnDistinctValues: true
                }));

            }
            else {
                if (item.field == getListsAfterFieldName)
                    getListsAfterFieldName = null;
            }
        });


        if (promiseQueries.length > 0)
            showLoading(true);
        else {
            this.setState({
                searchFields:
                    layersSetting[layer].searchFields.filter((x) => !x.isSearch)
            });
        }
        Promise.all(promiseQueries).then((resultsData) => {

            this.mapResultWithDomain(resultsData, fieldsName, layerdId).then((data) => {

                data.forEach((item, index) => {
                    let searchField = layersSetting[layer].searchFields.find((x => x.field == fieldsName[index]))
                    if (item.features.length > 0) {
                        searchField.dataList = [...item.features];
                        if (searchField.dataList.length == 1) {
                            this.state.formValues[searchField.field] = searchField.dataList[0].attributes[searchField.field + "_Code"] || searchField.dataList[0].attributes[searchField.field]
                        }
                    }

                    else {
                        searchField.dataList = [];
                    }
                });
                showLoading(false);
                this.setState({
                    searchFields:
                        layersSetting[layer].searchFields.filter((x) => !x.isSearch),
                    formValues: { ...this.state.formValues }
                });
            });

        });

    }


    mapResultWithDomain = (results, fieldsName, layerId) => {

        return new Promise((resolve, reject) => {

            let count = fieldsName.length;

            results.forEach((item, index) => {

                getFeatureDomainName(item.features, layerId).then(
                    (domainResult) => {

                        item.features = domainResult;

                        --count;
                        if (count < 1) {
                            resolve(results);
                        }

                    });
            })

        });

    }

    selectChange = (name, listData) => (e) => {

        this.setState({ showInfo: false, noData: false })
        this.setState({ formValues: { ...this.state.formValues, [name]: e } }, () => {
            let searchField = layersSetting[this.state.searchLayer].searchFields.find((i) => i.field == name && !i.isSearch);
            if (searchField) {
                let filterQuery = [];

                debugger
                this.state.formValues = this.deleteChildValues(name);

                Object.keys(this.state.formValues).forEach((key) => {
                    if (this.state.formValues[key])
                        filterQuery.push(key + "='" + this.state.formValues[key] + "'");
                });

                this.getListsValue(this.state.searchLayer, name, filterQuery.join(' and '));

            }
        });
    }

    deleteChildValues = (name) => {
        let found = false;
        layersSetting[this.state.searchLayer].searchFields.forEach((item) => {
            if (found) {
                delete this.state.formValues[item.field];
            }
            if (item.field == name) {
                found = true;
            }
        });

        return this.state.formValues;
    }

    handleChangeInput = (e) => {
        this.setState({ showInfo: false, noData: false })
        this.setState({ formValues: { ...this.state.formValues, [e.target.name]: e.target.value } });
    };

    handleBufferSearch = (e) => {
        this.setState({ showInfo: false, noData: false })
        this.setState({ buffer_distance: e.target.value });
    };

    searchForData = (e) => {

        if (this.state.isActiveBufferSearch) {

            this.setState({ showInfo: true });
            var handler = this.props.map.view.on("click", (event) => {
                handler.remove();
                this.setState({ showInfo: false });

                this.getSearchData(event.mapPoint);
            });

        }
        else {
            this.getSearchData();
        }

    }

    getSearchData = (e) => {

        let filterQuery = [];

        Object.keys(this.state.formValues).forEach((key) => {
            if (this.state.formValues[key]) {
                let field = layersSetting[this.state.searchLayer].searchFields.find((x) => x.isSearch && x.field == key);
                if (field) {
                    filterQuery.push(key + " like '%" + this.state.formValues[key] + "%'");
                }
                else {
                    filterQuery.push(key + "='" + this.state.formValues[key] + "'");
                }
            }
        });

        filterQuery = filterQuery.join(' and ');

        let layerdId = getLayerId(this.props.map.__mapInfo, this.state.searchLayer);

        queryTask({
            url: mapUrl + "/" + layerdId,
            where: filterQuery ? filterQuery : "1=1",
            outFields: layersSetting[this.state.searchLayer].outFields,
            returnGeometry: false,
            queryWithGemoerty: this.state.isActiveBufferSearch,
            distance: this.state.buffer_distance,
            geometry: e,
            callbackResult: ({ features }) => {
                if (features.length) {
                    getFeatureDomainName(features, layerdId).then((res) => {

                        let mappingRes = res.map((f) => {
                            return {
                                layerName: this.state.searchLayer,
                                id: f.attributes["OBJECTID"],
                                ...f.attributes,
                                //geometry: f.geometry
                            };
                        });


                        if (res.length > 1) {
                            this.props.setOuterSearchResult(mappingRes);
                            this.props.outerOpenResultMenu();
                            
                        }
                        else {
                            this.props.setOuterSearchResult(mappingRes);
                        }
                        this.props.setNavRouteName("outerSearch");


                    });
                }
                else {
                    this.setState({ noData: true });
                }
            },
            callbackError(error) { },
        });
    }

    onChange = (e) => {
        this.setState({ isActiveBufferSearch: !this.state.isActiveBufferSearch });
    }


    render() {

        const filterText = this.state.searchLayer && layersSetting[this.state.searchLayer].searchFields.find((x) => x.isSearch);
        return (
            <div>

                <div style={{ display: 'grid' }}>
                    <label className="selectLabelStyle" >طبقة البحث</label>
                    <Select
                        suffixIcon={<DownCircleFilled />}
                        showSearch
                        className="dont-show"
                        onChange={this.handleSearchSelect()}
                        value={this.state.searchLayer}
                        placeholder="إختر طبقة البحث "
                        getPopupContainer={(trigger) => trigger.parentNode}
                        optionFilterProp="value"
                        filterOption={(input, option) => option.value.indexOf(input) >= 0}
                    >
                        {this.state.searchLayers.map((s, index) => (
                            <Select.Option value={s.layerName} id={s.layerName}>
                                {s.name}
                            </Select.Option>
                        ))}
                    </Select>


                    {this.state.searchFields.map((item) => {
                        return (
                            <div style={{ display: 'grid' }}>
                                <label className="selectLabelStyle" >{item.alias}</label>
                                <Select
                                    disabled={item.dataList && item.dataList.length == 0}
                                    showSearch
                                    allowClear
                                    onChange={this.selectChange(item.field,
                                        item.dataList)}
                                    value={this.state.formValues[item.field]}
                                    placeholder={item.alias}
                                    getPopupContainer={(trigger) => trigger.parentNode}
                                    optionFilterProp="v"
                                    filterOption={(input, option) =>
                                        option.v ? option.v.indexOf(input) >= 0 : false
                                    }>
                                    {item.dataList && item.dataList.map(m => {
                                        return (<Select.Option
                                            v={m.attributes[item.field]}
                                            value={m.attributes[item.field + "_Code"] || m.attributes[item.field]}>
                                            {m.attributes[item.field]}
                                        </Select.Option>)
                                    })}
                                </Select>
                            </div>
                        )
                    })}
                </div>

                {this.state.searchLayer &&

                    <div>
                        {filterText && <div style={{ display: 'grid' }}>
                            <label className="selectLabelStyle" >{filterText.alias}</label>

                            <Input
                                name={filterText.field}
                                onChange={this.handleChangeInput}
                                value={this.state.formValues[filterText.field]}
                                placeholder={filterText.alias}
                            />
                        </div>}

                        <div style={{ display: 'grid' }}>

                            <Checkbox style={{ marginTop: '20px' }} checked={this.state.isActiveBufferSearch}
                                onChange={this.onChange}>بحث بالنطاق الجغرافي</Checkbox>

                            {this.state.isActiveBufferSearch &&
                                <div style={{ display: 'grid' }}>
                                    <label className="selectLabelStyle" >المسافة (م)</label>

                                    <Input
                                        name="buffer_distance"
                                        onChange={this.handleBufferSearch}
                                        value={this.state.buffer_distance}
                                        placeholder="المسافة (م)"
                                    />
                                </div>
                            }

                            <div className="searchInfoStyle">
                                {this.state.showInfo && <p>من فضلك قم بالضغط على الخريطة لبدأ البحث</p>}
                                {this.state.noData && <p>عفوا لا يوجد بيانات متاحة</p>}
                            </div>

                            <div style={{ textAlign: 'center' }}>

                                <button
                                    onClick={this.searchForData}

                                    className="SearchBtn mt-3 w-25"
                                    size="large"
                                    htmlType="submit"
                                >
                                    بحث
                                </button>
                            </div>
                        </div>
                    </div>}
            </div >
        )
    }

}
export default FilterComponent