import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CheckOutlined,
  ProfileOutlined,
  ReloadOutlined,
  SearchOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Button, Col, Progress, Row } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProductionCostCenterTag from "./ProductionCostCenterTag";
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

const ProductionContents = (props) => {
  // const { setPage, setConfig } = useContext(PageContext);
  const locationState = props?.location?.state;
  const lsCostcenter = JSON.parse(localStorage.getItem("cost_center"));
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
        "Job Detail",
        "Raw Material Check",
        "Select Worker",
        "Start Process",
        "Result",
      ],
      step: [
        <>
          <SearchOutlined /> Job Detail
        </>,
        <>
          <ProfileOutlined /> RM Check
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
      progress: 100,
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

  const getNextStepBtn = ({ current, progress, step }) => {
    if (current === 1) {
      return (
        <Button
          type="text"
          className="flex-container item-center"
          onClick={nextStep}
          style={{ float: "right" }}
          disabled={state.rmForm.progress === 100 ? false : true}
        >
          <h4
            className={
              state.rmForm.progress === 100
                ? "pd-right-1 button-icon"
                : "pd-right-1 text-disabled"
            }
          >
            NEXT
          </h4>

          <ArrowRightOutlined
            className={
              state.rmForm.progress === 100
                ? "font-25 button-icon"
                : "font-25 text-disabled"
            }
          />
        </Button>
      );
    } else {
      if (current >= step.length - 1) return null;
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
  return (
    <>
      <Row className="mt-1">
        <Col span={5}>
          <ProductionJobList dataSource={mockupData} />
        </Col>
        <Col span={19}>
          <div className={"paper mr-1 ml-1 pt-1 pb-2"}>
            <ProductionCostCenterTag title={lsCostcenter} />

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
                      PREV.
                    </h4>
                  </Button>
                )}
              </Col>
              <Col span={16} className="text-center">
                <h2>{state.step.stepName[state.step.current]}</h2>
              </Col>
              <Col span={4} className="text-right">
                {getNextStepBtn(state.step)}
              </Col>
              {state.step.current === 1 && (
                <Progress
                  percent={state.rmForm.progress}
                  {...(state.rmForm.progress < 100 && { status: "active" })}
                />
              )}
            </Row>
            <ProductionStepSwitch step={state.step} state={state} />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default React.memo(ProductionContents);
