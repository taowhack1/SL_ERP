import React, { Component, useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { Row, Col, Table } from "antd";
import MainLayout from "../../components/MainLayout";
import { customerColumns, customerData } from "../../data/sale/data";
import $ from "jquery";
import axios from "axios";
const Customer = (props) => {
  const [selectedRow, setSelectedRow] = useState();
  const [rowClick, setRowClick] = useState(false);
  const [dataTable, setDataTable] = useState([...customerData]);
  const [copyTable, setCopy] = useState([]);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const config = {
    projectId: 3,
    title: "SALES",
    show: true,
    breadcrumb: ["Home", "Customers"],
    search: true,
    create: "/sales/config/customers/create",
    buttonAction: ["Create", "Edit"],
    edit: {
      data: selectedRow,
      path: selectedRow && "/sales/config/customers/edit/" + selectedRow.id,
    },
    disabledEditBtn: !rowClick,
    discard: "/sales/config/customers",
    onCancel: () => {
      console.log("Cancel");
    },
  };
  console.log(selectedRow);
  return (
    <div>
      <MainLayout {...config}>
        <Row>
          <Col span={24}>
            <Table
              columns={customerColumns}
              dataSource={dataTable}
              onChange={onChange}
              size="small"
              rowClassName="row-pointer"
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
                    props.history.push({
                      pathname: "/sales/config/customers/view/" + record.id,
                      state: record,
                    });
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

export default withRouter(Customer);
