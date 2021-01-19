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
import CustomTable from "../../../../components/CustomTable";
import Search from "../../../../components/Search";
import { mainReducer } from "../../../../include/reducer";
const initialStateSubject = qcTestItemSubjectFields;
const QCItemTestTabSubject = () => {
  const {
    readOnly,
    data_head,
    subjectData,
    subjectDispatch,
    commonData,
    form1,
  } = useContext(QCContext);
  const [state, stateDispatch] = useReducer(mainReducer, [initialStateSubject]);
  const [searching, setSearching] = useState(false);
  useEffect(() => {
    stateDispatch({
      type: "SET_DETAIL",
      payload: subjectData,
    });
  }, [subjectData.length]);
  const addNewRow = () => {
    console.log("add row");
    subjectDispatch({
      type: "ADD_ROW_WOC",
      payload: { ...initialStateSubject, ...commonData },
    });
  };
  const onDelete = (id) => {
    subjectDispatch({
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
    console.log("Save");
    subjectDispatch({
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
        ? subjectData.filter(
            (obj) =>
              (obj.qa_subject_name &&
                obj.qa_subject_name.toUpperCase().indexOf(text.toUpperCase()) >=
                  0) ||
              (obj.qa_subject_remark &&
                obj.qa_subject_remark
                  .toUpperCase()
                  .indexOf(text.toUpperCase()) >= 0)
          )
        : subjectData,
    });
    text ? setSearching(true) : setSearching(false);
  };
  const getRowClassName = (record, index) => {
    let rowClass = "row-table-detail ";
    rowClass += !record.qa_subject_actived ? "row-table-detail-inactive" : "";
    return rowClass;
  };
  console.log("subjectData", subjectData);

  console.log("qc subject render", state);
  return (
    <>
      <CustomTable
        title={() => {
          return (
            <div style={{ textAlign: "right", backgroundColor: "#FAFAFA" }}>
              <Search className={"half-width"} onSearch={onSearch} />
            </div>
          );
        }}
        rowKey="id"
        rowClassName={getRowClassName}
        pageSize={10}
        focusLastPage={true}
        columns={qcTestItemSubjectColumns(readOnly, onChange, onDelete, Save)}
        dataSource={state}
        readOnly={readOnly}
        onAdd={addNewRow}
        disabledAddRow={searching}
      />
    </>
  );
};
// export default QCItemTestTabSubject;
export default React.memo(QCItemTestTabSubject);
