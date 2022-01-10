import moment from "moment";
import React, { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useHistory, useParams, useRouteMatch } from "react-router";
import MainLayout from "../../../../components/MainLayout";
import Form from "./form";

const MRPForm = () => {
  const { action, id } = useParams();
  const history = useHistory();
  if (!["edit", "view", "create"].includes(action)) history.push(`/production`);
  const formMethods = useForm({
    defaultValues: initialState,
  });
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
      onSave: () => console.log("onSave"),
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
  return (
    <MainLayout {...layoutConfig}>
      <h1>{`MRP FORM ${action} / ${id}`}</h1>
      <FormProvider {...formMethods}>
        <Form />
      </FormProvider>
    </MainLayout>
  );
};

export default React.memo(MRPForm);

const initialState = [
  {
    mrp_id: null,
    mrp_description: null,
    so_id: null,
    so_detail_id: null,
    item_id: null,
    mrp_item_qty_to_produce: 0,
    mrp_item_plan_date: null,
    // Ref. Item FG -> Bulk
    item_ref_id: null,
    mrp_item_ref_qty_to_produce: 0,
    mrp_include_ref_on_stock: false,
    sys_reserve_item_ref_qty: 0,
    sys_advice_item_ref_qty: 0,
    mrp_item_ref_plan_date: null,

    item_spec: [],
    item_ref_spec: [],
    routing_spec: [],

    mrp_remark: null,
    mrp_created_by: null,
    mrp_created: moment().format("DD/MM/YYYY"),
    commit: 1,
    branch_id: 1,
  },
];
