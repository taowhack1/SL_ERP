import { Button } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { getDRSODetail } from "../../../../../actions/sales/drActions";
import Form from "./Form";

const initialState = {
  user_name: null,
  dr_id: null,
  dr_remark: null,
  dr_qty: 0,
  po_no: null,
  dr_delivery_date: null,
  dr_delivery_time: null,
  dr_description: null,
  dr_agreement: null,
  dr_location_delivery: null,
  dr_location_sender: null,
  so_id: null,
  so_detail_id: null,
  dr_type_id: 1,
  dr_actived: 1,
  tg_trans_status_id: 1,
  tg_trans_close_id: 1,
  commit: 1,
};
const DRForm = ({ visible, onClose, dr_id }) => {
  const [soData, setSOData] = useState([]);
  const onSubmit = async (data) => {
    console.log("submit", data);
  };
  const formMethod = useForm({
    defaultValues: {
      dr: [initialState],
    },
  });
  const formArray = useFieldArray({
    name: "dr",
    control: formMethod.control,
  });
  const formConfig = React.useMemo(
    () => ({
      form: formMethod,
      formArray,
      readOnly: false,
      soData,
    }),
    [formArray, formMethod, dr_id, soData]
  );

  useEffect(() => {
    const getSOData = async () => {
      const resp = await getDRSODetail();
      if (resp.success) {
        setSOData(resp.data);
      }
    };
    !dr_id && getSOData();
  }, [dr_id]);
  useEffect(() => {
    formMethod.reset({
      dr: [initialState],
    });
  }, [dr_id]);
  console.log("visible", visible);
  console.log(formArray?.formState?.error);
  const onError = (errors, e) => console.log(errors, e);
  return (
    <>
      <Modal
        visible={visible}
        title="Delivery Requisition Form"
        width={1000}
        destroyOnClose
        footer={[
          <Button onClick={onClose} key="discard">
            Discard
          </Button>,
          <Button
            name="submit-btn"
            className="primary"
            key="submit"
            onClick={() => document.getElementById("dr-submit-btn").click()}
          >
            Save
          </Button>,
        ]}
        onCancel={onClose}
        onOk={onSubmit}
      >
        <form onSubmit={formMethod.handleSubmit(onSubmit, onError)}>
          <Form {...formConfig} />
          {/* Form Information */}
          <button type="submit" id="dr-submit-btn">
            submit
          </button>
        </form>
      </Modal>
    </>
  );
};

export default React.memo(DRForm);
