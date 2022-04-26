/** @format */

import { Tabs } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import MainLayout from "../../../../components/MainLayout";
import Authorize from "../../../system/Authorize";
import ReportSoProduction from "./reportSoProduction";
import ReportSoOther from "./reportSoOther";
const SummarySoMain = () => {
  const authorize = Authorize();
  authorize.check_authorize();
  const auth = useSelector((state) => state.auth.authData);
  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: ["Home", "Report so"],
    search: false,
    buttonAction: [],
  };
  const [listSoData, setListSoData] = useState([]);

  return (
    <>
      <MainLayout {...config}>
        <Tabs
          defaultActiveKey={"1"}
          type={"card"}
          size={"default"}
          style={{ marginBottom: 10, marginTop: 10 }}>
          <Tabs.TabPane
            className='tab-top'
            tab={"Report SO Production"}
            key={"1"}>
            <ReportSoProduction />
          </Tabs.TabPane>
          <Tabs.TabPane className='tab-top' tab={"Report SO Other"} key={"2"}>
            <ReportSoOther />
          </Tabs.TabPane>
        </Tabs>
      </MainLayout>
    </>
  );
};

export default SummarySoMain;
