import {
  CloseOutlined,
  PlusOutlined,
  ProfileOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Checkbox,
  Col,
  Input,
  InputNumber,
  Row,
  Tabs,
  Upload,
  Button,
  Space,
  Radio,
  DatePicker,
  Popconfirm,
} from "antd";
import Text from "antd/lib/typography/Text";
import React, { useReducer, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import PartSpecification from "./PartSpecification";
import {
  item_formula_detail_fields,
  item_part_specification_fields,
} from "../config/item";
import Modal from "antd/lib/modal/Modal";
import $ from "jquery";
import { reducer } from "../reducers";
const { TextArea } = Input;
const { TabPane } = Tabs;
const initialStatePart = [item_part_specification_fields];

const TabBulkFormula = ({
  data_head,
  readOnly,
  upDateFormValue,
  data_formula_detail,
  formulaDetailDispatch,
  data_part,
  partDispatch,
  data_part_detail,
  partDetailDispatch,
}) => {
  // const [itemPart, partDispatch] = useReducer(reducer, initialStatePart);
  const [visible, setVisible] = useState({
    line_id: null,
    visible: false,
  });
  const showPopconfirm = (id) => {
    console.log(id);
    setVisible({ line_id: id, visible: true });
  };

  const handleOk = () => {
    delLine(visible.line_id);
    setVisible({ line_id: null, visible: false });
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible({ line_id: null, visible: false });
  };

  const item_list = useSelector((state) =>
    state.inventory.master_data.item_list.filter(
      (item) => item.type_id === 1 || item.type_id === 3
    )
  );
  const addLine = (id) => {
    partDispatch({
      type: "ADD_ROW",
      payload: {
        ...item_part_specification_fields,
        item_part_description: getPart(data_part.length),
      },
    });
  };

  const delLine = (id) => {
    partDispatch({ type: "DEL_ROW", payload: { id: id } });
  };

  const getPart = (key) => {
    const startChar = 65;
    return "Part : " + String.fromCharCode(key + startChar);
  };
  console.log(data_part);
  return (
    <>
      <Row className="col-2 row-margin-vertical">
        <Col span={12}>
          <Row className="col-2 row-margin-vertical">
            <Col span={6}>
              <Text strong>Effective Date</Text>
            </Col>
            <Col span={16}>
              {readOnly ? (
                <Text className="text-view text-center">
                  {data_head.item_effective_date
                    ? data_head.item_effective_date
                    : "-"}
                </Text>
              ) : (
                <DatePicker
                  name={"item_effective_date"}
                  format={"DD/MM/YYYY"}
                  className={"full-width"}
                  placeholder="Effective Date"
                  required
                  value={
                    data_head.item_effective_date
                      ? moment(data_head.item_effective_date, "DD/MM/YYYY")
                      : ""
                  }
                  defaultValue={
                    data_head.item_effective_date
                      ? moment(data_head.item_effective_date, "DD/MM/YYYY")
                      : ""
                  }
                  onChange={(data) => {
                    upDateFormValue({
                      item_effective_date: data
                        ? data.format("DD/MM/YYYY")
                        : "",
                    });
                  }}
                />
              )}
            </Col>
            <Col span={2}></Col>
          </Row>
        </Col>
      </Row>
      <Row className="col-2 mt-3  detail-tab-row">
        <Col span={14}>
          <Space>
            <Text strong style={{ fontSize: 16, marginRight: 10 }}>
              <ProfileOutlined style={{ marginRight: 10 }} />
              Part & Formula
            </Text>
          </Space>
        </Col>
        <Col span={10} className="text-right">
          <Space>
            <Text strong>
              <span className={"require"}>* </span>Total %(W/W) :{" "}
            </Text>
            <div style={{ minWidth: 150 }} className="text-right pd-right-2">
              <Text>100.000%</Text>
            </div>
          </Space>
        </Col>
      </Row>
      <Button
        type="dashed"
        className="primary"
        onClick={() => {
          addLine();
        }}
        style={{ borderRadius: 3, marginTop: 10, width: 120 }}
      >
        <PlusOutlined /> Add a Part
      </Button>
      <Tabs tabPosition={"left"} style={{ marginTop: 10 }}>
        {data_part.map((line, key) => {
          return (
            <TabPane
              tab={
                <div
                  className="tab-pane"
                  style={{
                    textAlign: "center",
                    verticalAlign: "middle",
                    // backgroundColor: "gray",
                  }}
                >
                  <span className="require" style={{}}>
                    *{" "}
                  </span>
                  {line.item_part_description}
                  <CloseOutlined
                    title="Delete"
                    onClick={() => showPopconfirm(line.id)}
                    style={{ marginLeft: 10, color: "black", fontSize: 14 }}
                  />
                </div>
              }
              key={`${key}`}
              closable={true}
            >
              <PartSpecification
                partName={getPart(key)}
                readOnly={readOnly}
                data_part_detail={data_part_detail}
                partDetailDispatch={partDetailDispatch}
                data_formula_detail={data_formula_detail}
                formulaDetailDispatch={formulaDetailDispatch}
                item_list={item_list}
              />
            </TabPane>
          );
        })}
      </Tabs>
      <Modal
        title="Confirm Delete"
        visible={visible.visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you want to delete this Part ?</p>
      </Modal>
    </>
  );
};

export default TabBulkFormula;
