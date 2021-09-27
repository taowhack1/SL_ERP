import { Button, Col, message, Row, Spin, Tag } from "antd";
import Text from "antd/lib/typography/Text";
import moment from "moment";
import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { setTimesheetCtrl } from "../../../../../actions/production/timesheetActions";
import CustomLabel from "../../../../../components/CustomLabel";
import { getStatusByName } from "../../../../../include/js/function_main";
import { convertDigit } from "../../../../../include/js/main_config";
import { TimesheetContext } from "../TimeSheet";
const JobInfo = () => {
  const dispatch = useDispatch();
  const {
    job,
    getJobLoading,
    selectedWorker,
    controller: { timesheetID, on_time_sheet_type_id },
  } = useContext(TimesheetContext);

  const [loading, setLoading] = useState(false);

  const onConfirmJob = ({ job_order_no }) => {
    setLoading(true);
    setTimeout(() => {
      dispatch(setTimesheetCtrl({ timesheetID: 1 }));
      message.success(`ยืนยัน Job : ${job_order_no} เสร็จสิ้น`);
      message.info(`แผงควบคุมการทำงานสามารถใช้งานได้แล้ว.`, 6);
      setLoading(false);
    }, 1200);
  };

  const {
    job_order_no,
    job_order_description,
    item_no_name,
    job_order_qty,
    uom_no,
    so_no,
    trans_status_name,
    machine_cost_center_description,
    plan_job_date,
    plan_job_plan_time,
    plan_job_plan_worker,
    shift_job_name,
  } = job ? job.length && job[0] : {};

  const getTimesheetStatus = (id) => {
    switch (true) {
      case id === 1:
        return "อยู่ระหว่างตั้งค่าเครื่อง";
      case id === 2:
        return "อยู่ระหว่างผสม";
      case id === 3:
        return "อยู่ระหว่างถ่ายถังผสม";
      case id === 4:
        return "อยู่ระหว่างบรรจุ & แพ็คสินค้า";
      case id === 6:
        return "อยู่ระหว่างทำความสะอาด";
      case id === 7:
        return "จบการทำงาน";
      default:
        return "รอดำเนินการ";
    }
  };
  return (
    <>
      <Spin spinning={getJobLoading}>
        <Row className="col-2 mt-1">
          <Col lg={12} sm={24} className={"col-border-right"}>
            <Row className="col-2 mt-1 mb-1">
              <Col md={8}>
                <CustomLabel label={"Job No. :"} />
              </Col>
              <Col md={16}>
                <Text className="pre-wrap">{job_order_no || "-"}</Text>
              </Col>
            </Row>
            <Row className="col-2 mt-1 mb-1">
              <Col md={8}>
                <CustomLabel label={"Description :"} />
              </Col>
              <Col md={16}>
                <Text className="pre-wrap">{job_order_description || "-"}</Text>
              </Col>
            </Row>
            <Row className="col-2 mt-1 mb-1">
              <Col md={8}>
                <CustomLabel label={"Item :"} />
              </Col>
              <Col md={16}>
                <Text className="pre-wrap">{item_no_name || "-"}</Text>
              </Col>
            </Row>
            <Row className="col-2 mt-1 mb-1">
              <Col md={8}>
                <CustomLabel label={"Shift :"} />
              </Col>
              <Col md={16}>
                <Text className="pre-wrap">{shift_job_name || "-"}</Text>
              </Col>
            </Row>
            <Row className="col-2 mt-1 mb-1">
              <Col md={8}>
                <CustomLabel label={"S/O No. :"} />
              </Col>
              <Col md={16}>
                <Text className="pre-wrap">{so_no || "-"}</Text>
              </Col>
            </Row>
          </Col>
          <Col lg={12} sm={24}>
            <Row className="col-2 mt-1 mb-1">
              <Col md={8}>
                <CustomLabel label={"Work Center :"} />
              </Col>
              <Col md={16}>
                <Text className="pre-wrap">
                  {machine_cost_center_description || "-"}
                </Text>
              </Col>
            </Row>
            <Row className="col-2 mt-1 mb-1">
              <Col md={8}>
                <CustomLabel label={"Plan Date :"} />
              </Col>
              <Col md={16}>
                <Text className="pre-wrap">{`${moment().format(
                  "DD/MM/YYYY"
                )} / `}</Text>
                <Text strong>{plan_job_date}</Text>
              </Col>
            </Row>
            <Row className="col-2 mt-1 mb-1">
              <Col md={8}>
                <CustomLabel label={"Period :"} />
              </Col>
              <Col md={16}>
                <Text className="pre-wrap">{`${"03:15:00"} / `}</Text>
                <Text strong>{plan_job_plan_time}</Text>
              </Col>
            </Row>
            <Row className="col-2 mt-1 mb-1">
              <Col md={8}>
                <CustomLabel label={"Worker :"} />
              </Col>
              <Col md={16}>
                <Text className="pre-wrap">{`${selectedWorker.length} / `}</Text>
                <Text strong>{plan_job_plan_worker}</Text>
              </Col>
            </Row>
            <Row className="col-2 mt-1 mb-1">
              <Col md={8}>
                <CustomLabel label={"Quantity :"} />
              </Col>
              <Col md={16}>
                <Text className="pre-wrap require">{`${convertDigit(
                  25,
                  6
                )} / `}</Text>
                <Text strong>{`${convertDigit(
                  job_order_qty,
                  6
                )} ${uom_no}`}</Text>
              </Col>
            </Row>

            <Row className="col-2 mt-1 mb-1">
              <Col md={8}>
                <CustomLabel label={"Job Status :"} />
              </Col>
              {/* <Col md={5}>{
              getStatusByName(trans_status_name)
              }</Col> */}
              <Col md={5}>
                <Tag color="cyan">
                  {getTimesheetStatus(on_time_sheet_type_id)}
                </Tag>
              </Col>
            </Row>
            {!timesheetID && (
              <Row className="col-2 mt-3 mb-1">
                <Col md={22} offset={1}>
                  {/* <Spin spinning={loading}> */}
                  <Button
                    block
                    className="primary"
                    loading={loading}
                    onClick={() => onConfirmJob(job[0])}
                  >
                    กรุณาคลิกเพื่อยืนยัน Job
                  </Button>
                  {/* </Spin> */}
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      </Spin>
    </>
  );
};

export default React.memo(JobInfo);
