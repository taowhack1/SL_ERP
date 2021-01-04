import { Row, Col, Tabs } from "antd";
import React, { useContext } from "react";
import TabWorkOrderDetail from "./TabWorkOrderDetail";
import TabWorkOrderRM from "./TabWorkOrderRM";
import TabWorkOrderPKDetail from "./TabWorkOrderPKDetail";
import TabWorkOrderRemark from "./TabWorkOrderRemark";
import { WOContext } from "../../../include/js/context";

const WorkOrderTabPanel = () => {
  const { readOnly } = useContext(WOContext);
  console.log("WorkOrderTabPanel");
  return (
    <Row className="col-2">
      <Col span={24}>
        <Tabs defaultActiveKey={"1"} className="row-tab-margin-lg">
          <Tabs.TabPane
            tab={
              <span className="tab_pane">
                {!readOnly && <span className="require">* </span>}
                {"Detail"}
              </span>
            }
            key={"1"}
          >
            <TabWorkOrderDetail />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <span className="tab_pane">
                {!readOnly && <span className="require">* </span>}
                {"Raw Material"}
              </span>
            }
            key={"2"}
          >
            <TabWorkOrderRM />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <span className="tab_pane">
                {!readOnly && <span className="require">* </span>}
                {"Packaging"}
              </span>
            }
            key={"3"}
          >
            <TabWorkOrderPKDetail />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={<span className="tab_pane">{"Notes"}</span>}
            key={"4"}
          >
            <TabWorkOrderRemark />
          </Tabs.TabPane>
        </Tabs>
      </Col>
    </Row>
  );
};

export default React.memo(WorkOrderTabPanel);
