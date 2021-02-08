import React, { useState } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import MainLayout from "../../../../components/MainLayout";
import {
  mockupData,
  transferColumnsSubtable,
  transferColumnsHead,
  mockupDataDetail,
} from "./TransferConfig";
import { Row, Col, Table } from "antd";
import $ from "jquery";
const Transfer = (props) => {
  const current_project = useSelector((state) => state.auth.currentProject);
  const [rowClick, setRowClick] = useState(false);
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: ["Home", "Transfer"],
    search: true,
    // onSearch: (value) => {
    //   console.log(value);
    //   setLoading(true);
    //   setTimeout(() => {
    //     const search_category = category.filter(
    //       (category) => category.category_name.indexOf(value) >= 0
    //     );
    //     setData(search_category);
    //     setLoading(false);
    //   }, 1200);
    // },
    create: "/inventory/transfer/create",
    buttonAction: ["Create"],
    discard: "/transfer/create",
    onCancel: () => {
      console.log("Cancel");
    },
  };
  const expandedRowRender = (record) => {
    // const result = data.filter(
    //   (dataResult) => dataResult.type_id === record.type_id
    // );

    return (
      <Table
        columns={transferColumnsSubtable}
        dataSource={mockupDataDetail}
        rowKey={"item_id"}
        pagination={{ pageSize: 20 }}
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
              //dispatch(get_issue_by_id(record.issue_id, auth.user_name));
              props.history.push({
                pathname: "/inventory/transfer/view/",
              });
            },
          };
        }}
      />
    );
  };
  return (
    <div>
      <MainLayout {...config}>
        <Row>
          <Table
            columns={transferColumnsHead}
            dataSource={mockupData}
            pagination={{ pageSize: 20 }}
            rowKey={"transfer_id"}
            size="small"
            expandable={{ expandedRowRender }}
          />
        </Row>
      </MainLayout>
    </div>
  );
};

export default withRouter(Transfer);
