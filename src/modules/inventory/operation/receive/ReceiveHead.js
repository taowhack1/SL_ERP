import React, { useEffect, useState } from "react";
import { Row, Col, Input, Typography } from "antd";
import { useSelector } from "react-redux";
import CustomSelect from "../../../../components/CustomSelect";
import {
  receive_detail_fields,
  receive_fields,
} from "../../config/receiveConfig";
import moment from "moment";
const { Text } = Typography;
const initialStateHead = receive_fields;
const initialStateDetail = [receive_detail_fields];
const ReceiveHead = ({ mainState, saveForm }) => {
  const auth = useSelector((state) => state.auth.authData);
  const po_list = useSelector((state) => state.inventory.receive.po_ref);
  const [state, setState] = useState(mainState);

  const save = (data, po_id) => {
    saveForm({ ...state, ...data }, po_id ?? null);
  };
  const changeState = (data) => {
    console.log(data);
    setState({ ...state, ...data });
  };
  const resetForm = () => {
    setState({
      ...initialStateHead,
      commit: 1,
      user_name: auth.user_name,
      branch_id: auth.branch_id,
      branch_name: auth.branch_name,
      receive_created: moment().format("DD/MM/YYYY"),
      receive_detail: initialStateDetail,
    });
  };
  useEffect(() => {
    console.log("effect head");
    setState(mainState);
  }, [mainState]);
  console.log("ReceiveHead", state, mainState);
  return (
    <>
      <Row className="col-2 row-margin-vertical">
        <Col span={3}>
          <Text strong>
            <span className="require">* </span>PO Ref. :
          </Text>
        </Col>
        <Col span={8}>
          {/* PO Ref */}
          <CustomSelect
            allowClear
            showSearch
            placeholder={"PO No. ex.PO2009000x"}
            name="po_id"
            field_id="po_id"
            field_name="po_no_description"
            value={state.po_no_description}
            data={po_list}
            onChange={(data, option) => {
              if (data) {
                save(option.data, option.data.po_id);
                // changeState(option.data);
              } else {
                resetForm();
              }
            }}
          />
        </Col>
        <Col span={2}></Col>
        <Col span={3}>
          <Text strong>Vendor :</Text>
        </Col>
        <Col span={8}>
          <Text className="text-view">{state.vendor_no_name}</Text>
        </Col>
      </Row>
      <Row className="col-2 row-margin-vertical ">
        <Col span={3}>
          <Text strong>
            <span className="require">* </span>
            {"Description :"}
          </Text>
        </Col>
        <Col span={8}>
          <Input
            name="receive_description"
            onChange={(e) =>
              changeState({
                receive_description: e.target.value,
              })
            }
            onBlur={() => save()}
            value={state.receive_description}
            placeholder="Description"
          />
        </Col>
        <Col span={2}></Col>
        <Col span={3}>
          <Text strong>Currency :</Text>
        </Col>
        <Col span={8}>
          <Text className="text-view">{state.currency_no}</Text>
        </Col>
      </Row>
      <Row className="col-2 row-margin-vertical">
        <Col span={3}>
          <Text strong>Order date :</Text>
        </Col>
        <Col span={8}>
          <Text className="text-view">{state.receive_order_date}</Text>
        </Col>
      </Row>
    </>
  );
};

export default React.memo(ReceiveHead);
