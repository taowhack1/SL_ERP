import React, { useState, useEffect } from "react";

import { withRouter } from "react-router-dom";
import { Row, Col, Table } from "antd";
import MainLayout from "../../components/MainLayout";
import { pr_list_columns } from "./fields_config/pr";
import $ from "jquery";
import { useSelector, useDispatch } from "react-redux";
import {
  get_pr_list,
  update_pr_head,
  get_pr_by_id,
} from "../../actions/purchase/PR_Actions";
import {
  set_pr_head,
  get_pr_detail,
  reset_pr_data,
} from "../../actions/purchase/PR_Actions";
import { reset_comments } from "../../actions/comment&log";
import { getSelectItem, getSelectUOM } from "../../actions/inventory";
const Requisition = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.authData[0]);
  let data = useSelector((state) => state.purchase.pr_list);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  useEffect(() => {
    dispatch(get_pr_list());
    dispatch(reset_pr_data());
    dispatch(getSelectItem());
    dispatch(getSelectUOM());
    return () => {
      dispatch(reset_comments());
    };
  }, [dispatch]);

  const getData = (pr_id, user_name) => {
    dispatch(get_pr_by_id(pr_id, user_name));
    dispatch(get_pr_detail(pr_id));
  };
  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project.project_id,
    title: current_project.project_name,
    home: current_project.project_url,
    show: true,
    breadcrumb: ["Home", "Purchase Requisition"],
    search: true,
    create: "/purchase/pr/create",
    buttonAction: ["Create"],
    edit: {},
    // disabledEditBtn: !rowClick,
    discard: "/purchase/pr",
    onCancel: () => {
      console.log("Cancel");
    },
    onSearch: (value) => {
      data = data.filter((pr) => pr.pr_no.indexOf(value) >= 0);
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
              rowKey="pr_id"
              onRow={(record, rowIndex) => {
                return {
                  onClick: (e) => {
                    $(e.target)
                      .closest("tbody")
                      .find("tr")
                      .removeClass("selected-row");
                    $(e.target).closest("tr").addClass("selected-row");
                    // dispatch(set_pr_head(record.pr_id, data));
                    getData(record.pr_id, auth.user_name);

                    props.history.push({
                      pathname: "/purchase/pr/view/" + record.pr_id,
                      // state: record,
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
