import React, { Component, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { Row, Col, Table } from "antd";
import MainLayout from "../../components/MainLayout";
import { columnsMove, dataMove } from "../../data/inventoryData";
import $ from "jquery";
const Requisition = (props) => {
  const [selectedRow, setSelectedRow] = useState();
  const [rowClick, setRowClick] = useState(false);
  const [dataTable, setDataTable] = useState(dataMove);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const projectDetail = JSON.parse(localStorage.getItem("project_detail"));
  const config = {
    projectId: projectDetail.project_id,
    title: projectDetail.project_name,
    home: projectDetail.project_url,
    show: true,
    breadcrumb: ["Home", "Stock move"],
    search: true,
    create: "",
    buttonAction: [],
    edit: {
      data: {},
      path: "",
      // path: selectedRow && "/inventory/stock_move/edit/" + selectedRow.key,
    },
    disabledEditBtn: !rowClick,
    discard: "/inventory/stock_move",
    onCancel: () => {
      console.log("Cancel");
    },
  };
  return (
    <div>
      <MainLayout {...config}>
        <Row>
          <Col span={24}>
            <Table
              columns={columnsMove}
              dataSource={dataTable}
              onChange={onChange}
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
                    setSelectedRow(record);
                  },
                };
              }}
            />
          </Col>
        </Row>
      </MainLayout>
    </div>
  );
};

export default withRouter(Requisition);
