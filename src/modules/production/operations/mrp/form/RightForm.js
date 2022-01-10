import { Col, Row } from "antd";
import Text from "antd/lib/typography/Text";
import moment from "moment";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  DatePickerField,
  InputNumberField,
  SelectField,
} from "../../../../../components/AntDesignComponent";
import CustomLabel from "../../../../../components/CustomLabel";
import { getNumberFormat } from "../../../../../include/js/main_config";

const RightForm = () => {
  const {
    register,
    control,
    reset,
    formState: { errors },
    readOnly = false,
  } = useFormContext();
  return (
    <>
      <Row className="col-2 mt-1 mb-1" gutter={8}>
        <Col span={8}>
          <CustomLabel readOnly={readOnly} require label={"Bulk plan date :"} />
        </Col>
        <Col span={16}>
          {readOnly ? (
            <Text className="pre-wrap">{`SOME_FIELDS`}</Text>
          ) : (
            <>
              <Controller
                {...{
                  name: `mrp_item_ref_plan_date`,
                  control,
                  rules: { required: true },
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
              {errors?.mrp_item_ref_plan_date && (
                <Text strong className="require">
                  This field is required.
                </Text>
              )}
            </>
          )}
        </Col>
      </Row>

      <Row className="col-2 mt-1 mb-1" gutter={8}>
        <Col span={8}>
          <CustomLabel readOnly={readOnly} require label={"Item :"} />
        </Col>
        <Col span={16}>
          {readOnly ? (
            <Text className="pre-wrap">{`SOME_FIELDS`}</Text>
          ) : (
            <>
              <Controller
                {...{
                  name: `mrp_item_plan_date`,
                  control,
                  rules: { required: true },
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
        </Col>
      </Row>
      <Row className="col-2 mt-1 mb-1" gutter={8}>
        <Col span={8}>
          <CustomLabel readOnly={readOnly} require label={"Delivery Date :"} />
        </Col>
        <Col span={16}>
          <Text className="pre-wrap">{`so_detail_delivery_date`}</Text>
        </Col>
      </Row>

      <Row className="col-2 mt-1 mb-1" gutter={8}>
        <Col span={8}>
          <CustomLabel readOnly={readOnly} require label={"Vendor L/T :"} />
        </Col>
        <Col span={16}>
          <div>
            <Text strong>
              RM : <span>-</span> days
            </Text>
          </div>
          <div>
            <Text strong>
              PK : <span>-</span> days
            </Text>
          </div>
        </Col>
      </Row>

      {/* 
        FG plan date :
        Bulk plan date :
    */}
    </>
  );
};

export default React.memo(RightForm);
