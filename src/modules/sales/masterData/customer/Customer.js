import React, { useState, useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Table } from "antd";
import MainLayout from "../../../../components/MainLayout";
import {
  get_customer_by_id,
  get_customer_list,
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
  const [rowClick, setRowClick] = useState(false);
  // const [dataTable, setDataTable] = useState([...customerData]);
  const customers = useSelector((state) => state.sales.customer.customer_list);
  useEffect(() => {
    dispatch(get_customer_list());
    dispatch(get_customer_payment_term_list());
  }, []);
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
              dataSource={customers}
              onChange={onChange}
              size="small"
              rowKey={"customer_id"}
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
                    keepLog.keep_log_action(record.customer_no);
                    dispatch(
                      get_customer_by_id(record.customer_id, redirect_to_view)
                    );
                    // props.history.push({
                    //   pathname:
                    //     "/sales/config/customers/view/" + record.customer_id,
                    // });
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
