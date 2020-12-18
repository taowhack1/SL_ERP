import { Button, Table } from "antd";
import React, { useContext, useEffect, useReducer, useState } from "react";
import {
  qcTestItemSubjectColumns,
  qcTestItemSubjectFields,
  subject_data,
} from "../../configs/qcTestItemConfig";
import QCItemTestTabSubjectDetail from "./QCItemTestTabSubjectDetail";
import $ from "jquery";
import { PlusOutlined } from "@ant-design/icons";
import { QCContext } from "./QCItemTestCreate";
import ReducerClass from "../../../../include/js/ReducerClass";

const QCItemTestTabSubject = (
  {
    // readOnly,
    // displayFields,
    // data_detail,
    // detailDispatch,
  }
) => {
  const {
    readOnly,
    data_head,
    subjectData,
    subjectDispatch,
    // addLine,
    // delLine,
    // onChangeValue,
  } = useContext(QCContext);
  const reducer = new ReducerClass(
    subjectData,
    subjectDispatch,
    qcTestItemSubjectFields,
    data_head
  );
  const [rowClick, setRowClick] = useState(false);
  const [loading, setLoading] = useState(false);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  console.log(subjectData);
  return (
    <>
      <Table
        className="table-detail"
        rowClassName={(record, index) => {
          let rowClass = "row-table-detail ";
          rowClass += !record.qa_subject_actived
            ? "row-table-detail-inactive"
            : "";
          return rowClass;
        }}
        loading={loading}
        columns={qcTestItemSubjectColumns(
          readOnly,
          reducer.onChangeDetailValue,
          reducer.deleteRow,
          reducer.updateRowStatus
        )}
        dataSource={subjectData}
        onChange={onChange}
        bordered
        size="small"
        rowKey="id"
        onRow={(record, rowIndex) => {
          return {
            onClick: (e) => {
              // setRowClick(true);
              // $(e.target)
              //   .closest("tbody")
              //   .find("tr")
              //   .removeClass("selected-row");
              // $(e.target).closest("tr").addClass("selected-row");
            },
          };
        }}
      />
      <div style={{ marginTop: 10 }}>
        <Button
          type="dashed"
          onClick={() => {
            reducer.addNewRowNoCommit();
          }}
          block
        >
          <PlusOutlined /> Add a line
        </Button>
      </div>
    </>
  );
};
// export default QCItemTestTabSubject;
export default React.memo(QCItemTestTabSubject);
