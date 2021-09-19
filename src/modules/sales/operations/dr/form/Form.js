import { Checkbox, Col, Row } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useContext } from "react";
import moment from "moment";

import CustomLabel from "../../../../../components/CustomLabel";
import { Controller } from "react-hook-form";
import {
  DatePickerField,
  InputField,
  InputNumberField,
  radioField,
  SelectField,
  TextAreaField,
  TimePickerField,
} from "../../../../../components/AntDesignComponent";
import { AppContext } from "../../../../../include/js/context";
import {
  convertDigit,
  getNumberFormat,
} from "../../../../../include/js/main_config";
const Form = ({
  formArray: { fields },
  form: {
    control,
    register,
    setValue,
    formState: { errors },
    watch,
  },
  readOnly,
  soData,
  data: { dr_type, customerLocation },
  getCustomerLocation,
}) => {
  const {
    auth: { user_name, employee_no_name_eng },
  } = useContext(AppContext);
  const { so_detail_id, customer_detail_name } = watch("dr.0");
  return (
    <>
      {fields.map((obj, index) => (
        <div className="form-group" key={index}>
          <div className="d-none">
            <input {...register(`dr.${index}.po_no`)} />
            <input {...register(`dr.${index}.customer_id`)} />
            <input {...register(`dr.${index}.dr_id`)} />
            <input {...register(`dr.${index}.so_id`)} />
            <input {...register(`dr.${index}.dr_actived`)} />
            <input {...register(`dr.${index}.tg_trans_status_id`)} />
            <input {...register(`dr.${index}.tg_trans_close_id`)} />
            <input {...register(`dr.${index}.commit`)} />
          </div>
          {readOnly && (
            <div className="under-line text-center pb-1">
              {obj.tg_trans_status_id === 3 ? (
                <h2 className="error">เอกสารนี้ถูกยกเลิก</h2>
              ) : (
                <h2 className="success">กำลังดำเนินการส่งของ</h2>
              )}
            </div>
          )}

          <Row gutter={[24, 8]} className="col-2 row-margin-vertical">
            <Col span={12} className="col-border-right">
              <Row className="col-2 mt-1 mb-1">
                <Col span={8}>
                  <Text strong>DR No. :</Text>
                </Col>
                <Col span={16}>
                  <Text>{obj?.dr_no || "-"}</Text>
                </Col>
              </Row>
              <Row className="col-2 mt-1 mb-1">
                <Col span={8}>
                  <Text strong>Contact By. :</Text>
                </Col>
                <Col span={16}>
                  <Controller
                    name={`dr.${index}.user_name`}
                    control={control}
                    render={({ field }) =>
                      InputField({
                        fieldProps: {
                          placeholder: "Contact name",
                          className: "d-none",
                          disabled: obj?.tg_trans_status_id === 3,
                          ...field,
                        },
                      })
                    }
                    defaultValue={user_name}
                  />
                  <Text>{obj?.dr_created_by_no_name || "-"}</Text>
                </Col>
              </Row>
              <Row className="col-2 mt-1 mb-1">
                <Col span={8}>
                  <Text strong>Delivery Type :</Text>
                </Col>
                <Col span={16}>
                  {readOnly ? (
                    <Text>{obj?.dr_type_name}</Text>
                  ) : (
                    <>
                      <Controller
                        name={`dr.${index}.dr_type_id`}
                        control={control}
                        render={({ field }) =>
                          radioField(dr_type, field, {
                            fieldId: "dr_type_id",
                            fieldName: "dr_type_name",
                            disabled: obj?.tg_trans_status_id === 3,
                          })
                        }
                        defaultValue={obj?.dr_type_id}
                        rules={{ required: true }}
                      />
                      {errors.dr && errors?.dr[index]?.dr_type_id && (
                        <Text className="error">This field is required.</Text>
                      )}
                    </>
                  )}
                </Col>
              </Row>
              {/* <Row className="col-2 mt-1 mb-1">
                <Col span={8}>
                  <Text strong>Contact No. :</Text>
                </Col>
                <Col span={16}>
                  {readOnly ? (
                    <Text>{obj?.dr_phone_no}</Text>
                  ) : (
                    <Controller
                      name={`dr.${index}.dr_phone_no`}
                      control={control}
                      render={({ field }) =>
                        InputField({
                          fieldProps: {
                            placeholder: "Phone No.",
                            className: "w-100",
                            disabled: obj?.tg_trans_status_id === 3,
                            ...field,
                          },
                        })
                      }
                    />
                  )}
                </Col>
              </Row> */}
              <Row className="col-2 mt-1 mb-1">
                <Col span={8}>
                  <Text strong>Remark :</Text>
                </Col>
                <Col span={16}>
                  {readOnly ? (
                    <Text className="pre-wrap">{obj?.dr_remark}</Text>
                  ) : (
                    <Controller
                      name={`dr.${index}.dr_remark`}
                      control={control}
                      render={({ field }) =>
                        TextAreaField({
                          fieldProps: {
                            placeholder: "Remark",
                            className: "w-100",
                            rows: 4,
                            disabled: obj?.tg_trans_status_id === 3,
                            ...field,
                          },
                        })
                      }
                    />
                  )}
                </Col>
              </Row>
              {obj?.dr_id && !readOnly && (
                <div
                  className="mt-2 pt-1"
                  style={{ borderTop: "1px solid #c0c0c0" }}
                >
                  <Row className="col-2 mt-1 mb-1">
                    <Col span={8}>
                      <CustomLabel label="Cancel :" readOnly={readOnly} />
                    </Col>
                    <Col span={16}>
                      <Controller
                        name={`dr.${index}.tg_trans_status_id`}
                        control={control}
                        render={({ field: { value } }) => (
                          <Checkbox
                            checked={value === 3 ? true : false}
                            onChange={(e) => {
                              e.target.checked
                                ? setValue(`dr.${index}.tg_trans_status_id`, 3)
                                : setValue(`dr.${index}.tg_trans_status_id`, 1);
                            }}
                            defaultChecked={false}
                          />
                        )}
                      />
                    </Col>
                  </Row>
                </div>
              )}
            </Col>
            <Col span={12}>
              <Row className="col-2 mt-1 mb-1">
                <Col span={8}>
                  <CustomLabel
                    label="Item :"
                    readOnly={readOnly}
                    require={true}
                  />
                </Col>
                <Col span={16}>
                  {readOnly ? (
                    <Text className="pre-wrap">{obj?.so_no_item_qty_uom}</Text>
                  ) : (
                    <>
                      {obj?.tg_trans_status_id === 3 || obj?.dr_id ? (
                        <>
                          <Text className="pre-wrap">
                            {obj?.so_no_item_qty_uom}
                          </Text>
                          <input
                            {...register(`dr.${index}.so_detail_id`)}
                            className="d-none"
                          />
                        </>
                      ) : (
                        <Controller
                          name={`dr.${index}.so_detail_id`}
                          control={control}
                          render={({ field: { onChange, value } }) =>
                            SelectField({
                              fieldProps: {
                                placeholder: "Select Item",
                                allowClear: true,
                                showSearch: true,
                                value,
                                onChange: (val, row) => {
                                  onChange(val);
                                  setValue(
                                    `dr.${index}.so_id`,

                                    row?.obj?.so_id
                                  );
                                  setValue(
                                    `dr.${index}.dr_qty`,

                                    row?.obj?.tg_so_detail_qty_delivery
                                  );
                                  setValue(
                                    `dr.${index}.dr_delivery_date`,
                                    row?.obj?.so_detail_delivery_date
                                  );
                                  setValue(
                                    `dr.${index}.dr_location_delivery`,
                                    row?.obj?.dr_location_delivery
                                  );
                                  setValue(
                                    `dr.${index}.so_no_description`,
                                    row?.obj?.so_no_description
                                  );
                                  setValue(
                                    `dr.${index}.customer_id`,
                                    row?.obj?.customer_id
                                  );
                                  setValue(
                                    `dr.${index}.customer_detail_id`,
                                    null
                                  );
                                  setValue(
                                    `dr.${index}.customer_detail_address`,
                                    null
                                  );
                                  setValue(
                                    `dr.${index}.customer_detail_name`,
                                    null
                                  );
                                  setValue(
                                    `dr.${index}.customer_detail_phone`,
                                    null
                                  );
                                  getCustomerLocation(row?.obj?.customer_id);
                                },
                              },
                              dataSource: soData,
                              fieldId: "so_detail_id",
                              fieldName: "so_no_item_qty_uom",
                            })
                          }
                          rules={{ required: true }}
                        />
                      )}
                      {errors.dr && errors?.dr[index]?.so_detail_id && (
                        <Text className="error">This field is required.</Text>
                      )}
                    </>
                  )}
                </Col>
              </Row>
              <Row className="col-2 mt-1 mb-1">
                <Col span={8}>
                  <CustomLabel
                    label="SO No. :"
                    readOnly={readOnly}
                    require={true}
                  />
                </Col>
                <Col span={16}>
                  {readOnly ? (
                    <Text className="pre-wrap">{obj?.so_no_description}</Text>
                  ) : (
                    <Controller
                      name={`dr.${index}.so_no_description`}
                      control={control}
                      render={({ field }) =>
                        InputField({
                          fieldProps: {
                            placeholder: "Phone No.",
                            className: "w-100 disabled-input",
                            disabled: true,
                            ...field,
                          },
                        })
                      }
                    />
                  )}
                  {/* {<Text>{obj?.so_no_description || "-"}</Text>} */}
                </Col>
              </Row>
              <Row className="col-2 mt-1 mb-1">
                <Col span={8}>
                  <CustomLabel label="PO No. :" readOnly={readOnly} />
                </Col>
                <Col span={16}>
                  <Text>{obj?.po_no || "-"}</Text>
                </Col>
              </Row>
              <Row className="col-2 mt-1 mb-1">
                <Col span={8}>
                  <CustomLabel
                    label="Qty. :"
                    readOnly={readOnly}
                    require={true}
                  />
                </Col>
                <Col span={16}>
                  {readOnly ? (
                    <Text className="pre-wrap pd-right-2">
                      {convertDigit(obj?.dr_qty, 3)}
                    </Text>
                  ) : (
                    <>
                      <Controller
                        name={`dr.${index}.dr_qty`}
                        control={control}
                        render={({ field }) =>
                          InputNumberField({
                            fieldProps: {
                              placeholder: "Delivery Qty.",
                              className: "w-50 mr-2",
                              min: 0,
                              disabled: obj?.tg_trans_status_id === 3,
                              ...getNumberFormat(3),
                              ...field,
                            },
                          })
                        }
                        rules={{ required: true }}
                      />

                      {errors.dr && errors?.dr[index]?.dr_qty && (
                        <Text className="error">This field is required.</Text>
                      )}
                    </>
                  )}
                  <Text strong>{obj?.uom_no || "Unit"}</Text>
                </Col>
              </Row>
              <Row className="col-2 mt-1 mb-1">
                <Col span={8}>
                  <CustomLabel
                    label="วัน/เวลา ส่งถึงลูกค้า :"
                    readOnly={readOnly}
                    require={true}
                  />
                </Col>
                <Col span={9}>
                  {readOnly ? (
                    <Text className="pre-wrap pd-right-2">
                      {obj?.dr_delivery_date}
                    </Text>
                  ) : (
                    <>
                      <Controller
                        name={`dr.${index}.dr_delivery_date`}
                        control={control}
                        render={({ field: { value, onChange } }) =>
                          DatePickerField({
                            fieldProps: {
                              placeholder: "วัน / เดือน / ปี",
                              format: "DD/MM/YYYY",
                              className: "w-100",
                              disabled: obj?.tg_trans_status_id === 3,
                              value: value ? moment(value, "DD/MM/YYYY") : null,
                              onChange: (val) =>
                                val
                                  ? onChange(moment(val).format("DD/MM/YYYY"))
                                  : null,
                            },
                          })
                        }
                        rules={{ required: true }}
                      />
                      {errors.dr && errors?.dr[index]?.dr_delivery_date && (
                        <Text className="error">This field is required.</Text>
                      )}
                    </>
                  )}
                </Col>
                <Col span={7}>
                  {readOnly ? (
                    <>
                      <Text strong>เวลา : </Text>
                      <Text className="pre-wrap">{obj?.dr_delivery_time}</Text>
                    </>
                  ) : (
                    <>
                      <Controller
                        name={`dr.${index}.dr_delivery_time`}
                        control={control}
                        render={({ field: { value, onChange } }) =>
                          TimePickerField({
                            fieldProps: {
                              placeholder: "ชั่วโมง : นาที",
                              format: "HH:mm",
                              className: "w-100",
                              disabled: obj?.tg_trans_status_id === 3,
                              value: value ? moment(value, "HH:mm:ss") : null,
                              onChange: (val) =>
                                val
                                  ? onChange(moment(val).format("HH:mm:ss"))
                                  : null,
                            },
                          })
                        }
                        defaultValue={"08:00:00"}
                        rules={{ required: true }}
                      />

                      {errors.dr && errors?.dr[index]?.dr_delivery_time && (
                        <Text className="error">This field is required.</Text>
                      )}
                    </>
                  )}
                </Col>
              </Row>
              <Row className="col-2 mt-1 mb-1">
                <Col span={8}>
                  <CustomLabel
                    label="สถานที่จัดส่ง :"
                    readOnly={readOnly}
                    require={true}
                  />
                </Col>
                <Col span={16}>
                  {readOnly ? (
                    <Text className="pre-wrap">
                      {obj?.customer_detail_address}
                    </Text>
                  ) : (
                    <>
                      <Controller
                        name={`dr.${index}.customer_detail_id`}
                        control={control}
                        render={({ field: { onChange, value } }) =>
                          SelectField({
                            fieldProps: {
                              placeholder: "เลือกสถานที่จัดส่ง",
                              allowClear: true,
                              showSearch: true,
                              value,
                              disabled:
                                obj?.tg_trans_status_id === 3 || !so_detail_id,
                              onChange: (val, row) => {
                                onChange(val);
                                setValue(
                                  `dr.${index}.customer_detail_address`,
                                  row?.obj?.customer_detail_address || "-"
                                );
                                setValue(
                                  `dr.${index}.customer_detail_name`,
                                  row?.obj?.customer_detail_name || "-"
                                );
                                setValue(
                                  `dr.${index}.customer_detail_phone`,
                                  row?.obj?.customer_detail_phone || "-"
                                );
                              },
                            },
                            dataSource: customerLocation,
                            fieldId: "customer_detail_id",
                            fieldName: "customer_detail_address",
                          })
                        }
                        rules={{ required: true }}
                      />
                      {errors.dr && errors?.dr[index]?.customer_detail_id && (
                        <Text className="error">This field is required.</Text>
                      )}
                      {/* {!readOnly && obj?.customer_detail_id && ( */}
                      <Controller
                        name={`dr.${index}.customer_detail_address`}
                        control={control}
                        render={({ field }) =>
                          TextAreaField({
                            fieldProps: {
                              placeholder: "ข้อมูลสถานที่จัดส่ง",
                              className: "w-100 disabled-input",
                              rows: 4,
                              disabled: true,
                              ...field,
                            },
                          })
                        }
                      />
                      {/* )} */}
                    </>
                  )}
                </Col>
              </Row>
              <Row className="col-2 mt-1 mb-1">
                <Col span={6}>
                  <CustomLabel label={"ชื่อผู้ติดต่อ :"} readOnly={readOnly} />
                </Col>
                <Col span={18}>
                  {readOnly ? (
                    <Text className="pre-wrap">
                      {obj?.customer_detail_name}
                    </Text>
                  ) : (
                    <input
                      {...register(`dr.${index}.customer_detail_name`)}
                      defaultValue={obj?.customer_detail_name}
                      className="disabled-input"
                      readOnly={true}
                    />
                  )}
                </Col>
              </Row>
              <Row className="col-2 mt-1 mb-1">
                <Col span={6}>
                  <CustomLabel label={"เบอร์โทร :"} readOnly={readOnly} />
                </Col>
                <Col span={18}>
                  <Text className="pre-wrap">
                    {readOnly ? (
                      <Text className="pre-wrap">
                        {obj?.customer_detail_phone}
                      </Text>
                    ) : (
                      <input
                        {...register(`dr.${index}.customer_detail_phone`)}
                        defaultValue={obj?.customer_detail_phone}
                        className="disabled-input"
                        readOnly={true}
                      />
                    )}
                  </Text>
                </Col>
              </Row>
              {/* <Row className="col-2 mt-1 mb-1">
                <Col span={8}>
                  <CustomLabel
                    label={"สถานที่ส่ง :"}
                    readOnly={readOnly}
                    require={true}
                  />
                </Col>
                <Col span={16}>
                  {readOnly ? (
                    <Text className="pre-wrap">
                      {obj?.dr_location_delivery}
                    </Text>
                  ) : (
                    <>
                      <Controller
                        name={`dr.${index}.dr_location_delivery`}
                        control={control}
                        render={({ field }) =>
                          TextAreaField({
                            fieldProps: {
                              placeholder: "Delivery Location",
                              className: "w-100",
                              rows: 4,
                              disabled: obj?.tg_trans_status_id === 3,
                              ...field,
                            },
                          })
                        }
                        rules={{ required: true }}
                      />
                      {errors.dr && errors?.dr[index]?.dr_location_delivery && (
                        <Text className="error">This field is required.</Text>
                      )}
                    </>
                  )}
                </Col>
              </Row> */}
            </Col>
          </Row>
        </div>
      ))}
    </>
  );
};

export default React.memo(Form);
