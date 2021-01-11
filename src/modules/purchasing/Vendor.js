import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";
import { Row, Col, Table } from "antd";
import MainLayout from "../../components/MainLayout";
import $ from "jquery";
import {
  get_all_vendor,
  get_vendor_by_id,
} from "../../actions/purchase/vendorActions";
import { vendor_columns } from "./config/vendor";
import { get_vendor_payment_term_list } from "../../actions/accounting";
import Authorize from "../system/Authorize";
import useKeepLogs from "../logs/useKeepLogs";
const Vendor = (props) => {
  const history = useHistory();
  const keepLog = useKeepLogs();
  const authorize = Authorize();
  authorize.check_authorize();

  const [, setRowClick] = useState(false);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const dispatch = useDispatch();
  let vendors = useSelector((state) => state.purchase.vendor.vendor_list);
  const [data, setData] = useState(vendors);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getMasterData = () => {
      dispatch(get_all_vendor());
      dispatch(get_vendor_payment_term_list());
    };
    getMasterData();
  }, []);
  useEffect(() => {
    const setStateData = () => {
      setData(vendors);
    };
    setStateData();
  }, [vendors.length]);
  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: ["Home", "Vendors"],
    search: true,
    onSearch: (value) => {
      console.log(value);
      setLoading(true);
      setTimeout(() => {
        const search_vendor = vendors.filter(
          (vendor) => vendor.vendor_no_name.indexOf(value) >= 0
        );
        setData(search_vendor);
        setLoading(false);
      }, 1200);
    },
    create: "/purchase/vendor/create",
    buttonAction: ["Create"],
    discard: "/purchase/vendor",
    onCancel: () => {
      console.log("Cancel");
    },
  };
  const redirect_to_view = (id) => {
    history.push("/purchase/vendor/view/" + (id ? id : "new"));
  };
  return (
    <div>
      <MainLayout {...config}>
        <Row>
          <Col span={24}>
            <Table
              columns={vendor_columns}
              dataSource={data}
              onChange={onChange}
              rowKey={"vendor_id"}
              loading={loading}
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
                    keepLog.keep_log_action(record.vendor_no);
                    dispatch(
                      get_vendor_by_id(record.vendor_id, redirect_to_view)
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

export default withRouter(Vendor);
