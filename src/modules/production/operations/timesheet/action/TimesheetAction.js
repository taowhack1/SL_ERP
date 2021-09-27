import { Button, Col, Modal, InputNumber, message, Input } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useContext, useMemo, useState } from "react";
import { Row } from "react-flexbox-grid";
import {
  CheckCircleTwoTone,
  ExclamationCircleOutlined,
  ExportOutlined,
  PauseCircleTwoTone,
  PlayCircleTwoTone,
} from "@ant-design/icons";
import { getNumberFormat } from "../../../../../../include/js/main_config";
import { ProductionContext } from "../../../../../../include/js/context";
import { useDispatch, useSelector } from "react-redux";
import TimeSheetActionInfo from "./TimeSheetActionInfo";
import {
  CLOSE_TIMESHEET,
  startTimesheet,
  START_TIMESHEET,
  updateTimesheet,
} from "../../../../../../actions/production/timesheetActions";
import TimesheetTableLog from "./TimesheetTableLog";
import TimesheetTableLogEdit from "./TimesheetTableLogEdit";
const { confirm } = Modal;

const TimeSheetAction = (props) => {
  const dispatch = useDispatch();
  const { form } = useContext(ProductionContext);
  const { start: timesheet, machine } = useSelector(
    (state) => state.production.timesheet
  );

  const [time, setTime] = useState({ s: 0, m: 0, h: 0 });
  const [interv, setInterv] = useState();
  const [status, setStatus] = useState(0);
  const [stepBtn, setStepBtn] = useState("idel");
  console.log("time", time);
  var updatedS = time.s,
    updatedM = time.m,
    updatedH = time.h;
  const run = () => {
    if (updatedM === 59 && updatedS === 59) {
      updatedH++;
      updatedM = -1;
    }
    if (updatedS === 59) {
      updatedM++;
      updatedS = -1;
    }
    updatedS++;
    return setTime({ s: updatedS, m: updatedM, h: updatedH });
  };

  const reset = () => {
    console.log("reset");
    clearInterval(interv);
    setStatus(0);
    setTime({ s: 0, m: 0, h: 0 });
  };

  const timeValue = useMemo(() => time, [time]);
  const btnConfig = useMemo(() => {
    const resume = () => start();

    const start = (type) => {
      run();
      setStatus(1);
      setStepBtn(type);
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
            {type === "setup" ? (
              <>
                <div className="mt-1">
                  <label htmlFor="time_sheet_log_qty">
                    <b>Remark</b>
                  </label>
                  <Input
                    minLength={5}
                    name="time_sheet_log_remark"
                    className="full-width"
                    id="time_sheet_log_remark"
                  />
                </div>
              </>
            ) : type === "start" ? (
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
                  <Text strong>
                    Are you sure your want to stop timesheet ?.
                  </Text>
                )}
              </>
            ) : type === "clean" ? (
              <>
                <div className="mt-1">
                  <label htmlFor="time_sheet_log_qty">
                    <b>Remark</b>
                  </label>
                  <Input
                    minLength={5}
                    name="time_sheet_log_remark"
                    className="full-width"
                    id="time_sheet_log_remark"
                  />
                </div>
              </>
            ) : (
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
                  <Text strong>
                    Are you sure your want to stop timesheet ?.
                  </Text>
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
    const showConfirmstart = (type) => {
      console.log("type", type);

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
              start(type);

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
      stepBtn,
      resume,
      showConfirmstart,
      showConfirmbreak,
      showConfirmstop,
    };
  }, [status, stepBtn, timesheet, timesheet.time_sheet_id]);

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

  const confirmCloseJob = () => {
    confirm({
      title: "Confirm Close Job.",
      icon: <ExclamationCircleOutlined />,
      content: (
        <>
          <Text>
            Are you sure your want to close job ?<br />
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
          const resp = await updateTimesheet(
            timesheet,
            timesheet.time_sheet_id,
            4
          );

          console.log("TIMSHEET Closed ", resp);
          if (resp.success) {
            dispatch({
              type: CLOSE_TIMESHEET,
              payload: resp.data,
            });
            close();
          } else {
            console.log("Success false ERRORRRRRR !!");
          }
        };
        saveTimesheet();
        setStepBtn("close");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  console.log(status);
  return (
    <div className={"pd-left-1 pd-right-1"}>
      {timesheet.time_sheet_type_id === 4 ? (
        <>
          <div className="exit-label">
            <Button onClick={() => window.location.reload()}>
              <ExportOutlined /> Exit
            </Button>
          </div>
        </>
      ) : (
        <></>
      )}
      <Row>
        <Col span={15} className="col-border-right" style={{ height: "90vh" }}>
          <TimeSheetActionInfo
            status={status}
            setStatus={setStatus}
            stepBtn={stepBtn}
            showConfirmEditQty={showConfirmEditQty}
          />
          {status === 2 ? (
            <TimesheetTableLogEdit setStatus={setStatus} />
          ) : (
            <>
              <TimesheetTableLog status={status} setStatus={setStatus} />
              <div className="full-width mt-2" style={{ padding: "0px 20%" }}>
                <div className="flex-space">
                  <Button
                    block
                    onClick={confirmCloseJob}
                    className={
                      timesheet.time_sheet_type_id === 3
                        ? "primary timesheet-btn"
                        : "timesheet-btn"
                    }
                    disabled={timesheet.time_sheet_type_id === 3 ? false : true}
                  >
                    Close Job
                  </Button>
                  {/* <Button
                    block
                    className={"timesheet-btn"}
                    disabled={timesheet.time_sheet_type_id === 3 ? false : true}
                    onClick={showConfirmEditQty}>
                    Edit Quantity
                  </Button> */}
                </div>
              </div>
            </>
          )}
        </Col>
        <Col span={9}>
          <div className="timer-container-status">
            <Col span={6} offset={1}>
              <Text style={{ fontSize: 40 }}>Status :</Text>
            </Col>

            <Col span={16} className="text-value">
              {timesheet.time_sheet_type_id &&
              timesheet.time_sheet_type_id === 2 ? (
                <>
                  <PlayCircleTwoTone
                    style={{ fontSize: 40 }}
                    twoToneColor="#52c41a"
                  />
                </>
              ) : timesheet.time_sheet_type_id === 3 ? (
                <PauseCircleTwoTone
                  style={{ fontSize: 40 }}
                  twoToneColor="#ff0000"
                />
              ) : timesheet.time_sheet_type_id === 4 ? (
                <CheckCircleTwoTone
                  style={{ fontSize: 40 }}
                  twoToneColor="#52c41a"
                />
              ) : null}

              <Text strong className="pe-4" style={{ fontSize: 40 }}>
                {}
                {stepBtn === "setup"
                  ? timesheet.time_sheet_type_id === 3
                    ? `Stop-${stepBtn}`
                    : stepBtn
                  : stepBtn === "clean"
                  ? timesheet.time_sheet_type_id === 3
                    ? `Stop-${stepBtn}`
                    : stepBtn
                  : timesheet.time_sheet_type_name || "-"}
                {/* {timesheet.time_sheet_type_name || "-"} */}
              </Text>
            </Col>
          </div>
          <div className="timer-container">
            <div className="stopwatch">
              {/* <TimerBox time={timeValue} />
              <TimerControl {...btnConfig} /> */}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default TimeSheetAction;
