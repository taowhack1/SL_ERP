/** @format */
import { Tabs, Button } from "antd";
import React from "react";
import EstimateFormTabHistory from "./EstimateFormTabHistory";
const EstimateFormTab = () => {
  return (
    <>
      <Tabs defaultActiveKey={"0"}>
        <Tabs.TabPane tab={"History"} key={0}>
          <EstimateFormTabHistory />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};

export default EstimateFormTab;
