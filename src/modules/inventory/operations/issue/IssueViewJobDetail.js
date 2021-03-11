import { Button, Col, Divider, Row } from "antd";
import Modal from "antd/lib/modal/Modal";
import React from "react";
import CustomLabel from "../../../../components/CustomLabel";

const IssueViewJobDetail = ({
  visible,
  jobDetail,
  setModalJobDetail,
  readOnly,
}) => {
  const closeModal = () => {
    setModalJobDetail({
      jobDetail: null,
      visible: false,
    });
  };
  return (
    <>
      <Modal
        title={"Job Detail"}
        visible={visible}
        width={700}
        onCancel={closeModal}
        footer={
          <Button className="primary" onClick={closeModal}>
            Close
          </Button>
        }
      >
        <Row>
          <Col span={24}>
            <Row className="col-2 row-margin-vertical">
              <Col span={8} offset={1}>
                <CustomLabel label={"SO Code : "} readOnly={readOnly} />
              </Col>
              <Col span={14}></Col>
            </Row>
            <Row className="col-2 row-margin-vertical">
              <Col span={8} offset={1}>
                <CustomLabel label={"Description : "} readOnly={readOnly} />
              </Col>
              <Col span={14}></Col>
            </Row>
            <Row className="col-2 row-margin-vertical">
              <Col span={8} offset={1}>
                <CustomLabel label={"Delivery Date : "} readOnly={readOnly} />
              </Col>
              <Col span={14}></Col>
            </Row>
            <Divider orientation="left">Finish Good</Divider>
            <Row className="col-2 row-margin-vertical">
              <Col span={8} offset={1}>
                <CustomLabel label={"Item Code : "} readOnly={readOnly} />
              </Col>
              <Col span={14}></Col>
            </Row>
            <Row className="col-2 row-margin-vertical">
              <Col span={8} offset={1}>
                <CustomLabel label={"Description : "} readOnly={readOnly} />
              </Col>
              <Col span={14}></Col>
            </Row>
            <Row className="col-2 row-margin-vertical">
              <Col span={8} offset={1}>
                <CustomLabel label={"Quantity : "} readOnly={readOnly} />
              </Col>
              <Col span={14}></Col>
            </Row>
            <Divider orientation="left">Bulk</Divider>
            <Row className="col-2 row-margin-vertical">
              <Col span={8} offset={1}>
                <CustomLabel label={"Item Code : "} readOnly={readOnly} />
              </Col>
              <Col span={14}></Col>
            </Row>
            <Row className="col-2 row-margin-vertical">
              <Col span={8} offset={1}>
                <CustomLabel label={"Description : "} readOnly={readOnly} />
              </Col>
              <Col span={14}></Col>
            </Row>
            <Row className="col-2 row-margin-vertical">
              <Col span={8} offset={1}>
                <CustomLabel label={"Quantity : "} readOnly={readOnly} />
              </Col>
              <Col span={14}></Col>
            </Row>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default React.memo(IssueViewJobDetail);
