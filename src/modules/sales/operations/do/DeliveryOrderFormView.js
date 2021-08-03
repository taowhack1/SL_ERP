import { message } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useContext, useEffect, useState } from "react";
import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { approveFunction } from "../../../../actions";
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
  const history = useHistory();
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

  const [selectData] = useState({
    customers: [],
    drList: [],
  });

  const setLoading = (bool) =>
    setConfig((prev) => ({ ...prev, loading: bool }));

  const {
    auth: { user_name },
  } = useContext(AppContext);

  useEffect(() => {
    stateDO &&
      stateDO.process_id &&
      dispatch(get_log_by_id(stateDO.process_id));
  }, [stateDO]);

  const changeProcessStatus = async () => {
    if (remark.trim() === "") {
      alert("Plase write remark");
      return false;
    }
    setLoading(true);
    setOpenRemarkModal({ visible: false, loading: false });
    const resp = await approveFunction({
      status: 6,
      user_name,
      process_id: stateDO.process_id,
      remark,
    });
    setLoading(false);
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
      edit: () => history.push(`/sales/operation/do/edit/${id}`),
      back: `/sales/operation/do`,
      action: [
        stateDO &&
          stateDO.button_cancel && {
            name: (
              <div className="text-center">
                <Text className="error">Cancel</Text>
              </div>
            ),
            cancel: true,
            link: ``,
          },
      ],
      step: {
        current: stateDO.node_stay - 1,
        step: flow,
        process_complete: stateDO.process_complete,
      },
      onApprove: async (e) => {
        //e.preventDefault();
        setLoading(true);
        const resp = await approveFunction({
          status: 5,
          user_name,
          process_id: stateDO.process_id,
          remark,
        });
        setLoading(false);
      },
      onConfirm: async () => {
        setLoading(true);

        const resp = await approveFunction({
          status: 2,
          user_name,
          process_id: stateDO.process_id,
          remark,
        });
        setLoading(false);
      },
      onReject: async () => {
        setOpenRemarkModal({
          visible: true,
          loading: false,
        });
      },
      onCancel: async () => {
        setLoading(true);

        const resp = await approveFunction({
          status: 3,
          user_name,
          process_id: stateDO.process_id,
          remark,
        });
        setLoading(false);
      },
    }),
    [config, setConfig, stateDO, id]
  );

  const formConfig = useMemo(
    () => ({
      ...config,
      stateDO,
      setStateDO,
      user_name,
      selectData,
    }),
    [config, stateDO, setStateDO, user_name]
  );

  useEffect(() => {
    // get data 1st time.
    const getData = async (user_name, id) => {
      const resp = await getDO(user_name, id);
      resp.success && setStateDO(resp.data);
    };
    config.loading === false && !["new", null, undefined].includes(id)
      ? getData(user_name, id)
      : setStateDO(initialState);
  }, [user_name, id, config.loading]);

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
