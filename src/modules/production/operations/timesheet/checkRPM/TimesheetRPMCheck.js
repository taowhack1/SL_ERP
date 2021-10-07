import { message, Tabs } from "antd";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Scanner from "./Scanner";
import RpmPart from "./RpmPart";

const TimesheetRPMCheck = () => {
  return (
    <>
      <Scanner />
      <center>
        <Tabs className="w-90">
          <Tabs.TabPane tab={"Bulk Spec."} key={"1"}>
            <RpmPart />
          </Tabs.TabPane>
        </Tabs>
      </center>
    </>
  );
};

export default React.memo(TimesheetRPMCheck);
