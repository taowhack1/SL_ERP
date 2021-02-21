import { Row, Col, Tabs } from "antd";
import React, { useContext } from "react";
import TabMRPDetail from "./TabMRPDetail";
import TabMRPRM from "./TabMRPRM";
import TabMRPPKDetail from "./TabMRPPKDetail";
import TabMRPRemark from "./TabMRPRemark";
import { MRPContext } from "../../../include/js/context";

const MRPTabPanel = () => {
  const { readOnly } = useContext(MRPContext);
  console.log("MRPTabPanel");
  return (
    <Row className="col-2">
      <Col span={24}>
        <Tabs defaultActiveKey={"2"} className="row-tab-margin-lg">
          {/* <Tabs.TabPane
            tab={
              <span className="tab_pane">
                {!readOnly && <span className="require">* </span>}
                {"Detail"}
              </span>
            }
            key={"1"}
          >
            <TabMRPDetail />
          </Tabs.TabPane> */}
          <Tabs.TabPane
            tab={
              <span className="tab_pane">
                {!readOnly && <span className="require">* </span>}
                {"Raw Material"}
              </span>
            }
            key={"2"}
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
            key={"3"}
          >
            <TabMRPPKDetail />
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
