/** @format */

import {
  SearchOutlined,
  PauseCircleTwoTone,
  PlayCircleTwoTone,
  CheckCircleTwoTone,
} from "@ant-design/icons";
import { Col, Row, Card } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import Avatar from "antd/lib/avatar/avatar";
import Meta from "antd/lib/card/Meta";
import CustomClock from "../../../../../../components/CustomClock";
import { ProductionContext } from "../../../../../../include/js/context";
import { convertDigit } from "../../../../../../include/js/main_config";
import TimeSheetShowWorker from "./TimeSheetShowWorker";
const TimeSheetInfo = ({ status, setStatus, stepBtn }) => {
  const { form } = useContext(ProductionContext);
  const { plan } = form;
  const { start: timesheet } = useSelector(
    (state) => state.production.timesheet
  );
  const { production: empList } = useSelector((state) => state.hrm.employee);
  const [visible, setVisible] = useState(false);
  const listWorker = empList.filter((emp, index) => {
    return form.worker.includes(emp.employee_no);
  });
  const showWorker = () => {
    setVisible(true);
    console.log("worker", form.worker);
    console.log("listWorker", listWorker);
  };
  console.log("timesheet detail render status", status);
  return (
    <>
      <TimeSheetShowWorker
        listWorker={listWorker}
        openModal={visible}
        closeModal={setVisible}
      />
      <div className='timesheet-title flex-space'>
        <h2>Time Sheet</h2>
        <CustomClock />
      </div>
      <Row className='col-2 row-margin-vertical'>
        <Col span={12}>
          <Row className='col-2 row-margin-vertical'>
            <Col span={6} offset={1}>
              <Text strong>Plan detail :</Text>
            </Col>
            <Col span={16} className='text-value'>
              <Text>{plan.plan_job_no || "-"}</Text>
            </Col>
            <Col span={1}></Col>
          </Row>
          <Row className='col-2 row-margin-vertical'>
            <Col span={6} offset={1}>
              <Text strong>Time :</Text>
            </Col>
            <Col span={16} className='text-value'>
              <Text>{plan.plan_job_plan_time || "-"}</Text>
            </Col>
            <Col span={1}></Col>
          </Row>
          <Row className='col-2 row-margin-vertical'>
            <Col span={6} offset={1}>
              <Text strong>Worker :</Text>
            </Col>
            <Col span={16} className='text-value'>
              <Text className='mr-3'>
                {`${form.worker.length} / ${
                  form.plan.plan_job_plan_worker || "0"
                }`}
              </Text>
              <SearchOutlined
                className='button-icon'
                onClick={(e) => showWorker()}
              />
            </Col>
            <Col span={1}></Col>
          </Row>
          <Row className='col-2 row-margin-vertical'>
            <Col span={6} offset={1}>
              <Text strong>Plan Remark :</Text>
            </Col>
            <Col span={16} className='text-value'>
              <Text>{plan.plan_job_remark || "-"}</Text>
            </Col>
            <Col span={1}></Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row className='col-2 row-margin-vertical'>
            <Col span={6} offset={1}>
              <Text strong>Timesheet No. :</Text>
            </Col>
            <Col span={16} className='text-value'>
              <Text>{timesheet.time_sheet_no || "-"}</Text>
            </Col>
          </Row>
          <Row className='col-2 row-margin-vertical'>
            <Col span={6} offset={1}>
              <Text strong>Total Time :</Text>
            </Col>
            <Col span={16} className='text-value'>
              <Text>{timesheet.tg_time_sheet_time || "-"}</Text>
            </Col>
          </Row>
          <Row className='col-2 row-margin-vertical'>
            <Col span={6} offset={1}>
              <Text strong>Total Qauntity :</Text>
            </Col>
            <Col span={16} className='text-value'>
              <Text>{convertDigit(timesheet.tg_time_sheet_qty, 4) || "-"}</Text>
            </Col>
          </Row>
          <Row className='col-2 row-margin-vertical'>
            <Col span={6} offset={1}>
              <Text strong>Status :</Text>
            </Col>
            <Col span={16} className='text-value'>
              {timesheet.time_sheet_type_id &&
              timesheet.time_sheet_type_id === 2 ? (
                <>
                  <PlayCircleTwoTone
                    style={{ fontSize: "20px" }}
                    twoToneColor='#52c41a'
                  />
                </>
              ) : timesheet.time_sheet_type_id === 3 ? (
                <PauseCircleTwoTone
                  style={{ fontSize: "20px" }}
                  twoToneColor='#ff0000'
                />
              ) : timesheet.time_sheet_type_id === 4 ? (
                <CheckCircleTwoTone
                  style={{ fontSize: "20px" }}
                  twoToneColor='#52c41a'
                />
              ) : null}

              <Text className='pe-4'>
                {}
                {stepBtn === "setup"
                  ? timesheet.time_sheet_type_id === 3
                    ? `stop-${stepBtn}`
                    : stepBtn
                  : stepBtn === "clean"
                  ? timesheet.time_sheet_type_id === 3
                    ? `stop-${stepBtn}`
                    : stepBtn
                  : timesheet.time_sheet_type_name || "-"}
                {/* {timesheet.time_sheet_type_name || "-"} */}
              </Text>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default React.memo(TimeSheetInfo);
