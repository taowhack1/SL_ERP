import React, { Component } from "react";
import { Row, Col, Table } from "antd";
import MainLayout from "../../components/MainLayout";
import { columns, data } from "../../data";

class Purchasing extends Component {
  componentDidMount() {}
  componentDidUpdate() {}
  onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  config = {
    title: "PURCHASING",
    show: true,
    breadcrumb: ["Home"],
    search: true,
    create: "/purchasing/create",
    buttonAction: [],
    discard: "/purchasing",
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
              <h1>Home Purchasing</h1>
              {/* <Table
                columns={columns}
                dataSource={data}
                onChange={this.onChange}
                size="small"
              /> */}
            </Col>
          </Row>
        </MainLayout>
      </div>
    );
  }
}

export default Purchasing;
