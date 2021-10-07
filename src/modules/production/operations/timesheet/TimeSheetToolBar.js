import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button, Col, Progress, Row } from "antd";
import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { setTimesheet } from "../../../../actions/production/timesheetActions";
import { convertDigit } from "../../../../include/js/main_config";
import { TimesheetContext } from "./TimeSheet";
const TimeSheetToolBar = () => {
  const dispatch = useDispatch();
  const timesheet = useContext(TimesheetContext);
  const {
    step,
    job,
    workCenter,
    rpmChecking: { progress },
    closeJob = false,
  } = timesheet;

  const { machine_process_scan } = workCenter || {
    machine_process_scan: false,
  };

  const onPrev = () => {
    if (step === 5 && !machine_process_scan) {
      dispatch(setTimesheet({ step: 3 }));
    } else {
      dispatch(setTimesheet({ step: step - 1 || 1 }));
    }
  };
  const onNext = () => {
    if (step === 3 && !machine_process_scan) {
      dispatch(setTimesheet({ step: 5 }));
    } else {
      dispatch(setTimesheet({ step: step + 1 }));
    }
  };
  console.log("SELETC JOB", job);
  return (
    <Row>
      <Col span={24}>
        <div className="timesheet-tool-bar under-line">
          <div className="timesheet-tool-bar-menu">
            <div className="timesheet-menu-left">
              <Button
                className="btn-prev"
                onClick={onPrev}
                disabled={getPrevBtnStatus(timesheet)}
              >
                <ArrowLeftOutlined />
                PREV
              </Button>
            </div>
            <div className="timesheet-menu-center">
              <h2>{"Time sheet" || "-"}</h2>
            </div>
            <div className="timesheet-menu-right">
              <Button onClick={onNext} disabled={getNextBtnStatus(timesheet)}>
                {closeJob ? "เลือกงานอื่น" : "NEXT"}
                <ArrowRightOutlined />
              </Button>
            </div>
          </div>
        </div>
        {step === 4 && (
          <div style={{ width: "100%", padding: "0px 20px" }}>
            <Progress
              strokeColor={{
                from: progress < 20 ? "red" : "yellow",
                to: progress < 20 ? "orange" : "#87d068",
              }}
              percent={convertDigit(progress, 2)}
              status="active"
            />
          </div>
        )}
      </Col>
    </Row>
  );
};

export default React.memo(TimeSheetToolBar);

const getNextBtnStatus = ({
  step = 1,
  workCenterID = null,
  plan_job_id = null,
  selectedWorker = [],
  rpmChecking: { progress = 0 },
  closeJob = false,
  job = [],
}) => {
  console.log("check NEXT 4 ", convertDigit(progress, 2), convertDigit(100, 2));
  const { tg_trans_close_id, plan_job_plan_ready } =
    (job?.length && job[0]) || {};

  // let disabled = false;
  let disabled = true;
  if (
    ([1].includes(step) && ![5].includes(step) && workCenterID) ||
    ([2].includes(step) && plan_job_id && [1].includes(plan_job_plan_ready)) ||
    ([3].includes(step) && selectedWorker?.length > 0) ||
    ([4].includes(step) && true) ||
    // ([4].includes(step) &&
    //   convertDigit(progress, 2) === convertDigit(100, 2)) ||
    ([5].includes(step) && closeJob)
  ) {
    disabled = false;
  }
  return disabled;
};
const getPrevBtnStatus = ({ step = 1, controller: { timesheetID = null } }) => {
  let disabled = false;
  if ([1].includes(step) || timesheetID) {
    disabled = true;
  }
  return disabled;
};
