import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { Row, Col, Table } from "antd";
import MainLayout from "../../components/MainLayout";
import { reqColumns } from "../../data/inventoryData";
import $ from "jquery";
import axios from "axios";
import { getMasterDataItem } from "../../actions/inventory";
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
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  useEffect(() => {
    dispatch(get_issue_list(auth.user_name));
    dispatch(getMasterDataItem());
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
  };
  return (
    <div>
      <MainLayout {...config}>
        <Row>
          <Col span={24}>
            <Table
              columns={issue_columns}
              dataSource={issue_list}
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
                    dispatch(get_issue_by_id(record.issue_id, auth.user_name));
                    props.history.push({
                      pathname: "/inventory/issue/view/" + record.issue_id,
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

export default withRouter(Issue);
