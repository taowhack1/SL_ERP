import {
  Button,
  Row,
  Col,
  InputNumber,
  AutoComplete,
  Typography,
  Select,
} from "antd";
import {
  DeleteTwoTone,
  PlusOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect } from "react";
const { Text } = Typography;

const ItemLine = ({
  items,
  units,
  dataLine,
  updateData,
  readOnly,
  columns,
}) => {
  // console.log(dataLine);
  const countItem = dataLine && dataLine.length ? dataLine.length : 0;
  const [count, setCount] = useState(countItem);
  const [lineItem, setLine] = useState(
    dataLine && dataLine ? [...dataLine] : []
  );

  useEffect(() => {
    dataLine && updateData({ dataLine: [...lineItem] });
  }, [lineItem]);

  const addLine = () => {
    setLine([
      ...lineItem,
      {
        id: count,
        item: null,
        item_qty: 5,
        item_unit: null,
        item_unit_price: 13,
        item_subtotal: 0,
      },
    ]);
    setCount(count + 1);
  };

  const delLine = (id) => {
    console.log(id);
    setLine(lineItem.filter((line) => line.id !== id));
  };
  const onChangeValue = (rowId, data) => {
    setLine(
      lineItem.map((line) => (line.id === rowId ? { ...line, ...data } : line))
    );
  };
  console.log(lineItem);
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
        {columns &&
          columns.map((col, key) => {
            return (
              <Col key={key} span={col.size} className="col-outline">
                <Text strong>{col.name}</Text>
              </Col>
            );
          })}

        <Col span={1} className="col-outline">
          <Text strong>
            <EllipsisOutlined />
          </Text>
        </Col>
      </Row>
      {!readOnly ? (
        <>
          {/* Edit Form */}
          {lineItem.map((line, key) => (
            <Row
              key={line.id}
              style={{
                marginBottom: 0,
                border: "1px solid white",
                backgroundColor: "#FCFCFC",
              }}
              gutter={6}
              className="col-2"
            >
              <Col span={11} className="text-string">
                <AutoComplete
                  style={{ width: "100%" }}
                  options={items}
                  placeholder="Item Name..."
                  defaultValue={line.item}
                  filterOption={(inputValue, option) =>
                    option.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                  onChange={(data) => onChangeValue(line.id, { item: data })}
                  size="small"
                />
              </Col>
              <Col span={3} className="text-number">
                <InputNumber
                  placeholder={"Quantity"}
                  min={0.0}
                  step={0.0001}
                  precision={4}
                  style={{ width: "100%" }}
                  disabled={0}
                  defaultValue={line.item_qty}
                  onChange={(data) => {
                    onChangeValue(line.id, {
                      item_qty: data,
                    });
                  }}
                  size="small"
                />
              </Col>
              <Col span={3} className="text-string">
                <AutoComplete
                  style={{ width: "100%" }}
                  options={units}
                  placeholder="Unit"
                  defaultValue={line.item_unit}
                  filterOption={(inputValue, option) =>
                    option.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                  onChange={(data) =>
                    onChangeValue(line.id, { item_unit: data })
                  }
                  size="small"
                />
              </Col>

              <Col span={3} className="text-number">
                <InputNumber
                  name="item_unit_price"
                  placeholder="Unit Price"
                  defaultValue={line.item_unit_price}
                  onChange={(data) => {
                    onChangeValue(line.id, { item_unit_price: data });
                  }}
                  style={{ width: "100%" }}
                  size="small"
                />
              </Col>
              <Col span={3} className="text-number">
                <InputNumber
                  name="item_subtotal"
                  placeholder="Subtotal"
                  defaultValue={line.item_subtotal}
                  // disabled
                  onChange={(data) =>
                    onChangeValue(line.id, { item_subtotal: data })
                  }
                  style={{ width: "100%" }}
                  size="small"
                />
              </Col>
              <Col span={1} style={{ textAlign: "center" }}>
                <DeleteTwoTone onClick={() => delLine(line.id)} />
              </Col>
            </Row>
          ))}
          <div style={{ marginTop: 10 }}>
            <Button
              type="dashed"
              onClick={() => {
                addLine();
              }}
              block
            >
              <PlusOutlined /> Add field
            </Button>
          </div>
        </>
      ) : (
        <>
          {/* View Form */}
          {lineItem.map((line, key) => (
            <Row
              key={line.id}
              style={{
                marginBottom: 0,
                border: "1px solid white",
                backgroundColor: "#FCFCFC",
              }}
              gutter={6}
              className="col-2"
            >
              <Col span={11} className="text-string">
                <Text>{line.item}</Text>
              </Col>
              <Col span={3} className="text-number">
                <Text>{line.item_qty}</Text>
              </Col>
              <Col span={3} className="text-string">
                <Text>{line.item_unit}</Text>
              </Col>
              <Col span={3} className="text-number">
                <Text>{line.item_unit_price}</Text>
              </Col>
              <Col span={3} className="text-number">
                <Text>{line.item_subtotal}</Text>
              </Col>
            </Row>
          ))}
        </> //close tag
      )}
      {/* end readonly */}
    </>
  );
};

export default ItemLine;
