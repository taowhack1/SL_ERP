import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CheckOutlined,
  ProfileOutlined,
  ReloadOutlined,
  TeamOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PageContext } from "../../../../include/js/context";
import ProductionJobList from "./ProductionJobList";
import ProductionRMCheck from "./ProductionRMCheck";
import ProductionStepSwitch from "./ProductionStepSwitch";

const ProductionMain = (props) => {
  const { setPage, setConfig } = useContext(PageContext);
  const locationState = props?.location?.state;
  const current_project = useSelector((state) =>
    state.auth.projects?.find((project) =>
      project.project_name.toLowerCase().includes("production")
    )
  );
  const current_menu = useSelector((state) =>
    state.auth.menus.find(
      (menu) =>
        menu.project_id === current_project.project_id &&
        menu.menu_name.toLowerCase().includes("production")
    )
  );
  const [state, setState] = useState({
    step: {
      current: 0,
      stepName: [
        "Raw Material Check",
        "Select Machine",
        "Select Worker",
        "Start Process",
        "Result",
      ],
      step: [
        <>
          <ProfileOutlined /> RM Check
        </>,
        <>
          <ToolOutlined /> Machine
        </>,
        <>
          <TeamOutlined /> Worker
        </>,
        <>
          <ReloadOutlined spin={true} /> Start
        </>,
        <>
          <CheckOutlined /> End
        </>,
      ],
    },
    rmForm: {
      validate: true,
      loading: false,
      data: [],
    },
  });
  console.log("current_project", current_project);
  console.log("current_menu", current_menu);
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: ["Home", "Operation", "Production"],
    search: false,
    create: "/production/operations/production/create",
    buttonAction: current_menu.button_create !== 0 ? ["Create"] : ["Back"],
    edit: {},
    step: state.step,
    back: "/production",
    onCancel: () => {
      console.log("Cancel");
    },
  };
  useEffect(() => {
    setConfig(config);
  }, []);
  let mockupData = [];
  for (let i = 0; i < 30; i++) {
    mockupData.push({
      id: i,
      so_no: "[ MRP2103000" + i + " ] SO2103000" + i,
      status: Math.round(Math.random()),
    });
  }
  const nextStep = () =>
    setState({
      ...state,
      step: { ...state.step, current: state.step.current + 1 },
    });
  const prevStep = () =>
    setState({
      ...state,
      step: { ...state.step, current: state.step.current - 1 },
    });
  console.log("locationState", mockupData);
  return (
    <>
      <Row style={{ marginTop: 10 }}>
        <Col span={5}>
          <ProductionJobList dataSource={mockupData} />
        </Col>
        <Col span={19}>
          <div className={"paper mr-1 ml-1 pt-1 pb-2"}>
            <Row className="col-2 mt-1 mb-1 under-line">
              <Col span={4} className="text-left">
                {state.step.current > 0 && (
                  <Button
                    type="text"
                    className="flex-container item-center "
                    disabled={!state.rmForm.validate}
                    onClick={prevStep}
                  >
                    <ArrowLeftOutlined
                      className={
                        state.rmForm.validate
                          ? "font-25 button-icon"
                          : "font-25 text-disabled"
                      }
                    />
                    <h4
                      className={
                        state.rmForm.validate
                          ? "pd-left-1 button-icon"
                          : "pd-left-1 text-disabled"
                      }
                    >
                      Back
                    </h4>
                  </Button>
                )}
              </Col>
              <Col span={16} className="text-center">
                <h2>{state.step.stepName[state.step.current]}</h2>
              </Col>
              <Col span={4} className="text-right">
                {state.step.current >= state.step.stepName.length - 1 ? null : (
                  <Button
                    type="text"
                    className="flex-container item-center"
                    disabled={!state.rmForm.validate}
                    onClick={nextStep}
                    style={{ float: "right" }}
                  >
                    <h4
                      className={
                        state.rmForm.validate
                          ? "pd-right-1 button-icon"
                          : "pd-right-1 text-disabled"
                      }
                    >
                      NEXT
                    </h4>

                    <ArrowRightOutlined
                      className={
                        state.rmForm.validate
                          ? "font-25 button-icon"
                          : "font-25 text-disabled"
                      }
                    />
                  </Button>
                )}
              </Col>
            </Row>
            {/* <div className="flex-container flex-row space-between under-line mt-1 mb-1">
              <div>
                {state.step.current > 0 && (
                  <Button
                    type="text"
                    className="flex-container item-center "
                    disabled={!state.rmForm.validate}
                    onClick={prevStep}
                  >
                    <ArrowLeftOutlined
                      className={
                        state.rmForm.validate
                          ? "font-25 button-icon"
                          : "font-25 text-disabled"
                      }
                    />
                    <h4
                      className={
                        state.rmForm.validate
                          ? "pd-left-1 button-icon"
                          : "pd-left-1 text-disabled"
                      }
                    >
                      Back
                    </h4>
                  </Button>
                )}
              </div>
              <div>
                <h2>{state.step.stepName[state.step.current]}</h2>
              </div>
              <div>
                {state.step.current >= state.step.stepName.length - 1 ? null : (
                  <Button
                    type="text"
                    className="flex-container item-center "
                    disabled={!state.rmForm.validate}
                    onClick={nextStep}
                  >
                    <h4
                      className={
                        state.rmForm.validate
                          ? "pd-right-1 button-icon"
                          : "pd-right-1 text-disabled"
                      }
                    >
                      NEXT
                    </h4>

                    <ArrowRightOutlined
                      className={
                        state.rmForm.validate
                          ? "font-25 button-icon"
                          : "font-25 text-disabled"
                      }
                    />
                  </Button>
                )}
              </div>
            </div> */}

            <ProductionStepSwitch step={state.step} state={state} />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default React.memo(ProductionMain);
