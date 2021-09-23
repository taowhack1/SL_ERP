/** @format */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { Row, Col, Table } from "antd";
import MainLayout from "../../components/MainLayout";
import $ from "jquery";
import { getMasterDataItem } from "../../actions/inventory";
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
import { Button } from "antd/lib/radio";
import { reset_comments } from "../../actions/comment&log";
const Issue = (props) => {
  const keepLog = useKeepLogs();
  const authorize = Authorize();
  authorize.check_authorize();
  const current_menu = useSelector((state) => state.auth.currentMenu);
  const dispatch = useDispatch();
  const [rowClick, setRowClick] = useState(false);
  const auth = useSelector((state) => state.auth.authData);
  const { issue_list, filter } = useSelector((state) => state.inventory.issue);
  const { pageSize, page, keyword, vendor_id } = filter || {};
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
    const { current, pageSize } = pagination;
    dispatch(filterIssue({ page: current, pageSize }));
  };

  const getSearchData = (keyword) => {
    const search_data = sortData(
      keyword
        ? issue_list?.filter(
            (issue) =>
              issue?.issue_no?.indexOf(keyword) >= 0 ||
              issue?.cost_center_no_name?.indexOf(keyword) >= 0 ||
              issue?.issue_created_by_no_name?.indexOf(keyword) >= 0 ||
              issue?.issue_created?.indexOf(keyword) >= 0 ||
              issue?.issue_description?.indexOf(keyword) >= 0
          )
        : issue_list
    );

    return sortData(search_data);
  };

  useEffect(() => {
    dispatch(get_issue_list(auth.user_name));
    dispatch(reset_issue_data());
    return () => {
      dispatch(reset_comments());
      setData([]);
    };
  }, [dispatch]);
  useEffect(() => {
    console.log("Filter Keyword");
    setLoading(true);
    const respSearch = getSearchData(keyword);
    setData(respSearch);
    setLoading(false);
  }, [keyword]);

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
  useEffect(() => {
    console.log("useEffect set issue_list");
    const respSearch = getSearchData(keyword);
    setData(respSearch);
    setLoading(false);
    return () => setData([]);
  }, [issue_list]);
  return (
    <div>
      <MainLayout {...config}>
        <Row>
          <Col span={24}>
            <Table
              columns={issue_columns}
              dataSource={data}
              loading={loading}
              onChange={onChange}
              rowKey={"issue_id"}
              size='small'
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
                    dispatch(get_issue_by_id(record.issue_id, auth.user_name));
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
