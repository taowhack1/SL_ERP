import {
  CloseOutlined,
  PlusOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { Col, Row, Tabs, Button, Space } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useContext, useState } from "react";
import PartSpecification from "./PartSpecification";
import { item_part_specification_fields } from "../config/item";
import Modal from "antd/lib/modal/Modal";
import { convertDigit } from "../../../include/js/main_config";
import { ItemContext } from "../../../include/js/context";
import TotalFormula from "./TotalFormula";
const { TabPane } = Tabs;
const TabBulkFormula = () => {
  const {
    readOnly,
    PartReducer,
    PartDetailReducer,
    PMReducer,
    FormulaReducer,
    formulaPercent,
  } = useContext(ItemContext);
  const [number, setNumber] = useState(PartReducer.data.length);
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
    const currentIndex = PartReducer.data.length + 1;
    PartReducer.addNewRow({
      ...item_part_specification_fields,
      item_part_sort: currentIndex,
      item_part_description: "New..",
      data_id: number,
    });
    PartDetailReducer.addNewRow2D();
    PMReducer.addNewRow2D();
    FormulaReducer.addNewRow2D();
    setNumber(number + 1);
  };

  const delLine = (rowId) => {
    PartReducer.deleteRow(rowId, "item_part_sort");
    PartDetailReducer.deleteRow2D(rowId);
    PMReducer.deleteRow2D(rowId);
    FormulaReducer.deleteRow2D(rowId);
  };
  console.log("PartReducer data", PartReducer.data);
  return (
    <>
      <Row className="col-2 mt-3  detail-tab-row">
        <Col span={16}>
          <Space>
            <Text strong style={{ fontSize: 16, marginRight: 10 }}>
              <ProfileOutlined style={{ marginRight: 10 }} />
              Part & Formula
            </Text>
          </Space>
        </Col>
        <Col span={8} className="text-right validate_formula">
          <Space>
            <Text strong>
              {!readOnly && <span className="require">* </span>}
              Total %(W/W) :{" "}
            </Text>
            <div style={{ minWidth: 150 }} className="text-right pd-right-2">
              <Text
                strong
                type={
                  convertDigit(formulaPercent, 4) !== convertDigit(100, 4)
                    ? "danger"
                    : "success"
                }
              >
                {convertDigit(formulaPercent, 4)}
              </Text>
            </div>
            <Text strong style={{ fontWeight: 900 }}>
              %
            </Text>
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
        {PartReducer.data.map((line, key) => {
          return (
            <TabPane
              tab={
                <div className="tab-pane">
                  <div style={{ float: "left" }}>
                    {!readOnly && <span className="require">* </span>}
                    {line.item_part_description}
                  </div>
                  <div style={{ float: "right" }}>
                    {!readOnly && PartReducer.data.length > 1 && (
                      <CloseOutlined
                        title="Delete"
                        onClick={() => showPopconfirm(line.id)}
                        style={{
                          color: "red",
                          fontWeight: "bold",
                          fontSize: 14,
                        }}
                      />
                    )}
                  </div>
                </div>
              }
              key={`${key}`}
              closable={true}
            >
              <PartSpecification partId={line.id} />
            </TabPane>
          );
        })}
        <TabPane tab={"Master Formula"} key={"total%"} closable={true}>
          <TotalFormula />
        </TabPane>
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

export default React.memo(TabBulkFormula);
