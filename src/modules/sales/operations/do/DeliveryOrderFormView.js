import { message } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { get_log_by_id } from "../../../../actions/comment&log";
import { do_actions, getDO, saveDO } from "../../../../actions/sales/doActions";
import Comments from "../../../../components/Comments";
import MainLayout from "../../../../components/MainLayout";
import ModalRemark from "../../../../components/Modal_Remark";
import { AppContext, DOContext } from "../../../../include/js/context";
import { validateFormHead } from "../../../../include/js/function_main";
import Form from "./form/Form";
const initialState = {
  do_id: null,
  user_name: null,
  do_remark: null,
  do_delivery_date: null,
  do_description: null,
  do_agreement: null,
  do_actived: 1,
  tg_trans_status_id: 1,
  tg_trans_close_id: 1,
  commit: 1,
  customer_id: null,
  do_location_delivery: null,
  do_location_sender: null,
  do_delivery_date: null,
  do_return_date: null,
  do_return_time: null,
  do_detail: [
    {
      id: 0,
      dr_id: null,
      so_id: null,
      so_detail_id: null,
      dr_remark: null,
      dr_qty: null,
      dr_delivery_date: null,
      dr_delivery_time: null,
    },
  ],
};
const DeliveryOrderFormView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [config, setConfig] = useState({
    readOnly: true,
    loading: false,
  });
  const dataComment = useSelector((state) => state.log.comment_log);
  const [stateDO, setStateDO] = useState(initialState);
  const [remark, setRemark] = useState("");
  const [openRemarkModal, setOpenRemarkModal] = useState({
    visible: false,
    loading: false,
  });

  const setLoading = (bool) =>
    setConfig((prev) => ({ ...prev, loading: bool }));

  const {
    auth: { user_name },
  } = useContext(AppContext);

  useEffect(() => {
    console.log("get log");
    stateDO &&
      stateDO.process_id &&
      dispatch(get_log_by_id(stateDO.process_id));
  }, [stateDO]);

  const changeProcessStatus = (process_status_id) => {
    if (remark.trim() === "") {
      alert("Plase write remark");
      return false;
    }
    setOpenRemarkModal({ visible: false, loading: false });
    const app_detail = {
      //6 = reject
      process_status_id: process_status_id,
      user_name: user_name,
      process_id: stateDO.process_id,
      process_member_remark: remark,
    };
    message.success({ content: "Reject", key: "validate", duration: 1 });
    dispatch(do_actions(app_detail, stateDO.so_id));
  };

  const flow =
    stateDO &&
    stateDO.data_flow_process &&
    stateDO.data_flow_process.map((step) => {
      return step.all_group_in_node;
    });

  const layoutConfig = useMemo(
    () => ({
      projectId: 7,
      title: "SALES",
      home: "/sales",
      show: true,
      breadcrumb: [
        "Sales",
        "Operation",
        "Delivery Order",
        `${stateDO.do_no || "-"}`,
      ],
      search: false,
      create: "",
      buttonAction: [
        stateDO && stateDO.button_edit && "Edit",
        stateDO && stateDO.button_confirm && "Confirm",
        stateDO && stateDO.button_approve && "Approve",
        stateDO && stateDO.button_reject && "Reject",
        "Back",
      ],
      edit: `/sales/operation/do/edit/${id}`,
      back: `/sales/operation/do`,
      action: [],
      step: {
        current: stateDO.node_stay - 1,
        step: flow,
        process_complete: stateDO.process_complete,
      },
      onApprove: (e) => {
        //e.preventDefault();
        console.log("Approve");
        const app_detail = {
          process_status_id: 5,
          user_name: user_name,
          process_id: stateDO.process_id,
          process_member_remark: remark,
        };
        dispatch(do_actions(app_detail, stateDO.so_id));
      },
      onConfirm: () => {
        console.log("Confirm");
        const app_detail = {
          process_status_id: 2,
          user_name: user_name,
          process_id: stateDO.process_id,
        };
        dispatch(do_actions(app_detail, stateDO.so_id));
      },
      onReject: () => {
        console.log("Reject");
        setOpenRemarkModal({
          visible: true,
          loading: false,
        });
      },
      onCancel: () => {
        console.log("Cancel");
        const app_detail = {
          process_status_id: 3,
          user_name: user_name,
          process_id: stateDO.process_id,
        };
        dispatch(do_actions(app_detail, stateDO.so_id));
      },
    }),
    [config, setConfig, stateDO]
  );

  const formConfig = useMemo(
    () => ({
      ...config,
      stateDO,
      setStateDO,
      user_name,
    }),
    [config, stateDO, setStateDO, user_name]
  );

  useEffect(() => {
    // get data 1st time.
    const getData = async (user_name, id) => {
      const resp = await getDO(user_name, id);
      console.log("get do by id ", resp.data);
      resp.success && setStateDO(resp.data);
    };
    !["new", null, undefined].includes(id)
      ? getData(user_name, id)
      : setStateDO(initialState);
  }, [user_name, id]);

  return (
    <>
      <MainLayout {...layoutConfig}>
        <DOContext.Provider value={formConfig}>
          <Form />
        </DOContext.Provider>
        <ModalRemark
          title={"Reject Remark"}
          state={openRemarkModal}
          onChange={setRemark}
          onOk={() => {
            changeProcessStatus(6);
          }}
          onCancel={() => {
            setOpenRemarkModal({ visible: false, loading: false });
            setRemark("");
          }}
        />
        <Comments data={dataComment} />
      </MainLayout>
    </>
  );
};

export default DeliveryOrderFormView;
