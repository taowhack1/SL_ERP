import { Col, message, Row } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setTimesheetCtrl } from "../../../../actions/production/timesheetActions";
import JobInfo from "./display/JobInfo";
import TableLog from "./display/TableLog";
import Timer from "./display/Timer";
import { TimesheetContext } from "./TimeSheet";
export const TSCtrlContext = React.createContext();
const TimesheetDisplay = () => {
  const dispatch = useDispatch();
  const {
    controller: { timesheetID, on_time_sheet_type_id },
  } = useContext(TimesheetContext);
  const [loading, setLoading] = useState(false);

  const onClickController = async ({ time_sheet_type_id }) => {
    setLoading(true);
    console.log("click time_sheet_type_id", time_sheet_type_id);
    setTimeout(() => {
      if (on_time_sheet_type_id === time_sheet_type_id) {
        message.info(`จบการทำงาน : ${time_sheet_type_id}`);
        dispatch(
          setTimesheetCtrl({
            on_time_sheet_type_id: null,
          })
        );
      } else {
        message.info(`เริ่มการทำงาน : ${time_sheet_type_id}`);
        dispatch(
          setTimesheetCtrl({
            on_time_sheet_type_id: time_sheet_type_id,
          })
        );
      }

      setLoading(false);
    }, 800);
  };

  const tSCtrlContextValue = React.useMemo(
    () => ({
      onClickController,
      loading,
    }),
    [loading, setLoading, onClickController]
  );

  useEffect(() => {
    message.info("กรุณาตรวจสอบ และยืนยันข้อมูล Job ก่อนเริ่มดำเนินการ", 4);
  }, []);
  return (
    <TSCtrlContext.Provider value={tSCtrlContextValue}>
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#E6E6E6",
          padding: 10,
        }}
      >
        <div className="ts-container">
          <Row className="col-2" gutter={24} style={{ height: "100%" }}>
            <Col
              span={12}
              className="col-border-right h-100"
              style={{ height: "100%" }}
            >
              <Row className="col-2">
                <Col span={24}>
                  <JobInfo />
                </Col>
                <Col span={24}>
                  <TableLog />
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Timer />
            </Col>
          </Row>
        </div>
      </div>
    </TSCtrlContext.Provider>
  );
};

export default React.memo(TimesheetDisplay);
