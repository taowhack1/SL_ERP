import { Button, Row, Col, Typography, Modal, message } from "antd";
import {
  PlusOutlined,
  EllipsisOutlined,
  FormOutlined,
  InfoCircleTwoTone,
} from "@ant-design/icons";
import React, { useState, useReducer } from "react";
import {
  sumArrOdjWithField,
  validateFormDetail,
} from "../../../../include/js/function_main";
import {
  disburse_detail_fields,
  disburse_sub_detail_fields,
  disburse_sub_detail_require_fields,
} from "./config";
import { reducer } from "../../reducers";
import { useDispatch } from "react-redux";
import {
  get_location_shelf_by_item_id,
  get_lot_batch_by_item_id_shelf,
} from "../../../../actions/inventory";
import { convertDigit } from "../../../../include/js/main_config";
import { disburse_detail_columns } from "./config";
import SubDetail from "./Disburse_Sub_Detail";

const { Text } = Typography;
const DisburseDetail = ({
  readOnly,
  issue_id,
  data_detail,
  detailDispatch,
}) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [temp_detail, setTempDetail] = useState(null);
  const [temp_sub_detail, tempSubDetailDispatch] = useReducer(reducer, [
    disburse_sub_detail_fields,
  ]);
  // function
  const addLine = () => {
    detailDispatch({ type: "ADD_ROW", payload: disburse_detail_fields });
  };
  const modalSave = () => {
    console.log("Confirm Modal", "id", temp_detail.id, temp_sub_detail);
    const key = "validate";
    const validate_detail = validateFormDetail(
      temp_sub_detail,
      disburse_sub_detail_require_fields
    );
    if (validate_detail.validate) {
      setVisible(false);
      const disburse_qty = sumArrOdjWithField(
        temp_sub_detail,
        "disburse_detail_sub_qty"
      );

      detailDispatch({
        type: "CHANGE_DETAIL_VALUE",
        payload: {
          id: temp_detail.id,
          data: {
            disburse_sub_detail: temp_sub_detail,
            tg_disburse_detail_qty: disburse_qty,
            tg_disburse_detail_qty_balance:
              temp_detail.tg_disburse_detail_qty_balance_temp - disburse_qty,
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
      payload: [disburse_sub_detail_fields],
    });
  };
  const openModalSubDetail = (data_detail, data_sub_detail, item_id) => {
    setVisible(true);
    tempSubDetailDispatch({
      type: "SET_DETAIL",
      payload: data_sub_detail,
    });
    setTempDetail(data_detail);
    // dispatch(get_location_shelf_by_item_id(item_id));
    console.log("GET LOT_BATCH");
    dispatch(get_lot_batch_by_item_id_shelf(item_id));
  };

  console.log("data_detail 2", data_detail);
  console.log("temp_sub_detail", temp_sub_detail);
  return (
    <>
      {/* Column Header */}
      <Row gutter={2} className="detail-table-head">
        {disburse_detail_columns &&
          disburse_detail_columns.map((col, key) => {
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
          {data_detail &&
            data_detail.map((line, key) => (
              <div key={line.id}>
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
                  <Col span={6} className="text-string">
                    <div
                      className="input-string-disabled text-value"
                      placeholder="Item"
                    >
                      {line.item_no_name}
                    </div>
                  </Col>
                  <Col span={4} className="text-string">
                    <div
                      className="input-string-disabled text-value"
                      placeholder="Location"
                    >
                      {line.shelf_no_name}
                    </div>
                  </Col>
                  <Col span={3} className="text-number">
                    <div className="total-number text-value">
                      {convertDigit(line.issue_detail_qty)}
                    </div>
                  </Col>
                  <Col span={3} className="text-number">
                    <div className="total-number text-value">
                      {convertDigit(line.tg_disburse_detail_qty_balance)}
                    </div>
                  </Col>
                  <Col span={3} className="text-number">
                    <div
                      className={
                        line.tg_disburse_detail_qty_balance > 0
                          ? "total-number-modal text-value"
                          : "total-number text-value"
                      }
                    >
                      {convertDigit(line.tg_disburse_detail_qty)}
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
                  <Col span={2} className="text-number text-value">
                    <div
                      className="input-string-disabled text-center"
                      placeholder="Due Date"
                    >
                      {line.disburse_detail_due_date}
                    </div>
                  </Col>
                  <Col span={1} style={{ textAlign: "center" }}>
                    {line.tg_disburse_detail_qty_balance_temp > 0 && (
                      <FormOutlined
                        onClick={() => {
                          openModalSubDetail(
                            line,
                            line.disburse_sub_detail,
                            line.item_id
                          );
                        }}
                        className="button-icon"
                      />
                    )}
                  </Col>
                </Row>
                <Row
                  key={"sub-" + key}
                  style={{
                    marginBottom: 0,
                    border: "1px solid white",
                    backgroundColor: "#FCFCFC",
                  }}
                  gutter={2}
                  className="col-2 text-value"
                >
                  <Col span={23}>
                    <div
                      className="input-string-disabled text-left"
                      placeholder="Remark"
                    >
                      Remark : {line.disburse_detail_remark}
                    </div>
                  </Col>
                  <Col span={1}></Col>
                </Row>
              </div>
            ))}
          {/* <div style={{ marginTop: 10 }}>
            {!issue_id && (
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
          </div> */}
        </>
      ) : (
        <>
          {/* View Form */}
          {data_detail &&
            data_detail.map((line, key) => (
              <div key={key}>
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
                  <Col span={6} className="text-string">
                    <Text className="text-view text-string">
                      {line.item_no_name}
                    </Text>
                  </Col>
                  <Col span={4} className="text-string">
                    <Text className="text-view text-string">
                      {line.shelf_no_name}
                    </Text>
                  </Col>
                  <Col span={3} className="text-number">
                    <Text className="text-view text-number">
                      {convertDigit(line.issue_detail_qty)}
                    </Text>
                  </Col>
                  <Col span={3} className="text-number">
                    <Text className="text-view text-number">
                      {convertDigit(line.tg_disburse_detail_qty_balance)}
                    </Text>
                  </Col>
                  <Col span={3} className="text-number">
                    <Text className="text-view text-number">
                      {convertDigit(line.tg_disburse_detail_qty)}
                    </Text>
                  </Col>
                  <Col span={2} className="text-string">
                    <Text className="text-view text-string">{line.uom_no}</Text>
                  </Col>
                  <Col span={2} className="text-center">
                    <Text className="text-view text-string">
                      {line.disburse_detail_due_date}
                    </Text>
                  </Col>
                  <Col span={1} className="text-center">
                    <InfoCircleTwoTone
                      className="button-icon"
                      onClick={() => {
                        openModalSubDetail(
                          line,
                          line.disburse_sub_detail,
                          line.item_id
                        );
                      }}
                    />
                  </Col>
                </Row>
                <Row
                  key={"sub-" + key}
                  style={{
                    marginBottom: 0,
                    border: "1px solid white",
                    backgroundColor: "#FCFCFC",
                  }}
                  gutter={2}
                  className="col-2"
                >
                  <Col span={23} className="text-left">
                    <Text className="text-value pd-left-2">
                      Remark : {line.disburse_detail_remark}
                    </Text>
                  </Col>
                  <Col span={1}></Col>
                </Row>
              </div>
            ))}
        </> //close tag
      )}
      {/* end readonly */}
      <Row
        style={{
          width: "100%",
          height: "5px",
          background:
            "linear-gradient(180deg,rgba(198,198,198,1) 0%, rgba(198,198,198,1) 55%,rgba(255,255,255,1) 100%)",
          marginBottom: 20,
        }}
      ></Row>
      <Modal
        width={1100}
        title="Disburse Detail"
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
                convertDigit(temp_detail.tg_disburse_detail_qty_balance)}
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
                {convertDigit(temp_detail.tg_disburse_detail_qty)}
              </Text>
            )}
            {"  /  "}
            <Text strong>
              {temp_detail &&
                convertDigit(temp_detail.tg_disburse_detail_qty_balance_temp)}
            </Text>
            <Text strong>{temp_detail && temp_detail.uom_no}</Text>
          </Col>
        </Row>
        <Row className="row-tab-margin-lg">
          <Col span={24}>
            <SubDetail
              limit_qty={temp_detail?.tg_disburse_detail_qty_balance || 0}
              disburse_detail_id={
                temp_detail && temp_detail?.disburse_detail_id
              }
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

export default React.memo(DisburseDetail);
