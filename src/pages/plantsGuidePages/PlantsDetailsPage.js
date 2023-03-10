import React, { useEffect, useState } from "react";
import { ApiUrl, hostUrl } from "../../config";
import axios from "axios";
import { Row, Col, Select, Card } from "antd";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import NavBar from "../../layouts/NavBar";
import Footer from "../../layouts/Footer";
import Loader from "../../layouts/Loader";
import Fade from "react-reveal";
import defaultImg from "../../assets/images/plantsImages/noImg.png";
import "./plants.css";
export default function PlantsDetailsPage(props) {
  const [loading, setLoading] = useState(false);
  const [envirotypeArray, setEnviroTypeArray] = useState([]);
  const [irrigationArray, setArrigArray] = useState([]);
  const [growthSpeedArray, setgrowthSpeedArray] = useState([]);
  const [fruitType, setfruitType] = useState([]);
  const [flowerColor, setflowerColor] = useState([]);
  const [flowerSmell, setflowerSmell] = useState([]);
  const [toxicity, setToxicity] = useState([]);
  const [plantDetails, setPlantDetails] = useState({});
  let paramsId = useParams();
  useEffect(() => {
    setLoading(true);
    document.body.scrollTo(0, 0);

    axios
      .get(`${ApiUrl}/Plant/${paramsId.id}`)
      .then((res) => {
        setPlantDetails(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });

    axios.get(`${ApiUrl}/Lookup/GrowthSpeed`).then((res) => {
      setgrowthSpeedArray(res.data);
    });
    axios.get(`${ApiUrl}/Lookup/ToxicityCategory`).then((res) => {
      setToxicity(res.data);
    });
    axios.get(`${ApiUrl}/Lookup/FlowerSmellCategory`).then((res) => {
      setflowerSmell(res.data);
    });
    axios.get(`${ApiUrl}/Lookup/FlowerColor`).then((res) => {
      setflowerColor(res.data);
    });
    axios.get(`${ApiUrl}/Lookup/FruitType`).then((res) => {
      setfruitType(res.data);
    });
    axios.get(`${ApiUrl}/Lookup/Biome`).then((res) => {
      setEnviroTypeArray(res.data);
    });

    axios.get(`${ApiUrl}/Lookup/IrrigationNeed`).then((res) => {
      setArrigArray(res.data);
    });
  }, []);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${ApiUrl}/Plant/${window.location.pathname.slice(26)}`)
      .then((res) => {
        setPlantDetails(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [paramsId.id]);
  return (
    <>
      <NavBar />
      {loading ? (
        <Loader />
      ) : (
        <div className="newsDetailsPage  plantsPage ">
          <div className="pageHeader mb-5">
            {/* <div className="headLinks">
            <Link to="/"> ???????????????? </Link> <span>{">"}</span>
            <Link to="/">???????????? ???????????????? </Link> <span>{">"}</span>
            <Link to="/" className="activeLink">
            </Link>
          </div> */}
            <h3 className="headerH3 my-2">{plantDetails.name}</h3>
          </div>
          <Container fluid className="mt-5  plantsSlider">
            <Fade right>
              {plantDetails.images !== undefined &&
                plantDetails.images.length > 0 && (
                  <div className="plantsCarouselItem ">
                    <img
                      src={
                        plantDetails.images.length > 0
                          ? `${hostUrl + plantDetails.images[0].path}`
                          : defaultImg
                      }
                      alt="newsImage"
                    />
                  </div>
                )}
            </Fade>
            <Container>
              <Row className="my-4 plantDetailsContainer" justify="center">
                <Col
                  lg={{ span: 6 }}
                  md={{ span: 12 }}
                  sm={{ span: 12 }}
                  xs={{ span: 24 }}
                >
                  <div className="enviroConditions detailCardData">
                    <h5 className="pt-3">???????????? ??????????????</h5>
                    <h6>?????????? ??????????</h6>
                    <p>
                      {/* {plantDetails.plantBiomes.map(
                      (b) =>
                        envirotypeArray.filter((i) => i.id === b.biomeId)[0]
                          .name
                    )} */}
                      {plantDetails.plantBiomes !== undefined &&
                        plantDetails.plantBiomes
                          .map(
                            (b) =>
                              envirotypeArray.filter(
                                (i) => i.id === b.biomeId
                              )[0] !== undefined &&
                              envirotypeArray.filter(
                                (i) => i.id === b.biomeId
                              )[0].name
                          )
                          .join(" - ")}
                    </p>
                    <h6>?????????? ??????????</h6>
                    <p>
                      {growthSpeedArray.filter(
                        (i) => i.id == plantDetails.growthSpeedId
                      )[0] !== undefined
                        ? growthSpeedArray.filter(
                            (i) => i.id == plantDetails.growthSpeedId
                          )[0].name
                        : "???? ????????"}
                    </p>
                    <h6>???????????????? ????????</h6>
                    <p>
                      {irrigationArray.filter(
                        (i) => i.id == plantDetails.irrigationNeedId
                      )[0] !== undefined
                        ? irrigationArray.filter(
                            (i) => i.id == plantDetails.irrigationNeedId
                          )[0].name
                        : "???? ????????"}
                    </p>
                  </div>
                </Col>{" "}
                <Col
                  lg={{ span: 6 }}
                  md={{ span: 12 }}
                  sm={{ span: 12 }}
                  xs={{ span: 24 }}
                >
                  <div className="growthNature detailCardData">
                    <h5 className="pt-3">?????????? ??????????</h5>
                    <h6>?????? ????????</h6>
                    <p>{plantDetails.shadowWidth}</p> <h6>?????? ??????????????</h6>
                    <p>
                      {" "}
                      {fruitType.filter(
                        (i) => i.id == plantDetails.fruitTypeId
                      )[0] !== undefined
                        ? fruitType.filter(
                            (i) => i.id == plantDetails.fruitTypeId
                          )[0].name
                        : "???? ????????"}
                    </p>{" "}
                    <h6>????????????????</h6>
                    <p>{plantDetails.height}</p>
                  </div>
                </Col>{" "}
                <Col
                  lg={{ span: 6 }}
                  md={{ span: 12 }}
                  sm={{ span: 12 }}
                  xs={{ span: 24 }}
                >
                  <div className="flowerProp  detailCardData">
                    <h5 className="pt-3">?????????????? ??????????????</h5>
                    <h6>??????????</h6>
                    <p>
                      {" "}
                      {flowerColor.filter(
                        (i) => i.id == plantDetails.flowerColorId
                      )[0] !== undefined
                        ? flowerColor.filter(
                            (i) => i.id == plantDetails.flowerColorId
                          )[0].name
                        : "???? ????????"}
                    </p>{" "}
                    <h6>??????????????</h6>
                    <p>
                      {" "}
                      {flowerSmell.filter(
                        (i) => i.id == plantDetails.flowerSmellCategoryId
                      )[0] !== undefined
                        ? flowerSmell.filter(
                            (i) => i.id == plantDetails.flowerSmellCategoryId
                          )[0].name
                        : "???? ????????"}
                    </p>
                    <h6>???????? ??????????????</h6>
                    <p>
                      ???? ?????? {plantDetails.floweringMonthStart} ?????? ??????
                      {plantDetails.floweringMonthEnd}
                    </p>
                  </div>
                </Col>
                <Col
                  lg={{ span: 6 }}
                  md={{ span: 12 }}
                  sm={{ span: 12 }}
                  xs={{ span: 24 }}
                >
                  <div className="fruitProp detailCardData">
                    <h5 className="pt-3">?????????????? ????????????</h5>
                    <h6>????????????</h6>
                    <p>
                      {" "}
                      {toxicity.filter(
                        (i) => i.id == plantDetails.toxicityCategoryId
                      )[0] !== undefined
                        ? toxicity.filter(
                            (i) => i.id == plantDetails.toxicityCategoryId
                          )[0].name
                        : "???? ????????"}
                    </p>{" "}
                    <h6>?????????? ??????????</h6>
                    <p>
                      {plantDetails.isBeeFriendly
                        ? "???????????? ??????????"
                        : "?????? ???????????? ??????????"}
                    </p>
                  </div>
                </Col>
              </Row>
            </Container>
          </Container>
        </div>
      )}
      <Footer />
    </>
  );
}
