import { Button, message } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useContext, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { reset } from "redux-form";
import Swal from "sweetalert2";
import {
  getDR,
  getDRSODetail,
  getDRType,
  saveDR,
} from "../../../../../actions/sales/drActions";
import { AppContext } from "../../../../../include/js/context";
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
  customer_id: null,
  dr_type_id: 1,
  dr_actived: 1,
  tg_trans_status_id: 4,
  tg_trans_close_id: 1,
  commit: 1,
};
let readOnly = false;
const DRForm = ({ visible, onClose, dr_id }) => {
  const {
    auth: { user_name },
  } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [soData, setSOData] = useState([]);
  const [data, setData] = useState({
    dr_type: [],
  });
  const onSubmit = async (data) => {
    setLoading(true);
    const hide = message.loading("Action in progress....", 0);
    const resp = await saveDR(data.dr);
    setTimeout(hide, 0);
    if (resp.success) {
      if (resp.success) {
        await Swal.fire({
          title: "Save Successfully!",
          icon: "success",
          showCancelButton: true,
          confirmButtonText: `Back to Home`,
          cancelButtonText: `Stay here`,
        }).then((result) => {
          if (result.isConfirmed) {
            onClose();
          }
        });
      }
    } else {
      message.success({
        content: `Error ! ${resp.message}`,
        duration: 6,
        key: "save",
      });
    }

    setLoading(false);
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
      readOnly,
      soData,
      data,
    }),
    [formArray, formMethod, dr_id, soData, data, readOnly]
  );

  useEffect(() => {
    const getDRTypeData = async () => {
      const resp = await getDRType();
      if (resp.success)
        return setData((prev) => ({ ...prev, dr_type: resp.data }));
    };
    getDRTypeData();
  }, []);

  useEffect(() => {
    const getSOData = async () => {
      const resp = await getDRSODetail();
      if (resp.success) {
        setSOData(resp.data);
      }
    };
    const getDRData = async () => {
      const resp = await getDR(dr_id);
      if (resp.success) {
        readOnly = resp.data[0].tg_trans_status_id === 3;
        formMethod.reset({
          dr: resp.data.map((obj) => ({ ...obj, commit: 1, user_name })),
        });
      } else {
        message.error("Error ! Can't get any data from the server.");
      }
    };
    !dr_id ? getSOData() : getDRData();
  }, [dr_id]);

  useEffect(() => {
    formMethod.reset({
      dr: [initialState],
    });
  }, [dr_id]);

  const onError = (errors, e) => console.log(errors, e);
  return (
    <>
      <Modal
        visible={visible}
        title="Delivery Requisition Form"
        width={1000}
        destroyOnClose
        footer={
          readOnly ? (
            <Button
              className="primary"
              onClick={onClose}
              key="discard"
              loading={loading}
            >
              Back
            </Button>
          ) : (
            [
              <Button onClick={onClose} key="discard" loading={loading}>
                Discard
              </Button>,
              <Button
                name="submit-btn"
                className="primary"
                key="submit"
                onClick={() => document.getElementById("dr-submit-btn").click()}
                loading={loading}
              >
                Save
              </Button>,
            ]
          )
        }
        onCancel={onClose}
        onOk={onSubmit}
      >
        <form onSubmit={formMethod.handleSubmit(onSubmit, onError)}>
          <Form {...formConfig} />
          {/* Form Information */}
          <button type="submit" id="dr-submit-btn" className="d-none">
            submit
          </button>
        </form>
      </Modal>
    </>
  );
};

export default React.memo(DRForm);
