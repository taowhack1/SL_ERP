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
    // return () => stateDispatch({ type: "RESET_DETAIL" });
  }, [return_detail]);

  // console.log("readOnly", readOnly);
  // const [state, setState] = useState(return_detail);
  // const addLine = () => {
  //   setState([...state, { ...initialState, id: state.length }]);
  // };
  // const onChange = (id, data) => {
  //   setState(state.map((obj) => (obj.id === id ? { ...obj, ...data } : obj)));
  // };
  // const delLine = (id) => setState(state.filter((obj) => obj.id !== id));
  console.log("ReturnDetail Render", state);
  return (
    <>
      <CustomTable
        rowKey="id"
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