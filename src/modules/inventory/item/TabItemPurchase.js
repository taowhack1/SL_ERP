import { ProfileOutlined } from "@ant-design/icons";
import { Col, Row, Space } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import Line from "../../../components/VendorLine";

const TabItemPurchase = ({
  data_head,
  data_detail,
  detailDispatch,
  readOnly,
}) => {
  return (
    <>
      <Row className="col-2 row-margin-vertical  detail-tab-row">
        <Col span={24}>
          <Space>
            <Text strong style={{ fontSize: 16, marginRight: 10 }}>
              <ProfileOutlined style={{ marginRight: 10 }} />
              Vendor
            </Text>
          </Space>
        </Col>
      </Row>
      <Line
        readOnly={readOnly}
        detailDispatch={detailDispatch}
        data_head={data_head}
        data_detail={data_detail}
      />
    </>
  );
};

export default TabItemPurchase;
