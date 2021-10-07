import { Col, message, Row } from "antd";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import {
  confirmTimesheet,
  resetTimesheetCtrl,
  setTimesheet,
  setTimesheetCtrl,
  updateTimesheet,
} from "../../../../actions/production/timesheetActions";
import { useFetch } from "../../../../include/js/customHooks";
import { convertDigit } from "../../../../include/js/main_config";
import JobInfo from "./display/JobInfo";
import TableLog from "./display/TableLog";
import Timer from "./display/Timer";
import { TimesheetContext } from "./TimeSheet";
export const TSCtrlContext = React.createContext();
const apiTSLog = `/production/time_sheet`;
let timer = null;
const TimesheetDisplay = () => {
  const dispatch = useDispatch();
  const {
    user_name,
    selectedWorker,
    controller: { timesheetID, on_time_sheet_type_id },
  } = useContext(TimesheetContext);
  const tsLog = useFetch(`${apiTSLog}/${timesheetID}`, !timesheetID);

  const [loading, setLoading] = useState(false);

  const startTimer = (startTime) => {
    var startTimestamp = startTime
      ? moment(startTime, "DD/MM/YYYY HH:mm:ss")
      : moment().startOf("day");
    var now = moment().format("DD/MM/YYYY HH:mm:ss");
    var nowTimeStamp = moment(now, "DD/MM/YYYY HH:mm:ss");
    var diff = moment.utc(nowTimeStamp.diff(startTimestamp));

    timer = setInterval(() => {
      const counter = diff.add(1, "second").format("HH:mm:ss").split(":");
      document.getElementById("counter-hh").innerHTML = counter[0];
      document.getElementById("counter-mm").innerHTML = counter[1];
      document.getElementById("counter-ss").innerHTML = counter[2];
    }, 1000);
  };
  const stopTimer = () => {
    clearInterval(timer);
    [...document.getElementsByClassName("ts-timer-counter")].forEach((ele) => {
      ele.innerHTML = "00";
      return false;
    });
  };

  const onClickController = async ({
    time_sheet_type_id,
    time_sheet_status_id,
    time_sheet_log_qty,
    time_sheet_log_remark,
  }) => {
    setLoading(true);
    console.log("click time_sheet_type_id", time_sheet_type_id);
    // setTimeout(() => {
    const updateData = [
      {
        time_sheet_type_id,
        time_sheet_status_id,
        user_name,
        time_sheet_log_qty,
        time_sheet_log_remark,
        commit: 1,
        time_sheet_remark: null,
      },
    ];
    console.log("onClickController", updateData);
    const resp = await updateTimesheet(timesheetID, updateData);
    if (resp.success) {
      dispatch(
        setTimesheetCtrl({
          on_time_sheet_type_id:
            time_sheet_status_id === 3 || time_sheet_type_id === 6
              ? null
              : time_sheet_type_id,
        })
      );
      // time_sheet_status_id === 3 ? stopTimer() : startTimer();
      tsLog.fetchData();
    } else {
      message.error(`Internal Server Error!. ${resp.message}`);
    }

    message.info(`${time_sheet_log_remark}`);

    setLoading(false);
  };

  const onConfirmJob = async (job) => {
    const { job_order_no, plan_job_id } = job || {};
    setLoading(true);
    const confirmData = [
      {
        plan_job_id,
        user_name,
        time_sheet_remark: "Confirm Job.",
        commit: 1,
        time_sheet_user_detail: selectedWorker?.map((user_name) => ({
          user_name,
        })),
      },
    ];
    console.log("confirmData", confirmData);
    const resp = await confirmTimesheet(confirmData);
    if (resp.success) {
      const { time_sheet_id } = resp?.data || {};
      if (!time_sheet_id) {
        message.error("Internal Server Error. Missing time_sheet_id");
      } else {
        message.success(`ยืนยัน Job : ${job_order_no} เสร็จสิ้น`);
        message.info(`แผงควบคุมการทำงานสามารถใช้งานได้แล้ว.`, 6);
        dispatch(
          setTimesheetCtrl({
            timesheetID: time_sheet_id,
            on_time_sheet_type_id: 0,
          })
        );
      }
    } else {
      message.error(`Internal Server Error. ${resp.message}`);
    }
    setLoading(false);
  };

  const onCloseJob = React.useCallback(() => {
    Swal.fire({
      title: "บันทึกยอด และการจบการทำงาน ?",
      text: "หากกด บันทึก ระบบจะปิดงานที่ทำอยู่ และจะพาคุณไปยังหน้าแรก",
      confirmButtonText: "บันทึก",
      cancelButtonText: "ยกเลิก",
      showCancelButton: true,
      inputLabel: "ระบุยอดการผลิต :",
      input: "text",
      inputValidator: (val) => {
        if (!parseFloat(val)) {
          return "กรุณาระบุจำนวนเป็นตัวเลข";
        } else {
          return false;
        }
      },
    }).then(({ isConfirmed, value }) => {
      if (isConfirmed) {
        console.log("value is", convertDigit(value + 0, 6));
        message.success(`ปิดงานเรียบร้อยแล้ว ${value}`);
        onClickController({
          time_sheet_status_id: 4,
          time_sheet_type_id: 6,
          tg_trans_status_id: 4,
          time_sheet_log_qty: value,
          time_sheet_log_remark: `จบการทำงาน`,
        });
        dispatch(
          setTimesheet({
            closeJob: true,
          })
        );
        // dispatch(
        //   setTimesheet({
        //     plan_job_id: null,
        //     step: 2,
        //     selectedWorker: [],
        //   })
        // );
        // dispatch(resetTimesheetCtrl());
      }
    });
  }, [dispatch, onClickController, timesheetID]);

  const tsCtrlContextValue = React.useMemo(
    () => ({
      tsLog,
      onClickController,
      loading,
      onConfirmJob,
      onCloseJob,
    }),
    [
      timesheetID,
      loading,
      setLoading,
      onClickController,
      onConfirmJob,
      tsLog,
      onCloseJob,
    ]
  );

  useEffect(() => {
    if (tsLog.data) {
      const {
        data: { time_sheet_log_detail },
      } = tsLog;
      if (time_sheet_log_detail?.length) {
        const { time_sheet_log_date_from, time_sheet_log_date_to } =
          time_sheet_log_detail[time_sheet_log_detail.length - 1];
        if (time_sheet_log_date_from && !time_sheet_log_date_to) {
          startTimer(time_sheet_log_date_from);
        } else {
          stopTimer();
        }
      }
    }
    return () => {
      clearInterval(timer);
    };
  }, [timesheetID, on_time_sheet_type_id, tsLog]);

  useEffect(() => {
    !timesheetID &&
      message.info("กรุณาตรวจสอบ และยืนยันข้อมูล Job ก่อนเริ่มดำเนินการ", 4);
  }, [timesheetID]);
  return (
    <TSCtrlContext.Provider value={tsCtrlContextValue}>
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
              span={15}
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
            <Col span={9}>
              <Timer />
            </Col>
          </Row>
        </div>
      </div>
    </TSCtrlContext.Provider>
  );
};

export default React.memo(TimesheetDisplay);
