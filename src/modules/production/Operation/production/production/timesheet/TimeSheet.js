/** @format */

import { Button, Col, Input, Table, Modal, Radio, InputNumber } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useState } from "react";
import { Row } from "react-flexbox-grid";
import CustomTable from "../../../../../../components/CustomTable";
import MainLayout from "../../../../../../components/MainLayout";
import Btn from "./Btn";
import Display from "./Display";
import {
  detail,
  detailColumns,
  detailFields,
  mockupdata,
  showConfirm,
} from "./timeConfig";
import "./watch.css";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Form } from "redux-form";
import { render } from "@testing-library/react";
import { getNumberFormat } from "../../../../../../include/js/main_config";
import { validateFormHead } from "../../../../../../include/js/function_main";
import moment from "moment";
const { confirm } = Modal;

const TimeSheet = (props) => {
  const h = moment().hour();
  const m = moment().minute();
  const s = moment().second();
  const time_stemp_start = `${h >= 10 ? h : "0" + h}:${m >= 10 ? m : "0" + m}:${
    s >= 10 ? s : "0" + s
  }`;
  const time_stemp_stop = `${h >= 10 ? h : "0" + h}:${m >= 10 ? m : "0" + m}:${
    s >= 10 ? s : "0" + s
  }`;

  const [time, setTime] = useState({ s: 0, m: 0, h: 0 });
  const [interv, setInterv] = useState();
  const [status, setStatus] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dataHead, setdataHead] = useState(detail);
  const upDateFormValue = (data) => {
    setdataHead({ ...dataHead, ...data });
  };
  const showConfirmstop = () => {
    confirm({
      title: "Confirm ",
      icon: <ExclamationCircleOutlined />,
      content: "",
      onOk() {
        reset();
        inputCount();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const showConfirmstart = () => {
    confirm({
      title: "Confirm ",
      icon: <ExclamationCircleOutlined />,
      content: "",
      onOk() {
        start();
        upDateFormValue({ time_start: time_stemp_start });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const showConfirmbreak = () => {
    confirm({
      title: "Confirm ",
      icon: <ExclamationCircleOutlined />,
      content: "",
      onOk() {
        stop();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const inputCount = () => {
    Modal.warning({
      title: "plese total count ",
      icon: <ExclamationCircleOutlined />,
      content: (
        <InputNumber
          {...getNumberFormat(3)}
          min={1}
          step={1}
          precision={0}
          name="count"
          onChange={(e) =>
            upDateFormValue({
              count: e,
              time_record: `${time.h >= 10 ? time.h : "0" + time.h}:${
                time.m >= 10 ? time.m : "0" + time.m
              }:${time.s >= 10 ? time.s : "0" + time.s}`,
              time_stop: time_stemp_stop,
            })
          }
        ></InputNumber>
      ),
      onOk() {
        //validateFormHead(dataHead, detailFields);
      },
    });
  };
  const start = () => {
    run();
    setStatus(1);
    setInterv(setInterval(run, 1000));
  };
  var updatedS = time.s,
    updatedM = time.m,
    updatedH = time.h;
  const run = () => {
    if (updatedM === 60) {
      updatedH++;
      updatedM = 0;
    }
    if (updatedS === 60) {
      updatedM++;
      updatedS = 0;
    }
    updatedS++;
    return setTime({ s: updatedS, m: updatedM, h: updatedH });
  };
  const stop = () => {
    clearInterval(interv);
    setStatus(2);
  };
  const reset = () => {
    clearInterval(interv);
    setStatus(0);
    setTime({ s: 0, m: 0, h: 0 });
  };
  const resume = () => start();
  console.log("dataHead", dataHead);

  return (
    <div style={{ marginLeft: "1%" }}>
      <Row>
        <Col span={12} className="col-border-right">
          <Row className="col-2 row-margin-vertical">
            <Col span={8}>
              <h2>Time Sheet</h2>
            </Col>
            <Col span={16}></Col>
            <Col span={2}></Col>
          </Row>
          <Row className="col-2 row-margin-vertical">
            <Col span={6}>
              <Text strong>รายละเอียด :</Text>
            </Col>
            <Col span={16}>รายละเอียดของ Job</Col>
            <Col span={2}></Col>
          </Row>
          <Row className="col-2 row-margin-vertical">
            <Col span={6}>
              <Text strong>จำนวนคน :</Text>
            </Col>
            <Col span={16}>2 คน</Col>
            <Col span={2}></Col>
          </Row>
          <Row className="col-2 row-margin-vertical">
            <Col span={6}>
              <Text strong>ยอดที่ต้องผลิต :</Text>
            </Col>
            <Col span={16}>1200 </Col>
            <Col span={2}></Col>
          </Row>
          <Row className="col-2 row-margin-vertical">
            <Col span={6}>
              <Text strong>ยอดที่ผลิตได้(รวม) :</Text>
            </Col>
            <Col span={16}>163 </Col>
            <Col span={2}></Col>
          </Row>
          <Row className="col-2 row-margin-vertical"></Row>
          <Row className="col-2 row-margin-vertical">
            <Col span={23}>
              <Table
                columns={detailColumns}
                dataSource={mockupdata}
                rowKey="id"
                style={{ height: "100%" }}
                pagination={false}
                scroll={{ y: 500 }}
                size={"small"}
              ></Table>
            </Col>
          </Row>
          <Row className="col-2 row-margin-vertical">
            <Col span={6}></Col>
            <Col span={4}>
              <Button
                type="block"
                success
                className="full-width"
                style={{ marginTop: "40%" }}
              >
                แก้ไขยอด
              </Button>
            </Col>
            <Col span={2}></Col>
            <Col span={4}>
              <Button
                type="block"
                success
                className="full-width"
                style={{ marginTop: "40%" }}
              >
                จบงาน
              </Button>
            </Col>
            <Col span={2}></Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row className="col-2 row-margin-vertical"></Row>
          <Row className="col-2 row-margin-vertical">
            <Col span={6}></Col>
            <Col span={24} style={{ marginTop: "20%" }}>
              <div className="stopwatch">
                <Display time={time} />
                <Btn
                  status={status}
                  resume={resume}
                  showConfirmstart={showConfirmstart}
                  showConfirmbreak={showConfirmbreak}
                  showConfirmstop={showConfirmstop}
                />
              </div>
            </Col>
          </Row>
          <Row className="col-1 row-margin-vertical"></Row>
        </Col>
      </Row>
    </div>
  );
};

export default TimeSheet;
