import { Tabs } from "antd";
import React from "react";
import GeneralDetail from "./tabs/GeneralDetail";
import CustomerAndProductGroup from "./tabs/CustomerAndProductGroup";
import DetailOfSampleRequest from "./tabs/DetailOfSampleRequest";
import PackagingComponents from "./tabs/PackagingComponents";
import FormulaList from "./tabs/formula/FormulaList";
const TabList = () => {
  return (
    <>
      <Tabs>
        <Tabs.TabPane tab="General Detail" key="1">
          <GeneralDetail />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Customer & Product Group" key="2">
          <CustomerAndProductGroup />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Detail of Sample Request" key="3">
          <DetailOfSampleRequest />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Packaging Components" key="4">
          <PackagingComponents />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Formula" key="5">
          <FormulaList />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};

export default React.memo(TabList);
