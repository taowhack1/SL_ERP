/** @format */

import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import MainLayout from "../../components/MainLayout";
import Authorize from "../system/Authorize";
import { PageContext } from "../../include/js/context";
import DashboardsIndex from "./Dashboards";

const Production = (props) => {
  //const authorize = Authorize();
  //authorize.check_authorize();
  // console.log("check_authorize :>> ", authorize.check_authorize());
  //console.log(props.location.state);
  // const onChange = (pagination, filters, sorter, extra) => {
  //   console.log("params", pagination, filters, sorter, extra);
  // };
  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project && current_project?.project_id,
    title: current_project && current_project?.project_name,
    home: current_project && current_project?.project_url,
    show: true,
    breadcrumb: ["Home"],
    search: false,
    create: "",
    buttonAction: [""],
    discard: current_project?.project_url,
    onCancel: () => {
      console.log("Cancel");
    },
  };

  return (
    <div>
      <MainLayout {...config}>
        {/* <h3>Home</h3> */}
        <DashboardsIndex />
      </MainLayout>
    </div>
  );
};

export default withRouter(Production);
