import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import {
  Col,
  Row,
  Button,
  Breadcrumb,
  Dropdown,
  Menu,
  Typography,
  message,
  Space,
} from "antd";
import { CaretDownOutlined, RollbackOutlined } from "@ant-design/icons";
import Search from "./Search";
import useKeepLogs from "../modules/logs/useKeepLogs";
import Modal from "antd/lib/modal/Modal";
const { Text } = Typography;

function TopContent(props) {
  const keepLog = useKeepLogs();

  const [btnLoading, setBtnLoading] = useState(false);
  const onCreate = () => {
    keepLog.keep_log_action("Click Create Button");
    props.create === "modal"
      ? props.openModal("Create")
      : props.history.push(props.create);
  };
  const onDiscard = () => {
    keepLog.keep_log_action("Click Discard Button");
    props.onDiscard && props.onDiscard();
    props.history.push(props.discard);
  };
  const onEdit = () => {
    keepLog.keep_log_action("Click Edit Button");
    props.edit === "modal"
      ? props.openModal("Edit")
      : props.history.push(props.edit.path);
  };
  const onSave = () => {
    keepLog.keep_log_action("Click Save Button");
    setBtnLoading(true);
    message.loading({ content: "Validating...", key: "validate", duration: 1 });
    if (props.save === "table_loading") {
      props.onSave && props.onSave();
      setTimeout(() => {
        setBtnLoading(false);
      }, 1000);
    } else {
      setTimeout(() => {
        props.onSave && props.onSave();
        setBtnLoading(false);
      }, 1000);
    }
  };
  const onApprove = () => {
    keepLog.keep_log_action("Click Approve Button");
    setBtnLoading(true);
    setTimeout(() => {
      message.success({ content: "Approve", key: "validate", duration: 1 });
      props.onApprove && props.onApprove();
      setBtnLoading(false);
    }, 1000);
  };
  const onConfirm = () => {
    keepLog.keep_log_action("Click Confirm Button");
    setBtnLoading(true);
    setTimeout(() => {
      message.success({ content: "Confirm", key: "validate", duration: 1 });
      props.onConfirm && props.onConfirm();
      setBtnLoading(false);
    }, 1000);
  };

  const onReject = () => {
    keepLog.keep_log_action("Click Reject Button");
    props.onReject && props.onReject();
  };
  const onBack = () => {
    keepLog.keep_log_action("Click Back Button");
    props.onBack && props.onBack();
    props.history.push(props.back);
  };
  const onCancel = () => {
    message.success({ content: "Cancel", key: "validate", duration: 1 });
    keepLog.keep_log_action("Click Cancel Button");
    props.onCancel && props.onCancel();
  };

  const [visible, setVisible] = useState({ callBack: "", visible: false });
  const showPopconfirm = (modalTitle, callBack) => {
    setVisible({ callBack: callBack, visible: true, title: modalTitle });
  };

  const handleOk = () => {
    visible.callBack && visible.callBack();
    setVisible({ callBack: null, visible: false, title: "" });
  };

  const handleCancel = () => {
    setVisible({ callBack: null, visible: false, title: "" });
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
                  <Text onClick={() => props.onCancel && onCancel()}>
                    {item.name}
                  </Text>
                </Menu.Item>
              ) : (
                <Menu.Item key={index}>
                  <a
                    rel="noopener noreferrer"
                    target="_blank"
                    href={item.link}
                    onClick={() => {
                      keepLog.keep_log_action(
                        `Click ${item.name + " Link : " + item.link} `
                      );
                    }}
                  >
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
            <Space size={8}>
              {props.buttonAction.includes("Create") && (
                <Button className="primary" onClick={onCreate}>
                  Create
                </Button>
              )}
              {props.buttonAction.includes("Save") &&
                (props.save === "function" || props.save === "table_loading" ? (
                  <Button
                    className="primary"
                    onClick={onSave}
                    loading={btnLoading}
                    disabled={btnLoading}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    className="primary"
                    onClick={props.onSave && props.onSave}
                    loading={btnLoading}
                    disabled={btnLoading}
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
                    // className="primary"
                    onClick={onEdit}
                    disabled={props.disabledEditBtn}
                  >
                    Edit
                  </Button>
                ) : (
                  <Button
                    className="primary"
                    disabled={props.disabledEditBtn}
                    disabled={btnLoading}
                    onClick={() => keepLog.keep_log_action("Click Edit Button")}
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
              {/* {props.buttonAction.includes("SaveConfirm") && (
                <Button onClick={props.onConfirm}>Save & Confirm</Button>
              )} */}
              {props.buttonAction.includes("Confirm") && (
                <Button
                  onClick={onConfirm}
                  loading={btnLoading}
                  disabled={btnLoading}
                >
                  Confirm
                </Button>
              )}
              {props.buttonAction.includes("Approve") && (
                <Button
                  onClick={() => showPopconfirm("Approve", onApprove)}
                  className="primary"
                  loading={btnLoading}
                  disabled={btnLoading}
                >
                  Approve
                </Button>
              )}
              {props.buttonAction.includes("Reject") && (
                <Button
                  onClick={onReject}
                  danger
                  // loading={btnLoading}
                  disabled={btnLoading}
                >
                  Reject
                </Button>
              )}

              {props.buttonAction.includes("Cancel") && (
                <Button type="primary" danger onClick={props.onCancel}>
                  Cancel
                </Button>
              )}
              {props.buttonAction.includes("Discard") && (
                <Button
                  onClick={onDiscard}
                  // loading={btnLoading}
                  disabled={btnLoading}
                >
                  Discard
                </Button>
              )}
              {props.buttonAction.includes("Back") && (
                <Button
                  onClick={onBack}
                  // loading={btnLoading}
                  disabled={btnLoading}
                >
                  <RollbackOutlined />
                  Back
                </Button>
              )}
            </Space>
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
                  const pass =
                    props.step.current > index || props.step.process_complete
                      ? "pass"
                      : "";
                  const current =
                    props.step.current === index && !props.step.process_complete
                      ? "current-step"
                      : "";
                  return (
                    <span
                      className={`step-item ${pass} ${current}`}
                      key={index}
                    >
                      {item}
                    </span>
                  );
                })}
            </div>
          </Col>
        </Row>
        <Modal
          title={"Confirm " + visible.title}
          visible={visible.visible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Are you sure ?</p>
        </Modal>
      </div>
    </>
  );
}

export default React.memo(withRouter(TopContent));
