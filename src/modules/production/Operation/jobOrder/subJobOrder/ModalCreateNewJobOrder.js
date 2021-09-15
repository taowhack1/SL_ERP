import { Button, Col, Divider, message, Row, Space } from "antd";
import Modal from "antd/lib/modal/Modal";
import Text from "antd/lib/typography/Text";
import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { getDataFunction } from "../../../../../actions";
import CustomLabel from "../../../../../components/CustomLabel";
import {
  convertDigit,
  getNumberFormat,
} from "../../../../../include/js/main_config";
import {
  DatePickerField,
  InputField,
  InputNumberField,
  TextAreaField,
} from "../../../../../components/AntDesignComponent";
import moment from "moment";
import {
  jobOrderUpdateStatus,
  saveJubOrder,
} from "../../../../../actions/production/jobOrderActions";
import { AppContext } from "../../../../../include/js/context";
import { PrinterTwoTone } from "@ant-design/icons";
const apiJobOrder = `/production/job_order`;
const initialState = {
  mrp_id: null,
  user_name: null,
  job_order_id: null,
  job_order_plan_date: null,
  routing_detail_type_id: null,
  job_order_id: null,
  job_order_qty: null,
  job_order_description: null,
  job_order_remark: null,
  job_order_actived: 1,
  tg_trans_status_id: 2,
  tg_trans_close_id: 1,
  commit: 1,
};
const initialStateConfig = {
  loading: false,
  readOnly: true,
  isUpdate: false,
};
const formConfig = {
  max_qty: 0,
  uom_no: null,
  job_order: {},
  jobUpdate: false,
};

const ModalCreateNewJobOrder = ({
  visible = true,
  job_order_id = null,
  routing_detail_type_id = 1,
  uom_no = "Kg",
  mrp_id = null,
  onClose,
  fetchData,
  onPrint,
  sepBulk = 0,
  sepFG = 0,
  bulk_job_order_no_description,
  fg_job_order_no_description,
}) => {
  const {
    auth: { user_name },
  } = useContext(AppContext);
  const [config, setConfig] = useState(initialStateConfig);
  const { loading, readOnly } = config || {};
  const {
    job_order_description,
    job_order_qty,
    job_order_plan_date,
    job_order_remark,
    button_edit,
    button_confirm,
    button_recall,
    button_cancel,
    button_completed,
    tg_trans_status_id,
    job_order_no,
  } = formConfig?.job_order || {};
  const {
    control,
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: initialState,
  });

  const getJobData = async (job_order_id) => {
    setConfig((prev) => ({ ...prev, loading: true }));
    if (job_order_id) {
      const resp = await getDataFunction(apiJobOrder, `/${job_order_id}`);
      if (resp.success) {
        reset({ ...resp.data[0], routing_detail_type_id });
        formConfig.max_qty =
          routing_detail_type_id === 1
            ? resp?.data[0]?.job_order_qty + sepBulk
            : resp?.data[0]?.job_order_qty + sepFG;

        formConfig.uom_no = resp?.data[0]?.uom_no;
        formConfig.job_order = resp?.data[0];
      } else {
        message.error(resp.message);
      }
    } else {
      reset({
        ...initialState,
        job_order_description:
          routing_detail_type_id === 1
            ? bulk_job_order_no_description
            : fg_job_order_no_description,
      });
      formConfig.max_qty = routing_detail_type_id === 1 ? sepBulk : sepFG;
      formConfig.uom_no = uom_no;
      setReadOnly(false);
    }
    setConfig((prev) => ({ ...prev, loading: false, isUpdate: false }));
  };

  const setReadOnly = (bool = false) =>
    setConfig((prev) => ({ ...prev, readOnly: bool }));

  const onUpdateStatus = async ({
    job_order_id,
    tg_trans_status_id,
    tg_trans_close_id,
    remark = null,
  }) => {
    setConfig((prev) => ({ ...prev, loading: true }));
    if (!job_order_id && !tg_trans_status_id)
      return message.error("Missing job_order_id , tg_trans_status_id");
    const updateStatusData = [
      {
        user_name,
        commit: 1,
        job_order_id,
        tg_trans_status_id,
        tg_trans_close_id,
        remark,
      },
    ];
    const resp = await jobOrderUpdateStatus(updateStatusData);
    if (resp.success) {
      message.success("Success.", 4);
      formConfig.jobUpdate = true;
      getJobData(job_order_id);
      setConfig((prev) => ({
        ...prev,
        loading: false,
        isUpdate: true,
        readOnly: true,
      }));
    } else {
      message.error("Error!. Please Contact Administrator", 6);
      setConfig((prev) => ({ ...prev, loading: false, isUpdate: false }));
    }
  };

  const onSubmit = async (data) => {
    setConfig((prev) => ({ ...prev, loading: true }));
    const saveData = [
      { ...data, routing_detail_type_id, user_name, mrp_id, commit: 1 },
    ];
    const resp = await saveJubOrder(saveData);
    if (resp.success) {
      const { job_order_id } = resp.data.length ? resp.data[0] : {};
      console.log("resp onSubmit", resp);
      message.success("Save Success.", 4);
      formConfig.jobUpdate = true;
      getJobData(job_order_id);
      setConfig((prev) => ({
        ...prev,
        loading: false,
        isUpdate: true,
        readOnly: true,
      }));
    } else {
      message.success(resp.message, 6);
      setConfig((prev) => ({ ...prev, loading: false }));
    }
  };

  const onError = (error) => console.log(error);

  useEffect(() => {
    visible && getJobData(job_order_id);
    return () => {
      reset(initialState);
      setConfig(initialStateConfig);
      formConfig.job_order = {};
      formConfig.jobUpdate && fetchData();
      formConfig.jobUpdate = false;
    };
  }, [job_order_id, visible]);

  return (
    <Modal
      visible={visible}
      width={900}
      title={"Job Order"}
      destroyOnClose
      onCancel={() => onClose()}
      onClose={() => onClose()}
      confirmLoading={loading}
      footer={
        readOnly ? (
          <Button type="default" onClick={() => onClose()} loading={loading}>
            Back
          </Button>
        ) : (
          <Space size={8}>
            <Button type="default" onClick={() => onClose()} loading={loading}>
              Discard
            </Button>
            <Button
              type="primary"
              onClick={() => document.getElementById("submit-btn").click()}
              loading={loading}
            >
              Save
            </Button>
          </Space>
        )
      }
    >
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <input className="d-none" {...register("routing_detail_type_id")} />
        <input className="d-none" {...register("job_order_id")} />
        <input className="d-none" {...register("job_order_actived")} />
        <input className="d-none" {...register("tg_trans_status_id")} />
        <input className="d-none" {...register("tg_trans_close_id")} />
        <input className="d-none" {...register("job_order_actived")} />
        <Row className="col-2 mt-1 mb-1" gutter={16}>
          <Col span={24}>
            {readOnly ? (
              <>
                <div className="d-flex flex-space">
                  <Space size={12}>
                    {tg_trans_status_id === 3 && (
                      <h2 className="error"># Job Order นี้ถูกยกเลิกแล้ว</h2>
                    )}
                    {button_edit === 1 && (
                      <Button type="primary" onClick={() => setReadOnly(false)}>
                        Edit
                      </Button>
                    )}
                    {button_confirm === 1 && (
                      <Button
                        onClick={() =>
                          onUpdateStatus({
                            job_order_id,
                            tg_trans_status_id: 4,
                            tg_trans_close_id: 1,
                            remark: `Confirm by ${user_name}`,
                          })
                        }
                      >
                        Confirm
                      </Button>
                    )}
                    {button_completed === 1 && (
                      <Button
                        type="primary"
                        onClick={() =>
                          onUpdateStatus({
                            job_order_id,
                            tg_trans_status_id: 4,
                            tg_trans_close_id: 3,
                            remark: `Close job by ${user_name}`,
                          })
                        }
                      >
                        จบงาน
                      </Button>
                    )}
                    {button_recall === 1 && (
                      <Button
                        danger
                        onClick={() =>
                          onUpdateStatus({
                            job_order_id,
                            tg_trans_status_id: 2,
                            tg_trans_close_id: 1,
                            remark: `Cancel Confirm by ${user_name}`,
                          })
                        }
                      >
                        ยกเลิก Confirm
                      </Button>
                    )}

                    {button_cancel === 1 && (
                      <Button
                        danger
                        onClick={() =>
                          onUpdateStatus({
                            job_order_id,
                            tg_trans_status_id: 3,
                            tg_trans_close_id: 1,
                            remark: `Cancel by ${user_name}`,
                          })
                        }
                      >
                        Cancel
                      </Button>
                    )}
                  </Space>
                  <div>
                    <Button
                      icon={<PrinterTwoTone />}
                      onClick={() => onPrint(job_order_no)}
                    >
                      Print
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <Row className="col-2 mt-1 mb-1" gutter={8}>
                <Col span={6}>
                  <CustomLabel
                    label="จำนวนคงเหลือที่แบ่งได้ :"
                    require
                    readOnly={readOnly}
                  />
                </Col>
                <Col span={18}>
                  <Text strong className="require">
                    {convertDigit(formConfig.max_qty, 6)}
                  </Text>
                  <Text strong className="pd-left-2">
                    {formConfig.uom_no || "-"}.
                  </Text>
                </Col>
              </Row>
            )}
            <Divider />
            <Row className="col-2 mt-1 mb-1" gutter={8}>
              <Col span={6}>
                <CustomLabel label="ชื่องาน :" require readOnly={readOnly} />
              </Col>
              <Col span={18}>
                {readOnly ? (
                  <Text className="text-value text-right pre-wrap">
                    {job_order_description || "-"}
                  </Text>
                ) : (
                  <>
                    <Controller
                      render={({ field }) =>
                        InputField({
                          fieldProps: {
                            placeholder: "ชื่องาน",
                            className: "w-100",
                            disabled: loading,
                            ...field,
                          },
                        })
                      }
                      name="job_order_description"
                      control={control}
                      rules={{ required: true }}
                    />
                    {errors?.job_order_description && (
                      <span className="require">This field is required.</span>
                    )}
                  </>
                )}
              </Col>
            </Row>
            <Row className="col-2 mt-1 mb-1" gutter={8}>
              <Col span={6}>
                <CustomLabel
                  label={`จำนวนที่ต้องการแบ่ง (${formConfig.uom_no || ""}) :`}
                  require
                  readOnly={readOnly}
                />
              </Col>
              <Col span={18}>
                <div className="d-flex flex-start">
                  <div className="w-50">
                    {readOnly ? (
                      <>
                        <Text className="text-value pre-wrap">
                          {convertDigit(job_order_qty, 6)}
                        </Text>
                      </>
                    ) : (
                      <>
                        <Controller
                          render={({ field }) =>
                            InputNumberField({
                              fieldProps: {
                                placeholder: "จำนวนที่ต้องการแบ่ง",
                                className: "w-100",
                                disabled: loading,
                                ...getNumberFormat(6),
                                ...field,
                                min: 0,
                                max: formConfig.max_qty,
                              },
                            })
                          }
                          name="job_order_qty"
                          control={control}
                          rules={{ required: true }}
                        />
                        {errors?.job_order_qty && (
                          <span className="require">
                            This field is required.
                          </span>
                        )}
                        <span className="require pd-left-2">{`( สูงสุดไม่เกิน : ${convertDigit(
                          formConfig.max_qty,
                          6
                        )})`}</span>
                      </>
                    )}
                  </div>
                </div>
                {/* <Button htmlType="submit" type="primary" className="w-50 mt-2">
                  คำนวณวัตถุดิบ
                </Button> */}
              </Col>
            </Row>
            <Row className="col-2 mt-1 mb-1" gutter={8}>
              <Col span={6}>
                <CustomLabel
                  label="วันที่จะเริ่มผลิต :"
                  require
                  readOnly={readOnly}
                />
              </Col>
              <Col span={18}>
                <div className="d-flex flex-start">
                  <div className="w-50">
                    {readOnly ? (
                      <Text className="text-value">
                        {job_order_plan_date || "-"}
                      </Text>
                    ) : (
                      <>
                        <Controller
                          render={({ field: { value, onChange } }) =>
                            DatePickerField({
                              fieldProps: {
                                placeholder: "วันที่จะเริ่มผลิต",
                                className: "w-100",
                                disabled: loading,
                                format: "DD/MM/YYYY",
                                onChange: (val) =>
                                  onChange(moment(val).format("DD/MM/YYYY")),
                                value: value
                                  ? moment(value, "DD/MM/YYYY")
                                  : null,
                              },
                            })
                          }
                          name="job_order_plan_date"
                          control={control}
                          rules={{ required: true }}
                        />
                        {errors?.job_order_plan_date && (
                          <span className="require">
                            This field is required.
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </Col>
            </Row>
            <Divider />
            <Row className="col-2 mt-1 mb-1" gutter={8}>
              <Col span={6}>
                <CustomLabel label="หมายเหตุ :" readOnly={readOnly} />
              </Col>
              <Col span={18}>
                {readOnly ? (
                  <Text className="text-value pre-wrap">
                    {job_order_remark || "-"}
                  </Text>
                ) : (
                  <Controller
                    render={({ field: { onChange, value } }) =>
                      TextAreaField({
                        fieldProps: {
                          placeholder: "หมายเหตุ",
                          className: "w-100",
                          disabled: loading,
                          onChange: (e) => onChange(e.target.value),
                          value: value,
                        },
                      })
                    }
                    name="job_order_remark"
                    control={control}
                    rules={{ required: false }}
                  />
                )}
              </Col>
            </Row>
          </Col>
        </Row>
        <button type="submit" className="d-none" id="submit-btn">
          Hiden Submit
        </button>
      </form>
    </Modal>
  );
};

export default React.memo(ModalCreateNewJobOrder);
