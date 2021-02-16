import React, { useContext, useEffect, useReducer, useState } from "react";
import CustomTable from "../../../../components/CustomTable";
import { ReturnContext } from "../../../../include/js/context";
import { mainReducer } from "../../../../include/reducer";
import { returnDetailColumns, returnDetailFields } from "./config";
const initialState = returnDetailFields;
const ReturnDetail = () => {
  const { readOnly, data, saveForm } = useContext(ReturnContext);
  const { return_detail } = data;
  const [state, stateDispatch] = useReducer(mainReducer, []);
  const addLine = () => {
    stateDispatch({ type: "ADD_ROW", payload: initialState });
  };
  const delLine = (id) => stateDispatch({ type: "DEL_ROW", payload: { id } });
  const onChange = (id, data) =>
    stateDispatch({ type: "CHANGE_DETAIL_VALUE", payload: { id, data } });
  const onSaveDetail = () => saveForm({ return_detail: state });
  useEffect(() => {
    stateDispatch({ type: "SET_DETAIL", payload: return_detail });
  }, [return_detail]);

  return (
    <>
      <CustomTable
        rowKey="id"
        rowClassName={"row-table-detail"}
        pageSize={20}
        focusLastPage={true}
        columns={returnDetailColumns(readOnly, onSaveDetail, onChange, delLine)}
        dataSource={state}
        readOnly={readOnly}
        // onAdd={addLine}
      />
    </>
  );
};

export default React.memo(ReturnDetail);
