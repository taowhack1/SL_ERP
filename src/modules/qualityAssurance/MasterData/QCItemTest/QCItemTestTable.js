import React, { useContext, useEffect, useReducer, useState } from "react";
import {
  qcTestItemSubjectColumns,
  qcTestItemSubjectFields,
} from "../../configs/qcTestItemConfig";
import { QCContext } from "./QCItemTestForm";
import CustomTable from "../../../../components/CustomTable";
import Search from "../../../../components/Search";
import { mainReducer } from "../../../../include/reducer";
const QCItemTestTable = ({
  field,
  initialState,
  dataSource,
  dispatchData,
  commonData,
  columns,
}) => {
  const { readOnly } = useContext(QCContext);
  const [state, stateDispatch] = useReducer(mainReducer, [initialState]);
  const [searching, setSearching] = useState(false);
  useEffect(() => {
    stateDispatch({
      type: "SET_DETAIL",
      payload: dataSource,
    });
  }, [dataSource.length]);
  const addNewRow = () => {
    console.log("add row");
    dispatchData({
      type: "ADD_ROW_WOC",
      payload: { ...initialState, ...commonData },
    });
  };
  const onDelete = (id) => {
    console.log("id", id);
    dispatchData({
      type: "DEL_ROW_WOC",
      payload: {
        id: id,
      },
    });
  };
  const onChange = (id, data) => {
    stateDispatch({
      type: "CHANGE_DETAIL_VALUE",
      payload: {
        id: id,
        data: { ...data, ...commonData },
      },
    });
  };
  const Save = (id) => {
    dispatchData({
      type: "CHANGE_DETAIL_VALUE",
      payload: {
        id: id,
        data: { ...state.filter((obj) => obj.id === id)[0], commit: 1 },
      },
    });
  };
  const onSearch = (text) => {
    stateDispatch({
      type: "SEARCH_DETAIL",
      payload: text
        ? dataSource.filter(
            (obj) =>
              (obj[field["name"]] &&
                obj[field["name"]].toUpperCase().indexOf(text.toUpperCase()) >=
                  0) ||
              (obj[field.description] &&
                obj[field.description]
                  .toUpperCase()
                  .indexOf(text.toUpperCase()) >= 0)
          )
        : dataSource,
    });
    text ? setSearching(true) : setSearching(false);
  };
  const getRowClassName = (record, index) => {
    let rowClass = "row-table-detail ";
    rowClass += !record[field.status] ? "row-table-detail-inactive" : "";
    return rowClass;
  };
  console.log("Table Render..", field.title);
  return (
    <>
      <CustomTable
        title={() => {
          return (
            <div className="text-right table-color">
              <Search className={"half-width"} onSearch={onSearch} />
            </div>
          );
        }}
        rowKey={"id"}
        rowClassName={getRowClassName}
        pageSize={10}
        focusLastPage={true}
        columns={columns(field, readOnly, onChange, onDelete, Save)}
        dataSource={state}
        readOnly={readOnly}
        onAdd={addNewRow}
        disabledAddRow={searching}
      />
    </>
  );
};
export default React.memo(QCItemTestTable);
