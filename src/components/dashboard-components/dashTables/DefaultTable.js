import React from "react";
import { Table } from "react-bootstrap";
export default function DefaultTable(props) {
  return (
    <div className="mt-5">
      {props.data && (
        <Table responsive className="dashDefaultTable mt-5 mb-3 ">
          <thead>
            <tr>
              <th>المانجروف</th>
              <th>الزراعات</th>
              <th>المراعي</th>
              <th>الشجيرات</th>
              <th>الاشجار</th>
              <th>المنطقة</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <>{props.data.attributes.MANGROVES} (كم2)</>
                <span className="pr-5">
                  {(
                    (props.data.attributes.MANGROVES /
                      props.data.attributes.LU_AREA) *
                    100
                  ).toFixed(2)}
                  %
                </span>
              </td>
              <td>
                <>{props.data.attributes.CROPLANDS} (كم2)</>
                <span className="pr-5">
                  {(
                    (props.data.attributes.CROPLANDS /
                      props.data.attributes.LU_AREA) *
                    100
                  ).toFixed(2)}
                  %
                </span>
              </td>
              <td>
                <>{props.data.attributes.GRASSLANDS} (كم2)</>
                <span className="pr-5">
                  {(
                    (props.data.attributes.GRASSLANDS /
                      props.data.attributes.LU_AREA) *
                    100
                  ).toFixed(2)}
                  %
                </span>
              </td>
              <td>
                <>{props.data.attributes.SHRUBLANDS} (كم2)</>
                <span className="pr-5">
                  {(
                    (props.data.attributes.SHRUBLANDS /
                      props.data.attributes.LU_AREA) *
                    100
                  ).toFixed(2)}
                  %
                </span>
              </td>
              <td>
                <>{props.data.attributes.TREES} (كم2)</>
                <span className="pr-5">
                  {(
                    (props.data.attributes.TREES /
                      props.data.attributes.LU_AREA) *
                    100
                  ).toFixed(2)}
                  %
                </span>
              </td>
              <td>مكة المكرمة</td>
            </tr>
          </tbody>
        </Table>
      )}
    </div>
  );
}
