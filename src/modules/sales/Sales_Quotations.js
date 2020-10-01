import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { Row, Col, Table } from "antd";
import MainLayout from "../../components/MainLayout";
import { quotationColumns, quotationData } from "../../data/sale/data";
import $ from "jquery";
import axios from "axios";
const Quotations = (props) => {
  const [selectedRow, setSelectedRow] = useState();
  const [rowClick, setRowClick] = useState(false);
  const [dataTable, setDataTable] = useState(quotationData && quotationData);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  // useEffect(() => {
  //   axios.get("http://localhost:3001/requisition").then((res) => {
  //     setDataTable(res.data);
  //   });
  // }, []);
  const projectDetail = JSON.parse(localStorage.getItem("project_detail"));
  const config = {
    projectId: projectDetail.project_id,
    title: projectDetail.project_name,
    home: projectDetail.project_url,
    show: true,
    breadcrumb: ["Home", "Quotations"],
    search: true,
    create: "/sales/quotations/create",
    buttonAction: ["Create", "Edit"],
    edit: {
      data: selectedRow,
      path: selectedRow && "/sales/quotations/edit/" + selectedRow.id,
    },
    disabledEditBtn: !rowClick,
    discard: "/sales/quotations",
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
              columns={quotationColumns}
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
                      pathname: "/sales/quotations/view/" + record.id,
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

export default withRouter(Quotations);
