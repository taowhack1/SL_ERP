import {
  Button,
  Col,
  Table,
  Modal,
  InputNumber,
  Divider,
  message,
  Input,
} from "antd";
import Text from "antd/lib/typography/Text";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Row } from "react-flexbox-grid";
import Btn from "./Btn";
import Display from "./Display";
import { detail, detailColumns, mockupdata } from "./timeConfig";
import {
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { getNumberFormat } from "../../../../../../include/js/main_config";
import moment from "moment";
import CustomTable from "../../../../../../components/CustomTable";
import CustomClock from "../../../../../../components/CustomClock";
import { ProductionContext } from "../../../../../../include/js/context";
import { useDispatch, useSelector } from "react-redux";
import TimeSheetDetail from "./TimeSheetDetail";
import {
  startTimesheet,
  START_TIMESHEET,
  updateTimesheet,
} from "../../../../../../actions/production/timesheetActions";
import TimesheetTableLog from "./TimesheetTableLog";
import TimesheetTableLogEdit from "./TimesheetTableLogEdit";
const { confirm, warning } = Modal;

const TimeSheet = (props) => {
  const dispatch = useDispatch();
  const { form } = useContext(ProductionContext);
  const { start: timesheet, machine } = useSelector(
    (state) => state.production.timesheet
  );

  const [time, setTime] = useState({ s: 0, m: 0, h: 0 });
  const [interv, setInterv] = useState();
  const [status, setStatus] = useState(0);

  var updatedS = time.s,
    updatedM = time.m,
    updatedH = time.h;
  const run = () => {
    if (updatedM === 60) {
      updatedH++;
      updatedM = 0;
    }
    if (updatedS === 60) {
      updatedM++;
      updatedS = 0;
    }
    updatedS++;
    return setTime({ s: updatedS, m: updatedM, h: updatedH });
  };
  // const updateQuantity = (id, qty) => {
  //   setTimesheetLog(
  //     timesheetLog.map((obj) =>
  //       obj.id === id ? { ...obj, time_sheet_log_qty: qty } : obj
  //     )
  //   );
  // };
  const reset = () => {
    console.log("reset");
    clearInterval(interv);
    setStatus(0);
    setTime({ s: 0, m: 0, h: 0 });
  };
  // console.log("dataHead", dataHead);
  // useEffect(() => {
  //   console.log("log has changed........");
  //   setTimesheetLog(time_sheet_log_detail);
  // }, [time_sheet_log_detail]);
  const timeValue = useMemo(() => time, [time]);
  const btnConfig = useMemo(() => {
    const resume = () => start();

    const start = () => {
      run();
      setStatus(1);
      setInterv(setInterval(run, 1000));
    };
    const stop = () => {
      clearInterval(interv);
      setStatus(0);
    };
    const showConfirmstop = (type) => {
      confirm({
        title: "Confirm Stop",
        icon: <ExclamationCircleOutlined />,
        okText: "YES",
        cancelText: "NO",
        content: (
          <>
            {machine.machine_process_qty ? (
              <div>
                <label htmlFor="time_sheet_log_qty">
                  <b>Input Quantity</b>
                </label>
                <InputNumber
                  {...getNumberFormat(3)}
                  min={0}
                  step={1}
                  name="time_sheet_log_qty"
                  className="full-width"
                  id="time_sheet_log_qty"
                />
              </div>
            ) : (
              <Text strong>Are you sure your want to stop timesheet ?.</Text>
            )}
            {type === "issue" && (
              <div className="mt-1">
                <label htmlFor="time_sheet_log_qty">
                  <b>Issue Remark</b>
                </label>
                <Input
                  minLength={5}
                  name="time_sheet_log_remark"
                  className="full-width"
                  id="time_sheet_log_remark"
                />
              </div>
            )}
          </>
        ),
        okButtonProps: () => {
          let disableBtn = false;
          const inputEl = document.getElementById("time_sheet_log_qty");
          const remarkEl = document.getElementById("time_sheet_log_remark");
          if (inputEl && !inputEl.value) disableBtn = true;
          if (remarkEl && !remarkEl.value) disableBtn = true;
          console.log("disabledBtn", disableBtn);
          return {
            disabled: disableBtn,
          };
        },
        onOk(close) {
          const inputEl = document.getElementById("time_sheet_log_qty");
          const remarkEl = document.getElementById("time_sheet_log_remark");
          if (inputEl && !inputEl.value) {
            message.warning("Quantity field is empty");
            return false;
          }
          if (remarkEl && !remarkEl.value) {
            message.warning("Issue remark field is empty");
            return false;
          }
          const saveTimesheet = async () => {
            const resp = await updateTimesheet(
              {
                ...timesheet,
                time_sheet_log_qty: inputEl ? inputEl.value : null,
                time_sheet_log_remark: remarkEl ? remarkEl.value : null,
              },
              timesheet.time_sheet_id,
              3
            );
            console.log("TIMSHEET IS STOPPED ", resp);
            if (resp.success) {
              reset();
              dispatch({
                type: START_TIMESHEET,
                payload: resp.data,
              });
              close();
            } else {
              console.log("success false ERRORRRRRR !!");
            }
          };
          saveTimesheet();
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    };
    const showConfirmstart = () => {
      confirm({
        title: "Confirm Start",
        icon: <ExclamationCircleOutlined />,
        content: (
          <>
            <Text>
              Are you sure your want to start timesheet ?<br />
            </Text>
            {!timesheet.time_sheet_id && (
              <Text>
                If you click <b>YES</b> that mean you can't change data before
              </Text>
            )}
          </>
        ),

        okText: "YES",
        cancelText: "NO",
        confirmLoading: true,
        onOk(close) {
          const saveTimesheet = async () => {
            const resp = timesheet.time_sheet_id
              ? await updateTimesheet(timesheet, timesheet.time_sheet_id, 2)
              : await startTimesheet(form.save);

            console.log("TIMSHEET IS STARTED ", resp);
            if (resp.success) {
              start();

              dispatch({
                type: START_TIMESHEET,
                payload: resp.data,
              });
              close();
            } else {
              console.log("Success false ERRORRRRRR !!");
            }
          };
          saveTimesheet();
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    };
    const showConfirmbreak = () => {
      confirm({
        title: "Confirm Stop",
        icon: <ExclamationCircleOutlined />,
        content: "",
        okText: "YES",
        cancelText: "NO",
        onOk() {
          stop();
          dispatch(updateTimesheet(timesheet, timesheet.time_sheet_id, 3));
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    };

    return {
      status,
      resume,
      showConfirmstart,
      showConfirmbreak,
      showConfirmstop,
    };
  }, [status, timesheet, timesheet.time_sheet_id]);
  const showConfirmEditQty = () => {
    confirm({
      title: "Confirm Edit Quantity",
      icon: <ExclamationCircleOutlined />,
      content: "",
      okText: "YES",
      cancelText: "NO",
      onOk() {
        setStatus(2);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  console.log(status);
  return (
    <div className={"pd-left-1 pd-right-1"}>
      <Row>
        <Col span={15} className="col-border-right" style={{ height: "90vh" }}>
          <TimeSheetDetail
            status={status}
            setStatus={setStatus}
            showConfirmEditQty={showConfirmEditQty}
          />
          {status === 2 ? (
            <TimesheetTableLogEdit setStatus={setStatus} />
          ) : (
            <TimesheetTableLog
              status={status}
              setStatus={setStatus}
              showConfirmEditQty={showConfirmEditQty}
            />
          )}
        </Col>
        <Col span={9}>
          <div className="timer-container">
            <div className="stopwatch">
              <Display time={timeValue} />
              <Btn {...btnConfig} />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default TimeSheet;
