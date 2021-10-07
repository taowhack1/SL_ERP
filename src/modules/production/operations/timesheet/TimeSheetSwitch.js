import { message } from "antd";
import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import {
  resetTimesheetCtrl,
  setTimesheet,
} from "../../../../actions/production/timesheetActions";
import TimesheetRPMCheck from "./checkRPM/TimesheetRPMCheck";
import { TimesheetContext } from "./TimeSheet";
import TimesheetDisplay from "./TimesheetDisplay";
import TimesheetJobList from "./TimesheetJobList";
import TimeSheetWorkCenter from "./TimeSheetWorkCenter";
import TimesheetWorker from "./TimesheetWorker";

const TimeSheetSwitch = () => {
  const dispatch = useDispatch();
  const { step } = useContext(TimesheetContext);
  return <>{getTimeSheetComponents({ step, dispatch })}</>;
};

export default React.memo(TimeSheetSwitch);

const getTimeSheetComponents = ({ step = 1, dispatch }) => {
  switch (true) {
    case step === 1:
      return (
        <>
          <TimeSheetWorkCenter />
        </>
      );
    case step === 2:
      return (
        <>
          <TimesheetJobList />
        </>
      );
    case step === 3:
      return (
        <>
          <TimesheetWorker />
        </>
      );
    case step === 4:
      return (
        <>
          <TimesheetRPMCheck />
        </>
      );
    case step === 5:
      return (
        <>
          <TimesheetDisplay />
        </>
      );
    case step === 6:
      dispatch(
        setTimesheet({
          plan_job_id: null,
          step: 2,
          closeJob: false,
          selectedWorker: [],
        })
      );
      dispatch(resetTimesheetCtrl());
      break;
    default:
      return (
        <>
          <h1>{`ไม่พบข้อมูล STEP การทำงาน. กรุณาแจ้งปัญหานี้กับโปรแกรมเมอร์.`}</h1>
        </>
      );
  }
};
