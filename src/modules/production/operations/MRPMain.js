/** @format */

import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";
import { Row, Col, Table, Tabs, Modal } from "antd";
import MainLayout from "../../../components/MainLayout";

import $ from "jquery";
import Authorize from "../../system/Authorize";
import useKeepLogs from "../../logs/useKeepLogs";

import {
  mockupWorkOrderMonitorRM,
  mrp_columns,
  workOrderMonitorRM,
} from "../config/mrp";
import MRPSearchTool from "./MRPSearchTool";
import { getAllMRP } from "../../../actions/production/mrpActions";
import { reset_comments } from "../../../actions/comment&log";
import Search from "../../../components/Search";
import { getAllItems } from "../../../actions/inventory/itemActions";
import { useFetch } from "../../../include/js/customHooks";
import { api_mrp, api_mrp_so_ref } from "../../../include/js/api";
import SearchMRP from "../components/SearchMRP";
import useSearch from "../../../include/js/customHooks/useSearch";
const MRPMain = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const keepLog = useKeepLogs();
  const authorize = Authorize();
  authorize.check_authorize();
  const auth = useSelector((state) => state.auth.authData);
  const [rowClick, setRowClick] = useState(false);

  const listDataMRP_SO_REF = useFetch(`${api_mrp_so_ref}`);
  const count_so_ref = listDataMRP_SO_REF && listDataMRP_SO_REF?.data?.length;

  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: ["Home", "Operations", "MRP"],
    search: false,
    create: "/production/operations/mrp/create",
    buttonAction: ["Create"],
    edit: {},
    disabledEditBtn: !rowClick,
    discard: "/production",
    badgeCount: count_so_ref,
    onCancel: () => {
      console.log("Cancel");
    },

  };

  useEffect(() => {
    dispatch(getAllMRP(auth.user_name));
    dispatch(getAllItems());
    dispatch(reset_comments());
  }, []);

  const searchHook = useSearch({
    endpoint: `${process.env.REACT_APP_API_SERVER_V2}/production/mrp/search`,
    initialParams: {
      user_name: auth.user_name,
      filter: {
        create_date: undefined,
        due_date: undefined,
      },
    },
    debounceMs: 1000,
    mapResult: (res) => res,
    storageKey: "MRPState",
  });
  console.log("searchHook.params", searchHook.params)

  if (searchHook?.params?.user_name != auth.user_name) {
    searchHook.clear()
  }
  return (
    <div>
      <MainLayout {...config}>
        <Row style={{ marginTop: 15 }} className='row-tab-margin-lg'>
          <Col span={24}>
            <SearchMRP
              hook={searchHook}
              initialUI={{
                so: searchHook.params.filter?.so || "",
                mrp: {
                  value: "",
                  label: searchHook.params.filter?.selected_mrp?.label || searchHook.params.filter?.mrp || "",
                },
                item: {
                  value: "",
                  label: searchHook.params.filter?.selected_item?.label || searchHook.params.filter?.item || "",
                },
                plan_date: [searchHook.params.filter?.plan_date_start || null, searchHook.params.filter?.plan_date_end],
                due_date: [searchHook.params.filter?.due_date_start || null, searchHook.params.filter?.due_date_end],
              }}
            />
            <Table
              loading={searchHook?.loading}
              columns={mrp_columns()}
              dataSource={searchHook?.data}
              pagination={false}
              scroll={{ y: 530 }}
              bordered
              size='small'
              rowKey='mrp_id'
              onRow={(record) => {
                return {
                  onClick: (e) => {
                    if (e.target.localName == "td") {
                      setRowClick(true);
                      $(e.target)
                        .closest("tbody")
                        .find("tr")
                        .removeClass("selected-row");
                      $(e.target).closest("tr").addClass("selected-row");
                      keepLog.keep_log_action(record.mrp_no);
                      history.push(
                        "/production/operations/mrp/view/" + record.mrp_id
                      );
                    }
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

export default withRouter(MRPMain);
