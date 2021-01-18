import { Button, Table } from "antd";
import React, { useContext, useEffect, useReducer, useState } from "react";
import {
  qcTestItemSubjectColumns,
  qcTestItemSubjectFields,
} from "../../configs/qcTestItemConfig";
import { PlusOutlined } from "@ant-design/icons";
import { QCContext } from "./QCItemTestCreate";
import ReducerClass from "../../../../include/js/ReducerClass";
import {
  sortData,
  sortDataWithoutCommit,
} from "../../../../include/js/function_main";
import { reducer } from "../../../inventory/reducers";
import CustomTable from "../../../../components/CustomTable";
const initialStateSubject = qcTestItemSubjectFields;
const QCItemTestTabSubject = () => {
  const { readOnly, data_head, subjectData, subjectDispatch } = useContext(
    QCContext
  );
  const [state, stateDispatch] = useReducer(reducer, [initialStateSubject]);
  useEffect(() => {
    stateDispatch({
      type: "SET_DETAIL",
      payload: subjectData,
    });
  }, []);
  const addNewRow = () => {
    stateDispatch({
      type: "ADD_ROW",
      payload: initialStateSubject,
    });
    // FormulaReducer.addNewRow(item_formula_detail_fields, partId);
  };
  const onDelete = (id) => {
    stateDispatch({
      type: "DEL_ROW",
      payload: {
        id: id,
      },
    });
    // FormulaReducer.deleteRow2D(partId, id);
    // sumPercent(FormulaReducer.data, "item_formula_percent_qty");
  };
  const onChange = (id, data) => {
    stateDispatch({
      type: "CHANGE_DETAIL_VALUE",
      payload: {
        id: id,
        data: { ...data, commit: 1 },
      },
    });
  };
  const Save = (id2, keySave) => {
    console.log("Save");
    // FormulaReducer.onChangeDetailValue2D(partId, id2, state[id2]);
    // keySave === "item_formula_percent_qty" &&
    //   sumPercent(FormulaReducer.data, "item_formula_percent_qty");
  };

  console.log("qc subject render", state);
  return (
    <>
      <CustomTable
        rowKey="id"
        rowClassName={(record, index) => {
          let rowClass = "row-table-detail ";
          rowClass += !record.qa_subject_actived
            ? "row-table-detail-inactive"
            : "";
          return rowClass;
        }}
        pageSize={10}
        focusLastPage={true}
        columns={qcTestItemSubjectColumns(readOnly, onChange, onDelete, Save)}
        dataSource={state}
        readOnly={readOnly}
        onAdd={addNewRow}
      />
    </>
  );
};
// export default QCItemTestTabSubject;
export default React.memo(QCItemTestTabSubject);
