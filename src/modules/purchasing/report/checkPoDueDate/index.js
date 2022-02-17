/** @format */
import React from "react";
import MainLayout from "../../../../components/MainLayout";
import { useSelector } from "react-redux";
import { Col, Row, Table } from "antd";
const CheckPoDuedate = () => {
  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: ["Home", "Report", "Check PO Due Date"],
    search: false,
    buttonAction: [],
  };
  return (
    <>
      <MainLayout {...config}>
        <Row>
          <Col span={24}>
            <Table></Table>
          </Col>
        </Row>
      </MainLayout>
    </>
  );
};

export default CheckPoDuedate;
