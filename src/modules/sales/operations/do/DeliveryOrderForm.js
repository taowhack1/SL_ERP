import { message } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  getDO,
  getDRCustomers,
  getFormDR,
  saveDO,
} from "../../../../actions/sales/doActions";
import MainLayout from "../../../../components/MainLayout";
import { AppContext, DOContext } from "../../../../include/js/context";
import {
  sortData,
  validateFormHead,
} from "../../../../include/js/function_main";
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
const DeliveryOrderForm = (props) => {
  const history = useHistory();
  const { id } = useParams();
  const { dr_id, customer_id: lo_customer_id } = props?.location?.state || {
    dr_id: null,
    lo_customer_id: null,
  };
  const [config, setConfig] = useState({
    readOnly: false,
    loading: false,
  });
  const [selectData, setSelectData] = useState({
    customers: [],
    drList: [],
  });
  const [stateDO, setStateDO] = useState(initialState);
  const { customer_id, do_id } = stateDO;
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

      discard: "/sales/operation/do",
      save: "function",
      onSave: async () => {
        setLoading(true);
        const validateHead = validateFormHead(stateDO, [
          "customer_id",
          "do_location_delivery",
          "do_delivery_date",
          "do_delivery_time",
        ]);
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
      if (resp.success) {
        setStateDO(resp.data);
      }
    };

    const getCustomers = async () => {
      const resp = await getDRCustomers();
      if (resp.success) {
        setSelectData((prev) => ({
          ...prev,
          customers: resp.success && resp.data,
        }));
        lo_customer_id &&
          setStateDO((prev) => ({ ...prev, customer_id: lo_customer_id }));
      }
    };
    !config.readOnly && getCustomers();

    if (!["new", null, undefined].includes(id)) {
      // สร้าง DO แล้ว
      getData(user_name, id);
    } else {
      // คลิก Create เฉยๆ
      setStateDO(initialState);
    }
  }, [user_name, id]);

  useEffect(() => {
    const getDRList = async (customer_id, do_id) => {
      const resp = await getFormDR({ customer_id, do_id });
      message.info("Get list of Delivery Request success.");
      if (resp.success) {
        setSelectData((prev) => ({ ...prev, drList: sortData(resp.data) }));
        if (dr_id) {
          const selectedDR = {
            ...resp.data.find((obj) => obj.dr_id === dr_id),
            id: 0,
          };
          dr_id &&
            setStateDO((prev) => ({
              ...prev,
              do_location_delivery: selectedDR.do_location_delivery,
              do_detail: [selectedDR],
            }));
        }
      }
    };
    !config.readOnly && customer_id
      ? getDRList(customer_id, do_id)
      : setSelectData((prev) => ({ ...prev, drList: [] }));
  }, [customer_id, do_id]);

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
