import { Tabs } from "antd";
import React from "react";

const MRPDetail = () => {
  return (
    <div className="mt-2">
      <Tabs>
        <Tabs.TabPane tab="Raw Material" key="1">
          <h1>Raw Material</h1>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Packaging" key="2">
          <h1>Packaging</h1>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Set Components" key="3">
          <h1>Set Components</h1>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Routing" key="4">
          <h1>Routing</h1>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Notes" key="5">
          <h1>Notes</h1>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default React.memo(MRPDetail);
