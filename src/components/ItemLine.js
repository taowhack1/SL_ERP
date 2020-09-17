import { Form, Input, Button, Space, Row, Col, InputNumber } from "antd";
import { DeleteTwoTone, PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import CustomAutoComplete from "./AutoComplete";
const ItemLine = ({ items, units }) => {
  const [lineItem, setLine] = useState([]);
  const [count, setCount] = useState(0);
  const selectedItem = (e) => {
    // console.log(e.target.value);
  };
  const deleteLine = (id) => {
    setLine(lineItem.filter((line) => line.line_id != id));
  };
  return (
    <>
      {lineItem.map((line) => (
        <Row
          key={line.line_id}
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
              name={[line.item_name, "item_name"]}
              fieldKey={[line.fieldKey, "item_name"]}
              rules={[{ required: true, message: `missing item` }]}
              onSelect={selectedItem}
            >
              <CustomAutoComplete
                options={items}
                placeholder="Item"
                val={line.item_name}
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item
              name={[line.name, "qty"]}
              fieldKey={[line.fieldKey, "qty"]}
              rules={[{ required: true, message: "Missing last name" }]}
              type="number"
            >
              <InputNumber
                placeholder={"Qty : 0.0001"}
                min={0.0001}
                step={0.0001}
                precision={4}
                style={{ width: "100%" }}
                value={line.qty}
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item
              name={[line.name, "lot_no"]}
              fieldKey={[line.fieldKey, "lot_no"]}
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
              name={[line.name, "qty_done"]}
              fieldKey={[line.fieldKey, "qty_done"]}
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
              name={[line.name, "unit"]}
              fieldKey={[line.fieldKey, "unit"]}
              rules={[{ required: true, message: "Missing last name" }]}
            >
              <CustomAutoComplete options={units} placeholder="unit" />
            </Form.Item>
          </Col>
          <Col span={1}>
            <DeleteTwoTone onClick={(e) => deleteLine(line.line_id)} />

            {/* <Button
              type="link"
              id={line.line_id}
              onClick={(e) => {
                console.log(e.target);
              }}
              block
            >
              ลบ
            </Button> */}
          </Col>
        </Row>
      ))}

      <Form.Item style={{ marginTop: 10 }}>
        <Button
          type="dashed"
          onClick={() => {
            setLine([
              ...lineItem,
              {
                line_id: count,
                item_name: `line_${count}`,
                qty: 0.0001,
                qty_done: 0,
                unit: "pc",
              },
            ]);
            setCount(count + 1);
          }}
          block
        >
          <PlusOutlined /> Add field
        </Button>
      </Form.Item>
    </>
  );
};

export default ItemLine;
