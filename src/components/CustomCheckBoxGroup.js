import { Checkbox, Col, Input, Row, Space } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import { BorderOutlined, CheckSquareOutlined } from "@ant-design/icons";
const { TextArea } = Input;
const mockupFields = [
  {
    id: 0,
    name: "first",
    label: "First Choice",
    value: 1,
  },
  {
    id: 1,
    name: "second",
    label: "Second Choice",
    value: 2,
  },
];
const CustomCheckBoxGroup = ({
  readOnly = true,
  groupName = "Group Name :",
  checkListFields = mockupFields,
}) => {
  const getCheckBox = (readOnly, data) => {
    return (
      <>
        {/* {readOnly ? (
          <>
            <Space align="baseline">
              {data_head.item_sale_local ? (
                <CheckSquareOutlined />
              ) : (
                <BorderOutlined />
              )}
              <Text>Local</Text>
            </Space>
            <br />
            <Space align="baseline">
              {data_head.item_sale_export ? (
                <CheckSquareOutlined />
              ) : (
                <BorderOutlined />
              )}
              <Text>Export</Text>
            </Space>
          </>
        ) : ( */}
        <>
          <Space align="baseline">
            <Checkbox
              checked={data_head.item_sale_local}
              onChange={(e) =>
                upDateFormValue({
                  item_sale_local: e.target.checked ? 1 : 0,
                })
              }
            />
            <Text>Local</Text>
          </Space>
          <br />
          <Space align="baseline">
            <Checkbox
              checked={data_head.item_sale_export}
              onChange={(e) =>
                upDateFormValue({
                  item_sale_export: e.target.checked ? 1 : 0,
                })
              }
            />
            <Text>Export</Text>
          </Space>
        </>
        {/* )} */}
      </>
    );
  };
  return (
    <>
      <Row className="col-2 row-margin-vertical">
        <Col span={2}></Col>
        <Col span={6} className={readOnly ? "" : "pd-left-1"}>
          <Text strong>{groupName}</Text>
        </Col>
        <Col span={16} className="pd-left-2">
          {getCheckBox(readOnly, groupName, checkListFields)}
        </Col>
      </Row>
    </>
  );
};

export default CustomCheckBoxGroup;
