import { Row, Col, Tabs } from "antd";
import React, { useContext } from "react";
import TabMRPDetail from "./TabMRPDetail";
import TabMRPRM from "./TabMRPRM";
import TabMRPPKDetail from "./TabMRPPKDetail";
import TabMRPRemark from "./TabMRPRemark";
import { MRPContext } from "../../../include/js/context";
import RoutingDetail from "../masterData/routing/RoutingDetail";
import MRPRouting from "./mrp/MRPRouting";

const MRPTabPanel = () => {
  const { readOnly } = useContext(MRPContext);
  return (
    <Row className="col-2">
      <Col span={24}>
        <Tabs defaultActiveKey={"1"} className="row-tab-margin-lg">
          <Tabs.TabPane
            tab={
              <span className="tab_pane">
                {!readOnly && <span className="require">* </span>}
                {"Raw Material"}
              </span>
            }
            key={"1"}
          >
            <TabMRPRM />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <span className="tab_pane">
                {!readOnly && <span className="require">* </span>}
                {"Packaging"}
              </span>
            }
            key={"2"}
          >
            <TabMRPPKDetail />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <span className="tab_pane">
                {!readOnly && <span className="require">* </span>}
                {"Routing"}
              </span>
            }
            key={"3"}
          >
            <MRPRouting />
          </Tabs.TabPane>

          <Tabs.TabPane
            tab={<span className="tab_pane">{"Notes"}</span>}
            key={"4"}
          >
            <TabMRPRemark />
          </Tabs.TabPane>
        </Tabs>
      </Col>
    </Row>
  );
};

export default React.memo(MRPTabPanel);
