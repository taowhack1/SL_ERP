import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";
import { Row, Col, Table } from "antd";
import MainLayout from "../../components/MainLayout";

import $ from "jquery";
import Authorize from "../system/Authorize";
import useKeepLogs from "../logs/useKeepLogs";

import { work_center_columns } from "./masterData/machine/master_data";
import {
  getAllWorkCenter,
  getWorkCenterByID,
} from "../../actions/production/workCenterActions";

const WorkCenter = (props) => {
  const history = useHistory();
  const keepLog = useKeepLogs();
  const authorize = Authorize();
  authorize.check_authorize();

  const dispatch = useDispatch();
  const [rowClick, setRowClick] = useState(false);
  const [loading, setLoading] = useState(false);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const dataWorkCenter = useSelector(
    (state) => state.production.workCenter.workCenterList
  );
  const [workCenter, setWorkCenter] = useState([]);
  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: ["Home", "Work Center"],
    search: false,
    create: "/production/work_center/create",
    // buttonAction: current_menu.button_create !== 0 ? ["Create"] : [],
    buttonAction: ["Create"],
    edit: {},
    disabledEditBtn: !rowClick,
    discard: "/production/work_center",
    onCancel: () => {
      console.log("Cancel");
    },
  };

  useEffect(() => {
    dispatch(getAllWorkCenter());
    // return () => dispatch(resetProductionData());
  }, []);

  useEffect(() => {
    setWorkCenter(dataWorkCenter);
  }, [dataWorkCenter.length]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      return () => {
        clearTimeout();
      };
    }, 1200);
  }, [workCenter]);

  const redirect_to_view = (id) => {
    history.push("/production/work_center/view/" + (id ? id : "new"));
  };

  return (
    <div>
      <MainLayout {...config}>
        <Row className="row-tab-margin-lg">
          <Col span={24}>
            <Table
              // title={() => <SearchTable onChangeSeach={onChangeSeach} />}
              loading={loading}
              columns={work_center_columns}
              dataSource={workCenter}
              onChange={onChange}
              bordered
              size="small"
              rowKey="work_center_id"
              onRow={(record, rowIndex) => {
                return {
                  onClick: (e) => {
                    setRowClick(true);
                    $(e.target)
                      .closest("tbody")
                      .find("tr")
                      .removeClass("selected-row");
                    $(e.target).closest("tr").addClass("selected-row");
                    keepLog.keep_log_action(record.work_center_no);
                    dispatch(
                      getWorkCenterByID(record.work_center_id, redirect_to_view)
                    );
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

export default withRouter(WorkCenter);
