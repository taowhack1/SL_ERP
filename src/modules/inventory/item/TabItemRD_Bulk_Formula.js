import {
  CloseOutlined,
  PlusOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { Col, Input, Row, Tabs, Button, Space, DatePicker } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useState } from "react";
import moment from "moment";
import PartSpecification from "./PartSpecification";
import {
  item_formula_detail_fields,
  item_part_specification_detail_fields,
  item_part_specification_fields,
} from "../config/item";
import Modal from "antd/lib/modal/Modal";
const { TabPane } = Tabs;

const TabBulkFormula = ({
  data_head,
  readOnly,
  upDateFormValue,

  data_part,
  partDispatch,
  data_part_detail,
  partDetailDispatch,
  // formula
  data_formula_detail,
  formulaDetailDispatch,
}) => {
  const [visible, setVisible] = useState({
    line_id: null,
    visible: false,
  });
  const showPopconfirm = (id) => {
    setVisible({ line_id: id, visible: true });
  };

  const handleOk = () => {
    delLine(visible.line_id);
    setVisible({ line_id: null, visible: false });
  };

  const handleCancel = () => {
    setVisible({ line_id: null, visible: false });
  };

  const addLine = () => {
    partDispatch({
      type: "ADD_ROW",
      payload: {
        ...item_part_specification_fields,
        item_part_id: data_part.length + 1,
        item_part_name: "New..",
      },
    });
    partDetailDispatch({
      type: "CHANGE_HEAD_VALUE",
      payload: {
        [data_part.length + 1]: [
          {
            ...item_part_specification_detail_fields,
          },
        ],
      },
    });
    formulaDetailDispatch({
      type: "CHANGE_HEAD_VALUE",
      payload: {
        [data_part.length + 1]: [
          {
            ...item_formula_detail_fields,
          },
        ],
      },
    });
  };

  const delLine = (rowId) => {
    partDispatch({ type: "DEL_ROW", payload: { id: rowId } });
  };

  const getPart = (key) => {
    const startChar = 65;
    return "Part : " + String.fromCharCode(key + startChar);
  };
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
                  {data_head.item_formula_effective_date
                    ? data_head.item_formula_effective_date
                    : "-"}
                </Text>
              ) : (
                <DatePicker
                  name={"item_formula_effective_date"}
                  format={"DD/MM/YYYY"}
                  style={{ width: "100%" }}
                  placeholder="Effective Date"
                  required
                  value={
                    data_head.item_formula_effective_date
                      ? moment(
                          data_head.item_formula_effective_date,
                          "DD/MM/YYYY"
                        )
                      : ""
                  }
                  defaultValue={
                    data_head.item_formula_effective_date
                      ? moment(
                          data_head.item_formula_effective_date,
                          "DD/MM/YYYY"
                        )
                      : ""
                  }
                  onChange={(data) => {
                    upDateFormValue({
                      item_formula_effective_date: data
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
              {!readOnly && <span className="require">* </span>}
              Total %(W/W) :{" "}
            </Text>
            <div style={{ minWidth: 150 }} className="text-right pd-right-2">
              <Text>100.000%</Text>
            </div>
          </Space>
        </Col>
      </Row>
      {!readOnly && (
        <Button
          type="dashed"
          className="primary"
          onClick={() => {
            addLine();
          }}
          style={{ borderRadius: 3, marginTop: 10, width: 120 }}
        >
          <PlusOutlined /> Add New
        </Button>
      )}
      <Tabs tabPosition={"left"} style={{ marginTop: 10 }}>
        {data_part.map((line, key) => {
          return (
            <TabPane
              tab={
                <div className="tab-pane text-left">
                  {!readOnly && <span className="require">* </span>}
                  {line.item_part_name}
                  {!readOnly &&
                    data_part.length > 1 &&
                    line.id === data_part[data_part.length - 1].id && (
                      <>
                        <CloseOutlined
                          title="Delete"
                          onClick={() => showPopconfirm(line.id)}
                          style={{
                            marginLeft: 10,
                            color: "black",
                            fontSize: 14,
                          }}
                        />
                      </>
                    )}
                </div>
              }
              key={`${key}`}
              closable={true}
            >
              <PartSpecification
                // Part
                data_part={line}
                partDispatch={partDispatch}
                // Part Spec.
                item_part_id={line.item_part_id}
                data_part_detail={data_part_detail[line.item_part_id]}
                partDetailDispatch={partDetailDispatch}
                // Formula
                data_formula_detail={data_formula_detail[line.item_part_id]}
                formulaDetailDispatch={formulaDetailDispatch}
                readOnly={readOnly}
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
