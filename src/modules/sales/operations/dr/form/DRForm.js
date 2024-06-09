import { Button, message } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useContext, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { reset } from "redux-form";
import Swal from "sweetalert2";
import { getCustomerAddress } from "../../../../../actions/sales";
import {
  getDR,
  getDRSODetail,
  getDRType,
  saveDR,
} from "../../../../../actions/sales/drActions";
import { AppContext } from "../../../../../include/js/context";
import useKeepLogs from "../../../../logs/useKeepLogs";
import Authorize from "../../../../system/Authorize";
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
  customer_detail_id: null,
  customer_detail_address: null,
  dr_type_id: 1,
  dr_actived: 1,
  tg_trans_status_id: 4,
  tg_trans_close_id: 1,
  commit: 1,
};
let readOnly = false;
const DRForm = ({ visible, onClose, dr_id, so_detail_id }) => {
  const keepLog = useKeepLogs();
  const authorize = Authorize();
  authorize.check_authorize();
  const {
    auth: { user_name },
  } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [soData, setSOData] = useState([]);
  const [data, setData] = useState({
    dr_type: [],
    customerLocation: [],
  });

  const formMethod = useForm({
    defaultValues: {
      dr: [initialState],
    },
  });

  const formArray = useFieldArray({
    name: "dr",
    control: formMethod.control,
  });

  const onSubmit = async (data) => {
    keepLog.keep_log_action(`Click Save DR`);
    setLoading(true);
    const hide = message.loading("Action in progress....", 0);
    const resp = await saveDR(data.dr);
    setTimeout(hide, 0);
    if (resp.success) {
      await Swal.fire({
        title: "Save Successfully!",
        icon: "success",
        showCancelButton: true,
        confirmButtonText: `Back to Home`,
        cancelButtonText: `Stay here`,
      }).then((result) => {
        keepLog.keep_log_action(`Save DR Success`);
        if (result.isConfirmed) {
          onClose();
        } else {
          readOnly = resp.data[0].tg_trans_status_id === 3;
          formMethod.reset({ dr: [resp.data[0]] });
        }
      });
    } else {
      keepLog.keep_log_action(`Save DR Error`);
      message.success({
        content: `Error ! ${resp.message}`,
        duration: 6,
        key: "save",
      });
    }

    setLoading(false);
  };

  const getCustomerLocation = async (customer_id) => {
    const respCus = await getCustomerAddress(customer_id);
    setData((prev) => ({ ...prev, customerLocation: respCus.data }));
  };

  const formConfig = React.useMemo(
    () => ({
      form: formMethod,
      formArray,
      readOnly,
      soData,
      data,
      getCustomerLocation,
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

      const resp = await getDRSODetail(so_detail_id);
      readOnly = false;

      if (resp.success) {
        if (so_detail_id) {
          // FIND SO DETAIL FROM LIST BY USER CLICK FROM LIST
          // const findData = resp?.data
          const findData = resp?.data?.find(
            (obj) => obj.so_detail_id === so_detail_id
          );

          if (!findData) {
            message.error(
              "Can't get any data from the server. Try agin later."
            );
            return false;
          }

          const {
            so_id,
            tg_so_detail_qty_delivery,
            so_detail_delivery_date,
            dr_location_delivery,
            so_no_description,
            customer_id,
          } = findData;
          // GET CUSTOMER ADDRESS
          getCustomerLocation(customer_id);
          // RESET FORM DATA
          formMethod.reset({
            dr: [
              {
                ...initialState,
                so_id,
                so_detail_id,
                dr_qty: tg_so_detail_qty_delivery,
                dr_delivery_date: so_detail_delivery_date,
                dr_location_delivery,
                so_no_description,
                customer_id,
                user_name,
                commit: 1,
              },
            ],
          });
        }
        // IF COME FORM CREATE BUTTON DO THIS FUNCTION
        !so_detail_id && setSOData(resp.data);
      }
    };

    const getDRData = async () => {
      const resp = await getDR(dr_id);
      console.log("resp getDR", resp);
      if (resp.success) {
        // CHECK DR STAUS IF TRUE = DISABLED EDITING
        readOnly =
          resp.data[0].tg_trans_status_id === 3 ||
          resp.data[0].button_cancel === 0;
        // GET CUSTOMER ADDRESS
        getCustomerLocation(resp.data[0]?.customer_id);
        formMethod.reset({
          dr: resp.data.map((obj) => ({ ...obj, commit: 1, user_name })),
        });
      } else {
        message.error("Error ! Can't get any data from the server.");
      }
    };

    !dr_id ? getSOData() : getDRData();
  }, [dr_id, so_detail_id]);

  useEffect(() => {
    formMethod.reset({
      dr: [initialState],
    });
    return () => {
      readOnly = false;
    };
  }, [dr_id]);

  const onCloseModal = () => {
    formMethod.reset({
      dr: [initialState],
    });
    onClose();
  };

  const onError = (errors, e) => console.log(errors, e);
  console.log("readOnly : ", readOnly);
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
              onClick={onCloseModal}
              key="discard"
              loading={loading}
            >
              Back
            </Button>
          ) : (
            [
              <Button onClick={onCloseModal} key="discard" loading={loading}>
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
        onCancel={onCloseModal}
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
