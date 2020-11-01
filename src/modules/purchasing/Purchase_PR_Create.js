import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Input, Tabs, AutoComplete, Typography, Select } from "antd";
import MainLayout from "../../components/MainLayout";
import moment from "moment";
import ItemLine from "./pr_ItemLine";
import { sumArrObj } from "../../include/js/function_main";
import Comments from "../../components/Comments";
import { pr_fields, prItemColumns } from "./fields_config/pr";
import {
  reset_pr_data,
  create_pr,
  update_pr,
  update_pr_head,
  pr_actions,
} from "../../actions/purchase/PR_Actions";
import CustomSelect from "../../components/CustomSelect";
import TotalFooter from "../../components/TotalFooter";

const { TextArea } = Input;
const { Text } = Typography;
const PurchaseRequisitionCreate = (props) => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState("1");

  const auth = useSelector((state) => state.auth.authData[0]);
  const dataComments = useSelector((state) => state.log.comment_log);
  const cost_centers = useSelector((state) => state.hrm.cost_center);
  const vendors = useSelector((state) => state.purchase.vendor.vendor_list);
  const data_detail = useSelector((state) => state.purchase.pr_detail);
  const data_head = useSelector((state) => state.purchase.pr_head);
  const flow =
    data_head &&
    data_head.data_flow_process &&
    data_head.data_flow_process.map((step) => {
      return step.all_group_in_node;
    });
  useEffect(() => {
    data_head && data_head.pr_id
      ? dispatch(
          update_pr_head({
            commit: 1,
            user_name: auth.user_name,
          })
        )
      : dispatch(
          update_pr_head({
            pr_created: moment().format("DD/MM/YYYY"),
            pr_created_by_no_name: auth.employee_no_name_eng,
            user_name: auth.user_name,
            cost_center_id: auth.cost_center_id,
            cost_center_no_name: auth.cost_center_no_name,
          })
        );
  }, [dispatch]);

  const callback = (key) => {
    setTab(key);
  };

  const upDateFormValue = (data) => {
    dispatch(update_pr_head(data));
  };
  const current_project = useSelector((state) => state.auth.currentProject);
  console.log("data_head.pr_no", data_head.pr_no);
  const config = {
    projectId: current_project.project_id,
    title: current_project.project_name,
    home: current_project.project_url,
    show: true,
    breadcrumb: [
      "Home",
      "Purchase Requisition",
      data_head.pr_no ? "Edit" : "Create",
      data_head.pr_no && data_head.pr_no,
    ],
    search: false,
    buttonAction: ["Save", data_head.pr_id && "SaveConfirm", "Discard"],
    // action: [{ name: "Print", link: "www.google.co.th" }],
    step: !data_head.pr_no
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
        "/purchase/pr/view/" + (data_head.pr_id ? data_head.pr_id : "new"),
    },
    discard: "/purchase/pr",
    onDiscard: (e) => {
      dispatch(reset_pr_data());
    },
    onSave: (e) => {
      e.preventDefault();
      console.log("Save");
      data_head.pr_id
        ? dispatch(
            update_pr(data_head.pr_id, auth.user_name, data_head, data_detail)
          )
        : dispatch(create_pr(auth.user_name, data_head, data_detail));
      // data_head.pr_id
      //   ? dispatch(update_pr(data_head.pr_id, data_head, data_detail))
      //   : dispatch(create_pr(data_head, data_detail));
    },
    onConfirm: () => {
      console.log("Confirm");
      const app_detail = {
        process_status_id: 2,
        user_name: auth.user_name,
        process_id: data_head.process_id,
      };
      dispatch(update_pr(data_head.pr_id, data_head, data_detail));
      dispatch(pr_actions(app_detail, data_head.pr_id));
    },
  };

  return (
    <MainLayout {...config} data={data_head}>
      <div id="form">
        {/* Head */}
        <Row className="col-2">
          <Col span={8}>
            <h2>
              <strong>
                <Text strong>
                  {data_head.pr_no ? "Edit" : "Create"} Purchase Requisition
                </Text>
              </strong>
            </h2>
          </Col>
          <Col span={12}></Col>
          <Col span={2}>
            <Text strong>PR Date : </Text>
          </Col>
          <Col span={2} className="text-center">
            <Text>{data_head.pr_created}</Text>
          </Col>
        </Row>
        <Row className="col-2" style={{ marginBottom: 20 }}>
          {data_head.pr_no && (
            <h3>
              <b>PR No. : </b>
              {data_head.pr_no}
            </h3>
          )}
        </Row>
        <Row className="col-2 row-margin-vertical-lg">
          <Col span={3}>
            <Text strong>Request by :</Text>
          </Col>

          <Col span={8}>{data_head.pr_created_by_no_name}</Col>
          <Col span={2}></Col>
        </Row>

        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>Cost center :</Text>
          </Col>
          <Col span={8}>
            <CustomSelect
              allowClear
              showSearch
              placeholder={"Cost Center"}
              field_id="cost_center_id"
              field_name="cost_center_no_name"
              value={data_head.cost_center_no_name}
              data={cost_centers}
              onChange={(data, option) => {
                data && data
                  ? upDateFormValue({
                      cost_center_id: data,
                      cost_center_no_name: option.title,
                    })
                  : upDateFormValue({
                      cost_center_id: null,
                      cost_center_no_name: null,
                    });
              }}
            />
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong>Vendor :</Text>
          </Col>
          <Col span={8}>
            <CustomSelect
              allowClear
              showSearch
              placeholder={"Vendor"}
              field_id="vendor_id"
              field_name="vendor_no_name"
              value={data_head.vendor_no_name}
              data={vendors}
              onChange={(data, option) => {
                data && data
                  ? upDateFormValue({
                      vendor_id: data,
                      vendor_no_name: option.title,
                    })
                  : upDateFormValue({
                      vendor_id: null,
                      vendor_no_name: null,
                    });
              }}
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
                upDateFormValue({ pr_description: e.target.value })
              }
              value={data_head.pr_description}
              placeholder="Description"
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
            <Tabs defaultActiveKey="1" onChange={callback}>
              <Tabs.TabPane tab="Request Detail" key="1">
                <ItemLine
                  columns={prItemColumns}
                  readOnly={false}
                  pr_id={data_head.pr_id}
                  upDateFormData={upDateFormValue}
                  vat_rate={data_head.vat_rate}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Notes" key="2">
                <TextArea
                  onChange={(e) =>
                    upDateFormValue({ pr_remark: e.target.value })
                  }
                  value={data_head.pr_remark}
                  placeholder="Remark"
                />
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
        {tab === "1" && (
          <TotalFooter
            excludeVat={data_head.tg_pr_sum_amount}
            vat={data_head.tg_pr_vat_amount}
            includeVat={data_head.tg_pr_total_amount}
            currency={data_head.currency_no}
          />
        )}
      </div>

      <Comments data={[...dataComments]} />
    </MainLayout>
  );
};

export default PurchaseRequisitionCreate;
