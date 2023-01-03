import React from "react";
import { Table } from "react-bootstrap";
import { groupBy } from "../../../helper/common_func";
export default function GovernTable(props) {

  debugger
  const sectors = groupBy(props.data, "SECTOR_NO_Code");
  const fields = ["MANGROVES", "CROPLANDS", "GRASSLANDS", "SHRUBLANDS", "TREES"];

  return (
    <div className="mt-5">

      <Table responsive className="dashDefaultTable my-3 ">
        <thead>
          <tr>
            <th>المانجروف</th>
            <th>الزراعات</th>
            <th>المراعي</th>
            <th>الشجيرات</th>
            <th>الاشجار</th>
            <th>المحافظة</th>
            <th>القطاعات</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(sectors).map((key) => {
            return (<tr key={key}>
              {fields.map((field, i) => {
                return (<td key={i}>
                  <Table responsive style={{ borderCollapse: 'initial' }}>
                    {
                      sectors[key].map((feature, k) => {
                        return (

                          <tr>
                            <td>
                              <div>
                                <>{feature.attributes[field]} (كم2) </><span className="pr-5">{((feature.attributes[field] / feature.attributes.LU_AREA) * 100).toFixed(2)}%</span>
                              </div>
                            </td>
                          </tr>

                        )
                      })}
                  </Table>
                </td>)
              })}
              <td>
                <Table responsive>
                  {
                    sectors[key].map((feature) => {
                      return (
                        <tr>
                          <td><div>{feature.attributes.A_GOVERNORATE_NAME}</div></td>
                        </tr>
                      )
                    })
                  }
                </Table>
              </td>
              <td className="GovSectorTD">{sectors[key][0].attributes.SECTOR_NO}</td>
            </tr>)
          })}

        </tbody>
      </Table>
    </div>
  );
}
