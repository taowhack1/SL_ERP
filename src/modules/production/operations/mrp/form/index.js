import { Col, Row } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { InputField } from "../../../../../components/AntDesignComponent";
import CustomLabel from "../../../../../components/CustomLabel";
import LeftForm from "./LeftForm";
import RightForm from "./RightForm";
import DetailForm from "./detail";

const Form = () => {
  const {
    register,
    control,
    reset,
    formState: { errors },
    handleSubmit,
    readOnly = false,
  } = useFormContext();

  return (
    <>
      <div id="form">
        <Row className="col-2 mt-1 mb-1" gutter={16}>
          <Col span={24}>
            <>
              <CustomLabel require label="Description / Job Name :" />
              <div className="mt-1">
                <Controller
                  {...{
                    name: `mrp_description`,
                    control,
                    rules: { required: false },
                    defaultValue: null,
                    render: ({ field }) => {
                      return InputField({
                        fieldProps: {
                          className: "w-100",
                          placeholder: "Description",
                          ...field,
                        },
                      });
                    },
                  }}
                />
                <br />
                {errors?.mrp_description && (
                  <Text strong className="require">
                    This field is required.
                  </Text>
                )}
              </div>
            </>
          </Col>
        </Row>
        <Row className="col-2 mt-3 mb-1" gutter={[48, 10]}>
          <Col span={12} className="col-border-right">
            <LeftForm />
          </Col>
          <Col span={12}>
            <RightForm />
          </Col>
        </Row>
        <Row className="col-2 mt-3 mb-1" gutter={16}>
          <Col span={24}>
            <DetailForm />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default React.memo(Form);
