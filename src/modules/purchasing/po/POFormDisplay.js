import React, { useContext, useEffect, useMemo, useState } from "react";
import MainLayout from "../../../components/MainLayout";
import { Button, Divider } from "antd";
import POForm from "./POForm";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { FormProvider, useForm } from "react-hook-form";
import {
  api_payment_term_vendor,
  api_vat_id,
  api_vendor_list,
} from "../../../include/js/api";
import { useFetch } from "../../../include/js/customHooks";
import { AppContext } from "../../../include/js/context";
import { useParams } from "react-router";
const initialState = {
  po_description: null,
  user_name: null,
  cost_center_id: null,
  payment_term_id: null,
  vendor_id: null,
  currency_id: null,
  type_id: null,
  vat_id: 1,
  po_agreement: null,
  po_discount: 0,
  po_remark: null,
  commit: 1,
  po_detail: [],
};
const apiGetPOByID = `/purchase/po`;
const POFormDisplay = () => {
  const { id } = useParams();
  const [config, setConfig] = useState({
    loading: false,
    readOnly: true,
    data: null,
  });
  const {
    auth: { user_name },
  } = useContext(AppContext);
  const getPO = useFetch(
    `${apiGetPOByID}/${user_name}&${id}`,
    ![null, undefined, "create"].includes(id) && !user_name
  );
  const {
    data: po = [],
    error: getPOError,
    loading: getPOLoading = false,
  } = getPO || {};

  const getVendor = useFetch(`${api_vendor_list}`, config?.readOnly);
  const getVat = useFetch(`${api_vat_id}`, config?.readOnly);
  const getPaymentTerms = useFetch(
    `${api_payment_term_vendor}`,
    config?.readOnly
  );

  const formMethods = useForm({
    defaultValues: initialState,
  });

  const {
    reset,
    handleSubmit,
    formState: { errors },
  } = formMethods;

  const [step, setStep] = useState(1);

  const onNext = () => setStep((prev) => prev + 1);
  const onPrev = () => setStep((prev) => prev - 1);
  const onSubmit = async (data) => console.log("onSubmit : ", data);
  const onError = async (data) => console.log("onError : ", data);
  const setReadOnly = (bool = false) =>
    setConfig((prev) => ({ ...prev, readOnly: bool }));
  const layoutConfig = useMemo(() => {
    const { readOnly } = config || {};
    return {
      projectId: 5, // project ID from DB
      title: "PURCHASE", // project name
      home: "/purchase", // path
      show: true, // bool show sub - tool bar
      breadcrumb: ["Purchase", "Operations", "PO", "Create"], // [1,2,3] = 1 / 2 / 3
      search: false, // bool show search
      searchValue: null, //search string
      buttonAction: readOnly ? ["Edit", "Back"] : ["Save", "Discard"], // button
      // disabledSaveBtn: step === 1 ? true : false,
      badgeCont: 0, //number
      step: null, // object {current:0,step:[],process_complete:bool}
      create: "", // path or "modal" and use openModal() instead
      edit: "", // object {data: any , path : "string"} or function
      discard: "/purchase/po", //path
      back: "/purchase/po", //path
      save: "function", //path if not path use "function" and use onSave instead.
      onSave: () => console.log("onSave"),
      onConfirm: () => console.log("Confirm"),
      onApprove: () => console.log("Approve"),
      onReject: () => console.log("Reject"),
      onCancel: () => console.log("Cancel"),
      onSearch: (keyword) => console.log("Search Key", keyword),
      openModal: () => console.log("openModal"),
      searchBar: null, //html code this show below search input
    };
  }, [step, setStep, config]);

  // useEffect(() => {
  //   return () => {
  //     reset(initialState);
  //   };
  // }, [reset]);

  const formConfig = useMemo(
    () => ({
      ...formMethods,
      ...config,
      getPO,
      getVendor,
      getVat,
      getPaymentTerms,
    }),
    [getVendor, config, getPO]
  );

  const setData = () => {
    setReadOnly(true);
    setStep(2);
  };

  useEffect(() => {
    if (!id || id === "new") {
      // New
      reset(initialState);
      setReadOnly(false);
    } else {
      // Get Data
      reset(po[0] ?? []);
      setData();
    }
    return () => {
      setReadOnly(true);
    };
  }, [id]);

  return (
    <MainLayout {...layoutConfig}>
      <FormProvider {...formConfig} step={step}>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div id="form">
            <div className="d-flex flex-space ">
              <h2>Purchase Order</h2>
              {!config?.readOnly && (
                <div>
                  {step === 1 ? (
                    <Button type="link" size="large" onClick={onNext}>
                      <b>
                        ถัดไป <RightOutlined />
                      </b>
                    </Button>
                  ) : (
                    <Button type="link" size="large" onClick={onPrev}>
                      <b>
                        <LeftOutlined /> ก่อนหน้า
                      </b>
                    </Button>
                  )}
                </div>
              )}
            </div>
            <Divider className="divider-sm" />
            <POForm />
          </div>
        </form>
      </FormProvider>
    </MainLayout>
  );
};

export default POFormDisplay;
