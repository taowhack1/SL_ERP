import { Col, DatePicker, Radio, Row, Space } from "antd";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  DatePickerField,
  InputField,
  InputNumberField,
  SelectField,
  TextAreaField,
} from "../../../../../../components/AntDesignComponent";
import CustomLabel from "../../../../../../components/CustomLabel";
import {
  convertDigit,
  getNumberFormat,
} from "../../../../../../include/js/main_config";
import moment from "moment";
import { useSelector } from "react-redux";
import Text from "antd/lib/typography/Text";

const RequestSampleForm = () => {
  const { rd: rdEmp } = useSelector((state) => state.hrm.employee);
  const {
    control,
    formState: { errors },
    register,
    npr_additional_id,
    setValue,
    watch,
    disabledEdit: readOnly,
    record: {
      npr_additional_response_by_name,
      trans_status,
      npr_additional_response_due_date,
      npr_additional_actual_qty,
      npr_additional_batch_size,
      npr_additional_remark_reject,
      npr_additional_created_by_name,
      npr_additional_request_date,
      npr_additional_remark,
      npr_additional_request_qty,
    },
  } = useFormContext();
  const watchData = watch("trans_id");
  return (
    <>
      <div className="form-section">
        <Row className="col-2 mb-1" gutter={[36, 0]}>
          <Col span={12} className="col-border-right">
            <Row className="col-2 mb-1" gutter={8}>
              <Col span={8}>
                <CustomLabel require readOnly={readOnly} label={"PIC :"} />
              </Col>
              <Col span={16}>
                {readOnly ? (
                  <Text className="pre-wrap">
                    {npr_additional_response_by_name}
                  </Text>
                ) : (
                  <Controller
                    render={({ field }) =>
                      SelectField({
                        fieldProps: {
                          disabled:
                            npr_additional_id && ![null, 1].includes(watchData)
                              ? false
                              : true,
                          className: "w-100",
                          placeholder: "Person in charge",
                          allowClear: true,
                          showSearch: true,
                          onChange: (val) => {
                            console.log("onChange", val, watchData);
                            field.onChange(val || null);
                            if (watchData && watchData !== 1) {
                              setValue("trans_id", 3);
                              setValue("tg_trans_status_id", 2);
                            }
                          },
                          value: field.value,
                        },
                        dataSource: rdEmp,
                        fieldId: "employee_no",
                        fieldName: "employee_no_name",
                      })
                    }
                    name="npr_additional_response_by"
                    control={control}
                    rules={{
                      required: ![null, 1].includes(watchData) ? true : false,
                    }}
                  />
                )}

                {errors && errors?.npr_additional_response_by && (
                  <span className="require">* This field is required.</span>
                )}
              </Col>
            </Row>
            <Row className="col-2 mt-1 mb-1" gutter={8}>
              <Col span={8}>
                <CustomLabel
                  require={![null, 1].includes(watchData) ? true : false}
                  readOnly={readOnly}
                  label={"Delivery Date :"}
                />
              </Col>
              <Col span={16}>
                {readOnly ? (
                  <Text className="pre-wrap">
                    {npr_additional_response_due_date}
                  </Text>
                ) : (
                  <Controller
                    render={({ field }) =>
                      DatePickerField({
                        fieldProps: {
                          disabled:
                            npr_additional_id && ![null, 1].includes(watchData)
                              ? false
                              : true,
                          className: "full-width",
                          placeholder: "Deliver date",
                          format: "DD/MM/YYYY",
                          onChange: (val) =>
                            field.onChange(
                              val ? moment(val).format("DD/MM/YYYY") : null
                            ),
                          value: field.value
                            ? moment(field.value, "DD/MM/YYYY")
                            : null,
                        },
                      })
                    }
                    control={control}
                    name="npr_additional_response_due_date"
                    rules={{
                      required: ![null, 1].includes(watchData) ? true : false,
                    }}
                  />
                )}
                {errors && errors?.npr_additional_response_due_date && (
                  <span className="require">* This field is required.</span>
                )}
              </Col>
            </Row>
            <Row className="col-2 mt-1 mb-1" gutter={8}>
              <Col span={8}>
                <CustomLabel
                  require={![null, 1].includes(watchData) ? true : false}
                  readOnly={readOnly}
                  label={"Sample Qty. :"}
                />
              </Col>
              <Col span={16}>
                {readOnly ? (
                  <Text className="pre-wrap">
                    {convertDigit(npr_additional_actual_qty, 4)}
                  </Text>
                ) : (
                  <Controller
                    render={({ field }) =>
                      InputNumberField({
                        fieldProps: {
                          className: "full-width",
                          disabled:
                            npr_additional_id && ![null, 1].includes(watchData)
                              ? false
                              : true,
                          placeholder: "Sample Qty",
                          defaultValue: 0,
                          min: 0,
                          step: 1,
                          ...getNumberFormat(4),
                          onChange: (val) => field.onChange(val || 0),
                          value: field.value,
                        },
                      })
                    }
                    name="npr_additional_actual_qty"
                    control={control}
                    rules={{
                      required: ![null, 1].includes(watchData) ? true : false,
                    }}
                  />
                )}
                {errors && errors?.npr_additional_actual_qty && (
                  <span className="require">* This field is required.</span>
                )}
              </Col>
            </Row>
            <Row className="col-2 mt-1 mb-1" gutter={8}>
              <Col span={8}>
                <CustomLabel
                  require={![null, 1].includes(watchData) ? true : false}
                  readOnly={readOnly}
                  label={"Batch Size (g) :"}
                />
              </Col>
              <Col span={16}>
                {readOnly ? (
                  <Text className="pre-wrap">
                    {convertDigit(npr_additional_batch_size, 4)}
                  </Text>
                ) : (
                  <Controller
                    render={({ field }) =>
                      InputNumberField({
                        fieldProps: {
                          disabled:
                            npr_additional_id && ![null, 1].includes(watchData)
                              ? false
                              : true,
                          className: "full-width",
                          placeholder: "Batch Size(g)",
                          defaultValue: 0,
                          min: 0,
                          step: 1,
                          ...getNumberFormat(4),
                          onChange: (val) => field.onChange(val || 0),
                          value: field.value,
                        },
                      })
                    }
                    name="npr_additional_batch_size"
                    control={control}
                    rules={{
                      required: ![null, 1].includes(watchData) ? true : false,
                    }}
                  />
                )}
                {errors && errors?.npr_additional_batch_size && (
                  <span className="require">* This field is required.</span>
                )}
              </Col>
            </Row>
            <Row className="col-2 mt-1 mb-1" gutter={8}>
              <Col span={8}>
                <CustomLabel require readOnly={readOnly} label={"Status :"} />
              </Col>
              <Col span={16}>
                {readOnly ? (
                  <Text className="pre-wrap">{trans_status}</Text>
                ) : (
                  <Controller
                    render={({ field }) => (
                      <Radio.Group
                        disabled={npr_additional_id ? false : true}
                        onChange={(e) => {
                          const val = e.target.value;
                          console.log("onChange", val);
                          switch (val) {
                            case 1:
                              // Reject
                              field.onChange(val);
                              setValue("tg_trans_status_id", 1);
                              setValue("tg_trans_close_id", 1);
                              setValue("npr_additional_response_by", null);
                              setValue(
                                "npr_additional_response_due_date",
                                null
                              );
                              setValue("npr_additional_actual_qty", 0);
                              setValue("npr_additional_batch_size", 0);
                              console.log("case 1");
                              break;
                            case 2:
                            // Pending
                            case 3:
                              // In-Process
                              field.onChange(val);
                              setValue("tg_trans_status_id", 2);
                              setValue("tg_trans_close_id", 1);
                              setValue("npr_additional_remark_reject", null);
                              console.log("case 2,3");
                              break;
                            case 4:
                              // Cancel
                              field.onChange(val);
                              setValue("tg_trans_status_id", 3);
                              setValue("tg_trans_close_id", 1);
                              setValue("npr_additional_remark_reject", null);

                              console.log("case 4");
                              break;
                            case 5:
                              // Finished
                              field.onChange(val);
                              setValue("tg_trans_status_id", 4);
                              setValue("tg_trans_close_id", 1);
                              setValue("npr_additional_remark_reject", null);

                              console.log("case 5");
                              break;
                            case 6:
                              // Complete
                              field.onChange(val);
                              setValue("tg_trans_status_id", 4);
                              setValue("tg_trans_close_id", 3);
                              setValue("npr_additional_remark_reject", null);

                              console.log("case 6");
                              break;

                            default:
                              field.onChange(val);
                              setValue("npr_additional_remark_reject", null);

                              console.log("case default");
                              break;
                          }
                        }}
                        value={field.value}
                      >
                        <Space direction="vertical">
                          <Radio value={2} disabled={true}>
                            Pending
                          </Radio>
                          <Radio value={1}>Reject</Radio>
                          <Radio value={3}>In-Process</Radio>
                          <Radio value={5}>Finished</Radio>
                          <Radio value={4} disabled={true}>
                            Cancel
                          </Radio>
                          <Radio value={6} disabled={true}>
                            Complete
                          </Radio>
                        </Space>
                      </Radio.Group>
                    )}
                    name="trans_id"
                    control={control}
                    rules={{ required: true }}
                  />
                )}
                {errors && errors?.trans_id && (
                  <span className="require">* This field is required.</span>
                )}
              </Col>
            </Row>
            {watchData === 1 && (
              <Row className="col-2 mb-1" gutter={8}>
                <Col span={8}>
                  <CustomLabel
                    readOnly={readOnly}
                    require
                    label={"Reject Remark :"}
                  />
                </Col>
                <Col span={16}>
                  {readOnly ? (
                    <Text className="pre-wrap">
                      {npr_additional_remark_reject}
                    </Text>
                  ) : (
                    <Controller
                      render={({ field }) =>
                        TextAreaField({
                          fieldProps: {
                            className: "full-width",
                            placeholder: "Reject Remark",
                            onChange: (val) => field.onChange(val || 0),
                            value: field.value,
                          },
                        })
                      }
                      name="npr_additional_remark_reject"
                      control={control}
                      rules={{ required: watchData === 1 ? true : false }}
                    />
                  )}
                  {errors && errors?.npr_additional_remark_reject && (
                    <span className="require">* This field is required.</span>
                  )}
                </Col>
              </Row>
            )}
          </Col>
          <Col span={12}>
            <Row className="col-2 mb-1" gutter={8}>
              <Col span={8}>
                <CustomLabel readOnly={readOnly} label={"Request By :"} />
              </Col>
              <Col span={16}>
                {npr_additional_created_by_name || "-"}
                <input
                  {...register("npr_additional_created_by")}
                  className="disabled-input d-none"
                />
              </Col>
            </Row>
            <Row className="col-2 mt-1 mb-1" gutter={8}>
              <Col span={8}>
                <CustomLabel readOnly={readOnly} label={"Request Date :"} />
              </Col>
              <Col span={16}>
                <Text className="pre-wrap">{npr_additional_request_date}</Text>
                <input
                  {...register("npr_additional_request_date")}
                  className="disabled-input d-none"
                />
              </Col>
            </Row>
            <Row className="col-2 mt-1 mb-1" gutter={8}>
              <Col span={8}>
                <CustomLabel readOnly={readOnly} label={"Request Qty. :"} />
              </Col>
              <Col span={16}>
                {convertDigit(npr_additional_request_qty, 3)}
                <input
                  {...register("npr_additional_request_qty")}
                  className="disabled-input d-none"
                />
              </Col>
            </Row>
            <Row className="col-2 mt-1 mb-1" gutter={8}>
              <Col span={8}>
                <CustomLabel readOnly={readOnly} label={"Remark :"} />
              </Col>
              <Col span={16}>
                <Text className="pre-wrap">{npr_additional_remark}</Text>
                <input
                  {...register("npr_additional_remark")}
                  className="disabled-input d-none"
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default React.memo(RequestSampleForm);
