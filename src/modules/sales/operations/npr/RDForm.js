import { Checkbox, Col, Input, Row } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import CustomLabel from "../../../../components/CustomLabel";
import MainLayout from "../../../../components/MainLayout";
import NPRTabs from "./NPRTabs";
import { getNPRByID } from "../../../../actions/sales/nprActions";
import NPRHead from "./NPRHead";
const initialState = {
  npr_responsed_required_by: null,
  npr_responsed_delivery_date: null,
  user_name: null,
  npr_responsed_remark: null,
  tg_trans_status_id: 1,
};
const RDForm = () => {
  const { id } = useParams();
  console.log(id);

  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({});
  const {
    register,
    formState: { error },
    control,
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: initialState,
  });
  const layoutConfig = useMemo(
    () => ({
      projectId: 7,
      title: "SALES",
      home: "/sales",
      show: true,
      breadcrumb: ["Sales", "NPR"],
      search: false,
      create: "",
      buttonAction: ["Save", "Discard"],
      edit: {},
      discard: "/sales/npr",
      save: "function",
      onSave: () => {
        handleSubmit(onSubmit);
      },
    }),
    []
  );
  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      // data = await getNPRByID(id);
      const resp = await getNPRByID(id);
      if (resp.success) setState(resp.data);
      setLoading(false);
    };
    getData();
  }, [id]);
  const onSubmit = (data) => console.log("submit", data);
  console.log("data", state);
  return (
    <>
      <MainLayout {...layoutConfig}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div id="form">
            <div
              className="full-width text-center mb-2"
              style={{ borderBottom: "1px solid #c0c0c0" }}
            >
              <h1>NEW PRODUCT REQUISITION FORM</h1>
            </div>
            <NPRHead state={state} />
            <NPRTabs state={state} />
          </div>
        </form>
      </MainLayout>
    </>
  );
};

export default RDForm;
