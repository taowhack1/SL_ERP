import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Row,
  Col,
  Input,
  Tabs,
  Select,
  AutoComplete,
  Typography,
  Space,
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
const { Option } = Select;
const { TextArea } = Input;
const { Title, Paragraph, Text } = Typography;

const VendorCreate = (props) => {
  const data =
    props.location && props.location.state ? props.location.state : 0;
  const [editForm, setEdit] = useState(true);

  const [data_head, set_data_head] = useState(
    data && data
      ? data
      : {
          id: 0,
          v_code: null,
          vendor_name: null,
          v_company: null,
          v_phone: null,
          v_mobile: null,
          v_email: null,
          v_tax_id: null,
          v_type: null,
          vendor_description: null,
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
    set_data_head({ ...data_head, ...data });
  };

  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project.project_id,
    title: current_project.project_name,
    home: current_project.project_url,
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
    save: {
      data: data_head,
      path: data_head && "/purchase/vendor/view/" + data_head.vendor_id,
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
    <MainLayout {...config}>
      <div id="form">
        {/* Head */}
        <Row className="col-2">
          <Col span={11}>
            <h2>
              <strong>{data_head.vendor_no ? "Edit" : "Create"} Vendor</strong>
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
              onChange={(e) => upDateFormValue({ vendor_name: e.target.value })}
              value={data_head.vendor_name}
              placeholder="Name"
            />
          </Col>
        </Row>

        {/* Product & Notes */}
        <Row className="col-2">
          <Col span={24}>
            <Tabs defaultActiveKey="1" onChange={callback}>
              <Tabs.TabPane tab="Contact" key="1">
                {/* Address & Information */}
                <Row className="col-2 row-margin-vertical">
                  <Col span={12}>
                    <Row className="row-margin">
                      <Col span={5}>
                        <Text strong>Short Name</Text>
                      </Col>
                      <Col span={18}>
                        <Input
                          onChange={(e) =>
                            upDateFormValue({
                              vendor_short_name: e.target.value,
                            })
                          }
                          placeholder={"SRL"}
                          value={data_head.vendor_short_name}
                          // style={{ width: "100%" }}
                        />
                      </Col>
                      <Col span={1}></Col>
                    </Row>
                    <Row className="row-margin">
                      <Col span={5}>
                        <Text strong>Phone</Text>
                      </Col>
                      <Col span={18}>
                        <Input
                          onChange={(e) =>
                            upDateFormValue({ vendor_phone: e.target.value })
                          }
                          placeholder={"e.g. BE0477472701"}
                          value={data_head.vendor_phone}
                          // style={{ width: "100%" }}
                        />
                      </Col>
                      <Col span={1}></Col>
                    </Row>
                    <Row className="row-margin">
                      <Col span={5}>
                        <Text strong>Mobile</Text>
                      </Col>
                      <Col span={18}>
                        <Input
                          onChange={(e) =>
                            upDateFormValue({ vendor_mobile: e.target.value })
                          }
                          placeholder={"Mobile"}
                          value={data_head.vendor_mobile}
                          // style={{ width: "100%" }}
                        />
                      </Col>
                      <Col span={1}></Col>
                    </Row>
                    <Row className="row-margin">
                      <Col span={5}>
                        <Text strong>Email</Text>
                      </Col>
                      <Col span={18}>
                        <Input
                          onChange={(e) =>
                            upDateFormValue({ vendor_email: e.target.value })
                          }
                          placeholder={"example@gmail.co.th"}
                          value={data_head.vendor_email}
                        />
                      </Col>
                      <Col span={1}></Col>
                    </Row>
                    <Row className="row-margin">
                      <Col span={5}>
                        <Text strong>Currency</Text>
                      </Col>
                      <Col span={18}>
                        <Select
                          placeholder={"Select Currency"}
                          onSelect={(data) =>
                            upDateFormValue({
                              v_currency: data,
                            })
                          }
                          style={{ width: "100%" }}
                          value={data_head.v_currency}
                        >
                          <Option value="null"> </Option>
                          {currencyData.map((currency, key) => {
                            return (
                              <Option key={key} value={currency.name}>
                                {currency.name}
                              </Option>
                            );
                          })}
                        </Select>
                      </Col>
                      <Col span={1}></Col>
                    </Row>
                  </Col>
                  <Col span={12}>
                    <Row className="row-margin">
                      <Col span={1}></Col>
                      <Col span={5}>
                        <Text strong>Address</Text>
                      </Col>
                      <Col span={18}>
                        <TextArea
                          placeholder="Address"
                          style={{ width: "100%", height: "110px" }}
                          onChange={(e) =>
                            upDateFormValue({ vendor_address: e.target.value })
                          }
                        />
                      </Col>
                    </Row>
                    <Row className="row-margin">
                      <Col span={1}></Col>
                      <Col span={5}>
                        <Text strong>Tax ID</Text>
                      </Col>
                      <Col span={18}>
                        <Input
                          placeholder="Tax ID"
                          style={{ width: "100%" }}
                          value={data_head.vendor_tax}
                          onChange={(e) =>
                            upDateFormValue({ vendor_tax: e.target.value })
                          }
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Purchase" key="2">
                <Row className="col-2 row-margin-vertical">
                  <Col span={12}>
                    <Row className="row-margin">
                      <Col span={5}>
                        <Text strong>Payment Terms</Text>
                      </Col>
                      <Col span={18}>
                        <Input
                          onChange={(e) =>
                            upDateFormValue({
                              payment_term_no_name: e.target.value,
                            })
                          }
                          placeholder={"Payment term"}
                          value={data_head.payment_term_no_name}
                        />
                      </Col>
                      <Col span={1}></Col>
                    </Row>
                  </Col>
                  <Col span={12}>
                    <Row className="row-margin">
                      <Col span={1}></Col>
                      <Col span={5}></Col>
                      <Col span={18}></Col>
                    </Row>
                    <Row className="row-margin">
                      <Col span={1}></Col>
                      <Col span={5}></Col>
                      <Col span={18}></Col>
                    </Row>
                  </Col>
                </Row>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Notes" key="3">
                <TextArea
                  rows={3}
                  placeholder={"Notes"}
                  onChange={(e) =>
                    upDateFormValue({ vendor_description: e.target.value })
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

export default VendorCreate;
