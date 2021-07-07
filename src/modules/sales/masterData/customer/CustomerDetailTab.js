import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Input } from "antd";

import CustomSelect from "../../../../components/CustomSelect";

import CustomLabel from "../../../../components/CustomLabel";
import Text from "antd/lib/typography/Text";

const CustomerDetailTab = ({ upDateFormValue, data_head, readOnly }) => {
  const currency_list = useSelector(
    (state) => state.accounting.master_data.currency
  );
  const {
    vendor_category: customer_category,
    vendor_group: customer_group,
    vendor_vat: customer_vat,
  } = useSelector((state) => state.purchase.vendor);
  return (
    <>
      <Row className="col-2 row-margin-vertical">
        <Col span={12}>
          <Row className="row-margin">
            <Col span={5}>
              <CustomLabel label={"Short Name"} require readOnly={readOnly} />
            </Col>
            <Col span={18}>
              {readOnly ? (
                <Text className="pre-wrap">
                  {data_head.customer_name_short || "-"}
                </Text>
              ) : (
                <Input
                  name="customer_name_short"
                  disabled={data_head.customer_id ? true : false}
                  maxLength={3}
                  onChange={(e) => {
                    upDateFormValue({
                      customer_name_short: e.target.value?.toUpperCase(),
                    });
                  }}
                  placeholder={"eg. SRL"}
                  value={data_head.customer_name_short}
                />
              )}
            </Col>
            <Col span={1}></Col>
          </Row>
          <Row className="row-margin">
            <Col span={5}>
              <CustomLabel require readOnly={readOnly} label="Category" />
            </Col>
            <Col span={18}>
              {readOnly ? (
                <Text className="pre-wrap">
                  {data_head.customer_category_name || "-"}
                </Text>
              ) : (
                <CustomSelect
                  placeholder={"Customer Category"}
                  allowClear
                  showSearch
                  name="customer_category_id"
                  field_id="vendor_category_id"
                  field_name="vendor_category_no_name"
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
              )}
            </Col>
            <Col span={1}></Col>
          </Row>
          <Row className="row-margin">
            <Col span={5}>
              <CustomLabel label="Group" require readOnly={readOnly} />
            </Col>
            <Col span={18}>
              {readOnly ? (
                <Text className="pre-wrap">
                  {data_head.customer_group_name || "-"}
                </Text>
              ) : (
                <CustomSelect
                  placeholder={"Customer Group"}
                  allowClear
                  showSearch
                  name="customer_group_id"
                  field_id="vendor_group_id"
                  field_name="vendor_group_no_name"
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
              )}
            </Col>
            <Col span={1}></Col>
          </Row>
          <Row className="row-margin">
            <Col span={5}>
              <CustomLabel label="Phone" readOnly={readOnly} />
            </Col>
            <Col span={18}>
              {readOnly ? (
                <Text className="pre-wrap">
                  {data_head.customer_phone || "-"}
                </Text>
              ) : (
                <Input
                  name="customer_phone"
                  onChange={(e) =>
                    upDateFormValue({ customer_phone: e.target.value })
                  }
                  placeholder={"Phone Number"}
                  value={data_head.customer_phone}
                />
              )}
            </Col>
            <Col span={1}></Col>
          </Row>
          <Row className="row-margin">
            <Col span={5}>
              <CustomLabel label="Mobile" readOnly={readOnly} />
            </Col>
            <Col span={18}>
              {readOnly ? (
                <Text className="pre-wrap">
                  {data_head.customer_mobile || "-"}
                </Text>
              ) : (
                <Input
                  name="customer_mobile"
                  onChange={(e) =>
                    upDateFormValue({ customer_mobile: e.target.value })
                  }
                  placeholder={"Mobile Phone Number"}
                  value={data_head.customer_mobile}
                />
              )}
            </Col>
            <Col span={1}></Col>
          </Row>
        </Col>
        <Col span={12}>
          {/* <Row className="row-margin">
            <Col span={1}></Col>
            <Col span={5}>
              <Text strong>
                <span className="require">* </span>Address
              </Text>
            </Col>
            <Col span={18}>
              <Input
                name="customer_address"
                placeholder="Address"
                value={data_head.customer_address}
                onChange={(e) =>
                  upDateFormValue({
                    customer_address: e.target.value,
                  })
                }
              />
            </Col>
          </Row>
          <Row className="row-margin">
            <Col span={1}></Col>
            <Col span={5}>
              <Text strong></Text>
            </Col>
            <Col span={6}>
              <CustomSelect
                placeholder={"Province"}
                allowClear
                showSearch
                name="province_id"
                field_id="province_id"
                field_name="province_name"
                value={data_head.province_id}
                data={customer_province ?? [""]}
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
                name="district_id"
                field_id="district_id"
                field_name="district_name"
                value={data_head.district_id}
                data={customer_district ?? []}
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
                name="tambon_id"
                field_id="tambon_id"
                field_name="tambon_name"
                value={data_head.tambon_id}
                data={customer_tambon ?? []}
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
          <Row className="row-margin">
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
                name="zip_id"
                field_id="zip_id"
                field_name="zip_name"
                value={data_head.zip_id}
                data={customer_zip ?? []}
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
                name="language_id"
                field_id="language_id"
                field_name="language_name"
                value={data_head.language_id}
                data={customer_language ?? []}
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
                name="country_id"
                field_id="country_id"
                field_name="country_name"
                value={data_head.country_id}
                data={customer_country ?? []}
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
          </Row> */}
          <Row className="row-margin">
            <Col span={1}></Col>
            <Col span={5}>
              <CustomLabel label="Currency" require readOnly={readOnly} />
            </Col>
            <Col span={18}>
              {readOnly ? (
                <Text className="pre-wrap">{data_head.currency_no || "-"}</Text>
              ) : (
                <CustomSelect
                  placeholder={"Currency"}
                  allowClear
                  showSearch
                  name="currency_id"
                  field_id="currency_id"
                  field_name="currency_no"
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
              )}
            </Col>
          </Row>
          <Row className="row-margin">
            <Col span={1}></Col>
            <Col span={5}>
              <CustomLabel label="Vat" require readOnly={readOnly} />
            </Col>
            <Col span={18}>
              {readOnly ? (
                <Text className="pre-wrap">{data_head.vat_name || "-"}</Text>
              ) : (
                <CustomSelect
                  placeholder={"Vat"}
                  allowClear
                  showSearch
                  name="vat_id"
                  field_id="vat_id"
                  field_name="vat_name"
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
              )}
            </Col>
          </Row>
          <Row className="row-margin">
            <Col span={1}></Col>
            <Col span={5}>
              <CustomLabel label="Tax ID" require readOnly={readOnly} />
            </Col>
            <Col span={18}>
              {readOnly ? (
                <Text className="pre-wrap">
                  {data_head.customer_tax_no || "-"}
                </Text>
              ) : (
                <Input
                  name="customer_tax_no"
                  placeholder="Tax ID"
                  className={"full-width"}
                  value={data_head.customer_tax_no}
                  onChange={(e) =>
                    upDateFormValue({ customer_tax_no: e.target.value })
                  }
                />
              )}
            </Col>
          </Row>
          <Row className="row-margin">
            <Col span={1}></Col>

            <Col span={5}>
              <CustomLabel label="Email" readOnly={readOnly} />
            </Col>
            <Col span={18}>
              {readOnly ? (
                <Text className="pre-wrap">
                  {data_head.customer_email || "-"}
                </Text>
              ) : (
                <Input
                  name="customer_email"
                  onChange={(e) =>
                    upDateFormValue({ customer_email: e.target.value })
                  }
                  placeholder={"example@gmail.co.th"}
                  value={data_head.customer_email}
                />
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default React.memo(CustomerDetailTab);
