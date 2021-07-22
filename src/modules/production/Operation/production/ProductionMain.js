/** @format */

import { Col, message, Row, Spin } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DetailLoading from "../../../../components/DetailLoading";
import { ProductionContext } from "../../../../include/js/context";
import ProductionHeader from "./production/ProductionHeader";
import ProductionStepSwitch from "./ProductionStepSwitch";
import {
  getMachinePlan,
  getTimesheetScanRMList,
  resetTimesheet,
} from "../../../../actions/production/timesheetActions";
import { convertDigit } from "../../../../include/js/main_config";

const initialState = {
  machine: {},
  plan: {
    plan_job_date: null,
    plan_job_description: null,
    plan_job_no: null,
    plan_job_plan_time: null,
    plan_job_plan_worker: null,
    plan_job_remark: null,
  },
  rmChecking: {
    progress: 0,
    RMList: [],
  },
  worker: [],
  timesheet: {
    start: null,
    stop: null,
    totalTime: 0,
    result: [],
    totalQty: 0,
  },
  save: {
    machine_id: null,
    plan_job_id: null,
    user_name: null,
    time_sheet_user_detail: [],
    commit: 1,
    time_sheet_remark: null,
  },
};
const ProductionMain = () => {
  const dispatch = useDispatch();
  const cost_center = JSON.parse(localStorage.getItem("cost_center"));
  const { loading, timesheet } = useSelector((state) => state.production);
  const [step, setStep] = useState({
    current: 1,
    currentIndex: 0,
    stepList: [],
  });
  const [form, setForm] = useState(initialState);

  const tsFunction = useCallback(
    async (type = "", data) => {
      console.log(type, data);
      switch (type) {
        case "SELECT_MACHINE":
          setForm({ ...form, machine: data });
          break;
        case "SELECT_PLAN":
          message.success(`Select Plan No. ${data.plan_job_no}`);

          if (form.machine.machine_process_scan && data.plan_job_id) {
            const resp = await getTimesheetScanRMList(data.plan_job_id);
            console.log("GET RAW MATERIAL ", resp);
            setForm({
              ...form,
              plan: data,
              rmChecking: {
                ...form.rmChecking,
                RMList: resp.success ? resp.data : [],
              },
              save: {
                ...form.save,
                plan_job_id: data.plan_job_id,
              },
            });
          } else {
            setForm({
              ...form,
              plan: data,
              save: {
                ...form.save,
                plan_job_id: data.plan_job_id,
              },
            });
          }

          break;
        case "SCAN_BARCODE":
          // message.success(`BARCODE : ${data.plan_job_no}`);
          if (!data) return false;
          const calProgress = () => {
            const rmLength = form.rmChecking.RMList.length;
            const passLength = form.rmChecking.RMList.filter(
              (obj) => obj.weight_machine_net === obj.weight_machine_net_scan
            ).length;
            const progress = ((passLength + 1) * 100) / rmLength;
            // const calProgress = form.rmChecking.progress + progress;

            console.log(
              `CAL PROGRESS RM Length : ${rmLength} / passLength : ${passLength} / progress ${progress}`
            );
            return +convertDigit(progress, 2);
          };

          setForm({
            ...form,
            rmChecking: {
              ...form.rmChecking,
              progress: calProgress(),
              RMList: form.rmChecking.RMList.map((obj) =>
                obj.weight_machine_no === data.weight_machine_no
                  ? {
                      ...obj,
                      isScanned: true,
                      weight_machine_net_scan:
                        obj.weight_machine_net_scan +
                        data.weight_machine_net_scan,
                    }
                  : obj
              ),
            },
          });
          break;
        case "SELECT_WORKER":
          setForm({
            ...form,
            worker: data,
            save: {
              ...form.save,
              time_sheet_user_detail: data.map((val) => ({ user_name: val })),
            },
          });

          break;
        default:
          break;
      }
    },
    [form]
  );

  const contextValue = useMemo(
    () => ({
      form,
      setForm,
      step,
      setStep,
      tsFunction,
    }),
    [form, setForm, step, setStep, tsFunction]
  );
  useEffect(() => {
    dispatch(resetTimesheet());
  }, []);
  useEffect(() => {
    console.log("Change cost_center");
    cost_center.machine_id && dispatch(getMachinePlan(cost_center.machine_id));
  }, [cost_center.machine_id]);

  useEffect(() => {
    console.log("useEffect set machine plan");
    const setInitialState = () => {
      console.log("timesheet.machine", timesheet.machine);
      setForm({
        ...form,
        machine: timesheet.machine,
        save: {
          ...form.save,
          machine_id: cost_center.machine_id,
        },
      });
      setStep({
        current: timesheet.machine.machine_detail[0].machine_process_id,
        currentIndex: 0,
        stepList: timesheet.machine.machine_detail,
      });
    };
    timesheet.machine?.machine_id && setInitialState();
  }, [timesheet.machine.plan_job_detail]);
  console.log(form);
  return (
    <>
      <ProductionContext.Provider value={contextValue}>
        <div className="production-main primary">
          <div className="production-container">
            {loading ? (
              <Spin>
                <DetailLoading />
              </Spin>
            ) : (
              <Row className="col-2">
                {/* <Col span={step.current === 0 ? 6 : 0}>
                  <div className="mr-2 mt-1">
                    <ProductionJobList dataSource={mockupData} />
                  </div>
                </Col>
                <Col span={step.current === 0 ? 18 : 24}> */}
                <Col span={24}>
                  <div className="production-step-content">
                    {step.stepList.length > 0 && (
                      <>
                        <ProductionHeader
                          current={step.current}
                          title={
                            step.stepList[step.currentIndex]
                              .machine_process_name
                          }
                        />
                        <ProductionStepSwitch current={step.current} />
                      </>
                    )}
                  </div>
                </Col>
              </Row>
            )}
          </div>
        </div>
      </ProductionContext.Provider>
    </>
  );
};

export default ProductionMain;
