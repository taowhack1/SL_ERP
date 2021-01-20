import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Row, Col, Input, Tabs, Typography, Radio } from "antd";
import MainLayout from "../../../../components/MainLayout";
import Authorize from "../../../system/Authorize";
const { TextArea } = Input;
const { Title, Text } = Typography;

const TypeView = (props) => {
  const authorize = Authorize();
  authorize.check_authorize();
  const dataInRow = useSelector(
    (state) => state.inventory.configurations.typeInRow
  );
  const auth = useSelector((state) => state.auth.authData);
  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: [
      "Home",
      "Type",
      "View",
      dataInRow.type_no &&
        "[ " + dataInRow.type_no + " ] " + dataInRow.type_name,
    ],
    search: false,
    buttonAction: ["Edit", "Discard"],
    create: "",
    edit: {
      data: dataInRow,
      path: "/inventory/configurations/type/edit/" + dataInRow.type_id,
    },
    discard: "/inventory/configurations/type/",
  };
  return (
    <MainLayout {...config}>
      <div id="form">
        {/* Head */}
        <Row className="col-2">
          <Col span={8}>
            <h2>
              <strong>{dataInRow.type_no_name}</strong>
            </h2>
          </Col>
          <Col span={12}></Col>
          <Col span={2}>
            <Text strong>Create Date :</Text>
          </Col>
          <Col span={2} style={{ textAlign: "right" }}>
            <Text className="text-view">{dataInRow.type_created}</Text>
          </Col>
        </Row>
        <Row className="col-2 row-tab-margin">
          <Col span={24} style={{ marginBottom: 8 }}>
            <Title level={5}>Name </Title>
            <Col span={24}>
              <Text className="text-view">{dataInRow.type_name}</Text>
            </Col>
          </Col>
        </Row>

        <Row className="col-2 row-tab-margin-l">
          <Col span={24}>
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane tab={<span>Detail</span>} key="1">
                {/*Information */}
                <Row className="col-2 row-margin-vertical">
                  <Col span={12}>
                    <Row className="row-margin">
                      <Col span={5}>
                        <Text strong>Short Name</Text>
                      </Col>
                      <Col span={18}>
                        <Text className="text-view">{dataInRow.type_no}</Text>
                      </Col>
                      <Col span={1}></Col>
                    </Row>
                    <Row className="row-margin">
                      <Col span={5}>
                        <Text strong>Thai Name :</Text>
                      </Col>
                      <Col span={18}>
                        <Text className="text-view">
                          {dataInRow.type_name_th}
                        </Text>
                      </Col>
                      <Col span={1}></Col>
                    </Row>
                    <Row className="row-margin">
                      <Col span={5}>
                        <Text strong>Description :</Text>
                      </Col>
                      <Col span={18}>
                        <Text className="text-view">
                          {dataInRow.type_remark}
                        </Text>
                      </Col>
                      <Col span={1}></Col>
                    </Row>
                  </Col>
                  <Col span={12}>
                    <Row className="row-margin">
                      <Col span={1}></Col>
                      <Col span={5}>
                        <Text strong>Verify QC</Text>
                      </Col>
                      <Col span={18}>
                        <Radio.Group
                          name="type_verify_qc"
                          onChange={(e) => console.log(e.target.value)}
                          value={dataInRow.type_verify_qc ? 1 : 0}
                          disabled={true}
                        >
                          <Radio className="radio-vertical" value={1}>
                            Yes
                          </Radio>
                          <Radio className="radio-vertical" value={0}>
                            No
                          </Radio>
                        </Radio.Group>
                      </Col>
                    </Row>
                    <Row className="row-margin">
                      <Col span={1}></Col>
                      <Col span={5}>
                        <Text strong>Verify Stock</Text>
                      </Col>
                      <Col span={18}>
                        <Radio.Group
                          name="type_verify_stock"
                          value={dataInRow.type_verify_stock ? 1 : 0}
                          disabled={true}
                        >
                          <Radio className="radio-vertical" value={1}>
                            Yes
                          </Radio>
                          <Radio className="radio-vertical" value={0}>
                            No
                          </Radio>
                        </Radio.Group>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
};
export default TypeView;
