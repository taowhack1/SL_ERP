import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Input, Tabs, Select, AutoComplete, Typography } from "antd";
import MainLayout from "../../components/MainLayout";
import moment from "moment";

import Comments from "../../components/Comments";
import { dataComments } from "../../data";
import ItemLine from "./Receive_ItemLine";
import TotalFooter from "../../components/TotalFooter";
import { items } from "../../data/items";
import { units } from "../../data/units";
import { receiveLineColumns } from "../../data/inventory/data";
import { vendorData, poData } from "../../data/purchase/data";
import { locations } from "../../data/locationData";
import { reducer } from "./reducers";
import { receive_fields, receive_detail_fields } from "./config";
import { get_po_receive_list } from "../../actions/inventory/receiveActions";
import CustomSelect from "../../components/CustomSelect";
const { Option } = Select;
const { TextArea } = Input;
const { Text } = Typography;

const initialStateHead = receive_fields;
const initialStateDetail = [receive_detail_fields];
const Receive_Create = (props) => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState("1");
  const [data_head, headDispatch] = useReducer(reducer, initialStateHead);
  const [data_detail, detailDispatch] = useReducer(reducer, initialStateDetail);
  const auth = useSelector((state) => state.auth.authData[0]);
  const dataComment = useSelector((state) => state.log.comment_log);
  const current_project = useSelector((state) => state.auth.currentProject);
  const masterData = useSelector((state) => state.inventory.master_data);
  const vendors = useSelector((state) => state.purchase.vendors);
  const po_list = useSelector((state) => state.inventory.receive.po_ref);
  const flow =
    data_head &&
    data_head.data_flow_process &&
    data_head.data_flow_process.map((step) => {
      return step.all_group_in_node;
    });
  const callback = (key) => {
    setTab(key);
  };

  const data =
    props.location && props.location.state ? props.location.state : 0;
  console.log("data", data);
  useEffect(() => {
    headDispatch({
      type: "SET_HEAD",
      payload: data.data_head
        ? {
            ...data.data_head,
            commit: 1,
            user_name: auth.user_name,
            branch_id: auth.branch_id,
            branch_name: auth.branch_name,
          }
        : {
            ...receive_fields,
            commit: 1,
            user_name: auth.user_name,
            branch_id: auth.branch_id,
            branch_name: auth.branch_name,
            qn_created: moment().format("DD/MM/YYYY"),
          },
    });
    detailDispatch({
      type: "SET_DETAIL",
      payload: data.data_detail ? data.data_detail : [receive_detail_fields],
    });
  }, []);

  useEffect(() => {
    dispatch(get_po_receive_list());
  }, []);
  // useEffect(() => {
  //   data_head.po_id &&
  //     !data_head.receive_id &&
  //     axios
  //       .get(`${api_qn_detail}/ref/${data_head.po_id}`, header_config)
  //       .then((res) => {
  //         detailDispatch({ type: "SET_DETAIL", payload: res.data[0] });
  //       });
  // }, [data_head.po_id]);

  const config = {
    projectId: current_project.project_id,
    title: current_project.project_name,
    home: current_project.project_url,
    show: true,
    breadcrumb: [
      "Home",
      "Inventory",
      "Receive",
      data_head.receive_no ? "Edit" : "Create",
      data_head.receive_no && data_head.receive_no,
    ],
    search: false,
    buttonAction: ["Save", "SaveConfirm", "Validate", "Discard"],
    action: [{ name: "Print", link: "www.google.co.th" }],
    step: !data_head.so_no
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
        "/inventory/receive/view/" +
          (data_head.receive_id ? data_head.receive_id : "new"),
    },
    discard: "/inventory/receive",
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

  const getDataRef = (refId, mainData, refData) => {
    let copyMain = { ...mainData };
    let copyRef = { ...refData[refId] };
    copyMain.po_code = copyRef.po_code;
    copyMain.v_name = copyRef.v_name;
    copyMain.v_company = copyRef.v_company;
    copyMain.r_total = copyRef.po_total;
    copyMain.r_vat = copyRef.po_vat;
    copyMain.r_schedule_date = copyRef.po_dueDate;
    copyMain.r_include_vat = copyRef.po_include_vat;
    copyMain.dataLine = copyRef.dataLine;
    return copyMain;
  };
  const resetForm = () => {
    headDispatch({
      type: "RESET_DATA",
      payload: {
        ...initialStateHead,
        commit: 1,
        user_name: auth.user_name,
        branch_id: auth.branch_id,
        branch_name: auth.branch_name,
        receive_created: moment().format("DD/MM/YYYY"),
      },
    });
    detailDispatch({
      type: "RESET_DATA",
      payload: initialStateDetail,
    });
  };
  const upDateFormValue = (data) => {
    dispatch({ type: "CHANGE_HEAD_VALUE", payload: data });
  };
  console.log("data_head", data_head);
  console.log("data_detail", data_detail);
  return (
    <MainLayout {...config} data={data_head}>
      <div id="form">
        {/* Head */}
        <Row className="col-2">
          <Col span={11}>
            <h2>
              <strong>
                {data_head.receive_no ? "Edit" : "Create"} Receive{" "}
                {data_head.receive_no ? "#" + data_head.receive_no : null}
              </strong>
            </h2>
          </Col>
          <Col span={9}></Col>
          <Col span={2}>
            <Text strong>Create Date :</Text>
          </Col>
          <Col span={2} style={{ textAlign: "right" }}>
            {moment(data_head.receive_created, "DD/MM/YYYY").format(
              "DD/MM/YYYY"
            )}
          </Col>
        </Row>

        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>PO Ref. :</Text>
          </Col>
          <Col span={8}>
            {/* PO Ref */}
            <CustomSelect
              allowClear
              showSearch
              placeholder={"PO No. ex.PO2009000x"}
              field_id="po_id"
              field_name="po_no_description"
              value={data_head.po_no_description}
              data={po_list}
              onChange={(data, option) => {
                if (data) {
                  headDispatch({
                    type: "CHANGE_HEAD_VALUE",
                    payload: getDataRef(data, data_head, po_list),
                  });
                } else {
                  resetForm();
                }
              }}
            />
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong>Vendor :</Text>
          </Col>

          <Col span={8}></Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>Description :</Text>
          </Col>

          <Col span={8}>
            <Input
              onChange={(e) =>
                headDispatch({
                  type: "CHANGE_HEAD_VALUE",
                  payload: { receive_description: e.target.value },
                })
              }
              value={data_head.receive_description}
              placeholder="Description"
            ></Input>
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong>Destination Location</Text>
          </Col>
          <Col span={8}>
            <AutoComplete
              options={locations}
              placeholder="Location..."
              defaultValue={data_head.r_location}
              value={data_head.r_location}
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                -1
              }
              onSelect={(data) => upDateFormValue({ r_location: data })}
              onChange={(data) => upDateFormValue({ r_location: data })}
              style={{ width: "100%" }}
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
                headDispatch({
                  type: "CHANGE_HEAD_VALUE",
                  payload: { receive_agreement: e.target.value },
                })
              }
              value={data_head.receive_agreement}
              placeholder="Agreement"
            ></Input>
          </Col>
        </Row>

        <Row className="col-2 space-top-md">
          <Col span={24}>
            <Tabs defaultActiveKey={"1"} onChange={callback}>
              <Tabs.TabPane tab="Request Detail" key={"1"}>
                <ItemLine
                  items={items}
                  units={units}
                  // itemLots={itemLots}
                  columns={receiveLineColumns}
                  updateData={upDateFormValue}
                  dataLine={data_head.dataLine ? data_head.dataLine : [{}]}
                  readOnly={false}
                  data_head={data_head}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Notes" key={"2"}>
                <TextArea
                  rows={2}
                  placeholder={"Remark..."}
                  defaultValue={data_head.r_remark}
                  value={data_head.r_remark}
                  onChange={(e) =>
                    upDateFormValue({ r_remark: e.target.value })
                  }
                  style={{ width: "100%" }}
                />
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
        {tab === "1" ? (
          <TotalFooter
            excludeVat={data_head.r_total}
            vat={data_head.r_vat}
            includeVat={data_head.r_include_vat}
            currency={"THB"}
          />
        ) : null}
      </div>
      <Comments data={[...dataComments]} />
    </MainLayout>
  );
};

export default Receive_Create;
