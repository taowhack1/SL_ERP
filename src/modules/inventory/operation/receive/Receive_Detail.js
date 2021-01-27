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
  receiveDetailColumns,
} from "../../config/receiveConfig";
import { useDispatch, useSelector } from "react-redux";
import CustomSelect from "../../../../components/CustomSelect";
import moment from "moment";

import { get_location_shelf_by_item_id } from "../../../../actions/inventory";
import { convertDigit, numberFormat } from "../../../../include/js/main_config";
import { mainReducer } from "../../../../include/reducer";
import CustomTable from "../../../../components/CustomTable";
const { Text } = Typography;

const ReceiveDetail = ({ readOnly, mainState, saveForm, vat_rate }) => {
  const dispatch = useDispatch();
  const [state, setState] = useState(mainState.receive_detail);
  const itemList = useSelector(
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

  // const updateAmount = () => {
  //   const obj = sumArrObj(
  //     state.receive_detail,
  //     "receive_detail_total_price",
  //     vat_rate
  //   );
  //   headDispatch({
  //     type: "CHANGE_HEAD_VALUE",
  //     payload: {
  //       tg_receive_sum_amount: obj.exclude_vat,
  //       tg_receive_vat_amount: obj.vat,
  //       tg_receive_total_amount: obj.include_vat,
  //     },
  //   });
  // };

  // useEffect(() => {
  //   !readOnly && updateAmount();
  // }, [data_detail]);

  // function
  const addLine = () => {
    // detailDispatch({ type: "ADD_ROW", payload: receive_detail_fields });
  };
  const delLine = (id) => {
    // detailDispatch({ type: "DEL_ROW", payload: { id: id } });
  };

  // const modalSave = () => {
  //   console.log("Confirm Modal", "id", temp_detail.id, temp_sub_detail);
  //   const key = "validate";
  //   const validate_detail = validateFormDetail(
  //     temp_sub_detail,
  //     receive_sub_detail_require_fields
  //   );
  //   if (validate_detail.validate) {
  //     setVisible(false);
  //     const receive_qty = sumArrOdjWithField(
  //       temp_sub_detail,
  //       "receive_detail_sub_qty"
  //     );

  //     console.log(
  //       "balance",
  //       temp_detail.tg_receive_detail_qty_balance_temp,
  //       receive_qty,
  //       temp_detail.tg_receive_detail_qty_balance_temp - receive_qty
  //     );
  //     detailDispatch({
  //       type: "CHANGE_DETAIL_VALUE",
  //       payload: {
  //         id: temp_detail.id,
  //         data: {
  //           receive_sub_detail: temp_sub_detail,
  //           tg_receive_detail_qty: receive_qty,
  //           receive_detail_total_price: calSubtotal(
  //             receive_qty,
  //             temp_detail.receive_detail_price
  //             // discount
  //           ),
  //           tg_receive_detail_qty_balance:
  //             temp_detail.tg_receive_detail_qty_balance_temp - receive_qty,
  //         },
  //       },
  //     });
  //     setTempDetail(null);
  //   } else {
  //     message.warning({
  //       content: "Please fill your form completely.",
  //       key,
  //       duration: 2,
  //     });
  //   }
  // };

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
    // detailDispatch({
    //   type: "CHANGE_DETAIL_VALUE",
    //   payload: {
    //     id: rowId,
    //     data: data,
    //   },
    // });
    setState({
      ...state,
      ...data,
    });
  };
  const get_location_shelf = (item_id) => {
    dispatch(get_location_shelf_by_item_id(item_id));
  };
  console.log("receive_detail", state.receive_detail);
  console.log("temp_sub_detail", temp_sub_detail);
  return (
    <>
      {/* Column Header */}
      <CustomTable
        columns={receiveDetailColumns(
          readOnly,
          onChangeValue,
          itemList,
          delLine
        )}
        dataSource={state.receive_detail}
      />
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
      {/* <Modal
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
      </Modal> */}
    </>
  );
};

export default React.memo(ReceiveDetail);
