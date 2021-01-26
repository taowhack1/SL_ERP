import {
  Button,
  Row,
  Col,
  Typography,
  Modal,
  InputNumber,
  DatePicker,
  message,
} from "antd";
import {
  PlusOutlined,
  EllipsisOutlined,
  FormOutlined,
  InfoCircleTwoTone,
  DeleteTwoTone,
} from "@ant-design/icons";
import React, { useState, useEffect, useReducer } from "react";

import SubDetail from "./Receive_Sub_Detail";
import {
  calSubtotal,
  sumArrObj,
  sumArrOdjWithField,
  validateFormDetail,
} from "../../../../include/js/function_main";
import {
  receive_detail_fields,
  recieve_detail_columns,
  receive_sub_detail_fields,
  receive_sub_detail_require_fields,
} from "../../config";
import { useDispatch, useSelector } from "react-redux";
import CustomSelect from "../../../../components/CustomSelect";
import moment from "moment";

import { get_location_shelf_by_item_id } from "../../../../actions/inventory";
import { convertDigit, numberFormat } from "../../../../include/js/main_config";
import { mainReducer } from "../../../../include/reducer";
const { Text } = Typography;

const ReceiveDetail = ({
  readOnly,
  po_id,
  data_detail,
  headDispatch,
  detailDispatch,
  vat_rate,
}) => {
  const dispatch = useDispatch();
  const select_items = useSelector(
    (state) => state.inventory.master_data.item_list
  );
  const select_uoms = useSelector(
    (state) => state.inventory.master_data.item_uom
  );

  const [visible, setVisible] = useState(false);
  const [temp_detail, setTempDetail] = useState(null);
  const [temp_sub_detail, tempSubDetailDispatch] = useReducer(mainReducer, [
    receive_sub_detail_fields,
  ]);

  const updateAmount = () => {
    const obj = sumArrObj(data_detail, "receive_detail_total_price", vat_rate);
    headDispatch({
      type: "CHANGE_HEAD_VALUE",
      payload: {
        tg_receive_sum_amount: obj.exclude_vat,
        tg_receive_vat_amount: obj.vat,
        tg_receive_total_amount: obj.include_vat,
      },
    });
  };

  useEffect(() => {
    !readOnly && updateAmount();
  }, [data_detail]);

  // function
  const addLine = () => {
    detailDispatch({ type: "ADD_ROW", payload: receive_detail_fields });
  };
  const delLine = (id) => {
    detailDispatch({ type: "DEL_ROW", payload: { id: id } });
  };

  const modalSave = () => {
    console.log("Confirm Modal", "id", temp_detail.id, temp_sub_detail);
    const key = "validate";
    const validate_detail = validateFormDetail(
      temp_sub_detail,
      receive_sub_detail_require_fields
    );
    if (validate_detail.validate) {
      setVisible(false);
      const receive_qty = sumArrOdjWithField(
        temp_sub_detail,
        "receive_detail_sub_qty"
      );

      console.log(
        "balance",
        temp_detail.tg_receive_detail_qty_balance_temp,
        receive_qty,
        temp_detail.tg_receive_detail_qty_balance_temp - receive_qty
      );
      detailDispatch({
        type: "CHANGE_DETAIL_VALUE",
        payload: {
          id: temp_detail.id,
          data: {
            receive_sub_detail: temp_sub_detail,
            tg_receive_detail_qty: receive_qty,
            receive_detail_total_price: calSubtotal(
              receive_qty,
              temp_detail.receive_detail_price
              // discount
            ),
            tg_receive_detail_qty_balance:
              temp_detail.tg_receive_detail_qty_balance_temp - receive_qty,
          },
        },
      });
      setTempDetail(null);
    } else {
      message.warning({
        content: "Please fill your form completely.",
        key,
        duration: 2,
      });
    }
  };

  const modalCancel = () => {
    setVisible(false);
    setTempDetail(null);
    console.log("Cancel Modal");
    tempSubDetailDispatch({
      type: "SET_DETAIL",
      payload: [receive_sub_detail_fields],
    });
  };
  const onChangeValue = (rowId, data) => {
    detailDispatch({
      type: "CHANGE_DETAIL_VALUE",
      payload: {
        id: rowId,
        data: data,
      },
    });
  };
  const get_location_shelf = (item_id) => {
    dispatch(get_location_shelf_by_item_id(item_id));
  };
  console.log("data_detail 2", data_detail);
  console.log("temp_sub_detail", temp_sub_detail);
  return (
    <>
      {/* Column Header */}
      <Row gutter={2} className="detail-table-head">
        {recieve_detail_columns &&
          recieve_detail_columns.map((col, key) => {
            return (
              <Col key={key} span={col.size} className="col-outline">
                {col.require && !readOnly && (
                  <span className="require">* </span>
                )}
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
          {data_detail &&
            data_detail.map((line, key) => (
              <Row
                key={key}
                style={{
                  marginBottom: 0,
                  border: "1px solid white",
                  backgroundColor: "#FCFCFC",
                }}
                gutter={2}
                name={`row-${key}`}
                className="col-2"
              >
                {po_id ? (
                  <>
                    {/* RECEIVE FROM PO */}
                    <Col span={6} className="text-string">
                      <div
                        className="input-string-disabled text-value"
                        placeholder="Item"
                      >
                        {line.item_no_name}
                      </div>
                    </Col>
                    <Col span={3} className="text-number">
                      <div className="total-number text-value">
                        {convertDigit(line.po_detail_qty)}
                      </div>
                    </Col>
                    <Col span={3} className="text-number">
                      <div className="total-number text-value">
                        {convertDigit(line.tg_receive_detail_qty_balance)}
                      </div>
                    </Col>
                    <Col span={3} className="text-number">
                      <div
                        className={
                          line.tg_receive_detail_qty_balance > 0
                            ? "total-number-modal text-value"
                            : "total-number text-value"
                        }
                      >
                        {convertDigit(line.tg_receive_detail_qty)}
                      </div>
                    </Col>
                    <Col span={2} className="text-string">
                      <div
                        className="input-string-disabled text-value"
                        placeholder="Unit"
                      >
                        {line.uom_no}
                      </div>
                    </Col>
                    <Col span={3} className="text-number">
                      <div className="total-number text-value">
                        {convertDigit(line.receive_detail_price)}
                      </div>
                    </Col>
                    <Col span={3} className="text-number text-value">
                      <div
                        className="input-string-disabled text-center"
                        placeholder="Due Date"
                      >
                        {line.receive_detail_due_date}
                      </div>
                    </Col>
                    <Col span={1} style={{ textAlign: "center" }}>
                      {line.tg_receive_detail_qty_balance_temp > 0 && (
                        <FormOutlined
                          onClick={() => {
                            setVisible(true);
                            tempSubDetailDispatch({
                              type: "SET_DETAIL",
                              payload: line.receive_sub_detail,
                            });
                            setTempDetail(line);
                            get_location_shelf(line.item_id);
                          }}
                          className="button-icon"
                        />
                      )}
                    </Col>
                    {/* END RECEIVE FROM PO  */}
                  </>
                ) : (
                  <>
                    {/* RECEIVE WITHOUT PO */}
                    <Col span={6} className="text-string">
                      <CustomSelect
                        allowClear
                        showSearch
                        size="small"
                        placeholder={"Item"}
                        data={select_items}
                        field_id="item_id"
                        field_name="item_no_name"
                        value={line.item_no_name}
                        onChange={(data, option) =>
                          data && data
                            ? onChangeValue(line.id, {
                                item_id: data,
                                uom_id: option.data.uom_id,
                                item_no_name: option.title,
                                uom_no: option.data.uom_no,
                              })
                            : onChangeValue(line.id, {
                                item_id: null,
                                uom_id: null,
                                item_no_name: null,
                                uom_no: null,
                              })
                        }
                      />
                    </Col>
                    <Col span={3} className="text-number">
                      <div className="total-number text-value">
                        {convertDigit(line.po_detail_qty)}
                      </div>
                    </Col>
                    <Col span={3} className="text-number">
                      <div className="total-number text-value">
                        {convertDigit(line.tg_receive_detail_qty_balance)}
                      </div>
                    </Col>
                    <Col span={3} className="text-number">
                      <InputNumber
                        {...numberFormat}
                        placeholder={"Qty"}
                        min={0.0}
                        step={1}
                        size="small"
                        className={"full-width"}
                        disabled={0}
                        value={line.tg_receive_detail_qty}
                        onChange={(data) => {
                          onChangeValue(line.id, {
                            tg_receive_detail_qty: data,
                            // so_detail_total_price: calSubtotal(
                            //   line.so_detail_price,
                            //   data,
                            //   line.so_detail_discount
                            // ),
                          });
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
                        onChange={(data, option) =>
                          data
                            ? onChangeValue(line.id, {
                                uom_id: data,
                                uom_no: option.title,
                              })
                            : onChangeValue(line.id, {
                                uom_id: null,
                                uom_no: null,
                              })
                        }
                      />
                    </Col>
                    <Col span={3} className="text-number">
                      <InputNumber
                        {...numberFormat}
                        name="receive_detail_price"
                        placeholder="Unit Price"
                        value={line.receive_detail_price}
                        min={0.0}
                        step={5}
                        onChange={(data) => {
                          onChangeValue(line.id, {
                            receive_detail_price: data,
                          });
                        }}
                        className={"full-width"}
                        size="small"
                      />
                    </Col>
                    <Col span={3} className="text-number text-value">
                      <DatePicker
                        name={"receive_detail_due_date"}
                        format={"DD/MM/YYYY"}
                        size="small"
                        className={"full-width"}
                        placeholder="Due Date"
                        value={
                          line.receive_detail_due_date &&
                          line.receive_detail_due_date
                            ? moment(line.receive_detail_due_date, "DD/MM/YYYY")
                            : ""
                        }
                        onChange={(data) => {
                          onChangeValue(line.id, {
                            receive_detail_due_date: data.format("DD/MM/YYYY"),
                          });
                        }}
                      />
                    </Col>
                    <Col span={1} style={{ textAlign: "center" }}>
                      <DeleteTwoTone onClick={() => delLine(line.id)} />
                    </Col>
                    {/* END RECEIVE WITHOUT FROM PO  */}
                  </>
                )}
              </Row>
            ))}
          <div style={{ marginTop: 10 }}>
            {!po_id && (
              <Button
                type="dashed"
                onClick={() => {
                  addLine();
                }}
                block
              >
                <PlusOutlined /> Add a line
              </Button>
            )}
          </div>
        </>
      ) : (
        <>
          {/* View Form */}
          {data_detail &&
            data_detail.map((line, key) => (
              <Row
                key={key}
                style={{
                  marginBottom: 0,
                  border: "1px solid white",
                  backgroundColor: "#FCFCFC",
                }}
                gutter={2}
                name={`row-${key}`}
                className="col-2"
              >
                <Col span={7} className="text-string">
                  <Text className="text-view text-string">
                    {line.item_no_name}
                  </Text>
                </Col>
                <Col span={3} className="text-number">
                  <Text className="text-view text-number">
                    {convertDigit(line.po_detail_qty)}
                  </Text>
                </Col>
                <Col span={3} className="text-number">
                  <Text className="text-view text-number">
                    {convertDigit(line.tg_receive_detail_qty_balance)}
                  </Text>
                </Col>
                <Col span={3} className="text-number">
                  <Text className="text-view text-number">
                    {convertDigit(line.tg_receive_detail_qty)}
                  </Text>
                </Col>
                <Col span={2} className="text-string">
                  <Text className="text-view text-string">{line.uom_no}</Text>
                </Col>
                <Col span={2} className="text-number">
                  <Text className="text-view text-number">
                    {convertDigit(line.receive_detail_price)}
                  </Text>
                </Col>
                {/* <Col span={2} className="text-number">
                  <Text className="text-view text-number">
                    {convertDigit(line.receive_detail_discount) }
                  </Text>
                </Col>
                <Col span={3} className="text-number">
                  <Text className="text-view text-number">
                    {convertDigit(line.receive_detail_total_price) }
                  </Text>
                </Col> */}
                <Col span={3} className="text-center">
                  <Text className="text-view text-string">
                    {line.receive_detail_due_date}
                  </Text>
                </Col>
                <Col span={1} className="text-center">
                  <InfoCircleTwoTone
                    className="button-icon"
                    onClick={() => {
                      setVisible(true);
                      tempSubDetailDispatch({
                        type: "SET_DETAIL",
                        payload: line.receive_sub_detail,
                      });
                      setTempDetail(line);
                      get_location_shelf(line.item_id);
                    }}
                  />
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
      <Modal
        width={1100}
        title="Receive Detail"
        visible={visible}
        destroyOnClose
        onOk={modalSave}
        onCancel={modalCancel}
        footer={[
          <Button
            key="back"
            className={readOnly ? "primary" : ""}
            onClick={modalCancel}
          >
            Discard
          </Button>,
          !readOnly && (
            <Button key="submit" className="primary" onClick={modalSave}>
              Confirm
            </Button>
          ),
        ]}
      >
        <Row className="row-margin-vertical">
          <Col span={3}>
            <Text strong>Item :</Text>
          </Col>
          <Col span={21}>
            <Text className="text-value">
              {temp_detail && temp_detail.item_no_name}
            </Text>
          </Col>
        </Row>
        <Row className="row-margin-vertical">
          <Col span={3}>
            <Text strong>Quantity Balance :</Text>
          </Col>
          <Col span={21}>
            <Text className="text-value">
              {temp_detail &&
                convertDigit(temp_detail.tg_receive_detail_qty_balance)}
            </Text>
            <Text className="text-value">
              {temp_detail && temp_detail.uom_no}
            </Text>
          </Col>
        </Row>
        <Row style={{ height: 10 }}>
          <Col
            span={7}
            className="text-number"
            style={{ borderBottom: "0.2vh solid #E7E7E7" }}
          ></Col>
          <Col span={17}></Col>
        </Row>
        <Row className="row-margin-vertical">
          <Col span={3}>
            <Text strong>Quantity Done :</Text>
          </Col>
          <Col span={21}>
            {temp_detail && (
              <Text className="text-value">
                {convertDigit(temp_detail.tg_receive_detail_qty)}
              </Text>
            )}
            {"  /  "}
            <Text strong>
              {temp_detail &&
                convertDigit(temp_detail.tg_receive_detail_qty_balance_temp)}
            </Text>
            <Text strong>{temp_detail && temp_detail.uom_no}</Text>
          </Col>
        </Row>
        <Row className="row-tab-margin-lg">
          <Col span={24}>
            <SubDetail
              receive_detail_id={temp_detail && temp_detail.receive_detail_id}
              readOnly={readOnly}
              temp_sub_detail={temp_sub_detail}
              tempSubDetailDispatch={tempSubDetailDispatch}
              data_detail={temp_detail}
            />
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default React.memo(ReceiveDetail);
