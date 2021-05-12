import { Tabs } from "antd";
import React from "react";
import SatisficationFormDetail from "./SatisficationFormDetail";

const SatisficationTabs = () => {
  return (
    <>
      <Tabs>
        <Tabs.TabPane tab="Subject" key={1}>
          <SatisficationFormDetail />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};

export default React.memo(SatisficationTabs);
