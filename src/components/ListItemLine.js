import {
  Form,
  Input,
  Button,
  Space,
  Row,
  Col,
  InputNumber,
  AutoComplete,
} from "antd";
import { DeleteTwoTone, PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import CustomAutoComplete from "./AutoComplete";
const ListItemLine = ({ items, units }) => {
  const [lineItem, setLine] = useState([
    {
      line_id: 0,
      item_name: "",
      qty: 0.0001,
      qty_done: 0,
      unit: "pc",
    },
  ]);
  const selectedItem = (e) => {
    console.log(e.target.value);
  };

  return (
    <Form.List name="itemLine">
      {(fields, { add, remove }) => {
        console.log(fields);
        return (
          <div>
            {fields.map((field) => (
              <Row
                key={field.key}
                style={{
                  marginBottom: 0,
                  border: "1px solid white",
                  backgroundColor: "#FCFCFC",
                  paddingLeft: "10px",
                }}
                gutter={6}
                className="col-2"
              >
                <Col span={11}>
                  <Form.Item
                    {...field}
                    name={[field.name, "item_name"]}
                    fieldKey={[field.fieldKey, "item_name"]}
                    rules={[{ required: true, message: "Missing first name" }]}
                    // style={{ width: "50%" }}
                  >
                    {/* <Input placeholder="First Name" /> */}
                    <AutoComplete
                      options={items}
                      placeholder="Item"
                      // defaultValue={line.item_name}

                      filterOption={(inputValue, option) =>
                        option.value
                          .toUpperCase()
                          .indexOf(inputValue.toUpperCase()) !== -1
                      }
                      // onChange={}
                    />
                  </Form.Item>
                </Col>
                <Col span={3}>
                  <Form.Item
                    {...field}
                    name={[field.name, "Qty"]}
                    fieldKey={[field.fieldKey, "Qty"]}
                    rules={[{ required: true, message: "Missing Quantity" }]}
                    type="number"
                  >
                    <InputNumber
                      placeholder={"Qty : 0.0001"}
                      min={0.0001}
                      step={0.0001}
                      precision={4}
                      style={{ width: "100%" }}
                      // defaultValue={line.qty}
                    />
                  </Form.Item>
                </Col>
                <Col span={3}>
                  <Form.Item
                    {...field}
                    name={[field.name, "lot_no"]}
                    fieldKey={[field.fieldKey, "lot_no"]}
                    rules={[{ required: false, message: "Missing lot_no" }]}
                  >
                    <AutoComplete
                      // val={line.lot_no}
                      options={""}
                      placeholder="Lot no."
                    />
                  </Form.Item>
                </Col>
                <Col span={3}>
                  <Form.Item
                    {...field}
                    name={[field.name, "qty_done"]}
                    fieldKey={[field.fieldKey, "qty_done"]}
                    rules={[{ required: false, message: "Missing qty_done" }]}
                    type="number"
                  >
                    <InputNumber
                      placeholder={"Qty Done : 0.0001"}
                      min={0.0}
                      step={0.0001}
                      precision={4}
                      style={{ width: "100%" }}
                      // disabled={1}
                      // defaultValue={0}
                    />
                  </Form.Item>
                </Col>
                <Col span={3}>
                  <Form.Item
                    {...field}
                    name={[field.name, "unit"]}
                    fieldKey={[field.fieldKey, "unit"]}
                    rules={[{ required: true, message: "Missing unit" }]}
                  >
                    <AutoComplete
                      // {...config}
                      options={units}
                      placeholder="unit"
                      // defaultValue={"unit"}
                      filterOption={(inputValue, option) =>
                        option.value
                          .toUpperCase()
                          .indexOf(inputValue.toUpperCase()) !== -1
                      }
                    ></AutoComplete>
                  </Form.Item>
                </Col>
                <Col span={1}>
                  <DeleteTwoTone onClick={() => remove(field.name)} />
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

export default ListItemLine;
