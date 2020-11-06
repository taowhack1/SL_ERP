import React, { useEffect } from "react";
import MainLayout from "../../components/MainLayout";
import { withRouter } from "react-router-dom";
import { get_all_vendor } from "../../actions/purchase/vendorActions";
import { getMasterDataItem } from "../../actions/inventory";
import { get_select_dep, get_select_cost_center } from "../../actions/hrm";
import { useDispatch, useSelector } from "react-redux";
import { reset_comments } from "../../actions/comment&log";
import { get_vendor_payment_term_list } from "../../actions/accounting";
import Authorize from "../system/Authorize";
const Purchase = (props) => {
  const authorize = Authorize();
  authorize.check_authorize();
  const dispatch = useDispatch();
  const current_project = useSelector((state) => state.auth.currentProject);
  const auth = useSelector((state) => state.auth.authData);
  useEffect(() => {
    dispatch(get_all_vendor());
    dispatch(getMasterDataItem());
    dispatch(get_vendor_payment_term_list());
    dispatch(reset_comments());
  }, [dispatch]);
  console.log("current_project", current_project);
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: ["Home"],
    search: true,
    create: "",
    buttonAction: [""],
    discard: current_project && current_project.project_url,
    onCancel: () => {
      console.log("Cancel");
    },
  };

  return (
    <div>
      <MainLayout {...config}>
        <h1>Home Purchase</h1>
      </MainLayout>
    </div>
  );
};

export default withRouter(Purchase);
