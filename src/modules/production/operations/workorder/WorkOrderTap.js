import { Row, Col, Tabs } from "antd";
import React from "react";

const WorkOrderTab = () => {
  return (
    <Row className="col-2">
      <Col span={24}>
        <Tabs defaultActiveKey={"1"} className="row-tab-margin-lg">
          <Tabs.TabPane
            tab={<span className="tab_pane">Detail</span>}
            key={"1"}
          >
            {/* <TabWorkOrderDetail /> */}
          </Tabs.TabPane>
          {/* <Tabs.TabPane
            tab={<span className='tab_pane'>{"Notes"}</span>}
            key={"4"}>
            <TabWorkOrderRemark />
          </Tabs.TabPane> */}
        </Tabs>
      </Col>
    </Row>
  );
};

export default React.memo(WorkOrderTab);
