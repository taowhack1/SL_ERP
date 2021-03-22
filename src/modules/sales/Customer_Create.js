/** @format */

import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Input, Tabs, Typography, InputNumber, message } from "antd";
import MainLayout from "../../components/MainLayout";
import moment from "moment";
import {
  addressColumns,
  CustomerDetailFileds,
  customer_fields,
  customer_require_fields,
} from "./configs/customer";
import CustomSelect from "../../components/CustomSelect";
import {
  create_customer,
  update_customer,
} from "../../actions/sales/customerActions";
import Authorize from "../system/Authorize";

import { validateFormHead } from "../../include/js/function_main";
import { useHistory } from "react-router-dom";
import { numberFormat } from "../../include/js/main_config";
import CustomTable from "../../components/CustomTable";
import Customer_OrtherAddress from "./Customer_OrtherAddress";
import { reducer } from "../qualityAssurance/reducers";
import {
  Country,
  District,
  get_vendor_category,
  get_vendor_group,
  Language,
  Province,
  Tambon,
  VatID,
  Zip,
} from "../../actions/purchase/vendorActions";

const { TextArea } = Input;
const { Title, Text } = Typography;

const CustomerCreate = (props) => {
  const history = useHistory();
  const authorize = Authorize();
  authorize.check_authorize();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.authData);
  const customer_payment_terms = useSelector(
    (state) => state.accounting.master_data.customer_payment_terms
  );
  const currency_list = useSelector(
    (state) => state.accounting.master_data.currency
  );
  const customer_group = useSelector(
    (state) => state.purchase.vendor.vendor_group
  );
  const customer_category = useSelector(
    (state) => state.purchase.vendor.vendor_category
  );
  const customer_language = useSelector(
    (state) => state.purchase.vendor.vendor_language
  );
  const customer_country = useSelector(
    (state) => state.purchase.vendor.vendor_country
  );
  const customer_province = useSelector(
    (state) => state.purchase.vendor.vendor_province
  );
  const customer_district = useSelector(
    (state) => state.purchase.vendor.vendor_district
  );
  const customer_tambon = useSelector(
    (state) => state.purchase.vendor.vendor_tambon
  );
  const customer_vat = useSelector((state) => state.purchase.vendor.vendor_vat);
  const customer_zip = useSelector((state) => state.purchase.vendor.vendor_zip);
  const data =
    props.location && props.location.state ? props.location.state : 0;
  const initialStateDetail = [
    { ...CustomerDetailFileds, user_name: auth.user_name },
  ];
  const [dataDetail, detailDispatch] = useReducer(reducer, initialStateDetail);
  const [data_head, set_data_head] = useState(
    data && data.data_head
      ? { ...data.data_head, commit: 1, user_name: auth.user_name }
      : {
          ...customer_fields,
          commit: 1,
          user_name: auth.user_name,
          cnv_customer_created: moment().format("DD/MM/YYYY"),
        }
  );
  const callback = (key) => {};

  const upDateFormValue = (data) => {
    set_data_head({ ...data_head, ...data });
  };
  useEffect(() => {
    dispatch(get_vendor_group());
    dispatch(get_vendor_category());
    dispatch(Province());
    dispatch(Language());
    dispatch(Country());
    dispatch(VatID());
    detailDispatch({
      type: "SET_DETAIL",
      payload:
        data && data.dataDetail.length ? data.dataDetail : initialStateDetail,
    });
  }, []);
  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: [
      "Home",
      "Customer",
      data_head.customer_no ? "Edit" : "Create",
      data_head.customer_no &&
        "[ " + data_head.customer_no + " ] " + data_head.customer_name,
    ],
    search: false,
    buttonAction: ["Save", "Discard"],
    create: "",
    save: "function",
    discard: "/sales/config/customers",
    onSave: (e) => {
      //e.preventDefault();
      const key = "validate";
      const validate = validateFormHead(data_head, customer_require_fields);
      if (validate.validate) {
        const data = [{ ...data_head, customer_detail: dataDetail }];
        console.log("pass", data);
        data_head.customer_id
          ? dispatch(
              update_customer(data_head.customer_id, data, redirect_to_view)
            )
          : dispatch(create_customer(data, redirect_to_view));
        console.log("customer_id", data_head.customer_id);
      } else {
        message.warning({
          content: "Please fill your form completely.",
          key,
          duration: 2,
        });
      }
    },
    onEdit: (e) => {
      //e.preventDefault();
      console.log("Edit");
    },
    onApprove: (e) => {
      //e.preventDefault();
      console.log("Approve");
    },
    onConfirm: () => {
      console.log("Confirm");
    },
  };
  const redirect_to_view = (id) => {
    history.push("/sales/config/customers/view/" + (id ? id : "new"));
  };
  console.log("dataDetail", dataDetail);
  console.log("initialStateDetail", { ...initialStateDetail });

  return (
    <MainLayout {...config}>
      <div id='form'>
        {/* Head */}
        <Row className='col-2'>
          <Col span={8}>
            <h2>
              <strong>
                {data_head.customer_no ? "Edit" : "Create"} Customer{" "}
                {data_head.customer_no && "#" + data_head.customer_no}
              </strong>
            </h2>
          </Col>
          <Col span={12}></Col>
          <Col span={2}>
            <Text strong>Create Date :</Text>
          </Col>
          <Col span={2} style={{ textAlign: "right" }}>
            <Text className='text-view'>{data_head.cnv_customer_created}</Text>
          </Col>
        </Row>
        <Row className='col-2 row-tab-margin'>
          <Col span={24} style={{ marginBottom: 8 }}>
            <Title level={5}>
              <span className='require'>* </span>Name{" "}
            </Title>
            <Col span={24}>
              <Input
                name='customer_name'
                onChange={(e) =>
                  upDateFormValue({ customer_name: e.target.value })
                }
                value={data_head.customer_name}
                placeholder='Name'
              />
            </Col>
          </Col>
        </Row>

        <Row className='col-2 row-tab-margin-l'>
          <Col span={24}>
            <Tabs defaultActiveKey='1' onChange={callback}>
              <Tabs.TabPane
                tab={
                  <span>
                    <span className='require'>* </span>
                    Contact & Detail
                  </span>
                }
                key='1'>
                {/* Address & Information */}
                <Row className='col-2 row-margin-vertical'>
                  <Col span={12}>
                    <Row className='row-margin'>
                      <Col span={5}>
                        <Text strong>Short Name</Text>
                      </Col>
                      <Col span={18}>
                        <Input
                          name='customer_name_short'
                          onChange={(e) =>
                            upDateFormValue({
                              customer_name_short: e.target.value,
                            })
                          }
                          placeholder={"SRL"}
                          value={data_head.customer_name_short}
                        />
                      </Col>
                      <Col span={1}></Col>
                    </Row>
                    <Row className='row-margin'>
                      <Col span={5}>
                        <Text strong>Phone</Text>
                      </Col>
                      <Col span={18}>
                        <Input
                          name='customer_phone'
                          onChange={(e) =>
                            upDateFormValue({ customer_phone: e.target.value })
                          }
                          placeholder={"e.g. BE0477472701"}
                          value={data_head.customer_phone}
                        />
                      </Col>
                      <Col span={1}></Col>
                    </Row>
                    <Row className='row-margin'>
                      <Col span={5}>
                        <Text strong>Mobile</Text>
                      </Col>
                      <Col span={18}>
                        <Input
                          name='customer_mobile'
                          onChange={(e) =>
                            upDateFormValue({ customer_mobile: e.target.value })
                          }
                          placeholder={"Mobile"}
                          value={data_head.customer_mobile}
                        />
                      </Col>
                      <Col span={1}></Col>
                    </Row>
                    <Row className='row-margin'>
                      <Col span={5}>
                        <Text strong>Email</Text>
                      </Col>
                      <Col span={18}>
                        <Input
                          name='customer_email'
                          onChange={(e) =>
                            upDateFormValue({ customer_email: e.target.value })
                          }
                          placeholder={"example@gmail.co.th"}
                          value={data_head.customer_email}
                        />
                      </Col>
                      <Col span={1}></Col>
                    </Row>
                    <Row className='row-margin'>
                      <Col span={5}>
                        <Text strong>
                          <span className='require'>* </span>Category
                        </Text>
                      </Col>
                      <Col span={18}>
                        <CustomSelect
                          placeholder={"Category"}
                          allowClear
                          showSearch
                          name='customer_category_id'
                          field_id='vendor_category_id'
                          field_name='vendor_category_no_name'
                          value={data_head.customer_category_id}
                          data={customer_category}
                          onChange={(data, option) =>
                            data
                              ? upDateFormValue({
                                  customer_category_id: data,
                                  customer_category_no: option.title,
                                })
                              : upDateFormValue({
                                  customer_category_id: null,
                                  customer_category_no: null,
                                })
                          }
                        />
                      </Col>
                      <Col span={1}></Col>
                    </Row>
                    <Row className='row-margin'>
                      <Col span={5}>
                        <Text strong>
                          <span className='require'>* </span>group
                        </Text>
                      </Col>
                      <Col span={18}>
                        <CustomSelect
                          placeholder={"Group"}
                          allowClear
                          showSearch
                          name='customer_group_id'
                          field_id='vendor_group_id'
                          field_name='vendor_group_no_name'
                          value={data_head.customer_group_id}
                          data={customer_group}
                          onChange={(data, option) =>
                            data
                              ? upDateFormValue({
                                  customer_group_id: data,
                                  customer_group_no: option.title,
                                })
                              : upDateFormValue({
                                  customer_group_id: null,
                                  customer_group_no: null,
                                })
                          }
                        />
                      </Col>
                      <Col span={1}></Col>
                    </Row>
                  </Col>
                  <Col span={12}>
                    <Row className='row-margin'>
                      <Col span={1}></Col>
                      <Col span={5}>
                        <Text strong>
                          <span className='require'>* </span>Address
                        </Text>
                      </Col>
                      <Col span={18}>
                        <Input
                          name='customer_address'
                          placeholder='Address'
                          value={data_head.customer_address}
                          onChange={(e) =>
                            upDateFormValue({
                              customer_address: e.target.value,
                            })
                          }
                        />
                      </Col>
                    </Row>
                    <Row className='row-margin'>
                      <Col span={1}></Col>
                      <Col span={5}>
                        <Text strong></Text>
                      </Col>
                      <Col span={6}>
                        <CustomSelect
                          placeholder={"Province"}
                          allowClear
                          showSearch
                          name='province_id'
                          field_id='province_id'
                          field_name='province_name'
                          value={data_head.province_id}
                          data={customer_province}
                          onChange={(data, option) => {
                            data
                              ? upDateFormValue(
                                  {
                                    province_id: data,
                                    province_no_name: option.title,
                                  },
                                  dispatch(District(data))
                                )
                              : upDateFormValue({
                                  province_id: null,
                                  province_no_name: null,
                                  district_id: null,
                                  district_no_name: null,
                                });
                          }}
                        />
                      </Col>
                      <Col span={6}>
                        <CustomSelect
                          placeholder={"District"}
                          allowClear
                          showSearch
                          name='district_id'
                          field_id='district_id'
                          field_name='district_name'
                          value={data_head.district_id}
                          data={customer_district}
                          onChange={(data, option) => {
                            data
                              ? upDateFormValue(
                                  {
                                    district_id: data,
                                    district_name: option.title,
                                  },
                                  dispatch(Tambon(data))
                                )
                              : upDateFormValue({
                                  district_id: null,
                                  district_name: null,
                                });
                          }}
                        />
                      </Col>
                      <Col span={6}>
                        <CustomSelect
                          placeholder={"Tambon"}
                          allowClear
                          showSearch
                          name='tambon_id'
                          field_id='tambon_id'
                          field_name='tambon_name'
                          value={data_head.tambon_id}
                          data={customer_tambon}
                          onChange={(data, option) =>
                            data
                              ? upDateFormValue(
                                  {
                                    tambon_id: data,
                                    tambon_name: option.title,
                                  },
                                  dispatch(Zip(data))
                                )
                              : upDateFormValue({
                                  tambon_id: null,
                                  tambon_name: null,
                                })
                          }
                        />
                      </Col>
                    </Row>
                    <Row className='row-margin'>
                      <Col span={1}></Col>
                      <Col span={5}>
                        <Text strong></Text>
                      </Col>
                      <Col span={6}>
                        <CustomSelect
                          placeholder={"Zip"}
                          allowClear
                          showSearch
                          name='zip_id'
                          field_id='zip_id'
                          field_name='zip_name'
                          value={data_head.zip_id}
                          data={customer_zip}
                          onChange={(data, option) =>
                            data
                              ? upDateFormValue({
                                  zip_id: data,
                                  zip_name: option.title,
                                })
                              : upDateFormValue({
                                  zip_id: null,
                                  zip_name: null,
                                })
                          }
                        />
                      </Col>
                      <Col span={6}>
                        <CustomSelect
                          placeholder={"Language"}
                          allowClear
                          showSearch
                          name='language_id'
                          field_id='language_id'
                          field_name='language_name'
                          value={data_head.language_id}
                          data={customer_language}
                          onChange={(data, option) =>
                            data
                              ? upDateFormValue({
                                  language_id: data,
                                  language_name: option.title,
                                })
                              : upDateFormValue({
                                  language_id: null,
                                  language_name: null,
                                })
                          }
                        />
                      </Col>
                      <Col span={6}>
                        <CustomSelect
                          placeholder={"Country"}
                          allowClear
                          showSearch
                          name='country_id'
                          field_id='country_id'
                          field_name='country_name'
                          value={data_head.country_id}
                          data={customer_country}
                          onChange={(data, option) =>
                            data
                              ? upDateFormValue({
                                  country_id: data,
                                  country_name: option.title,
                                })
                              : upDateFormValue({
                                  country_id: null,
                                  country_name: null,
                                })
                          }
                        />
                      </Col>
                    </Row>
                    <Row className='row-margin'>
                      <Col span={1}></Col>
                      <Col span={5}>
                        <Text strong>
                          <span className='require'>* </span>Currency
                        </Text>
                      </Col>
                      <Col span={18}>
                        <CustomSelect
                          placeholder={"Currency"}
                          allowClear
                          showSearch
                          name='currency_id'
                          field_id='currency_id'
                          field_name='currency_no'
                          value={data_head.currency_no}
                          data={currency_list}
                          onChange={(data, option) =>
                            data
                              ? upDateFormValue({
                                  currency_id: data,
                                  currency_no: option.title,
                                })
                              : upDateFormValue({
                                  currency_id: null,
                                  currency_no: null,
                                })
                          }
                        />
                      </Col>
                    </Row>
                    <Row className='row-margin'>
                      <Col span={1}></Col>
                      <Col span={5}>
                        <Text strong>
                          <span className='require'>* </span>Vat ID
                        </Text>
                      </Col>
                      <Col span={18}>
                        <CustomSelect
                          placeholder={"Vat"}
                          allowClear
                          showSearch
                          name='vat_id'
                          field_id='vat_id'
                          field_name='vat_name'
                          value={data_head.vat_id}
                          data={customer_vat}
                          onChange={(data, option) =>
                            data
                              ? upDateFormValue({
                                  vat_id: data,
                                  vat_no_name: option.title,
                                })
                              : upDateFormValue({
                                  vat_id: null,
                                  vat_no_name: null,
                                })
                          }
                        />
                      </Col>
                    </Row>
                    <Row className='row-margin'>
                      <Col span={1}></Col>
                      <Col span={5}>
                        <Text strong>
                          <span className='require'>* </span>Tax ID
                        </Text>
                      </Col>
                      <Col span={18}>
                        <Input
                          name='customer_tax_no'
                          placeholder='Tax ID'
                          className={"full-width"}
                          value={data_head.customer_tax_no}
                          onChange={(e) =>
                            upDateFormValue({ customer_tax_no: e.target.value })
                          }
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Tabs.TabPane>
              <Tabs.TabPane tab={<span>Orther Address</span>} key='2'>
                <Customer_OrtherAddress
                  dataDetail={dataDetail}
                  readOnly={false}
                  detailDispatch={detailDispatch}
                  user_name={auth.user_name}
                />
              </Tabs.TabPane>
              <Tabs.TabPane
                tab={
                  <span>
                    <span className='require'>* </span>
                    Sales
                  </span>
                }
                key='3'>
                <Row className='col-2 row-margin-vertical'>
                  <Col span={12}>
                    <Row className='row-margin'>
                      <Col span={5}>
                        <Text strong>
                          <span className='require'>* </span>Condition Billing
                        </Text>
                      </Col>
                      <Col span={18}>
                        <Input
                          name='customer_condition_billing'
                          placeholder='e.g. affter delivery'
                          value={data_head.customer_condition_billing}
                          onChange={(data) => {
                            upDateFormValue({
                              customer_condition_billing: data.target.value,
                            });
                          }}
                          className={"full-width"}
                          // size="small"
                        />
                      </Col>
                      <Col span={1}></Col>
                    </Row>
                    <Row className='row-margin'>
                      <Col span={5}>
                        <Text strong>
                          <span className='require'>* </span>Payment Terms
                        </Text>
                      </Col>
                      <Col span={18}>
                        <CustomSelect
                          placeholder={"Payment Term"}
                          allowClear
                          showSearch
                          name='payment_term_id'
                          field_id='payment_term_id'
                          field_name='payment_term_no_name'
                          value={data_head.payment_term_no_name}
                          data={customer_payment_terms}
                          onChange={(data, option) =>
                            data
                              ? upDateFormValue({
                                  payment_term_id: data,
                                  payment_term_no_name: option.title,
                                })
                              : upDateFormValue({
                                  payment_term_id: null,
                                  payment_term_no_name: null,
                                })
                          }
                        />
                      </Col>
                      <Col span={1}></Col>
                    </Row>
                    <Row className='row-margin'>
                      <Col span={5}>
                        <Text strong>
                          <span className='require'>* </span>Credit Limit
                        </Text>
                      </Col>
                      <Col span={18}>
                        <Row>
                          <Col span={12}>
                            <InputNumber
                              name='customer_limit_credit'
                              placeholder='Credit Limit'
                              value={data_head.customer_limit_credit}
                              precision={3}
                              {...numberFormat}
                              step={5}
                              onChange={(data) => {
                                upDateFormValue({
                                  customer_limit_credit: data,
                                });
                              }}
                              className={"full-width"}
                              // size="small"
                            />
                          </Col>
                          <Col span={12}>
                            <Text
                              strong
                              style={{
                                verticalAlign: "middle",
                                paddingLeft: 10,
                              }}>
                              {data_head.currency_no}
                            </Text>
                          </Col>
                        </Row>
                      </Col>
                      <Col span={1}></Col>
                    </Row>
                  </Col>
                  <Col span={12}>
                    <Row className='row-margin'>
                      <Col span={1}></Col>
                      <Col span={5}></Col>
                      <Col span={18}></Col>
                    </Row>
                    <Row className='row-margin'>
                      <Col span={1}></Col>
                      <Col span={5}></Col>
                      <Col span={18}></Col>
                    </Row>
                  </Col>
                </Row>
              </Tabs.TabPane>
              <Tabs.TabPane tab='Notes' key='4'>
                <TextArea
                  rows={3}
                  name='customer_remark'
                  placeholder={"Notes"}
                  value={data_head.customer_remark}
                  onChange={(e) =>
                    upDateFormValue({ customer_remark: e.target.value })
                  }
                />
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
      {/* <Comments data={dataComments} /> */}
    </MainLayout>
  );
};

export default CustomerCreate;
