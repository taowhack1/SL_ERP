/** @format */

import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Input, Tabs, Typography, message, Cascader } from "antd";
import MainLayout from "../../components/MainLayout";
import moment from "moment";
import {
  create_vendor,
  get_vendor_category,
  get_vendor_group,
  update_vendor,
  Language,
  Country,
  Province,
  District,
  Tambon,
  Zip,
  VatID,
} from "../../actions/purchase/vendorActions";
import {
  options,
  VendorDetailFileds,
  vendor_fields,
  vendor_require_fields,
} from "./config/vendor";
import CustomSelect from "../../components/CustomSelect";
import Authorize from "../system/Authorize";
import { validateFormHead } from "../../include/js/function_main";
import { useHistory } from "react-router-dom";
import Vendor_OrtherAddress from "./Vendor_OrtherAddress";
import { reducer } from "../qualityAssurance/reducers";
import { LineChartOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Title, Text } = Typography;

const VendorCreate = (props) => {
  const history = useHistory();
  const authorize = Authorize();
  authorize.check_authorize();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.authData);
  const vendor_payment_terms = useSelector(
    (state) => state.accounting.master_data.vendor_payment_terms
  );
  const currency_list = useSelector(
    (state) => state.accounting.master_data.currency
  );
  const vendor_group = useSelector(
    (state) => state.purchase.vendor.vendor_group
  );
  const vendor_category = useSelector(
    (state) => state.purchase.vendor.vendor_category
  );
  const vendor_language = useSelector(
    (state) => state.purchase.vendor.vendor_language
  );
  const vendor_country = useSelector(
    (state) => state.purchase.vendor.vendor_country
  );
  const vendor_province = useSelector(
    (state) => state.purchase.vendor.vendor_province
  );
  const vendor_district = useSelector(
    (state) => state.purchase.vendor.vendor_district
  );
  const vendor_tambon = useSelector(
    (state) => state.purchase.vendor.vendor_tambon
  );
  const vendor_vat = useSelector((state) => state.purchase.vendor.vendor_vat);
  const vendor_zip = useSelector((state) => state.purchase.vendor.vendor_zip);
  const data =
    props.location && props.location.state ? props.location.state : 0;
  const initialStateDetail = [VendorDetailFileds];
  const [dataDetail, detailDispatch] = useReducer(reducer, initialStateDetail);
  const [data_head, set_data_head] = useState(
    data && data.data_head
      ? { ...data.data_head, commit: 1, user_name: auth.user_name }
      : {
          ...vendor_fields,
          commit: 1,
          user_name: auth.user_name,
          cnv_vendor_created: moment().format("DD/MM/YYYY"),
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
      "Vendor",
      data_head.vendor_no ? "Edit" : "Create",
      data_head.vendor_no &&
        "[ " + data_head.vendor_no + " ] " + data_head.vendor_name,
    ],
    search: false,
    buttonAction: ["Save", "Discard"],
    create: "",
    save: "function",
    discard: "/purchase/vendor",
    onSave: (e) => {
      //e.preventDefault();
      console.log("Save");
      const key = "validate";
      const validate = validateFormHead(data_head, vendor_require_fields);
      if (validate.validate) {
        const data = [{ ...data_head, vendor_detail: dataDetail }];
        console.log("pass");
        data_head.vendor_id
          ? dispatch(update_vendor(data_head.vendor_id, data, redirect_to_view))
          : dispatch(create_vendor(data, redirect_to_view));
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
    history.push("/purchase/vendor/view/" + (id ? id : "new"));
  };

  return (
    <MainLayout {...config}>
      <div id='form'>
        {/* Head */}
        <Row className='col-2'>
          <Col span={8}>
            <h2>
              <strong>
                {data_head.vendor_no ? "Edit" : "Create"} Vendor{" "}
                {data_head.vendor_no && "#" + data_head.vendor_no}
              </strong>
            </h2>
          </Col>
          <Col span={12}></Col>
          <Col span={2}>
            <Text strong>Create Date :</Text>
          </Col>
          <Col span={2} style={{ textAlign: "right" }}>
            <Text className='text-view'>{data_head.cnv_vendor_created}</Text>
          </Col>
        </Row>
        <Row className='col-2 row-tab-margin'>
          <Col span={24} style={{ marginBottom: 8 }}>
            <Title level={5}>
              <span className='require'>* </span>Name{" "}
            </Title>
            <Col span={24}>
              <Input
                name='vendor_name'
                onChange={(e) =>
                  upDateFormValue({ vendor_name: e.target.value })
                }
                value={data_head.vendor_name}
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
                          name='vendor_name_short'
                          onChange={(e) =>
                            upDateFormValue({
                              vendor_name_short: e.target.value,
                            })
                          }
                          placeholder={"SRL"}
                          value={data_head.vendor_name_short}
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
                          name='vendor_phone'
                          onChange={(e) =>
                            upDateFormValue({ vendor_phone: e.target.value })
                          }
                          placeholder={"e.g. BE0477472701"}
                          value={data_head.vendor_phone}
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
                          name='vendor_mobile'
                          onChange={(e) =>
                            upDateFormValue({ vendor_mobile: e.target.value })
                          }
                          placeholder={"Mobile"}
                          value={data_head.vendor_mobile}
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
                          name='vendor_email'
                          onChange={(e) =>
                            upDateFormValue({ vendor_email: e.target.value })
                          }
                          placeholder={"example@gmail.co.th"}
                          value={data_head.vendor_email}
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
                          name='vendor_category_id'
                          field_id='vendor_category_id'
                          field_name='vendor_category_no_name'
                          value={data_head.vendor_category_id}
                          data={vendor_category}
                          onChange={(data, option) =>
                            data
                              ? upDateFormValue({
                                  vendor_category_id: data,
                                  vendor_category_no: option.title,
                                })
                              : upDateFormValue({
                                  vendor_category_id: null,
                                  vendor_category_no: null,
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
                          name='vendor_group_id'
                          field_id='vendor_group_id'
                          field_name='vendor_group_no_name'
                          value={data_head.vendor_group_id}
                          data={vendor_group}
                          onChange={(data, option) =>
                            data
                              ? upDateFormValue({
                                  vendor_group_id: data,
                                  vendor_group_no: option.title,
                                })
                              : upDateFormValue({
                                  vendor_group_id: null,
                                  vendor_group_no: null,
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
                          name='vendor_address'
                          placeholder='Address'
                          value={data_head.vendor_address}
                          onChange={(e) =>
                            upDateFormValue({ vendor_address: e.target.value })
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
                          data={vendor_province}
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
                                  tambon_id: null,
                                  zip_id: null,
                                });
                          }}
                        />
                      </Col>
                      <Col span={6}>
                        <CustomSelect
                          placeholder={"District"}
                          allowClear
                          showSearch
                          disabled={data_head.province_id ? false : true}
                          name='district_id'
                          field_id='district_id'
                          field_name='district_name'
                          value={data_head.district_id}
                          data={vendor_district}
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
                                  tambon_id: null,
                                });
                          }}
                        />
                      </Col>
                      <Col span={6}>
                        <CustomSelect
                          placeholder={"Tambon"}
                          allowClear
                          showSearch
                          disabled={data_head.district_id ? false : true}
                          name='tambon_id'
                          field_id='tambon_id'
                          field_name='tambon_name'
                          value={data_head.tambon_id}
                          data={vendor_tambon}
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
                                  zip_id: null,
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
                          disabled={data_head.tambon_id ? false : true}
                          name='zip_id'
                          field_id='zip_id'
                          field_name='zip_name'
                          value={data_head.zip_id}
                          data={vendor_zip}
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
                          data={vendor_language}
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
                          data={vendor_country}
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
                          data={vendor_vat}
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
                          name='vendor_tax_no'
                          placeholder='Tax ID'
                          className={"full-width"}
                          value={data_head.vendor_tax_no}
                          onChange={(e) =>
                            upDateFormValue({ vendor_tax_no: e.target.value })
                          }
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Tabs.TabPane>
              <Tabs.TabPane tab={<span>Other Address</span>} key='2'>
                <Vendor_OrtherAddress
                  dataDetail={dataDetail}
                  readOnly={false}
                  detailDispatch={detailDispatch}
                />
              </Tabs.TabPane>
              <Tabs.TabPane
                tab={
                  <span>
                    <span className='require'>* </span>
                    Purchase
                  </span>
                }
                key='3'>
                <Row className='col-2 row-margin-vertical'>
                  <Col span={12}>
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
                          data={vendor_payment_terms}
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
                  name='vendor_remark'
                  placeholder={"Notes"}
                  value={data_head.vendor_remark}
                  onChange={(e) =>
                    upDateFormValue({ vendor_remark: e.target.value })
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

export default VendorCreate;
