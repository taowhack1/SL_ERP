import { Col, Row } from "antd";
import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetch } from "../../../../include/js/customHooks";
import TimeSheetSwitch from "./TimeSheetSwitch";
import TimeSheetToolBar from "./TimeSheetToolBar";
import { AppContext } from "../../../../include/js/context";
import { setScanTimesheetRPMChecking } from "../../../../actions/production/timesheetActions";
export const TimesheetContext = React.createContext();
const apiJob = `/production/plan_job`;
const apiWorkCenter = `/production/machine/plan_job`;
const apiGetPartScanner = `/production/time_sheet/machine_process_scan`;
const TimeSheet = () => {
  const dispatch = useDispatch();
  const {
    auth: { user_name },
  } = useContext(AppContext);
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

  const { machine_process_scan } = workCenter || {
    machine_process_scan: false,
  };
  const { data: formula, loading: getLoadingFormula } = useFetch(
    `${apiGetPartScanner}/${plan_job_id}`,
    plan_job_id && machine_process_scan ? false : true
  );

  useEffect(() => {
    // ตั้งค่าเริ่มต้นให้ scanner
    console.log("setFormula");
    if (formula) {
      const bulkSpec = formula?.map(
        ({
          weight_machine_id,
          weight_machine_no,
          weight_machine_net,
          weight_machine_net_scan,
          item_part_no,
          item_no,
          stock_batch,
          uom_no,
        }) => ({
          weight_machine_id,
          weight_machine_no,
          weight_machine_net,
          weight_machine_net_scan,
          item_part_no,
          item_no,
          stock_batch,
          uom_no,
          isFullfill: false,
        })
      );
      dispatch(
        setScanTimesheetRPMChecking({ bulkSpec: bulkSpec, progress: 0 })
      );
    } else {
      dispatch(setScanTimesheetRPMChecking({ bulkSpec: [], progress: 0 }));
    }
  }, [formula]);

  const contextValue = React.useMemo(
    () => ({
      user_name,
      ...timesheet,
      job: plan_job_id ? job : [],
      getJobError,
      getJobLoading,
      workCenter,
      getworkCenterError,
      getworkCenterLoading,
      getLoadingFormula,
    }),
    [
      user_name,
      timesheet,
      job,
      getJobError,
      getJobLoading,
      workCenter,
      getworkCenterError,
      getworkCenterLoading,
      getLoadingFormula,
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
