import { Col, Row, Spin } from "antd";
import Text from "antd/lib/typography/Text";
import moment from "moment";
import React from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import {
  DatePickerField,
  InputNumberField,
} from "../../../../../components/AntDesignComponent";
import CustomLabel from "../../../../../components/CustomLabel";

const RightForm = () => {
  const {
    control,
    formState: { errors },
    readOnly = true,
    loading = false,
    register,
  } = useFormContext();
  const [so_due_date, mrp_item_plan_date] = useWatch({
    control,
    name: ["so_due_date", "mrp_item_plan_date"],
    defaultValue: ["-", "-"],
  });
  return (
    <>
      <Row className="col-2 mt-1 mb-1" gutter={8}>
        <Col span={8}>
          <CustomLabel readOnly={readOnly} require label={"Item plan date :"} />
        </Col>
        <Col span={16}>
          <Spin spinning={loading}>
            {readOnly ? (
              <>
                <input className="d-none" {...register("mrp_item_plan_date")} />
                <Text className="pre-wrap">{`${mrp_item_plan_date}`}</Text>
              </>
            ) : (
              <>
                <Controller
                  {...{
                    name: `mrp_item_plan_date`,
                    control,
                    rules: { required: false },
                    defaultValue: null,
                    render: ({ field }) => {
                      const { onChange, value } = field;
                      return DatePickerField({
                        fieldProps: {
                          className: "w-100",
                          placeholder: "Date Picker",
                          format: "DD/MM/YYYY",
                          value: value ? moment(value, "DD/MM/YYYY") : null,
                          onChange: (date) =>
                            onChange(
                              date ? moment(date).format("DD/MM/YYYY") : null
                            ),
                        },
                      });
                    },
                  }}
                />
                <br />
                {errors?.mrp_item_plan_date && (
                  <Text strong className="require">
                    This field is required.
                  </Text>
                )}
              </>
            )}
          </Spin>
        </Col>
      </Row>
      <Row className="col-2 mt-1 mb-1" gutter={8}>
        <Col span={8}>
          <CustomLabel readOnly={readOnly} require label={"Delivery date :"} />
        </Col>
        <Col span={16}>
          <Spin spinning={loading}>
            <Controller
              {...{
                name: `so_due_date`,
                control,
                defaultValue: so_due_date,
                render: ({ field }) => {
                  return InputNumberField({
                    fieldProps: {
                      className: "w-100 d-none",
                      size: "small",
                      ...field,
                    },
                  });
                },
              }}
            />
            <Text className="pre-wrap">{`${so_due_date || "-"}`}</Text>
          </Spin>
        </Col>
      </Row>

      <Row className="col-2 mt-1 mb-1" gutter={8}>
        <Col span={8}>
          <CustomLabel readOnly={readOnly} require label={"Vendor L/T :"} />
        </Col>
        <Col span={16}>
          <Spin spinning={loading}>
            <div>
              <Text strong>
                PK : <span>-</span> days
              </Text>
            </div>
          </Spin>
        </Col>
      </Row>
    </>
  );
};

export default React.memo(RightForm);
