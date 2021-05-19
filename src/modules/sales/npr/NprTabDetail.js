/** @format */

import { Col, Radio, Row } from "antd";
import React from "react";
import { Controller } from "react-hook-form";
import CustomLabel from "../../../components/CustomLabel";
import { InputField, TextAreaField } from "./hookContorler";

const NprTabDetail = ({ control, readOnly }) => {
  return (
    <div>
      <Row className='col-12'>
        <Col span={12} className='col-border-right'>
          <Row className='col-2 row-margin-vertical'>
            <Col span={6}>
              <CustomLabel
                label='Formulation   :'
                require
                readOnly={readOnly}
              />
            </Col>
            <Col span={12}>
              <Radio.Group name='formulation'>
                <Radio value={1}>SL</Radio>
                <Radio value={2}>Customer</Radio>
              </Radio.Group>
            </Col>
            <Col span={2}></Col>
          </Row>
          <Row className='col-2 row-margin-vertical'>
            <Col span={6}>
              <CustomLabel label='Target Price :' require readOnly={readOnly} />
            </Col>
            <Col span={12}>
              <Controller
                as={InputField({
                  fieldProps: {
                    className: "form-control",
                    placeholder: "Enter Target Price",
                  },
                })}
                name='target_price'
                control={control}
                rules={{ required: false }}
              />
            </Col>
            <Col span={2}></Col>
          </Row>
          <Row className='col-2 row-margin-vertical'>
            <Col span={6}>
              <CustomLabel
                label='Product Benchmarking :'
                require
                readOnly={readOnly}
              />
            </Col>
            <Col span={12}>
              <Controller
                as={InputField({
                  fieldProps: {
                    className: "form-control",
                    placeholder: "Enter Product Benchmarking",
                  },
                })}
                name='product_benchmarking'
                control={control}
                rules={{ required: false }}
              />
            </Col>
            <Col span={2}></Col>
          </Row>
          <Row className='col-2 row-margin-vertical'>
            <Col span={6}>
              <CustomLabel
                label='Product Claim :'
                require
                readOnly={readOnly}
              />
            </Col>
            <Col span={12}>
              <Controller
                as={InputField({
                  fieldProps: {
                    className: "form-control",
                    placeholder: "Enter Product Claim",
                  },
                })}
                name='product_claim'
                control={control}
                rules={{ required: false }}
              />
            </Col>
            <Col span={2}></Col>
          </Row>
          <Row className='col-2 row-margin-vertical'>
            <Col span={6}>
              <CustomLabel
                label='Formula Level :'
                require
                readOnly={readOnly}
              />
            </Col>
            <Col span={12}>
              <Controller
                as={InputField({
                  fieldProps: {
                    className: "form-control",
                    placeholder: "Enter Formula Level",
                  },
                })}
                name='formula_level'
                control={control}
                rules={{ required: false }}
              />
            </Col>
            <Col span={2}></Col>
          </Row>
        </Col>
        {/* right */}
        <Col span={12} className='col-border'>
          <Row className='col-2 row-margin-vertical'>
            <Col span={1}></Col>
            <Col span={6}>
              <CustomLabel label='Packaging   :' require readOnly={readOnly} />
            </Col>
            <Col span={16}>
              <Radio.Group name='formulation'>
                <Radio value={1}>Standard for testing</Radio>
                <Radio value={2}>
                  Require actual packaging for testing, specify
                </Radio>
              </Radio.Group>
            </Col>
          </Row>
          <Row className='col-2 row-margin-vertical'>
            <Col span={1}></Col>
            <Col span={6}>
              <CustomLabel
                label='Taxure Apperance :'
                require
                readOnly={readOnly}
              />
            </Col>
            <Col span={12}>
              <Controller
                as={InputField({
                  fieldProps: {
                    className: "form-control",
                    placeholder: "Enter Taxure Apperance",
                  },
                })}
                name='taxure_apperance'
                control={control}
                rules={{ required: false }}
              />
            </Col>
          </Row>
          <Row className='col-2 row-margin-vertical'>
            <Col span={1}></Col>
            <Col span={6}>
              <CustomLabel label='Color :' require readOnly={readOnly} />
            </Col>
            <Col span={12}>
              <Controller
                as={InputField({
                  fieldProps: {
                    className: "form-control",
                    placeholder: "Enter Color ",
                  },
                })}
                name='color'
                control={control}
                rules={{ required: false }}
              />
            </Col>
          </Row>
          <Row className='col-2 row-margin-vertical'>
            <Col span={1}></Col>
            <Col span={6}>
              <CustomLabel label='Odor :' require readOnly={readOnly} />
            </Col>
            <Col span={12}>
              <Controller
                as={InputField({
                  fieldProps: {
                    className: "form-control",
                    placeholder: "Enter Odor",
                  },
                })}
                name='odor'
                control={control}
                rules={{ required: false }}
              />
            </Col>
          </Row>
          <Row className='col-2 row-margin-vertical'>
            <Col span={1}></Col>
            <Col span={6}>
              <CustomLabel
                label='Special Requirement :'
                require
                readOnly={readOnly}
              />
            </Col>
            <Col span={12}>
              <Controller
                as={InputField({
                  fieldProps: {
                    className: "form-control",
                    placeholder: "Enter Special Requirement",
                  },
                })}
                name='special_requirement'
                control={control}
                rules={{ required: false }}
              />
            </Col>
          </Row>
          <Row className='col-2 row-margin-vertical'>
            <Col span={1}></Col>
            <Col span={6}>
              <CustomLabel label='Remark :' readOnly={readOnly} />
            </Col>
            <Col span={12}>
              <Controller
                as={TextAreaField({
                  fieldProps: {
                    className: "form-control",
                    placeholder: "Enter Remark",
                  },
                })}
                name='remark'
                control={control}
                rules={{ required: false }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default NprTabDetail;
