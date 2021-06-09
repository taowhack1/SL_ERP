import { Tabs } from "antd";
import React, { useContext } from "react";
import { useSelector } from "react-redux";

import NPRComponentsTab from "./NPRComponentsTab";
import NPRCustomerProductGroupTab from "./NPRCustomerProductGroupTab";
import NPRFormulaTab from "./NPRFormulaTab";
import NPRGeneralDetailTab from "./NPRGeneralDetailTab";
import NPRPICTab from "./NPRPICTab";
import NPRSampleRequestTab from "./NPRSampleRequestTab";
import { NPRFormContext } from "./NPRViewById";
const NPRTabs = () => {
  const {
    state: { trans_id },
    department,
  } = useContext(NPRFormContext);
  const {
    authData: { department_id },
  } = useSelector((state) => state.auth);
  return (
    <>
      <Tabs defaultActiveKey={"3"}>
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
          <NPRComponentsTab />
        </Tabs.TabPane>
        {
          // 10 = MIS , 11 = RD , 13 = PU , 18 = SA , 20 = PD , 24 = WH , 90 = EXECUTIVE
          department === "rd" && trans_id !== 1 && (
            <>
              {[1, 10, 11, 90].includes(department_id) && (
                <Tabs.TabPane tab={"R&D PIC"} key={4}>
                  <NPRPICTab />
                </Tabs.TabPane>
              )}
              {trans_id > 2 && (
                <Tabs.TabPane tab={"R&D Formula"} key={5}>
                  <NPRFormulaTab />
                </Tabs.TabPane>
              )}
            </>
          )
        }
      </Tabs>
    </>
  );
};

export default React.memo(NPRTabs);
