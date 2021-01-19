import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Input, Tabs, Typography, message, Radio } from "antd";
import { useHistory } from "react-router-dom";
import Authorize from "../../../system/Authorize";
import MainLayout from "../../../../components/MainLayout";
import CustomSelect from "../../../../components/CustomSelect";

const CategoryView = (props) => {
  const { TextArea } = Input;
  const { Title, Text } = Typography;
  const history = useHistory();
  const authorize = Authorize();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.authData);
  const current_project = useSelector((state) => state.auth.currentProject);
  const dataInRow = useSelector(
    (state) => state.inventory.configurations.categoryInRow
  );
  authorize.check_authorize();
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: [
      "Home",
      "Category",
      "View",
      dataInRow.category_no &&
        " [ " + dataInRow.category_no + " ] " + dataInRow.category_name,
    ],
    search: false,
    buttonAction: ["Edit", "Discard"],
    create: "",
    edit: {
      data: dataInRow,
      path: "/inventory/configurations/category/edit/" + dataInRow.category_no,
    },
    discard: "/inventory/configurations/category/",
  };
  return (
    <MainLayout {...config}>
      <div id="form">
        {/* Head */}
        <Row className="col-2">
          <Col span={8}>
            <h2>
              <strong>{dataInRow.category_no_name}</strong>
            </h2>
          </Col>
          <Col span={12}></Col>
          <Col span={2}>
            <Text strong>Create Date :</Text>
          </Col>
          <Col span={2} style={{ textAlign: "right" }}>
            <Text className="text-view">{dataInRow.cnvCategoryCreate}</Text>
          </Col>
        </Row>

        <Row className="col-2 row-tab-margin">
          <Col span={24} style={{ marginBottom: 8 }}>
            <Title level={5}>Name </Title>
            <Col span={24}>
              <Text className="text-view">{dataInRow.category_name}</Text>
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
                        <Text strong>Type</Text>
                      </Col>
                      <Col span={18}>
                        <Text className="text-view">{dataInRow.type_name}</Text>
                      </Col>
                      <Col span={1}></Col>
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
export default CategoryView;
