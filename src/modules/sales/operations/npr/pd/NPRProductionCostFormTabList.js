import { Tabs } from "antd";
import React from "react";
import NPRProductionCostFormCosting from "./NPRProductionCostFormCosting";

const NPRProductionCostFormTabList = () => {
  return (
    <>
      <Tabs defaultActiveKey={"0"}>
        <Tabs.TabPane tab={"Costing"} key={0}>
          <NPRProductionCostFormCosting />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};

export default NPRProductionCostFormTabList;
