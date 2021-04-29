import { Col, Row } from "antd";
import React from "react";
import ProductionJobList from "../ProductionJobList";
import ProductionViewJobDetail from "../ProductionViewJobDetail";
// let mockupData = [];
// for (let i = 0; i < 30; i++) {
//   mockupData.push({
//     id: i,
//     so_no: "[ MRP2103000" + i + " ] SO2103000" + i,
//     status: Math.round(Math.random()),
//   });
// }
const ProductionSelectPlan = () => {
  return (
    <>
      <Row className="col-2">
        <Col span={5}>
          <div className="mr-2 mt-1">
            <ProductionJobList />
          </div>
        </Col>
        <Col span={19}>
          <ProductionViewJobDetail />
        </Col>
      </Row>
    </>
  );
};

export default ProductionSelectPlan;
