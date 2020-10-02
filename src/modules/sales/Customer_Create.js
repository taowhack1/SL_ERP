import React, { useState } from "react";
import {
  Row,
  Col,
  Input,
  Tabs,
  Select,
  AutoComplete,
  Typography,
  Space,
  Checkbox,
  Switch,
} from "antd";
import MainLayout from "../../components/MainLayout";
import moment from "moment";
import ItemLine from "../../components/VendorItemLine";
import {
  autoCompleteUser,
  autoCompleteUnit,
  autoCompleteItem,
} from "../../data/inventoryData";

import Comments from "../../components/Comments";
import { dataComments } from "../../data";
import { states } from "../../data/index";
import { currencyData } from "../../data/currencyData";
import { vendorItemColumns } from "../../data/purchase/data";
import { customer_fiels } from "../../page_fields/sales/customer";
const { Option } = Select;
const { TextArea } = Input;
const { Title, Paragraph, Text } = Typography;

const CustomerCreate = (props) => {
  const data =
    props.location && props.location.state ? props.location.state : 0;
  const [editForm, setEdit] = useState(true);

  const [formData, setData] = useState(data && data ? data : customer_fiels);
  const callback = (key) => {};

  const upDateFormValue = (data) => {
    setData({ ...formData, ...data });
  };

  const config = {
    projectId: 3,
    title: "SALES",
    show: true,
    breadcrumb: [
      "Home",
      "Customers",
      formData.customer_no ? "Edit" : "Create",
      formData.customer_no &&
        "[ " + formData.customer_no + " ] " + formData.customer_name,
    ],
    search: false,
    buttonAction: editForm
      ? ["Save", "SaveConfirm", "Discard"]
      : ["Edit", "Approve", "Reject"],
    action: [{ name: "print", link: "www.google.co.th" }],

    create: "",
    save: {
      data: formData,
      path: formData && "/sales/config/customers/view/" + formData.id,
    },
    discard: "/sales/config/customers",
    onSave: (e) => {
      e.preventDefault();
    },
    onEdit: (e) => {
      e.preventDefault();
      console.log("Edit");
      setEdit(true);
    },
    onApprove: (e) => {
      e.preventDefault();
      console.log("Approve");
    },
    onConfirm: () => {
      console.log("Confirm");
    },
  };

  return (
    <MainLayout {...config} data={formData}>
      <div id="form">
        {/* Head */}
        <Row className="col-2">
          <Col span={11}>
            <h2>
              <strong>
                {formData.customer_no ? "Edit" : "Create"} Customer
              </strong>
            </h2>
          </Col>
          <Col span={2}></Col>
          <Col span={3}></Col>
          <Col span={8} style={{ textAlign: "right" }}>
            {/* <Image width={200} src="{require('/company-icon.png)}" /> */}
          </Col>
        </Row>
        <Row className="col-2">
          <Col span={24} style={{ marginBottom: 8 }}>
            <Title level={5}>Name </Title>
            <Input
              onChange={(e) =>
                upDateFormValue({ customer_name: e.target.value })
              }
              defaultValue={formData.customer_name}
            />
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={24} style={{ marginLeft: 5 }}>
            <Space align="baseline">
              <Checkbox
                defaultChecked={formData.customer_company}
                onChange={(e) =>
                  upDateFormValue({
                    customer_company: e.target.checked ? 1 : 0,
                  })
                }
              />
              <Text>Company</Text>
            </Space>
            <br />
            <Space align="baseline">
              <Checkbox
                defaultChecked={formData.customer_contact}
                onChange={(e) =>
                  upDateFormValue({
                    customer_contact: e.target.checked ? 1 : 0,
                  })
                }
              />
              <Text>Contacts</Text>
            </Space>
            {formData.item_no && (
              <Space
                align="baseline"
                style={{ float: "right", marginRight: 10 }}
              >
                <Text strong>Active</Text>
                <Switch
                  checkedChildren={""}
                  unCheckedChildren={""}
                  checked={formData.customer_actived}
                  style={{ width: 35 }}
                  onClick={(data) =>
                    upDateFormValue({ customer_actived: data ? 1 : 0 })
                  }
                />
              </Space>
            )}
          </Col>
        </Row>

        {/* Address & Information */}
        <Row className="col-2 row-margin-vertical">
          <Col span={24}>
            <Tabs defaultActiveKey="1" onChange={callback}>
              <Tabs.TabPane tab="Detail" key="1">
                <Row>
                  <Col span={3}>
                    <Text strong>Phone </Text>
                  </Col>
                  <Col span={8}>
                    <Input
                      onChange={(e) =>
                        upDateFormValue({ customer_phone: e.target.value })
                      }
                      placeholder={"Phone..."}
                      defaultValue={formData.customer_phone}
                    />
                  </Col>
                  <Col span={2}></Col>
                  <Col span={3}>
                    <Text strong>Company Address </Text>
                  </Col>
                  <Col span={8}>
                    <Input
                      onChange={(e) =>
                        upDateFormValue({ customer_address: e.target.value })
                      }
                      placeholder={"Address"}
                      defaultValue={formData.customer_address}
                    />
                  </Col>
                </Row>
                <Row className="col-2 row-margin-vertical">
                  <Col span={3}>
                    <Text strong>Mobile</Text>
                  </Col>
                  <Col span={8}>
                    <Input
                      onChange={(e) =>
                        upDateFormValue({ customer_mobile: e.target.value })
                      }
                      placeholder={"Mobile..."}
                      defaultValue={formData.customer_mobile}
                    />
                  </Col>
                  <Col span={2}></Col>
                  <Col span={3}>
                    <Text strong></Text>
                  </Col>
                  <Col span={8}>
                    <Row className="col-2">
                      <Col span={12}>
                        <Select
                          placeholder={"Country"}
                          onSelect={(data) =>
                            upDateFormValue({
                              country_id: data,
                            })
                          }
                          style={{ width: "100%" }}
                          defaultValue={formData.country_id}
                        >
                          <Option value="null"> </Option>
                          {currencyData.map((currency) => {
                            return (
                              <Option key={currency.id} value={currency.name}>
                                {currency.name}
                              </Option>
                            );
                          })}
                        </Select>
                      </Col>
                      <Col span={1}></Col>
                      <Col span={11}>
                        <Select
                          placeholder={"Province"}
                          onSelect={(data) =>
                            upDateFormValue({
                              province_id: data,
                            })
                          }
                          style={{ width: "100%" }}
                          defaultValue={formData.province_id}
                        >
                          <Option value="null"> </Option>
                          {currencyData.map((currency) => {
                            return (
                              <Option key={currency.id} value={currency.name}>
                                {currency.name}
                              </Option>
                            );
                          })}
                        </Select>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row className="col-2 row-margin-vertical">
                  <Col span={3}>
                    <Text strong>Email</Text>
                  </Col>
                  <Col span={8}>
                    <Input
                      onChange={(e) =>
                        upDateFormValue({ customer_email: e.target.value })
                      }
                      placeholder={"example@gmail.co.th"}
                      defaultValue={formData.customer_email}
                    />
                  </Col>
                  <Col span={2}></Col>
                  <Col span={3}>
                    <Text strong></Text>
                  </Col>
                  <Col span={8}>
                    <Row className="col-2">
                      <Col span={8}>
                        <Select
                          placeholder={"District"}
                          onSelect={(data) =>
                            upDateFormValue({
                              district_id: data,
                            })
                          }
                          style={{ width: "100%" }}
                          defaultValue={formData.district_id}
                        >
                          <Option value=""> </Option>
                          {currencyData.map((currency) => {
                            return (
                              <Option key={currency.id} value={currency.name}>
                                {currency.name}
                              </Option>
                            );
                          })}
                        </Select>
                      </Col>
                      <Col span={1}></Col>
                      <Col span={8}>
                        <Select
                          placeholder={"Tambon"}
                          onSelect={(data) =>
                            upDateFormValue({
                              tambon_id: data,
                            })
                          }
                          style={{ width: "100%" }}
                          defaultValue={formData.tambon_id}
                        >
                          <Option value=""> </Option>
                          {currencyData.map((currency) => {
                            return (
                              <Option key={currency.id} value={currency.name}>
                                {currency.name}
                              </Option>
                            );
                          })}
                        </Select>
                      </Col>
                      <Col span={1}></Col>
                      <Col span={6}>
                        <Select
                          placeholder={"Zip"}
                          onSelect={(data) =>
                            upDateFormValue({
                              zip_id: data,
                            })
                          }
                          style={{ width: "100%" }}
                          defaultValue={formData.zip_id}
                        >
                          <Option value=""> </Option>
                          {currencyData.map((currency) => {
                            return (
                              <Option key={currency.id} value={currency.name}>
                                {currency.name}
                              </Option>
                            );
                          })}
                        </Select>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row className="col-2">
                  <Col span={3}>
                    <Text strong>Currency</Text>
                  </Col>
                  <Col span={8}>
                    <Select
                      placeholder={"Select Currency"}
                      onSelect={(data) =>
                        upDateFormValue({
                          province_id: data,
                        })
                      }
                      style={{ width: "100%" }}
                      defaultValue={formData.province_id}
                    >
                      <Option value="null"> </Option>
                      {currencyData.map((currency) => {
                        return (
                          <Option key={currency.id} value={currency.name}>
                            {currency.name}
                          </Option>
                        );
                      })}
                    </Select>
                  </Col>
                  <Col span={2}></Col>
                  <Col span={3}>
                    <Text strong>Tax ID</Text>
                  </Col>
                  <Col span={8}>
                    <Input
                      onChange={(e) =>
                        upDateFormValue({ customer_tax: e.target.value })
                      }
                      placeholder={"e.g. BE0477472701"}
                      defaultValue={formData.customer_tax}
                      style={{ width: "100%" }}
                    />
                  </Col>
                </Row>
                <Row className="col-2 row-margin-vertical">
                  <Col span={3}>
                    <Text strong>Payment Terms</Text>
                  </Col>
                  <Col span={8}>
                    <Select
                      placeholder={"Payment Terms"}
                      onSelect={(data) =>
                        upDateFormValue({
                          payment_term_id: data,
                        })
                      }
                      style={{ width: "100%" }}
                      defaultValue={formData.payment_term_id}
                    >
                      <Option value=""> </Option>
                      {currencyData.map((currency) => {
                        return (
                          <Option key={currency.id} value={currency.name}>
                            {currency.name}
                          </Option>
                        );
                      })}
                    </Select>
                  </Col>
                  <Col span={2}></Col>
                  <Col span={3}></Col>
                  <Col span={8}></Col>
                </Row>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Notes" key="2">
                <TextArea
                  rows={3}
                  placeholder={"Remark"}
                  onChange={(e) =>
                    upDateFormValue({ customer_remark: e.target.value })
                  }
                />
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
      <Comments data={[...dataComments]} />
    </MainLayout>
  );
};

export default CustomerCreate;
