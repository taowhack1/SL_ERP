import { Button, Row, Col, InputNumber, Typography } from "antd";
import {
  DeleteTwoTone,
  PlusOutlined,
  EllipsisOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import React, { useContext, useEffect, useReducer } from "react";
import CustomSelect from "../../../components/CustomSelect";
import { convertDigit, numberFormat } from "../../../include/js/main_config";
import { reducer } from "../reducers";
import {
  workOrderRMColumns,
  workOrderRMDetailFields,
} from "../config/workOrder";
import CustomTable from "../../../components/CustomTable";
import ReducerClass from "../../../include/js/ReducerClass";
import { RMContext, WOContext } from "./WorkOrderCreate";

const { Text } = Typography;

const TabWorkOrderRMDetail = ({ itemList }) => {
  const { RMReducer, readOnly } = useContext(WOContext);
  RMReducer.setReducer("array");
  const inputData = {
    itemList: itemList,
  };

  console.log("TabWorkOrderRMDetail");
  return (
    <>
      <Row className="col-2 row-margin-vertical  detail-tab-row">
        <Col span={13} className="text-left">
          <Text strong style={{ fontSize: 16 }}>
            <ProfileOutlined style={{ marginRight: 10 }} /> Raw Material List
          </Text>
        </Col>
        <Col span={11} className="text-right"></Col>
      </Row>
      {/* Column Header */}
      <CustomTable
        rowKey="id"
        rowClassName="row-table-detail"
        pageSize={10}
        focusLastPage={true}
        columns={workOrderRMColumns(
          readOnly,
          RMReducer.onChangeDetailValue,
          RMReducer.deleteRow,
          null,
          inputData
        )}
        dataSource={RMReducer.data}
        readOnly={readOnly}
        onAdd={RMReducer.addNewRow}
      />
    </>
  );
};

export default React.memo(TabWorkOrderRMDetail);
