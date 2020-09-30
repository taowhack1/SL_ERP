import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { Row, Col, Table } from "antd";
import MainLayout from "../../components/MainLayout";
import { poColumns, poData } from "../../data/purchase/data";
import $ from "jquery";
import axios from "axios";
const PurchaseOrders = (props) => {
  const [selectedRow, setSelectedRow] = useState();
  const [rowClick, setRowClick] = useState(false);
  const [dataTable, setDataTable] = useState(poData);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  // useEffect(() => {
  //   axios.get("http://localhost:3001/requisition").then((res) => {
  //     setDataTable(res.data);
  //   });
  // }, []);
  const config = {
    projectId: 2,
    title: "PURCHASE",
    show: true,
    breadcrumb: ["Home", "Purchase Orders"],
    search: true,
    create: "/purchase/po/create",
    buttonAction: ["Create", "Edit"],
    edit: {
      data: dataTable,
      path: dataTable && "/purchase/po/edit/" + dataTable.id,
    },
    disabledEditBtn: !rowClick,
    discard: "/purchase/po",
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
              columns={poColumns}
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
                      pathname: "/purchase/po/view/" + record.id,
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

export default withRouter(PurchaseOrders);
