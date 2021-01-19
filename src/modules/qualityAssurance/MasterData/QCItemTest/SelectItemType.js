import { Col, Input, Row } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import CustomSelect from "../../../../components/CustomSelect";

const SelectItemType = ({
  data_head,
  readOnly,
  upDateFormValue,
  item_type,
}) => {
  return (
    <>
      <Row className="col-2 row-margin-vertical">
        <Col span={6}>
          <Text strong>
            <span className="require">* </span>Item Type :
          </Text>
        </Col>
        <Col span={18}>
          {readOnly ? (
            <Text className="text-value text-left">
              {data_head.type_no_name}
            </Text>
          ) : (
            <CustomSelect
              allowClear
              showSearch
              placeholder={"Item type"}
              name="type_id"
              field_id="type_id"
              field_name="type_name"
              value={data_head.type_name}
              data={item_type}
              onChange={(data, option) => {
                data && data
                  ? upDateFormValue({
                      type_id: data,
                      type_name: option.title,
                    })
                  : upDateFormValue({
                      type_id: null,
                      type_name: null,
                    });
              }}
            />
          )}
        </Col>
      </Row>
    </>
  );
};

export default SelectItemType;
