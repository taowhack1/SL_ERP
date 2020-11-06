import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Row, Col, Input, Tabs, Select, Typography } from "antd";
import MainLayout from "../../components/MainLayout";

import Comments from "../../components/Comments";
import { dataComments } from "../../data";
import Authorize from "../system/Authorize";
const { Option } = Select;
const { TextArea } = Input;
const { Title, Text } = Typography;

const VendorView = (props) => {
  const authorize = Authorize();
  authorize.check_authorize();
  const data_head = useSelector((state) => state.purchase.vendor.vendor);
  const callback = (key) => {};

  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: [
      "Home",
      "Vendor",
      "View",
      data_head.vendor_no &&
        "[ " + data_head.vendor_no + " ] " + data_head.vendor_name,
    ],
    search: false,
    buttonAction: ["Edit", "Discard"],
    create: "",
    edit: {
      data: data_head,
      path: data_head && "/purchase/vendor/edit/" + data_head.vendor_id,
    },
    discard: "/purchase/vendor",
    onSave: (e) => {
      //e.preventDefault();
    },
    onEdit: (e) => {
      //e.preventDefault();
      console.log("Edit");
    },
    onApprove: (e) => {
      //e.preventDefault();
      console.log("Approve");
    },
    onConfirm: () => {
      console.log("Confirm");
    },
  };

  return (
    <MainLayout {...config}>
      <div id="form">
        {/* Head */}
        <Row className="col-2">
          <Col span={8}>
            <h2>
              <strong>
                Vendor {data_head.vendor_no && "#" + data_head.vendor_no}
              </strong>
            </h2>
          </Col>
          <Col span={12}></Col>
          <Col span={2}>
            <Text strong>Create Date :</Text>
          </Col>
          <Col span={2} style={{ textAlign: "right" }}>
            <Text className="text-view">{data_head.cnv_vendor_created}</Text>
          </Col>
        </Row>
        <Row className="col-2">
          <Col span={24} style={{ marginBottom: 8 }}>
            <Title level={5}>Name </Title>
            <Text className="text-view">{data_head.vendor_name}</Text>
          </Col>
        </Row>

        {/* Product & Notes */}
        <Row className="col-2 row-tab-margin">
          <Col span={24}>
            <Tabs defaultActiveKey="1" onChange={callback}>
              <Tabs.TabPane tab="Contact" key="1">
                {/* Address & Information */}

                <Row className="col-2 row-margin-vertical">
                  <Col span={12}>
                    <Row className="row-margin">
                      <Col span={5}>
                        <Text strong>Short Name</Text>
                      </Col>
                      <Col span={18}>
                        <Text className="text-view">
                          {data_head.vendor_name_short}
                        </Text>
                      </Col>
                      <Col span={1}></Col>
                    </Row>
                    <Row className="row-margin">
                      <Col span={5}>
                        <Text strong>Phone</Text>
                      </Col>
                      <Col span={18}>
                        <Text className="text-view">
                          {data_head.vendor_phone}
                        </Text>
                      </Col>
                      <Col span={1}></Col>
                    </Row>
                    <Row className="row-margin">
                      <Col span={5}>
                        <Text strong>Mobile</Text>
                      </Col>
                      <Col span={18}>
                        <Text className="text-view">
                          {data_head.vendor_mobile}
                        </Text>
                      </Col>
                      <Col span={1}></Col>
                    </Row>
                    <Row className="row-margin">
                      <Col span={5}>
                        <Text strong>Email</Text>
                      </Col>
                      <Col span={18}>
                        <Text className="text-view">
                          {data_head.vendor_email}
                        </Text>
                      </Col>
                      <Col span={1}></Col>
                    </Row>
                    <Row className="row-margin">
                      <Col span={5}>
                        <Text strong>Currency</Text>
                      </Col>
                      <Col span={18}>
                        <Text className="text-view">
                          {data_head.currency_no}
                        </Text>
                      </Col>
                      <Col span={1}></Col>
                    </Row>
                  </Col>
                  <Col span={12}>
                    <Row className="row-margin">
                      <Col span={1}></Col>
                      <Col span={5}>
                        <Text strong>Address</Text>
                      </Col>
                      <Col span={18}>
                        <Text className="text-view">
                          {data_head.vendor_address}
                        </Text>
                      </Col>
                    </Row>
                    <Row className="row-margin">
                      <Col span={1}></Col>
                      <Col span={5}>
                        <Text strong>Tax ID</Text>
                      </Col>
                      <Col span={18}>
                        <Text className="text-view">
                          {data_head.vendor_tax_no}
                        </Text>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Purchase" key="2">
                <Row className="col-2 row-margin-vertical">
                  <Col span={12}>
                    <Row className="row-margin">
                      <Col span={5}>
                        <Text strong>Payment Terms</Text>
                      </Col>
                      <Col span={18}>
                        <Text className="text-view">
                          {data_head.payment_term_no_name}
                        </Text>
                      </Col>
                      <Col span={1}></Col>
                    </Row>
                  </Col>
                  <Col span={12}>
                    <Row className="row-margin">
                      <Col span={1}></Col>
                      <Col span={5}></Col>
                      <Col span={18}></Col>
                    </Row>
                    <Row className="row-margin">
                      <Col span={1}></Col>
                      <Col span={5}></Col>
                      <Col span={18}></Col>
                    </Row>
                  </Col>
                </Row>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Notes" key="3">
                <Text className="text-view">{data_head.vendor_remark}</Text>
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
      {/* <Comments data={dataComments} /> */}
    </MainLayout>
  );
};

export default VendorView;
