import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Row, Col, Table } from "antd";
import MainLayout from "../../components/MainLayout";
import { pr_list_columns } from "./fields_config/pr";
import $ from "jquery";
import { useSelector, useDispatch } from "react-redux";
import { get_pr_list } from "../../actions/Purchase/PR_Actions";
const Requisition = (props) => {
  const dispatch = useDispatch();

  const projectDetail = JSON.parse(localStorage.getItem("project_detail"));
  const data = useSelector((state) => state.purchase.pr_list);
  const [rowClick, setRowClick] = useState(false);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  useEffect(() => {
    function getList() {
      dispatch(get_pr_list());
    }
    getList();
  }, [dispatch]);
  const config = {
    projectId: projectDetail.project_id,
    title: projectDetail.project_name,
    home: projectDetail.project_url,
    show: true,
    breadcrumb: ["Home", "Purchase Requisition"],
    search: true,
    create: "/purchase/pr/create",
    buttonAction: ["Create", "Edit"],
    edit: {},
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
              columns={pr_list_columns}
              dataSource={data}
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
                    props.history.push({
                      pathname: "/purchase/pr/edit/" + record.pr_id,
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
