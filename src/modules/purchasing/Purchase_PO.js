import React, { useState, useEffect, useContext } from "react";
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
import { Context } from "../../include/js/context";
import useKeepLogs from "../logs/useKeepLogs";
import Authorize from "../system/Authorize";
const PurchaseOrders = (props) => {
  const authorize = Authorize();
  authorize.check_authorize();
  const keepLog = useKeepLogs();
  const auth = useSelector((state) => state.auth.authData);
  const current_menu = useSelector((state) => state.auth.currentMenu);
  // const create_btn = useSelector(state=>state.auth.)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_po_list(auth.user_name));
    dispatch(get_open_po_list());
    dispatch(reset_po_data());
    dispatch(get_vendor_payment_term_list());
    dispatch(getMasterDataItem());
    return () => {
      dispatch(reset_comments());
    };
  }, [dispatch]);

  const data = useSelector((state) => state.purchase.po.po_list);
  const [rowClick, setRowClick] = useState(false);
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
              columns={po_list_columns}
              dataSource={data}
              rowKey="po_id"
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
