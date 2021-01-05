import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Input, Tabs, Typography, message } from "antd";
import MainLayout from "../../components/MainLayout";
import moment from "moment";
import {
  create_vendor,
  update_vendor,
} from "../../actions/purchase/vendorActions";
import { vendor_fields, vendor_require_fields } from "./config/vendor";
import CustomSelect from "../../components/CustomSelect";
import Authorize from "../system/Authorize";
import { validateFormHead } from "../../include/js/function_main";
import { useHistory } from "react-router-dom";

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
  const data =
    props.location && props.location.state ? props.location.state : 0;
  const [data_head, set_data_head] = useState(
    data && data
      ? { ...data, commit: 1, user_name: auth.user_name }
      : {
          ...vendor_fields,
          commit: 1,
          user_name: auth.user_name,
          cnv_vendor_created: moment().format("DD/MM/YYYY"),
        }
  );
  console.log(data_head);
  const callback = (key) => {};

  const upDateFormValue = (data) => {
    set_data_head({ ...data_head, ...data });
  };

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
        console.log("pass");
        data_head.vendor_id
          ? dispatch(
              update_vendor(data_head.vendor_id, data_head, redirect_to_view)
            )
          : dispatch(create_vendor(data_head, redirect_to_view));
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
      <div id="form">
        {/* Head */}
        <Row className="col-2">
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
            <Text className="text-view">{data_head.cnv_vendor_created}</Text>
          </Col>
        </Row>
        <Row className="col-2 row-tab-margin">
          <Col span={24} style={{ marginBottom: 8 }}>
            <Title level={5}>
              <span className="require">* </span>Name{" "}
            </Title>
            <Col span={24}>
              <Input
                name="vendor_name"
                onChange={(e) =>
                  upDateFormValue({ vendor_name: e.target.value })
                }
                value={data_head.vendor_name}
                placeholder="Name"
              />
            </Col>
          </Col>
        </Row>

        <Row className="col-2 row-tab-margin-l">
          <Col span={24}>
            <Tabs defaultActiveKey="1" onChange={callback}>
              <Tabs.TabPane
                tab={
                  <span>
                    <span className="require">* </span>
                    Contact & Detail
                  </span>
                }
                key="1"
              >
                {/* Address & Information */}
                <Row className="col-2 row-margin-vertical">
                  <Col span={12}>
                    <Row className="row-margin">
                      <Col span={5}>
                        <Text strong>Short Name</Text>
                      </Col>
                      <Col span={18}>
                        <Input
                          name="vendor_name_short"
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
                    <Row className="row-margin">
                      <Col span={5}>
                        <Text strong>Phone</Text>
                      </Col>
                      <Col span={18}>
                        <Input
                          name="vendor_phone"
                          onChange={(e) =>
                            upDateFormValue({ vendor_phone: e.target.value })
                          }
                          placeholder={"e.g. BE0477472701"}
                          value={data_head.vendor_phone}
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
                          name="vendor_mobile"
                          onChange={(e) =>
                            upDateFormValue({ vendor_mobile: e.target.value })
                          }
                          placeholder={"Mobile"}
                          value={data_head.vendor_mobile}
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
                          name="vendor_email"
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
                        <Text strong>
                          <span className="require">* </span>Currency
                        </Text>
                      </Col>
                      <Col span={18}>
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
                      </Col>
                      <Col span={1}></Col>
                    </Row>
                  </Col>
                  <Col span={12}>
                    <Row className="row-margin">
                      <Col span={1}></Col>
                      <Col span={5}>
                        <Text strong>
                          <span className="require">* </span>Address
                        </Text>
                      </Col>
                      <Col span={18}>
                        <TextArea
                          name="vendor_address"
                          placeholder="Address"
                          style={{ width: "100%", height: "110px" }}
                          value={data_head.vendor_address}
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
                          name="vendor_tax_no"
                          placeholder="Tax ID"
                          style={{ width: "100%" }}
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
              <Tabs.TabPane
                tab={
                  <span>
                    <span className="require">* </span>
                    Purchase
                  </span>
                }
                key="2"
              >
                <Row className="col-2 row-margin-vertical">
                  <Col span={12}>
                    <Row className="row-margin">
                      <Col span={5}>
                        <Text strong>
                          <span className="require">* </span>Payment Terms
                        </Text>
                      </Col>
                      <Col span={18}>
                        <CustomSelect
                          placeholder={"Payment Term"}
                          allowClear
                          showSearch
                          name="payment_term_id"
                          field_id="payment_term_id"
                          field_name="payment_term_no_name"
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
                  name="vendor_remark"
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
