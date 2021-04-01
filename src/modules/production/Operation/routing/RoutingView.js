/** @format */

import { Col, Input, Row, Tabs, Typography } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import MainLayout from "../../../../components/MainLayout";
import RoutingTabDetail from "./RoutingTabDetail";
import RoutingViewDetail from "./RoutingViewDetail";

const RoutingView = () => {
  const readOnly = true;
  const { Title, Text } = Typography;
  const { routing } = useSelector((state) => state.production.routing);
  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: ["Home", "Routing", "view"],
    search: false,
    create: "",
    // buttonAction: current_menu.button_create !== 0 ? ["Create"] : [],
    buttonAction: ["Edit", "Discard"],
    edit: {
      data: routing,
      path: routing && "/production/routing/edit/" + routing.routing_id,
    },
    //disabledEditBtn: !rowClick,
    discard: "/production/routing",
  };
  console.log("routing", routing);
  return (
    <MainLayout {...config}>
      <div id="form">
        <Row className="col-2">
          <Col span={8}>
            <h2>
              <strong>
                View Routing
                {routing.routing_no && "#" + routing.routing_no}
              </strong>
            </h2>
          </Col>
          <Col span={12}></Col>
          <Col span={2}>
            <Text strong>Create Date :</Text>
          </Col>
          <Col span={2} className="text-right">
            <Text className="text-view">{routing.routing_created ?? "-"}</Text>
          </Col>
        </Row>
        <Row className="col-2 row-tab-margin">
          <Col span={24} style={{ marginBottom: 8 }}>
            <Title level={5}>Description :</Title>
            <Col span={12}>
              <Text className="pd-left-2">{routing.routing_remark}</Text>
            </Col>
          </Col>
        </Row>
        <Row className="col-2 mt-2" gutter={[32, 0]}>
          {/* left */}
          <Col span={12} className="col-border-right">
            <Row className="col-2 row-margin-vertical">
              <Col span={8}>
                <Text strong>FG Item :</Text>
              </Col>
              <Col span={15}>
                <Text>{routing.item_no_name ?? "-"}</Text>
              </Col>
            </Row>
            <Row className="col-2 row-margin-vertical">
              <Col span={8}>
                <Text strong>Bulk Item :</Text>
              </Col>
              <Col span={15}>
                <Text>{routing.item_no_name_ref ?? "-"}</Text>
              </Col>
            </Row>
            <Row className="col-2 row-margin-vertical">
              <Col span={8}>
                <Text strong>Working time (Min) :</Text>
              </Col>
              <Col span={8}>
                <Text className="text-value">
                  {routing.routing_working_time_min ?? "-"}
                </Text>
              </Col>
            </Row>
            <Row className="col-2 row-margin-vertical">
              <Col span={8}>
                <Text strong>Working time (Hour) :</Text>
              </Col>
              <Col span={8}>
                <Text className="text-value">
                  {routing.routing_working_time_hour ?? "-"}
                </Text>
              </Col>
            </Row>
            <Row className="col-2 row-margin-vertical">
              <Col span={8}>
                <Text strong>Working time (Day) :</Text>
              </Col>
              <Col span={8}>
                <Text className="text-value">
                  {routing.routing_working_time_day ?? "-"}
                </Text>
              </Col>
            </Row>
          </Col>
          {/* right */}
          <Col span={12}>
            <Row className="col-2 row-margin-vertical">
              <Col span={8}>
                <Text strong>Batch size (kg) :</Text>
              </Col>
              <Col span={8}>
                <Text className="text-value">
                  {routing.routing_batch_size ?? "-"}
                </Text>
              </Col>
            </Row>
            <Row className="col-2 row-margin-vertical">
              <Col span={8}>
                <Text strong>Fill wt (kg/pcs) :</Text>
              </Col>
              <Col span={8}>
                <Text className="text-value">
                  {routing.routing_fill_weight ?? "-"}
                </Text>
              </Col>
            </Row>
            <Row className="col-2 row-margin-vertical">
              <Col span={8}>
                <Text strong>Pack Size :</Text>
              </Col>
              <Col span={8}>
                <Text className="text-value">
                  {routing.routing_pack_size ?? "-"}
                </Text>
              </Col>
            </Row>
            <Row className="col-2 row-margin-vertical">
              <Col span={8}>
                <Text strong></Text>
              </Col>
              <Col span={8}>
                <Text className="text-value"></Text>
              </Col>
            </Row>
            <Row className="col-2 row-margin-vertical">
              <Col span={8}>
                <Text strong>Capacity (pcs/min) :</Text>
              </Col>
              <Col span={8}>
                <Text className="text-value">
                  {routing.routing_capacity_min ?? "-"}
                </Text>
              </Col>
            </Row>
            <Row className="col-2 row-margin-vertical">
              <Col span={8}>
                <Text strong>Man / hr :</Text>
              </Col>
              <Col span={8}>
                <Text className="text-value">
                  {routing.routing_worker_hour ?? "-"}
                </Text>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="col-2 row-tab-margin-l">
          <Col span={24}>
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane tab={<span>Bulk</span>} key="1">
                <RoutingTabDetail
                  dataDetail={routing.routing_detail.bulk}
                  routing_type_id={1}
                  readOnly={readOnly}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab={<span>FG</span>} key="2">
                <RoutingTabDetail
                  dataDetail={routing.routing_detail.fg}
                  routing_type_id={2}
                  readOnly={readOnly}
                />
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
};

export default RoutingView;
