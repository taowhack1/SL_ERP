import {
  Form,
  Button,
  Row,
  Col,
  InputNumber,
  AutoComplete,
  Typography,
} from "antd";
import {
  DeleteTwoTone,
  PlusOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import CustomAutoComplete from "./AutoComplete";

const { Text } = Typography;

const ItemLine = ({
  items,
  units,
  req_item_line,
  updateItemLine,
  editForm,
}) => {
  const countItem = req_item_line.length;
  const [count, setCount] = useState(countItem);
  const [lineItem, setLine] = useState([...req_item_line]);

  useEffect(() => {}, [lineItem]);

  const addLine = () => {
    setLine([
      ...lineItem,
      {
        line_id: count,
        item_name: `line_${count}`,
        item_qty: 0.0001,
        item_lot: 2,
        item_qty_done: 0,
        item_unit: "unit",
      },
    ]);
    setCount(count + 1);
    updateItemLine({ req_item_line: [...lineItem] });
  };

  const delLine = (id) => {
    setLine(lineItem.filter((line) => line.line_id !== id));
    updateItemLine({ req_item_line: [...lineItem] });
  };

  const onChangeValue = (rowId, field, data) => {
    setLine(
      lineItem.map((line) =>
        line.line_id === rowId ? { ...line, item_name: data } : line
      )
    );
    updateItemLine({ req_item_line: [...lineItem] });
  };

  return (
    <>
      {/* Column Header */}
      <Row
        style={{
          backgroundColor: "#C6C6C6",
          textAlign: "center",
          // paddingLeft: 10,
        }}
      >
        <Col span={11} className="col-outline">
          <Text strong>Item</Text>
        </Col>
        <Col span={3} className="col-outline">
          <Text strong>Quantity</Text>
        </Col>
        <Col span={3} className="col-outline">
          <Text strong>Lot No.</Text>
        </Col>
        <Col span={3} className="col-outline">
          <Text strong>Quantity Done</Text>
        </Col>
        <Col span={3} className="col-outline">
          <Text strong>Unit</Text>
        </Col>
        <Col span={1} className="col-outline">
          <Text strong>
            <EllipsisOutlined />
          </Text>
        </Col>
      </Row>
      {/* Edit Form */}
      {editForm ? (
        <>
          {lineItem.map((line, key) => (
            <Row
              key={key}
              style={{
                marginBottom: 0,
                border: "1px solid white",
                backgroundColor: "#FCFCFC",
              }}
              gutter={6}
              className="col-2"
            >
              <Col span={11} className="text-string">
                <Form.Item name={`item_name_${line.line_id}`} value="item 1">
                  <AutoComplete
                    options={items}
                    placeholder="Item"
                    defaultValue={line.item_name}
                    filterOption={(inputValue, option) =>
                      option.value
                        .toUpperCase()
                        .indexOf(inputValue.toUpperCase()) !== -1
                    }
                    onChange={(data) =>
                      onChangeValue(line.line_id, "item_name", data)
                    }
                  ></AutoComplete>
                </Form.Item>
              </Col>
              <Col span={3} className="text-number">
                <Form.Item name={`qty_${line.line_id}`}>
                  <InputNumber
                    placeholder={"Qty : 0.0001"}
                    min={0.0001}
                    step={0.0001}
                    precision={4}
                    className={"full-width"}
                    defaultValue={line.item_qty}
                  />
                </Form.Item>
              </Col>
              <Col span={3} className="text-string">
                <Form.Item name={`lot_no_${line.line_id}`}>
                  <CustomAutoComplete
                    val={line.lot_no}
                    options={""}
                    placeholder="Lot no."
                    disabled={true}
                  />
                </Form.Item>
              </Col>
              <Col span={3} className="text-number">
                <Form.Item name={`qty_done_${line.line_id}`}>
                  <InputNumber
                    placeholder={"Qty Done : 0.0001"}
                    min={0.0}
                    step={0.0001}
                    precision={4}
                    className={"full-width"}
                    disabled={1}
                    defaultValue={line.item_qty_done}
                  />
                </Form.Item>
              </Col>
              <Col span={3} className="text-string">
                <Form.Item name={`unit_${line.line_id}`}>
                  <AutoComplete
                    options={units}
                    placeholder="unit"
                    defaultValue={line.item_unit}
                    filterOption={(inputValue, option) =>
                      option.value
                        .toUpperCase()
                        .indexOf(inputValue.toUpperCase()) !== -1
                    }
                  ></AutoComplete>
                </Form.Item>
              </Col>
              <Col span={1}>
                <DeleteTwoTone onClick={() => delLine(line.line_id)} />
              </Col>
            </Row>
          ))}
          <Form.Item style={{ marginTop: 10 }}>
            <Button
              type="dashed"
              onClick={() => {
                addLine();
              }}
              block
            >
              <PlusOutlined /> Add a line
            </Button>
          </Form.Item>
        </>
      ) : (
        <>
          {/* View Form */}
          {lineItem.map((line, key) => (
            <Row
              key={line.line_id}
              style={{
                marginBottom: 0,
                border: "1px solid white",
                backgroundColor: key % 2 === 0 ? "#FCFCFC" : "#EAEAEA",
                paddingLeft: "10px",
              }}
              gutter={6}
              className="col-2"
            >
              <Col span={11} className="text-string">
                <Form.Item
                  name={`item_name_${line.line_id}`}
                  // rules={[{ required: true, message: `Missing Item` }]}
                  // onSelect={onChangeValue(line.line_id)}
                >
                  <Text>{line.item_name ? line.item_name : "-"}</Text>
                </Form.Item>
              </Col>
              <Col span={3} className="text-number">
                <Form.Item
                  name={`qty_${line.line_id}`}
                  // rules={[{ required: true, message: "Missing Quantity" }]}
                >
                  <Text>{line.item_qty ? line.item_qty : "-"}</Text>
                </Form.Item>
              </Col>
              <Col span={3} className="text-number">
                <Form.Item
                  name={`lot_no_${line.line_id}`}
                  // rules={[{ required: true, message: "Missing Lot no" }]}
                >
                  <Text>{line.lot_no ? line.lot_no : "-"}</Text>
                </Form.Item>
              </Col>
              <Col span={3} className="text-number">
                <Form.Item
                  name={`qty_done_${line.line_id}`}
                  // rules={[{ required: true, message: "Missing Qty done" }]}
                >
                  <Text>{line.item_qty_done ? line.item_qty_done : "-"}</Text>
                </Form.Item>
              </Col>
              <Col span={3} className="text-string">
                <Form.Item
                  name={`unit_${line.line_id}`}
                  // rules={[{ required: true, message: "Missing Unit" }]}
                >
                  <Text>{line.item_unit ? line.item_unit : "-"}</Text>
                </Form.Item>
              </Col>
              <Col span={1}></Col>
            </Row>
          ))}
        </>
      )}
    </>
  );
};

export default ItemLine;
