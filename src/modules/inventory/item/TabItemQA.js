import React, { useContext, useEffect, useReducer, useState } from "react";
import ItemQADetail from "./ItemQASpecification";
import moment from "moment";
import {
  Button,
  Checkbox,
  Col,
  InputNumber,
  message,
  Modal,
  Popconfirm,
  Row,
  Space,
  Tabs,
  TimePicker,
} from "antd";
import Text from "antd/lib/typography/Text";
import {
  BorderOutlined,
  CheckSquareOutlined,
  CloseOutlined,
  EditOutlined,
  PlusOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import Title from "antd/lib/typography/Title";
import CustomLabel from "../../../components/CustomLabel";
import { ItemContext } from "../../../include/js/context";
import { mainReducer } from "../../../include/reducer";
import { itemQAFields } from "../config/item";
import { pad2number } from "../../../include/js/function_main";
const { TabPane } = Tabs;
const TabItemQA = () => {
  const { data_head, saveForm, readOnly, qaFormRef } = useContext(ItemContext);
  const [state, stateDispatch] = useReducer(mainReducer, data_head.qa_spec);
  const [visible, setVisible] = useState({
    line_id: null,
    visible: false,
  });
  const onChangeRevision = (refId) => {
    const refData = state.find((obj) => obj.id === refId) ?? itemQAFields;
    stateDispatch({
      type: "ADD_ROW",
      payload: {
        ...refData,
        ...itemQAFields,
        item_qa_revision_no: pad2number(state?.length ?? 0),
        item_qa_default: 0,
        item_qa_id: null,
        item_qa_detail: refData.item_qa_detail.map((obj) => {
          delete obj["item_qa_id"];
          return obj;
        }),
      },
    });
  };
  const onDelete = (rowId) =>
    stateDispatch({
      type: "DEL_ROW",
      payload: {
        id: rowId,
      },
    });

  const showPopconfirm = (id) => setVisible({ line_id: id, visible: true });

  const handleOk = () => {
    onDelete(visible.line_id);
    setVisible({ line_id: null, visible: false });
  };

  const handleCancel = () => setVisible({ line_id: null, visible: false });

  const onChangeDetail = (revId, data, detailId, checkDefault) => {
    console.log(revId, data, detailId);
    detailId !== undefined && detailId !== null
      ? stateDispatch({
          type: "CHANGE_OBJ_ARRAY_DETAIL_VALUE",
          payload: {
            headId: revId,
            key: "item_qa_detail",
            rowId: detailId,
            data: data,
          },
        })
      : checkDefault
      ? stateDispatch({
          type: "SET_DATA_OBJECT",
          payload: state?.some((obj) => obj.item_qa_default)
            ? state.map((obj) => {
                return obj.id === revId
                  ? { ...obj, ...data }
                  : { ...obj, item_qa_default: 0 };
              })
            : state.map((obj) =>
                obj.id === revId ? { ...obj, ...data } : obj
              ),
        })
      : stateDispatch({
          type: "CHANGE_DETAIL_VALUE",
          payload: {
            id: revId,
            data: data,
          },
        });
    checkDefault && message.success("Default Spec. changed.");
  };
  console.log("onChangeRevision", state);
  console.log("data_head.qa_spec", data_head.qa_spec);
  return (
    <>
      {/* ใช้เก็บข้อมูลรอ submit  */}
      <input ref={qaFormRef} type="hidden" value={JSON.stringify(state)} />
      <Row className="col-2 row-margin-vertical">
        <Col span={12}>
          <Row className="col-2 row-margin-vertical">
            <Col span={7}>
              <Text strong>
                {!readOnly && <span className="require">* </span>}
                QA L/T / Lot. :
              </Text>
            </Col>
            <Col span={16}>
              <Space size={24}>
                {readOnly ? (
                  <Text className="text-view">
                    {data_head.item_qa_lead_time_day
                      ? data_head.item_qa_lead_time_day
                      : "-"}
                  </Text>
                ) : (
                  <InputNumber
                    name="item_qa_lead_time_day"
                    placeholder={"Day"}
                    title="Amount of day"
                    min={0}
                    step={1}
                    precision={0}
                    style={{ width: "150px" }}
                    disabled={0}
                    value={data_head.item_qa_lead_time_day}
                    onChange={(data) =>
                      saveForm({
                        item_qa_lead_time_day: data,
                      })
                    }
                  />
                )}
                <Text strong> Day </Text>
                {readOnly ? (
                  <Text className="text-view">
                    {data_head.item_qa_lead_time
                      ? data_head.item_qa_lead_time
                      : "-"}
                  </Text>
                ) : (
                  <TimePicker
                    className="full-width"
                    format={"HH:mm"}
                    showNow={false}
                    minuteStep={15}
                    name={"item_qa_lead_time"}
                    style={{ width: "150px" }}
                    placeholder="00:00"
                    required
                    value={
                      data_head.item_qa_lead_time
                        ? moment(data_head.item_qa_lead_time, "HH:mm:ss")
                        : ""
                    }
                    onChange={(data) => {
                      const time = moment(data, "HH:mm").format("HH:mm:ss");
                      console.log(time);
                      saveForm({
                        item_qa_lead_time: data ? time : null,
                      });
                    }}
                  />
                )}
                <Text strong> Hour </Text>
                <Col span={1}></Col>
              </Space>
            </Col>
          </Row>
        </Col>
        <Col span={12}></Col>
      </Row>
      <div className="flex-space detail-tab-row mt-2">
        <Space>
          <Text strong style={{ fontSize: 16, marginRight: 10 }}>
            <ProfileOutlined style={{ marginRight: 10 }} />
            {"Specification Revision"}
          </Text>
        </Space>
      </div>

      <Tabs
        tabPosition={"left"}
        className="mt-1"
        // defaultActiveKey={`${state?.find((obj) => obj.item_qa_default)?.id}`}
      >
        {state?.map((obj) => (
          <TabPane
            tab={
              <div className="tab-pane">
                <div style={{ float: "left" }}>
                  {!readOnly && <span className="require">* </span>}
                  Rev. : {obj.item_qa_revision_no}
                </div>
                <div style={{ float: "right" }}>
                  {!readOnly &&
                    !obj.item_qa_id &&
                    obj.id === state.length - 1 &&
                    state.length > 1 && (
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
          >
            <div className="mt-2">
              <div className="detail-tab-row">
                <Title level={4}>
                  Revision :
                  <Text className="text-value pd-left-1">
                    {obj.item_qa_revision_no}
                  </Text>
                  {!readOnly && (
                    <Popconfirm
                      onConfirm={() => {
                        onChangeRevision(obj.id);
                      }}
                      title="Are you sure you want to change revision ?"
                      okText="Yes"
                      cancelText="No"
                    >
                      <EditOutlined
                        className="button-icon pd-left-2"
                        title={"Click to change revision"}
                      />
                    </Popconfirm>
                  )}
                </Title>
              </div>
              <Row className="mb-1">
                <Col span={12}>
                  <Row className="col-2 row-margin-vertical">
                    <Col span={6}>
                      <CustomLabel label={"Default :"} />
                    </Col>
                    <Col span={17}>
                      {readOnly ? (
                        <Space align="baseline">
                          {obj.item_qa_default ? (
                            <CheckSquareOutlined />
                          ) : (
                            <BorderOutlined />
                          )}
                        </Space>
                      ) : (
                        <Checkbox
                          name="item_qa_default"
                          checked={obj.item_qa_default}
                          onChange={(e) => {
                            const checkDefault = e.target.checked;
                            onChangeDetail(
                              obj.id,
                              {
                                item_qa_default: e.target.checked ? 1 : 0,
                              },
                              null,
                              checkDefault
                            );
                          }}
                        />
                      )}
                    </Col>
                  </Row>
                </Col>

                <Col span={12}></Col>
              </Row>
              <ItemQADetail
                headId={obj.id}
                qaDetail={obj.item_qa_detail}
                readOnly={readOnly}
                onChangeDetail={onChangeDetail}
                revDispatch={stateDispatch}
              />
            </div>
          </TabPane>
        ))}
      </Tabs>
      <Modal
        title="Confirm Delete"
        visible={visible.visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>{"Are you want to delete this Part ?"}</p>
      </Modal>
    </>
  );
};

export default TabItemQA;
