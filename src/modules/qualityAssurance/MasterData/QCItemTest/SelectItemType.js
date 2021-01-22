import { Col, Input, Row } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import CustomSelect from "../../../../components/CustomSelect";

const SelectItemType = ({ data_head, readOnly }) => {
  return (
    <>
      <Row className="col-2 row-margin-vertical">
        <Col span={6}>
          <Text strong>
            {readOnly && <span className="require">* </span>}
            Item Type :
          </Text>
        </Col>
        <Col span={18}>
          <Text className="text-value text-left">{data_head.type_no_name}</Text>
        </Col>
      </Row>
    </>
  );
};

export default SelectItemType;
