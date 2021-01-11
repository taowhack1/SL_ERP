import { Row, Col, Tabs } from "antd";
import React from "react";
import QCItemTestTabSubject from "./QCItemTestTabSubject";
const WorkOrderTabPanel = ({ readOnly }) => {
  console.log("Panel Render");
  return (
    <Row className="col-2">
      <Col span={24}>
        <Tabs
          defaultActiveKey={"1"}
          //   onChange={callback}
          className="row-tab-margin-lg"
        >
          <Tabs.TabPane
            tab={<span className="tab_pane">{"Subject"}</span>}
            key={"1"}
          >
            {/* <TabWorkOrderDetail /> */}
            <QCItemTestTabSubject />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={<span className="tab_pane">{"Specification"}</span>}
            key={"2"}
          >
            {/* <QCItemTestTabSubject readOnly={readOnly} /> */}
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={<span className="tab_pane">{"Method"}</span>}
            key={"3"}
          >
            {/* <QCItemTestTabSubject readOnly={readOnly} /> */}
          </Tabs.TabPane>
        </Tabs>
      </Col>
    </Row>
  );
};

export default React.memo(WorkOrderTabPanel);
