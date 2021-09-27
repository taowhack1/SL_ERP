import { Col, Row } from "antd";
import React from "react";
import JobList from "./viewPlan/JobList";
import ViewJobDetail from "./viewPlan/ViewJobDetail";
const ProductionSelectPlan = () => {
  return (
    <>
      <Row className="col-2">
        <Col span={5}>
          <div className="mr-2 mt-1">
            <JobList />
          </div>
        </Col>
        <Col span={19}>
          <ViewJobDetail />
        </Col>
      </Row>
    </>
  );
};

export default React.memo(ProductionSelectPlan);
