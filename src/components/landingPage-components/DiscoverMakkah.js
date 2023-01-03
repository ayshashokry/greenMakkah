import React, { useEffect, useState } from "react";
import Explorer from "../../pages/explorerPages/Explorer";
import { Row, Col, Spin } from "antd";
import { Container } from "react-bootstrap";
import greenLocation from "../../assets/images/landingImages/makkahLocationGreen.svg";
import grayLocation from "../../assets/images/landingImages/makkahLocationGray.svg";
import { Link } from "react-router-dom";
import { mapUrl } from "../../config";
import {
  getFeatureDomainName,
  getLayerId,
  highlightFeature,
  queryTask,
  showLoading,
  zoomToFeatureByObjectId,
} from "../../helper/common_func";
export default function DiscoverMakkah(props) {
  const [cities, setCities] = useState([]);
  const [map, setMap] = useState(null);
  const [activeCity, setActiveCity] = useState("");
  const [selectGovFilter, setSelectGovFilter] = useState(null);
  const [isShowLoading, setShowLoading] = useState(false);
  const onSelectCity = (c) => {
    setActiveCity(c.id);

    setSelectGovFilter("A_GOVERNORATE_NAME = '" + c.govCode + "'");
    zoomToFeatureByObjectId(c, map, true, (feature) => {
      if (!c.geometry) c.geometry = feature.geometry;

      highlightFeature(c, map, {
        layerName: "ZoomGraphicLayer",
        isZoom: true,
        notExpandLevel: true,
        zoomDuration: 1000,
        isHighlighPolygonBorder: true,
      });
    });
  };

  const setMapLoaded = (map) => {
    setMap(map);
    setShowLoading(true);

    let layerdId = getLayerId(map.__mapInfo, "Governorate_Boundary");
    queryTask({
      url: mapUrl + "/" + layerdId,
      outFields: ["A_GOVERNORATE_NAME", "OBJECTID"],
      where: "1=1",
      notShowLoading: true,
      returnGeometry: false,
      callbackResult: ({ features }) => {
        if (features.length > 0) {
          getFeatureDomainName(features, layerdId, false, mapUrl).then(
            (res) => {
              setShowLoading(false);
              setCities(
                res.map((item) => {
                  return {
                    name: item.attributes.A_GOVERNORATE_NAME,
                    govCode: item.attributes.A_GOVERNORATE_NAME_Code,
                    id: item.attributes.OBJECTID,
                    OBJECTID: item.attributes.OBJECTID,
                    layerName: "Governorate_Boundary",
                  };
                })
              );
            }
          );
        }
      },
    });
  };

  return (
    <div className="discoverMakkah"  ref={props.section2Ref}>
      <div className="discoverMakkahHeader">
        <h5>اكتشف مكة المكرمة ومحافظتها</h5>
        <p>
          يوفر مستكشف أخضر مكة للمواطنين و المستخدمين البحث عن الأماكن الخضراء
          المتاحة في قاعدة البيانات الجغرافية
        </p>
      </div>
      <div className="landingExplorer">
        <Explorer homePageProp
          selectGovFilter={selectGovFilter}
          isPublic={true}
          setMapLoaded={setMapLoaded}
        />
      </div>{" "}
      {isShowLoading && (
        <div className="loadingPortalStyle">
          <Spin size="large" />
        </div>
      )}
      <Container fluid className="makkahCities">
        <Row>
          {cities.map((c) => (
            <Col
              sm={{ span: 12 }}
              xs={{ span: 12 }}
              md={{ span: 6 }}
              lg={{ span: 4 }}
              style={{ textAlign: "right" }}
            >
              <p
                id={c.id}
                onClick={() => onSelectCity(c)}
                className={activeCity === c.id ? "activeCity" : ""}
              >
                <img
                  alt="cityLocation"
                  src={activeCity === c.id ? greenLocation : grayLocation}
                />
                {c.name}
              </p>
            </Col>
          ))}
        </Row>
      </Container>{" "}
      <div className=" py-4" style={{ textAlign: "center" }}>
        <p className="showNews my-4">
          لاستخدام مستكشف اخضر مكة
          <Link
            to="/explorer"
            className="clickHereLink clickHereLinkMakkah mx-2"
          >
            اضغط هنا
          </Link>
        </p>
      </div>
    </div>
  );
}
