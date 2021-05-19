/** @format */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import MainLayout from "../../../components/MainLayout";
import Authorize from "../../system/Authorize";

const Npr = (props) => {
  const dispatch = useDispatch();
  const authorize = Authorize();
  const history = useHistory();
  authorize.check_authorize();
  const auth = useSelector((state) => state.auth.authData);
  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: ["Home", "NPR"],
    search: true,
    create: "/sales/npr/create",
    buttonAction: ["Create"],
    discard: "/sales/npr",
    onCancel: () => {
      console.log("Cancel");
    },
  };
  return (
    <MainLayout {...config}>
      <div></div>
    </MainLayout>
  );
};

export default Npr;
