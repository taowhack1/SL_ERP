import { Tabs } from "antd";
import React from "react";
import TempItemFormDetailTab from "./TempItemFormDetailTab";
import TempItemFormDetailTabN from "./TempItemFormDetailTabN";

const TempItemFormTabs = () => {
  return (
    <>
      <Tabs>
        <Tabs.TabPane tab="General Detail" key={1}>
          <TempItemFormDetailTabN />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};

export default React.memo(TempItemFormTabs);
