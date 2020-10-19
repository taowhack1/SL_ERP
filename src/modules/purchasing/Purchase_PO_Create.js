import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Input, Tabs, Select, Typography, DatePicker } from "antd";
import { useParams } from "react-router-dom";
import MainLayout from "../../components/MainLayout";
import moment from "moment";

import Comments from "../../components/Comments";
import ItemLine from "./po_ItemLine";

import { po_fields, poItemColumns } from "./fields_config/po";
import TotalFooter from "../../components/TotalFooter";
import CustomSelect from "../../components/CustomSelect";

import {
  update_po,
  create_po,
  get_po_by_id,
  update_po_head,
  reset_po_data,
  get_open_po_list,
} from "../../actions/purchase/PO_Actions";
import { get_pr_list } from "../../actions/purchase/PR_Actions";

const { TextArea } = Input;
const { Text } = Typography;

const PurchaseOrderCreate = (props) => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState("1");
  // const po_id = useParams().id;
  const dataComments = useSelector((state) => state.log.comment_log);
  const auth = useSelector((state) => state.auth.authData[0]);
  const current_project = useSelector((state) => state.auth.currentProject);
  const vendors = useSelector((state) => state.purchase.vendors);
  const select_box_pr = useSelector((state) => state.purchase.po.pr_ref);
  const select_box_payment_term = useSelector(
    (state) => state.purchase.payment_terms
  );
  const data_head = useSelector((state) => state.purchase.po.po_head);
  const data_detail = useSelector((state) => state.purchase.po.po_detail);
  const callback = (key) => {
    setTab(key);
  };
  const flow =
    data_head &&
    data_head.data_flow_process &&
    data_head.data_flow_process.map((step) => {
      return step.all_group_in_node;
    });
  useEffect(() => {
    dispatch(get_open_po_list());
    data_head && data_head.po_id
      ? dispatch(
          update_po_head({
            commit: 1,
            user_name: auth.user_name,
          })
        )
      : !data_head.pr_id &&
        dispatch(
          update_po_head({
            ...po_fields,
            po_created: moment().format("DD/MM/YYYY"),
            user_name: auth.user_name,
            commit: 1,
          })
        );
  }, [dispatch]);

  const upDateFormValue = (data) => {
    dispatch(update_po_head(data));
  };

  const config = {
    projectId: current_project.project_id,
    title: current_project.project_name,
    home: current_project.project_url,
    show: true,
    breadcrumb: [
      "Home",
      "Purchase Order",
      data_head.po_no ? "Edit" : "Create",
      data_head.po_no && data_head.po_no,
    ],
    search: false,
    buttonAction: ["Save", "SaveConfirm", "Discard"],
    // action: [{ name: "Print", link: "www.google.co.th" }],
    step: !data_head.po_no
      ? {}
      : {
          current: data_head && data_head.node_stay - 1,
          step: flow,
        },
    create: "",
    save: {
      data: data_head,
      path:
        data_head &&
        "/purchase/po/view/" + (data_head.po_id ? data_head.po_id : "new"),
    },
    discard: "/purchase/po",
    onDiscard: (e) => {
      console.log("Discard");
    },
    onSave: (e) => {
      e.preventDefault();

      console.log("Save");
      data_head.po_id
        ? dispatch(
            update_po(data_head.po_id, auth.user_name, data_head, data_detail)
          )
        : dispatch(create_po(auth.user_name, data_head, data_detail));
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
  const getDataRef = (refId, mainData, refData) => {
    let copyMain = { ...mainData };
    let copyRef = { ...refData[refId] };
    copyMain.pr_id = copyRef.pr_id;
    copyMain.pr_no = copyRef.pr_no;
    copyMain.vendor_no_name = copyRef.vendor_no_name;
    copyMain.pr_no_description = copyRef.pr_no_description;
    copyMain.po_description = copyRef.pr_description;
    copyMain.po_due_date = copyRef.tg_pr_due_date;
    copyMain.tg_po_amount = copyRef.tg_pr_amount;
    copyMain.tg_po_discount = copyRef.tg_pr_discount;
    copyMain.tg_po_sum_amount = copyRef.tg_pr_sum_amount;
    copyMain.tg_po_vat_amount = copyRef.tg_pr_vat_amount;
    copyMain.tg_po_total_amount = copyRef.tg_pr_total_amount;
    copyMain.currency_id = copyRef.currency_id;
    copyMain.currency_no = copyRef.currency_no;
    copyMain.cost_center_id = copyRef.cost_center_id;
    copyMain.vendor_id = copyRef.vendor_id;
    upDateFormValue({ ...data_head, ...copyMain });
  };

  const resetDataRef = () => {
    dispatch(reset_po_data());
  };
  return (
    <MainLayout {...config} data={data_head}>
      <div id="form">
        {/* Head */}
        <Row className="col-2">
          <Col span={8}>
            <h2>
              <strong>
                {data_head.po_no ? "Edit" : "Create"} Purchase Order{" "}
                {data_head.po_no && "#" + data_head.po_no}
              </strong>
            </h2>
          </Col>
          <Col span={1}></Col>
          <Col span={10} className="text-center">
            <Text> {data_head.branch_name}</Text>
          </Col>
          <Col span={1}></Col>
          <Col span={2}>
            <Text strong>Create Date : </Text>
          </Col>
          <Col span={2} className="text-center">
            <Text>{data_head.po_created}</Text>
          </Col>
        </Row>

        {/* Address & Information */}
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>PR Ref. :</Text>
          </Col>
          <Col span={8}>
            <CustomSelect
              placeholder={"Select PR. ex.PR2009-00xx"}
              allowClear
              showSearch
              field_id="pr_id"
              field_name="pr_no_description"
              value={data_head.pr_no_description}
              data={select_box_pr}
              onChange={(data, option) => {
                console.log("onchange");
                option && option.title
                  ? getDataRef(option.key, data_head, select_box_pr)
                  : resetDataRef();
              }}
            />
          </Col>
          <Col span={2}></Col>

          <Col span={3}>
            <Text strong>Vendor :</Text>
          </Col>

          <Col span={8}>
            <CustomSelect
              placeholder={"Vendor"}
              allowClear
              showSearch
              field_id="vendor_id"
              field_name="vendor_no_name"
              value={data_head.vendor_no_name}
              data={vendors}
              onSelect={(data, option) =>
                upDateFormValue({
                  vendor_id: data,
                  vendor_no_name: option.title,
                })
              }
              onChange={(data, option) =>
                data
                  ? upDateFormValue({
                      vendor_id: data,
                      vendor_no_name: option.title,
                    })
                  : upDateFormValue({
                      vendor_id: null,
                      vendor_no_name: null,
                    })
              }
            />
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>Description :</Text>
          </Col>

          <Col span={8}>
            <Input
              onChange={(e) =>
                upDateFormValue({ po_description: e.target.value })
              }
              value={data_head.po_description}
              placeholder="Description"
            ></Input>
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong>Payment Terms :</Text>
          </Col>
          <Col span={8}>
            <CustomSelect
              placeholder={"Payment Term"}
              allowClear
              showSearch
              field_id="payment_term_id"
              field_name="payment_term_no_name"
              value={data_head.payment_term_no_name}
              data={select_box_payment_term}
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
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>Agreement :</Text>
          </Col>

          <Col span={8}>
            <Input
              onChange={(e) =>
                upDateFormValue({ po_agreement: e.target.value })
              }
              value={data_head.po_agreement}
              placeholder="Agreement"
            ></Input>
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong>Currency :</Text>
          </Col>
          <Col span={8}>
            {data_head.currency_no ? data_head.currency_no : "THB"}
          </Col>
        </Row>
        <Row className="col-2 space-top-md">
          <Col span={24}>
            <Tabs defaultActiveKey={"1"} onChange={callback}>
              <Tabs.TabPane tab="Request Detail" key={"1"}>
                <ItemLine
                  columns={poItemColumns}
                  readOnly={false}
                  pr_id={data_head.pr_id && data_head.pr_id}
                  po_id={data_head.po_id && data_head.po_id}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Notes" key={"2"}>
                <TextArea
                  rows={2}
                  placeholder={"Remark..."}
                  defaultValue={data_head.po_remark}
                  value={data_head.po_remark}
                  onChange={(e) =>
                    upDateFormValue({ po_remark: e.target.value })
                  }
                  style={{ width: "100%" }}
                />
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
        {tab === "1" ? (
          <TotalFooter
            excludeVat={data_head.tg_po_sum_amount}
            vat={data_head.tg_po_vat_amount}
            includeVat={data_head.tg_po_total_amount}
            currency={data_head.currency_no}
          />
        ) : null}
      </div>
      <Comments data={dataComments} />
    </MainLayout>
  );
};

export default PurchaseOrderCreate;
