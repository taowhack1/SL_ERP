import { SearchOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import CustomClock from "../../../../../../components/CustomClock";
import { ProductionContext } from "../../../../../../include/js/context";
import { convertDigit } from "../../../../../../include/js/main_config";

const TimeSheetInfo = ({ status, setStatus }) => {
  const { form } = useContext(ProductionContext);
  const { plan } = form;
  const { start: timesheet } = useSelector(
    (state) => state.production.timesheet
  );
  console.log("timesheet detail render status", status);
  return (
    <>
      <div className="timesheet-title flex-space">
        <h2>Time Sheet</h2>
        <CustomClock />
      </div>
      <Row className="col-2 row-margin-vertical">
        <Col span={12}>
          <Row className="col-2 row-margin-vertical">
            <Col span={6} offset={1}>
              <Text strong>Plan detail :</Text>
            </Col>
            <Col span={16} className="text-value">
              <Text>{plan.plan_job_no || "-"}</Text>
            </Col>
            <Col span={1}></Col>
          </Row>
          <Row className="col-2 row-margin-vertical">
            <Col span={6} offset={1}>
              <Text strong>Time :</Text>
            </Col>
            <Col span={16} className="text-value">
              <Text>{plan.plan_job_plan_time || "-"}</Text>
            </Col>
            <Col span={1}></Col>
          </Row>
          <Row className="col-2 row-margin-vertical">
            <Col span={6} offset={1}>
              <Text strong>Worker :</Text>
            </Col>
            <Col span={16} className="text-value">
              <Text className="mr-3">
                {`${form.worker.length} / ${
                  form.plan.plan_job_plan_worker || "0"
                }`}
              </Text>
              <SearchOutlined className="button-icon" />
            </Col>
            <Col span={1}></Col>
          </Row>
          <Row className="col-2 row-margin-vertical">
            <Col span={6} offset={1}>
              <Text strong>Plan Remark :</Text>
            </Col>
            <Col span={16} className="text-value">
              <Text>{plan.plan_job_remark || "-"}</Text>
            </Col>
            <Col span={1}></Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row className="col-2 row-margin-vertical">
            <Col span={6} offset={1}>
              <Text strong>Timesheet No. :</Text>
            </Col>
            <Col span={16} className="text-value">
              <Text>{timesheet.time_sheet_no || "-"}</Text>
            </Col>
          </Row>
          <Row className="col-2 row-margin-vertical">
            <Col span={6} offset={1}>
              <Text strong>Total Time :</Text>
            </Col>
            <Col span={16} className="text-value">
              <Text>{timesheet.tg_time_sheet_time || "-"}</Text>
            </Col>
          </Row>
          <Row className="col-2 row-margin-vertical">
            <Col span={6} offset={1}>
              <Text strong>Total Qauntity :</Text>
            </Col>
            <Col span={16} className="text-value">
              <Text>{convertDigit(timesheet.tg_time_sheet_qty, 4) || "-"}</Text>
            </Col>
          </Row>
          <Row className="col-2 row-margin-vertical">
            <Col span={6} offset={1}>
              <Text strong>Status :</Text>
            </Col>
            <Col span={16} className="text-value">
              {timesheet.time_sheet_type_id &&
              timesheet.time_sheet_type_id === 2 ? (
                <span className="status status-ready"></span>
              ) : timesheet.time_sheet_type_id === 3 ? (
                <span className="status status-not-ready"></span>
              ) : null}

              <Text className="pe-4">
                {timesheet.time_sheet_type_name || "-"}
              </Text>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default React.memo(TimeSheetInfo);
