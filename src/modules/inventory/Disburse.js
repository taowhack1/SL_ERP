import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { Row, Col, Table } from "antd";
import MainLayout from "../../components/MainLayout";
import $ from "jquery";
import { getMasterDataItem } from "../../actions/inventory";
import { disburse_columns } from "./config";
import {
  get_disburse_by_id,
  get_disburse_list,
} from "../../actions/inventory/disburseActions";
import Authorize from "../system/Authorize";
import useKeepLogs from "../logs/useKeepLogs";

const Disburse = (props) => {
  const keepLog = useKeepLogs();
  const authorize = Authorize();
  authorize.check_authorize();
  const current_menu = useSelector((state) => state.auth.currentMenu);
  const dispatch = useDispatch();
  const [rowClick, setRowClick] = useState(false);
  const auth = useSelector((state) => state.auth.authData);
  const disburse_list = useSelector(
    (state) => state.inventory.disburse.disburse_list
  );
  const [state, setState] = useState(disburse_list);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  useEffect(() => {
    dispatch(get_disburse_list(auth.user_name));
    dispatch(getMasterDataItem());
  }, []);
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
    onCancel: () => {
      console.log("Cancel");
    },
    onSearch: (searchText) => {
      searchText
        ? setState(
            disburse_list.filter(
              (data) =>
                data.disburse_no_description.indexOf(searchText) >= 0 ||
                data.issue_no_description.indexOf(searchText) >= 0
            )
          )
        : setState(disburse_list);
    },
  };
  console.log(disburse_list);
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
