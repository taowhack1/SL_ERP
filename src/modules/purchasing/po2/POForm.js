/** @format */

import { Col, Input, Row, Tabs } from "antd";
import React, { useContext, useEffect } from "react";
import CustomLabel from "../../../components/CustomLabel";
import CustomSelect from "../../../components/CustomSelect";
import TotalFooter from "../../../components/TotalFooter";
import POFormDetail from "./POFormDetail";
import { POContext } from "./POFormDisplay";
import POFormResult from "./POFormResult";
import SelectPR from "./SelectPR";
const { TextArea } = Input;
const POForm = () => {
  const {
    readOnly = false,
    step = 1,
    poState,
    getVendor,
    getVat,
    getPaymentTerms,
    getCurrency,
    onChangePOState,
  } = useContext(POContext) || {};
  const {
    po_description,
    vendor_id,
    payment_term_id,
    currency_id,
    vat_id,
    po_remark,
  } = poState || {};
  const { data: vendors = [], loading: getVendorLoading = true } =
    getVendor || {};
  const { data: vat = [], loading: getVatLoading = true } = getVat || {};
  const { data: paymentTerms = [], loading: getPaymentTermsLoading = true } =
    getPaymentTerms || {};
  const { data: currency = [], loading: getCurrencyLoading = true } =
    getCurrency || {};

  useEffect(() => {
    const findVendor =
      vendors && vendors[0]?.find((obj) => obj.vendor_id === vendor_id);
    console.log("findVendor", findVendor);
    if (findVendor) {
      const { vat_id, vat_no, payment_term_id, payment_term_name } =
        findVendor || {};
      onChangePOState({
        vat_id,
        vat_no,
        payment_term_id,
        payment_term_name,
        po_remark,
      });
    }
  }, [vendor_id]);
  return (
    <>
      <>
        {[1, 2].includes(step) ? (
          <>
            <Row className='col-2 mt-1 mb-1' gutter={32}>
              <Col span={12}>
                <Row className='col-2 mt-1 mb-1' gutter={8}>
                  <Col span={6}>
                    <CustomLabel
                      label='Description :'
                      require
                      readOnly={false}
                    />
                  </Col>
                  <Col span={18}>
                    <>
                      <Input
                        {...{
                          placeholder: "Description",
                          className: "w-100",
                          disabled: false,
                          value: po_description || null,
                          onChange: (e) =>
                            onChangePOState({
                              po_description: e.target.value,
                            }),
                        }}
                      />
                    </>
                  </Col>
                </Row>
                <Row className='col-2 mt-1 mb-1' gutter={8}>
                  <Col span={6}>
                    <CustomLabel label='Vendor :' require readOnly={false} />
                  </Col>
                  <Col span={18}>
                    <>
                      <CustomSelect
                        {...{
                          disabled: getVendorLoading,
                          placeholder: "Vendor",
                          className: "w-100",
                          field_id: "vendor_id",
                          field_name: "vendor_no_name",
                          allowClear: true,
                          showSearch: true,
                          value: vendor_id,
                          data: vendors ? vendors[0] : [],
                          onChange: (val, obj) =>
                            val
                              ? onChangePOState({
                                  vendor_id: val,
                                  vendor_no_name: obj?.data?.vendor_no_name,
                                })
                              : onChangePOState({
                                  vendor_id: null,
                                  vendor_no_name: null,
                                }),
                        }}
                      />
                    </>
                  </Col>
                </Row>
                <Row className='col-2 mt-1 mb-1' gutter={8}>
                  <Col span={6}>
                    <CustomLabel label='Note :' require readOnly={false} />
                  </Col>
                  <Col span={18}>
                    <>
                      <TextArea
                        {...{
                          placeholder: "Note",
                          className: "w-100",
                          disabled: false,
                          value: po_remark || null,
                          onChange: (e) =>
                            onChangePOState({
                              po_remark: e.target.value,
                            }),
                        }}
                      />
                    </>
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <Row className='col-2 mt-1 mb-1' gutter={8}>
                  <Col span={6}>
                    <CustomLabel label='Vat :' require readOnly={false} />
                  </Col>
                  <Col span={18}>
                    <>
                      <CustomSelect
                        {...{
                          disabled: getVatLoading,
                          placeholder: "Vat",
                          className: "w-100",
                          field_id: "vat_id",
                          field_name: "vat_name",
                          allowClear: true,
                          showSearch: true,
                          value: vat_id,
                          data: vat ? vat[0] : [],
                          onChange: (val, obj) =>
                            val
                              ? onChangePOState({
                                  vat_id: val,
                                  vat_name: obj?.data?.vat_name,
                                  vat_rate: obj?.data?.vat_rate || 0,
                                })
                              : onChangePOState({
                                  vat_id: null,
                                  vat_name: null,
                                  vat_rate: 0,
                                }),
                        }}
                      />
                    </>
                  </Col>
                </Row>

                <Row className='col-2 mt-1 mb-1' gutter={8}>
                  <Col span={6}>
                    <CustomLabel
                      label='Payment Terms :'
                      require
                      readOnly={false}
                    />
                  </Col>
                  <Col span={18}>
                    <>
                      <CustomSelect
                        {...{
                          disabled: getPaymentTermsLoading,
                          placeholder: "Payment Terms",
                          className: "w-100",
                          field_id: "payment_term_id",
                          field_name: "payment_term_name",
                          allowClear: true,
                          showSearch: true,
                          value: payment_term_id,
                          data: paymentTerms ? paymentTerms[0] : [],
                          onChange: (val, obj) =>
                            val
                              ? onChangePOState({
                                  payment_term_id: val,
                                  payment_term_name:
                                    obj?.data?.payment_term_name,
                                })
                              : onChangePOState({
                                  payment_term_id: null,
                                  payment_term_name: null,
                                }),
                        }}
                      />
                    </>
                  </Col>
                </Row>
                <Row className='col-2 mt-1 mb-1' gutter={8}>
                  <Col span={6}>
                    <CustomLabel label='Currency :' require readOnly={false} />
                  </Col>
                  <Col span={18}>
                    <>
                      <CustomSelect
                        {...{
                          disabled: getCurrencyLoading,
                          style: { width: "30%" },
                          placeholder: "Currency",
                          showSearch: true,
                          allowClear: true,
                          field_id: "currency_id",
                          field_name: "currency_no",
                          value: currency_id,
                          data: currency ? currency[0] : [],
                          onChange: (val, obj) =>
                            val
                              ? onChangePOState({
                                  currency_id: val,
                                  currency_no: obj?.data?.currency_no,
                                })
                              : onChangePOState({
                                  currency_id: null,
                                  currency_no: null,
                                }),
                        }}
                      />
                    </>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                {step === 1 ? (
                  <Tabs>
                    <Tabs.TabPane tab='Select Item' key='1'>
                      <SelectPR />
                    </Tabs.TabPane>
                  </Tabs>
                ) : (
                  <>
                    <POFormDetail />
                  </>
                )}
              </Col>
            </Row>
          </>
        ) : (
          <POFormResult />
        )}
      </>
    </>
  );
};

export default React.memo(POForm);
