import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { Row, Col, Table } from "antd";
import MainLayout from "../../components/MainLayout";
import $ from "jquery";
import { get_report_stock } from "../../actions/inventory";
import { stock_on_hand_columns } from "./config/report";
import Authorize from "../system/Authorize";

const StockMove = (props) => {

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
  const [state, setState] = useState(stock_on_hand);
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
    onSearch: (searchText) => {
      console.log(searchText);
      searchText
        ? setState(
            stock_on_hand.filter(
              (item) => item.item_no_name.indexOf(searchText) >= 0
            )
          )
        : setState(stock_on_hand);
    },
  };
  useEffect(() => {
    dispatch(get_report_stock());
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);
  console.log(state);
  return (
    <div>
      <MainLayout {...config}>
        <Row>
          <Col span={24}>
            <Table
              loading={loading}
              columns={stock_on_hand_columns}
              dataSource={state}
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
