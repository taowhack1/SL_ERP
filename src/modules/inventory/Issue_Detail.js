import { Button, Row, Col, InputNumber, Typography, DatePicker } from "antd";
import {
  DeleteTwoTone,
  PlusOutlined,
  EllipsisOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import moment from "moment";

import { issue_detail_columns, issue_detail_fields } from "./config";
import CustomSelect from "../../components/CustomSelect";

import ModalSelectItem from "./Modal_Select_Item";
import { convertDigit, numberFormat } from "../../include/js/main_config";
import TextArea from "antd/lib/input/TextArea";
const { Text } = Typography;

const IssueDetail = ({
  readOnly,
  data_detail,
  updateHead,
  detailDispatch,
  type_id,
  data_head,
  filter,
}) => {
  console.log("Render : IssueDetail");
  const [visible, setVisible] = useState(false);
  // state
  const select_items = useSelector(
    (state) => state.inventory.master_data.item_list
  );
  const select_uoms = useSelector(
    (state) => state.inventory.master_data.item_uom
  );
  const select_location = useSelector((state) =>
    state.inventory.master_data.shelf.filter(
      (shelf) => shelf.shelf_status_id === 4
    )
  );
  console.log("filter_location", select_location);
  // function
  const selectMultiItem = () => {
    setVisible(true);
    console.log("Select multiple item modal open");
  };
  const addLine = () => {
    detailDispatch({ type: "ADD_ROW", payload: issue_detail_fields });
  };
  const delLine = (id) => {
    detailDispatch({ type: "DEL_ROW", payload: { id: id } });
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
  const modalSave = (select_item) => {
    detailDispatch({ type: "SET_DETAIL", payload: select_item });
    console.log("modal save");
    setVisible(false);
  };
  const modalCancel = () => {
    console.log("modal cancel");
    setVisible(false);
  };
  const getSelectModal = () => {
    return (
      <ModalSelectItem
        visible={visible}
        setVisible={setVisible}
        modalSave={modalSave}
        modalCancel={modalCancel}
        data_detail={data_detail}
        data_head={data_head}
        updateHead={updateHead}
        okTitle="Select"
        cancelTitle="Discard"
        filter={filter}
        title={
          <>
            <OrderedListOutlined style={{ marginRight: 10 }} /> Multiple Select
            Items
          </>
        }
      />
    );
  };
  return (
    <>
      {/* Column Header */}
      <Row gutter={2} className="detail-table-head">
        {issue_detail_columns &&
          issue_detail_columns.map((col, key) => {
            return (
              <Col key={key} span={col.size} className="col-outline">
                {!readOnly && <span className="require">* </span>}
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
                  <Col span={3} className="text-string">
                    <CustomSelect
                      allowClear
                      showSearch
                      size="small"
                      placeholder={"Item Code"}
                      data={
                        type_id
                          ? select_items.filter(
                              (item) => item.type_id === type_id
                            )
                          : select_items
                      }
                      name="item_id"
                      field_id="item_id"
                      field_name="item_no"
                      value={line.item_no}
                      onChange={(data, option) => {
                        data !== undefined
                          ? onChangeValue(line.id, {
                              item_id: data,
                              uom_id: option.data.uom_id,
                              item_no: option.data.item_no,
                              item_name: option.data.item_name,
                              item_no_name: option.data.item_no_name,
                              uom_no: option.data.uom_no,
                              item_control_id: option.data.item_control_id,
                              type_id: option.data.type_id,
                              type_no_name: option.data.type_no_name,
                              issue_detail_qty: 0,
                            })
                          : onChangeValue(line.id, {
                              item_id: null,
                              item_no: null,
                              item_name: null,
                              item_no_name: null,
                              item_control_id: null,
                              uom_id: null,
                              uom_no: null,
                              uom_no_name: null,
                              location_id: null,
                              location_shelf_no_name: null,
                              issue_detail_due_date: null,
                              issue_detail_qty: 0,
                              type_id: null,
                              type_no_name: null,
                            });
                        if (!data_detail.some((obj) => obj.type_id)) {
                          updateHead({
                            type_id:
                              data !== undefined ? option.data.type_id : null,
                            type_no_name:
                              data !== undefined
                                ? option.data.type_no_name
                                : null,
                          });
                        }
                      }}
                    />
                  </Col>
                  <Col span={7} className="text-string">
                    <CustomSelect
                      allowClear
                      showSearch
                      size="small"
                      placeholder={"Item Description"}
                      data={
                        type_id
                          ? select_items.filter(
                              (item) => item.type_id === type_id
                            )
                          : select_items
                      }
                      name="item_id"
                      field_id="item_id"
                      field_name="item_name"
                      value={line.item_name}
                      onChange={(data, option) => {
                        data !== undefined
                          ? onChangeValue(line.id, {
                              item_id: data,
                              uom_id: option.data.uom_id,
                              item_no: option.data.item_no,
                              item_name: option.data.item_name,
                              item_no_name: option.data.item_no_name,
                              uom_no: option.data.uom_no,
                              item_control_id: option.data.item_control_id,
                              type_id: option.data.type_id,
                              type_no_name: option.data.type_no_name,
                              issue_detail_qty: 0,
                            })
                          : onChangeValue(line.id, {
                              item_id: null,
                              item_no: null,
                              item_name: null,
                              item_no_name: null,
                              item_control_id: null,
                              uom_id: null,
                              uom_no: null,
                              uom_no_name: null,
                              location_id: null,
                              location_shelf_no_name: null,
                              issue_detail_due_date: null,
                              issue_detail_qty: 0,
                              type_id: null,
                              type_no_name: null,
                            });
                        if (!data_detail.some((obj) => obj.type_id)) {
                          updateHead({
                            type_id:
                              data !== undefined ? option.data.type_id : null,
                            type_no_name:
                              data !== undefined
                                ? option.data.type_no_name
                                : null,
                          });
                        }
                      }}
                    />
                  </Col>
                  <Col span={5} className="text-string">
                    <CustomSelect
                      allowClear
                      showSearch
                      disabled={line.item_id ? false : true}
                      size="small"
                      placeholder={"Destination Location"}
                      data={
                        line.item_id
                          ? select_location.filter(
                              (location) => location.type_id === line.type_id
                              // &&
                              // location.location_id === line.location_id
                              // location.item_control_id === line.item_control_id
                            )
                          : select_location
                      }
                      name="location_id"
                      field_id="shelf_id"
                      field_name="shelf_name"
                      value={line.shelf_name}
                      onChange={(data, option) => {
                        console.log(data, option);
                        data !== undefined
                          ? onChangeValue(line.id, {
                              shelf_id: option.data.shelf_id,
                              shelf_no_name: option.data.shelf_no_name,
                              location_id: option.data.location_id,
                              shelf_name: option.data.shelf_name,
                            })
                          : onChangeValue(line.id, {
                              shelf_id: null,
                              shelf_no_name: null,
                              location_id: null,
                              shelf_name: null,
                            });
                      }}
                    />
                  </Col>
                  <Col span={3} className="text-number">
                    <InputNumber
                      {...numberFormat}
                      placeholder={"Qty"}
                      min={0.0}
                      step={0.001}
                      name="issue_detail_qty"
                      disabled={line.item_id ? false : true}
                      size="small"
                      className={"full-width"}
                      value={line.issue_detail_qty}
                      onChange={(data) => {
                        onChangeValue(line.id, {
                          issue_detail_qty: data,
                        });
                        // updateAmount();
                      }}
                    />
                  </Col>
                  <Col span={2} className="text-string">
                    <CustomSelect
                      allowClear
                      showSearch
                      disabled={true}
                      size="small"
                      placeholder={"Unit"}
                      data={select_uoms}
                      name="uom_id"
                      field_id="uom_id"
                      field_name="uom_no"
                      value={line.uom_no}
                      onSelect={(data, option) =>
                        onChangeValue(line.id, {
                          uom_id: data,
                          uom_no: option.title,
                        })
                      }
                      onChange={(data) =>
                        onChangeValue(line.id, { uom_id: data })
                      }
                    />
                  </Col>
                  <Col span={3} className="text-center">
                    <DatePicker
                      disabled={line.item_id ? false : true}
                      name={"issue_detail_due_date"}
                      format={"DD/MM/YYYY"}
                      size="small"
                      className={"full-width"}
                      placeholder="Due Date"
                      value={
                        line.issue_detail_due_date && line.issue_detail_due_date
                          ? moment(line.issue_detail_due_date, "DD/MM/YYYY")
                          : ""
                      }
                      onChange={(data) => {
                        data
                          ? onChangeValue(line.id, {
                              issue_detail_due_date: data.format("DD/MM/YYYY"),
                            })
                          : onChangeValue(line.id, {
                              issue_detail_due_date: null,
                            });
                      }}
                    />
                  </Col>
                  <Col span={1} style={{ textAlign: "center" }}>
                    {data_detail.length > 1 && (
                      <DeleteTwoTone onClick={() => delLine(line.id)} />
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
                  className="col-2"
                >
                  <Col span={23}>
                    <TextArea
                      rows={1}
                      placeholder={"Remark..."}
                      disabled={type_id && line.item_id ? 0 : 1}
                      value={line.issue_detail_remark}
                      onChange={(e) => {
                        onChangeValue(line.id, {
                          issue_detail_remark: e.target.value,
                        });
                      }}
                      className={"full-width"}
                    />
                  </Col>
                  <Col span={1}></Col>
                </Row>
              </div>
            ))}
          <div style={{ marginTop: 10 }}>
            <Button
              type="dashed"
              onClick={() => {
                addLine();
              }}
              block
            >
              <PlusOutlined /> Add a line
            </Button>
          </div>
          <div style={{ marginTop: 10 }}>
            <Button
              type="dashed"
              onClick={() => {
                selectMultiItem();
              }}
              className={"primary"}
              block
            >
              <PlusOutlined /> Select item
            </Button>
          </div>
        </>
      ) : (
        <>
          {/* View Form */}
          {data_detail &&
            data_detail.map((line, key) => (
              <div
                key={key}
                style={{ borderBottom: "2px solid #c1c1c1" }}
                className="pb-1"
              >
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
                  <Col span={3} className="text-center">
                    <Text className="text-view">{line.item_no}</Text>
                  </Col>
                  <Col span={7} className="text-string">
                    <Text className="text-view">{line.item_name}</Text>
                  </Col>
                  <Col span={5} className="text-string">
                    <Text className="text-view">{line.shelf_name}</Text>
                  </Col>
                  <Col span={3} className="text-number">
                    <Text className="text-view">
                      {convertDigit(line.issue_detail_qty)}
                    </Text>
                  </Col>
                  <Col span={2} className="text-center">
                    <Text className="text-view">{line.uom_no}</Text>
                  </Col>
                  <Col span={3} className="text-center">
                    <Text className="text-view">
                      {line.issue_detail_due_date}
                    </Text>
                  </Col>
                </Row>
                <Row
                  key={"sub-remark-" + key}
                  style={{
                    marginBottom: 0,
                    border: "1px solid white",
                    backgroundColor: "#FCFCFC",
                  }}
                  gutter={2}
                  className="col-2"
                >
                  <Col span={23}>
                    <div className="pd-left-2">
                      <Text className="text-value" strong>
                        Remark :
                      </Text>
                      <Text className="text-value">
                        {line.issue_detail_remark ?? "-"}
                      </Text>
                    </div>
                  </Col>
                  <Col span={1}></Col>
                </Row>
              </div>
            ))}
        </>
      )}
      {/* end readonly */}
      <Row
        style={{
          width: "100%",
          height: "5px",
          backgroundColor: "#c6c6c6",
          background:
            "linear-gradient(180deg,rgba(198,198,198,1) 0%, rgba(198,198,198,1) 55%,rgba(255,255,255,1) 100%)",
          marginBottom: 20,
        }}
      ></Row>
      {visible && getSelectModal()}
    </>
  );
};

export default React.memo(IssueDetail);
