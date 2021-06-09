import React from "react";
import { Tabs } from "antd";

import NPRConponentsTab from "../NPRConponentsTab";
import NPRCustomerProductGroupTab from "../NPRCustomerProductGroupTab";
import NPRGeneralDetailTab from "../NPRGeneralDetailTab";
import NPRSampleRequestTab from "../NPRSampleRequestTab";
const NPRTabs = () => {
  return (
    <>
      <Tabs defaultActiveKey={"0"}>
        <Tabs.TabPane tab={"General Detail"} key={0}>
          <NPRGeneralDetailTab />
        </Tabs.TabPane>
        <Tabs.TabPane tab={"Customer & Product Group"} key={1}>
          <NPRCustomerProductGroupTab />
        </Tabs.TabPane>
        <Tabs.TabPane tab={"Details of Sample Request"} key={2}>
          <NPRSampleRequestTab />
        </Tabs.TabPane>
        <Tabs.TabPane tab={"Components"} key={3}>
          <NPRConponentsTab />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};

export default React.memo(NPRTabs);
