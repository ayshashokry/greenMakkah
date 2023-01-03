import mzar3 from "../assets/images/expMapTags/mzar3.svg";
import mamsha from "../assets/images/expMapTags/mamsha.svg";
import motnzhat from "../assets/images/expMapTags/motnzhat.svg";
import kornesh from "../assets/images/expMapTags/kornesh.svg";
import m7mya from "../assets/images/expMapTags/m7mya.svg";
import gardens from "../assets/images/expMapTags/gardens.svg";

import MngrofImg from "../assets/images/dashBarLabel/mngrof.svg";
import TreesImg from "../assets/images/dashBarLabel/trees.svg";
import MiniTreesImg from "../assets/images/dashBarLabel/miniTrees.svg";
import Mra3yImg from "../assets/images/dashBarLabel/mra3y.svg";
import Zra3atImg from "../assets/images/dashBarLabel/zra3at.svg";

export const layersSetting = {
  Roads: {
    name: "الطرق",
    nameEn: "Roads",
    outFields: [
      "OBJECTID",
      "A_NAME",
      "E_NAME",
      "A_GOVERNORATE_NAME",
      "E_GOVERNORATE_NAME",
      "A_REGION_NAME",
      "E_REGION_NAME",
      "SECTOR_NO",
      "ROADS_CLASS_A",
      "ROADS_CLASS_E",
      "SPEED_LIMIT",
      "DATA_SOURCE",
    ],
    aliasOutFields: [
      "الاسم",
      "Name",
      "اسم المحافظة",
      "Governorate name",
      "اسم المنطقة",
      "Region name",
      "القطاع",
      "تصنيف الشارع",
      "Roads Class",
      "حد السرعة",
      "مصدر البيانات",
    ],
    isSearchable: false,
  },
  Recreational_ِArea_P: {
    name: "Recreational_ِArea_P",
    nameEn: "Recreational Area",
    outFields: [
      "OBJECTID",
      "A_NAME",
      "E_NAME",
      "SOURCE",
      "FEATURE_AREA",
      "A_GOVERNORATE_NAME",
      "E_GOVERNORATE_NAME",
      "A_REGION_NAME",
      "E_REGION_NAME",
      "SECTOR_NO",
    ],
    aliasOutFields: [
      "الاسم",
      "Name",
      "المصدر",
      "المساحة (م2)",
      "اسم المحافظة",
      "Governorate name",
      "اسم المنطقة",
      "Region name",
      "القطاع",
    ],
  },
  Walkway: {
    name: "الممشى",
    nameEn: "Walkway",
    searchFields: [
      { field: "A_GOVERNORATE_NAME", alias: "اسم المحافظة" },
      { field: "SECTOR_NO", alias: "القطاع" },
      { field: "A_NAME", alias: "الاسم", isSearch: true },
    ],
    outFields: [
      "OBJECTID",
      "A_REGION_NAME",
      // "E_REGION_NAME",
      "SECTOR_NO",
      "A_GOVERNORATE_NAME",
      // "E_GOVERNORATE_NAME",
      "A_NAME",
      // "E_NAME",
      "SOURCE",
      "FEATURE_AREA",
    ],
    aliasOutFields: [
      "اسم المنطقة",
      // "Region name",
      "القطاع",
      "اسم المحافظة",
      // "Governorate name",
      "الاسم",
      // "Name",
      "المصدر",
      "المساحة (م2)",
    ],
    isSearchable: true,
  },
  Parks: {
    name: "المنتزهات",
    nameEn: "Parks",
    searchFields: [
      { field: "A_GOVERNORATE_NAME", alias: "اسم المحافظة" },
      { field: "SECTOR_NO", alias: "القطاع" },
      { field: "A_NAME", alias: "الاسم", isSearch: true },
    ],
    outFields: [
      "OBJECTID",
      "A_REGION_NAME",
      // "E_REGION_NAME",
      "SECTOR_NO",
      "A_GOVERNORATE_NAME",
      // "E_GOVERNORATE_NAME",
      "A_NAME",
      // "E_NAME",
      "SOURCE",
      "FEATURE_AREA",

    ],
    aliasOutFields: [
      "اسم المنطقة",
      // "Region name",
      "القطاع",
      "اسم المحافظة",
      // "Governorate name",
      "الاسم",
      // "Name",
      "المصدر",
      "المساحة (م2)",
    ],
    isSearchable: true,
  },
  Cornich: {
    name: "الكورنيش",
    nameEn: "Cornich",
    searchFields: [
      { field: "A_GOVERNORATE_NAME", alias: "اسم المحافظة" },
      { field: "SECTOR_NO", alias: "القطاع" },
      { field: "TYPE", alias: "نوع الكورنيش" },
      { field: "A_NAME", alias: "الاسم", isSearch: true },
    ],
    outFields: [
      "OBJECTID",
      "A_REGION_NAME",
      // "E_REGION_NAME",
      "SECTOR_NO",
      "A_GOVERNORATE_NAME",
      // "E_GOVERNORATE_NAME",
      "A_NAME",
      // "E_NAME",
      "TYPE",
      "SOURCE",

      "FEATURE_AREA",

    ],
    aliasOutFields: [
      "اسم المنطقة",
      // "Region name",
      "القطاع",
      "اسم المحافظة",
      // "Governorate name",
      "الاسم",
      // "Name",
      "نوع الكورنيش",
      "المصدر",
      "المساحة (م2)",
    ],
    isSearchable: true,
  },
  Recreational_ِArea: {
    name: "مناطق ترفيهية",
    nameEn: "Recreational Area",
    searchFields: [
      { field: "A_GOVERNORATE_NAME", alias: "اسم المحافظة" },
      { field: "SECTOR_NO", alias: "القطاع" },
      { field: "A_NAME", alias: "الاسم", isSearch: true },
    ],
    outFields: [
      "OBJECTID",
      "A_NAME",
      "E_NAME",
      "SOURCE",
      "FEATURE_AREA",
      "A_GOVERNORATE_NAME",
      "E_GOVERNORATE_NAME",
      "A_REGION_NAME",
      "E_REGION_NAME",
      "SECTOR_NO",
    ],
    aliasOutFields: [
      "الاسم",
      "Name",
      "المصدر",
      "المساحة (م2)",
      "اسم المحافظة",
      "Governorate name",
      "اسم المنطقة",
      "Region name",
      "القطاع",
    ],
    isSearchable: false,
  },
  Water_Treatment_Plant: {
    name: "محطات معالجة المياه",
    nameEn: "Water Treatment Plant",
    searchFields: [{ field: "A_NAME", alias: "الاسم", isSearch: true }],
    outFields: [
      "OBJECTID",
      "A_NAME",
      "E_NAME",
      "LONGITUDE_X",
      "LATITUDE_Y"
    ],
    aliasOutFields: [
      "الاسم",
      "Name",
      "خطوط الطول",
      "دوائر العرض"
    ],
    isSearchable: true,
  },
  Dams: {
    name: "السدود",
    nameEn: "Dams",
    searchFields: [
      { field: "A_GOVERNORATE_NAME", alias: "اسم المحافظة" },
      { field: "SECTOR_NO", alias: "القطاع" },
      { field: "PURPOSE", alias: "الغرض من السد" },
      { field: "TYPE", alias: "نوع السد" },
      { field: "STATUS", alias: "حالة السد" },
      //{ field: "A_NAME", alias: "الاسم", isSearch: true }
    ],
    outFields: [
      "OBJECTID",
      //"A_NAME",
      //"E_NAME",
      "PURPOSE",
      "TYPE",
      "STATUS",
      "DAM_LENGTH",
      "DAM_HEIGHT",
      "SOURCE_INFORMATION",
      //"FEATURE_AREA",
      "A_GOVERNORATE_NAME",
      "E_GOVERNORATE_NAME",
      "A_REGION_NAME",
      "E_REGION_NAME",
      "SECTOR_NO",
    ],
    aliasOutFields: [
      //"الاسم",
      //"Name",
      "الغرض من السد",
      "نوع السد",
      "حالة السد",
      "طول السد",
      "ارتفاع السد",
      "المصدر",
      //"المساحة (م2)",
      "اسم المحافظة",
      "Governorate name",
      "اسم المنطقة",
      "Region name",
      "القطاع",
    ],
    isSearchable: true,
  },
  Valley_Basins: {
    name: "حرم مسارات الأودية",
    nameEn: "Valley Basins",
    searchFields: [
      { field: "A_GOVERNORATE_NAME", alias: "اسم المحافظة" },
      { field: "SECTOR_NO", alias: "القطاع" },
      { field: "DANGER_DGREE", alias: "درجة الخطورة" },
      { field: "A_NAME", alias: "الاسم", isSearch: true },
    ],
    outFields: [
      "OBJECTID",
      "A_NAME",
      "E_NAME",
      "DANGER_DGREE",
      "SOURCE",
      "FEATURE_AREA",
      "A_GOVERNORATE_NAME",
      "E_GOVERNORATE_NAME",
      "A_REGION_NAME",
      "E_REGION_NAME",
      "SECTOR_NO",
    ],
    aliasOutFields: [
      "الاسم",
      "Name",
      "درجة الخطورة",
      "المصدر",
      "المساحة (م2)",
      "اسم المحافظة",
      "Governorate name",
      "اسم المنطقة",
      "Region name",
      "القطاع",
    ],
    isSearchable: true,
  },
  Geology: {
    name: "جيولوجيا",
    nameEn: "Geology",
    outFields: ["OBJECTID"],
    aliasOutFields: [],
  },
  Green_Area_p: {
    name: "Green_Area_p",
    nameEn: "Green Area",
    outFields: [
      "OBJECTID",
      "A_NAME",
      "E_NAME",
      "SOURCE",
      "FEATURE_AREA",
      "A_GOVERNORATE_NAME",
      "E_GOVERNORATE_NAME",
      "A_REGION_NAME",
      "E_REGION_NAME",
      "SECTOR_NO",
    ],
    aliasOutFields: [
      "الاسم",
      "Name",
      "المصدر",
      "المساحة (م2)",
      "اسم المحافظة",
      "Governorate name",
      "اسم المنطقة",
      "Region name",
      "القطاع",
    ],
  },
  Natural_Reserves: {
    name: "محميات طبيعية",
    nameEn: "Natura Reserves",
    searchFields: [
      { field: "A_GOVERNORATE_NAME", alias: "اسم المحافظة" },
      { field: "SECTOR_NO", alias: "القطاع" },
      { field: "RESERVE_TYPE", alias: "نوع المحمية" },
      { field: "A_NAME", alias: "الاسم", isSearch: true },
    ],
    outFields: [
      "OBJECTID",
      "A_REGION_NAME",
      // "E_REGION_NAME",
      "SECTOR_NO",
      "A_GOVERNORATE_NAME",
      // "E_GOVERNORATE_NAME",
      "A_NAME",
      // "E_NAME",
      "SOURCE",
      "RESERVE_TYPE",

    ],
    aliasOutFields: [
      "اسم المنطقة",
      // "Region name",
      "القطاع",
      "اسم المحافظة",
      // "Governorate name",
      "الاسم",
      // "Name",
      "المصدر",
      "نوع المحمية",

    ],
    isSearchable: true,
  },
  Gardens: {
    name: "حدائق",
    nameEn: "Gardens",
    searchFields: [
      { field: "A_GOVERNORATE_NAME", alias: "اسم المحافظة" },
      { field: "SECTOR_NO", alias: "القطاع" },
      { field: "A_NAME", alias: "الاسم", isSearch: true },
    ],
    outFields: [
      "OBJECTID",
      "A_REGION_NAME",
      // "E_REGION_NAME",
      "SECTOR_NO",
      "A_GOVERNORATE_NAME",
      // "E_GOVERNORATE_NAME",
      "A_NAME",
      // "E_NAME",
      "SOURCE",
      "FEATURE_AREA",

    ],
    aliasOutFields: [
      "اسم المنطقة",
      // "Region name",
      "القطاع",
      "اسم المحافظة",
      // "Governorate name",
      "الاسم",
      // "Name",
      "المصدر",
      "المساحة (م2)",

    ],
    isSearchable: true,
  },
  Farms: {
    name: "المزارع",
    nameEn: "Farms",
    searchFields: [
      { field: "A_GOVERNORATE_NAME", alias: "اسم المحافظة" },
      { field: "SECTOR_NO", alias: "القطاع" },
      { field: "A_NAME", alias: "الاسم", isSearch: true },
    ],
    outFields: [
      "OBJECTID",
      "A_REGION_NAME",
      // "E_REGION_NAME",
      "SECTOR_NO",
      "A_GOVERNORATE_NAME",
      // "E_GOVERNORATE_NAME",
      "A_NAME",
      // "E_NAME",
      "SOURCE",
      "FEATURE_AREA",

    ],
    aliasOutFields: [
      "اسم المنطقة",
      // "Region name",
      "القطاع",
      "اسم المحافظة",
      // "Governorate name",
      "الاسم",
      // "Name",
      "المصدر",
      "المساحة (م2)",

    ],
    isSearchable: true,
  },

  'Green Areas': {
    name: "المناطق الخضراء",
    nameEn: "Green Area",
    outFields: [
      "OBJECTID",
      "A_NAME",
      "E_NAME",
      "SOURCE",
      "FEATURE_AREA",
      "A_GOVERNORATE_NAME",
      "E_GOVERNORATE_NAME",
      "A_REGION_NAME",
      "E_REGION_NAME",
      "SECTOR_NO",
    ],
    aliasOutFields: [
      "الاسم",
      "Name",
      "المصدر",
      "المساحة (م2)",
      "اسم المحافظة",
      "Governorate name",
      "اسم المنطقة",
      "Region name",
      "القطاع",
    ],
    isSearchable: false,
  },
  'Vegetation Cover': {
    name: "الغطاء النباتي",
    nameEn: "Vegetation Cover",
    outFields: [
      "OBJECTID",
      "CLASSIFICATION_TYPE_ARABIC",
      "REGION",
    ],
    aliasOutFields: [
      "نوع_التصنيف_بالعربي",
      "المنطقة",
    ],
    isSearchable: false,
  },
  Governorate_Boundary: {
    name: "حدود المحافظات",
    nameEn: "Governorate Boundaries",
    searchFields: [
      { field: "A_GOVERNORATE_NAME", alias: "اسم المحافظة", isSearch: true },
    ],
    outFields: [
      "OBJECTID",
      "A_REGION_NAME",
      // "E_REGION_NAME",
      "SECTOR_NO",
      "A_GOVERNORATE_NAME",
      // "E_GOVERNORATE_NAME",
      "FEATURE_AREA",
      // "CODE",

    ],
    aliasOutFields: [
      "اسم المنطقة",
      // "Region name",
      "رقم القطاع",
      "اسم المحافظة",
      // "Governorate name",
      "المساحة (م2)",
      // "كود المحافظة",
    ],
  },
  Sectors: {
    name: "القطاعات",
    nameEn: "Sectors",
    searchFields: [
      { field: "A_GOVERNORATE_NAME", alias: "اسم المحافظة" },
      { field: "SECTOR_NO", alias: "رقم القطاع", isSearch: true },
    ],
    outFields: [
      "OBJECTID",
      "A_REGION_NAME",
      // "E_REGION_NAME",
      "SECTOR_NO",

      "FEATURE_AREA",
    ],
    aliasOutFields: [
      "اسم المنطقة",
      // "Region name",
      "رقم القطاع",
      "المساحة (م2)",
    ],
  },
  Region_Boundary: {
    name: "حدود المناطق",
    nameEn: "Region Boundary",
    outFields: [
      "OBJECTID",
      "A_NAME",
      //  "E_NAME",
      "FEATURE_AREA",
      // "CODE"
    ],
    aliasOutFields: [
      "اسم المنطقة",
      // "Region name",
      "المساحة (م2)",
      // "كود المنطقة",
    ],
  },


  Governorate_Center: {
    name: "منتصف المحافظات",
    nameEn: "Governorate Center",
    outFields: [
      "OBJECTID",
      "A_GOVERNORATE_NAME",
      "E_GOVERNORATE_NAME",
      "SECTOR_NO",
      "FEATURE_AREA",
      "CODE",
      "A_REGION_NAME",
      "E_REGION_NAME",
    ],
    aliasOutFields: [
      "اسم المحافظة",
      "Governorate name",
      "رقم القطاع",
      "المساحة (م2)",
      "كود المحافظة",
      "اسم المنطقة",
      "Region name",
    ],
  },
  Farms_Points: {
    name: "نقاط المزارع",
    nameEn: "Farms Points",
    outFields: [
      "OBJECTID",
      "A_REGION_NAME",
      // "E_REGION_NAME",
      "SECTOR_NO",
      "A_GOVERNORATE_NAME",
      // "E_GOVERNORATE_NAME",
      "A_NAME",
      // "E_NAME",
      "SOURCE",
      "FEATURE_AREA",

    ],
    aliasOutFields: [
      "اسم المنطقة",
      // "Region name",
      "القطاع",
      "اسم المحافظة",
      // "Governorate name",
      "الاسم",
      // "Name",
      "المصدر",
      "المساحة (م2)",

    ],
  },
  Gardens_Points: {
    name: "نقاط الحدائق",
    nameEn: "Gardens Points",
    outFields: [
      "OBJECTID",
      "A_REGION_NAME",
      // "E_REGION_NAME",
      "SECTOR_NO",
      "A_GOVERNORATE_NAME",
      // "E_GOVERNORATE_NAME",
      "A_NAME",
      // "E_NAME",
      "SOURCE",
      "FEATURE_AREA",

    ],
    aliasOutFields: [
      "اسم المنطقة",
      // "Region name",
      "القطاع",
      "اسم المحافظة",
      // "Governorate name",
      "الاسم",
      // "Name",
      "المصدر",
      "المساحة (م2)",

    ],
  },
  Cornich_Points: {
    name: "نقاط الكورنيش",
    nameEn: "Cornich Points",
    outFields: [
      "OBJECTID",
      "A_REGION_NAME",
      // "E_REGION_NAME",
      "SECTOR_NO",
      "A_GOVERNORATE_NAME",
      // "E_GOVERNORATE_NAME",
      "A_NAME",
      // "E_NAME",
      "TYPE",
      "SOURCE",

      "FEATURE_AREA",

    ],
    aliasOutFields: [
      "اسم المنطقة",
      // "Region name",
      "القطاع",
      "اسم المحافظة",
      // "Governorate name",
      "الاسم",
      // "Name",
      "نوع الكورنيش",
      "المصدر",
      "المساحة (م2)",
    ]
  },
  Parks_Points: {
    name: "نقاط المنتزهات",
    nameEn: "Parks Points",
    outFields: [
      "OBJECTID",
      "A_REGION_NAME",
      // "E_REGION_NAME",
      "SECTOR_NO",
      "A_GOVERNORATE_NAME",
      // "E_GOVERNORATE_NAME",
      "A_NAME",
      // "E_NAME",
      "SOURCE",
      "FEATURE_AREA",

    ],
    aliasOutFields: [
      "اسم المنطقة",
      // "Region name",
      "القطاع",
      "اسم المحافظة",
      // "Governorate name",
      "الاسم",
      // "Name",
      "المصدر",
      "المساحة (م2)",
    ],
  },
  Walkway_Points: {
    name: "نقاط الممشى",
    nameEn: "Walkway Points",
    outFields: [
      "OBJECTID",
      "A_REGION_NAME",
      // "E_REGION_NAME",
      "SECTOR_NO",
      "A_GOVERNORATE_NAME",
      // "E_GOVERNORATE_NAME",
      "A_NAME",
      // "E_NAME",
      "SOURCE",
      "FEATURE_AREA",
    ],
    aliasOutFields: [
      "اسم المنطقة",
      // "Region name",
      "القطاع",
      "اسم المحافظة",
      // "Governorate name",
      "الاسم",
      // "Name",
      "المصدر",
      "المساحة (م2)",
    ],
  },
  INDICATORS: {
    name: "المؤشرات",
    nameEn: "INDICATORS",

    editFields: [
      { name: "YEAR", alias: 'احصائيات لسنة', type: 'list', lists: [1443] },
      { name: 'A_REGION_NAME', alias: 'اسم المنطقة', type: 'list' },
      { name: 'SECTOR_NO', alias: 'القطاع', type: 'list', isNotMandatory: true },
      { name: 'A_GOVERNORATE_NAME', alias: 'اسم المحافظة', type: 'list', isNotMandatory: true },
      { name: 'TREES', alias: 'مساحة الأشجار (كم2)' },
      { name: 'SHRUBLANDS', alias: 'مساحة الشجيرات (كم2)' },
      { name: 'GRASSLANDS', alias: 'مساحة المراعي (كم2)' },
      { name: 'CROPLANDS', alias: 'مساحة الزراعات (كم2)' },
      { name: 'MANGROVES', alias: 'مساحة المانجروف (كم2)' },
      { name: 'LU_AREA', alias: 'مجموع مساحة الغطاء النباتي (كم2)', isDisabled: true },
      { name: 'URBAN_AREAS', alias: "المناطق الحضرية (كم2)" },
      { name: 'BARE_SOIL', alias: "المناطق الصحراوية (كم2)" },
      { name: 'WATER_BODIES', alias: "الأجسام المائية (كم2)" },
      { name: 'WETLAND', alias: "الأراضي الرطبة (كم2)" },
      { name: 'TOTAL_AREA', alias: 'المساحة الكلية (كم2)', isDisabled: true },
      { name: 'LU_VS_TOTAL', alias: "نسبة الغطاء النباتي الى المساحة الكلية %", isDisabled: true },
      { name: 'POPULATION', alias: "عدد السكان" },
      { name: 'INDIVIDUAL_SHARE', alias: "نصيب الفرد من الغطاء النباتي (م)", isDisabled: true }
    ],

    outFields: [
      "TREES",
      "SHRUBLANDS",
      "GRASSLANDS",
      "CROPLANDS",
      "MANGROVES",
      "LU_AREA",
      "URBAN_AREAS",
      "BARE_SOIL",
      "WATER_BODIES",
      "WETLAND",
      "TOTAL_AREA",
      "LU_VS_TOTAL",
      "POPULATION",
      "INDIVIDUAL_SHARE",
      "YEAR"
    ],

    aliasOutFields: [
      'مساحة الأشجار (كم2)',
      'مساحة الشجيرات (كم2)',
      'مساحة المراعي (كم2)',
      'مساحة الزراعات (كم2)',
      'مساحة المانجروف (كم2)',
      "مجموع مساحة الغطاء النباتي (كم2)",
      "المناطق الحضرية (كم2)",
      "المناطق الصحراوية (كم2)",
      "الأجسام المائية (كم2)",
      "الأراضي الرطبة (كم2)",
      "المساحة الكلية (كم2)",
      "نسبة الغطاء النباتي الى المساحة الكلية",
      "عدد السكان",
      "نصيب الفرد من الغطاء النباتي (م)",
      "احصائيات لسنة"
    ],
  },


};
export const tabsTitle = [
  { name: "منتزه", layerName: "Parks", icon: motnzhat, id: 0 },
  { name: "ممشي", layerName: "Walkway", icon: mamsha, id: 1 },
  { name: "كورنيش", layerName: "Cornich", icon: kornesh, id: 2 },

  { name: "حديقة", layerName: "Gardens", icon: gardens, id: 3 },
  { name: "مزرعة", layerName: "Farms", icon: mzar3, id: 4 },
  {
    name: "محمية طبيعية",
    layerName: "Natural_Reserves",
    icon: m7mya,
    id: 5,
  },
];

export const dashboardTabsTitle = [
  {
    alias: "المانجروف", name: "MANGROVES", id: 0, icon: MngrofImg, type: "double",
    color: [114, 140, 0],
    colorHex: '#727200',
    order: 4
  },
  {
    alias: "المراعي", name: "GRASSLANDS", id: 1, icon: Mra3yImg, type: "double",
    color: [46, 115, 95],
    colorHex: '#2E735F',
    order: 2
  },
  {
    alias: "الزراعات", name: "CROPLANDS", id: 2, icon: Zra3atImg, type: "double",
    color: [188, 233, 84],
    colorHex: '#BCE954',
    order: 0
  },
  {
    alias: "الشجيرات", name: "SHRUBLANDS", id: 3, icon: MiniTreesImg, type: "double",
    color: [153, 198, 142],
    colorHex: '#99C68E',
    order: 1
  },
  {
    alias: "الأشجار", name: "TREES", id: 4, icon: TreesImg, type: "double",
    color: [37, 134, 23],
    colorHex: '#258617',
    order: 3
  },

];
/*
export const barChartFields = [{
  name: "TREES",
  alias: "الأشجار",
  type: "double",
  color: [37, 134, 23]
},
{
  name: "SHRUBLANDS",
  alias: "الشجيرات",
  type: "double",
  color: [153, 198, 142]
}, {
  name: "CROPLANDS",
  alias: "الزراعات",
  type: "double",
  color: [188, 233, 84]
}, {
  name: "GRASSLANDS",
  alias: "المراعي",
  type: "double",
  color: [87, 86, 34]
}, {
  name: "MANGROVES",
  alias: "المانجروف",
  type: "double",
  color: [114, 140, 0]
}];*/