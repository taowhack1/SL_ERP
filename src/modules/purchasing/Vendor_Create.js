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

const VendorCreate = (props) => {
  const data =
    props.location && props.location.state ? props.location.state : 0;
  const [editForm, setEdit] = useState(true);

  const [formData, setData] = useState(
    data && data
      ? data
      : {
          id: 0,
          v_code: null,
          v_name: null,
          v_company: null,
          v_phone: null,
          v_mobile: null,
          v_email: null,
          v_tax_id: null,
          v_type: null,
          v_desc: null,
          v_adr_street: null,
          v_adr_street2: null,
          v_adr_city: null,
          v_adr_state: null,
          v_adr_zip: null,
          v_adr_country: null,
          v_payment_term: null,
          v_currency: null,
          v_status: 0,
          dataLine: [
            {
              id: 0,
              item: null,
              itemValidate: null,
              itemQty: 0,
              itemUnit: "pc",
              itemPrice: 0,
            },
          ],
        }
  );
  const callback = (key) => {};

  const upDateFormValue = (data) => {
    setData({ ...formData, ...data });
  };

  const config = {
    projectId: 2,
    title: "PURCHASE",
    show: true,
    breadcrumb: [
      "Home",
      "Vendor",
      formData.itemCode ? "Edit" : "Create",
      formData.itemCode && "[ " + formData.itemCode + " ] " + formData.itemName,
    ],
    search: false,
    buttonAction: editForm
      ? ["Save", "SaveConfirm", "Discard"]
      : ["Edit", "Approve", "Reject"],
    action: [{ name: "print", link: "www.google.co.th" }],
    step: {
      current: formData.v_status,
      step: ["Draft", "Confirm", "Verify", "Approve", "Done"],
    },
    create: "",
    save: {
      data: formData,
      path: formData && "/purchase/vendor/view/" + formData.id,
    },
    discard: "/purchase/vendor",
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
              <strong>{formData.itemCode ? "Edit" : "Create"} Vendor</strong>
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
              onChange={(e) => upDateFormValue({ v_name: e.target.value })}
              defaultValue={formData.v_name}
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
              onChange={(e) => upDateFormValue({ v_phone: e.target.value })}
              placeholder={"Phone..."}
              defaultValue={formData.v_phone}
            />
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong>Company Address </Text>
          </Col>
          <Col span={8}>
            <Input
              onChange={(e) =>
                upDateFormValue({ v_adr_street: e.target.value })
              }
              placeholder={"Street..."}
              defaultValue={formData.v_adr_street}
            />
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>Mobile</Text>
          </Col>
          <Col span={8}>
            <Input
              onChange={(e) => upDateFormValue({ v_mobile: e.target.value })}
              placeholder={"Mobile..."}
              defaultValue={formData.v_mobile}
            />
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong></Text>
          </Col>
          <Col span={8}>
            <Input
              onChange={(e) =>
                upDateFormValue({ v_adr_street2: e.target.value })
              }
              placeholder={"Street 2..."}
              defaultValue={formData.v_adr_street2}
            />
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>Email</Text>
          </Col>
          <Col span={8}>
            <Input
              onChange={(e) => upDateFormValue({ v_email: e.target.value })}
              placeholder={"example@gmail.co.th"}
              defaultValue={formData.v_email}
            />
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong></Text>
          </Col>
          <Col span={8}>
            <Row>
              <Col span={8}>
                <Input
                  onChange={(e) =>
                    upDateFormValue({ v_adr_city: e.target.value })
                  }
                  placeholder={"City"}
                  defaultValue={formData.v_adr_city}
                  style={{ width: "100%" }}
                />
              </Col>
              <Col span={1}></Col>
              <Col span={8}>
                <AutoComplete
                  options={states}
                  placeholder="State"
                  defaultValue={formData.v_adr_state}
                  filterOption={(inputValue, option) =>
                    option.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                  onSelect={(data) => upDateFormValue({ v_adr_state: data })}
                  onChange={(data) => upDateFormValue({ v_adr_state: data })}
                  style={{ width: "100%" }}
                />
              </Col>
              <Col span={1}></Col>
              <Col span={6}>
                <Input
                  onChange={(e) =>
                    upDateFormValue({ v_adr_zip: e.target.value })
                  }
                  placeholder={"ZIP"}
                  defaultValue={formData.v_adr_zip}
                  style={{ width: "100%" }}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span={3}>
            <Text strong>Currency</Text>
          </Col>
          <Col span={8}>
            <Select
              placeholder={"Select Currency"}
              onSelect={(data) =>
                upDateFormValue({
                  v_currency: data,
                })
              }
              style={{ width: "100%" }}
              defaultValue={formData.v_currency}
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
              onChange={(e) => upDateFormValue({ v_tax_id: e.target.value })}
              placeholder={"e.g. BE0477472701"}
              defaultValue={formData.v_tax_id}
              style={{ width: "100%" }}
            />
          </Col>
        </Row>

        {/* Product & Notes */}
        <Row className="col-2 row-tab-margin">
          <Col span={24}>
            <Tabs defaultActiveKey="1" onChange={callback}>
              <Tabs.TabPane tab="Products" key="1">
                <ItemLine
                  // vendors={vendors}
                  items={autoCompleteItem}
                  units={autoCompleteUnit}
                  dataLine={formData.dataLine ? formData.dataLine : [{}]}
                  columns={vendorItemColumns}
                  readOnly={false}
                  updateData={upDateFormValue}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Notes" key="2">
                <TextArea
                  rows={3}
                  placeholder={"Remark..."}
                  onChange={(e) => upDateFormValue({ v_desc: e.target.value })}
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

export default VendorCreate;
