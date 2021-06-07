import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { Row, Col, Table } from "antd";
import MainLayout from "../../components/MainLayout";
import { po_list_columns } from "./config/po";
import {
  get_po_list,
  reset_po_data,
  get_po_by_id,
  get_open_po_list,
} from "../../actions/purchase/PO_Actions";
import { reset_comments } from "../../actions/comment&log";
import $ from "jquery";
import { getMasterDataItem } from "../../actions/inventory";
import { get_vendor_payment_term_list } from "../../actions/accounting";

import useKeepLogs from "../logs/useKeepLogs";
import Authorize from "../system/Authorize";
const PurchaseOrders = (props) => {
  const authorize = Authorize();
  authorize.check_authorize();
  const keepLog = useKeepLogs();
  const auth = useSelector((state) => state.auth.authData);
  const current_menu = useSelector((state) => state.auth.currentMenu);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [rowClick, setRowClick] = useState(false);

  useEffect(() => {
    dispatch(get_po_list(auth.user_name));
    dispatch(get_open_po_list());
    dispatch(reset_po_data());
    return () => {
      dispatch(reset_comments());
      setData([]);
    };
  }, [dispatch]);

  const { po_list, pr_ref } = useSelector((state) => state.purchase.po);
  useEffect(() => {
    setData(po_list);
    return () => setData([]);
  }, [po_list]);
  const [data, setData] = useState(po_list);

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: ["Home", "Purchase Orders"],
    search: true,
    create: "/purchase/po/create",
    buttonAction: current_menu.button_create !== 0 ? ["Create"] : [],
    edit: {},
    disabledEditBtn: !rowClick,
    discard: "/purchase/po",
    badgeCount: pr_ref.length,
    onCancel: () => {
      console.log("Cancel");
    },
    onSearch: (value) => {
      console.log(value);
      setLoading(true);
      setTimeout(() => {
        const search_data = po_list.filter(
          (po) => po.po_no.indexOf(value) >= 0
        );
        setData(search_data);
        setLoading(false);
      }, 1200);
    },
  };
  return (
    <div>
      <MainLayout {...config}>
        <Row>
          <Col span={24}>
            <Table
              columns={po_list_columns}
              dataSource={data}
              rowKey={"po_id"}
              loading={loading}
              onChange={onChange}
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
                    dispatch(get_po_by_id(record.po_id, auth.user_name));
                    keepLog.keep_log_action(record.po_no);
                    props.history.push({
                      pathname: "/purchase/po/view/" + record.po_id,
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

export default withRouter(PurchaseOrders);
