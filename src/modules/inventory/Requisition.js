import React, { Component } from "react";
import { Row, Col, Table } from "antd";
import MainLayout from "../../components/MainLayout";
import { columns, data } from "../../data/inventoryData";

class Inventory extends Component {
  componentDidMount() {}
  componentDidUpdate() {}
  onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  config = {
    title: "INVENTORY",
    show: true,
    breadcrumb: ["Home", "Requisition"],
    search: true,
    create: "/inventory/requisition/create",
    buttonAction: ["Create"],
    discard: "/inventory/requisition",
    onCancel: () => {
      console.log("Cancel");
    },
  };
  render() {
    return (
      <div>
        <MainLayout {...this.config}>
          <Row>
            <Col span={24}>
              <Table
                columns={columns}
                dataSource={data}
                onChange={this.onChange}
                size="small"
              />
            </Col>
          </Row>
        </MainLayout>
      </div>
    );
  }
}

export default Inventory;
