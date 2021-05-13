import { message } from "antd";
import React, { useMemo, useState } from "react";
import { useEffect } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  getSatisfication,
  saveSatisfication,
} from "../../../../actions/sales/satisficationActions";
import MainLayout from "../../../../components/MainLayout";
import { sortDataWithoutCommit } from "../../../../include/js/function_main";
import SatisficationFormHead from "./SatisficationFormHead";
import SatisficationTabs from "./SatisficationTabs";

const SatisficationForm = () => {
  const { id } = useParams();
  const { user_name } = useSelector((state) => state.auth.authData);
  const [loading, setLoading] = useState(true);
  const methods = useForm({
    defaultValues: {
      category_id: null,
      category_no: null,
      category_name: null,
      category_no_name: null,
      npr_satisfaction_spec_detail: [],
    },
  });
  const fieldsArray = useFieldArray({
    name: "npr_satisfaction_spec_detail",
    control: methods.control,
    defaultValues: [],
  });

  const layoutConfig = useMemo(
    () => ({
      projectId: 7,
      title: "SALES",
      home: "/sales",
      show: true,
      breadcrumb: ["Sales", "Master Data", "Satisfications"],
      search: false,
      create: "",
      buttonAction: ["Save", "Discard"],
      edit: {},
      back: "/sales/master/satisfication",
      discard: "/sales/master/satisfication",
      save: "function",
      onSave: () => {
        document.getElementById("submit-btn").click();
      },
    }),
    []
  );

  const onSubmit = async (data) => {
    // setLoading(true);
    console.log("submit get", methods.getValues());
    console.log("submit data", data);
    // const filterData = {
    //   post: data.npr_satisfaction_spec_detail.filter(
    //     (obj) => obj.commit === 1 && obj.npr_satisfaction_spec_id === null
    //   ),
    //   put: data.npr_satisfaction_spec_detail.filter(
    //     (obj) => obj.commit === 1 && obj.npr_satisfaction_spec_id !== null
    //   ),
    // };
    // const saveData = async () => {
    //   const resp = await saveSatisfication(id, filterData.post, filterData.put);
    //   console.log("onSubmit", resp);
    //   if (resp[0].value !== 0 && resp[0].value.success) {
    //     message.success({
    //       content: "Add New Specification Subject Completed..",
    //       key: "add",
    //     });
    //   }
    //   if (resp[1].value !== 0 && resp[1].value.success) {
    //     message.success({
    //       content: "Update Specification Subject Completed..",
    //       key: "update",
    //     });
    //   }
    //   const getData = async () => {
    //     const resp = await getSatisfication(id);
    //     console.log("resp get", resp);
    //     methods.reset({
    //       ...resp.data[0],
    //       npr_satisfaction_spec_detail: sortDataWithoutCommit(
    //         resp.data[0].npr_satisfaction_spec_detail
    //       ),
    //     });
    //     setTimeout(() => setLoading(false), 1000);
    //   };
    //   getData();
    // };
    // saveData();
  };

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const resp = await getSatisfication(id);
      console.log("resp get", resp);
      methods.reset({
        ...resp.data[0],
        npr_satisfaction_spec_detail: sortDataWithoutCommit(
          resp.data[0].npr_satisfaction_spec_detail
        ),
      });
      setLoading(false);
    };
    getData();
  }, []);
  console.log("getdata", methods.getValues());
  return (
    <>
      <MainLayout {...layoutConfig}>
        <FormProvider
          {...methods}
          {...fieldsArray}
          loading={loading}
          user_name={user_name}
        >
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div id="form">
              <div className="form-section">
                <SatisficationFormHead />
                <SatisficationTabs />
              </div>
              <button type="submit" id="submit-btn" className="d-none">
                submit
              </button>
            </div>
          </form>
        </FormProvider>
      </MainLayout>
    </>
  );
};

export default SatisficationForm;
