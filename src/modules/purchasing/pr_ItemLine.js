import {
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
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { get_pr_detail } from "../../actions/Purchase/PR_Actions";
import { pr_detail_fields } from "./fields_config/pr";
const { Text } = Typography;

const VendorLine = ({
  units,
  items,
  dataLine,
  updateData,
  readOnly,
  columns,
  pr_id,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_pr_detail(pr_id));
  }, [dispatch]);
  const pr_detail = useSelector((state) => state.purchase.pr_detail);
  const countItem = dataLine && dataLine.length ? dataLine.length : 0;
  const [count, setCount] = useState(countItem);
  const [lineItem, setLine] = useState(
    dataLine && dataLine ? [...pr_detail] : []
  );

  useEffect(() => {
    // dataLine && updateData({ dataLine: [...lineItem] });
  }, [lineItem]);

  const addLine = () => {
    setLine([...lineItem, pr_detail_fields]);
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
          {pr_detail.map((line, key) => (
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
                  defaultValue={line.item_id}
                  // filterOption={(inputValue, option) =>
                  //   option.value
                  //     .toUpperCase()
                  //     .indexOf(inputValue.toUpperCase()) !== -1
                  // }
                  onChange={(data) => onChangeValue(line.id, { item_id: data })}
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
                  defaultValue={line.pr_detail_qty}
                  onChange={(data) =>
                    onChangeValue(line.id, { pr_detail_qty: data })
                  }
                />
              </Col>
              <Col span={3} className="text-string">
                <AutoComplete
                  style={{ width: "100%" }}
                  options={units}
                  placeholder="Unit..."
                  defaultValue={line.uom_id}
                  // filterOption={(inputValue, option) =>
                  //   option.value
                  //     .toUpperCase()
                  //     .indexOf(inputValue.toUpperCase()) !== -1
                  // }
                  onChange={(data) => onChangeValue(line.id, { uom_id: data })}
                />
              </Col>

              <Col span={5} className="text-number">
                {console.log(line.pr_detail_due_date)}
                <DatePicker
                  name={"pr_detail_due_date"}
                  format={dateConfig.format}
                  style={{ width: "100%" }}
                  placeholder="Due date..."
                  defaultValue={
                    line.pr_detail_due_date
                      ? moment(
                          line.pr_detail_due_date,
                          "YYYY-MM-DD HH:mm:ss"
                        ).add(7, "hours")
                      : ""
                  }
                  onChange={(data) => {
                    onChangeValue(line.id, {
                      pr_detail_due_date: data.format("DD/MM/YYYY HH:mm:ss"),
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
                <Text>{line.item_id}</Text>
              </Col>
              <Col span={3} className="text-number">
                <Text>{line.pr_detail_qty}</Text>
              </Col>
              <Col span={3} className="text-string">
                <Text>{line.uom_id}</Text>
              </Col>

              <Col span={5} className="text-number">
                <Text>
                  {moment(line.pr_detail_due_date, "DD/MM/YYYY").format(
                    "DD/MM/YYYY"
                  )}
                </Text>
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
