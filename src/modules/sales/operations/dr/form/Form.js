import { Col, Row } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useContext } from "react";
import moment from "moment";

import CustomLabel from "../../../../../components/CustomLabel";
import { Controller } from "react-hook-form";
import {
  DatePickerField,
  InputField,
  radioField,
  SelectField,
  TextAreaField,
  TimePickerField,
} from "../../../../../components/AntDesignComponent";
import { AppContext } from "../../../../../include/js/context";
const Form = ({
  formArray: { fields },
  form: { control, register },
  readOnly,
  soData,
}) => {
  const {
    auth: { user_name, employee_no_name_eng },
  } = useContext(AppContext);
  console.log("Form fields", fields);
  return (
    <>
      {fields.map((obj, index) => (
        <div className="form-group" key={index}>
          <div className="d-none">
            <input {...register(`dr.${index}.po_no`)} />
            <input {...register(`dr.${index}.dr_id`)} />
            <input {...register(`dr.${index}.dr_actived`)} />
            <input {...register(`dr.${index}.tg_trans_status_id`)} />
            <input {...register(`dr.${index}.tg_trans_close_id`)} />
            <input {...register(`dr.${index}.commit`)} />
          </div>
          <Row gutter={[24, 8]} className="col-2 row-margin-vertical">
            <Col span={12}>
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
                          ...field,
                        },
                      })
                    }
                    defaultValue={user_name}
                  />
                  <Text>
                    {obj?.dr_created_by_no_name || employee_no_name_eng}
                  </Text>
                </Col>
              </Row>
              <Row className="col-2 mt-1 mb-1">
                <Col span={8}>
                  <Text strong>Delivery Type :</Text>
                </Col>
                <Col span={16}>
                  <Controller
                    name={`dr.${index}.dr_type_id`}
                    control={control}
                    render={({ field }) =>
                      radioField(
                        [
                          {
                            id: 1,
                            title: "ส่งงาน",
                          },
                          {
                            id: 2,
                            title: "รับคืน",
                          },
                        ],
                        field
                      )
                    }
                    defaultValue={obj?.dr_type_id}
                  />
                </Col>
              </Row>
              <Row className="col-2 mt-1 mb-1">
                <Col span={8}>
                  <Text strong>Contact No. :</Text>
                </Col>
                <Col span={16}>
                  <Controller
                    name={`dr.${index}.dr_phone`}
                    control={control}
                    render={({ field }) =>
                      InputField({
                        fieldProps: {
                          placeholder: "Phone No.",
                          className: "w-100",
                          ...field,
                        },
                      })
                    }
                  />
                </Col>
              </Row>
              <Row className="col-2 mt-1 mb-1">
                <Col span={8}>
                  <Text strong>Remark :</Text>
                </Col>
                <Col span={16}>
                  <Controller
                    name={`dr.${index}.dr_remark`}
                    control={control}
                    render={({ field }) =>
                      TextAreaField({
                        fieldProps: {
                          placeholder: "Remark",
                          className: "w-100",
                          rows: 4,
                          ...field,
                        },
                      })
                    }
                  />
                </Col>
              </Row>
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
                  <Controller
                    name={`dr.${index}.so_detail_id`}
                    control={control}
                    render={({ field }) =>
                      SelectField({
                        fieldProps: {
                          placeholder: "Select Item",
                          allowClear: true,
                          showSearch: true,
                          ...field,
                        },
                        dataSource: soData,
                        fieldId: "so_detail_id",
                        fieldName: "item_no_name",
                      })
                    }
                  />
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
                <Col span={16}>{<Text>{obj?.so_no || "-"}</Text>}</Col>
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
                  <Controller
                    name={`dr.${index}.dr_qty`}
                    control={control}
                    render={({ field }) =>
                      SelectField({
                        fieldProps: {
                          placeholder: "Select Item",
                          allowClear: true,
                          showSearch: true,
                          className: "w-50 mr-2",
                          ...field,
                        },
                        dataSource: [],
                        fieldId: "dr_qty",
                        fieldName: "so_no",
                      })
                    }
                  />
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
                  <Controller
                    name={`dr.${index}.dr_delivery_date`}
                    control={control}
                    render={({ field }) =>
                      DatePickerField({
                        fieldProps: {
                          placeholder: "วัน / เดือน / ปี",
                          format: "DD/MM/YYYY",
                          className: "w-100",
                          ...field,
                        },
                      })
                    }
                  />
                </Col>
                <Col span={7}>
                  <Controller
                    name={`dr.${index}.dr_delivery_time`}
                    control={control}
                    render={({ field }) =>
                      TimePickerField({
                        fieldProps: {
                          placeholder: "ชั่วโมง : นาที",
                          format: "HH:mm",
                          className: "w-100",
                          ...field,
                        },
                      })
                    }
                  />
                </Col>
              </Row>
              <Row className="col-2 mt-1 mb-1">
                <Col span={8}>
                  <CustomLabel
                    label={"สถานที่ส่ง :"}
                    readOnly={readOnly}
                    require={true}
                  />
                </Col>
                <Col span={16}>
                  <Controller
                    name={`dr.${index}.dr_location_delivery`}
                    control={control}
                    render={({ field }) =>
                      TextAreaField({
                        fieldProps: {
                          placeholder: "Delivery Location",
                          className: "w-100",
                          rows: 4,
                          ...field,
                        },
                      })
                    }
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      ))}
    </>
  );
};

export default React.memo(Form);
