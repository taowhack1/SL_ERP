import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { Row, Col, Table } from "antd";
import MainLayout from "../../components/MainLayout";
import { reqColumns, data } from "../../data/inventoryData";
import $ from "jquery";
import axios from "axios";
const Receipts = (props) => {
  console.log(props.location.state);

  const [selectedRow, setSelectedRow] = useState();
  const [rowClick, setRowClick] = useState(false);
  const [dataTable, setDataTable] = useState([]);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  useEffect(() => {
    axios.get("http://localhost:3001/requisition").then((res) => {
      setDataTable(res.data);
    });
  }, []);
  const config = {
    projectId: 1,
    title: "INVENTORY",
    show: true,
    breadcrumb: ["Home", "Receipts"],
    search: true,
    create: "/inventory/receipts/create",
    buttonAction: ["Create", "Edit"],
    edit: {
      data: selectedRow,
      path: selectedRow && "/inventory/receipts/edit/" + selectedRow.id,
    },
    disabledEditBtn: !rowClick,
    discard: "/inventory/receipts",
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
              columns={reqColumns}
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

export default withRouter(Receipts);
