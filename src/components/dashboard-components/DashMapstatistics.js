import React from "react";
import CountUp from "react-countup";
import Fade from "react-reveal/Fade";
import { Progress } from "antd";
import { dashboardTabsTitle } from "../../helper/layers"

export default function DashMapstatistics(props) {

  const info = props.dashBoardInfo;
  const personPercetange = ((info.INDIVIDUAL_SHARE / (info.LU_AREA * 1000)) * 100).toFixed(2);
  const treesPercetange = ((info.TREES / info.LU_AREA) * 100).toFixed(2);
  const greenPercetange = ((info.CROPLANDS / info.LU_AREA) * 100).toFixed(2);

  return (
    <Fade left>
      <ul className="dashMapStatistics">
        <li className="firstStat">
          <h3>
            <CountUp
              start={info.INDIVIDUAL_SHARE / 4}
              end={info.INDIVIDUAL_SHARE}
              duration={4}
              separator=" "
              decimals={2}
              delay={0}
              decimal=","
            >
              {({ countUpRef }) => (
                <div>
                  <span ref={countUpRef} />
                </div>
              )}
            </CountUp>
          </h3>
          <p className='statProgP'>
            <Progress type="dashboard"
              percent={personPercetange} width={80} />
          </p>
          <p style={{ fontSize: '14px' }}>نسبة الفرد من الغطاء النباتي (م2)</p>
        </li>
        <li className="secondStat">
          <h3>
            <CountUp
              start={info.LU_AREA / 4}
              end={info.LU_AREA}
              duration={4}
              separator=" "
              decimals={2}
              delay={0}
              decimal=","
            >
              {({ countUpRef }) => (
                <div>
                  <span ref={countUpRef} />
                </div>
              )}
            </CountUp>
          </h3>
          <p className='statProgP'>
            <Progress type="dashboard" percent={info.LU_VS_TOTAL} width={80} />
          </p>

          <p> المساحة الخضراء (كم2)</p>
        </li>

        {(props.activeDashBoardFields || dashboardTabsTitle).slice(0).reverse().map((item) => {
          return (
            <li className="thirdStat" style={{background:`rgba(${item.color[0]}, ${item.color[1]}, ${item.color[2]}, 0.4)`}}>
              <h3>
                <CountUp
                  start={info[item.name] * 1000 / 4}
                  end={info[item.name] * 1000}
                  duration={4}
                  separator=" "
                  decimals={2}
                  delay={0}
                  decimal=","
                >
                  {({ countUpRef }) => (
                    <div>
                      <span ref={countUpRef} />
                    </div>
                  )}
                </CountUp>
              </h3>

              <p>مساحات {item.alias}  (م2)</p>
            </li>)
        })}

      </ul>
    </Fade >
  );
}
