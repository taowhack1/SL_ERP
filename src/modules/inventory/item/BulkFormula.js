import { Row, Col, Typography } from "antd";
import { ProfileOutlined } from "@ant-design/icons";
import React, { useContext, useEffect, useReducer } from "react";
import { itemFormulaColumns, item_formula_detail_fields } from "../config/item";
import { reducer } from "../reducers";
import CustomTable from "../../../components/CustomTable";
import { ItemContext } from "../../../include/js/context";
import { sortData } from "../../../include/js/function_main";

const { Text } = Typography;

const BulkFormula = ({ partId }) => {
  const {
    FormulaReducer,
    readOnly,
    RMList,
    formulaPercent,
    sumPercent,
  } = useContext(ItemContext);
  const [state, stateDispatch] = useReducer(
    reducer,
    sortData(FormulaReducer.data[partId])
  );
  const addNewRow = () => {
    stateDispatch({
      type: "ADD_ROW",
      payload: item_formula_detail_fields,
    });
    FormulaReducer.addNewRow(item_formula_detail_fields, partId);
  };
  const onDelete = (id) => {
    stateDispatch({
      type: "DEL_ROW",
      payload: {
        id: id,
      },
    });
    FormulaReducer.deleteRow2D(partId, id);
    sumPercent(FormulaReducer.data, "item_formula_percent_qty");
  };
  const onChange = (id, data) => {
    stateDispatch({
      type: "CHANGE_DETAIL_VALUE",
      payload: {
        id: id,
        data: data,
      },
    });
  };
  const Save = (id2, keySave) => {
    FormulaReducer.onChangeDetailValue2D(partId, id2, state[id2]);
    keySave === "item_formula_percent_qty" &&
      sumPercent(FormulaReducer.data, "item_formula_percent_qty");
  };
  useEffect(() => {
    stateDispatch({
      type: "SET_DETAIL",
      payload: FormulaReducer.data[partId],
    });
  }, [FormulaReducer.data[partId].length]);
  console.log("bulkformula");
  return (
    <>
      <Row className="col-2 row-margin-vertical  detail-tab-row">
        <Col span={3}>
          <Text strong style={{ fontSize: 16 }}>
            <ProfileOutlined style={{ marginRight: 10 }} /> Formula
          </Text>
        </Col>
        <Col span={10} className="text-left"></Col>
        <Col span={11} className="text-right"></Col>
      </Row>
      <CustomTable
        rowKey="id"
        rowClassName="row-table-detail"
        pageSize={10}
        focusLastPage={true}
        columns={itemFormulaColumns(readOnly, onChange, onDelete, Save, {
          itemList: RMList,
          maxPercent: formulaPercent,
        })}
        dataSource={state}
        readOnly={readOnly}
        onAdd={addNewRow}
      />
    </>
  );
};

export default React.memo(BulkFormula);
