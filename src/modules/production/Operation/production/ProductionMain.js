import { Col, Row } from "antd";
import React, { useMemo, useState } from "react";
import { ProductionContext } from "../../../../include/js/context";
import ProductionHeader from "./production/ProductionHeader";
import ProductionJobList from "./ProductionJobList";
import ProductionStepSwitch from "./ProductionStepSwitch";
let mockupData = [];
for (let i = 0; i < 30; i++) {
  mockupData.push({
    id: i,
    so_no: "[ MRP2103000" + i + " ] SO2103000" + i,
    status: Math.round(Math.random()),
  });
}
const ProductionMain = ({ props, children }) => {
  const cost_center = JSON.parse(localStorage.getItem("cost_center"));
  const [step, setStep] = useState({
    current: 0,
    stepList: [
      {
        id: 0,
        title: "Select Plan",
      },
      {
        id: 1,
        title: "Raw Material Checking",
      },
      {
        id: 2,
        title: "Select Worker",
      },
      {
        id: 3,
        title: "Timesheet",
      },
      {
        id: 4,
        title: "Result",
      },
    ],
  });
  const [form, setForm] = useState({
    machine: {
      ...cost_center,
    },
    plan: {
      plan_id: null,
      plan_description: null,
    },
    rmChecking: {
      progress: 0,
      rmList: [],
    },
    worker: [],
    timesheet: {
      start: null,
      stop: null,
      totalTime: 0,
      result: [],
      totalQty: 0,
    },
  });

  const contextValue = useMemo(
    () => ({
      form,
      setForm,
      step,
      setStep,
    }),
    [form, setForm, step, setStep]
  );
  return (
    <>
      <ProductionContext.Provider value={contextValue}>
        <div className="production-main primary">
          {/* Content */}

          <div className="production-container">
            <Row className="col-2">
              <Col span={step.current === 0 ? 6 : 0}>
                <div className="mr-2 mt-1">
                  <ProductionJobList dataSource={mockupData} />
                </div>
              </Col>
              <Col span={step.current === 0 ? 18 : 24}>
                <div className="production-step-content">
                  <ProductionHeader
                    current={step.current}
                    title={step.stepList[step.current].title}
                  />
                  <ProductionStepSwitch current={step.current} />
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </ProductionContext.Provider>
    </>
  );
};

export default ProductionMain;
