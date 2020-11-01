import {
  Button,
  Row,
  Col,
  InputNumber,
  AutoComplete,
  Typography,
  Input,
} from "antd";
import {
  DeleteTwoTone,
  PlusOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect } from "react";

const { Text } = Typography;

const VendorLine = ({
  units,
  dataLine,
  updateData,
  readOnly,
  columns,
  vendors,
  companys,
}) => {
  const countItem = dataLine.length;
  const [count, setCount] = useState(countItem);
  const [lineItem, setLine] = useState([...dataLine]);

  // useEffect(() => {
  //   updateData({ vendor: [...lineItem] });
  // }, [lineItem, updateData]);

  const addLine = () => {
    setLine([
      ...lineItem,
      {
        id: count,
        vendorName: `Vendor ${count}`,
        companyName: `Company ${count}`,
        itemQty: 0,
        itemUnit: "pc",
        itemPrice: 0,
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
              <Col span={7} className="text-string">
                <AutoComplete
                  style={{ width: "100%" }}
                  options={vendors}
                  placeholder="Vendor Name"
                  defaultValue={line.vendorName}
                  filterOption={(inputValue, option) =>
                    option.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                  onChange={(data) =>
                    onChangeValue(line.id, { vendorName: data })
                  }
                  size="small"
                />
              </Col>
              <Col span={3} className="text-string">
                <InputNumber
                  placeholder={"Lead time"}
                  min={0}
                  step={1}
                  precision={0}
                  style={{ width: "100%" }}
                  disabled={0}
                  defaultValue={line.vendor_lead_time}
                  onChange={(data) =>
                    onChangeValue(line.id, { vendor_lead_time: data })
                  }
                  size="small"
                />
              </Col>
              <Col span={3} className="text-number">
                <InputNumber
                  placeholder={"Min Quantity"}
                  min={0.0}
                  step={0.0001}
                  precision={4}
                  style={{ width: "100%" }}
                  disabled={0}
                  defaultValue={line.itemPrice}
                  onChange={(data) => onChangeValue(line.id, { itemQty: data })}
                  size="small"
                />
              </Col>

              <Col span={2} className="text-string">
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
                  size="small"
                />
              </Col>
              <Col span={3} className="text-number">
                <InputNumber
                  placeholder={"Unit/Price"}
                  min={0.0}
                  step={50.0}
                  precision={3}
                  style={{ width: "100%" }}
                  disabled={0}
                  defaultValue={line.itemPrice}
                  onChange={(data) =>
                    onChangeValue(line.id, { itemPrice: data })
                  }
                  size="small"
                />
              </Col>
              <Col span={5} className="text-number">
                <Input
                  placeholder={"Remark"}
                  style={{ width: "100%" }}
                  disabled={0}
                  defaultValue={line.vendor_item_remark}
                  onChange={(e) =>
                    onChangeValue(line.id, {
                      vendor_item_remark: e.target.value,
                    })
                  }
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
              <Col span={7} className="text-string">
                <Text>{line.vendorName}</Text>
              </Col>
              <Col span={3} className="text-number">
                <Text>{line.vendor_lead_time}</Text>
              </Col>
              <Col span={3} className="text-number">
                <Text>{line.itemQty}</Text>
              </Col>
              <Col span={2} className="text-string">
                <Text>{line.itemUnit}</Text>
              </Col>
              <Col span={3} className="text-number">
                <Text>{line.itemPrice}</Text>
              </Col>
              <Col span={5} className="text-number">
                <Text>{line.vendor_item_remark}</Text>
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
