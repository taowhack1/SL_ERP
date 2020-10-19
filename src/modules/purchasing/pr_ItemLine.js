import {
  Button,
  Row,
  Col,
  InputNumber,
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
import {
  update_pr_head,
  get_pr_detail,
} from "../../actions/purchase/PR_Actions";
import {
  addItemLine,
  delItemLine,
  updateValueItemLine,
} from "../../actions/purchase";
import { pr_detail_fields } from "./fields_config/pr";
import CustomSelect from "../../components/CustomSelect";
import { calSubtotal, sumArrObj } from "../../include/js/function_main";
import numeral from "numeral";

const { Text } = Typography;
const { Option } = Select;

const numberFormat = {
  precision: 3,
  formatter: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
  parser: (value) => value.replace(/\$\s?|(,*)/g, ""),
};

const ItemLine = ({ readOnly, columns, pr_id, upDateFormData, vat_rate }) => {
  const dispatch = useDispatch();

  // master data
  const pr_detail = useSelector((state) => state.purchase.pr_detail);
  useEffect(() => {
    const obj = sumArrObj(pr_detail, "pr_detail_total_price", vat_rate);
    dispatch(
      update_pr_head({
        tg_pr_sum_amount: obj.exclude_vat,
        tg_pr_vat_amount: obj.vat,
        tg_pr_total_amount: obj.include_vat,
      })
    );
  }, [pr_detail, dispatch]);
  const select_items = useSelector((state) => state.inventory.select_box_item);
  const select_uoms = useSelector((state) => state.inventory.select_box_uom);

  // state
  const [count, setCount] = useState(pr_detail.length);

  // function
  const addLine = () => {
    dispatch(addItemLine({ ...pr_detail_fields, id: count }));
    setCount(count + 1);
  };

  const delLine = (id) => {
    dispatch(delItemLine(id));
  };

  const onChangeValue = (rowId, data, isUpdateCost = false) => {
    dispatch(updateValueItemLine(rowId, data));
  };

  const dateConfig = {
    format: "DD/MM/YYYY",
    value: moment(),
    disabled: 1,
  };
  !pr_detail.length && addLine();

  return (
    <>
      {/* Column Header */}
      <Row
        style={{
          backgroundColor: "#C6C6C6",
          textAlign: "center",
        }}
        gutter={2}
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
          {pr_detail.length &&
            pr_detail.map((line, key) => (
              <Row
                key={line.id}
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
                    field_id="item_id"
                    field_name="item_name"
                    value={line.item_no_name}
                    size="small"
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
                      option.title
                        .toUpperCase()
                        .indexOf(inputValue.toUpperCase()) !== -1
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
                    {...numberFormat}
                    placeholder={"Qty"}
                    min={0.0}
                    step={0.001}
                    size="small"
                    style={{ width: "100%" }}
                    disabled={0}
                    defaultValue={line.pr_detail_qty}
                    value={line.pr_detail_qty}
                    onChange={(data) => {
                      onChangeValue(
                        line.id,
                        {
                          pr_detail_qty: data,
                          pr_detail_total_price: calSubtotal(
                            line.pr_detail_price,
                            data,
                            line.pr_detail_discount
                          ),
                        },
                        true
                      );
                    }}
                  />
                </Col>
                <Col span={2} className="text-string">
                  <CustomSelect
                    allowClear
                    showSearch
                    size="small"
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
                    {...numberFormat}
                    name="pr_detail_price"
                    placeholder="Unit Price"
                    value={line.pr_detail_price}
                    min={0.0}
                    precision={3}
                    step={5}
                    onChange={(data) => {
                      onChangeValue(
                        line.id,
                        {
                          pr_detail_price: data,
                          pr_detail_total_price: calSubtotal(
                            line.pr_detail_qty,
                            data,
                            line.pr_detail_discount
                          ),
                        },
                        true
                      );
                    }}
                    style={{ width: "100%" }}
                    size="small"
                  />
                </Col>
                <Col span={3} className="text-number">
                  {console.log(line.pr_detail_discount)}
                  <InputNumber
                    {...numberFormat}
                    name="item_discount"
                    placeholder="Discount"
                    value={line.pr_detail_discount}
                    min={0.0}
                    step={5}
                    onChange={(data) => {
                      onChangeValue(
                        line.id,
                        {
                          pr_detail_discount: data,
                          pr_detail_total_price: calSubtotal(
                            line.pr_detail_qty,
                            line.pr_detail_price,
                            data
                          ),
                        },
                        true
                      );
                    }}
                    style={{ width: "100%" }}
                    size="small"
                  />
                </Col>
                <Col span={3} className="text-number">
                  <div className="total-number">
                    {numeral(line.pr_detail_total_price).format("0,0.000")}
                  </div>
                </Col>
                <Col span={3} className="text-number">
                  <DatePicker
                    name={"pr_detail_due_date"}
                    format={dateConfig.format}
                    size="small"
                    style={{ width: "100%" }}
                    placeholder="Due date..."
                    value={
                      line.pr_detail_due_date
                        ? moment(line.pr_detail_due_date, "DD/MM/YYYY")
                        : ""
                    }
                    onChange={(data) => {
                      onChangeValue(line.id, {
                        pr_detail_due_date: data.format("DD/MM/YYYY"),
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
                addLine(pr_detail);
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
          {pr_detail.map((line, key) => (
            <Row
              key={line.id}
              style={{
                marginBottom: 0,
                border: "1px solid white",
                backgroundColor: "#FCFCFC",
              }}
              gutter={2}
              className="col-2"
            >
              <Col span={6} className="text-string">
                <Text className="text-view">{line.item_no_name}</Text>
              </Col>
              <Col span={3} className="text-number">
                <Text className="text-view">
                  {numeral(line.pr_detail_qty).format("0,0.000")}
                </Text>
              </Col>
              <Col span={2} className="text-string">
                <Text className="text-view">{line.uom_no}</Text>
              </Col>
              <Col span={3} className="text-number">
                <Text className="text-view">
                  {numeral(line.pr_detail_price).format("0,0.000")}
                </Text>
              </Col>
              <Col span={3} className="text-number">
                <Text className="text-view">
                  {numeral(line.pr_detail_discount).format("0,0.000")}
                </Text>
              </Col>
              <Col span={3} className="text-number">
                <Text className="text-view">
                  {numeral(line.pr_detail_total_price).format("0,0.000")}
                </Text>
              </Col>

              <Col span={3} className="text-number">
                <Text className="text-view">
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
