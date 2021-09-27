import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTimesheet,
  updateTimesheet,
} from "../../../../actions/production/timesheetActions";
import { TimesheetContext } from "./TimeSheet";
const config = {
  menu: "MENU NAME",
};
const TimeSheetToolBar = () => {
  const dispatch = useDispatch();
  const { step, workCenterID } = useContext(TimesheetContext);
  const onPrev = () => dispatch(setTimesheet({ step: step - 1 || 1 }));
  const onNext = () => dispatch(setTimesheet({ step: step + 1 }));
  return (
    <Row>
      <Col span={24}>
        <div className="timesheet-tool-bar under-line">
          <div className="timesheet-tool-bar-menu">
            <div className="timesheet-menu-left">
              <Button
                className="btn-prev"
                onClick={onPrev}
                disabled={[1].includes(step)}
              >
                <ArrowLeftOutlined />
                PREV
              </Button>
            </div>
            <div className="timesheet-menu-center">
              <h2>{"Time sheet" || "-"}</h2>
            </div>
            <div className="timesheet-menu-right">
              <Button
                onClick={onNext}
                disabled={getNextBtnStatus({ step, workCenterID })}
              >
                NEXT <ArrowRightOutlined />
              </Button>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default React.memo(TimeSheetToolBar);

const getNextBtnStatus = ({ step = 1, workCenterID = null }) => {
  let disabled = true;
  if ((step = 1 && workCenterID)) {
    disabled = false;
  }
  return disabled;
};
