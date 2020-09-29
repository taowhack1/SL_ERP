import React, { Component, useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { Row, Col, Table } from "antd";
import MainLayout from "../../components/MainLayout";
import { columnsItem, data } from "../../data/inventoryData";
import $ from "jquery";
import axios from "axios";
const Items = (props) => {
  const [selectedRow, setSelectedRow] = useState();
  const [rowClick, setRowClick] = useState(false);
  const [dataTable, setDataTable] = useState([]);
  const [copyTable, setCopy] = useState([]);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  useEffect(() => {
    axios.get("http://localhost:3001/items").then((res) => {
      setDataTable(res.data);
    });
  }, []);
  const config = {
    projectId: 1,
    title: "INVENTORY",
    show: true,
    breadcrumb: ["Home", "Items"],
    search: true,
    create: "/inventory/items/create",
    buttonAction: ["Create", "Edit"],
    edit: {
      data: selectedRow,
      path: selectedRow && "/inventory/items/edit/" + selectedRow.key,
    },
    disabledEditBtn: !rowClick,
    discard: "/inventory/items",
    onCancel: () => {
      console.log("Cancel");
    },
  };
  console.log(copyTable);
  return (
    <div>
      <MainLayout {...config}>
        <Row>
          <Col span={24}>
            <Table
              columns={columnsItem}
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
                    props.history.push({
                      pathname: "/inventory/items/view/" + record.id,
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

export default withRouter(Items);
