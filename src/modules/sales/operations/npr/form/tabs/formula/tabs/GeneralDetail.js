import { Col, Row } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useContext, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  InputField,
  InputNumberField,
  TextAreaField,
} from "../../../../../../../../components/AntDesignComponent";
import CustomLabel from "../../../../../../../../components/CustomLabel";
import { getNumberFormat } from "../../../../../../../../include/js/main_config";
import { NPRFormContext } from "../../../NPRRDForm";
let persistFields = {};
const GeneralDetail = (props) => {
  const { fields } = props || {};
  const {
    register,
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: initialState,
    mode: "onBlur",
  });

  useEffect(() => {
    reset(fields);
    persistFields = fields;
    return () => {
      reset(initialState);
      persistFields = initialState;
    };
  }, [fields]);

  const onSubmit = (data) => console.log("submit", data);
  const onError = (data) => console.log("Error", data);

  const { readOnly } = useContext(NPRFormContext);

  const {
    npr_formula_develop_by,
    npr_formula_description,
    npr_formula_created,
    npr_formula_usage,
    npr_formula_product_code,
    npr_formula_product_name,
    npr_formula_sample_req_qty,
    npr_formula_batch_size,
  } = persistFields || {};
  return (
    <>
      <form
        key="form-general-detail"
        onSubmit={handleSubmit(onSubmit, onError)}
        onBlur={handleSubmit(onSubmit, onError)}
      >
        <Row className="col-2 mt-1 mb-1" gutter={16}>
          <Col span={12} className="col-border-right">
            <Row className="col-2 mt-1 mb-1" gutter={8}>
              <Col span={8}>
                <CustomLabel
                  require
                  readOnly={readOnly}
                  label={`Product Code :`}
                />
              </Col>
              <Col span={16}>
                {readOnly ? (
                  <div className="text-value">
                    <Text>{npr_formula_product_code || "-"}</Text>
                  </div>
                ) : (
                  <>
                    <Controller
                      {...{
                        name: `npr_formula_product_code`,
                        control,
                        rules: { required: true },
                        defaultValue: null,
                        render: ({ field }) => {
                          return InputField({
                            fieldProps: {
                              className: "w-100",
                              placeholder: "Result",
                              ...field,
                            },
                          });
                        },
                      }}
                    />
                  </>
                )}
              </Col>
            </Row>
            <Row className="col-2 mt-1 mb-1" gutter={8}>
              <Col span={8}>
                <CustomLabel
                  require
                  readOnly={readOnly}
                  label={`Product Name :`}
                />
              </Col>
              <Col span={16}>
                {readOnly ? (
                  <div className="text-value">
                    <Text>{npr_formula_product_name || "-"}</Text>
                  </div>
                ) : (
                  <>
                    <Controller
                      {...{
                        name: `npr_formula_product_name`,
                        control,
                        rules: { required: true },
                        defaultValue: null,
                        render: ({ field }) => {
                          return InputField({
                            fieldProps: {
                              className: "w-100",
                              placeholder: "Result",
                              ...field,
                            },
                          });
                        },
                      }}
                    />
                  </>
                )}
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row className="col-2 mt-1 mb-1" gutter={8}>
              <Col span={8}>
                <CustomLabel
                  require
                  readOnly={readOnly}
                  label={`Sample Request Qty :`}
                />
              </Col>
              <Col span={16}>
                {readOnly ? (
                  <div className="text-value">
                    <Text>{npr_formula_sample_req_qty || "-"}</Text>
                  </div>
                ) : (
                  <>
                    <Controller
                      {...{
                        name: `npr_formula_sample_req_qty`,
                        control,
                        rules: { required: true },
                        defaultValue: null,
                        render: ({ field }) => {
                          return InputNumberField({
                            fieldProps: {
                              ...getNumberFormat(4),
                              min: 0,
                              className: "w-100",
                              placeholder: "Result",
                              ...field,
                            },
                          });
                        },
                      }}
                    />
                  </>
                )}
              </Col>
            </Row>
            <Row className="col-2 mt-1 mb-1" gutter={8}>
              <Col span={8}>
                <CustomLabel
                  require
                  readOnly={readOnly}
                  label={`Batch Size :`}
                />
              </Col>
              <Col span={16}>
                {readOnly ? (
                  <div className="text-value">
                    <Text>{npr_formula_batch_size || "-"}</Text>
                  </div>
                ) : (
                  <>
                    <Controller
                      {...{
                        name: `npr_formula_batch_size`,
                        control,
                        rules: { required: true },
                        defaultValue: null,
                        render: ({ field }) => {
                          return InputNumberField({
                            fieldProps: {
                              ...getNumberFormat(4),
                              min: 0,
                              className: "w-100",
                              placeholder: "Result",
                              ...field,
                            },
                          });
                        },
                      }}
                    />
                  </>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <CustomLabel
              require
              readOnly={readOnly}
              label="Product Description :"
            />
          </Col>
          <Col span={24}>
            {readOnly ? (
              <div className="text-value pd-left-3">
                <Text className="pre-wrap">
                  {npr_formula_description || "-"}
                </Text>
              </div>
            ) : (
              <>
                <Controller
                  {...{
                    name: `npr_formula_description`,
                    control,
                    rules: { required: true },
                    defaultValue: null,
                    render: ({ field }) => {
                      return TextAreaField({
                        fieldProps: {
                          className: "w-100",
                          placeholder: "คำอธิบายผลิตภัณฑ์",
                          onBlur: () =>
                            document
                              .getElementById("submit-form-general-detail")
                              .click(),
                          ...field,
                        },
                      });
                    },
                  }}
                />
              </>
            )}
          </Col>
          <Col span={24}>
            <CustomLabel require readOnly={readOnly} label="Product Used :" />
          </Col>
          <Col span={24}>
            {readOnly ? (
              <div className="text-value pd-left-3">
                <Text className="pre-wrap">{npr_formula_usage || "-"}</Text>
              </div>
            ) : (
              <>
                <Controller
                  {...{
                    name: `npr_formula_usage`,
                    control,
                    rules: { required: true },
                    defaultValue: null,
                    render: ({ field }) => {
                      return TextAreaField({
                        fieldProps: {
                          className: "w-100",
                          placeholder: "วิธีการใช้งานผลิตภันฑ์",
                          onBlur: () =>
                            document
                              .getElementById("submit-form-general-detail")
                              .click(),
                          ...field,
                        },
                      });
                    },
                  }}
                />
              </>
            )}
          </Col>
        </Row>
        <button className="d-none" id="submit-form-general-detail">
          Submit
        </button>
      </form>
    </>
  );
};

export default React.memo(GeneralDetail);

const initialState = {
  npr_formula_develop_by: null,
  npr_formula_description: null,
  npr_formula_created: null,
  npr_formula_usage: null,
  npr_formula_product_code: null,
  npr_formula_product_name: null,
  npr_formula_sample_req_qty: 0,
  npr_formula_batch_size: 0,
};
