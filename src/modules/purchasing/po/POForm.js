import { Col, Row, Tabs } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  InputField,
  SelectField,
} from "../../../components/AntDesignComponent";
import CustomLabel from "../../../components/CustomLabel";
import POFormResult from "./POFormResult";
import TableItem from "./TableItem";
const POForm = () => {
  const {
    readOnly = false,
    step = 1,
    control,
    formState: { errors },
    register,
    getVendor,
    getVat,
    getPaymentTerms,
  } = useFormContext() || {};

  const { data: vendors = [], loading: getVendorLoading = true } =
    getVendor || {};
  const { data: vat = [], loading: getVatLoading = true } = getVat || {};
  const { data: paymentTerms = [], loading: getPaymentTermsLoading = true } =
    getPaymentTerms || {};

  return (
    <>
      {step === 1 ? (
        <>
          <Row className="col-2 mt-1 mb-1" gutter={32}>
            <Col span={12}>
              <Row className="col-2 mt-1 mb-1" gutter={8}>
                <Col span={6}>
                  <CustomLabel label="Description :" require readOnly={false} />
                </Col>
                <Col span={18}>
                  <>
                    <Controller
                      {...{
                        name: `po_description`,
                        control,
                        rules: { required: true },
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
                    {errors?.po_description && (
                      <Text strong className="require">
                        This field is required.
                      </Text>
                    )}
                  </>
                </Col>
              </Row>
              <Row className="col-2 mt-1 mb-1" gutter={8}>
                <Col span={6}>
                  <CustomLabel label="Vendor :" require readOnly={false} />
                </Col>
                <Col span={18}>
                  <>
                    <Controller
                      {...{
                        name: `vendor_id`,
                        control,
                        rules: { required: true },
                        defaultValue: null,
                        render: ({ field }) => {
                          const { onChange } = field;
                          return SelectField({
                            fieldId: "vendor_id",
                            fieldName: "vendor_no_name",
                            dataSource: vendors ? vendors[0] : [],
                            fieldProps: {
                              disabled: getVendorLoading,
                              className: "w-100",
                              placeholder: "Select Vendor",
                              showSearch: true,
                              allowClear: true,
                              onChange: (id, obj, index) =>
                                onChange(id || null),
                              ...field,
                            },
                          });
                        },
                      }}
                    />
                    <br />
                    {errors?.vendor_id && (
                      <Text strong className="require">
                        This field is required.
                      </Text>
                    )}
                  </>
                </Col>
              </Row>
              <Row className="col-2 mt-1 mb-1" gutter={8}>
                <Col span={6}>
                  <CustomLabel label="Currency :" require readOnly={false} />
                </Col>
                <Col span={18}>
                  <Text>THB</Text>
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row className="col-2 mt-1 mb-1" gutter={8}>
                <Col span={6}>
                  <CustomLabel label="Vat :" require readOnly={false} />
                </Col>
                <Col span={18}>
                  <>
                    <Controller
                      {...{
                        name: `vat_id`,
                        control,
                        rules: { required: true },
                        defaultValue: null,
                        render: ({ field }) => {
                          const { onChange } = field;
                          return SelectField({
                            fieldId: "vat_id",
                            fieldName: "vat_name",
                            dataSource: vat ? vat[0] : [],
                            fieldProps: {
                              disabled: getVatLoading,
                              className: "w-100",
                              placeholder: "Select Vat",
                              showSearch: true,
                              allowClear: true,
                              onChange: (id, obj, index) =>
                                onChange(id || null),
                              ...field,
                            },
                          });
                        },
                      }}
                    />
                    <br />
                    {errors?.vat_id && (
                      <Text strong className="require">
                        This field is required.
                      </Text>
                    )}
                  </>
                </Col>
              </Row>

              <Row className="col-2 mt-1 mb-1" gutter={8}>
                <Col span={6}>
                  <CustomLabel
                    label="Payment Terms :"
                    require
                    readOnly={false}
                  />
                </Col>
                <Col span={18}>
                  <>
                    <Controller
                      {...{
                        name: `payment_term_id`,
                        control,
                        rules: { required: true },
                        defaultValue: null,
                        render: ({ field }) => {
                          const { onChange } = field;
                          return SelectField({
                            fieldId: "payment_term_id",
                            fieldName: "payment_term_name",
                            dataSource: paymentTerms ? paymentTerms[0] : [],
                            fieldProps: {
                              disabled: getPaymentTermsLoading,
                              className: "w-100",
                              placeholder: "Select Data",
                              showSearch: true,
                              allowClear: true,
                              onChange: (id, obj, index) =>
                                onChange(id || null),
                              ...field,
                            },
                          });
                        },
                      }}
                    />
                    <br />
                    {errors?.payment_term_id && (
                      <Text strong className="require">
                        This field is required.
                      </Text>
                    )}
                  </>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Tabs>
                <Tabs.TabPane tab="Detail" key="1">
                  <TableItem />
                </Tabs.TabPane>
              </Tabs>
            </Col>
          </Row>
        </>
      ) : (
        <POFormResult />
      )}
    </>
  );
};

export default React.memo(POForm);
