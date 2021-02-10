import { Row, Col, Typography } from "antd";
import { ProfileOutlined } from "@ant-design/icons";
import React, { useContext, useEffect, useReducer } from "react";
import {
  itemPartConditionColumns,
  item_part_specification_detail_fields,
} from "../config/item";
import CustomTable from "../../../components/CustomTable";
import { sortData } from "../../../include/js/function_main";
import { ItemContext } from "../../../include/js/context";
import { mainReducer } from "../../../include/reducer";
const { Text } = Typography;

const PartSpecification = ({ id, partDetail }) => {
  const { readOnly, statePartDispatch } = useContext(ItemContext);
  const [state, stateDispatch] = useReducer(mainReducer, sortData(partDetail));

  const addNewRow = () => {
    statePartDispatch({
      type: "ADD_ROW_ARRAY_OBJ_DETAIL",
      payload: {
        headId: id,
        key: "item_part_specification_detail",
        data: item_part_specification_detail_fields,
      },
    });
  };
  const deleteRow = (rowId) => {
    statePartDispatch({
      type: "DEL_ROW_ARRAY_OBJ_DETAIL",
      payload: {
        headId: id,
        key: "item_part_specification_detail",
        rowId,
      },
    });
  };
  const onChangeValue = (id, data) => {
    stateDispatch({
      type: "CHANGE_DETAIL_VALUE",
      payload: {
        id: id,
        data: data,
      },
    });
  };
  const Save = (rowId) => {
    statePartDispatch({
      type: "CHANGE_OBJ_ARRAY_DETAIL_VALUE",
      payload: {
        headId: id,
        rowId,
        key: "item_part_specification_detail",
        data: state[rowId],
      },
    });
  };
  useEffect(() => {
    stateDispatch({
      type: "SET_DETAIL",
      payload: partDetail,
    });
  }, [partDetail.length]);
  console.log("PartSpec Detail :", partDetail, state);
  return (
    <>
      <Row className="col-2 row-margin-vertical  detail-tab-row">
        <Col span={7}>
          <Text strong style={{ fontSize: 16 }}>
            <ProfileOutlined style={{ marginRight: 10 }} /> Part Specification
          </Text>
        </Col>
        <Col span={6} className="text-left"></Col>
        <Col span={11} className="text-right"></Col>
      </Row>

      <CustomTable
        rowKey="id"
        rowClassName="row-table-detail"
        pageSize={10}
        focusLastPage={true}
        columns={itemPartConditionColumns(
          readOnly,
          onChangeValue,
          deleteRow,
          Save
        )}
        dataSource={state}
        readOnly={readOnly}
        onAdd={addNewRow}
      />
    </>
  );
};

export default React.memo(PartSpecification);
