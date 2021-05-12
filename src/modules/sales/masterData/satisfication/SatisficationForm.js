import React, { useMemo, useState } from "react";
import { useEffect } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { getSatisfication } from "../../../../actions/sales/satisficationActions";
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

  // useEffect(() => {
  //   setTimeout(() => {
  //     console.log("getValues", methods.getValues());
  //     methods.reset({
  //       ...methods.getValues(),
  //       satisfication_detail: [
  //         {
  //           id: 0,
  //           satisfication_detail_id: null,
  //           qa_specification_id: 1,
  //         },
  //         {
  //           id: 1,
  //           satisfication_detail_id: null,
  //           qa_specification_id: 2,
  //         },
  //         {
  //           id: 2,
  //           satisfication_detail_id: null,
  //           qa_specification_id: 3,
  //         },
  //         {
  //           id: 3,
  //           satisfication_detail_id: 1,
  //           qa_specification_id: 4,
  //           status: 1,
  //         },
  //       ],
  //     });
  //     setLoading(false);
  //   }, 2000);
  // }, []);
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

  const onSubmit = (data) => {
    console.log("submit ", data);
  };

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const resp = await getSatisfication(id);
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
