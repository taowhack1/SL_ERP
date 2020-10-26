import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Row, Col, Table } from "antd";
import MainLayout from "../../components/MainLayout";
import { saleOrderColumns, saleOrderData } from "../../data/sale/data";
import $ from "jquery";
import { useDispatch, useSelector } from "react-redux";
import {
  get_sale_master_data,
  get_so_by_id,
  get_so_list,
  reset_so,
} from "../../actions/sales";
import { so_columns } from "./configs";
import { reset_comments } from "../../actions/comment&log";
import { getMasterDataItem } from "../../actions/inventory";
const SaleOrder = (props) => {
  const dispatch = useDispatch();
  const [rowClick, setRowClick] = useState(false);
  useEffect(() => {
    dispatch(get_sale_master_data());
    dispatch(reset_so());
    dispatch(reset_comments());
    dispatch(get_so_list());
    dispatch(getMasterDataItem());
  }, []);
  const getData = (so_id, user_name) => {
    dispatch(get_so_by_id(so_id, user_name));
  };
  const data = useSelector((state) => state.sales.so.so_list);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const auth = useSelector((state) => state.auth.authData[0]);
  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project.project_id,
    title: current_project.project_name,
    home: current_project.project_url,
    show: true,
    breadcrumb: ["Home", "Sale Orders"],
    search: true,
    create: "/sales/orders/create",
    buttonAction: ["Create"],
    disabledEditBtn: !rowClick,
    discard: "/sales/orders",
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
              columns={so_columns}
              dataSource={data}
              onChange={onChange}
              rowKey={"so_id"}
              size="small"
              rowClassName="row-pointer"
              onRow={(record, rowIndex) => {
                return {
                  onClick: (e) => {
                    setRowClick(true);
                    $(e.target)
                      .closest("tbody")
                      .find("tr")
                      .removeClass("selected-row");
                    $(e.target).closest("tr").addClass("selected-row");

                    getData(record.so_id, auth.user_name);
                    props.history.push({
                      pathname: "/sales/orders/view/" + record.so_id,
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

export default withRouter(SaleOrder);
