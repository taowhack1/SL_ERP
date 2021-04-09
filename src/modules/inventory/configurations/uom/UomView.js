/** @format */

import { Col, Row, Tabs, Typography } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "../../../../components/MainLayout";
import Authorize from "../../../system/Authorize";
function UOMView(props) {
  const { Title, Text } = Typography;
  const authorize = Authorize();
  const current_project = useSelector((state) => state.auth.currentProject);
  const auth = useSelector((state) => state.auth.authData);
  const [loading, setLoading] = useState(false);
  authorize.check_authorize();
  const dataInRow = useSelector(
    (state) => state.inventory.configurations.uomInRow
  );
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: [
      "Home",
      "UOM",
      "View",
      dataInRow.uom_no && " [ " + dataInRow.uom_no + " ] " + dataInRow.uom_name,
    ],
    search: false,
    buttonAction: ["Edit", "Discard"],
    create: "",
    edit: {
      data: dataInRow,
      path: "/inventory/configurations/uom/edit/" + dataInRow.uom_no,
    },
    discard: "/inventory/configurations/uom/",
  };
  return (
    <MainLayout {...config}>
      <div id='form'>
        {/* {Head} */}
        <Row className='col-2'>
          <Col span={8}>
            <h2>
              <strong>{dataInRow.uom_no_name}</strong>
            </h2>
          </Col>
          <Col span={12}></Col>
          <Col span={2}>
            <Text strong>Create Date :</Text>
          </Col>
          <Col span={2} style={{ textAlign: "right" }}>
            <Text className='text-view'>{dataInRow.uom_created}</Text>
          </Col>
        </Row>

        <Row className='col-2 row-tab-margin'>
          <Col span={24} style={{ marginBottom: 8 }}>
            <Title level={5}>Name :</Title>
            <Col span={24}>
              <Text className='text-view'>{dataInRow.uom_name}</Text>
            </Col>
          </Col>
        </Row>
        <Row className='col-2 row-tab-margin-l'>
          <Col span={24}>
            <Tabs defaultActiveKey='1'>
              <Tabs.TabPane tab={<span>Detail</span>} key='1'>
                {/*Information */}
                <Row className='col-2 row-margin-vertical'>
                  <Col span={12} className='col-border-right'>
                    <Row className='row-margin'>
                      <Col span={5}>
                        <Text strong> Short Name : </Text>
                      </Col>
                      <Col span={18}>
                        <Text className='text-view'>{dataInRow.uom_no}</Text>
                      </Col>
                      <Col span={1}></Col>
                    </Row>
                    <Row className='row-margin'>
                      <Col span={5}>
                        <Text strong> Unit Value : </Text>
                      </Col>
                      <Col span={18}>
                        <Text className='text-view'>{""}</Text>
                      </Col>
                      <Col span={1}></Col>
                    </Row>
                    <Row className='row-margin'>
                      <Col span={5}>
                        <Text strong>Thai Name :</Text>
                      </Col>
                      <Col span={18}>
                        <Text className='text-view'>
                          {dataInRow.uom_name_th}
                        </Text>
                      </Col>
                      <Col span={1}></Col>
                    </Row>
                    <Row className='row-margin'>
                      <Col span={5}>
                        <Text strong>Description :</Text>
                      </Col>
                      <Col span={18}>
                        <Text className='text-view'>
                          {dataInRow.uom_remark}
                        </Text>
                      </Col>
                      <Col span={1}></Col>
                    </Row>
                  </Col>
                  {/* { col right} */}
                  <Col span={12}>
                    <Row className='col-2 row-margin-vertical'>
                      <Col span={1}></Col>
                      <Col span={6}>
                        <Text strong> Reference Unit : </Text>
                      </Col>
                      <Col span={15}>
                        <Text className='text-view'>{""}</Text>
                      </Col>
                      <Col span={1}></Col>
                    </Row>
                    <Row className='col-2 row-margin-vertical'>
                      <Col span={1}></Col>
                      <Col span={6}>
                        <Text strong>Ratio : </Text>
                      </Col>
                      <Col span={15}>
                        <Text className='text-view'>{""}</Text>
                      </Col>
                      <Col span={1}></Col>
                    </Row>
                    <Row className='col-2 row-margin-vertical'>
                      <Col span={1}></Col>
                      <Col span={6}>
                        <Text strong>Type : </Text>
                      </Col>
                      <Col span={15}>
                        <Text className='text-view'>{""}</Text>
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
}

export default UOMView;
