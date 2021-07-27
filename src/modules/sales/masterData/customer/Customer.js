import React, { useState, useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Table } from "antd";
import MainLayout from "../../../../components/MainLayout";
import {
  get_customer_by_id,
  get_customer_list,
  searchCustomer,
} from "../../../../actions/sales/customerActions";
import $ from "jquery";
import { get_customer_payment_term_list } from "../../../../actions/accounting";
import { customer_columns } from "../../configs/customer";
import Authorize from "../../../system/Authorize";
import useKeepLogs from "../../../logs/useKeepLogs";
const Customer = (props) => {
  const history = useHistory();
  const keepLog = useKeepLogs();
  const authorize = Authorize();
  authorize.check_authorize();
  const dispatch = useDispatch();

  const {
    customer_list: customers,
    search: { keyword },
  } = useSelector((state) => state.sales.customer);

  const [state, setState] = useState(customers || []);

  useEffect(() => {
    dispatch(get_customer_list());
    dispatch(get_customer_payment_term_list());
  }, []);

  useEffect(() => {
    setState(
      keyword
        ? customers.filter(
            (obj) =>
              obj.customer_no_name?.toUpperCase()?.indexOf(keyword) >= 0 ||
              obj.customer_phone?.toUpperCase()?.indexOf(keyword) >= 0 ||
              obj.customer_mobile?.toUpperCase()?.indexOf(keyword) >= 0 ||
              obj.customer_email?.toUpperCase()?.indexOf(keyword) >= 0 ||
              obj.customer_tax_no?.toUpperCase()?.indexOf(keyword) >= 0
          )
        : customers
    );
  }, [keyword, customers]);

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const current_project = useSelector((state) => state.auth.currentProject);

  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: ["Home", "Customers"],
    search: true,
    create: "/sales/config/customers/create",
    buttonAction: ["Create"],
    discard: "/sales/config/customers",
    onCancel: () => {
      console.log("Cancel");
    },
    onSearch: (text) => {
      const searchText = text?.toUpperCase();
      dispatch(searchCustomer({ keyword: searchText }));
    },
  };

  const redirect_to_view = (id) => {
    history.push("/sales/config/customers/view/" + (id ? id : "new"));
  };

  return (
    <div>
      <MainLayout {...config}>
        <Row>
          <Col span={24}>
            <Table
              columns={customer_columns}
              dataSource={state}
              onChange={onChange}
              size="small"
              rowKey={"customer_id"}
              rowClassName="row-pointer"
              onRow={(record) => {
                return {
                  onClick: (e) => {
                    $(e.target)
                      .closest("tbody")
                      .find("tr")
                      .removeClass("selected-row");
                    $(e.target).closest("tr").addClass("selected-row");
                    keepLog.keep_log_action(record.customer_no);
                    dispatch(
                      get_customer_by_id(record.customer_id, redirect_to_view)
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

export default withRouter(Customer);
