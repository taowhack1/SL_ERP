import { Tabs } from "antd";
import React from "react";
import NPRProductionCostFormTabCosting from "./NPRProductionCostFormTabCosting";

const NPRProductionCostFormTabList = () => {
  return (
    <>
      <Tabs defaultActiveKey={"0"}>
        <Tabs.TabPane tab={"Costing"} key={0}>
          <NPRProductionCostFormTabCosting />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};

export default React.memo(NPRProductionCostFormTabList);
