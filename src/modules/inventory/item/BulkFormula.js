import { Row, Col, Typography } from "antd";
import { ProfileOutlined } from "@ant-design/icons";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { itemFormulaColumns, item_formula_detail_fields } from "../config/item";
import CustomTable from "../../../components/CustomTable";
import { ItemContext } from "../../../include/js/context";
import { sortData } from "../../../include/js/function_main";
import { mainReducer } from "../../../include/reducer";

const { Text } = Typography;

const BulkFormula = ({ id, formula }) => {
  const {
    statePartDispatch,
    readOnly,
    RMList,
    formulaPercent,
    sumPercent,
  } = useContext(ItemContext);
  const [state, stateDispatch] = useReducer(mainReducer, sortData(formula));
  const [isUpdatePercent, setUpdatePercent] = useState(true);
  const addNewRow = () => {
    statePartDispatch({
      type: "ADD_ROW_ARRAY_OBJ_DETAIL",
      payload: {
        headId: id,
        key: "item_formula",
        data: item_formula_detail_fields,
      },
    });
  };
  const onDelete = (rowId) => {
    statePartDispatch({
      type: "DEL_ROW_ARRAY_OBJ_DETAIL",
      payload: {
        headId: id,
        key: "item_formula",
        rowId,
      },
    });
    setUpdatePercent(true);
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
  const Save = (rowId, keySave) => {
    console.log("Saveeeeee", id, state[rowId]);
    statePartDispatch({
      type: "CHANGE_OBJ_ARRAY_DETAIL_VALUE",
      payload: {
        headId: id,
        rowId,
        key: "item_formula",
        data: state[rowId],
      },
    });
    keySave === "item_formula_percent_qty" && setUpdatePercent(true);
  };
  useEffect(() => {
    stateDispatch({
      type: "SET_DETAIL",
      payload: formula,
    });
  }, [formula.length]);
  useEffect(() => {
    if (isUpdatePercent) {
      sumPercent();
      setUpdatePercent(false);
    }
  }, [isUpdatePercent]);
  console.log("bulkformula", formula, state);
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
        pageSize={20}
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
