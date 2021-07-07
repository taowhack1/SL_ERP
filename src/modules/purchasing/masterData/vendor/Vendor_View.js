/** @format */

import React from "react";
import { useSelector } from "react-redux";
import { Row, Col, Tabs, Typography } from "antd";
import MainLayout from "../../../../components/MainLayout";

import Authorize from "../../../system/Authorize";
import { convertDigit } from "../../../../include/js/main_config";

import VendorTabs from "./VendorTabs";
const { Title, Text } = Typography;

const VendorView = (props) => {
  const authorize = Authorize();
  authorize.check_authorize();
  const { data_head, dataDetail } = useSelector(
    (state) => state.purchase.vendor.vendor
  );
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
      data: {
        data_head: data_head,
        dataDetail: dataDetail,
      },
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

  const TabsConfig = {
    data_head,
    dataDetail,
    readOnly: true,
  };
  console.log("detta_head", data_head);

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
            <Text className="text-view">{data_head.vendor_created}</Text>
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
            <VendorTabs {...TabsConfig} />
          </Col>
        </Row>
      </div>
      {/* <Comments data={dataComments} /> */}
    </MainLayout>
  );
};

export default VendorView;
