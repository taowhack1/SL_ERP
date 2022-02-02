import { Col, Row, Spin } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { InputField } from "../../../../../components/AntDesignComponent";
import CustomLabel from "../../../../../components/CustomLabel";
import LeftForm from "./LeftForm";
import RightForm from "./RightForm";
import DetailForm from "./detail";

const Form = () => {
  const {
    control,
    formState: { errors },
    readOnly = true,
    loading = false,
  } = useFormContext();
  const [mrp_description, mrp_no, mrp_created] = useWatch({
    control,
    name: ["mrp_description", "mrp_no", "mrp_created"],
    defaultValue: "-",
  });
  return (
    <>
      <div id="form">
        <Row className="col-2 mt-1 mb-1" gutter={16}>
          <Col span={12}>
            <h2>
              <strong>{mrp_no}</strong>
            </h2>
          </Col>
          <Col span={12} className="text-right">
            <p>
              <CustomLabel readOnly={true} label="Issued Date :" />
              <Text className="ml-2">{mrp_created || "-"}</Text>
            </p>
          </Col>
        </Row>
        <Row className="col-2 mt-1 mb-1" gutter={16}>
          <Col span={24}>
            <>
              <CustomLabel
                readOnly={readOnly}
                require
                label="Description / Job Name :"
              />
              <div className="mt-1">
                <Spin spinning={loading}>
                  {readOnly ? (
                    <Text className="text-value pd-left-2">{`${mrp_description}`}</Text>
                  ) : (
                    <>
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
                                disabled: readOnly,
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
                    </>
                  )}
                </Spin>
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
            <Spin spinning={loading}>
              <DetailForm />
            </Spin>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default React.memo(Form);
