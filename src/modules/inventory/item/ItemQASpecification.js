import { Button, Row, Col, Typography, Input, Space, Popconfirm } from "antd";
import {
  DeleteTwoTone,
  PlusOutlined,
  EllipsisOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import React, { useReducer } from "react";
import { useSelector } from "react-redux";
import {
  item_qa_columns,
  item_qa_detail_fields,
  qaDetailColumns,
} from "../config/item";
import CustomSelect from "../../../components/CustomSelect";
import { mainReducer } from "../../../include/reducer";
import CustomTable from "../../../components/CustomTable";
import CustomLabel from "../../../components/CustomLabel";

const { Text } = Typography;

const ItemQADetail = ({
  readOnly,
  qaDetail,
  headId,
  onChangeDetail,
  revDispatch,
}) => {
  const {
    conditions_subject,
    conditions_specification,
    conditions_method,
  } = useSelector((state) => state.qa.qa_master_data);
  // const [state, stateDispatch] = useReducer(mainReducer, qaDetail);
  const addLine = () => {
    // stateDispatch({ type: "ADD_ROW", payload: item_qa_detail_fields });
    revDispatch({
      type: "ADD_ROW_ARRAY_OBJ_DETAIL",
      payload: {
        headId,
        key: "item_qa_detail",
        data: item_qa_detail_fields,
      },
    });
  };

  const onDelete = (id) => {
    // stateDispatch({ type: "DEL_ROW", payload: { id: id } });
    revDispatch({
      type: "DEL_ROW_ARRAY_OBJ_DETAIL",
      payload: {
        headId,
        key: "item_qa_detail",
        rowId: id,
      },
    });
  };

  const onChangeValue = (rowId, data) => {
    console.log(rowId, data);
    onChangeDetail(headId, data, rowId);
  };
  return (
    <>
      <CustomTable
        dataSource={qaDetail}
        columns={qaDetailColumns({
          readOnly,
          onChange: onChangeValue,
          onDelete,
          data: {
            subject: conditions_subject,
            spec: conditions_specification,
            method: conditions_method,
          },
        })}
        onAdd={!readOnly && addLine}
        pageSize={20}
        focusLastPage={true}
        rowClassName="row-table-detail"
        rowKey="id"
      />
    </>
  );
};

export default ItemQADetail;
