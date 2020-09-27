import React, { useState } from "react";
import { Row, Col, Input, Tabs, Select, AutoComplete, Typography } from "antd";
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
const { Option } = Select;
const { TextArea } = Input;
const { Title, Paragraph, Text } = Typography;

const CustomerCreate = (props) => {
  const data =
    props.location && props.location.state ? props.location.state : 0;
  console.log("data", data);
  const [editForm, setEdit] = useState(true);

  const [formData, setData] = useState(
    data && data
      ? data
      : {
          id: 0,
          c_code: null,
          c_name: null,
          c_company: null,
          c_phone: null,
          c_mobile: null,
          c_email: null,
          c_tax_id: null,
          c_type: null,
          c_desc: null,
          c_adr_street: null,
          c_adr_street2: null,
          c_adr_city: null,
          c_adr_state: null,
          c_adr_zip: null,
          c_adr_country: null,
          c_payment_term: null,
          c_currency: null,
          c_status: 0,
        }
  );
  console.log(formData);
  const callback = (key) => {};

  const upDateFormValue = (data) => {
    setData({ ...formData, ...data });
  };

  console.log(formData);
  const config = {
    projectId: 3,
    title: "SALES",
    show: true,
    breadcrumb: [
      "Home",
      "Customers",
      formData.c_code ? "Edit" : "Create",
      formData.c_code && "[ " + formData.c_code + " ] " + formData.c_name,
    ],
    search: false,
    buttonAction: editForm
      ? ["Save", "SaveConfirm", "Discard"]
      : ["Edit", "Approve", "Reject"],
    action: [{ name: "print", link: "www.google.co.th" }],
    step: {
      current: formData.c_status,
      step: ["Draft", "Confirm", "Verify", "Approve", "Done"],
    },
    create: "",
    save: {
      data: formData,
      path: formData && "/sales/config/customers/view/" + formData.id,
    },
    discard: "/sales/config/customers",
    onSave: (e) => {
      e.preventDefault();
      console.log(formData);
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
              <strong>{formData.c_code ? "Edit" : "Create"} Customer</strong>
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
              onChange={(e) => upDateFormValue({ c_name: e.target.value })}
              defaultValue={formData.c_name}
            />
          </Col>
        </Row>

        {/* Address & Information */}
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>Phone </Text>
          </Col>
          <Col span={8}>
            <Input
              onChange={(e) => upDateFormValue({ c_phone: e.target.value })}
              placeholder={"Phone..."}
              defaultValue={formData.c_phone}
            />
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong>Company Address </Text>
          </Col>
          <Col span={8}>
            <Input
              onChange={(e) =>
                upDateFormValue({ c_adr_street: e.target.value })
              }
              placeholder={"Street..."}
              defaultValue={formData.c_adr_street}
            />
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>Mobile</Text>
          </Col>
          <Col span={8}>
            <Input
              onChange={(e) => upDateFormValue({ c_mobile: e.target.value })}
              placeholder={"Mobile..."}
              defaultValue={formData.c_mobile}
            />
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong></Text>
          </Col>
          <Col span={8}>
            <Input
              onChange={(e) =>
                upDateFormValue({ c_adr_street2: e.target.value })
              }
              placeholder={"Street 2..."}
              defaultValue={formData.c_adr_street2}
            />
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>Email</Text>
          </Col>
          <Col span={8}>
            <Input
              onChange={(e) => upDateFormValue({ c_email: e.target.value })}
              placeholder={"example@gmail.co.th"}
              defaultValue={formData.c_email}
            />
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong></Text>
          </Col>
          <Col span={8}>
            <Row className="col-2">
              <Col span={8}>
                <Input
                  onChange={(e) =>
                    upDateFormValue({ c_adr_city: e.target.value })
                  }
                  placeholder={"City"}
                  defaultValue={formData.c_adr_city}
                  style={{ width: "100%" }}
                />
              </Col>
              <Col span={1}></Col>
              <Col span={8}>
                <AutoComplete
                  options={states}
                  placeholder="State"
                  defaultValue={formData.c_adr_state}
                  filterOption={(inputValue, option) =>
                    option.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                  onSelect={(data) => upDateFormValue({ c_adr_state: data })}
                  onChange={(data) => upDateFormValue({ c_adr_state: data })}
                  style={{ width: "100%" }}
                />
              </Col>
              <Col span={1}></Col>
              <Col span={6}>
                <Input
                  onChange={(e) =>
                    upDateFormValue({ c_adr_zip: e.target.value })
                  }
                  placeholder={"ZIP"}
                  defaultValue={formData.c_adr_zip}
                  style={{ width: "100%" }}
                />
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
                  c_currency: data,
                })
              }
              style={{ width: "100%" }}
              defaultValue={formData.c_currency}
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
              onChange={(e) => upDateFormValue({ c_tax_id: e.target.value })}
              placeholder={"e.g. BE0477472701"}
              defaultValue={formData.c_tax_id}
              style={{ width: "100%" }}
            />
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>Payment Terms</Text>
          </Col>
          <Col span={8}>
            <AutoComplete
              options={states}
              placeholder="Payment Terms..."
              defaultValue={formData.c_payment_term}
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                -1
              }
              onSelect={(data) => upDateFormValue({ c_payment_term: data })}
              onChange={(data) => upDateFormValue({ c_payment_term: data })}
              style={{ width: "100%" }}
            />
          </Col>
          <Col span={2}></Col>
          <Col span={3}></Col>
          <Col span={8}></Col>
        </Row>

        <Row className="row-tab-margin">
          <Col span={24}>
            <Text strong>Descriptions</Text>
            <TextArea
              rows={2}
              placeholder={"Remark..."}
              defaultValue={formData.c_desc}
              onChange={(e) => upDateFormValue({ c_desc: e.target.value })}
              style={{ width: "100%" }}
            />
          </Col>
        </Row>
      </div>
      <Comments data={[...dataComments]} />
    </MainLayout>
  );
};

export default CustomerCreate;
