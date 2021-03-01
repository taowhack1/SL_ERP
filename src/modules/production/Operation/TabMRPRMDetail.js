/** @format */

import { Row, Col, Typography, Tabs, Table } from "antd";
import { ProfileOutlined } from "@ant-design/icons";
import React, { useContext, useEffect, useState } from "react";

import { mrpDetailColumns } from "../config/mrp";
import CustomTable from "../../../components/CustomTable";

import { useSelector } from "react-redux";
import { MRPContext } from "../../../include/js/context";
import { convertDigit } from "../../../include/js/main_config";
import Modal from "antd/lib/modal/Modal";
import Draggable from "react-draggable";
import DragableModal from "./DragableModal";
const { Text } = Typography;
const initialState = {
  item_id: null,
  item_name: null,
  item_no_name: null,
  issue_list: [
    {
      id: 0,
      issue_id: 1,
      issue_no_description: "TEST ISSUE 01",
      issue_detail_qty: 20.5,
      uom_no_name: "kg [ Kilogram ]",
      issue_due_date: "20/01/2021",
    },
    {
      id: 1,
      issue_id: 2,
      issue_no_description: "TEST ISSUE 06",
      issue_detail_qty: 3.5,
      uom_no_name: "kg [ Kilogram ]",
      issue_due_date: "23/01/2021",
    },
  ],
  po_list: [
    {
      id: 0,
      po_id: 0,
      po_no_description: "TEST PO 01",
      po_detail_qty: 100,
      uom_no_name: "kg [ Kilogram ]",
      po_due_date: "02/02/2021",
    },
  ],
  history_list: [
    {
      id: 0,
      transfer_date: "15/01/2021",
      transfer_type: "Receive",
      transfer_from: "Vendor Location",
      transfer_to: "Location 01",
      transfer_qty: 10.5,
      available_qty: 28.521,
      uom_no: "kg",
    },
    {
      id: 1,
      transfer_date: "16/01/2021",
      transfer_type: "Issue",
      transfer_from: "Location 01",
      transfer_to: "Location 02",
      transfer_qty: 25,
      available_qty: 3.521,
      uom_no: "kg",
    },
    {
      id: 2,
      transfer_date: "22/01/2021",
      transfer_type: "Receive",
      transfer_from: "Vendor Location",
      transfer_to: "Location 01",
      transfer_qty: 85,
      available_qty: 88.521,
      uom_no: "kg",
    },
    {
      id: 3,
      transfer_date: "23/01/2021",
      transfer_type: "Issue",
      transfer_from: "Location 01",
      transfer_to: "Production Location",
      transfer_qty: 20,
      available_qty: 68.521,
      uom_no: "kg",
    },
    {
      id: 4,
      transfer_date: "31/01/2021",
      transfer_type: "Issue",
      transfer_from: "Location 01",
      transfer_to: "Production Location",
      transfer_qty: 30.521,
      available_qty: 38,
      uom_no: "kg",
    },
  ],
  visible: false,
  bounds: { left: 0, top: 0, bottom: 0, right: 0 },
  disabled: true,
};
const TabMRPRMDetail = () => {
  const { mainState, mainStateDispatch, readOnly } = useContext(MRPContext);
  // console.log("Tab RM Detail mainState", mainState);

  const onChange = (rowId, data) => {
    mainStateDispatch({
      type: "CHANGE_OBJ_DETAIL_VALUE",
      payload: {
        key: "rm_detail",
        rowId,
        data,
      },
    });
  };
  // const draggleRef = React.createRef();
  // const { RMReducer, readOnly, so_id, so_detail_id } = useContext(MRPContext);
  // const itemList = useSelector((state) =>
  //   state.inventory.master_data.item_list.filter((item) => item.type_id === 1)
  // );
  // const inputData = {
  //   itemList: itemList,
  // };
  // const [itemDetail, setItemDetail] = useState(initialState);
  // const viewOnHandDetail = (record) => {
  //   console.log(record);
  //   setItemDetail({
  //     ...itemDetail,
  //     ...record,
  //     visible: true,
  //   });
  //   console.log("openModal");
  // };
  // const onStart = (event, uiData) => {
  //   const { clientWidth, clientHeight } = window?.document?.documentElement;
  //   const targetRect = this.draggleRef?.current?.getBoundingClientRect();
  //   setItemDetail({
  //     ...itemDetail,
  //     bounds: {
  //       left: -targetRect?.left + uiData?.x,
  //       right: clientWidth - (targetRect?.right - uiData?.x),
  //       top: -targetRect?.top + uiData?.y,
  //       bottom: clientHeight - (targetRect?.bottom - uiData?.y),
  //     },
  //   });
  // };
  // useEffect(() => {
  //   // setItemDetail()
  //   console.log("RMReducer data", RMReducer.data);
  // }, [so_detail_id]);
  // console.log("so_detail_id", so_detail_id);
  // console.log("state", itemDetail);
  // console.log("RMReducer.data", RMReducer.data);
  return (
    <>
      <Row className="col-2 row-margin-vertical  detail-tab-row">
        <Col span={13} className="text-left">
          <Text strong style={{ fontSize: 16 }}>
            <ProfileOutlined style={{ marginRight: 10 }} /> Raw Material List
          </Text>
        </Col>
        <Col span={11} className="text-right"></Col>
      </Row>
      {/* Column Header */}
      <CustomTable
        rowKey="id"
        rowClassName={(record) => {
          return readOnly
            ? "row-table-detail "
            : record.auto_genarate_item
            ? "row-table-detail "
            : "row-table-detail require";
        }}
        // rowClassName="row-error"
        pageSize={10}
        focusLastPage={true}
        columns={mrpDetailColumns(
          { readOnly, onChange }
          // RMReducer.onChangeDetailValue,
          // RMReducer.deleteRow,
          // null,
          // viewOnHandDetail,
          // inputData
        )}
        dataSource={mainState.rm_detail}
        readOnly={readOnly}
        // onAdd={RMReducer.addNewRow}
      />
      {/* Modal */}

      {/* <Modal
        visible={itemDetail.visible}
        title={
          <div
            style={{
              width: "100%",
              cursor: "move",
            }}
            onMouseOver={() => {
              if (itemDetail.disabled) {
                setItemDetail({ ...itemDetail, disabled: false });
              }
            }}
            onMouseOut={() => {
              setItemDetail({ ...itemDetail, disabled: true });
            }}
            // fix eslintjsx-a11y/mouse-events-have-key-events
            // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
            onFocus={() => {}}
            onBlur={() => {}}
            // end
          >
            {`${itemDetail.item_no_name}`}
          </div>
        }
        footer={null}
        width={800}
        onOk={() => console.log("ok")}
        onCancel={() => setItemDetail({ ...itemDetail, visible: false })}
        modalRender={(modal) => (
          <Draggable
            disabled={itemDetail.disabled}
            bounds={itemDetail.bounds}
            onStart={(event, uiData) => onStart(event, uiData)}>
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}>
        <Tabs onChange={() => console.log("tab change")} type='card'>
          <Tabs.TabPane tab='On Reserved' key='1'>
            <CustomTable
              rowKey='id'
              rowClassName={"row-table-detail"}
              pageSize={10}
              columns={[
                {
                  id: 0,
                  title: "No.",
                  render: (value, record) => record.id + 1,
                  width: "7%",
                  align: "center",
                },
                {
                  id: 1,
                  title: "Due date",
                  dataIndex: "issue_due_date",
                  align: "center",
                  width: "13%",
                },
                {
                  id: 2,
                  title: "Description",
                  dataIndex: "issue_no_description",
                  // width: "50%",
                },
                {
                  id: 3,
                  title: "Quantity",
                  dataIndex: "issue_detail_qty",
                  width: "15%",
                  align: "right",
                  render: (value) => convertDigit(value, 4),
                },
                {
                  id: 4,
                  title: "UoM",
                  dataIndex: "uom_no_name",
                  width: "20%",
                  align: "left",
                },
              ]}
              dataSource={itemDetail.issue_list}
              readOnly={true}
              summary={(pageData) => {
                let total = pageData.reduce(
                  (total, obj) => total + obj.issue_detail_qty,
                  0
                );
                return (
                  <>
                    <Table.Summary.Row className='row-table-detail row-summary'>
                      <Table.Summary.Cell colSpan={2}></Table.Summary.Cell>
                      <Table.Summary.Cell>
                        <Text strong>Total</Text>{" "}
                      </Table.Summary.Cell>
                      <Table.Summary.Cell className='text-right'>
                        <Text strong>{convertDigit(total, 4)}</Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell className='text-left'>
                        <Text strong>
                          {pageData.length && pageData[0].uom_no_name}
                        </Text>
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                  </>
                );
              }}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab='Purchase Order' key='2'>
            <CustomTable
              rowKey='id'
              rowClassName={"row-table-detail"}
              pageSize={10}
              columns={[
                {
                  id: 0,
                  title: "No.",
                  render: (value, record) => record.id + 1,
                  width: "7%",
                  align: "center",
                },
                {
                  id: 1,
                  title: "Due date",
                  dataIndex: "po_due_date",
                  align: "center",
                  width: "13%",
                },
                {
                  id: 2,
                  title: "Description",
                  dataIndex: "po_no_description",
                  // width: "50%",
                },
                {
                  id: 3,
                  title: "Quantity",
                  dataIndex: "po_detail_qty",
                  width: "15%",
                  align: "right",
                  render: (value) => convertDigit(value, 4),
                },
                {
                  id: 4,
                  title: "UoM",
                  dataIndex: "uom_no_name",
                  width: "20%",
                  align: "left",
                },
              ]}
              dataSource={itemDetail.po_list}
              readOnly={true}
              summary={(pageData) => {
                let total = pageData.reduce(
                  (total, obj) => total + obj.po_detail_qty,
                  0
                );
                return (
                  <>
                    <Table.Summary.Row className='row-table-detail row-summary'>
                      <Table.Summary.Cell colSpan={2}></Table.Summary.Cell>
                      <Table.Summary.Cell>
                        <Text strong>Total</Text>{" "}
                      </Table.Summary.Cell>
                      <Table.Summary.Cell className='text-right'>
                        <Text strong>{convertDigit(total, 4)}</Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell className='text-left'>
                        <Text strong>
                          {pageData.length && pageData[0].uom_no_name}
                        </Text>
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                  </>
                );
              }}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab='History' key='3'>
            <CustomTable
              rowKey='id'
              rowClassName={"row-table-detail"}
              pageSize={10}
              columns={[
                {
                  title: "Date",
                  dataIndex: "transfer_date",
                  align: "center",
                  width: "13%",
                },
                {
                  title: "Type",
                  dataIndex: "transfer_type",
                  width: "10%",
                },
                {
                  title: "Form",
                  dataIndex: "transfer_from",
                },
                {
                  title: "To",
                  dataIndex: "transfer_to",
                },
                {
                  title: "Quantity",
                  dataIndex: "transfer_qty",
                  width: "10%",
                  align: "right",
                  render: (value) => convertDigit(value, 4),
                },
                {
                  // id: 3,
                  title: "Available",
                  dataIndex: "available_qty",
                  width: "10%",
                  align: "right",
                  render: (value) => convertDigit(value, 4),
                },
                {
                  // id: 4,
                  title: "UoM",
                  dataIndex: "uom_no",
                  width: "10%",
                  align: "left",
                },
              ]}
              dataSource={itemDetail.history_list}
              readOnly={true}
            />
          </Tabs.TabPane>
        </Tabs>
      </Modal> */}
      {/* <DragableModal /> */}
    </>
  );
};

export default React.memo(TabMRPRMDetail);
