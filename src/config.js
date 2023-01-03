import { faWindows } from "@fortawesome/free-brands-svg-icons";

export const mapUrl =
  "http://77.30.168.84:6080/arcgis/rest/services/GREEN_MAKKAH/MapServer";
export const dashboardMapUrl =
  "http://77.30.168.84:6080/arcgis/rest/services/GREEN_MAKKAH_INDICATORS/MapServer";

export const printUrl =
"http://77.30.168.84:6080/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"  
//"http://77.30.168.84:6080/arcgis/rest/services/Printing/ExportSecureWebMap/GPServer/Export%20Web%20Map";

window.__printServiceUrl = "http://77.30.168.84:6080/arcgis/rest/services/GREEN_MAKKAH_PRINT/MapServer" 

export const indicatorFeatureServiceUrl ="http://77.30.168.84:6080/arcgis/rest/services/GREEN_MAKKAH_INDICATORS_CRUD/FeatureServer";


export const searchFieldNameConfig = "A_NAME";
export const is3dZoomEnabled = true;
export const is3dHighlightOnly = false;
export const initialCameraPosition = {
  position: {
    spatialReference: { latestWkid: 3857, wkid: 102100 },
    x: 4591700.624253098,
    y: 1685282.2062162554,
    z: 650262.1994772451,
  },
  heading: 0,
  tilt: 44.999999999999964,
};
export const drawingCalculatedExp = (name, A_GOVERNORATE_NAME, Sector_No) => {
  //Makkah
  if (!A_GOVERNORATE_NAME && !Sector_No)
    return "($feature['" + name + "']+ 3)*20";
  //Sector
  else if (!A_GOVERNORATE_NAME && Sector_No)
    return "($feature['" + name + "']+ 3)*20";
  //Governorate
  else
    return "($feature['" + name + "']+ 3)*50";
};
export const ApiUrl = "http://77.30.168.84/greenmakkahapi";
export const hostUrl = "http://77.30.168.84/";
