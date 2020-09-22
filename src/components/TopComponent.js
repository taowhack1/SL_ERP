import React from "react";
import { withRouter } from "react-router-dom";
import { Col, Row, Button, Breadcrumb } from "antd";
import Search from "./Search";

function TopContent(props) {
  const onCreate = () => {
    props.create === "modal"
      ? props.openModal()
      : props.history.push(props.create);
  };
  const onDiscard = () => {
    props.history.push(props.discard);
  };
  return (
    <>
      <div id="top-content">
        <Row>
          <Col span={12}>
            <div className="mt-1 mb-1">
              <Breadcrumb>
                {props.breadcrumb &&
                  props.breadcrumb.map((item, index) => {
                    return (
                      <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                    );
                  })}
              </Breadcrumb>
            </div>
            <div>
              {props.buttonAction.includes("Create") && (
                <Button className="primary" onClick={onCreate}>
                  Create
                </Button>
              )}
              {props.buttonAction.includes("Save") && (
                <Button className="primary" onClick={props.onSave}>
                  Save
                </Button>
              )}
              {props.buttonAction.includes("Edit") && (
                <Button
                  className="primary"
                  onClick={props.onEdit}
                  disabled={props.disableEdit}
                >
                  Edit
                </Button>
              )}
              {props.buttonAction.includes("Approve") && (
                <Button className="primary" onClick={props.onApprove}>
                  Approve
                </Button>
              )}
              {props.buttonAction.includes("Reject") && (
                <Button type="primary" onClick={props.onReject} danger>
                  Reject
                </Button>
              )}
              {props.buttonAction.includes("SaveConfirm") && (
                <Button onClick={props.onConfirm}>Save & Confirm</Button>
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
          <Col span={12}>
            <div>&nbsp;</div>
            <div>{props.search && <Search />}</div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default withRouter(TopContent);
