import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { Row, Col, Table } from "antd";
import MainLayout from "../../components/MainLayout";
import { reqColumns } from "../../data/inventoryData";
import { prData, prColumns } from "../../data/purchase/data";
import $ from "jquery";
import axios from "axios";
const Requisition = (props) => {
  const projectDetail = JSON.parse(localStorage.getItem("project_detail"));
  const [selectedRow, setSelectedRow] = useState();
  const [rowClick, setRowClick] = useState(false);
  const [dataTable, setDataTable] = useState(prData);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  // useEffect(() => {
  //   axios.get("http://localhost:3001/requisition").then((res) => {
  //     setDataTable(res.data);
  //   });
  // }, []);
  const config = {
    projectId: projectDetail.project_id,
    title: projectDetail.project_name,
    home: projectDetail.project_url,
    show: true,
    breadcrumb: ["Home", "Purchase Requisition"],
    search: true,
    create: "/purchase/pr/create",
    buttonAction: ["Create", "Edit"],
    edit: {
      data: selectedRow,
      path: selectedRow && "/purchase/pr/edit/" + selectedRow.id,
    },
    disabledEditBtn: !rowClick,
    discard: "/purchase/pr",
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
              columns={prColumns}
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
                    console.log(record);
                    props.history.push({
                      pathname: "/purchase/pr/view/" + record.id,
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

export default withRouter(Requisition);
