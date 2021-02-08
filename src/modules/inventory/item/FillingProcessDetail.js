import React, { useContext, useEffect, useReducer, useState } from "react";
import CustomTable from "../../../components/CustomTable";
import { ItemContext } from "../../../include/js/context";
import { sortData } from "../../../include/js/function_main";
import { mainReducer } from "../../../include/reducer";
import { fillingProcessColumns, fillingProcessFields } from "../config/item";
import FillingProcessSummary from "./FillingProcessSummary";
const field = {
  id: "item_filling_process_id",
  name: "item_filling_process_description",
  time: "item_filling_process_lead_time",
  worker: "item_filling_process_worker",
};
const FillingProcessDetail = () => {
  const { filling, setFilling, readOnly, data_head } = useContext(ItemContext);
  const [state, stateDispatch] = useReducer(mainReducer, filling);
  const [searching, setSearching] = useState(false);
  useEffect(() => {
    console.log(filling);
    stateDispatch({
      type: "SET_DETAIL",
      payload: filling,
    });
  }, [filling.length]);
  const addNewRow = () => {
    setFilling(sortData([...filling, fillingProcessFields]));
  };
  const onDelete = (id) => {
    setFilling(sortData(filling.filter((obj) => obj.id !== id)));
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
  const Save = (id, field) => {
    setFilling(
      filling.map((obj) =>
        obj.id === id ? { ...obj, [field]: state[id][field] } : obj
      )
    );
  };
  console.log("FillingProcessDetail", filling, state);
  return (
    <>
      <CustomTable
        rowKey={"id"}
        rowClassName={"row-table-detail"}
        pageSize={100}
        focusLastPage={true}
        columns={fillingProcessColumns(
          readOnly,
          field,
          onChange,
          onDelete,
          Save
        )}
        dataSource={state}
        readOnly={readOnly}
        onAdd={addNewRow}
        footer={
          readOnly && (
            <FillingProcessSummary
              worker={data_head.item_filling_worker}
              time={data_head.item_filling_lead_time}
            />
          )
        }
        disabledAddRow={searching}
      />
    </>
  );
};
export default React.memo(FillingProcessDetail);
