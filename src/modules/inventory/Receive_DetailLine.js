import {
  Button,
  Row,
  Col,
  InputNumber,
  AutoComplete,
  Typography,
  Select,
  Divider,
  Input,
  DatePicker,
} from "antd";
import {
  DeleteTwoTone,
  PlusOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import numeral from "numeral";
import moment from "moment";
const { Text } = Typography;

const ItemLine = ({
  units,
  dataLine,
  updateDetail,
  readOnly,
  columns,
  selectLine,
}) => {
  const [lineItem, setLine] = useState(dataLine);
  console.log("selectLine", selectLine);
  console.log("dataLine", dataLine);
  useEffect(() => {
    dataLine && updateDetail(selectLine, [...lineItem]);
  }, [lineItem]);

  const addLine = () => {
    setLine([
      ...sortData(dataLine),
      {
        id: dataLine.length++,
        d_batch_no: null,
        d_receive_date: null,
        d_mfg: null,
        d_exp: null,
        d_qty: 0,
        d_unit: null,
      },
    ]);
  };

  const delLine = (id) => {
    console.log(id);
    setLine(dataLine.filter((line) => line.id !== id));
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
  const sortData = (arrObject) => {
    let copyData = arrObject;
    let temp = [];
    copyData.map((obj, key) => {
      return temp.push({
        ...obj,
        id: key,
      });
    });
    return temp;
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
        <Col span={5} className="text-number">
          <Input
            placeholder={"Batch no"}
            value={line.d_batch_no}
            style={{ width: "100%" }}
            defaultValue={line.d_batch_no}
            onChange={(data) => {
              onChangeValue(line.id, {
                d_batch_no: data,
              });
            }}
            size="small"
          />
        </Col>
        <Col span={4} className="text-string">
          <DatePicker
            name={"d_receive_date"}
            format={"DD/MM/YYYY"}
            style={{ width: "100%" }}
            size={"small"}
            placeholder="Receive date..."
            value={
              line.d_receive_date
                ? moment(line.d_receive_date, "DD/MM/YYYY")
                : ""
            }
            defaultValue={
              line.d_receive_date
                ? moment(line.d_receive_date, "DD/MM/YYYY")
                : ""
            }
            onChange={(data) => {
              onChangeValue({
                d_receive_date: data.format("DD/MM/YYYY"),
              });
            }}
          />
        </Col>
        <Col span={4} className="text-number">
          <DatePicker
            name={"d_mfg_date"}
            format={"DD/MM/YYYY"}
            style={{ width: "100%" }}
            size={"small"}
            placeholder="MFG date..."
            value={line.d_mfg ? moment(line.d_mfg, "DD/MM/YYYY") : ""}
            defaultValue={line.d_mfg ? moment(line.d_mfg, "DD/MM/YYYY") : ""}
            onChange={(data) => {
              onChangeValue({
                d_mfg: data.format("DD/MM/YYYY"),
              });
            }}
          />
        </Col>
        <Col span={4} className="text-number">
          <DatePicker
            name={"d_exp_date"}
            format={"DD/MM/YYYY"}
            style={{ width: "100%" }}
            size={"small"}
            placeholder="Expiry date..."
            value={line.d_exp ? moment(line.d_exp, "DD/MM/YYYY") : ""}
            defaultValue={line.d_exp ? moment(line.d_exp, "DD/MM/YYYY") : ""}
            onChange={(data) => {
              onChangeValue({
                d_exp: data.format("DD/MM/YYYY"),
              });
            }}
          />
        </Col>
        <Col span={3} className="text-number">
          <InputNumber
            placeholder={"Quantity"}
            min={0.0}
            step={0.0001}
            precision={4}
            value={line.d_qty}
            style={{ width: "100%" }}
            disabled={0}
            defaultValue={line.d_qty}
            onChange={(data) => {
              onChangeValue(line.id, {
                d_qty: data,
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
            defaultValue={line.d_unit}
            value={line.d_unit}
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
            onChange={(data) => onChangeValue(line.id, { d_unit: data })}
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
          backgroundColor: "#eeeeee",
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
              <Col span={8} className="text-string">
                <Text>{line.item}</Text>
              </Col>
              <Col span={3} className="text-number">
                <Text>{line.item_qty}</Text>
              </Col>
              <Col span={3} className="text-string">
                <Text>{line.item_unit}</Text>
              </Col>
              <Col span={3} className="text-number">
                <Text>{line.item_qty_done}</Text>
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
          background: "#eeeeee",
          background:
            "linear-gradient(180deg, rgba(198,198,198,1) 0%, rgba(238,238,238,1) 55%, rgba(255,255,255,1) 100%)",
          marginBottom: 20,
        }}
      ></Row>
    </>
  );
};

export default ItemLine;
