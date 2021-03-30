import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";
import { Row, Col, Table } from "antd";
import MainLayout from "../../../../components/MainLayout";
import $ from "jquery";
import Authorize from "../../../system/Authorize";
import useKeepLogs from "../../../logs/useKeepLogs";

import { machine_columns } from "./config";
import {
  getAllMachine,
  getMachineByID,
} from "../../../../actions/production/machineActions";

const Machine = (props) => {
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

  const dataTooling = useSelector(
    (state) => state.production.machine.machineList
  );
  const [machine, setTooling] = useState([]);
  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: ["Home", "Machine"],
    search: false,
    create: "/production/machine/create",
    // buttonAction: current_menu.button_create !== 0 ? ["Create"] : [],
    buttonAction: ["Create"],
    edit: {},
    disabledEditBtn: !rowClick,
    discard: "/production/machine",
    onCancel: () => {
      console.log("Cancel");
    },
  };

  useEffect(() => {
    dispatch(getAllMachine());
    // return () => dispatch(resetProductionData());
  }, []);

  useEffect(() => {
    setTooling(dataTooling);
  }, [dataTooling.length]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      return () => {
        clearTimeout();
      };
    }, 1200);
  }, [machine]);

  const redirect_to_view = (id) => {
    history.push("/production/machine/view/" + (id ? id : "new"));
  };

  return (
    <div>
      <MainLayout {...config}>
        <Row className="row-tab-margin-lg">
          <Col span={24}>
            <Table
              // title={() => <SearchTable onChangeSeach={onChangeSeach} />}
              loading={loading}
              columns={machine_columns}
              dataSource={machine}
              onChange={onChange}
              bordered
              size="small"
              rowKey="machine_id"
              onRow={(record, rowIndex) => {
                return {
                  onClick: (e) => {
                    setRowClick(true);
                    $(e.target)
                      .closest("tbody")
                      .find("tr")
                      .removeClass("selected-row");
                    $(e.target).closest("tr").addClass("selected-row");
                    keepLog.keep_log_action(record.machine_cost_center);
                    dispatch(
                      getMachineByID(record.machine_id, redirect_to_view)
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

export default withRouter(Machine);
