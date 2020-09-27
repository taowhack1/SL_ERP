import {
  Form,
  Button,
  Row,
  Col,
  InputNumber,
  AutoComplete,
  Typography,
  Select,
  DatePicker,
} from "antd";
import {
  DeleteTwoTone,
  PlusOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import moment from "moment";
const { Option } = Select;
// import { columns } from "../data";

const { Text } = Typography;

const VendorLine = ({
  units,
  itemLots,
  items,
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
        item_name: `line_${count}`,
        item_qty: 0.0001,
        item_unit: "unit",
        item_dueDate: null,
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
  const dateConfig = {
    format: "DD/MM/YYYY HH:mm:ss",
    value: moment(),
    disabled: 1,
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
              <Col span={12} className="text-string">
                <AutoComplete
                  style={{ width: "100%" }}
                  options={items}
                  placeholder="Name..."
                  defaultValue={line.item_name}
                  filterOption={(inputValue, option) =>
                    option.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                  onChange={(data) =>
                    onChangeValue(line.id, { item_name: data })
                  }
                />
              </Col>
              <Col span={3} className="text-number">
                <InputNumber
                  placeholder={"Quantity..."}
                  min={0.0}
                  step={0.0001}
                  precision={4}
                  style={{ width: "100%" }}
                  disabled={0}
                  defaultValue={line.item_qty}
                  onChange={(data) =>
                    onChangeValue(line.id, { item_qty: data })
                  }
                />
              </Col>
              <Col span={3} className="text-string">
                <AutoComplete
                  style={{ width: "100%" }}
                  options={units}
                  placeholder="Unit..."
                  defaultValue={line.item_unit}
                  filterOption={(inputValue, option) =>
                    option.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                  onChange={(data) =>
                    onChangeValue(line.id, { item_unit: data })
                  }
                />
              </Col>

              <Col span={5} className="text-number">
                <DatePicker
                  name={"item_dueDate"}
                  format={dateConfig.format}
                  style={{ width: "100%" }}
                  placeholder="Due date..."
                  defaultValue={
                    line.item_dueDate
                      ? moment(line.item_dueDate, "YYYY-MM-DD HH:mm:ss")
                      : ""
                  }
                  onChange={(data) => {
                    onChangeValue(line.id, {
                      item_dueDate: data.format("YYYY-MM-DD HH:mm:ss"),
                    });
                  }}
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
              <Col span={12} className="text-string">
                <Text>{line.item_name}</Text>
              </Col>
              <Col span={3} className="text-number">
                <Text>{line.item_qty}</Text>
              </Col>
              <Col span={3} className="text-string">
                <Text>{line.item_unit}</Text>
              </Col>

              <Col span={5} className="text-number">
                <Text>{line.item_dueDate}</Text>
              </Col>
            </Row>
          ))}
        </> //close tag
      )}
      {/* end readonly */}
    </>
  );
};

export default VendorLine;
