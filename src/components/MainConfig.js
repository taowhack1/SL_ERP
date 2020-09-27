import React from "react";
import { Dropdown, Button, Menu } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import {
  operationsMenu,
  masterDataMenu,
  menuConfig,
  menuLevel1,
  menuReport,
} from "../data";
import { Link } from "react-router-dom";
import { projects, menus } from "../data/menu";

export default function MainConfig(props) {
  const projectId = props.projectId && props.projectId ? props.projectId : 0;
  const projectMenu = menus.filter((menu) => menu.projectId === projectId);
  const getSubMenu = (menu) => {
    let sub = (
      <Menu>
        {menu.subMenu.map((sub, key) => {
          return (
            <Menu.Item key={key}>
              <Link to={sub.link}>{sub.name}</Link>
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
        {projectMenu.map((menu, key) => {
          return (
            <Dropdown
              overlay={getSubMenu(menu)}
              trigger={["click"]}
              key={menu.id}
            >
              <Button type="text" className="ant-dropdown-link">
                {menu.name}{" "}
                {menu.subMenu && menu.subMenu.length > 0 ? (
                  <CaretDownOutlined />
                ) : null}
              </Button>
            </Dropdown>
          );
        })}
      </div>
    </>
  );
}
