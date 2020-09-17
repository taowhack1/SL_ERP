import { Form, Input, Button, Space, Row, Col, InputNumber } from "antd";
import { DeleteTwoTone, PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import CustomAutoComplete from "./AutoComplete";
const ItemLine = ({ items, units }) => {
  const [lineItem, setLine] = useState([
    {
      line_id: 0,
      item_name: items[0].name,
      qty: 0.0001,
      qty_done: 0,
      unit: "pc",
    },
  ]);
  const selectedItem = (e) => {
    console.log(e.target.value);
  };

  return (
    <Form.List name="users">
      {(fields, { add, remove }) => {
        return (
          <div>
            {fields.map((field) => (
              <Row
                key={field.key}
                id={"itemLine"}
                style={{
                  marginBottom: 0,
                  border: "1px solid white",
                  backgroundColor: "#FCFCFC",
                }}
                gutter={4}
                className="col-2"
              >
                <Col span={11}>
                  <Form.Item
                    {...field}
                    name={[field.name, "item_name"]}
                    fieldKey={[field.fieldKey, "item_name"]}
                    rules={[{ required: true, message: `missing item` }]}
                    onSelect={selectedItem}
                  >
                    <CustomAutoComplete options={items} placeholder="Item" />
                  </Form.Item>
                </Col>
                <Col span={3}>
                  <Form.Item
                    {...field}
                    name={[field.name, "qty"]}
                    fieldKey={[field.fieldKey, "qty"]}
                    rules={[{ required: true, message: "Missing last name" }]}
                    type="number"
                  >
                    <InputNumber
                      placeholder={"Qty : 0.0001"}
                      min={0.0001}
                      step={0.0001}
                      precision={4}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col span={3}>
                  <Form.Item
                    {...field}
                    name={[field.name, "lot_no"]}
                    fieldKey={[field.fieldKey, "lot_no"]}
                    rules={[{ required: true, message: "Missing last name" }]}
                  >
                    <InputNumber
                      placeholder={"Lot no. : 200800001"}
                      min={0.0001}
                      step={0.0001}
                      precision={4}
                      style={{ width: "100%" }}
                      disabled={1}
                    />
                  </Form.Item>
                </Col>
                <Col span={3}>
                  <Form.Item
                    {...field}
                    name={[field.name, "qty_done"]}
                    fieldKey={[field.fieldKey, "qty_done"]}
                    rules={[{ required: true, message: "Missing last name" }]}
                  >
                    <InputNumber
                      placeholder={"Qty Done : 0.0001"}
                      min={0.0001}
                      step={0.0001}
                      precision={4}
                      style={{ width: "100%" }}
                      disabled={1}
                    />
                  </Form.Item>
                </Col>
                <Col span={3}>
                  <Form.Item
                    {...field}
                    name={[field.name, "unit"]}
                    fieldKey={[field.fieldKey, "unit"]}
                    rules={[{ required: true, message: "Missing last name" }]}
                  >
                    <CustomAutoComplete options={units} placeholder="unit" />
                  </Form.Item>
                </Col>
                <Col span={1}>
                  <DeleteTwoTone
                    onClick={() => {
                      remove(field.name);
                    }}
                  />
                </Col>
              </Row>
            ))}

            <Form.Item style={{ marginTop: 10 }}>
              <Button
                type="dashed"
                onClick={() => {
                  add();
                }}
                block
              >
                <PlusOutlined /> Add field
              </Button>
            </Form.Item>
          </div>
        );
      }}
    </Form.List>
  );
};

export default ItemLine;
