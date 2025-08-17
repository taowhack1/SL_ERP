/** @format */

import React, { useEffect } from "react";

import { withRouter } from "react-router-dom";
import { Row, Col, Table } from "antd";
import MainLayout from "../../components/MainLayout";
import { pr_list_columns } from "./config/pr";
import $ from "jquery";
import { useSelector, useDispatch } from "react-redux";
import {
  get_pr_by_id,
  filterPR,
} from "../../actions/purchase/PR_Actions";
import { reset_comments } from "../../actions/comment&log";
import { getMasterDataItem } from "../../actions/inventory";

import useKeepLogs from "../logs/useKeepLogs";
import Authorize from "../system/Authorize";
import SearchPR from "./components/SearchPR";
import useSearch from "../../include/js/customHooks/useSearch";

const Requisition = (props) => {
  const authorize = Authorize();
  authorize.check_authorize();
  const dispatch = useDispatch();
  const keepLog = useKeepLogs();
  const auth = useSelector((state) => state.auth.authData);
  const currentMenu = useSelector((state) => state.auth.currentMenu);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
    const { current, pageSize } = pagination;
    dispatch(filterPR({ page: current, pageSize }));
  };

  useEffect(() => {
    // Getdispatch(get_pr_list(auth.user_name));
    //dispatch(reset_pr_data());
    dispatch(getMasterDataItem());
    dispatch(reset_comments());
  }, [dispatch]);


  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: ["Home", "Purchase Requisition"],
    search: false,
    create: "/purchase/pr/create",
    buttonAction: currentMenu.button_create !== 0 ? ["Create"] : [],
    edit: {},
    discard: "/purchase/pr",
    onCancel: () => {
      console.log("Cancel");
    },
  };

  const searchHook = useSearch({
    endpoint: `${process.env.REACT_APP_API_SERVER_V2}/purchase/pr/search`,
    initialParams: {
      user_name: auth.user_name,
      filter: {
        vendor: undefined,
        selected_vendor: { label: "", value: "" },
        request_by: undefined,
        create_date: undefined,
        due_date: undefined,
      },
    },
    debounceMs: 1000,
    mapResult: (res) => res,
    storageKey: "PRState",
  });
  console.log("searchHook params", searchHook.params);
  return (
    <div>
      <MainLayout {...config}>
        <Row style={{ marginTop: 25 }}>
          <Col span={24}>
            <SearchPR
              hook={searchHook}
              initialUI={{
                pr: searchHook.params.filter?.pr || "",
                vendor: { label: searchHook.params?.filter?.selected_vendor?.label || searchHook.params?.filter?.vendor || "", value: "" },
                request_by: { label: searchHook.params.filter?.request_by || "", value: "" },
                create_date: [searchHook.params.filter?.create_date_start || null, searchHook.params.filter?.create_date_end],
                due_date: [searchHook.params.filter?.due_date_start || null, searchHook.params.filter?.due_date_end],
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              columns={pr_list_columns}
              dataSource={searchHook?.data}
              onChange={onChange}
              loading={searchHook.loading ? true : false}
              size='small'
              rowKey='pr_id'
              pagination={false}
              scroll={{ y: 500 }}
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
          </Col>
        </Row>
      </MainLayout>
    </div>
  );
};

export default withRouter(Requisition);
