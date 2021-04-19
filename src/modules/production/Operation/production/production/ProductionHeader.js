import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button, Col, Progress, Row } from "antd";
import React, { useContext } from "react";
import { ProductionContext } from "../../../../../include/js/context";
import ProductionCostCenterTag from "../ProductionCostCenterTag";

const ProductionHeader = ({ current, title }) => {
  const { form, step, setStep } = useContext(ProductionContext);

  const nextStep = () => setStep({ ...step, current: step.current + 1 });
  const prevStep = () => setStep({ ...step, current: step.current - 1 });
  const getNextStepBtn = (current, step) => {
    if (current === 1) {
      return (
        <Button
          type="text"
          className="flex-container item-center"
          onClick={nextStep}
          style={{ float: "right" }}
          disabled={form.rmChecking.progress === 100 ? false : true}
        >
          <h4
            className={
              form.rmChecking.progress === 100
                ? "pd-right-1 button-icon"
                : "pd-right-1 text-disabled"
            }
          >
            NEXT
          </h4>

          <ArrowRightOutlined
            className={
              form.rmChecking.progress === 100
                ? "font-25 button-icon"
                : "font-25 text-disabled"
            }
          />
        </Button>
      );
    } else {
      if (current >= step.stepList.length - 1) return null;
      return (
        <Button
          type="text"
          className="flex-container item-center"
          onClick={nextStep}
          style={{ float: "right" }}
        >
          <h4 className={"pd-right-1 button-icon"}>NEXT</h4>

          <ArrowRightOutlined className={"font-25 button-icon"} />
        </Button>
      );
    }
  };
  console.log("header", current, title, step);
  return (
    <>
      <Row className="col-2 mt-1 mb-1 under-line">
        <ProductionCostCenterTag />
        <Col span={4} className="text-left">
          {current > 0 && (
            <Button
              type="text"
              className="flex-container item-center "
              //   disabled={!state.rmForm.validate}
              onClick={prevStep}
            >
              <ArrowLeftOutlined
                className={
                  //   state.rmForm.validate
                  //     ?
                  "font-25 button-icon"
                  // : "font-25 text-disabled"
                }
              />
              <h4
                className={
                  //   state.rmForm.validate
                  //     ?
                  "pd-left-1 button-icon"
                  // : "pd-left-1 text-disabled"
                }
              >
                PREV.
              </h4>
            </Button>
          )}
        </Col>
        <Col span={16} className="text-center">
          <h2>{title}</h2>
        </Col>
        <Col span={4} className="text-right">
          {getNextStepBtn(current, step)}
        </Col>
        {current === 1 && (
          <Progress
            percent={form.rmChecking.progress}
            {...(form.rmChecking.progress < 100 && { status: "active" })}
          />
        )}
      </Row>
    </>
  );
};

export default React.memo(ProductionHeader);
