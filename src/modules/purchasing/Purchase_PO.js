import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { Row, Col, Table } from "antd";
import MainLayout from "../../components/MainLayout";
import { po_list_columns } from "./fields_config/po";
import {
  get_po_list,
  reset_po_data,
  get_po_by_id,
} from "../../actions/purchase/PO_Actions";
import { reset_comments } from "../../actions/comment&log";
import $ from "jquery";
import { getMasterDataItem } from "../../actions/inventory";
import { get_vendor_payment_term_list } from "../../actions/accounting";
const PurchaseOrders = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_po_list());
    dispatch(reset_po_data());
    dispatch(get_vendor_payment_term_list());
    dispatch(getMasterDataItem());
    return () => {
      dispatch(reset_comments());
    };
  }, [dispatch]);
  const getData = (po_id, user_name) => {
    dispatch(get_po_by_id(po_id, user_name));
  };
  const auth = useSelector((state) => state.auth.authData[0]);
  const data = useSelector((state) => state.purchase.po.po_list);
  // const dataTable = data;
  // useEffect(() => {
  //   dispatch(get_po_list());
  // }, []);
  console.log("A");
  const [rowClick, setRowClick] = useState(false);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project.project_id,
    title: current_project.project_name,
    home: current_project.project_url,
    show: true,
    breadcrumb: ["Home", "Purchase Orders"],
    search: true,
    create: "/purchase/po/create",
    buttonAction: ["Create", "Edit"],
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
                    getData(record.po_id, auth.user_name);
                    props.history.push({
                      pathname: "/purchase/po/view/" + record.po_id,
                      state: record,
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
