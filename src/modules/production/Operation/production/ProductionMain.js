import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { PageContext } from "../../../../include/js/context";

const ProductionMain = (props) => {
  const { setPage, setConfig } = useContext(PageContext);
  const locationState = props?.location?.state;
  const current_project = useSelector((state) =>
    state.auth.projects?.find((project) =>
      project.project_name.toLowerCase().includes("production")
    )
  );
  const current_menu = useSelector((state) =>
    state.auth.menus.find(
      (menu) =>
        menu.project_id === current_project.project_id &&
        menu.menu_name.toLowerCase().includes("production")
    )
  );
  console.log("current_project", current_project);
  console.log("current_menu", current_menu);
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: ["Home", "Operation", "Production"],
    search: false,
    create: "/production/operations/production/create",
    buttonAction: current_menu.button_create !== 0 ? ["Create"] : [],
    edit: {},
    discard: "/production",
    onCancel: () => {
      console.log("Cancel");
    },
  };
  useEffect(() => {
    setConfig(config);
  }, []);
  console.log("locationState", locationState);
  return (
    <>
      <h4>{}</h4>
    </>
  );
};

export default React.memo(ProductionMain);
