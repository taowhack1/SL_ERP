import { Row, Col, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomTable from "../../../../components/CustomTable";
import { sortData } from "../../../../include/js/function_main";

import { receiveSubDetailColumns } from "../../config/receiveConfig";

const ReceiveSubDetailTable = ({
  readOnly,
  subDetailData,
  addLine,
  delLine,
}) => {
  const locationList = useSelector(
    (state) => state.inventory.stock.item_location_shelf
  );
  const [state, setState] = useState(subDetailData);

  const onChangeValue = (id, data) => {
    setState(state.map((obj) => (obj.id === id ? { ...obj, ...data } : obj)));
  };
  console.log("subDetailData", state, subDetailData);
  console.log("locationList", locationList);
  return (
    <>
      <Row className="row-tab-margin-lg">
        <Col span={24}>
          <CustomTable
            columns={receiveSubDetailColumns(
              readOnly,
              onChangeValue,
              locationList,
              delLine
            )}
            dataSource={state}
            rowKey={"id"}
            size={"small"}
            rowClassName={"row-table-detail"}
            onAdd={addLine}
          />
        </Col>
      </Row>
    </>
  );
};

export default React.memo(ReceiveSubDetailTable);
