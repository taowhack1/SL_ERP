import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { Row, Col, Table } from "antd";
import MainLayout from "../../components/MainLayout";
import { reqColumns } from "../../data/inventoryData";
import $ from "jquery";
import axios from "axios";
import { getMasterDataItem } from "../../actions/inventory";
import { disburse_columns } from "./config";
import {
  get_issue_by_id,
  get_issue_list,
} from "../../actions/inventory/issueActions";
import {
  get_disburse_by_id,
  get_disburse_list,
} from "../../actions/inventory/disburseActions";

const Disburse = (props) => {
  const dispatch = useDispatch();
  const [rowClick, setRowClick] = useState(false);
  const auth = useSelector((state) => state.auth.authData[0]);
  const disburse_list = useSelector(
    (state) => state.inventory.disburse.disburse_list
  );
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  useEffect(() => {
    dispatch(get_disburse_list());
    dispatch(getMasterDataItem());
  }, []);
  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project.project_id,
    title: current_project.project_name,
    home: current_project.project_url,
    show: true,
    breadcrumb: ["Home", "Disburse"],
    search: true,
    create: "/inventory/disburse/create",
    buttonAction: ["Create"],
    disabledEditBtn: !rowClick,
    discard: "/inventory/disburse",
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
              columns={disburse_columns}
              dataSource={disburse_list}
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
