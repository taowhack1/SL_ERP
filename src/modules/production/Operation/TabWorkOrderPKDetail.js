import { Row, Col, Typography } from "antd";
import { ProfileOutlined } from "@ant-design/icons";
import React, { useContext } from "react";
import { workOrderPKColumns } from "../config/workOrder";
import CustomTable from "../../../components/CustomTable";
import { WOContext } from "../../../include/js/context";

const { Text } = Typography;

const TabWorkOrderPKDetail = () => {
  const { PKReducer, readOnly } = useContext(WOContext);

  console.log("TabWorkOrderPKDetail", PKReducer.data);
  return (
    <>
      <Row className="col-2 row-margin-vertical  detail-tab-row">
        <Col span={13} className="text-left">
          <Text strong style={{ fontSize: 16 }}>
            <ProfileOutlined style={{ marginRight: 10 }} /> Package List
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
        pageSize={10}
        focusLastPage={true}
        columns={workOrderPKColumns(
          readOnly,
          PKReducer.onChangeDetailValue,
          PKReducer.deleteRow,
          null
        )}
        dataSource={PKReducer.data}
        readOnly={readOnly}
        // onAdd={RMReducer.addNewRow}
      />
    </>
  );
};

export default React.memo(TabWorkOrderPKDetail);
