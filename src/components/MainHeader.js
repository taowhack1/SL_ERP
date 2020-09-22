import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Drawer, Row, Col, Avatar, Dropdown, Button } from "antd";
import {
  UserOutlined,
  MenuOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import { menuProfile } from "../data";
import MainConfig from "./MainConfig";

function MainHead(props) {
  const [visible, setVisible] = useState(false);
  const onCloseDrawer = () => {
    setVisible(false);
  };
  const onOpenDrawer = () => {
    setVisible(true);
  };
  //   console.log(props.link);
  return (
    <>
      <Row>
        <Col span={12}>
          <Row>
            <Col span={6}>
              <MenuOutlined onClick={onOpenDrawer} />{" "}
              <Link style={{ color: "white" }}>{props.title}</Link>
            </Col>
            <Col span={18}>
              <MainConfig />
            </Col>
          </Row>
        </Col>
        <Col span={12} id="column-right">
          <Avatar icon={<UserOutlined />} />
          <Dropdown overlay={menuProfile} trigger={["click"]}>
            <Button type="text" className="ant-dropdown-link">
              Administrator <CaretDownOutlined />
            </Button>
          </Dropdown>
        </Col>
      </Row>

      <Drawer
        title="PROJECTS"
        placement="left"
        closable={false}
        onClose={onCloseDrawer}
        visible={visible}
      >
        <p>
          <Link to="/">DASHBOARD</Link>
        </p>
        <p>
          <Link to="/inventory">INVERTORY</Link>
        </p>
        <p>
          <Link to="/purchasing">PURCHASING</Link>
        </p>
        <p>
          <Link to="/sales">SALES</Link>
        </p>
      </Drawer>
    </>
  );
}

export default MainHead;
