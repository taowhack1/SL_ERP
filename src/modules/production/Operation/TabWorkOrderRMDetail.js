import { Row, Col, Typography } from "antd";
import { ProfileOutlined } from "@ant-design/icons";
import React, { useContext } from "react";

import { workOrderRMColumns } from "../config/workOrder";
import CustomTable from "../../../components/CustomTable";

import { useSelector } from "react-redux";
import { WOContext } from "../../../include/js/context";

const { Text } = Typography;

const TabWorkOrderRMDetail = () => {
  const { RMReducer, readOnly } = useContext(WOContext);
  const itemList = useSelector((state) =>
    state.inventory.master_data.item_list.filter((item) => item.type_id === 1)
  );
  const inputData = {
    itemList: itemList,
  };
  console.log(RMReducer.data);
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
        rowClassName={(record) => {
          return record.auto_genarate_item
            ? "row-table-detail "
            : "row-table-detail require";
        }}
        // rowClassName="row-error"
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
        // onAdd={RMReducer.addNewRow}
      />
    </>
  );
};

export default React.memo(TabWorkOrderRMDetail);
