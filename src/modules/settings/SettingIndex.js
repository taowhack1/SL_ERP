/** @format */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { reset_comments } from "../../actions/comment&log";
import MainLayout from "../../components/MainLayout";
import Authorize from "../system/Authorize";

const SettingsIndex = (props) => {
  const authorize = Authorize();
  authorize.check_authorize();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(reset_comments());
  }, [dispatch]);

  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: ["Home"],
    search: true,
    create: "",
    buttonAction: [""],
    discard: current_project.project_url,
    oncancel: () => {
      console.log("Cancel");
    },
  };
  return (
    <div>
      <MainLayout {...config}>
        <h1>Home Settings</h1>
      </MainLayout>
    </div>
  );
};

export default withRouter(SettingsIndex);
