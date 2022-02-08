import { Button, message } from "antd";
import moment from "moment";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { useHistory, useParams, useRouteMatch } from "react-router";
import { approveFunction } from "../../../../actions";
import {
  getMRPCalV2,
  getMRPv2ByID,
  saveMRPv2,
} from "../../../../actions/production/mrpActions";
import Comments from "../../../../components/Comments";
import MainLayout from "../../../../components/MainLayout";
import { AppContext } from "../../../../include/js/context";
import Form from "./form";

const MRPForm = () => {
  const {
    auth: { user_name, branch_id },
  } = useContext(AppContext);
  const { action, id } = useParams();
  const history = useHistory();
  if (!["edit", "view", "create"].includes(action))
    history.push(`/production/operations/mrp_v2`);

  const [configs, setConfigs] = useState({
    readOnly: false,
    loading: false,
    log: [],
  });

  const formMethods = useForm({
    defaultValues: initialState,
  });

  const getData = useCallback(async () => {
    setConfigs((prev) => ({ ...prev, readOnly: true, loading: true }));
    const { data } = await getMRPv2ByID(id, user_name);
    const { log } = data || {};

    formMethods.reset(data);
    setConfigs((prev) => ({
      ...prev,
      readOnly: ["create", "edit"].includes(action) ? false : true,
      log,
      loading: false,
    }));
  }, [action]);

  useEffect(() => {
    id && user_name && getData();
  }, [id, user_name, action]);

  const [
    process_id,
    button_edit,
    button_confirm,
    button_approve,
    button_reject,
    node_stay,
    data_flow_process,
    process_complete,
  ] = useWatch({
    control: formMethods.control,
    name: [
      "process_id",
      "button_edit",
      "button_confirm",
      "button_approve",
      "button_reject",
      "node_stay",
      "data_flow_process",
      "process_complete",
    ],
    defaultValue: [null, false, false, false, false, null, null, null],
  });

  const layoutConfig = useMemo(() => {
    const flow = data_flow_process?.map((step) => {
      return step.all_group_in_node;
    });

    const doActions = async (status_id = 0, msg = "....") => {
      setConfigs((prev) => ({ ...prev, loading: true }));
      const resp = await approveFunction({
        status: status_id,
        user_name,
        process_id,
        process_member_remark: "Confirm Document.",
      });

      if (resp.success) {
        message.success(`${msg} successfully.`);
        getData();
      } else {
        message.error(`${msg} fail.`);
      }
      setConfigs((prev) => ({ ...prev, log: resp?.data?.log, loading: false }));
    };
    return {
      projectId: 10, // project ID from DB
      title: "PRODUCTION", // project name
      home: "/production", // path
      show: true, // bool show sub - tool bar
      breadcrumb: ["Production", "Operations", "MRP"], // [1,2,3] = 1 / 2 / 3
      search: false, // bool show search
      searchValue: null, //search string
      buttonAction: ["view"].includes(action)
        ? [
            button_edit && "Edit",
            button_confirm && "Confirm",
            button_approve && "Approve",
            button_reject && "Reject",
            "Back",
          ]
        : ["edit", "create"].includes(action)
        ? ["Save", "Discard"]
        : [], // button
      step: {
        current: node_stay - 1,
        step: flow,
        process_complete,
      },
      badgeCont: 0, //number
      // step: null, // object {current:0,step:[],process_complete:bool}
      create: "", // path or "modal" and use openModal() instead
      edit: { path: `/production/operations/mrp_v2/edit/${id}` }, // object {data: any , path : "string"} or function
      discard: "/production/operations/mrp_v2", //path
      back: "/production/operations/mrp_v2", //path
      save: "function", //path if not path use "function" and use onSave instead.
      onSave: () => {
        formMethods.setValue("isSave", true);
        document.getElementById("submit-form").click();
      },
      onConfirm: () => {
        doActions(2, "Confirm document");
      },
      onApprove: () => {
        doActions(5, "Approve document");
      },
      onReject: () => {
        doActions(6, "Reject document");
      },
      onCancel: () => {
        doActions(3, "Cancel document");
      },
      onSearch: (keyword) => console.log("Search Key", keyword),
      openModal: () => console.log("openModal"),
      searchBar: null, //html code this show below search input
    };
  }, [
    action,
    id,
    configs,
    process_id,
    button_edit,
    button_confirm,
    button_approve,
    button_reject,
    node_stay,
    data_flow_process,
    process_complete,
    // getData,
  ]);

  const onSubmit = async (data) => {
    if (!data?.isSave) {
      // ! CALCULATE MATERIAL
      const { item_id, so_id, so_detail_id, mrp_item_qty_produce, type_id } =
        data || {};
      if (
        !item_id ||
        !so_id ||
        !so_detail_id ||
        !mrp_item_qty_produce ||
        !type_id
      )
        return message.warning({
          content: "ข้อมูลไม่ครบถ้วน ไม่สามารถคำนวณผลลัพธ์ได้",
          duration: 4,
        });
      // Do Submit
      setConfigs((prev) => ({ ...prev, loading: true }));
      const resData = await getMRPCalV2({
        item_id,
        so_id,
        so_detail_id,
        item_qty_produce: mrp_item_qty_produce,
        type_id,
      });
      console.log("getMRPCalV2 ", resData);
      formMethods.reset({
        ...data,
        item_set_spec: resData?.data?.item_set_spec || [],
        item_routing_spec: resData?.data?.item_routing_spec || [],
        item_fg_spec: resData?.data?.item_fg_spec || [],
        item_bulk_spec: resData?.data?.item_bulk_spec || [],
      });
      setConfigs((prev) => ({ ...prev, loading: false }));
    } else {
      // ! SAVE DATA
      setConfigs((prev) => ({ ...prev, loading: true }));
      const saveData = {
        ...data,
        user_name,
        branch_id,
        commit: 1,
      };
      // Do save mrp.
      console.log("Save  Data", saveData);
      const resp = await saveMRPv2(saveData);
      console.log("SAVE Resp", resp);
      if (resp.success) {
        const {
          data: { tb_mrp },
        } = resp || {};
        const { mrp_id } = tb_mrp[0];
        history.push(`/production/operations/mrp_v2/view/${mrp_id}`);
      }
      formMethods.setValue("isSave", false);

      setConfigs((prev) => ({ ...prev, loading: false }));
    }
  };
  const onError = (data) => {
    // Do Submit
    console.log("onError", data);
  };

  return (
    <MainLayout {...layoutConfig}>
      {/* <h1>{`MRP FORM ${action} / ${id}`}</h1> */}
      <FormProvider {...formMethods} {...configs}>
        <form
          key="form-1"
          onSubmit={formMethods.handleSubmit(onSubmit, onError)}
        >
          {/* <Button
            onClick={() => formMethods.setValue("mrp_description", "5555555")}
          >
            SET
          </Button> */}
          <Form />
          <button type="submit" id="submit-form" className="d-none">
            Submit Btn
          </button>
        </form>
      </FormProvider>
      <Comments data={configs?.log || []} />
    </MainLayout>
  );
};

export default React.memo(MRPForm);

const initialState = {
  isSave: false,
  mrp_id: null,
  mrp_description: null,
  so_id: null,
  // so_no:null,
  // so_description:null,
  so_detail_id: null,
  item_id: null,
  // item_no:null,
  // item_name:null,
  mrp_item_qty_produce: 0,
  mrp_item_plan_date: null,

  // Ref. Item FG -> Bulk
  item_ref_id: null,
  // item_ref_no:null,
  // item_ref_name:null,
  mrp_item_ref_qty_produce: 0,
  mrp_item_ref_plan_date: null,
  mrp_include_ref_on_stock: false,
  sys_reserve_item_ref_qty: 0,
  sys_advice_item_ref_qty: 0,

  item_fg_spec: [],
  item_bulk_spec: [],
  item_set_spec: [],
  item_routing_spec: [],

  mrp_remark: null,
  mrp_created_by: null,
  mrp_created: moment().format("DD/MM/YYYY"),
  commit: 1,
  branch_id: 1,
};
