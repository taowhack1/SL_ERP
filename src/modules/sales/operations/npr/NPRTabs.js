import { Tabs } from "antd";
import React from "react";

import NPRConponentsTab from "./NPRConponentsTab";
import NPRCustomerProductGroupTab from "./NPRCustomerProductGroupTab";
import NPRGeneralDetailTab from "./NPRGeneralDetailTab";
import NPRSampleRequestTab from "./NPRSampleRequestTab";
const NPRTabs = ({ state }) => {
  return (
    <>
      <Tabs>
        <Tabs.TabPane tab={"General Detail"} key={0}>
          <NPRGeneralDetailTab state={state} />
        </Tabs.TabPane>
        <Tabs.TabPane tab={"Customer & Product Group"} key={1}>
          <NPRCustomerProductGroupTab state={state} />
        </Tabs.TabPane>
        <Tabs.TabPane tab={"Details of Sample Request"} key={2}>
          <NPRSampleRequestTab state={state} />
        </Tabs.TabPane>
        <Tabs.TabPane tab={"Components"} key={3}>
          <NPRConponentsTab state={state} />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};

export default NPRTabs;
