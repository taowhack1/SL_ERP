import React, { useState, useEffect, useContext } from "react";
import { Component } from "react";
import { withRouter } from "react-router-dom";
import { Row, Col, Table, Button } from "antd";
import MainLayout from "../../components/MainLayout";
import { pr_list_columns } from "./config/pr";
import $ from "jquery";
import { useSelector, useDispatch } from "react-redux";
import {
  get_pr_list,
  update_pr_head,
  get_pr_by_id,
} from "../../actions/purchase/PR_Actions";
import {
  get_pr_detail,
  reset_pr_data,
} from "../../actions/purchase/PR_Actions";
import { reset_comments } from "../../actions/comment&log";
import { getMasterDataItem } from "../../actions/inventory";
import { Context } from "../../include/js/context";
import useKeepLogs from "../logs/useKeepLogs";
import Authorize from "../system/Authorize";
import { getStepStatus } from "../../include/js/function_main";
const Requisition = (props) => {
  const authorize = Authorize();
  authorize.check_authorize();
  const dispatch = useDispatch();
  const keepLog = useKeepLogs();
  const pr_list = useSelector((state) => state.purchase.pr.pr_list);
  const [data, setData] = useState(pr_list);
  const [loading, setLoading] = useState(false);
  const auth = useSelector((state) => state.auth.authData);
  const currentMenu = useSelector((state) => state.auth.currentMenu);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  useEffect(() => {
    dispatch(get_pr_list(auth.user_name));
    dispatch(reset_pr_data());
    dispatch(getMasterDataItem());
    dispatch(reset_comments());
  }, [dispatch]);

  useEffect(() => {
    setData(pr_list);
  }, [pr_list.length]);
  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: ["Home", "Purchase Requisition"],
    search: true,
    create: "/purchase/pr/create",
    buttonAction: currentMenu.button_create !== 0 ? ["Create"] : [],
    edit: {},
    discard: "/purchase/pr",
    onCancel: () => {
      console.log("Cancel");
    },
    onSearch: (value) => {
      console.log(value);
      setLoading(true);
      setTimeout(() => {
        const search_data = pr_list.filter(
          (pr) => pr.pr_no.indexOf(value) >= 0
        );
        setData(search_data);
        setLoading(false);
      }, 1200);
    },
  };

  const getTable = () => {
    return (
      <Table
        columns={pr_list_columns}
        dataSource={data}
        onChange={onChange}
        loading={loading}
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
              dispatch(get_pr_by_id(record.pr_id, auth.user_name));
              keepLog.keep_log_action(record.pr_no);
              props.history.push({
                pathname: "/purchase/pr/view/" + record.pr_id,
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
          <Col span={24}>{getTable()}</Col>
        </Row>
      </MainLayout>
    </div>
  );
};

export default withRouter(Requisition);
