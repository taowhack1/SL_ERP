import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { Row, Col, Table } from "antd";
import MainLayout from "../../components/MainLayout";
import $ from "jquery";
import {
  get_all_vendor,
  get_vendor_by_id,
} from "../../actions/purchase/vendorActions";
import { vendor_columns } from "./config/vendor";
import {
  get_currency_list,
  get_vendor_payment_term_list,
} from "../../actions/accounting";
import Authorize from "../system/Authorize";
import useKeepLogs from "../logs/useKeepLogs";
const Vendor = (props) => {
  const keepLog = useKeepLogs();
  const authorize = Authorize();
  authorize.check_authorize();
  const [selectedRow, setSelectedRow] = useState();
  const [rowClick, setRowClick] = useState(false);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const dispatch = useDispatch();
  const vendors = useSelector((state) => state.purchase.vendor.vendor_list);
  useEffect(() => {
    dispatch(get_all_vendor());
    dispatch(get_vendor_payment_term_list());
  }, []);
  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: ["Home", "Vendors"],
    search: true,
    create: "/purchase/vendor/create",
    buttonAction: ["Create"],
    discard: "/purchase/vendor",
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
              columns={vendor_columns}
              dataSource={vendors}
              onChange={onChange}
              rowKey={"vendor_id"}
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
                    dispatch(get_vendor_by_id(record.vendor_id));
                    props.history.push({
                      pathname: "/purchase/vendor/view/" + record.vendor_id,
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

export default withRouter(Vendor);
