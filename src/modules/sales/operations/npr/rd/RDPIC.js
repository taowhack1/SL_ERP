import { Button, Col, Row, Spin } from "antd";
import React, { useContext, useState } from "react";
import CustomLabel from "../../../../../components/CustomLabel";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import {
  DatePickerField,
  SelectField,
} from "../../../../../components/AntDesignComponent";
import { NPRFormContext } from "../NPRViewById";
import { SET_LOADING } from "../../../../../actions/types";
import {
  updateNPRRDStatus,
  updateNPRStatus,
} from "../../../../../actions/sales/nprActions";
import { useHistory } from "react-router";
import Swal from "sweetalert2";
import Text from "antd/lib/typography/Text";
import useKeepLogs from "../../../../logs/useKeepLogs";
import Authorize from "../../../../system/Authorize";
import ModalRDReject from "./ModalRDReject";

const RDPIC = () => {
  const keepLog = useKeepLogs();
  const authorize = Authorize();
  authorize.check_authorize();
  const history = useHistory();
  const dispatch = useDispatch();
  const { user_name } = useSelector((state) => state.auth.authData);
  // const { loading } = useSelector((state) => state.hrm);
  const { rd: rdEmp } = useSelector((state) => state.hrm.employee);

  const { id, state } = useContext(NPRFormContext);
  const { npr_responsed_required_date, npr_responsed_required_by } = state;
  const [modal, setModal] = useState({
    visible: false,
    data: {
      npr_id: id,
      npr_remark_reject: null,
      user_name,
      commit: 1,
      tg_trans_status_id: 1,
      tg_trans_close_id: 1,
    },
  });

  const [loading, setLoading] = useState(false);
  const {
    control,
    formState: { error },
    handleSubmit,
  } = useForm({
    defaultValues: {
      npr_responsed_required_date: npr_responsed_required_date
        ? moment(npr_responsed_required_date, "DD/MM/YYYY")
        : null,
      npr_responsed_required_by,
    },
  });

  const onSubmit = async (data) => {
    keepLog.keep_log_action(
      `${user_name} Save NPR PIC : FROM ${npr_responsed_required_by} to ${data.npr_responsed_required_by}`,
      state.npr_no
    );
    // dispatch({ type: SET_LOADING, payload: true });
    const saveData = {
      ...data,
      npr_responsed_date_by: user_name,
      npr_responsed_date: moment().format("DD/MM/YYYY"),
      commit: 1,
      tg_trans_status_id: 4,
      tg_trans_close_id: 1,
      npr_responsed_remark: null,
      npr_responsed_required_date: moment(
        data.npr_responsed_required_date
      ).format("DD/MM/YYYY"),
    };
    console.log("Submit", saveData);
    const resp = await updateNPRRDStatus(id, [saveData]);

    console.log("RESPONSE ", resp);
    // setTimeout(() => {
    if (resp.success) {
      dispatch({ type: SET_LOADING, payload: false });
      // alert("Assign PIC Success.");
      Swal.fire({
        title: "Assign PIC Success.",
        icon: "success",
        confirmButtonText: `OK`,
      }).then((result) => {
        if (result.isConfirmed) {
          history.push("/sales/npr/rd");
        }
      });
      keepLog.keep_log_action("Save NPR PIC : ", state.npr_no);
      // setState(resp.data);
    }
    // }, 1000);
  };

  const onOpenReject = () => {
    setModal((prev) => ({ ...prev, visible: true }));
  };
  const onCloseReject = () => {
    setModal((prev) => ({ ...prev, visible: false }));
  };
  const onChangeRemarkReject = (text) =>
    setModal((prev) => ({
      ...prev,
      data: { ...prev.data, npr_remark_reject: text },
    }));
  const onSubmitReject = async () => {
    console.log("submitModal", modal);
    setLoading(true);
    const resp = await updateNPRStatus(modal.data);
    if (resp.success) {
      setLoading(false);
      Swal.fire({
        title: "Rejected.",
        icon: "success",
        confirmButtonText: `OK`,
      }).then((result) => {
        if (result.isConfirmed) {
          history.push("/sales/npr/rd");
        }
      });
      keepLog.keep_log_action("Reject NPR : ", state.npr_no);
    }
  };
  const modalConfig = {
    onOpenReject,
    onCloseReject,
    onChangeRemarkReject,
    onSubmitReject,
    modal,
    loading,
  };
  const editable = state.trans_id >= 2 && state.trans_id <= 5 ? true : false;
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-section-head flex-space">
          <h3>Assignment</h3>
          {editable && (
            <div>
              {[null].includes(state.rd_tg_trans_status_id) && (
                <Button
                  className=""
                  size="small"
                  loading={loading}
                  onClick={onOpenReject}
                >
                  Reject
                </Button>
              )}
              <Button
                htmlType="submit"
                className="primary"
                size="small"
                loading={loading}
              >
                Save
              </Button>
            </div>
          )}
        </div>

        <div className="form-section">
          <Spin spinning={loading}>
            <Row className="col-2">
              <Col span={12} className="pd-right-2">
                <Row className="col-2">
                  <Col span={8}>
                    <CustomLabel
                      label="Person In Charge :"
                      require
                      readOnly={state.trans_id > 6}
                    />
                  </Col>
                  <Col span={16}>
                    {state.trans_id >= 6 ? (
                      <Text>{state.npr_responsed_required_by_no_name}</Text>
                    ) : (
                      <>
                        <Controller
                          render={({ field }) =>
                            SelectField({
                              fieldProps: {
                                className: "full-width",
                                placeholder: "Select person in charge",
                                showSearch: true,
                                onChange: (val) => field.onChange(val || null),
                                ...field,
                              },
                              dataSource: rdEmp,
                              fieldName: "employee_no_name",
                              fieldId: "employee_no",
                            })
                          }
                          control={control}
                          name="npr_responsed_required_by"
                          rules={{ required: true }}
                          defaultValue={npr_responsed_required_by}
                        />
                        {error && error?.npr_responsed_required_by && (
                          <span className="require">
                            This field is required.
                          </span>
                        )}
                      </>
                    )}
                  </Col>
                </Row>
              </Col>
              <Col span={12} className="pd-left-2">
                <Row className="col-2">
                  <Col span={8}>
                    <CustomLabel
                      label="Due Date :"
                      require
                      readOnly={state.trans_id > 6 ? false : false}
                    />
                  </Col>
                  <Col span={16}>
                    {state.trans_id >= 6 ? (
                      <Text>{state.npr_responsed_required_date}</Text>
                    ) : (
                      <>
                        <Controller
                          render={({ field }) =>
                            DatePickerField({
                              fieldProps: {
                                className: "full-width",
                                placeholder: "Due date",
                                format: "DD/MM/YYYY",
                                onChange: (val) =>
                                  field.onChange(
                                    val
                                      ? console.log(
                                          moment(val).format("DD/MM/YYYY")
                                        )
                                      : null
                                  ),
                                ...field,
                              },
                            })
                          }
                          control={control}
                          name="npr_responsed_required_date"
                          rules={{ required: true }}
                        />
                        {error && error?.npr_responsed_required_date && (
                          <span className="require">
                            This field is required.
                          </span>
                        )}
                      </>
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Spin>
        </div>
      </form>
      <ModalRDReject {...modalConfig} />
    </>
  );
};

export default RDPIC;
