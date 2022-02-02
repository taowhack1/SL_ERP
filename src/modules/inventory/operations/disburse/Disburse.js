/** @format */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { Row, Col, Table, Button } from "antd";
import MainLayout from "../../../../components/MainLayout";
import $ from "jquery";
import { getMasterDataItem } from "../../../../actions/inventory";
import { disburse_columns } from "./config";
import {
  filterDisburse,
  get_disburse_by_id,
} from "../../../../actions/inventory/disburseActions";
import Authorize from "../../../system/Authorize";
import useKeepLogs from "../../../logs/useKeepLogs";
import { api_disburse, api_issue_ref_list } from "../../../../include/js/api";
import { useFetch } from "../../../../include/js/customHooks";
import { sortData } from "../../../../include/js/function_main";
const Disburse = (props) => {
  const keepLog = useKeepLogs();
  const authorize = Authorize();
  authorize.check_authorize();
  const current_menu = useSelector((state) => state.auth.currentMenu);
  const dispatch = useDispatch();
  const [rowClick, setRowClick] = useState(false);
  const auth = useSelector((state) => state.auth.authData);
  const { filter } = useSelector((state) => state.inventory.disburse);
  const { pageSize, page, keyword, disburse_id } = filter || {};
  const { issue_ref } = useSelector((state) => state.inventory.disburse);
  const [state, setState] = useState();
  const onChange = (pagination, filters, sorter, extra) => {
    const { current, pageSize } = pagination;
    console.log("params", pagination, filters, sorter, extra);
    dispatch(filterDisburse({ page: current, pageSize }));
  };
  const listDataDisburse = useFetch(`${api_disburse}/all/${auth?.user_name}`);
  const listDataIssueRef = useFetch(`${api_issue_ref_list}`);
  const count_issue_ref =
    listDataIssueRef?.data && listDataIssueRef?.data[0].length;
  console.log("listDataIssueRef", listDataIssueRef);
  useEffect(() => {
    //dispatch(get_issue_ref_list());
    //dispatch(get_disburse_list(auth.user_name));
    dispatch(getMasterDataItem());
  }, []);
  const getSearchData = (keyword) => {
    const search_data =
      listDataDisburse?.data &&
      sortData(
        keyword
          ? listDataDisburse?.data[0].filter(
              (disburse) =>
                disburse.disburse_no_description.indexOf(keyword) >= 0 ||
                disburse.issue_no_description.indexOf(keyword) >= 0
            )
          : listDataDisburse?.data[0]
      );
    return sortData(search_data);
  };
  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: ["Home", "Disburse"],
    search: true,
    create: "/inventory/disburse/create",
    buttonAction: current_menu.button_create !== 0 ? ["Create"] : [],
    disabledEditBtn: !rowClick,
    discard: "/inventory/disburse",
    badgeCount: count_issue_ref,
    onCancel: () => {
      console.log("Cancel");
    },
    onSearch: (value) => {
      dispatch(filterDisburse({ keyword: value }));
    },
    searchValue: keyword || null,
    searchBar: (
      <Button
        className='primary'
        onClick={() =>
          dispatch(
            filterDisburse({
              page: 1,
              pageSize: 20,
              keyword: null,
              disburse_id: null,
            })
          )
        }>
        Clear Filter
      </Button>
    ),
  };
  useEffect(() => {
    //setState(disburse_list);
    console.log("filter Keyword :>> ", keyword);
    const respSearch = getSearchData(keyword);
    setState(respSearch);
  }, [keyword, listDataDisburse?.data]);
  return (
    <div>
      <MainLayout {...config}>
        <Row>
          <Col span={24}>
            <Table
              columns={disburse_columns}
              dataSource={state}
              onChange={onChange}
              rowKey={"disburse_id"}
              size='small'
              size={"small"}
              pagination={{
                pageSize,
                current: page,
                pageSizeOptions: ["15", "20", "30", "50", "100", "1000"],
              }}
              loading={listDataDisburse.loading ? true : false}
              onRow={(record, rowIndex) => {
                return {
                  onClick: (e) => {
                    setRowClick(true);
                    $(e.target)
                      .closest("tbody")
                      .find("tr")
                      .removeClass("selected-row");
                    $(e.target).closest("tr").addClass("selected-row");
                    dispatch(
                      get_disburse_by_id(record.disburse_id, auth.user_name)
                    );
                    keepLog.keep_log_action(record.disburse_no);
                    props.history.push({
                      pathname:
                        "/inventory/disburse/view/" + record.disburse_id,
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

export default withRouter(Disburse);
