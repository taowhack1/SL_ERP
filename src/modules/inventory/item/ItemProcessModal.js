import { Button, Col, InputNumber, Row, TimePicker } from "antd";
import Modal from "antd/lib/modal/Modal";
import Text from "antd/lib/typography/Text";
import React from "react";
import WorkCenterDetail from "../../production/WorkCenterDetail";
import moment from "moment";

export const ItemProcessModal = ({
  readOnly,
  visible,
  modalSave,
  modalCancel,
  data_detail,
  detailDispatch,
}) => {
  console.log("[Modal] visible", visible);
  return (
    <Modal
      width={1100}
      title="Work Center Detail"
      visible={visible}
      destroyOnClose
      onOk={modalSave}
      onCancel={modalCancel}
      footer={[
        <Button
          key="back"
          className={readOnly ? "primary" : ""}
          onClick={modalCancel}
        >
          Discard
        </Button>,
        !readOnly && (
          <Button key="submit" className="primary" onClick={modalSave}>
            Confirm
          </Button>
        ),
      ]}
    >
      <Row>
        <Col span={12} className="col-left">
          <Row className="row-margin-vertical">
            <Col span={6} className="pd-left-1">
              <Text strong>
                <span className="require">* </span>Worker
              </Text>
            </Col>
            <Col span={17}>
              <InputNumber className="full-width" />
            </Col>
            <Col span={1}></Col>
          </Row>
        </Col>
        <Col span={12} className="col-right">
          <Row className="row-margin-vertical">
            <Col span={1}></Col>
            <Col span={6}>
              <Text strong>
                <span className="require">* </span>Time Used
              </Text>
            </Col>
            <Col span={17} className="pd-right-1">
              <TimePicker
                className="full-width"
                format={"HH:mm"}
                showNow={false}
                name={"work_center_time"}
                style={{ width: "100%" }}
                placeholder="Hour : Minute"
                required
                value={
                  data_detail.work_center_time
                    ? moment(data_detail.work_center_time, "HH:mm:ss")
                    : ""
                }
                onChange={(data) => {
                  const time = moment(data, "HH:mm").format("HH:mm:ss");
                  console.log(time);
                  //   upDateFormValue({
                  //     work_center_time: data ? time : null,
                  //   });
                }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="row-tab-margin-lg">
        <Col span={24}>
          <WorkCenterDetail
            data_detail={data_detail}
            detailDispatch={detailDispatch}
            readOnly={readOnly}
          />
        </Col>
      </Row>
    </Modal>
  );
};

export default ItemProcessModal;
