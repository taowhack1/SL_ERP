/** @format */

import React, { useState, useEffect } from "react";

import { withRouter } from "react-router-dom";
import { Row, Col, Table, Button } from "antd";
import MainLayout from "../../components/MainLayout";
import { pr_list_columns } from "./config/pr";
import $ from "jquery";
import { useSelector, useDispatch } from "react-redux";
import {
  get_pr_list,
  get_pr_by_id,
  filterPR,
} from "../../actions/purchase/PR_Actions";
import { reset_pr_data } from "../../actions/purchase/PR_Actions";
import { reset_comments } from "../../actions/comment&log";
import { getMasterDataItem } from "../../actions/inventory";

import useKeepLogs from "../logs/useKeepLogs";
import Authorize from "../system/Authorize";
import { useFetch } from "../../include/js/customHooks";
import { api_purchase_get_all_pr } from "../../include/js/api";
import { sortData } from "../../include/js/function_main";

const Requisition = (props) => {
  const authorize = Authorize();
  authorize.check_authorize();
  const dispatch = useDispatch();
  const keepLog = useKeepLogs();
  const { filter } = useSelector((state) => state.purchase.pr);
  const { pageSize, page, keyword } = filter || {};
  const [data, setData] = useState([]);
  const auth = useSelector((state) => state.auth.authData);
  const currentMenu = useSelector((state) => state.auth.currentMenu);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
    const { current, pageSize } = pagination;
    dispatch(filterPR({ page: current, pageSize }));
  };
  const listDataPr = useFetch(`${api_purchase_get_all_pr}/${auth.user_name}`);

  const getSearchData = (keyword) => {
    const search_data =
      listDataPr?.data &&
      sortData(
        keyword
          ? listDataPr?.data[0]?.filter(
              (pr) =>
                pr?.pr_no?.indexOf(keyword) >= 0 ||
                pr?.cost_center_no_name?.indexOf(keyword) >= 0 ||
                pr?.pr_created_by_no_name?.indexOf(keyword) >= 0 ||
                pr?.pr_created?.indexOf(keyword) >= 0 ||
                pr?.pr_description?.indexOf(keyword) >= 0
            )
          : listDataPr?.data[0]
      );

    return sortData(search_data);
  };

  useEffect(() => {
    // Getdispatch(get_pr_list(auth.user_name));
    //dispatch(reset_pr_data());
    dispatch(getMasterDataItem());
    dispatch(reset_comments());
  }, [dispatch]);

  useEffect(() => {
    console.log("Filter Keyword :>> ", keyword);
    const respSearch = getSearchData(keyword);
    setData(respSearch);
  }, [keyword, listDataPr?.data]);
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
      dispatch(filterPR({ keyword: value }));
    },
    searchValue: keyword || null,
    searchBar: (
      <Button
        className='primary'
        onClick={() =>
          dispatch(
            filterPR({
              page: 1,
              pageSize: 20,
              keyword: null,
              pr_id: null,
            })
          )
        }>
        Clear Filter
      </Button>
    ),
  };

  const getTable = () => {
    return (
      <Table
        columns={pr_list_columns}
        dataSource={data}
        onChange={onChange}
        loading={listDataPr.loading ? true : false}
        size='small'
        rowKey='pr_id'
        pagination={{
          pageSize,
          current: page,
          pageSizeOptions: ["15", "20", "30", "50", "100", "1000"],
        }}
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
