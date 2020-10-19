import React from "react";
import { withRouter, Link } from "react-router-dom";
import {
  Col,
  Row,
  Button,
  Breadcrumb,
  Steps,
  Dropdown,
  Menu,
  Typography,
} from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import Search from "./Search";
const { Text } = Typography;

function TopContent(props) {
  const onCreate = () => {
    props.create === "modal"
      ? props.openModal("Create")
      : props.history.push(props.create);
  };
  const onDiscard = () => {
    props.onDiscard && props.onDiscard();
    props.history.push(props.discard);
  };
  const onEdit = () => {
    props.edit === "modal"
      ? props.openModal("Edit")
      : props.history.push(props.edit.path);
  };
  const menuAction = () => {
    const a = (
      <Menu>
        {props.action &&
          props.action.map((item, index) => {
            return (
              item &&
              (item.cancel ? (
                <Menu.Item key={index}>
                  <Text onClick={() => props.onCancel && props.onCancel()}>
                    {item.name}
                  </Text>
                </Menu.Item>
              ) : (
                <Menu.Item key={index}>
                  <a rel="noopener noreferrer" target="_blank" href={item.link}>
                    {item.name}
                  </a>
                </Menu.Item>
              ))
            );
          })}
      </Menu>
    );

    return a;
  };
  return (
    <>
      <div id="top-content">
        <Row className="mt-1 mb-1">
          <Col span={12}>
            <div>
              <Breadcrumb>
                {props.breadcrumb &&
                  props.breadcrumb.map((item, index) => {
                    return (
                      <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                    );
                  })}
              </Breadcrumb>
            </div>
          </Col>
          <Col span={12}>
            <div>{props.search && <Search onSearch={props.onSearch} />}</div>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <div>
              {props.buttonAction.includes("Create") && (
                <Button className="primary" onClick={onCreate}>
                  Create
                </Button>
              )}
              {props.buttonAction.includes("Save") &&
                (props.save === "function" ? (
                  <Button className="primary" onClick={props.onSave}>
                    Save
                  </Button>
                ) : (
                  <Button
                    className="primary"
                    onClick={props.onSave && props.onSave}
                    disabled={props.saveDisabled}
                  >
                    <Link
                      to={{
                        pathname: props.save.path,
                        state: {
                          // data: props.save.data,
                          ...props.save.data,
                        },
                      }}
                    >
                      Save
                    </Link>
                  </Button>
                ))}
              {props.buttonAction.includes("Edit") &&
                (props.edit === "modal" ? (
                  <Button
                    className="primary"
                    onClick={onEdit}
                    disabled={props.disabledEditBtn}
                  >
                    Edit
                  </Button>
                ) : (
                  <Button
                    className="primary"
                    // onClick={onEdit}
                    disabled={props.disabledEditBtn}
                  >
                    <Link
                      to={{
                        pathname: props.edit.path,
                        state: {
                          ...props.edit.data,
                        },
                      }}
                    >
                      Edit
                    </Link>
                  </Button>
                ))}
              {props.buttonAction.includes("SaveConfirm") && (
                <Button onClick={props.onConfirm}>Save & Confirm</Button>
              )}
              {props.buttonAction.includes("Confirm") && (
                <Button onClick={props.onConfirm}>Confirm</Button>
              )}
              {props.buttonAction.includes("Approve") && (
                <Button onClick={props.onApprove} className="primary">
                  Approve
                </Button>
              )}
              {props.buttonAction.includes("Reject") && (
                <Button onClick={props.onReject} danger>
                  Reject
                </Button>
              )}

              {props.buttonAction.includes("Cancel") && (
                <Button type="primary" danger onClick={props.onCancel}>
                  Cancel
                </Button>
              )}
              {props.buttonAction.includes("Discard") && (
                <Button onClick={onDiscard}>Discard</Button>
              )}
            </div>
          </Col>
          <Col span={4}>
            {props.action && (
              <Dropdown overlay={menuAction()} trigger={["click"]}>
                <Button type="text">
                  Actions <CaretDownOutlined />
                </Button>
              </Dropdown>
            )}
          </Col>
          <Col span={12}>
            <div className="steps">
              {props.step &&
                props.step.step &&
                props.step.step.map((item, index) => {
                  const pass = props.step.current >= index ? "pass" : "";
                  return (
                    <span className={`step-item ${pass}`} key={index}>
                      {item}
                    </span>
                  );
                })}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default React.memo(withRouter(TopContent));
