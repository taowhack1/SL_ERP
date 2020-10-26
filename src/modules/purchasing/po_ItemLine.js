import {
  Button,
  Row,
  Col,
  InputNumber,
  AutoComplete,
  Typography,
  Select,
  Divider,
  DatePicker,
} from "antd";
import {
  DeleteTwoTone,
  PlusOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  PO_addItemLine,
  PO_delItemLine,
  PO_updateValueItemLine,
} from "../../actions/purchase";
import {
  get_po_detail,
  get_pr_detail,
  update_po_head,
} from "../../actions/purchase/PO_Actions";
import { po_detail_fields } from "./fields_config/po";
import numeral from "numeral";
import CustomSelect from "../../components/CustomSelect";
import { calSubtotal, sumArrObj } from "../../include/js/function_main";
import moment from "moment";
const { Option } = Select;
const { Text } = Typography;
const numberFormat = {
  precision: 3,
  formatter: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
  parser: (value) => value.replace(/\$\s?|(,*)/g, ""),
};

const ItemLine = ({ readOnly, columns, pr_id, po_id, vat_rate }) => {
  const dispatch = useDispatch();
  // master data
  useEffect(() => {
    console.log("Change Detail");
    pr_id && !po_id && dispatch(get_pr_detail(pr_id));
    po_id && dispatch(get_po_detail(po_id));
  }, [pr_id]);
  const [tricker, setTricker] = useState(false);
  const po_detail = useSelector((state) => state.purchase.po.po_detail);
  const select_items = useSelector(
    (state) => state.inventory.master_data.item_list
  );
  const select_uoms = useSelector(
    (state) => state.inventory.master_data.item_uom
  );

  useEffect(() => {
    console.log("Cal_po_head");
    if (po_id || pr_id) {
      const obj = sumArrObj(po_detail, "po_detail_total_price", vat_rate);
      dispatch(
        update_po_head({
          tg_po_sum_amount: obj.exclude_vat,
          tg_po_vat_amount: obj.vat,
          tg_po_total_amount: obj.include_vat,
        })
      );
    }
  }, [dispatch, tricker]);

  // state
  const [count, setCount] = useState(po_detail.length);

  // function
  const addLine = () => {
    dispatch(PO_addItemLine({ ...po_detail_fields, id: count }));
    setCount(count + 1);
  };

  const delLine = (id) => {
    dispatch(PO_delItemLine(id));
  };

  const onChangeValue = (rowId, data) => {
    dispatch(PO_updateValueItemLine(rowId, data));
  };

  const renderItemLine = (data) => {
    let renderLine =
      data &&
      data.map((line, key) => (
        <Row
          key={key}
          style={{
            marginBottom: 0,
            border: "1px solid white",
            backgroundColor: "#FCFCFC",
          }}
          gutter={2}
          className="col-2"
        >
          <Col span={6} className="text-string">
            <Select
              allowClear
              showSearch
              placeholder="Item"
              size={"small"}
              field_id="item_id"
              field_name="item_name"
              value={line.item_no_name}
              onChange={(data, option) => {
                data && data
                  ? onChangeValue(line.id, {
                      item_id: data,
                      uom_id: option.uom_id,
                      item_no_name: option.title,
                      uom_no: option.uom_no,
                    })
                  : onChangeValue(line.id, {
                      item_id: null,
                      uom_id: null,
                      item_no_name: null,
                      uom_no: null,
                    });
              }}
              style={{ width: "100%" }}
              filterOption={(inputValue, option) =>
                option.title &&
                option.title.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                  -1
              }
            >
              {select_items &&
                select_items.map((item, key) => {
                  return (
                    <Option
                      key={key}
                      value={item.item_id}
                      title={item.item_no_name}
                      uom_id={item.uom_id}
                      uom_no={item.uom_no}
                    >
                      {item.item_no_name}
                    </Option>
                  );
                })}
            </Select>
          </Col>
          <Col span={3} className="text-number">
            <InputNumber
              placeholder={"Quantity"}
              min={0.0}
              step={0.001}
              precision={3}
              {...numberFormat}
              value={line.po_detail_qty}
              style={{ width: "100%" }}
              disabled={0}
              onChange={(data) => {
                onChangeValue(line.id, {
                  po_detail_qty: data,
                  po_detail_total_price: calSubtotal(
                    data,
                    line.po_detail_price,
                    line.po_detail_discount
                  ),
                });
                setTricker(!tricker);
              }}
              size="small"
            />
          </Col>
          <Col span={2} className="text-string">
            <CustomSelect
              allowClear
              showSearch
              size={"small"}
              placeholder={"Unit"}
              data={select_uoms}
              field_id="uom_id"
              field_name="uom_no"
              value={line.uom_no}
              onSelect={(data, option) =>
                onChangeValue(line.id, {
                  uom_id: data,
                  uom_no: option.title,
                })
              }
              onChange={(data) => onChangeValue({ uom_id: data })}
            />
          </Col>

          <Col span={3} className="text-number">
            <InputNumber
              name="po_detail_price"
              placeholder="Unit Price"
              value={line.po_detail_price}
              precision={3}
              {...numberFormat}
              step={5}
              onChange={(data) => {
                onChangeValue(line.id, {
                  po_detail_price: data,
                  po_detail_total_price: calSubtotal(
                    line.po_detail_qty,
                    data,
                    line.po_detail_discount
                  ),
                });
                setTricker(!tricker);
              }}
              style={{ width: "100%" }}
              size="small"
            />
          </Col>
          <Col span={3} className="text-number">
            <InputNumber
              name="item_discount"
              placeholder="Discount"
              value={line.po_detail_discount}
              min={0.0}
              step={5}
              precision={3}
              {...numberFormat}
              onChange={(data) => {
                onChangeValue(
                  line.id,
                  {
                    po_detail_discount: data,
                    po_detail_total_price: calSubtotal(
                      line.po_detail_qty,
                      line.po_detail_price,
                      data
                    ),
                  },
                  true
                );
                setTricker(!tricker);
              }}
              style={{ width: "100%" }}
              size="small"
            />
          </Col>
          <Col span={3} className="text-number">
            <div className="total-number">
              {numeral(line.po_detail_total_price).format("0,0.000")}
            </div>
          </Col>
          <Col span={3} className="text-number">
            <DatePicker
              name={"po_detail_due_date"}
              format={"DD/MM/YYYY"}
              size="small"
              style={{ width: "100%" }}
              placeholder="Due date..."
              value={
                line.po_detail_due_date && line.po_detail_due_date
                  ? moment(line.po_detail_due_date, "DD/MM/YYYY")
                  : ""
              }
              onChange={(data) => {
                onChangeValue(line.id, {
                  po_detail_due_date: data.format("DD/MM/YYYY"),
                });
              }}
            />
          </Col>
          <Col span={1} style={{ textAlign: "center" }}>
            <DeleteTwoTone
              onClick={() => {
                delLine(line.id);
                setTricker(!tricker);
              }}
            />
          </Col>
        </Row>
      ));
    return renderLine;
  };
  po_detail && !po_id && !po_detail.length && addLine();
  return (
    <>
      {/* Column Header */}
      <Row gutter={2} className="detail-table-head">
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
          {renderItemLine(po_detail)}

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
          {po_detail.map((line, key) => (
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
              <Col span={6} className="text-string">
                <Text className="text-view">{line.item_no_name}</Text>
              </Col>
              <Col span={3} className="text-number">
                <Text className="text-view">
                  {numeral(line.po_detail_qty).format("0,0.000")}
                </Text>
              </Col>
              <Col span={2} className="text-string">
                <Text className="text-view">{line.uom_no}</Text>
              </Col>
              <Col span={3} className="text-number">
                <Text className="text-view">
                  {numeral(line.po_detail_price).format("0,0.000")}
                </Text>
              </Col>
              <Col span={3} className="text-number">
                <Text className="text-view">
                  {numeral(line.po_detail_discount).format("0,0.000")}
                </Text>
              </Col>
              <Col span={3} className="text-number">
                <Text className="text-view">
                  {numeral(line.po_detail_total_price).format("0,0.000")}
                </Text>
              </Col>
              <Col span={3} className="text-number">
                <Text className="text-view">
                  {line.po_detail_due_date &&
                    moment(line.po_detail_due_date, "DD/MM/YYYY").format(
                      "DD/MM/YYYY"
                    )}
                </Text>
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
