import { Tabs } from "antd";
import React from "react";
import Scanner from "./Scanner";
import RpmPart from "./RpmPart";
const TimesheetRPMCheck = () => {
  return (
    <>
      <Scanner />
      <center>
        <Tabs className="w-90">
          <Tabs.TabPane tab={"Raw Material"} key={"1"}>
            <RpmPart />
          </Tabs.TabPane>
        </Tabs>
      </center>
    </>
  );
};

export default React.memo(TimesheetRPMCheck);
