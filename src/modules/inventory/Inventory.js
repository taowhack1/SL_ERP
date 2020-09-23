import React, { Component } from "react";
import MainLayout from "../../components/MainLayout";

class Inventory extends Component {
  componentDidMount() {}
  componentDidUpdate() {}
  onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  config = {
    title: "INVENTORY",
    home: "/inventory",
    show: true,
    breadcrumb: ["Home"],
    search: true,
    create: "",
    buttonAction: [""],
    discard: "/inventory",
    onCancel: () => {
      console.log("Cancel");
    },
  };
  render() {
    return (
      <div>
        <MainLayout {...this.config}>
          <h1>Home</h1>
          {/* <Row>
               <Col span={24}>
                 <Table columns={columns} dataSource={data} onChange={this.onChange} size='small'/>
               </Col>
           </Row> */}
        </MainLayout>
      </div>
    );
  }
}

export default Inventory;
