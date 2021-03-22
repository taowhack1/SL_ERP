/** @format */

import { Col, Row, Table } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, withRouter } from "react-router";
import MainLayout from "../../../components/MainLayout";
import { columns, datamackup } from "./reportQcConfig";

const ReportQC = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [rowClick, setRowClick] = useState(false);
  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: ["Home", "report"],
    search: false,
    create: "/qa/report",
    // buttonAction: current_menu.button_create !== 0 ? ["Create"] : [],
    buttonAction: "",
    edit: {},
    //disabledEditBtn: !rowClick,
    discard: "",
    onCancel: () => {
      console.log("Cancel");
    },
  };
  return (
    <MainLayout {...config}>
      <Row>
        <Col span={24}>
          <Table columns={columns} dataSource={datamackup}></Table>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default withRouter(ReportQC);
