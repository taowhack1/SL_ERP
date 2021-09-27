import { Col, Row } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useContext } from "react";
import CustomLabel from "../../../../components/CustomLabel";
import { ProductionContext } from "../../../../include/js/context";

const ProductionViewJobDetail = () => {
  const { form } = useContext(ProductionContext);
  const {
    plan_job_date,
    plan_job_description,
    plan_job_no,
    plan_job_plan_time,
    plan_job_plan_worker,
    plan_job_remark,
  } = form.plan;
  return (
    <>
      <Row className="col-2">
        <Col lg={12} sm={24} className={"col-border-right"}>
          <Row className="col-2 row-margin-vertical">
            <Col md={7} sm={23}>
              <CustomLabel label={"Plan No. :"} />
            </Col>
            <Col md={16} sm={24}>
              <Text className="text-value">{plan_job_no || "-"}</Text>
            </Col>
          </Row>
          <Row className="col-2 row-margin-vertical">
            <Col md={7} sm={24}>
              <CustomLabel label={"Time :"} />
            </Col>
            <Col md={16} sm={24}>
              <Text className="text-value">{plan_job_plan_time || "-"}</Text>
            </Col>
          </Row>
          <Row className="col-2 row-margin-vertical">
            <Col md={7} sm={24}>
              <CustomLabel label={"Worker :"} />
            </Col>
            <Col md={16} sm={24}>
              <Text className="text-value">{plan_job_plan_worker || "-"}</Text>
            </Col>
          </Row>
        </Col>
        <Col lg={12} sm={24}>
          <Row className="col-2 row-margin-vertical">
            <Col md={7} sm={24}>
              <CustomLabel label={"Plan Date :"} />
            </Col>
            <Col md={16} sm={24}>
              <Text className="text-value">{plan_job_date || "-"}</Text>
            </Col>
          </Row>
          <Row className="col-2 row-margin-vertical">
            <Col md={7} sm={24}>
              <CustomLabel label={"Remark :"} />
            </Col>
            <Col md={16} sm={24}>
              <Text className="text-value">{plan_job_remark || "-"}</Text>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default React.memo(ProductionViewJobDetail);
