import { Context } from "../../include/js/context";
import React, { useContext } from "react";
import { useSelector } from "react-redux";

const useKeepLogs = () => {
  const [context, setContext] = useContext(Context);
  const auth = useSelector((state) => state.auth.authData);
  const currentProject = useSelector((state) => state.auth.currentProject);
  const currentMenu = useSelector((state) => state.auth.currentMenu);
  const keep_log_action = (action) => {
    console.log("set_context : ", action);
    currentProject &&
      currentMenu &&
      setContext({
        ...context,
        log_detail: {
          ...context.log_detail,
          db_all_log_project: currentProject.project_name,
          db_all_log_action: action,
          ip_address: auth.ip_address,
          user_name: auth.user_name,
          branch_id: auth.branch_id,
          db_all_log_menu: currentMenu.menu_name,
          database_id: currentMenu.database_id,
          menu_id: currentMenu.menu_id,
        },
      });
  };
  return { keep_log_action };
};

export default useKeepLogs;
