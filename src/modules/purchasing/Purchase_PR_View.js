import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Tabs, Typography } from "antd";
import MainLayout from "../../components/MainLayout";
import moment from "moment";
import ItemLine from "./pr_ItemLine";
import { autoCompleteItem, autoCompleteUnit } from "../../data/inventoryData";

import Comments from "../../components/Comments";
import { dataComments, itemLots } from "../../data";
import { prItemColumns } from "../../data/purchase/pr_ItemLineData";
import { pr_fields, pr_detail_fields } from "./fields_config/pr";
import { get_pr_detail } from "../../actions/Purchase/PR_Actions";
const { Text } = Typography;

const PRView = (props) => {
  const dispatch = useDispatch();

  const data =
    props.location && props.location.state ? props.location.state : 0;

  const [formData, setData] = useState(data && data ? data : pr_fields);

  useEffect(() => {
    dispatch(get_pr_detail(formData.pr_id));
  }, [dispatch]);
  const pr_detail = useSelector((state) => state.purchase.pr_detail);

  const [formDetail, setDetail] = useState(
    pr_detail && pr_detail ? pr_detail : pr_detail_fields
  );
  console.log("formDetail", formDetail);
  console.log(formData);
  const callback = (key) => {};

  const upDateFormValue = (data) => {
    setData({ ...formData, ...data });
  };

  const updateItemLine = (data) => {
    setData({ ...formData, ...data });
  };
  const submitForm = (values) => {};
  const projectDetail = JSON.parse(localStorage.getItem("project_detail"));
  const config = {
    projectId: projectDetail.project_id,
    title: projectDetail.project_name,
    home: projectDetail.project_url,
    show: true,
    breadcrumb: [
      "Home",
      "Purchase Requisition",
      "View",
      formData.req_code && formData.req_code ? formData.req_code : "Test",
    ],
    search: false,
    buttonAction: ["Edit", "Confirm", "Approve", "Reject", "Discard"],
    action: [{ name: "print", link: "www.google.co.th" }],
    step: {
      current: 1,
      step: ["User", "Manager", "Purchase", "Manager Purchase", "Board"],
    },
    create: "",
    save: {
      data: formData,
      path: formData && "/purchase/pr/view/" + formData.id,
    },
    edit: {
      data: formData,
      path: formData && "/purchase/pr/edit/" + formData.id,
    },
    discard: "/purchase/pr",
    onSave: (e) => {
      e.preventDefault();
      console.log("Save");
    },
    onEdit: (e) => {
      e.preventDefault();
      console.log("Edit");
    },
    onApprove: (e) => {
      e.preventDefault();
      console.log("Approve");
    },
    onConfirm: () => {
      console.log("Confirm");
    },
  };

  const dateConfig = {
    format: "DD/MM/YYYY HH:mm:ss",
    value: moment(),
    disabled: 1,
  };

  const formConfig = {
    name: "req_form",
    size: "small",
    onFinish: (values) => {
      submitForm(values);
    },
  };
  return (
    <MainLayout {...config} data={formData}>
      <div id="form">
        <Row className="col-2">
          <Col span={20}>
            <h2>
              <strong>Purchase Requisition</strong>
            </h2>
          </Col>
          <Col span={4}>
            <Text strong>PR Date : </Text>
            {formData.pr_date}
          </Col>
        </Row>
        <Row className="col-2" style={{ marginBottom: 20 }}>
          {formData.pr_code && (
            <h3>
              <b>Ref. Code : </b>
              {formData.pr_code}
            </h3>
          )}
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>Cost Center :</Text>
          </Col>

          <Col span={8}>
            <Text>{formData.pr_costCenter}</Text>
          </Col>
          <Col span={1}></Col>
          <Col span={4}>{/* <Text strong>Due Date :</Text> */}</Col>
          <Col span={8}>{/* <Text>{formData.pr_dueDate}</Text> */}</Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>Vendor :</Text>
          </Col>
          <Col span={8}>
            <Text>{formData.v_name}</Text>
          </Col>
        </Row>
        <Row className="col-2 space-top-md">
          <Col span={24}>
            <Tabs defaultActiveKey="1" onChange={callback}>
              <Tabs.TabPane tab="Request Detail" key="1">
                <ItemLine
                  items={autoCompleteItem}
                  units={autoCompleteUnit}
                  itemLots={itemLots}
                  columns={prItemColumns}
                  updateData={updateItemLine}
                  dataLine={formData.dataLine ? formData.dataLine : []}
                  readOnly={true}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Reason & Description" key="2">
                <Text>{formData.pr_desc}</Text>
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
      <Comments data={[...dataComments]} />
    </MainLayout>
  );
};

export default PRView;
