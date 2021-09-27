import { Col, Row } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { useFetch } from "../../../../include/js/customHooks";
import TimeSheetSwitch from "./TimeSheetSwitch";
import TimeSheetToolBar from "./TimeSheetToolBar";
export const TimesheetContext = React.createContext();
const apiJob = `/production/plan_job`;
const apiWorkCenter = `/production/machine/plan_job`;
const TimeSheet = () => {
  const { timesheet } = useSelector((state) => state?.production?.operations);
  const { workCenterID, plan_job_id, step } = timesheet;
  //get Plan
  const {
    data: job,
    error: getJobError,
    loading: getJobLoading,
  } = useFetch(`${apiJob}/${plan_job_id}`, plan_job_id ? false : true);
  // get Machine Detail
  const {
    data: workCenter,
    error: getworkCenterError,
    loading: getworkCenterLoading,
  } = useFetch(`${apiWorkCenter}/${workCenterID}`, workCenterID ? false : true);
  console.log("job", job);
  console.log("workCenter", workCenter);
  const contextValue = React.useMemo(
    () => ({
      ...timesheet,
      job,
      getJobError,
      getJobLoading,
      workCenter,
      getworkCenterError,
      getworkCenterLoading,
    }),
    [
      timesheet,
      job,
      getJobError,
      getJobLoading,
      workCenter,
      getworkCenterError,
      getworkCenterLoading,
    ]
  );

  return (
    <div>
      <TimesheetContext.Provider value={contextValue}>
        {/* <Row className="col-2">
          <Col span={24}>
            <h2>
              {`Work Center : ${workCenterID || "-"} , Job : ${
                plan_job_id || "-"
              } , Step : ${step}`}
            </h2>
          </Col>
        </Row> */}
        <Row>
          <Col span={24}>
            <TimeSheetToolBar />
            <TimeSheetSwitch />
          </Col>
        </Row>
      </TimesheetContext.Provider>
    </div>
  );
};

export default React.memo(TimeSheet);
