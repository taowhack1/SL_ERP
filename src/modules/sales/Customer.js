import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Table } from "antd";
import MainLayout from "../../components/MainLayout";
import { customerData } from "../../data/sale/data";
import { getAllCustomer } from "../../actions/saleMasterDataActions";
import { customer_columns } from "../../page_fields/sales/customer";
import $ from "jquery";
const Customer = (props) => {
  useEffect(() => {
    dispatch(getAllCustomer());
  }, []);
  const dispatch = useDispatch();
  const [selectedRow, setSelectedRow] = useState();
  const [rowClick, setRowClick] = useState(false);
  // const [dataTable, setDataTable] = useState([...customerData]);
  const customers = useSelector((state) => state.sales.master.customers);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const config = {
    projectId: 3,
    title: "SALES",
    show: true,
    breadcrumb: ["Home", "Customers"],
    search: true,
    create: "/sales/config/customers/create",
    buttonAction: ["Create", "Edit"],
    edit: {
      data: selectedRow,
      path: selectedRow && "/sales/config/customers/edit/" + selectedRow.id,
    },
    disabledEditBtn: !rowClick,
    discard: "/sales/config/customers",
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
              columns={customer_columns}
              dataSource={customers}
              onChange={onChange}
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
                    setSelectedRow(record);
                    props.history.push({
                      pathname:
                        "/sales/config/customers/edit/" + record.customer_id,
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

export default withRouter(Customer);
