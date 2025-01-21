import {
  CloseOutlined,
  FileSearchOutlined,
  PlusOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { Col, Row, Tabs, Button, Space } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useContext, useEffect, useMemo, useState } from "react";
import PartSpecification from "./PartSpecification";
import { item_part_specification_fields } from "../config/item";
import Modal from "antd/lib/modal/Modal";
import { convertDigit } from "../../../include/js/main_config";
import { ItemContext, TabContext } from "../../../include/js/context";
import TotalFormula from "./TotalFormula";
import DndComponent from "../../../components/DndComponent";
import DetailLoading from "../../../components/DetailLoading";
import ProcessSpecification from "./ProcessSpecification";
const { TabPane } = Tabs;
const TabBulkFormula = () => {
  const {
    readOnly,
    statePart,
    statePartDispatch,
    // PartDetailReducer,
    // PMReducer,
    // FormulaReducer,
    formulaPercent,
    sumPercent,
  } = useContext(ItemContext);
  const [tabOrder, setTabOrder] = useState({
    dragKey: null,
    hoverKey: null,
    oldTabOrder: statePart.map((obj) => `${obj.id}`),
    newTabOrder: null,
  });
  const [number, setNumber] = useState(statePart.length);
  const [visible, setVisible] = useState({
    line_id: null,
    visible: false,
  });
  const [loading, setLoading] = useState(true);
  const [visibleFormula, setVisibleFormula] = useState(false);
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
    const currentIndex = statePart.length + 1;
    // PartReducer.addNewRow({
    //   ...item_part_specification_fields,
    //   item_part_sort: currentIndex,
    //   item_part_description: "New..",
    //   data_id: number,
    // });
    statePartDispatch({
      type: "ADD_ROW",
      payload: {
        ...item_part_specification_fields,
        item_part_sort: currentIndex,
        item_part_description: "New..",
        data_id: number,
      },
    });
    // PartDetailReducer.addNewRow2D();
    // PMReducer.addNewRow2D();
    // FormulaReducer.addNewRow2D();
    setNumber(number + 1);
  };

  const delLine = (rowId) => {
    // PartReducer.deleteRow(rowId, "item_part_sort");
    statePartDispatch({
      type: "DEL_ROW",
      payload: {
        id: rowId,
        field_id: "item_part_sort",
      },
    });
  };
  console.log("State Part ", statePart);
  // console.log("FormulaReducer data", FormulaReducer.data);
  // console.log("tabOrder", tabOrder);
  useEffect(() => {
    setLoading(true);
    console.log("1");
    if (tabOrder.newTabOrder !== null) {
      console.log("2");
      const newOrder = statePart.slice();
      console.log("oldOrder ", statePart);
      const dragIndex = newOrder.find(
        (obj) => obj.id.toString() === tabOrder.dragKey
      );
      const hoverIndex = newOrder.find(
        (obj) => obj.id.toString() === tabOrder.hoverKey
      );
      console.log("dragIndex :", dragIndex);
      console.log("hoverIndex :", hoverIndex);
      newOrder.splice(tabOrder.dragKey, 1);
      newOrder.splice(tabOrder.hoverKey, 0, dragIndex);
      console.log("newOrder ", newOrder);
      statePartDispatch({
        type: "SET_ARRAY",
        payload: newOrder.map((obj, key) => {
          return { ...obj, item_part_sort: key + 1 };
        }),
      });
      setTabOrder({
        dragKey: null,
        hoverKey: null,
        oldTabOrder: newOrder.map((obj) => `${obj.id}`),
        newTabOrder: null,
      });
      console.log("3");
    }
    console.log("4");

    setTimeout(() => {
      setLoading(false);
    }, 500);
    // statePartDispatch(newOrder);
  }, [tabOrder.newTabOrder]);

  console.log("tabOrder", tabOrder);
  console.log("statePart : ", statePart);
  return (
    <>
      <ProcessSpecification />
      <div className="flex-space detail-tab-row mt-3">
        <Space>
          <Text strong style={{ fontSize: 16, marginRight: 10 }}>
            <ProfileOutlined style={{ marginRight: 10 }} />
            {"Part & Formula"}
          </Text>
        </Space>
        {loading ? null : (
          <Space size={16}>
            <Button
              className="primary"
              type={"button"}
              onClick={() => setVisibleFormula(true)}
              icon={<FileSearchOutlined />}
            >
              {"Master Formula "}
            </Button>
            <Text strong>
              {!readOnly && <span className="require">* </span>}
              {"Total %(W/W) : "}
            </Text>
            <div style={{ minWidth: 150 }} className="text-right pd-right-2">
              <Text
                strong
                type={
                  convertDigit(formulaPercent, 6) !== convertDigit(100, 6)
                    ? "danger"
                    : "success"
                }
              >
                {convertDigit(formulaPercent, 6)}
              </Text>
            </div>
            <Text strong style={{ fontWeight: 900 }}>
              %
            </Text>
          </Space>
        )}
      </div>

      {loading ? (
        <DetailLoading />
      ) : (
        <>
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
          <TabContext.Provider value={{ tabOrder, setTabOrder }}>
            {!readOnly ? (
              <DndComponent tabPosition={"left"} style={{ marginTop: 10 }}>
                {statePart.map((obj, key) => {
                  return (
                    <TabPane
                      tab={
                        <div className="tab-pane">
                          <div style={{ float: "left" }}>
                            {!readOnly && <span className="require">* </span>}
                            {obj.item_part_description}
                          </div>
                          <div style={{ float: "right" }}>
                            {!readOnly && statePart.length > 1 && (
                              <CloseOutlined
                                title="Delete"
                                onClick={() => showPopconfirm(obj.id)}
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
                      key={`${obj.id}`}
                      closable={true}
                    >
                      <PartSpecification id={obj.id} part={obj} />
                    </TabPane>
                  );
                })}
                {/* <TabPane tab={"Master Formula"} key={"total%"} closable={true}>
          <TotalFormula />
        </TabPane> */}
              </DndComponent>
            ) : (
              <Tabs tabPosition={"left"} style={{ marginTop: 10 }}>
                {statePart.map((obj, key) => {
                  return (
                    <TabPane
                      tab={
                        <div className="tab-pane">
                          <div style={{ float: "left" }}>
                            {!readOnly && <span className="require">* </span>}
                            {obj.item_part_description}
                          </div>
                          <div style={{ float: "right" }}>
                            {!readOnly && statePart.length > 1 && (
                              <CloseOutlined
                                title="Delete"
                                onClick={() => showPopconfirm(obj.id)}
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
                      key={`${obj.id}`}
                      closable={true}
                    >
                      <PartSpecification id={obj.id} part={obj} />
                    </TabPane>
                  );
                })}
              </Tabs>
            )}
          </TabContext.Provider>

          <Modal
            title="Confirm Delete"
            visible={visible.visible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>{"Are you want to delete this Part ?"}</p>
          </Modal>
          <Modal
            title="Master Formula"
            visible={visibleFormula}
            width={900}
            onCancel={() => setVisibleFormula(false)}
            footer={[
              <Button
                key="back"
                className="primary"
                onClick={() => setVisibleFormula(false)}
              >
                {"Back"}
              </Button>,
            ]}
          >
            <TotalFormula />
          </Modal>
        </>
      )}
    </>
  );
};

export default React.memo(TabBulkFormula);
