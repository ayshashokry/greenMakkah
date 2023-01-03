import React, { useEffect, useState } from "react";
import { ApiUrl, hostUrl } from "../../config";
import axios from "axios";
import { Row, Col, Select, Card, Pagination, ConfigProvider } from "antd";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import NavBar from "../../layouts/NavBar";
import Footer from "../../layouts/Footer";
import Loader from "../../layouts/Loader";
import Fade from "react-reveal";
import defaultImg from "../../assets/images/plantsImages/noImg.png";
import locationIcon from "../../assets/images/plantsImages/locationIcon.png";
import irrIcon from "../../assets/images/plantsImages/irrIcon.png";
import beeIcon from "../../assets/images/plantsImages/beeIcon.png";
import everyGreenIcon from "../../assets/images/plantsImages/everyGreenIcon.png";

import "./plants.css";
export default function PlantsGuidePage(props) {
  const [loading, setLoading] = useState(false);
  const [envirotypeArray, setEnviroTypeArray] = useState([]);
  const [everyGreenArray, seteveryGreenArray] = useState([]);
  const [envirotype, setEnviroType] = useState(undefined);
  const [irrigationArray, setArrigArray] = useState([]);
  const [irrigationNeed, setIrrigNeed] = useState(undefined);
  const [plantTypeArray, setPlantTypeArray] = useState([]);
  const [plantType, setPlantType] = useState(undefined);
  const [allPlants, setAllPlants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [allResults, setallResults] = useState({});
  const handleChangePage = (page) => {
    setCurrentPage(page);
    setLoading(true);
    // document.body.scrollTo(0, 0);
    if (
      (allResults.paginationMetadata !== undefined &&
        allResults.paginationMetadata.nextLink !== "" &&
        allResults.paginationMetadata.nextLink !== undefined) ||
      (allResults.paginationMetadata.prevLink !== "" &&
        allResults.paginationMetadata.prevLink !== undefined)
    ) {
      axios
        .get(
          `${ApiUrl}/Plant?pageNumber=${page}&pageSize=9&plantTypeId=${window.location.pathname.slice(
            13,
            14
          )}`
        )
        .then((res) => {
          if (res.data) {
            setAllPlants(res.data.plants);
            setLoading(false);
            setallResults(res.data);
          }
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  };
  useEffect(() => {
    setLoading(true);
    setEnviroType(undefined);
    document.body.scrollTo(0, 0);
    axios.get(`${ApiUrl}/Lookup/EvergreenStatus`).then((res) => {
      seteveryGreenArray(res.data);
    });
    axios.get(`${ApiUrl}/Lookup/Biome`).then((res) => {
      setEnviroTypeArray(res.data.slice(0, 3));
    });
    axios.get(`${ApiUrl}/Lookup/PlantType`).then((res) => {
      setPlantTypeArray(res.data);
    });
    axios.get(`${ApiUrl}/Lookup/IrrigationNeed`).then((res) => {
      setArrigArray(res.data);
    });
    axios
      .get(
        `${ApiUrl}/Plant?pageSize=9&plantTypeId=${window.location.pathname.slice(
          13,
          14
        )}`
      )
      .then((res) => {
        setAllPlants(res.data.plants);
        setLoading(false);
        setallResults(res.data);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${ApiUrl}/Plant?pageSize=9&plantTypeId=${window.location.pathname.slice(
          13,
          14
        )}`
      )
      .then((res) => {
        setAllPlants(res.data.plants);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [window.location.pathname]);
  const handleSelectPlant = (e) => {
    var biomeIdString = "";
    var irrigationNeedString = "";
    setPlantType(e);
    axios
      .get(
        `${ApiUrl}/Plant?pageSize=9&irrigationNeedId=${
          irrigationNeed !== undefined ? irrigationNeed : irrigationNeedString
        }&biomeId=${
          envirotype !== undefined ? envirotype : biomeIdString
        }&plantTypeId=${e}`
      )
      .then((res) => {
        setAllPlants(res.data.plants);
        setLoading(false);
        setallResults(res.data);
        console.log(res.headers);
      });
  };
  const clearPlant = (e) => {
    var biomeIdString = "";
    var irrigationNeedString = "";
    setPlantType(e);
    axios
      .get(
        `${ApiUrl}/Plant?pageSize=9&irrigationNeedId=${
          irrigationNeed !== undefined ? irrigationNeed : irrigationNeedString
        }&biomeId=${
          envirotype !== undefined ? envirotype : biomeIdString
        }&plantTypeId=${window.location.pathname.slice(13, 14)}`
      )
      .then((res) => {
        setAllPlants(res.data.plants);
        setLoading(false);
        setallResults(res.data);
        console.log(res.headers);
      });
  };
  const handleSelectEnv = (e) => {
    // setLoading(true);
    var irrigationNeedString = "";

    setEnviroType(e);

    axios
      .get(
        `${ApiUrl}/Plant?pageSize=9&irrigationNeedId=${
          irrigationNeed !== undefined ? irrigationNeed : irrigationNeedString
        }&biomeId=${e}&plantTypeId=${
          plantType !== undefined
            ? plantType
            : window.location.pathname.slice(13, 14)
        }`
      )
      .then((res) => {
        setAllPlants(res.data.plants);
        setLoading(false);
        setallResults(res.data);
        console.log(res.headers);
      });
  };
  const handleSelectIrr = (e) => {
    // setLoading(true);
    var biomeIdString = "";

    setIrrigNeed(e);

    axios
      .get(
        `${ApiUrl}/Plant?pageSize=9&irrigationNeedId=${e}&biomeId=${
          envirotype !== undefined ? envirotype : biomeIdString
        }&plantTypeId=${
          plantType !== undefined
            ? plantType
            : window.location.pathname.slice(13, 14)
        }`
      )
      .then((res) => {
        setAllPlants(res.data.plants);
        setLoading(false);
        setallResults(res.data);
        console.log(res.headers);
      });
  };
  const clearIrr = (e) => {
    var biomeIdString = "";
    var irr = "";
    setIrrigNeed(undefined);

    axios
      .get(
        `${ApiUrl}/Plant?pageSize=9&irrigationNeedId=${irr}&biomeId=${
          envirotype !== undefined ? envirotype : biomeIdString
        }&plantTypeId=${
          plantType !== undefined
            ? plantType
            : window.location.pathname.slice(13, 14)
        }`
      )
      .then((res) => {
        setAllPlants(res.data.plants);
        setLoading(false);
        setallResults(res.data);
        console.log(res.headers);
      });
  };
  const clearEnv = (e) => {
    var irrigationNeedString = "";
    var biomeId = "";
    setEnviroType(undefined);
    axios
      .get(
        `${ApiUrl}/Plant?pageSize=9&irrigationNeedId=${
          irrigationNeed !== undefined ? irrigationNeed : irrigationNeedString
        }&biomeId=${biomeId}&plantTypeId=${
          plantType !== undefined
            ? plantType
            : window.location.pathname.slice(13, 14)
        }`
      )
      .then((res) => {
        setAllPlants(res.data.plants);
        setLoading(false);
        setallResults(res.data);
        console.log(res.headers);
      });
  };

  return (
    <>
      <NavBar />
      <div className="plantsPage">
        {loading ? <Loader /> : null}
        <div className="pageHeader mb-5">
          {/* <div className="headLinks">
            <Link to="/"> الرئيسية </Link> <span>{">"}</span>
            <Link to="/">المركز الإعلامي </Link> <span>{">"}</span>
            <Link to="/" className="activeLink">
            </Link>
          </div> */}
          <h3 className="headerH3 my-2">
            {plantTypeArray.length > 0 &&
              plantTypeArray.filter(
                (i) => i.id == window.location.pathname.slice(13, 14)
              ).length > 0 &&
              plantTypeArray.filter(
                (i) => i.id == window.location.pathname.slice(13, 14)
              )[0].name}
          </h3>
        </div>
        <Container>
          <Row className="plantsFilters" justify="center">
            <Col
              lg={{ span: 6 }}
              md={{ span: 12 }}
              sm={{ span: 12 }}
              xs={{ span: 24 }}
            >
              <Select
                allowClear
                className="dont-show"
                onChange={handleSelectEnv}
                value={envirotype}
                placeholder="نوع البيئة"
                getPopupContainer={(trigger) => trigger.parentNode}
                optionFilterProp="value"
                onClear={clearEnv}
                filterOption={(input, option) =>
                  option.value.indexOf(input) >= 0
                }
              >
                {envirotypeArray.map((s) => (
                  <Select.Option value={s.id}>{s.name}</Select.Option>
                ))}
              </Select>
            </Col>
            <Col
              lg={{ span: 6 }}
              md={{ span: 12 }}
              sm={{ span: 12 }}
              xs={{ span: 24 }}
            >
              <Select
                allowClear
                className="dont-show"
                onChange={handleSelectIrr}
                value={irrigationNeed}
                placeholder="احتياج الري"
                onClear={clearIrr}
                getPopupContainer={(trigger) => trigger.parentNode}
                optionFilterProp="value"
                filterOption={(input, option) =>
                  option.value.indexOf(input) >= 0
                }
              >
                {irrigationArray.map((s) => (
                  <Select.Option value={s.id}>{s.name}</Select.Option>
                ))}
              </Select>
            </Col>
            <Col
              lg={{ span: 6 }}
              md={{ span: 12 }}
              sm={{ span: 12 }}
              xs={{ span: 24 }}
            >
              <Select
                allowClear
                className="dont-show"
                onChange={handleSelectPlant}
                value={plantType}
                onClear={clearPlant}
                placeholder="نوع النبات"
                getPopupContainer={(trigger) => trigger.parentNode}
                optionFilterProp="value"
                filterOption={(input, option) =>
                  option.value.indexOf(input) >= 0
                }
              >
                {plantTypeArray.map((s) => (
                  <Select.Option value={s.id}>{s.name}</Select.Option>
                ))}
              </Select>
            </Col>
          </Row>
          <Row className="plantsCards" justify="center">
            {allPlants.map((p) => (
              <Col lg={{ span: 8 }} md={{ span: 12 }} sm={{ span: 24 }}>
                <Fade right>
                  <Link to={`/plantDetails/${p.id}`}>
                    <Card
                      className="newCard"
                      hoverable
                      // style={{ width: 240 }}
                      cover={
                        <div className="newCard-img">
                          <img
                            alt="new"
                            src={
                              p.mainImage !== null
                                ? `${hostUrl + p.mainImage.path}`
                                : defaultImg
                            }
                            className="newCardImg"
                          />
                        </div>
                      }
                    >
                      <Card.Meta
                        className="plantCardData"
                        description={
                          <div className="plantCard">
                            <h5>{p.name}</h5>
                            <p className="plantEnglishName">
                              ( {p.botanicalName})
                            </p>
                            <div className="plantCardDetails">
                              <p>
                                <span style={{ paddingLeft: "9px" }}>
                                  <img alt="icon" src={locationIcon} />
                                </span>
                                {p.plantBiomes !== undefined &&
                                  p.plantBiomes
                                    .map(
                                      (b) =>
                                        envirotypeArray.length > 0 &&
                                        envirotypeArray.filter(
                                          (i) => i.id === b.biomeId
                                        )[0] !== undefined &&
                                        envirotypeArray.length > 0 &&
                                        envirotypeArray.filter(
                                          (i) => i.id === b.biomeId
                                        )[0].name
                                    )
                                    .join(" - ")}
                              </p>
                              <p>
                                <span style={{ paddingLeft: "9px" }}>
                                  <img alt="icon" src={beeIcon} />
                                </span>
                                {p.isBeeFriendly
                                  ? "مناسبة للنحل"
                                  : "غير مناسبة للنحل"}
                              </p>
                              <p>
                                <span style={{ paddingLeft: "9px" }}>
                                  <img alt="icon" src={everyGreenIcon} />
                                </span>
                                {everyGreenArray.length > 0 &&
                                  everyGreenArray.filter(
                                    (i) => i.id === p.evergreenStatusId
                                  )[0].name}
                              </p>
                              <p>
                                <span style={{ paddingLeft: "9px" }}>
                                  <img alt="icon" src={irrIcon} />
                                </span>
                                {irrigationArray.length > 0 &&
                                  irrigationArray.filter(
                                    (i) => i.id === p.irrigationNeedId
                                  )[0].name}
                              </p>
                            </div>
                          </div>
                        }
                      />
                    </Card>
                  </Link>
                </Fade>
              </Col>
            ))}
          </Row>
          {allResults.paginationMetadata !== undefined &&
          allResults.paginationMetadata.nextLink == "" &&
          allResults.paginationMetadata.prevLink == "" ? null : (
            <ConfigProvider direction="ltr">
              <Pagination
                className="mt-4"
                current={currentPage}
                defaultCurrent={currentPage}
                pageSize={9}
                total={
                  allResults !== undefined &&
                  allResults.paginationMetadata !== undefined &&
                  allResults.paginationMetadata.totalPages !== undefined &&
                  Number(allResults.paginationMetadata.totalPages) * 9
                }
                onChange={handleChangePage}
                style={{ bottom: "0px" }}
              />
            </ConfigProvider>
          )}
        </Container>
      </div>
      <Footer />
    </>
  );
}
