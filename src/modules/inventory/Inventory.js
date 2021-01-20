import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import MainLayout from "../../components/MainLayout";
import { AppContext } from "../../include/js/context";
import Authorize from "../system/Authorize";

const Inventory = (props) => {
  const authorize = Authorize();
  authorize.check_authorize();
  console.log(props.location.state);
  // const onChange = (pagination, filters, sorter, extra) => {
  //   console.log("params", pagination, filters, sorter, extra);
  // };
  const { appContext, setAppContext } = useContext(AppContext);
  console.log("appContext", appContext);
  useEffect(() => {
    setAppContext({ ...appContext, config: { page: "inventory.js" } });
  }, []);
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
    onCancel: () => {
      console.log("Cancel");
    },
  };

  return (
    <div>
      <MainLayout {...config}>
        <h1>Home</h1>
      </MainLayout>
    </div>
  );
};

export default withRouter(Inventory);
