/** @format */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { Row, Col, Table, Button } from "antd";
import MainLayout from "../../components/MainLayout";
import $ from "jquery";
import { issue_columns } from "./config";
import {
  get_issue_by_id,
  get_issue_list,
  filterIssue,
  reset_issue_data,
} from "../../actions/inventory/issueActions";
import Authorize from "../system/Authorize";
import useKeepLogs from "../logs/useKeepLogs";
import { sortData } from "../../include/js/function_main";
import { reset_comments } from "../../actions/comment&log";
import { useFetch } from "../../include/js/customHooks";
import { api_issue } from "../../include/js/api";
import { header_config } from "../../include/js/main_config";
const Issue = (props) => {
  const keepLog = useKeepLogs();
  const authorize = Authorize();
  authorize.check_authorize();
  const current_menu = useSelector((state) => state.auth.currentMenu);
  const dispatch = useDispatch();
  const [rowClick, setRowClick] = useState(false);
  const { user_name } = useSelector((state) => state.auth.authData);
  const { issue_list, filter } = useSelector((state) => state.inventory.issue);
  const { pageSize, page, keyword } = filter || {};
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const listDataIssue = useFetch(`${api_issue}/all/${user_name}`);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
    const { current, pageSize } = pagination;
    dispatch(filterIssue({ page: current, pageSize }));
  };

  const getSearchData = (keyword) => {
    const search_data =
      listDataIssue?.data &&
      sortData(
        keyword
          ? listDataIssue?.data[0]?.filter(
              (issue) =>
                issue?.issue_no?.indexOf(keyword) >= 0 ||
                issue?.cost_center_no_name?.indexOf(keyword) >= 0 ||
                issue?.issue_created_by_no_name?.indexOf(keyword) >= 0 ||
                issue?.issue_created?.indexOf(keyword) >= 0 ||
                issue?.issue_description?.indexOf(keyword) >= 0
            )
          : listDataIssue?.data[0]
      );

    return sortData(search_data);
  };

  useEffect(() => {
    //dispatch(get_issue_list(user_name));
    return () => {
      //dispatch(reset_issue_data());
      dispatch(reset_comments());
      setData([]);
    };
  }, [dispatch]);
  useEffect(() => {
    console.log("Filter Keyword", keyword);
    setLoading(true);
    const respSearch = getSearchData(keyword);
    setData(respSearch);
    setLoading(false);
  }, [keyword, listDataIssue?.data]);

  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: ["Home", "Issue"],
    search: true,
    create: "/inventory/issue/create",
    buttonAction: current_menu.button_create !== 0 ? ["Create"] : [],
    disabledEditBtn: !rowClick,
    discard: "/inventory/issue",
    onCancel: () => {
      console.log("Cancel");
    },
    onSearch: (value) => {
      dispatch(filterIssue({ keyword: value }));
    },
    searchValue: keyword || null,
    searchBar: (
      <Button
        className='primary'
        onClick={() =>
          dispatch(
            filterIssue({
              page: 1,
              pageSize: 20,
              keyword: null,
              issue_id: null,
            })
          )
        }>
        Clear Filter
      </Button>
    ),
  };

  return (
    <div>
      <MainLayout {...config}>
        <Row>
          <Col span={24}>
            <Table
              columns={issue_columns}
              dataSource={data}
              loading={listDataIssue.loading ? true : false}
              onChange={onChange}
              rowKey={"issue_id"}
              size='small'
              pagination={{
                pageSize,
                current: page,
                pageSizeOptions: ["15", "20", "30", "50", "100", "1000"],
              }}
              onRow={(record, rowIndex) => {
                return {
                  onClick: (e) => {
                    setRowClick(true);
                    $(e.target)
                      .closest("tbody")
                      .find("tr")
                      .removeClass("selected-row");
                    $(e.target).closest("tr").addClass("selected-row");
                    keepLog.keep_log_action(record.issue_no);
                    dispatch(get_issue_by_id(record.issue_id, user_name));
                    props.history.push({
                      pathname: "/inventory/issue/view/" + record.issue_id,
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

export default withRouter(Issue);
