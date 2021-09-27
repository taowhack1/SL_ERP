import { message } from "antd";
import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { setTimesheet } from "../../../../actions/production/timesheetActions";
import TimesheetRPMCheck from "./checkRPM/TimesheetRPMCheck";
import { TimesheetContext } from "./TimeSheet";
import TimesheetDisplay from "./TimesheetDisplay";
import TimesheetJobList from "./TimesheetJobList";
import TimeSheetWorkCenter from "./TimeSheetWorkCenter";
import TimesheetWorker from "./TimesheetWorker";

const TimeSheetSwitch = () => {
  const dispatch = useDispatch();
  const { step, workCenter } = useContext(TimesheetContext);
  const { machine_process_scan } = workCenter || {
    machine_process_scan: false,
  };
  const onSkip = () => dispatch(setTimesheet({ step: step + 1 }));
  console.log("machine_process_scan", machine_process_scan);
  return (
    <>
      {/* <h1>Use This Component to Switch Step 1,2,...,n from timesheet.step</h1>
      <br /> */}
      {getTimeSheetComponents({ step, machine_process_scan, onSkip })}
    </>
  );
};

export default React.memo(TimeSheetSwitch);

const getTimeSheetComponents = ({ step = 1, machine_process_scan, onSkip }) => {
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
      return <>{machine_process_scan && <TimesheetRPMCheck />}</>;
    // if (machine_process_scan) {
    //   return (
    //     <>
    //       <TimesheetRPMCheck />
    //     </>
    //   );
    // }
    //  else {
    // onSkip();
    //   return false;
    // }
    case step === 5:
      return (
        <>
          <TimesheetDisplay />
        </>
      );
    case step === 6:
      return (
        <>
          <h1>{`STEP : ${step}`}</h1>
        </>
      );
    default:
      return (
        <>
          <h1>{`ไม่พบข้อมูล STEP การทำงาน. กรุณาตั้งค่า STEP การทำงาน หรือ แจ้งปัญหานี้กับโปรแกรมเมอร์.`}</h1>
        </>
      );
  }
};
