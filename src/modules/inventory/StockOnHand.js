import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { Row, Col, Table, Tabs } from "antd";
import MainLayout from "../../components/MainLayout";
import $ from "jquery";
import { get_report_stock } from "../../actions/inventory";
import { stock_on_hand_columns } from "./config/report";
import Authorize from "../system/Authorize";
import Modal from "antd/lib/modal/Modal";
import CustomTable from "../../components/CustomTable";
import { convertDigit } from "../../include/js/main_config";
import Text from "antd/lib/typography/Text";

const StockMove = (props) => {
  const authorize = Authorize();
  authorize.check_authorize();
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(15);
  const [rowClick, setRowClick] = useState(false);
  const [loading, setLoading] = useState(false);
  const [itemDetail, setItemDetail] = useState({
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
  });
  const onChange = ({ pageSize }, filters, sorter, extra) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1200);
    setPageSize(pageSize);
    console.log("params", filters, sorter, extra);
  };
  const stock_on_hand = useSelector(
    (state) => state.inventory.report.stock_on_hand
  );
  const [state, setState] = useState(stock_on_hand);
  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: ["Home", "Stock on hand"],
    search: true,
    create: "",
    buttonAction: [],
    edit: {
      data: {},
      path: "",
    },
    disabledEditBtn: !rowClick,
    discard: "/inventory",
    onCancel: () => {
      console.log("Cancel");
    },
    onSearch: (searchText) => {
      console.log(searchText);
      searchText
        ? setState(
            stock_on_hand.filter(
              (item) => item.item_no_name.indexOf(searchText) >= 0
            )
          )
        : setState(stock_on_hand);
    },
  };

  useEffect(() => {
    setLoading(true);
    dispatch(get_report_stock());
  }, []);

  useEffect(() => {
    setState(stock_on_hand);
    setLoading(false);
  }, [stock_on_hand]);
  console.log(itemDetail);
  return (
    <div>
      <MainLayout {...config} pageLoad={loading}>
        <Row>
          <Col span={24}>
            <Table
              loading={loading}
              columns={stock_on_hand_columns}
              dataSource={state}
              onChange={onChange}
              rowKey={"item_id"}
              pagination={{ pageSize }}
              size="small"
              onRow={(record, rowIndex) => {
                return {
                  onClick: (e) => {
                    setRowClick(true);
                    $(e.target)
                      .closest("tbody")
                      .find("tr")
                      .removeClass("selected-row");
                    $(e.target).closest("tr").addClass("selected-row");
                    setItemDetail({
                      ...itemDetail,
                      ...record,
                      visible: true,
                    });
                  },
                };
              }}
            />
          </Col>
        </Row>
      </MainLayout>
      <Modal
        visible={itemDetail.visible}
        title={`${itemDetail.item_no_name}`}
        footer={null}
        width={800}
        onOk={() => console.log("ok")}
        onCancel={() => setItemDetail({ ...itemDetail, visible: false })}
      >
        <Tabs onChange={() => console.log("tab change")} type="card">
          <Tabs.TabPane tab="On Reserved" key="1">
            <CustomTable
              rowKey="id"
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
                  title: "UOM",
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
                    <Table.Summary.Row className="row-table-detail row-summary">
                      <Table.Summary.Cell colSpan={2}></Table.Summary.Cell>
                      <Table.Summary.Cell>
                        <Text strong>Total</Text>{" "}
                      </Table.Summary.Cell>
                      <Table.Summary.Cell className="text-right">
                        <Text strong>{convertDigit(total, 4)}</Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell className="text-left">
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
          <Tabs.TabPane tab="Purchase Order" key="2">
            <CustomTable
              rowKey="id"
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
                  title: "UOM",
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
                    <Table.Summary.Row className="row-table-detail row-summary">
                      <Table.Summary.Cell colSpan={2}></Table.Summary.Cell>
                      {/* <Table.Summary.Cell></Table.Summary.Cell> */}
                      <Table.Summary.Cell>
                        <Text strong>Total</Text>{" "}
                      </Table.Summary.Cell>
                      <Table.Summary.Cell className="text-right">
                        <Text strong>{convertDigit(total, 4)}</Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell className="text-left">
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
          <Tabs.TabPane tab="History" key="3">
            <CustomTable
              rowKey="id"
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
                  title: "UOM",
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
      </Modal>
    </div>
  );
};

export default withRouter(StockMove);
