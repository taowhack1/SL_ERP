import { Tabs } from "antd";
import React from "react";
import TempItemFormDetailTab from "./TempItemFormDetailTab";

const TempItemFormTabs = () => {
  return (
    <>
      <Tabs>
        <Tabs.TabPane tab="General Detail" key={1}>
          <TempItemFormDetailTab />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};

export default React.memo(TempItemFormTabs);
