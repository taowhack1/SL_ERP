import React, { useContext, useEffect } from "react";
import { withRouter } from "react-router-dom";
import MainLayout from "../../components/MainLayout";
import { AppContext } from "../../include/js/context";
import Authorize from "../system/Authorize";

const AccountingProject = (props) => {
  const authorize = Authorize();
  authorize.check_authorize();
  console.log(props.location.state);
  // const onChange = (pagination, filters, sorter, extra) => {
  //   console.log("params", pagination, filters, sorter, extra);
  // };
  const { mainContext, setMainContext } = useContext(AppContext);
  console.log("mainContext", mainContext);
  useEffect(() => {
    setMainContext({ ...mainContext, config: { page: "inventory.js" } });
  }, []);
  const config = {
    projectId: 12,
    title: "ACCOUNTING",
    home: "/accounting",
    show: true,
    breadcrumb: ["Home"],
    search: false,
    create: "",
    buttonAction: [""],
    discard: "/accounting",
  };

  return (
    <>
      <MainLayout {...config}>
        <h1>Home</h1>
      </MainLayout>
    </>
  );
};

export default withRouter(AccountingProject);
