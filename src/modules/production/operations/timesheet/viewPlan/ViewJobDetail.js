import { Col, Row, Spin } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useContext } from "react";
import CustomLabel from "../../../../../components/CustomLabel";
import { getStatusByName } from "../../../../../include/js/function_main";
import { convertDigit } from "../../../../../include/js/main_config";
import { TimesheetContext } from "../TimeSheet";
const ViewJobDetail = () => {
  const { job, getJobLoading: loading } = useContext(TimesheetContext);
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
    tg_trans_close_id,
  } = job ? job.length && job[0] : {};

  return (
    <>
      <Spin spinning={loading}>
        {[3].includes(tg_trans_close_id) && (
          <Row className="col-2 mt-1 mb-1">
            <Col md={24} className="text-center">
              <h2 style={{ color: "green" }}>
                <b>งานนี้ถูกดำเนินการเรียบร้อยแล้ว</b>
              </h2>
            </Col>
          </Row>
        )}
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
                <CustomLabel label={"Quantity :"} />
              </Col>
              <Col md={16}>
                <Text className="pre-wrap">{`${convertDigit(
                  job_order_qty,
                  6
                )} ${uom_no || ""}`}</Text>
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
            <Row className="col-2 mt-1 mb-1">
              <Col md={8}>
                <CustomLabel label={"Job Status :"} />
              </Col>
              <Col md={5}>{getStatusByName(trans_status_name)}</Col>
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
                <Text className="pre-wrap">{plan_job_date || "-"}</Text>
              </Col>
            </Row>
            <Row className="col-2 mt-1 mb-1">
              <Col md={8}>
                <CustomLabel label={"Period :"} />
              </Col>
              <Col md={16}>
                <Text className="pre-wrap">{plan_job_plan_time || "-"}</Text>
              </Col>
            </Row>
            <Row className="col-2 mt-1 mb-1">
              <Col md={8}>
                <CustomLabel label={"Worker :"} />
              </Col>
              <Col md={16}>
                <Text className="pre-wrap">{plan_job_plan_worker || "-"}</Text>
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
          </Col>
        </Row>
      </Spin>
    </>
  );
};

export default React.memo(ViewJobDetail);
