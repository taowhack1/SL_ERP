import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { Row, Col, Table } from "antd";
import MainLayout from "../../components/MainLayout";
import $ from "jquery";
import { issue_columns } from "./config";
import {
  get_issue_by_id,
  get_issue_list,
} from "../../actions/inventory/issueActions";
import Authorize from "../system/Authorize";
import useKeepLogs from "../logs/useKeepLogs";
const Issue = (props) => {
  const keepLog = useKeepLogs();
  const authorize = Authorize();
  authorize.check_authorize();
  const current_menu = useSelector((state) => state.auth.currentMenu);
  const dispatch = useDispatch();
  const [rowClick, setRowClick] = useState(false);
  const auth = useSelector((state) => state.auth.authData);
  const issue_list = useSelector((state) => state.inventory.issue.issue_list);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(issue_list);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const getSearchData = (keyword) => {};

  useEffect(() => {
    dispatch(get_issue_list(auth.user_name));
  }, []);
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
      // console.log(value);
      // setLoading(true);
      // setTimeout(() => {
      //   const search_data = issue_list.filter(
      //     (issue) => issue.issue_no_description.indexOf(value) >= 0
      //   );
      //   setData(search_data);
      //   setLoading(false);
      // }, 1200);
    },
  };
  useEffect(() => {
    setData(issue_list);
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
