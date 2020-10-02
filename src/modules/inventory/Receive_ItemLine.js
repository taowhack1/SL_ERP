import {
  Button,
  Row,
  Col,
  InputNumber,
  AutoComplete,
  Typography,
  Select,
  Divider,
  Modal,
} from "antd";
import {
  DeleteTwoTone,
  PlusOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import DetailLine from "../inventory/Receive_DetailLine";
import { qtyDoneColumns } from "../../data/inventory/data";
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
  detail,
}) => {
  const [visible, setVisible] = useState(false);
  const [lineItem, setLine] = useState(dataLine);
  const [detailQty, setDetailQty] = useState(detail);
  const [selectLine, setSelectLine] = useState(null);
  useEffect(() => {
    dataLine && updateData({ dataLine: [...lineItem] });
  }, [lineItem]);

  const addLine = () => {
    setLine([
      ...sortData(dataLine),
      {
        id: dataLine.length++,
        item: null,
        item_qty: 0,
        item_unit: null,
        item_qty_done: 0,
        item_unit_price: 0,
        item_subtotal: 0,
        item_qty_done_detail: [
          {
            id: 0,
            d_batch_no: null,
            d_receive_date: null,
            d_mfg: null,
            d_exp: null,
            d_qty: 0,
            d_unit: null,
          },
        ],
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
  const onChangeDetailValue = (rowId, data, d_id) => {
    setLine(
      dataLine.map((line) =>
        line.id === rowId
          ? {
              ...line,
              item_qty_done_detail: { ...data },
            }
          : line
      )
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

  const modalSave = () => {
    setVisible(false);
    setSelectLine(null);
  };

  const modalCancel = () => {
    setVisible(false);
    setSelectLine(null);
  };

  const modalConfig = {
    width: 1100,
    title: "Receive Detail",
    visible: visible,
    onOk: modalSave,
    onCancel: modalCancel,
    destroyOnClose: true,
    okText: "Save",
    cancelText: "Discard",
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
        <Col span={8} className="text-string">
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
            placeholder={"Quantity Done"}
            min={0.0}
            step={0.0001}
            precision={4}
            value={line.item_qty_done}
            style={{ width: "100%" }}
            disabled={0}
            defaultValue={line.item_qty_done}
            onClick={() => {
              setVisible(true);
              setSelectLine(line);
            }}
            onChange={(data) => {
              onChangeValue(line.id, {
                item_qty_done: data,
              });
            }}
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
          background: "#c6c6c6",
          background:
            "linear-gradient(180deg,rgba(198,198,198,1) 0%, rgba(198,198,198,1) 55%,rgba(255,255,255,1) 100%)",
          marginBottom: 20,
        }}
      ></Row>
      <Modal {...modalConfig}>
        <Row className="row-margin-vertical">
          <Col span={3}>
            <Text strong>Item</Text>
          </Col>
          <Col span={21}>{selectLine && selectLine.item}</Col>
        </Row>
        <Row className="row-margin-vertical">
          <Col span={3}>
            <Text strong>Quantity</Text>
          </Col>
          <Col span={21}>
            {selectLine &&
              numeral(selectLine.item_qty).format("0,000.0000") + "  "}
            <Text strong>{selectLine && selectLine.item_unit}</Text>
          </Col>
        </Row>
        <Row className="row-margin-vertical">
          <Col span={3}>
            <Text strong>Quantity Done</Text>
          </Col>
          <Col span={21}>
            {selectLine &&
              numeral(selectLine.item_qty_done).format("0,000.0000") + "  /  "}
            {selectLine &&
              numeral(selectLine.item_qty).format("0,000.0000") + "  "}
            <Text strong>{selectLine && selectLine.item_unit}</Text>
          </Col>
        </Row>
        <Row className="row-tab-margin-lg">
          <Col span={24}>
            <DetailLine
              items={items}
              units={units}
              // itemLots={itemLots}
              columns={qtyDoneColumns}
              updateDetail={onChangeDetailValue}
              dataLine={selectLine && selectLine.item_qty_done_detail}
              readOnly={false}
              selectLine={selectLine && selectLine.id}
            />
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default ItemLine;
