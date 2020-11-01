import {
  Button,
  Row,
  Col,
  InputNumber,
  AutoComplete,
  Typography,
  DatePicker,
} from "antd";
import {
  DeleteTwoTone,
  PlusOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import moment from "moment";
import numeral from "numeral";
const { RangePicker } = DatePicker;
const { Text } = Typography;

const VendorLine = ({
  items,
  units,
  dataLine,
  updateData,
  readOnly,
  columns,
}) => {
  const countItem = dataLine && dataLine.length;
  const [count, setCount] = useState(countItem);
  const [lineItem, setLine] = useState([...dataLine]);

  useEffect(() => {
    updateData({ dataLine: [...lineItem] });
  }, [lineItem, updateData]);

  const addLine = () => {
    setLine([
      ...lineItem,
      {
        id: count,
        item: null,
        itemValidate: null,
        itemQty: 0,
        itemUnit: "pc",
        itemPrice: 0,
      },
    ]);
    setCount(count + 1);
  };

  const delLine = (id) => {
    setLine(lineItem.filter((line) => line.id !== id));
  };
  const onChangeValue = (rowId, data) => {
    setLine(
      lineItem.map((line) => (line.id === rowId ? { ...line, ...data } : line))
    );
  };
  const getValidate = (dateArr, type) => {
    let date = [];
    if (dateArr) {
      if (type === "text") {
        date =
          moment(dateArr[0]).format("DD/MM/YYYY") +
          "  -  " +
          moment(dateArr[1]).format("DD/MM/YYYY");
      } else {
        date.push(moment(dateArr[0], "YYYY-MM-DD"));
        date.push(moment(dateArr[1], "YYYY-MM-DD"));
      }
    }
    return date;
  };
  return (
    <>
      {/* Column Header */}
      <Row gutter={2} className="detail-table-head">
        {columns &&
          columns.map((col, key) => {
            return (
              <Col key={col.id} span={col.size} className="col-outline">
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
              <Col span={8} className="text-string">
                <AutoComplete
                  style={{ width: "100%" }}
                  options={items}
                  placeholder="Item..."
                  defaultValue={line.item}
                  filterOption={(inputValue, option) =>
                    option.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                  onChange={(data) => onChangeValue(line.id, { item: data })}
                />
              </Col>
              <Col span={6} className="text-string">
                <RangePicker
                  format={"DD/MM/YYYY"}
                  defaultValue={getValidate(line.itemValidate, "moment")}
                  onChange={(data) => {
                    let changeFormat =
                      data &&
                      data.map((date) => {
                        return date.format("YYYY-MM-DD");
                      });
                    onChangeValue(line.id, {
                      itemValidate: changeFormat,
                    });
                  }}
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
                  defaultValue={line.itemPrice}
                  onChange={(data) =>
                    onChangeValue(line.id, {
                      itemQty: data,
                    })
                  }
                />
              </Col>

              <Col span={3} className="text-string">
                <AutoComplete
                  style={{ width: "100%" }}
                  options={units}
                  placeholder="Unit"
                  defaultValue={line.itemUnit}
                  filterOption={(inputValue, option) =>
                    option.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                  onChange={(data) =>
                    onChangeValue(line.id, { itemUnit: data })
                  }
                />
              </Col>
              <Col span={3} className="text-number">
                <InputNumber
                  placeholder={"Price..."}
                  min={0.0}
                  step={50.0}
                  precision={3}
                  style={{ width: "100%" }}
                  disabled={0}
                  defaultValue={line.itemPrice}
                  onChange={(data) =>
                    onChangeValue(line.id, { itemPrice: data })
                  }
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
              <Col span={8} className="text-string">
                <Text>{line.item}</Text>
              </Col>
              <Col span={6} className="text-center">
                <Text>{getValidate(line.itemValidate, "text")}</Text>
              </Col>
              <Col span={3} className="text-number">
                <Text>{numeral(line.itemQty).format("0,0.0000")}</Text>
              </Col>

              <Col span={3} className="text-string">
                <Text>{line.itemUnit}</Text>
              </Col>
              <Col span={3} className="text-number">
                <Text>{numeral(line.itemPrice).format("0,0.000")}</Text>
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
