/** @format */

import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button, Col, message, Progress, Row } from "antd";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { ProductionContext } from "../../../../../include/js/context";
import ProductionCostCenterTag from "../ProductionCostCenterTag";
const disabledNextBtn = (currentStep) => (
  <Button
    type='text'
    className='flex-container item-center'
    style={{ float: "right" }}
    // disabled={true}
    onClick={() =>
      currentStep === 1
        ? message.warning("Please select plan .")
        : currentStep === 2
        ? message.warning("Formula is not 100% complete.")
        : currentStep === 4
        ? message.warning("Can't go back, Timesheet has been started.")
        : null
    }>
    <h4 className={"pd-right-1 text-disabled"}>NEXT</h4>

    <ArrowRightOutlined className={"font-25 text-disabled"} />
  </Button>
);
const disabledPrevBtn = (currentStep) => (
  <Button
    type='text'
    className='flex-container item-center '
    onClick={() =>
      currentStep === 4
        ? message.warning("Can't go back, Timesheet has been started.")
        : null
    }>
    <ArrowLeftOutlined className={"font-25  text-disabled"} />
    <h4 className={"pd-left-1  text-disabled"}>PREV.</h4>
  </Button>
);
const enableNextBtn = (nextStep) => (
  <Button
    type='text'
    className='flex-container item-center'
    onClick={nextStep}
    style={{ float: "right" }}>
    <h4 className={"pd-right-1 button-icon"}>NEXT</h4>

    <ArrowRightOutlined className={"font-25 button-icon"} />
  </Button>
);
const getProgessColor = (percent) => {
  console.log("%%%%% ", percent, typeof percent);
  let color = "#FFF400";
  switch (true) {
    case percent === 100:
      color = "#0ddd10";
      break;
    case percent > 75:
      color = "#0dddc5";
      break;
    case percent > 50:
      color = "#0CBDE0";
      break;
    case percent > 25:
      color = "#FFF400";
      break;
    case percent > 0:
      color = "#FFA700";
      break;
    default:
      break;
  }
  return color;
};

const ProductionHeader = ({ current, title }) => {
  const { form, step, setStep } = useContext(ProductionContext);
  const { start: timesheet } = useSelector(
    (state) => state.production.timesheet
  );
  const nextStep = () => {
    setStep({
      ...step,
      currentIndex: step.currentIndex + 1,
      current: step.stepList[step.currentIndex + 1].machine_process_id,
    });
  };
  const prevStep = () =>
    setStep({
      ...step,
      currentIndex: step.currentIndex - 1,
      current: step.stepList[step.currentIndex - 1].machine_process_id,
    });

  const getNextStepBtn = (current, step) => {
    switch (current) {
      case 1:
        return form.plan.plan_job_id
          ? enableNextBtn(nextStep)
          : disabledNextBtn(current);
      case 2:
        return enableNextBtn(nextStep);
      // return form.rmChecking.progress === 100.00
      //   ? enableNextBtn(nextStep)
      //   : disabledNextBtn(current);
      case 3:
        return form.worker.length > 0
          ? enableNextBtn(nextStep)
          : disabledNextBtn(current);
      case 4:
      default:
        return null;
    }
  };
  console.log("header", current, title, step);
  return (
    <>
      <Row className='col-2 mt-1 mb-1 under-line'>
        <ProductionCostCenterTag />
        <Col span={4} className='text-left'>
          {current === 4 && timesheet.time_sheet_id ? (
            disabledPrevBtn(current)
          ) : (
            <Button
              type='text'
              className='flex-container item-center '
              onClick={prevStep}>
              <ArrowLeftOutlined className={"font-25 button-icon"} />
              <h4 className={"pd-left-1 button-icon"}>PREV.</h4>
            </Button>
          )}
        </Col>
        <Col span={16} className='text-center'>
          <h2>{title}</h2>
        </Col>
        <Col span={4} className='text-right'>
          {getNextStepBtn(current, step)}
        </Col>
        {current === 2 && (
          <Progress
            strokeColor={getProgessColor(form.rmChecking.progress)}
            percent={form.rmChecking.progress}
            {...(form.rmChecking.progress < 100 && { status: "active" })}
          />
        )}
      </Row>
    </>
  );
};

export default React.memo(ProductionHeader);
