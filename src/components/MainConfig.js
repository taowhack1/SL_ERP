import React from "react";
import { Dropdown, Button, Menu } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { set_working_menu } from "../actions/authActions";
import useKeepLogs from "../modules/logs/useKeepLogs";

export default function MainConfig(props) {
  console.log("Project ID : ", props?.projectId);
  const keepLog = useKeepLogs();
  const dispatch = useDispatch();
  const projectId = props.projectId && props.projectId ? props.projectId : 0;
  const menusLocal = useSelector((state) => state.auth.menus);
  let projectMenus = menusLocal
    ? menusLocal.filter(
        (menu) => menu.project_id === projectId && menu.menu_parent === 0
      )
    : [];

  const set_log_detail = (data) => {
    keepLog.keep_log_action(data);
  };

  const getSubMenu = (menu) => {
    const menulevel2 = menusLocal.filter(
      (menu2) =>
        menu2.menu_parent !== 0 &&
        menu2.menu_parent === menu.menu_level &&
        menu2.project_id === menu.project_id
    );

    let sub = (
      <Menu>
        {menulevel2.map((sub, key) => {
          return (
            <Menu.Item key={key}>
              <Link
                to={{
                  pathname: sub.menu_url,
                }}
                onClick={() => {
                  dispatch(set_working_menu(sub));
                  set_log_detail(`Click Menu ${sub.menu_name}`);
                }}
              >
                {sub.menu_name + "   " + sub.menu_name_th}
              </Link>
            </Menu.Item>
          );
        })}
      </Menu>
    );
    return sub;
  };

  return (
    <>
      <div>
        {projectMenus.map((menu, key) => {
          return (
            <Dropdown
              key={key}
              overlay={getSubMenu(menu)}
              trigger={["click"]}
              key={menu.menu_id}
            >
              <Button type="text" className="ant-dropdown-link">
                {menu.menu_name} <CaretDownOutlined />
              </Button>
            </Dropdown>
          );
        })}
      </div>
    </>
  );
}
