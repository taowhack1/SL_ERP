import { message } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  getDO,
  getDRCustomers,
  saveDO,
} from "../../../../actions/sales/doActions";
import MainLayout from "../../../../components/MainLayout";
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
const DeliveryOrderForm = () => {
  const history = useHistory();
  const { id, dr_id } = useParams();
  const [config, setConfig] = useState({
    readOnly: false,
    loading: false,
  });
  const [selectData, setSelectData] = useState({
    customers: [],
  });
  const [stateDO, setStateDO] = useState(initialState);

  const setLoading = (bool) =>
    setConfig((prev) => ({ ...prev, loading: bool }));

  const {
    auth: { user_name },
  } = useContext(AppContext);

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
        `${stateDO.do_no || "Create"}`,
      ],
      search: false,
      create: "",
      buttonAction: ["Save", "Discard"],
      action: [],
      discard: "/sales/operation/do",
      save: "function",
      onSave: async () => {
        setLoading(true);
        console.log("save ", stateDO);
        const validateHead = validateFormHead(stateDO, [
          "customer_id",
          "do_location_delivery",
        ]);
        console.log("validateHead", validateHead);
        if (validateHead.validate) {
          const saveData = { ...stateDO, commit: 1, user_name };

          const resp = await saveDO(saveData);
          if (resp.success) {
            message.success("Save Success.");
            history.push(`/sales/operation/do/view/${resp.data.do_id}`);
          }
        } else {
          message.warning("Plase fill your form completely.");
        }

        setLoading(false);
      },
    }),
    [stateDO]
  );

  const formConfig = useMemo(
    () => ({
      ...config,
      stateDO,
      setStateDO,
      user_name,
      selectData,
    }),
    [config, stateDO, setStateDO, user_name, selectData]
  );

  useEffect(() => {
    // get data 1st time.
    const getData = async (user_name, id) => {
      const resp = await getDO(user_name, id);
      console.log("get do by id ", resp.data);
      resp.success && setStateDO(resp.data);
    };

    const getCustomers = async () => {
      const resp = await getDRCustomers();
      setSelectData((prev) => ({
        ...prev,
        customers: resp.success && resp.data,
      }));
    };
    !config.readOnly && getCustomers();

    if (!["new", null, undefined].includes(id)) {
      // สร้าง DO แล้ว
      getData(user_name, id);
    } else {
      // คลิก Create เฉยๆ
      setStateDO(initialState);
    }
  }, [user_name, id, dr_id]);
  return (
    <>
      <MainLayout {...layoutConfig}>
        <DOContext.Provider value={formConfig}>
          <Form />
        </DOContext.Provider>
      </MainLayout>
    </>
  );
};

export default DeliveryOrderForm;
