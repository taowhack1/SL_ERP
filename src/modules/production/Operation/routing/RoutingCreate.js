/** @format */
import {
  Col,
  Input,
  InputNumber,
  message,
  Row,
  Space,
  Tabs,
  Typography,
} from "antd";
import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CustomSelect from "../../../../components/CustomSelect";
import MainLayout from "../../../../components/MainLayout";
import { reducer } from "../../../qualityAssurance/reducers";
import Authorize from "../../../system/Authorize";
import {
  routingDetailFileds,
  routingDetailRequireFileds,
  routingHeadFileds,
  routingHeadRequireFileds,
} from "./routingConfig";
import RoutingTabDetail from "./RoutingTabDetail";
import moment from "moment";
import RoutingTabpane from "./RoutingTabDetail";
import {
  convertTimeToNumber,
  validateFormDetail,
  validateFormHead,
} from "../../../../include/js/function_main";
import { getAllItems } from "../../../../actions/inventory/itemActions";
import { getAllMachine } from "../../../../actions/production/machineActions";
import {
  createRouting,
  getFgItem,
  updateRouting,
} from "../../../../actions/production/routingAction";
import { LineChartOutlined } from "@ant-design/icons";
import CustomLabel from "../../../../components/CustomLabel";
const { Title, Text } = Typography;
const numberFormat = {
  precision: 0,
  formatter: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
  parser: (value) => value.replace(/\$\s?|(,*)/g, ""),
};
const numberFormat3 = {
  precision: 3,
  //formatter: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
  parser: (value) => value.replace(/\$\s?|(,*)/g, ""),
};
const RoutingCreate = (props) => {
  const readOnly = false;
  const dispatch = useDispatch();
  const history = useHistory();
  const authorize = Authorize();
  const data =
    props.location && props.location.state ? props.location.state : 0;
  const initialStateDetail = [routingDetailFileds];
  const initialStateHead = [routingHeadFileds];
  const [sumPeriod, setsumPeriod] = useState(0);
  const [dataHead, headDispatch] = useReducer(reducer, initialStateHead);
  const [dataDetail, detailDispatch] = useReducer(reducer, initialStateDetail);
  const current_project = useSelector((state) => state.auth.currentProject);
  const itemList = useSelector((state) => state.production.fg.fgList);
  const auth = useSelector((state) => state.auth.authData);
  useEffect(() => {
    dispatch(getAllItems(auth.user_name));
    dispatch(getAllMachine());
    dispatch(getFgItem());
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
            ...routingHeadFileds,
            commit: 1,
            user_name: auth.user_name,
            routing_created_by_no_name: auth.employee_no_name_eng,
            branch_id: auth.branch_id,
            branch_name: auth.branch_name,
            routing_created: moment().format("DD/MM/YYYY"),
          },
    });
    detailDispatch({
      type: "SET_DETAIL",
      payload:
        data && data.dataDetail.length ? data.dataDetail : initialStateDetail,
    });
  }, []);

  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: ["Home", "Routing", "Create"],
    search: false,
    buttonAction: ["Save", "Discard"],
    create: "",
    save: "function",
    discard: "/production/routing",
    onSave: (e) => {
      const key = "validate";
      const validate = validateFormHead(dataHead, routingHeadRequireFileds);
      const validate_detail = validateFormDetail(
        dataDetail,
        routingDetailRequireFileds
      );
      console.log("dataDetail", dataDetail);
      console.log("dataHead", dataHead);
      if (validate_detail.validate && validate.validate) {
        const data2 = [{ ...dataHead, routing_detail: dataDetail }];
        dataHead.routing_id
          ? dispatch(
              updateRouting(dataHead.routing_id, data2, redirect_to_view)
            )
          : dispatch(createRouting(data2, redirect_to_view));
        console.log("pass", dataDetail);
        console.log("passdataHead", dataHead);
        console.log("data2", data2);
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

  const upDateFormValue = (data) => {
    headDispatch({ type: "CHANGE_HEAD_VALUE", payload: data });
  };
  const redirect_to_view = (id) => {
    history.push("/production/routing/view/" + (id ? id : "new"));
  };
  const sumPeriodFN = () => {
    if (dataDetail.length > 0) {
      const sum_data = dataDetail.map((data) =>
        convertTimeToNumber(data.routing_detail_lead_time)
      );
      const total_data = sum_data.reduce((sums, number) => sums + number);
      if (total_data != sumPeriod) {
        setsumPeriod(total_data);
        const min = total_data;
        const hour = total_data / 60;
        const day = total_data / 60 / 24;
        upDateFormValue({
          routing_working_time_min: min,
          routing_working_time_hour: hour,
          routing_working_time_day: parseFloat(day.toFixed(3)),
        });
      }
    }
  };

  return (
    <MainLayout {...config}>
      <div id="form">
        <Row className="col-2">
          <Col span={8}>
            <h2>
              <strong>Create Routing</strong>
            </h2>
          </Col>
          <Col span={12}></Col>
          <Col span={2}>
            <Text strong>Create Date :</Text>
          </Col>
          <Col span={2} style={{ textAlign: "right" }}>
            <Text className="text-view">{dataHead.routing_created}</Text>
          </Col>
        </Row>
        <Row className="col-2 row-tab-margin">
          <Col span={24} style={{ marginBottom: 8 }}>
            <CustomLabel label="Description :" require readOnly={readOnly} />
            <Input
              name="routing_remark"
              placeholder="Description"
              className="full-width mt-1"
              onChange={(e) => {
                upDateFormValue({ routing_remark: e.target.value });
              }}
              value={dataHead.routing_remark}
            />
          </Col>
        </Row>
        <Row className="col-2 mt-2" gutter={[32, 0]}>
          {/* left */}
          <Col span={12} className="col-border-right">
            <Row className="col-2 row-margin-vertical">
              <Col span={8}>
                <CustomLabel label="FG Item :" require readOnly={readOnly} />
              </Col>
              <Col span={15}>
                <CustomSelect
                  allowClear
                  showSearch
                  value={dataHead.item_id}
                  data={itemList}
                  field_id="item_id"
                  field_name="item_no_name"
                  name="item_id"
                  placeholder={"FG Item"}
                  onChange={(data, option) => {
                    console.log(option);
                    data !== null && data !== undefined
                      ? upDateFormValue({
                          item_id: data,
                          item_no_name_ref:
                            option.data.item_bulk[0]?.item_no_name_ref,
                          item_id_ref: option.data.item_bulk[0]?.item_id_ref,
                        })
                      : upDateFormValue({
                          item_id: null,
                          item_no_name_ref: null,
                          item_id_ref: null,
                        });
                  }}
                ></CustomSelect>
              </Col>
            </Row>
            <Row className="col-2 row-margin-vertical">
              <Col span={8}>
                <CustomLabel label="Bulk Item :" require readOnly={readOnly} />
              </Col>
              <Col span={15}>
                <Text className="text-value">
                  {dataHead.item_no_name_ref ?? "-"}
                </Text>
              </Col>
            </Row>
            <Row className="col-2 row-margin-vertical">
              <Col span={8}>
                <CustomLabel
                  label="Working time (Min) :"
                  require
                  readOnly={readOnly}
                />
              </Col>
              <Col span={8}>
                <Input
                  disabled={dataHead.routing_working_time_min ? false : true}
                  value={dataHead.routing_working_time_min}
                  style={{ width: "100%" }}
                  name="routing_working_time_min"
                  placeholder={"Working time Min"}
                ></Input>
              </Col>
            </Row>
            <Row className="col-2 row-margin-vertical">
              <Col span={8}>
                <CustomLabel
                  label="Working time (Hour) :"
                  require
                  readOnly={readOnly}
                />
              </Col>
              <Col span={8}>
                <Input
                  disabled={dataHead.routing_working_time_hour ? false : true}
                  value={dataHead.routing_working_time_hour}
                  style={{ width: "100%" }}
                  name="routing_working_time_hour"
                  placeholder={"Working time Hour"}
                ></Input>
              </Col>
            </Row>
            <Row className="col-2 row-margin-vertical">
              <Col span={8}>
                <CustomLabel
                  label="Working time (Day) :"
                  require
                  readOnly={readOnly}
                />
              </Col>
              <Col span={8}>
                <Input
                  disabled={dataHead.routing_working_time_day ? false : true}
                  value={dataHead.routing_working_time_day}
                  style={{ width: "100%" }}
                  name="routing_working_time_day"
                  placeholder={"Working time Day"}
                ></Input>
              </Col>
            </Row>
          </Col>
          {/* right */}
          <Col span={12}>
            <Row className="col-2 row-margin-vertical">
              <Col span={8}>
                <CustomLabel
                  label="Batch size (kg) :"
                  require
                  readOnly={readOnly}
                />
              </Col>
              <Col span={8}>
                <InputNumber
                  {...numberFormat}
                  value={dataHead.routing_batch_size}
                  style={{ width: "100%" }}
                  name="routing_batch_size"
                  placeholder={"Batch size"}
                  onChange={(e) => upDateFormValue({ routing_batch_size: e })}
                ></InputNumber>
              </Col>
            </Row>
            <Row className="col-2 row-margin-vertical">
              <Col span={8}>
                <CustomLabel
                  label="Fill wt (kg/pcs) :"
                  require
                  readOnly={readOnly}
                />
              </Col>
              <Col span={8}>
                <InputNumber
                  {...numberFormat3}
                  value={dataHead.routing_fill_weight}
                  style={{ width: "100%" }}
                  name="routing_fill_weight"
                  placeholder={"Fill wt"}
                  onChange={(e) => upDateFormValue({ routing_fill_weight: e })}
                ></InputNumber>
              </Col>
            </Row>
            <Row className="col-2 row-margin-vertical">
              <Col span={8}>
                <CustomLabel label="Pack Size :" require readOnly={readOnly} />
              </Col>
              <Col span={8}>
                <InputNumber
                  {...numberFormat}
                  value={dataHead.routing_pack_size}
                  name="routing_pack_size"
                  placeholder={"Pack Size"}
                  style={{ width: "100%" }}
                  onChange={(e) => upDateFormValue({ routing_pack_size: e })}
                ></InputNumber>
              </Col>
            </Row>
            <Row className="col-2 row-margin-vertical">
              <Col span={8}>
                <CustomLabel
                  label="Capacity (pcs/min) :"
                  require
                  readOnly={readOnly}
                />
              </Col>
              <Col span={8}>
                <InputNumber
                  {...numberFormat}
                  value={dataHead.routing_capacity_min}
                  style={{ width: "100%" }}
                  name="routing_capacity_min"
                  placeholder={"Capacity"}
                  onChange={(e) => upDateFormValue({ routing_capacity_min: e })}
                ></InputNumber>
              </Col>
            </Row>
            <Row className="col-2 row-margin-vertical">
              <Col span={8}>
                <CustomLabel label="Man / hr :" require readOnly={readOnly} />
              </Col>
              <Col span={8}>
                <InputNumber
                  {...numberFormat}
                  value={dataHead.routing_worker_hour}
                  style={{ width: "100%" }}
                  name="routing_worker_hour"
                  placeholder={"Man / hr"}
                  onChange={(e) => upDateFormValue({ routing_worker_hour: e })}
                ></InputNumber>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="col-2 row-tab-margin-l">
          <Col span={24}>
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane
                tab={
                  <span>
                    <span className="require">* </span>
                    Bulk
                  </span>
                }
                key="1"
              >
                <RoutingTabDetail
                  dataDetail={dataDetail.filter((obj) => obj.type_id === 1)}
                  type_id={1}
                  readOnly={readOnly}
                  detailDispatch={detailDispatch}
                  sum={sumPeriodFN()}
                />
              </Tabs.TabPane>
              <Tabs.TabPane
                tab={
                  <span>
                    <span className="require">* </span>
                    FG
                  </span>
                }
                key="2"
              >
                <RoutingTabDetail
                  dataDetail={dataDetail.filter((obj) => obj.type_id === 2)}
                  type_id={2}
                  readOnly={readOnly}
                  detailDispatch={detailDispatch}
                  sum={sumPeriodFN()}
                />
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
};

export default RoutingCreate;
