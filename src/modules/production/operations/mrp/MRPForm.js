import { message } from "antd";
import moment from "moment";
import React, { useContext, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useHistory, useParams, useRouteMatch } from "react-router";
import { getMRPCalV2 } from "../../../../actions/production/mrpActions";
import MainLayout from "../../../../components/MainLayout";
import { AppContext } from "../../../../include/js/context";
import Form from "./form";

const MRPForm = () => {
  const {
    auth: { user_name, branch_id },
  } = useContext(AppContext);
  const { action, id } = useParams();
  const history = useHistory();
  if (!["edit", "view", "create"].includes(action)) history.push(`/production`);
  const formMethods = useForm({
    defaultValues: initialState,
  });
  // const formMethods2 = useForm({
  //   defaultValues: initialState,
  // });
  const layoutConfig = useMemo(
    () => ({
      projectId: 10, // project ID from DB
      title: "PRODUCTION", // project name
      home: "/production", // path
      show: true, // bool show sub - tool bar
      breadcrumb: ["Production", "Operations", "MRP"], // [1,2,3] = 1 / 2 / 3
      search: false, // bool show search
      searchValue: null, //search string
      buttonAction: ["Save", "Discard"], // button
      badgeCont: 0, //number
      step: null, // object {current:0,step:[],process_complete:bool}
      create: "", // path or "modal" and use openModal() instead
      edit: "", // object {data: any , path : "string"} or function
      discard: "/production/operations/mrp", //path
      back: "", //path
      save: "function", //path if not path use "function" and use onSave instead.
      onSave: () => {
        console.log("onSave");
        formMethods.setValue("isSave", true);
        document.getElementById("submit-form").click();
      },
      onConfirm: () => console.log("Confirm"),
      onApprove: () => console.log("Approve"),
      onReject: () => console.log("Reject"),
      onCancel: () => console.log("Cancel"),
      onSearch: (keyword) => console.log("Search Key", keyword),
      openModal: () => console.log("openModal"),
      searchBar: null, //html code this show below search input
    }),
    []
  );

  const onSubmit = async (data) => {
    if (!data?.isSave) {
      const { item_id, so_id, so_detail_id, mrp_item_qty_produce } = data || {};
      console.log(
        `${
          !item_id +
          " | " +
          !so_id +
          " | " +
          !so_detail_id +
          " | " +
          !mrp_item_qty_produce
        }`
      );
      if (!item_id || !so_id || !so_detail_id || !mrp_item_qty_produce)
        return message.warning({
          content: "ข้อมูลไม่ครบถ้วน ไม่สามารถคำนวณผลลัพธ์ได้",
          duration: 4,
        });
      // Do Submit
      formMethods.setValue("componentsLoading", true);
      const resData = await getMRPCalV2({
        item_id,
        so_id,
        so_detail_id,
        item_qty_produce: mrp_item_qty_produce,
      });
      console.log("resdata", resData);
      formMethods.setValue("item_set_spec", resData?.data?.item_set_spec || []);
      formMethods.setValue(
        "item_routing_spec",
        resData?.data?.item_routing_spec || []
      );
      formMethods.setValue("componentsLoading", false);
    } else {
      /*
      EXEC [PRODUCTION].[dbo].[sp_ins_tb_mrp_v2]
      @user_name = '2563003'
      ,@branch_id = '1'
      ,@item_id = '2842'
      ,@mrp_item_qty_produce = '5000'
      ,@mrp_item_plan_date = '25/01/2022'
      ,@so_id = '25'
      ,@so_detail_id = '27'
      ,@mrp_description = 'TEST MRP V.2 - 1'
      ,@mrp_agreement = 'Agreement'
      ,@mrp_remark = 'Remark'
      ,@item_ref_id = NULL
      ,@mrp_item_ref_qty_produce = '0'
      ,@mrp_item_ref_plan_date = NULL
      ,@commit = 0

      user_name,branch_id
      */
      const saveData = {
        ...data,
        user_name,
        branch_id,
        commit: 0,
      };
      console.log("SAVEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
      console.log("Save  Data", saveData);
    }
  };
  const onError = (data) => {
    // Do Submit
    console.log("onError", data);
  };

  return (
    <MainLayout {...layoutConfig}>
      {/* <h1>{`MRP FORM ${action} / ${id}`}</h1> */}
      <FormProvider {...formMethods}>
        <form
          key="form-1"
          onSubmit={formMethods.handleSubmit(onSubmit, onError)}
        >
          <Form />
          <button type="submit" id="submit-form" className="d-none">
            Submit Btn
          </button>
        </form>
      </FormProvider>
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
