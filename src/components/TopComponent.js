import React from "react";
import { withRouter, Link } from "react-router-dom";
import { Col, Row, Button, Breadcrumb, Steps, Dropdown, Menu } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import Search from "./Search";

function TopContent(props) {
  // console.log(props);
  const onCreate = () => {
    props.create === "modal"
      ? props.openModal("Create")
      : props.history.push(props.create);
  };
  const onDiscard = () => {
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
              <Menu.Item key={index}>
                <a rel="noopener noreferrer" target="_blank" href={item.link}>
                  {item.name}
                </a>
              </Menu.Item>
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
            <div>{props.search && <Search />}</div>
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
              {props.buttonAction.includes("Save") && (
                // <Button className="primary" onClick={props.onSave}>
                //   Save
                // </Button>
                <Button
                  className="primary"
                  // onClick={onEdit}
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
              )}
              {props.buttonAction.includes("Edit") &&
                (props.edit == "modal" ? (
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
                          // data: props.edit.data,
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
                <Button onClick={props.onApprove}>Approve</Button>
              )}
              {props.buttonAction.includes("Reject") && (
                <Button onClick={props.onReject}>Reject</Button>
              )}
              {props.buttonAction.includes("Discard") && (
                <Button onClick={onDiscard}>Discard</Button>
              )}
              {props.buttonAction.includes("Cancel") && (
                <Button type="primary" danger onClick={props.onCancel}>
                  Cancel
                </Button>
              )}
            </div>
          </Col>
          <Col span={4}>
            {props.action && (
              <Dropdown overlay={menuAction()} trigger={["click"]}>
                <Button type="text">
                  Action <CaretDownOutlined />
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

export default withRouter(TopContent);
