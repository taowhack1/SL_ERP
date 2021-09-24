import { Button, message, Modal } from "antd";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  getPlanJobById,
  savePlanJobCalendar,
} from "../../../../../actions/production/planningActions";
import { AppContext } from "../../../../../include/js/context";
import Form from "./Form";

let readOnly = false;
let persistData = {};
const ModalFormPlan = (props) => {
  const { title, visible, closeModal, plan_job_id, updateCalendar } =
    props || {};
  const {
    auth: { user_name },
  } = useContext(AppContext);
  const [config, setConfig] = useState({
    loading: false,
  });
  const formMethods = useForm({
    defaultValue: initialState,
    shouldFocusError: true,
  });
  const { reset, handleSubmit } = formMethods;
  const checkReadOnly = (plan) => {
    readOnly = ![1, 2].includes(plan?.tg_trans_status_id);
  };
  const onSubmit = async (data) => {
    console.log("onSubmit", data);

    setConfig((prev) => ({ ...prev, loading: true }));
    const saveData = [
      {
        ...data,
        user_name,
        commit: 1,
      },
    ];
    console.log("saveData", saveData);

    const resp = await savePlanJobCalendar(saveData);
    if (resp.success) {
      checkReadOnly(resp?.data[0]);
      updateCalendar();
      message.success("Update Successfully.");
    } else {
      message.error(`Error !. ${resp.message}`);
    }
    setConfig((prev) => ({ ...prev, loading: false }));
  };
  const onError = async (data) => {
    console.log("onError", data);
    message.warning("Please fill your form completely.", 4);
  };
  const getPlan = async (plan_job_id) => {
    setConfig((prev) => ({ ...prev, loading: true }));
    if (!plan_job_id) {
      // do set new form
      reset(initialState);
      persistData = initialState;
    } else {
      const resp = await getPlanJobById(plan_job_id);
      if (resp.success) {
        checkReadOnly(resp?.data[0]);

        reset(resp.data[0]);
        persistData = resp.data[0];
      } else {
        message.error(
          "Can't get any data form the server. Please contact admin.",
          10
        );
        reset(initialState);
        persistData = initialState;
      }
    }
    setConfig((prev) => ({ ...prev, loading: false }));
  };
  const formConfig = useMemo(
    () => ({
      ...formMethods,
      readOnly,
      persistData,
      ...config,
    }),
    [persistData, readOnly, formMethods, config]
  );
  useEffect(() => {
    getPlan(plan_job_id);
  }, [plan_job_id]);
  return (
    <>
      <Modal
        {...{
          destroyOnclose: true, //remove element
          closable: true, //close by x button
          confirmLoading: config?.loading, //when click ok trigger button loading
          // footer: null, // custom footer bar
          maskClosable: true, //close when click outside
          okText: "Save",
          okType: "primary", //antd button type
          cancelText: "Close",
          title: title, //title of modal
          visible: visible,
          width: 600,
          onCancel: closeModal,
          afterClose: () => console.log("after close do this."),
          footer: (
            <div>
              <Button type="default" onClick={() => closeModal()}>
                Close
              </Button>
              {!readOnly && (
                <Button
                  type="primary ml-2"
                  onClick={() => document.getElementById("submit-btn").click()}
                >
                  Save
                </Button>
              )}
            </div>
          ),
        }}
      >
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <Form {...formConfig} />
          <button type="submit" className="d-none" id="submit-btn">
            Submit
          </button>
        </form>
      </Modal>
    </>
  );
};

export default React.memo(ModalFormPlan);

const initialState = {
  plan_job_id: null,
  plan_job_no: null,
  plan_job_description: null,
  job_order_id: null,
  job_order_no: null,
  job_order_qty: null,
  item_no_name: null,
  so_no: null,
  mrp_no: null,
  machine_id: null,
  shift_job_id: null,
  plan_job_remark: null,
  plan_job_description: null,
  plan_job_date: null,
  plan_job_plan_worker: null,
  plan_job_plan_time: null,
  tg_plan_job_actual_time: null,
  tg_plan_job_actual_worker: null,
  tg_plan_job_actual_qty: null,
  tg_trans_status_id: 2,
  tg_trans_close_id: 1,
  trans_status_id: null,
  trans_status_name: null,
  plan_job_actived: true,
  user_name: null,
  commit: 1,
};
