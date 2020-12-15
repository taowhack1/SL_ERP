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
import { reducer } from "../../reducers";
import { QCContext } from "./QCItemTestCreate";

const QCItemTestTabSubject = ({
  readOnly,
  // displayFields,
  // data_detail,
  // detailDispatch,
}) => {
  const { data_head } = useContext(QCContext);
  const [subjectData, subjectDispatch] = useReducer(reducer, []);
  const [rowClick, setRowClick] = useState(false);
  const [loading, setLoading] = useState(false);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const addLine = () => {
    subjectDispatch({
      type: "ADD_ROW_WOC",
      payload: { ...qcTestItemSubjectFields, ...data_head },
    });
  };

  const delLine = (id, qa_id) => {
    console.log(qa_id);
    if (qa_id !== undefined && qa_id !== null) {
      subjectDispatch({
        type: "CHANGE_DETAIL_VALUE",
        payload: {
          id: id,
          data: { qa_subject_actived: 0, ...data_head },
        },
      });
    } else {
      subjectDispatch({ type: "DEL_ROW", payload: { id: id } });
    }
  };

  const onChangeValue = (rowId, data) => {
    subjectDispatch({
      type: "CHANGE_DETAIL_VALUE",
      payload: {
        id: rowId,
        data: { ...data, ...data_head },
      },
    });
  };
  useEffect(() => {
    subjectDispatch({
      type: "SET_DETAIL_WOC",
      payload: subject_data,
    });
  }, []);
  console.log(subjectData);
  return (
    <>
      <Table
        className="table-detail"
        rowClassName="row-table-detail"
        loading={loading}
        columns={qcTestItemSubjectColumns(false, onChangeValue, delLine)}
        dataSource={subjectData.filter((data) => data.qa_subject_actived !== 0)}
        onChange={onChange}
        bordered
        size="small"
        rowKey="id"
        onRow={(record, rowIndex) => {
          return {
            onClick: (e) => {
              setRowClick(true);
              $(e.target)
                .closest("tbody")
                .find("tr")
                .removeClass("selected-row");
              $(e.target).closest("tr").addClass("selected-row");
              // keepLog.keep_log_action(record.type_no_name);
              // dispatch(
              //   get_item_by_id(
              //     record.item_id,
              //     auth.user_name,
              //     redirect_to_view
              //   )
              // );
            },
          };
        }}
      />
      <div style={{ marginTop: 10 }}>
        <Button
          type="dashed"
          onClick={() => {
            addLine();
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
