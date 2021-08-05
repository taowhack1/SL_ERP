/** @format */

import { Button } from "antd";
import Form from "../form/Form";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect } from "react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

const LineForm = ({ visible, onClose, line_id }) => {
  const [lineData, setLineData] = useState([]);
  const onSubmit = async (data) => {
    console.log("Submit", data);
  };
  const formMethod = useForm({
    defaultValues: {
      line: [],
    },
  });
  const formArray = useFieldArray({
    name: "line",
    control: formMethod.control,
  });
  const formConfig = React.useMemo(
    () => ({
      form: formMethod,
      formArray,
      readOnly: false,
      lineData,
    }),
    [formArray, formMethod, line_id, lineData]
  );

  useEffect(() => {
    formMethod.reset({
      line: [],
    });
  }, [line_id]);
  console.log("visible", visible);
  console.log(formArray?.formState?.error);
  const onError = (errors, e) => console.log(errors, e);
  return (
    <>
      <Modal
        visible={visible}
        title='Line notify Form'
        width={700}
        destroyOnClose
        footer={[
          <Button onClick={onClose} key='discard'>
            Discard
          </Button>,
          <Button
            name='submit-btn'
            className='primary'
            key='submit'
            onClick={() => document.getElementById("line-submit-btn").click()}>
            Save
          </Button>,
        ]}
        onCancel={onClose}
        onOk={onSubmit}>
        <form onSubmit={formMethod.handleSubmit(onSubmit, onError)}>
          <Form {...formConfig} />
          {/* Form Information */}
          <button id='line-submit-btn' style={{ display: "none" }}>
            submit
          </button>
        </form>
      </Modal>
    </>
  );
};

export default LineForm;
