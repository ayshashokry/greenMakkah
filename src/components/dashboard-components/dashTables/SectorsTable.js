import React from "react";
import { Table } from "react-bootstrap";

export default function DefaultTable(props) {
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
            <th>القطاعات</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((feature) => {
            return (
              <tr>
                <td>
                  <>{feature.attributes.MANGROVES} (كم2)</>
                  <span className="pr-5">
                    {(
                      (feature.attributes.MANGROVES /
                        feature.attributes.LU_AREA) *
                      100
                    ).toFixed(2)}
                    %
                  </span>
                </td>
                <td>
                  <>{feature.attributes.CROPLANDS} (كم2)</>
                  <span className="pr-5">
                    {(
                      (feature.attributes.CROPLANDS /
                        feature.attributes.LU_AREA) *
                      100
                    ).toFixed(2)}
                    %
                  </span>
                </td>
                <td>
                  <>{feature.attributes.GRASSLANDS} (كم2)</>
                  <span className="pr-5">
                    {(
                      (feature.attributes.GRASSLANDS /
                        feature.attributes.LU_AREA) *
                      100
                    ).toFixed(2)}
                    %
                  </span>
                </td>
                <td>
                  <>{feature.attributes.SHRUBLANDS} (كم2)</>
                  <span className="pr-5">
                    {(
                      (feature.attributes.SHRUBLANDS /
                        feature.attributes.LU_AREA) *
                      100
                    ).toFixed(2)}
                    %
                  </span>
                </td>
                <td>
                  <>{feature.attributes.TREES} (كم2)</>
                  <span className="pr-5">
                    {(
                      (feature.attributes.TREES / feature.attributes.LU_AREA) *
                      100
                    ).toFixed(2)}
                    %
                  </span>
                </td>
                <td>{feature.attributes.SECTOR_NO}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
