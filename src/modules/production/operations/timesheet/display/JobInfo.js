import { Button, Col, Row, Spin, Tag } from "antd";
import Text from "antd/lib/typography/Text";
import moment from "moment";
import React, { useContext } from "react";
import CustomLabel from "../../../../../components/CustomLabel";
import { convertDigit } from "../../../../../include/js/main_config";
import { TimesheetContext } from "../TimeSheet";
import { TSCtrlContext } from "../TimesheetDisplay";
const JobInfo = () => {
  const {
    job,
    getJobLoading,
    selectedWorker,
    controller: { timesheetID, on_time_sheet_type_id },
  } = useContext(TimesheetContext);
  const { onConfirmJob, loading, tsLog } = useContext(TSCtrlContext);

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

  const {
    time_sheet_no,
    time_sheet_id,
    tg_time_sheet_worker,
    time_sheet_updated,
    time_sheet_status_name,
    tg_time_sheet_time,
    tg_time_sheet_qty,
    time_sheet_user_detail,
    // time_sheet_log_detail,
  } = tsLog?.data || {};

  const getTimesheetStatus = (id) => {
    switch (true) {
      case id === 0:
        return "ยืนยัน Job แล้ว";
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
  console.log("tsLog", tsLog);
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
                <Text className="pre-wrap">{`${
                  tg_time_sheet_time || "00:00:00"
                } / `}</Text>
                <Text strong>{plan_job_plan_time}</Text>
              </Col>
            </Row>
            <Row className="col-2 mt-1 mb-1">
              <Col md={8}>
                <CustomLabel label={"Worker :"} />
              </Col>
              <Col md={16}>
                <Text className="pre-wrap">{`${selectedWorker.length}`}</Text>
                <Text strong>{` / ${plan_job_plan_worker}`}</Text>
              </Col>
            </Row>
            <Row className="col-2 mt-1 mb-1">
              <Col md={8}>
                <CustomLabel label={"Quantity :"} />
              </Col>
              <Col md={16}>
                <Text className="pre-wrap require">{`${convertDigit(
                  tg_time_sheet_qty || 0,
                  6
                )}`}</Text>
                <Text strong>{` / ${convertDigit(
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
