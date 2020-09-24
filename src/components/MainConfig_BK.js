import React from "react";
import { Dropdown, Button } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import {
  operationsMenu,
  masterDataMenu,
  menuConfig,
  menuLevel1,
  menuReport,
} from "../data";
// import { projects, menuLevel1 } from "../data/menu";

export default function MainConfig(props) {
  const projectId = props.projectId && props.projectId ? props.projectId : 0;
  let menuLevel2 = [operationsMenu, masterDataMenu, menuReport, menuConfig];
  return (
    <>
      <div>
        {menuLevel1.map((menu, key) => {
          return (
            <Dropdown
              overlay={menuLevel2[key]}
              trigger={["click"]}
              key={menu.menuId}
            >
              <Button type="text" className="ant-dropdown-link">
                {menu.menuName} <CaretDownOutlined />
              </Button>
            </Dropdown>
          );
        })}
      </div>
    </>
  );
}
