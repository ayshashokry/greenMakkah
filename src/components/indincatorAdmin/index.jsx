
import React, { Component, useEffect } from "react";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { indicatorFeatureServiceUrl, indicatorLayerId } from "../../config";
import { layersSetting } from "../../helper/layers";
import { getFeatureDomainName, getLayerId, getMapInfo, groupBy, queryTask, showLoading } from "../../helper/common_func";
import { Button, Input, message, Modal, Select, Form } from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { touchRippleClasses } from "@mui/material";
import LoadingComponent from "../explorerComponents/LoadingComponent";
import { DownCircleFilled } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import NavBar from "../../layouts/NavBar";
import Footer from "../../layouts/Footer";

class IndincatorAdmin extends Component {

    greenColumns = ["TREES", "SHRUBLANDS", "GRASSLANDS", "CROPLANDS", "MANGROVES"];
    areaColumns = ["LU_AREA", "URBAN_AREAS", "BARE_SOIL", "WATER_BODIES", "WETLAND"]

    state = {
        features: [],
        isEditScreen: false,
        formData: {},
        requiredFields: []
    }

    savedYear = null;
    indicatorLayerId = null;
    featureTable = null;
    layerFields = null;
    sectors = [];
    regions = [];
    Allfeatures = [];

    constructor(props) {
        super(props)
        // Create a ref object 
    }

    setYearsFilter() {
        var now = new Date()
        var dayOfYear = Math.floor((new Date() - new Date(now.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24))
        var hijriDate = ((now.getFullYear() - 621.5643) * 365.24225 + dayOfYear) / 354.36707
        var hijriYear = Math.floor(hijriDate);
        layersSetting["INDICATORS"].editFields.find((x) => x.name == 'YEAR').lists = [];
        for (var i = 1443; i <= hijriYear; i++)
            layersSetting["INDICATORS"].editFields.find((x) => x.name == 'YEAR').lists.push(i);
    }
    componentDidMount() {

        this.setYearsFilter();

        getMapInfo(indicatorFeatureServiceUrl).then((response) => {

            this.indicatorLayerId = getLayerId(response, "INDICATORS");
            this.govLayerId = getLayerId(response, "Governorate_Center");
            let self = this;

            self.featureTable = new FeatureLayer({
                url: indicatorFeatureServiceUrl + "/" + this.indicatorLayerId
            });

            queryTask({
                url: indicatorFeatureServiceUrl + "/" + this.govLayerId,
                outFields: ['SECTOR_NO', 'A_GOVERNORATE_NAME'],
                where: "1=1",
                returnGeometry: false,
                callbackResult: ({ features }) => {

                    getFeatureDomainName(features, self.govLayerId, false,
                        indicatorFeatureServiceUrl).then((res) => {
                            let sectors = groupBy(res, "SECTOR_NO_Code");

                            Object.keys(sectors).forEach((key) => {
                                if (key != 'undefined')
                                    self.sectors.push({ code: key, name: sectors[key][0].attributes.SECTOR_NO, govs: sectors[key].map((x) => x.attributes) });
                            })

                        })
                }
            });

            showLoading(true);
            // table must be loaded so it can be used in the app.
            self.featureTable.load().then(function () {
                // table is loaded. ready to be queried.
                self.featureTable.queryFeatures().then(function (results) {
                    // prints an array of all the features in the service to the console
                    //console.log(results)
                    self.layerFields = results.fields;

                    self.regions = results.fields.find((x) => x.name == 'A_REGION_NAME').domain.codedValues;

                    getFeatureDomainName(results.features, self.indicatorLayerId, false,
                        indicatorFeatureServiceUrl).then((res) => {

                            showLoading(false);

                            self.setFeatures(res);

                        });

                });
            });

        });
    }

    setFeatures = (res) => {
        this.setState({
            features: [
                ...res.sort((a, b) =>
                    (a.attributes.SECTOR_NO_Code || 0) - (b.attributes.SECTOR_NO_Code || 0)
                )

            ]
        });
        this.Allfeatures = [...res]
        this.setYearFilter('YEAR', (this.savedYear || 1443));
        this.setState({ formData: { 'YEAR': (this.savedYear || 1443) } });
        document.body.scrollTop = 0
    }

    clearSectorFilter = () => {
        debugger
        this.setState({ features: [...this.Allfeatures] })
    }

    setYearFilter = (name, value) => {
        let f = this.Allfeatures.filter((x) => x.attributes[name] == value);

        if (name == 'SECTOR_NO_Code')
            f = this.Allfeatures.filter((x) => x.attributes[name] == value && x.attributes['YEAR'] == this.state.formData['YEAR']);

        this.setState({ features: f.length > 0 ? [...f] : null })
    }

    confirm = (feature) => {
        Modal.confirm({
            title: 'رسالة تأكيدية', className: "adminIndDeleteModal",
            // icon: <ExclamationCircleOutlined />,
            content: 'سيتم حذف هذا العنصر هل أنت متأكد من هذا الإجراء؟',
            okText: 'نعم',
            onOk: () => this.deleteFeature(feature),
            cancelText: 'إلغاء',
        });
    };

    deleteFeature = (feature) => {
        debugger
        this.savedYear = this.state.formData["YEAR"];
        this.featureTable.applyEdits(
            { deleteFeatures: [feature] }
            , { rollbackOnFailureEnabled: true }).then((results) => {
                showLoading(false);
                message.success('تم تحديث البيانات بنجاح');
                this.closeEdit();
            }, (error) => {
                showLoading(false);
                message.error('حدث خطأ أثناء تحديث البيانات');
            });
    }

    editFeature = (feature) => {

        this.savedYear = this.state.formData["YEAR"];
        this.setState({ isEditScreen: true, formData: feature.attributes, requiredFields: [] })
        document.body.scrollTop = 0
    };

    calculateTotalArea = (field) => {
        var area = 0;
        this.areaColumns.forEach((item) => {
            if (item != field.name)
                area += +(this.state.formData[item] || 0);
            else
                area += +(field.value || 0);
        })
        return area.toFixed(2);
    }

    onInputChange = (e) => {

        let requiredFields = [...this.state.requiredFields];

        if (requiredFields.indexOf(e.target.name) > -1) {
            requiredFields.splice(requiredFields.indexOf(e.target.name), 1);
            this.setState({ requiredFields: [...requiredFields] });
        }

        let depenedFields = {};
        //when change green area
        if (this.greenColumns.indexOf(e.target.name) > -1) {
            depenedFields["LU_AREA"] = 0;

            this.greenColumns.forEach((item) => {
                if (item != e.target.name)
                    depenedFields["LU_AREA"] += +(this.state.formData[item] || 0);
                else
                    depenedFields["LU_AREA"] += +(e.target.value || 0);
            });

            depenedFields["LU_AREA"] = depenedFields["LU_AREA"].toFixed(2);
            depenedFields["TOTAL_AREA"] = this.calculateTotalArea({ name: "LU_AREA", value: depenedFields["LU_AREA"] });

            depenedFields["LU_VS_TOTAL"] = ((+depenedFields["LU_AREA"] / +depenedFields["TOTAL_AREA"]) * 100).toFixed(2);
            depenedFields["INDIVIDUAL_SHARE"] = ((+depenedFields["LU_AREA"] / +this.state.formData["POPULATION"]) * 1000 * 1000).toFixed(2);

        }
        //when change area
        else if (this.areaColumns.indexOf(e.target.name) > -1) {

            depenedFields["TOTAL_AREA"] = this.calculateTotalArea(e.target);
            depenedFields["LU_VS_TOTAL"] = ((+this.state.formData["LU_AREA"] / +depenedFields["TOTAL_AREA"]) * 100).toFixed(2);

        }
        else if (e.target.name == "POPULATION") {
            depenedFields["INDIVIDUAL_SHARE"] = ((+this.state.formData["LU_AREA"] / +e.target.value) * 1000 * 1000).toFixed(2);
        }

        this.setState({
            formData:
            {
                ...this.state.formData,
                [e.target.name]: e.target.value,
                ...depenedFields
            }
        });

    };

    closeEdit = (e) => {

        let self = this;
        showLoading(true);

        this.setState({ isEditScreen: false, formData: {}, isAddFeature: false });
        this.featureTable.queryFeatures().then(function (results) {
            // prints an array of all the features in the service to the console    
            getFeatureDomainName(results.features, self.indicatorLayerId, false,
                indicatorFeatureServiceUrl).then((res) => {
                    showLoading(false);
                    self.setFeatures(res);
                });

        });
    };

    mapCodedAttributes = (updateAttributes) => {
        let codeKeys = Object.keys(updateAttributes).filter((x) => x.indexOf('_Code') > -1);

        codeKeys.forEach((key) => {
            updateAttributes[key.replace('_Code', '')] = updateAttributes[key];
            if (updateAttributes[key.replace('_Code', '')] == undefined)
                updateAttributes[key.replace('_Code', '')] = null;
        });

        return updateAttributes;
    }

    isValidInputs = (attributes) => {

        let requiredFields = [];

        let isValid = true;

        layersSetting["INDICATORS"].editFields.filter((x) => !x.isNotMandatory).forEach((field) => {
            if (attributes[field.name] == null || attributes[field.name] == undefined || attributes[field.name] == "") {
                isValid = false;
                if (!field.isDisabled)
                    requiredFields.push(field.name);
            }
        });

        this.setState({ requiredFields: [...requiredFields] })

        return isValid;
    }

    updateFeature = (attributes) => {

        showLoading(true);

        let updateAttributes = this.mapCodedAttributes({ ...attributes });
        if (this.isValidInputs(updateAttributes)) {

            if (this.isAlreadyFound(updateAttributes, true)) {

                showLoading(false);

                if (updateAttributes["A_GOVERNORATE_NAME"])
                    message.error({
                        content: 'هناك بيانات مدخلة من قبل لهذة المحافظة',
                        className: 'adminIndicMsg',
                    });
                else if (updateAttributes["SECTOR_NO"])
                    message.error({
                        content: 'هناك بيانات مدخلة من قبل لهذا القطاع',
                        className: 'adminIndicMsg',
                    });
                else
                    message.error({
                        content: 'هناك بيانات مدخلة من قبل لمنطقة مكة المكرمة',
                        className: 'adminIndicMsg',
                    });
            }
            else {
                this.featureTable.applyEdits(
                    { updateFeatures: [{ 'attributes': updateAttributes }] }
                    , { rollbackOnFailureEnabled: true }).then((results) => {
                        showLoading(false);

                        message.success({
                            content: 'تم تحديث البيانات بنجاح',
                            className: 'adminIndicMsg',
                        });
                        this.closeEdit();
                    }, (error) => {
                        showLoading(false);
                        message.error({
                            content: 'حدث خطأ أثناء تحديث البيانات',
                            className: 'adminIndicMsg',
                        });
                    });
            }
        }
        else {
            showLoading(false);
            message.error({
                content: 'من فضلك قم بإدخال الحقول المطلوبة',
                className: 'adminIndicMsg',
            });
        }


    }

    isAlreadyFound = (attributes, isCheckObjectId) => {

        let found = null;

        if (isCheckObjectId) {
            found = this.Allfeatures.find((x) => x.attributes.A_GOVERNORATE_NAME_Code == attributes.A_GOVERNORATE_NAME
                && x.attributes.SECTOR_NO_Code == attributes.SECTOR_NO
                && x.attributes.A_REGION_NAME_Code == attributes.A_REGION_NAME
                && x.attributes.YEAR == attributes.YEAR
                && x.attributes.OBJECTID != attributes.OBJECTID);
        }
        else {
            found = this.Allfeatures.find((x) => x.attributes.A_GOVERNORATE_NAME_Code == attributes.A_GOVERNORATE_NAME
                && x.attributes.SECTOR_NO_Code == attributes.SECTOR_NO
                && x.attributes.A_REGION_NAME_Code == attributes.A_REGION_NAME
                && x.attributes.YEAR == attributes.YEAR);
        }

        return found;
    }

    addFeature = (attributes) => {

        showLoading(true);

        let updateAttributes = this.mapCodedAttributes({ ...attributes });

        if (this.isValidInputs(updateAttributes)) {

            if (this.isAlreadyFound(updateAttributes)) {

                showLoading(false);

                if (updateAttributes["A_GOVERNORATE_NAME"])
                    message.error({
                        content: 'هناك بيانات مدخلة من قبل لهذة المحافظة',
                        className: 'adminIndicMsg',
                    });
                else if (updateAttributes["SECTOR_NO"])
                    message.error({
                        content: 'هناك بيانات مدخلة من قبل لهذا القطاع',
                        className: 'adminIndicMsg',
                    });
                else
                    message.error({
                        content: 'هناك بيانات مدخلة من قبل لمنطقة مكة المكرمة',
                        className: 'adminIndicMsg',
                    });
            }
            else {

                this.featureTable.applyEdits(
                    { addFeatures: [{ 'attributes': updateAttributes }] }
                    , { rollbackOnFailureEnabled: true }).then((results) => {
                        showLoading(false);
                        message.success(
                            {
                                content: 'تم إضافة المؤشر بنجاح',
                                className: 'adminIndicMsg',
                            }
                        );
                        this.closeEdit();
                    }, (error) => {
                        showLoading(false);
                        message.error(
                            {
                                content: 'حدث خطأ أثناء إضافة المؤشر',
                                className: 'adminIndicMsg',
                            }
                        );
                    });
            }
        }
        else {
            showLoading(false);
            message.error(
                {
                    content: 'من فضلك قم بإدخال الحقول المطلوبة',
                    className: 'adminIndicMsg',
                }
            );
        }

    }

    filterSelectChange = (name) => (value, item) => {
        this.setState({
            formData:
            {
                ...this.state.formData,
                [name]: value,
            }
        });

        if (name == 'SECTOR_NO_Code' && value == undefined)
            this.setYearFilter('YEAR', this.state.formData['YEAR']);
        else
            this.setYearFilter(name, value);

    }
    handleSelectChange = (name) => (value, item) => {

        let nameWithoutCode = name.replace('_Code', '');

        let requiredFields = [...this.state.requiredFields];

        if (requiredFields.indexOf(nameWithoutCode) > -1) {
            requiredFields.splice(requiredFields.indexOf(nameWithoutCode), 1);
            this.setState({ requiredFields: [...requiredFields] });
        }

        if(name == "SECTOR_NO_Code")
        {
            this.state.formData["A_GOVERNORATE_NAME_Code"] = undefined;
            this.state.formData["A_GOVERNORATE_NAME"] = undefined;
        }

        this.setState({
            formData:
            {
                ...this.state.formData,
                [name]: value,
            }
        });

    }

    clearSector = () => {

        this.state.formData['A_GOVERNORATE_NAME_Code'] = null;
        this.state.formData['A_GOVERNORATE_NAME'] = null;

        this.setState({
            formData:
            {
                ...this.state.formData
            }
        });
    }

    showAddFeatureScreen = () => {

        this.savedYear = this.state.formData["YEAR"];
        this.setState({ isEditScreen: true, formData: {}, isAddFeature: true, requiredFields: [] });
        document.body.scrollTop = 0
    }

    render() {
        const { features, isEditScreen, formData, requiredFields } = this.state;
        return (
            <div className="IndictoradminPage">
                <NavBar />
                <LoadingComponent />
                <div className="indicatorAdmin">

                    {isEditScreen ?
                        <div>
                            <table style={{ direction: "rtl", width: '100%' }} className='adminTableBody'>
                                <tr className={requiredFields.indexOf('YEAR') > -1 ? "requiredInput" : ""}>

                                    <td style={{ textAlign: 'center' }}>
                                        احصائيات لسنة
                                    </td>
                                    <td>
                                        <Select
                                            suffixIcon={<DownCircleFilled />}
                                            className="dont-show"
                                            value={formData['YEAR']}
                                            placeholder="احصائيات لسنة"
                                            onChange={this.handleSelectChange('YEAR')}
                                            getPopupContainer={(trigger) => trigger.parentNode}
                                            optionFilterProp="value"
                                            filterOption={(input, option) =>
                                                option.value.indexOf(input) >= 0
                                            }
                                        >
                                            {layersSetting["INDICATORS"].editFields.find((x) => x.name == 'YEAR').lists.map((s, index) => (
                                                <Select.Option value={+s} id={'date' + index}>
                                                    {s}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </td>
                                </tr>
                                <tr className={requiredFields.indexOf('A_REGION_NAME') > -1 ? "requiredInput" : ""}>

                                    <td style={{ textAlign: 'center' }}>
                                        المنطقة
                                    </td>
                                    <td>
                                        <Select
                                            suffixIcon={<DownCircleFilled />}
                                            className="dont-show"
                                            value={formData['A_REGION_NAME_Code']}
                                            placeholder="إختر المنطقة"
                                            onChange={this.handleSelectChange('A_REGION_NAME_Code')}
                                            getPopupContainer={(trigger) => trigger.parentNode}
                                            optionFilterProp="value"
                                            filterOption={(input, option) =>
                                                option.value.indexOf(input) >= 0
                                            }
                                        >
                                            {this.regions.map((s, index) => (
                                                <Select.Option value={+s.code} id={'region' + index}>
                                                    {s.name}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ textAlign: 'center' }}>
                                        القطاع
                                    </td>
                                    <td>
                                        <Select
                                            allowClear
                                            suffixIcon={<DownCircleFilled />}
                                            className="dont-show"
                                            value={formData['SECTOR_NO_Code']}
                                            placeholder="إختر القطاع"
                                            onClear={this.clearSector}
                                            onChange={this.handleSelectChange('SECTOR_NO_Code')}
                                            getPopupContainer={(trigger) => trigger.parentNode}
                                            optionFilterProp="value"
                                            filterOption={(input, option) =>
                                                option.value.indexOf(input) >= 0
                                            }
                                        >
                                            {this.sectors.map((s, index) => (
                                                <Select.Option value={+s.code} id={'sector' + index}>
                                                    {s.name}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ textAlign: 'center' }}>
                                        المحافظة
                                    </td>
                                    <td>
                                        <Select
                                            allowClear
                                            suffixIcon={<DownCircleFilled />}
                                            className="dont-show"
                                            onClear={this.clearGovernorate}
                                            value={formData['A_GOVERNORATE_NAME_Code']}
                                            placeholder="إختر المحافظة"
                                            onChange={this.handleSelectChange('A_GOVERNORATE_NAME_Code')}
                                            getPopupContainer={(trigger) => trigger.parentNode}
                                            optionFilterProp="value"
                                            filterOption={(input, option) =>
                                                option.value.indexOf(input) >= 0
                                            }
                                        >
                                            {this.sectors.find(x => x.code == formData["SECTOR_NO_Code"])?.govs.map((s, index) => (
                                                <Select.Option value={s.A_GOVERNORATE_NAME_Code} id={'gov' + index}>
                                                    {s.A_GOVERNORATE_NAME}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </td>
                                </tr>
                                {layersSetting["INDICATORS"].editFields.filter((x) => x.type != 'list').map((editField) => {
                                    return (
                                        <tr className={requiredFields.indexOf(editField.name) > -1 ? "requiredInput" : ""}>
                                            <td style={{ textAlign: 'center' }}>
                                                {editField.alias}
                                            </td>
                                            <td style={{ textAlign: 'center' }}>

                                                <Input
                                                    type={editField.type ? editField.type : "number"}
                                                    className="searchInput"
                                                    value={formData[editField.name]}
                                                    onChange={this.onInputChange.bind(this)}
                                                    name={editField.name}
                                                    disabled={editField.isDisabled}
                                                />

                                            </td>
                                        </tr>)
                                })}
                            </table>
                            <div style={{ textAlign: 'center' }}>
                                {this.state.isAddFeature ?
                                    <button className="SearchBtn indAdminAddOREDit" style={{ height: '40px' }} size="large" onClick={this.addFeature.bind(this, formData)}>
                                        إضافة
                                    </button> :
                                    <button className="SearchBtn indAdminAddOREDit" style={{ height: '40px' }} size="large" onClick={this.updateFeature.bind(this, formData)}>
                                        تعديل
                                    </button>
                                }
                                <Button className="editButton" type="primary" style={{ width: '11em' }} size="large" onClick={this.closeEdit.bind(this)} danger>
                                    إلغاء
                                </Button>
                            </div>
                        </div>
                        : <div>
                            <div style={{ display: 'flex' }}>
                                <Form.Item className="adminIndYearInp"
                                    label="احصائيات سنة"

                                >
                                    <Select
                                        suffixIcon={<DownCircleFilled />}
                                        className="dont-show"
                                        value={formData['YEAR']}
                                        placeholder="يمكنك تصفية سنة الاحصائيات"
                                        onChange={this.filterSelectChange('YEAR')}
                                        getPopupContainer={(trigger) => trigger.parentNode}
                                        optionFilterProp="value"
                                        filterOption={(input, option) =>
                                            option.value.indexOf(input) >= 0
                                        }
                                    >
                                        {layersSetting["INDICATORS"].editFields.find((x) => x.name == 'YEAR').lists.map((s, index) => (
                                            <Select.Option value={+s} id={'date' + index}>
                                                {s}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>

                                <Form.Item className="adminIndYearInp" style={{ marginRight: '30px' }}
                                    label="القطاع"

                                >
                                    <Select
                                        allowClear
                                        suffixIcon={<DownCircleFilled />}
                                        className="dont-show"
                                        value={formData['SECTOR_NO_Code']}
                                        onClear={this.clearSectorFilter}
                                        placeholder="يمكنك تصفية القطاع"
                                        onChange={this.filterSelectChange('SECTOR_NO_Code')}
                                        getPopupContainer={(trigger) => trigger.parentNode}
                                        optionFilterProp="value"
                                        filterOption={(input, option) =>
                                            option.value.indexOf(input) >= 0
                                        }
                                    >
                                        {this.sectors.map((s, index) => (
                                            <Select.Option value={+s.code} id={'sector' + index}>
                                                {s.name}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>



                                <Button className=" addindBtn" onClick={this.showAddFeatureScreen.bind(this)}>
                                    إضافة مؤشر
                                </Button>

                            </div>
                            {features != null&&features.length>0 ? <table className="table">
                                <thead className="adminTableHead">
                                    <tr>
                                        <th></th>
                                        {layersSetting["INDICATORS"].aliasOutFields.map((alias) => {
                                            return (<th>
                                                {alias}
                                            </th>)
                                        })}
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody className="adminTableBody">

                                    {features.map((f) => {
                                        return (
                                            <tr className={f.attributes["SECTOR_NO_Code"] != null && f.attributes["A_GOVERNORATE_NAME"] == null ? "sectorStyle" : ""}>
                                                <td>{f.attributes["A_GOVERNORATE_NAME"] || f.attributes["SECTOR_NO"] || f.attributes["A_REGION_NAME"]}</td>

                                                {layersSetting["INDICATORS"].outFields.map((outfield) => {
                                                    return (<td>
                                                        {f.attributes[outfield]}
                                                    </td>)

                                                })}
                                                <td>
                                                    <button className="SearchBtn adminTableeditBtn" onClick={this.editFeature.bind(this, f)} >
                                                        تعديل
                                                    </button>
                                                </td>
                                                <td>
                                                    <Button type="primary" danger onClick={this.confirm.bind(this, f)}>
                                                        حذف
                                                    </Button>
                                                </td>
                                            </tr>)

                                    })}
                                </tbody>
                            </table> : <h4 className="nodata">لا يوجد بيانات</h4>}
                        </div>
                    }
                </div><Footer /></div>)
    }
}
function IndincatorAdminNavigate(props) {
    let navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('user')) {
            navigate("/login", { replace: true });
        }
    }, []);

    return <IndincatorAdmin {...props} navigate={navigate} />
}

export default IndincatorAdminNavigate
