import { Row, Col, Typography } from "antd";
import { ProfileOutlined } from "@ant-design/icons";
import React, { useContext, useEffect, useReducer } from "react";
import {
  itemPartConditionColumns,
  item_part_specification_detail_fields,
} from "../config/item";
import { reducer } from "../../production/reducers";
import CustomTable from "../../../components/CustomTable";
import { sortData } from "../../../include/js/function_main";
import { ItemContext } from "../../../include/js/context";
const { Text } = Typography;

const PartSpecification = ({ partId }) => {
  const { readOnly, PartDetailReducer } = useContext(ItemContext);
  const [state, stateDispatch] = useReducer(
    reducer,
    sortData(PartDetailReducer.data[partId])
  );

  const addNewRow = () => {
    stateDispatch({
      type: "ADD_ROW",
      payload: item_part_specification_detail_fields,
    });
    PartDetailReducer.addNewRow(item_part_specification_detail_fields, partId);
  };
  const deleteRow = (id) => {
    stateDispatch({
      type: "DEL_ROW",
      payload: {
        id: id,
      },
    });
    PartDetailReducer.deleteRow2D(partId, id);
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
  const Save = (id2) => {
    PartDetailReducer.onChangeDetailValue2D(partId, id2, state[id2]);
  };
  useEffect(() => {
    stateDispatch({
      type: "SET_DETAIL",
      payload: PartDetailReducer.data[partId],
    });
  }, [PartDetailReducer.data[partId].length]);
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
        pageSize={5}
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
