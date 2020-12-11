import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { Row, Col, Table } from "antd";
import MainLayout from "../../components/MainLayout";
import $ from "jquery";
import { get_report_stock } from "../../actions/inventory";
import { stock_on_hand_columns } from "./config/report";
import Authorize from "../system/Authorize";
import useKeepLogs from "../logs/useKeepLogs";
const StockMove = (props) => {
  const keepLog = useKeepLogs();
  const authorize = Authorize();
  authorize.check_authorize();
  const dispatch = useDispatch();
  const [rowClick, setRowClick] = useState(false);
  const [loading, setLoading] = useState(false);
  const onChange = (pagination, filters, sorter, extra) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1200);
    console.log("params", pagination, filters, sorter, extra);
  };
  const stock_on_hand = useSelector(
    (state) => state.inventory.report.stock_on_hand
  );
  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: ["Home", "Stock on hand"],
    search: true,
    create: "",
    buttonAction: [],
    edit: {
      data: {},
      path: "",
    },
    disabledEditBtn: !rowClick,
    discard: "/inventory",
    onCancel: () => {
      console.log("Cancel");
    },
  };
  useEffect(() => {
    dispatch(get_report_stock());
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);
  return (
    <div>
      <MainLayout {...config}>
        <Row>
          <Col span={24}>
            <Table
              loading={loading}
              columns={stock_on_hand_columns}
              dataSource={stock_on_hand}
              onChange={onChange}
              rowKey={"item_id"}
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

export default withRouter(StockMove);
