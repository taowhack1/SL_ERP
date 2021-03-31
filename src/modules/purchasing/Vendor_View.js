/** @format */

import React from "react";
import { useSelector } from "react-redux";
import { Row, Col, Tabs, Typography } from "antd";
import MainLayout from "../../components/MainLayout";

import Authorize from "../system/Authorize";
import Vendor_OrtherAddress from "./Vendor_OrtherAddress";
import { convertDigit } from "../../include/js/main_config";
const { Title, Text } = Typography;

const VendorView = (props) => {
  const authorize = Authorize();
  authorize.check_authorize();
  const { data_head, dataDetail } = useSelector(
    (state) => state.purchase.vendor.vendor
  );
  const callback = (key) => {};

  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: [
      "Home",
      "Vendor",
      "View",
      data_head.vendor_no &&
        "[ " + data_head.vendor_no + " ] " + data_head.vendor_name,
    ],
    search: false,
    buttonAction: ["Edit", "Discard"],
    create: "",
    edit: {
      data: {
        data_head: data_head,
        dataDetail: dataDetail,
      },
      path: data_head && "/purchase/vendor/edit/" + data_head.vendor_id,
    },
    discard: "/purchase/vendor",
    onSave: (e) => {
      //e.preventDefault();
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

  return (
    <MainLayout {...config}>
      <div id='form'>
        {/* Head */}
        <Row className='col-2'>
          <Col span={8}>
            <h2>
              <strong>
                Vendor {data_head.vendor_no && "#" + data_head.vendor_no}
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
        <Row className='col-2'>
          <Col span={24} style={{ marginBottom: 8 }}>
            <Title level={5}>Name </Title>
            <Text className='text-view'>{data_head.vendor_name}</Text>
          </Col>
        </Row>

        {/* Product & Notes */}
        <Row className='col-2 row-tab-margin'>
          <Col span={24}>
            <Tabs defaultActiveKey='1' onChange={callback}>
              <Tabs.TabPane tab='Contact' key='1'>
                {/* Address & Information */}

                <Row className='col-2 row-margin-vertical'>
                  <Col span={12}>
                    <Row className='row-margin'>
                      <Col span={5}>
                        <Text strong>Short Name</Text>
                      </Col>
                      <Col span={18}>
                        <Text>{data_head.vendor_name_short}</Text>
                      </Col>
                      <Col span={1}></Col>
                    </Row>
                    <Row className='row-margin'>
                      <Col span={5}>
                        <Text strong>Phone</Text>
                      </Col>
                      <Col span={18}>
                        <Text strong>{data_head.vendor_phone}</Text>
                      </Col>
                      <Col span={1}></Col>
                    </Row>
                    <Row className='row-margin'>
                      <Col span={5}>
                        <Text strong>Mobile</Text>
                      </Col>
                      <Col span={18}>
                        <Text strong>{data_head.vendor_mobile}</Text>
                      </Col>
                      <Col span={1}></Col>
                    </Row>
                    <Row className='row-margin'>
                      <Col span={5}>
                        <Text strong>Email</Text>
                      </Col>
                      <Col span={18}>
                        <Text strong>{data_head.vendor_email}</Text>
                      </Col>
                      <Col span={1}></Col>
                    </Row>
                    <Row className='row-margin'>
                      <Col span={5}>
                        <Text strong>Category</Text>
                      </Col>
                      <Col span={18}>
                        <Text strong>{data_head.vendor_category_name}</Text>
                      </Col>
                      <Col span={1}></Col>
                    </Row>
                    <Row className='row-margin'>
                      <Col span={5}>
                        <Text strong>group</Text>
                      </Col>
                      <Col span={18}>{data_head.vendor_group_name}</Col>
                      <Col span={1}></Col>
                    </Row>
                  </Col>
                  <Col span={12}>
                    <Row className='row-margin'>
                      <Col span={1}></Col>
                      <Col span={5}>
                        <Text strong>Address</Text>
                      </Col>
                      <Col span={18}>{data_head.vendor_address}</Col>
                    </Row>
                    <Row className='row-margin'>
                      <Col span={1}></Col>
                      <Col span={5}>
                        <Text strong></Text>
                      </Col>
                      <Col span={6}>{data_head.province_name}</Col>
                      <Col span={6}>{data_head.district_name}</Col>
                      <Col span={6}>{data_head.tambon_name}</Col>
                    </Row>
                    <Row className='row-margin'>
                      <Col span={1}></Col>
                      <Col span={5}>
                        <Text strong></Text>
                      </Col>
                      <Col span={6}>{data_head.zip_name}</Col>
                      <Col span={6}>{data_head.language_name}</Col>
                      <Col span={6}>{data_head.country_name}</Col>
                    </Row>
                    <Row className='row-margin'>
                      <Col span={1}></Col>
                      <Col span={5}>
                        <Text strong>Currency</Text>
                      </Col>
                      <Col span={18}>{data_head.currency_name}</Col>
                    </Row>
                    <Row className='row-margin'>
                      <Col span={1}></Col>
                      <Col span={5}>
                        <Text strong>Vat ID</Text>
                      </Col>
                      <Col span={18}>{data_head.vat_name}</Col>
                    </Row>
                    <Row className='row-margin'>
                      <Col span={1}></Col>
                      <Col span={5}>
                        <Text strong>Tax ID</Text>
                      </Col>
                      <Col span={18}>{data_head.vendor_tax_no}</Col>
                    </Row>
                  </Col>
                </Row>
              </Tabs.TabPane>
              <Tabs.TabPane tab={<span>Orther Address</span>} key='2'>
                <Vendor_OrtherAddress dataDetail={dataDetail} readOnly={true} />
              </Tabs.TabPane>
              <Tabs.TabPane tab='Purchase' key='3'>
                <Row className='col-2 row-margin-vertical'>
                  <Col span={12}>
                    <Row className='row-margin'>
                      <Col span={5}>
                        <Text strong>Condition Billing</Text>
                      </Col>
                      <Col span={18}>
                        <Text className='text-view'>
                          {data_head.vendor_condition_billing}
                        </Text>
                      </Col>
                      <Col span={1}></Col>
                    </Row>
                    <Row className='row-margin'>
                      <Col span={5}>
                        <Text strong>Payment Terms</Text>
                      </Col>
                      <Col span={18}>
                        <Text className='text-view'>
                          {data_head.payment_term_no_name}
                        </Text>
                      </Col>
                      <Col span={1}></Col>
                    </Row>
                    <Row className='row-margin'>
                      <Col span={5}>
                        <Text strong>Credit Limit</Text>
                      </Col>
                      <Col span={18}>
                        <Text className='text-view'>
                          {convertDigit(data_head.vendor_limit_credit)}
                        </Text>
                        <Text strong style={{ paddingLeft: 10 }}>
                          {data_head.currency_no}
                        </Text>
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
                <Text className='text-view'>{data_head.vendor_remark}</Text>
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
      {/* <Comments data={dataComments} /> */}
    </MainLayout>
  );
};

export default VendorView;
