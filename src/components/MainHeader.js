import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Redirect, withRouter } from "react-router-dom";
import { Drawer, Row, Col, Avatar, Dropdown, Button, Menu } from "antd";
import {
  UserOutlined,
  MenuOutlined,
  CaretDownOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import MainConfig from "./MainConfig";
import { signOut, change_working_project } from "../actions/authActions";
import { useDispatch } from "react-redux";
import Text from "antd/lib/typography/Text";
import { api_server } from "../include/js/main_config";
const MainHead = (props) => {
  const auth = useSelector(
    (state) => state.auth.authData && state.auth.authData
  );
  const redirect_fn = () => {
    return <Redirect to="/login" />;
  };
  if (!auth) {
    redirect_fn();
  }
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.auth.projects);
  const currentProject = useSelector((state) => state.auth.currentProject);
  const [visible, setVisible] = useState(false);

  const onCloseDrawer = () => {
    setVisible(false);
  };
  const onOpenDrawer = () => {
    setVisible(true);
  };
  const userMenu = () => {
    return (
      <Menu>
        <Menu.Item>
          <Link
            to="/change_password"
            onClick={() => {
              // keepLog.keep_log_action(`Click Change Password`);
            }}
          >
            Change Password
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link
            to="/login"
            onClick={() => {
              // keepLog.keep_log_action(`Click Logout`);
              dispatch(signOut());
            }}
          >
            Logout
          </Link>
        </Menu.Item>
      </Menu>
    );
  };

  return (
    <>
      <Row>
        <Col span={12}>
          <Row>
            <Col span={6}>
              <MenuOutlined onClick={onOpenDrawer} />{" "}
              <Link
                to={currentProject && currentProject.project_url}
                style={{ color: "white" }}
              >
                {props.title}
              </Link>
            </Col>
            <Col span={18}>
              <MainConfig projectId={props.projectId} />
            </Col>
          </Row>
        </Col>
        <Col span={12} id="column-right">
          <Row>
            <Col span={24}>
              {api_server === `http://192.168.5.222:3009` ? (
                <>
                  <Text className="server-status status-dev" strong>
                    <DatabaseOutlined /> Development
                  </Text>
                </>
              ) : (
                <>
                  <Text className="server-status status-production" strong>
                    <DatabaseOutlined /> Production
                  </Text>
                </>
              )}

              <Text style={{ color: "white", marginRight: 30 }}>
                {auth && auth.branch_name}
              </Text>
              <Avatar icon={<UserOutlined />} />
              <Dropdown overlay={userMenu()} trigger={["click"]}>
                <Button type="text" className="ant-dropdown-link">
                  {auth && auth.employee_name_eng} <CaretDownOutlined />
                </Button>
              </Dropdown>
            </Col>
          </Row>
        </Col>
      </Row>

      <Drawer
        title="PROJECTS"
        placement="left"
        closable={false}
        onClose={onCloseDrawer}
        visible={visible}
      >
        {projects &&
          projects.map((project) => {
            return (
              <p key={project.project_id}>
                <Link
                  to={{
                    pathname: project.project_url,
                    state: project,
                  }}
                  onClick={() => {
                    dispatch(change_working_project(project));
                  }}
                >
                  {project.project_name}
                </Link>
              </p>
            );
          })}
        {/* <p>
          <Link to="/settings">SETTINGS</Link>
        </p> */}
      </Drawer>
    </>
  );
};

export default React.memo(withRouter(MainHead));
