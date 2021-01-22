import {
  Button,
  Row,
  Col,
  InputNumber,
  AutoComplete,
  Typography,
  Select,
  Divider,
} from "antd";
import {
  DeleteTwoTone,
  PlusOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { sortData } from "../../include/js/function_main";
import { useSelector } from "react-redux";
import numeral from "numeral";
const { Text } = Typography;

const ItemLine = ({
  items,
  units,
  dataLine,
  updateData,
  readOnly,
  columns,
}) => {
  const dataLineItem = [...dataLine];
  const countItem = dataLine && dataLine.length ? dataLine.length : 0;
  const [count, setCount] = useState(countItem);
  const [lineItem, setLine] = useState(dataLineItem);
  // const { vat } = useSelector((state) => state.systemConfig.decimalFormat);
  useEffect(() => {
    dataLine && updateData({ dataLine: [...lineItem] });
  }, [lineItem]);

  const addLine = () => {
    setLine([
      ...sortData(dataLine),
      {
        id: count,
        item: null,
        item_qty: 0,
        item_unit: null,
        item_unit_price: 0,
        item_subtotal: 0,
      },
    ]);
    setCount(count + 1);
  };

  const delLine = (id) => {
    console.log(id);
    setLine(lineItem.filter((line) => line.id !== id));
  };
  const onChangeValue = (rowId, data, cal) => {
    setLine(
      dataLine.map((line) => (line.id === rowId ? { ...line, ...data } : line))
    );
  };
  const calSubtotal = (qty, price) => {
    let copyQty = qty && qty ? qty : 0;
    let copyPrice = price && price ? price : 0;
    let total = copyQty * copyPrice;
    return total;
  };

  const renderItemLine = (data) => {
    let renderLine = data.map((line, key) => (
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
          <AutoComplete
            style={{ width: "100%" }}
            options={items}
            placeholder="Item Name..."
            defaultValue={line.item}
            value={line.item}
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
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
            value={line.item_qty}
            style={{ width: "100%" }}
            disabled={0}
            defaultValue={line.item_qty}
            onChange={(data) => {
              onChangeValue(line.id, {
                item_qty: data,
                item_subtotal: calSubtotal(data, line.item_unit_price),
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
            value={line.item_unit}
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
            onChange={(data) => onChangeValue(line.id, { item_unit: data })}
            size="small"
          />
        </Col>

        <Col span={3} className="text-number">
          <InputNumber
            name="item_unit_price"
            placeholder="Unit Price"
            defaultValue={line.item_unit_price}
            value={line.item_unit_price}
            step={5}
            onChange={(data) => {
              onChangeValue(line.id, {
                item_unit_price: data,
                item_subtotal: calSubtotal(line.item_qty, data),
              });
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
            value={line.item_subtotal}
            precision={2}
            onChange={(data) => onChangeValue(line.id, { item_subtotal: data })}
            style={{ width: "100%" }}
            size="small"
          />
        </Col>
        <Col span={1} style={{ textAlign: "center" }}>
          <DeleteTwoTone onClick={() => delLine(line.id)} />
        </Col>
      </Row>
    ));
    return renderLine;
  };
  return (
    <>
      {/* Column Header */}
      <Row
        style={{
          backgroundColor: "#C6C6C6",
          textAlign: "center",
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
          {renderItemLine(dataLine)}

          <div style={{ marginTop: 10 }}>
            <Button
              type="dashed"
              onClick={() => {
                addLine();
              }}
              block
            >
              <PlusOutlined /> Add a line
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
      <Row
        style={{
          width: "100%",
          height: "5px",
          background: "#c6c6c6",
          background:
            "linear-gradient(180deg,rgba(198,198,198,1) 0%, rgba(198,198,198,1) 55%,rgba(255,255,255,1) 100%)",
          marginBottom: 20,
        }}
      ></Row>
    </>
  );
};

export default ItemLine;
