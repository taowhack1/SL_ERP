import React from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import MainLayout from "../../../../components/MainLayout";

const Transfer = () => {
  const current_project = useSelector((state) => state.auth.currentProject);

  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: ["Home", "Transfer"],
    search: true,
    // onSearch: (value) => {
    //   console.log(value);
    //   setLoading(true);
    //   setTimeout(() => {
    //     const search_category = category.filter(
    //       (category) => category.category_name.indexOf(value) >= 0
    //     );
    //     setData(search_category);
    //     setLoading(false);
    //   }, 1200);
    // },
    create: "/inventory/transfer/create",
    buttonAction: ["Create"],
    discard: "/transfer/create",
    onCancel: () => {
      console.log("Cancel");
    },
  };
  return (
    <div>
      <MainLayout {...config}></MainLayout>
    </div>
  );
};

export default withRouter(Transfer);
