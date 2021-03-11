import { CheckSquareOutlined, ProfileOutlined } from "@ant-design/icons";
import { Col, Collapse, Row, Space } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useContext } from "react";
import CustomLabel from "../../../components/CustomLabel";
import { ItemContext } from "../../../include/js/context";
import ItemCertificate from "./ItemCertificate";
const { Panel } = Collapse;
const ItemDocuments = () => {
  const { data_head } = useContext(ItemContext);
  const { pu_vendor } = data_head;
  console.log("pu_vendor", pu_vendor);
  const getDefaultDocs = (arrData) => {};
  const getOtherDocs = (arrData) => {};
  return (
    <>
      <Collapse defaultActiveKey={["1"]}>
        <Panel
          header={
            <Space>
              <Text strong style={{ fontSize: 16 }} className="mr-1">
                <ProfileOutlined className="mr-1" />
                Default Vendor Documents
              </Text>
            </Space>
          }
          key="1"
        >
          <Row>
            <Col span={12}>
              <Row className="col-2 row-margin-vertical">
                <Col span={2}>
                  <CheckSquareOutlined />
                </Col>
                <Col span={6}>
                  <CustomLabel label={"Document"} />
                </Col>
                <Col span={15}></Col>
              </Row>
              <Row className="col-2 row-margin-vertical">
                <Col span={2}>
                  <CheckSquareOutlined />
                </Col>
                <Col span={6}>
                  <CustomLabel label={"Document"} />
                </Col>
                <Col span={15}></Col>
              </Row>
              <Row className="col-2 row-margin-vertical">
                <Col span={2}>
                  <CheckSquareOutlined />
                </Col>
                <Col span={6}>
                  <CustomLabel label={"Document"} />
                </Col>
                <Col span={15}></Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row className="col-2 row-margin-vertical">
                <Col span={2}>
                  <CheckSquareOutlined />
                </Col>
                <Col span={6}>
                  <CustomLabel label={"Document"} />
                </Col>
                <Col span={15}></Col>
              </Row>
              <Row className="col-2 row-margin-vertical">
                <Col span={2}>
                  <CheckSquareOutlined />
                </Col>
                <Col span={6}>
                  <CustomLabel label={"Document"} />
                </Col>
                <Col span={15}></Col>
              </Row>
              <Row className="col-2 row-margin-vertical">
                <Col span={2}>
                  <CheckSquareOutlined />
                </Col>
                <Col span={6}>
                  <CustomLabel label={"Document"} />
                </Col>
                <Col span={15}></Col>
              </Row>
            </Col>
          </Row>
        </Panel>
      </Collapse>
      <Row className="col-2 row-margin-vertical detail-tab-row ">
        <Col span={24}>
          <Space>
            <Text strong style={{ fontSize: 16 }} className="mr-1">
              <ProfileOutlined className="mr-1" />
              Default Vendor Documents
            </Text>
          </Space>
        </Col>
      </Row>
      <Row>
        <Col span={6}></Col>
        <Col span={17}></Col>
      </Row>
      <Row className="col-2 row-margin-vertical detail-tab-row ">
        <Col span={24}>
          <Space>
            <Text strong style={{ fontSize: 16 }} className="mr-1">
              <ProfileOutlined className="mr-1" />
              Other Vendor Documents
            </Text>
          </Space>
        </Col>
      </Row>
    </>
  );
};

export default ItemDocuments;
