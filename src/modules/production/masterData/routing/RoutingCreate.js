import {
  Button,
  Col,
  Input,
  InputNumber,
  message,
  Row,
  Typography,
} from "antd";
import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CustomSelect from "../../../../components/CustomSelect";
import MainLayout from "../../../../components/MainLayout";
import Authorize from "../../../system/Authorize";
import {
  routingDetailColumns,
  routingDetailFileds,
  routingDetailRequireFileds,
  routingHeadFileds,
  routingHeadRequireFileds,
} from "./config";
import moment from "moment";
import {
  convertTimeToNumber,
  validateFormDetail,
  validateFormHead,
} from "../../../../include/js/function_main";
import { getAllMachine } from "../../../../actions/production/machineActions";
import {
  createRouting,
  getFgItem,
  updateRouting,
} from "../../../../actions/production/routingAction";
import { CalculatorOutlined, LoadingOutlined } from "@ant-design/icons";
import CustomLabel from "../../../../components/CustomLabel";
import MainLayoutLoading from "../../../../components/MainLayoutLoading";
import DetailLoading from "../../../../components/DetailLoading";
import { mainReducer } from "../../../../include/reducer";
import RoutingDetail from "./RoutingDetail";
const { Text } = Typography;
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
  authorize.check_authorize();
  const data =
    props.location && props.location.state ? props.location.state : 0;
  const initialStateHead = routingHeadFileds;
  const [sumPeriod, setsumPeriod] = useState(0);
  const [state, stateDispatch] = useReducer(mainReducer, initialStateHead);
  const [loading, setLoading] = useState({
    pageLoading: true,
    calculate: false,
    isUpdatePeriod: false,
  });
  const current_project = useSelector((state) => state.auth.currentProject);
  const itemList = useSelector((state) => state.production.fg.fgList);
  const auth = useSelector((state) => state.auth.authData);
  useEffect(() => {
    const prepareData = new Promise(async (resolve, reject) => {
      dispatch(getAllMachine());
      dispatch(getFgItem());
      stateDispatch({
        type: "SET_HEAD",
        payload: data
          ? {
              ...data,
              commit: 1,
              user_name: auth.user_name,
              branch_id: auth.branch_id,
              branch_name: auth.branch_name,
              isCalculate: false,
            }
          : {
              ...routingHeadFileds,
              commit: 1,
              user_name: auth.user_name,
              routing_created_by_no_name: auth.employee_no_name_eng,
              branch_id: auth.branch_id,
              branch_name: auth.branch_name,
              routing_created: moment().format("DD/MM/YYYY"),
              isCalculate: false,
            },
      });
      await setTimeout(resolve("Promise Complete"), 1000);
    });
    prepareData.then((res) => {
      console.log(res);
      setTimeout(
        () =>
          setLoading({
            ...loading,
            pageLoading: false,
          }),
        1000
      );
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
      console.log("SAVE", state);
      if (!loading.calculate) {
        const validate = validateFormHead(state, routingHeadRequireFileds);
        const dataDetail = state.routing_detail.bulk.concat(
          state.routing_detail.fg
        );
        const validate_detail = validateFormDetail(
          dataDetail,
          routingDetailRequireFileds
        );
        console.log("dataDetail", dataDetail);
        console.log("state", state);
        if (validate_detail.validate && validate.validate) {
          const data2 = [{ ...state, routing_detail: dataDetail }];
          state.routing_id
            ? dispatch(updateRouting(state.routing_id, data2, redirect_to_view))
            : dispatch(createRouting(data2, redirect_to_view));
          console.log("pass", dataDetail);
          console.log("passdataHead", state);
          console.log("data2", data2);
        } else {
          message.warning({
            content: "Please fill your form completely.",
            key,
            duration: 2,
          });
        }
      } else {
        message.warning({
          content: "Please click calculator button.",
          key,
          duration: 4,
        });
      }
    },
    onEdit: (e) => {
      console.log("Edit");
    },
    onApprove: (e) => {
      console.log("Approve");
    },
    onConfirm: () => {
      console.log("Confirm");
    },
  };

  const upDateFormValue = (data) => {
    stateDispatch({ type: "CHANGE_HEAD_VALUE", payload: data });
  };
  const redirect_to_view = (id) => {
    history.push("/production/routing/view/" + (id ? id : "new"));
  };
  const sumPeriodFN = () => {
    setLoading({
      ...loading,
      isUpdatePeriod: true,
    });
    const routingDetail = state.routing_detail.bulk.concat(
      state.routing_detail.fg
    );
    console.log("sumReiodFN", routingDetail);
    setTimeout(() => {
      if (routingDetail.length > 0) {
        const sum_data = routingDetail.map((data) =>
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
      setLoading({
        ...loading,
        calculate: false,
        isUpdatePeriod: false,
      });
    }, 800);
  };
  useEffect(() => {
    !loading.pageLoading &&
      setLoading({
        ...loading,
        calculate: true,
      });
  }, [state.routing_detail]);
  console.log("state", state, loading);
  return (
    <>
      {loading.pageLoading ? (
        <MainLayoutLoading>
          <DetailLoading />
        </MainLayoutLoading>
      ) : (
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
                <Text className="text-view">{state.routing_created}</Text>
              </Col>
            </Row>
            <Row className="col-2 row-tab-margin">
              <Col span={24} style={{ marginBottom: 8 }}>
                <CustomLabel
                  label="Description :"
                  require
                  readOnly={readOnly}
                />
                <Input
                  name="routing_remark"
                  placeholder="Description"
                  className="full-width mt-1"
                  onChange={(e) => {
                    upDateFormValue({ routing_remark: e.target.value });
                  }}
                  value={state.routing_remark}
                />
              </Col>
            </Row>
            <Row className="col-2 mt-2" gutter={[32, 0]}>
              {/* left */}
              <Col span={12} className="col-border-right">
                <Row className="col-2 row-margin-vertical">
                  <Col span={8}>
                    <CustomLabel
                      label="FG Item :"
                      require
                      readOnly={readOnly}
                    />
                  </Col>
                  <Col span={15}>
                    <CustomSelect
                      allowClear
                      showSearch
                      value={state.item_id}
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
                              item_id_ref:
                                option.data.item_bulk[0]?.item_id_ref,
                            })
                          : upDateFormValue({
                              item_id: null,
                              item_no_name_ref: null,
                              item_id_ref: null,
                            });
                      }}
                    />
                  </Col>
                </Row>
                <Row className="col-2 row-margin-vertical">
                  <Col span={8}>
                    <CustomLabel
                      label="Bulk Item :"
                      require
                      readOnly={readOnly}
                    />
                  </Col>
                  <Col span={15} className="text-value">
                    <Text title={state.item_no_name_ref}>
                      {state.item_no_name_ref ?? "-"}
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
                    <div className={"total-number-modal text-value text-right"}>
                      {loading.isUpdatePeriod ? (
                        <LoadingOutlined className="button-icon pd-right-2" />
                      ) : (
                        <Text className="text-value pd-right-2">
                          {state.routing_working_time_min || "-"}
                        </Text>
                      )}
                    </div>
                  </Col>
                  <Col span={8}>
                    <div className="pd-left-2">
                      {loading.isUpdatePeriod ? (
                        <LoadingOutlined className="button-icon" />
                      ) : loading.calculate ? (
                        <Button type="text" onClick={sumPeriodFN}>
                          <CalculatorOutlined
                            // ref={calBtn}

                            className="button-icon"
                            style={{
                              fontSize: 22,
                            }}
                          />
                        </Button>
                      ) : (
                        <Button type="text" disabled>
                          <CalculatorOutlined
                            style={{
                              color: "#ccc",
                              fontSize: 22,
                            }}
                          />
                        </Button>
                      )}
                    </div>
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
                    <div className={"total-number-modal text-value text-right"}>
                      {loading.isUpdatePeriod ? (
                        <LoadingOutlined className="button-icon pd-right-2" />
                      ) : (
                        <Text className="text-value pd-right-2">
                          {state.routing_working_time_hour || "-"}
                        </Text>
                      )}
                    </div>
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
                    <div className={"total-number-modal text-value text-right"}>
                      {loading.isUpdatePeriod ? (
                        <LoadingOutlined className="button-icon pd-right-2" />
                      ) : (
                        <Text className="text-value pd-right-2">
                          {state.routing_working_time_day || "-"}
                        </Text>
                      )}
                    </div>
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
                      value={state.routing_batch_size}
                      className={"full-width"}
                      name="routing_batch_size"
                      placeholder={"Batch size"}
                      onChange={(e) =>
                        upDateFormValue({ routing_batch_size: e })
                      }
                    />
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
                      value={state.routing_fill_weight}
                      className={"full-width"}
                      name={"routing_fill_weight"}
                      placeholder={"Fill wt"}
                      onChange={(e) =>
                        upDateFormValue({ routing_fill_weight: e })
                      }
                    />
                  </Col>
                </Row>
                <Row className="col-2 row-margin-vertical">
                  <Col span={8}>
                    <CustomLabel
                      label="Pack Size :"
                      require
                      readOnly={readOnly}
                    />
                  </Col>
                  <Col span={8}>
                    <InputNumber
                      {...numberFormat}
                      value={state.routing_pack_size}
                      name={"routing_pack_size"}
                      placeholder={"Pack Size"}
                      className={"full-width"}
                      onChange={(e) =>
                        upDateFormValue({ routing_pack_size: e })
                      }
                    />
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
                      value={state.routing_capacity_min}
                      className={"full-width"}
                      name="routing_capacity_min"
                      placeholder={"Capacity"}
                      onChange={(e) =>
                        upDateFormValue({ routing_capacity_min: e })
                      }
                    />
                  </Col>
                </Row>
                <Row className="col-2 row-margin-vertical">
                  <Col span={8}>
                    <CustomLabel
                      label="Man / hr :"
                      require
                      readOnly={readOnly}
                    />
                  </Col>
                  <Col span={8}>
                    <InputNumber
                      {...numberFormat}
                      value={state.routing_worker_hour}
                      className={"full-width"}
                      name="routing_worker_hour"
                      placeholder={"Man / hr"}
                      onChange={(e) =>
                        upDateFormValue({ routing_worker_hour: e })
                      }
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <RoutingDetail
              state={state}
              readOnly={readOnly}
              upDateFormValue={upDateFormValue}
              stateDispatch={stateDispatch}
              detailField={"routing_detail"}
              columns={routingDetailColumns}
            />
            {/* <Row className="col-2 row-tab-margin-l">
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
                      dataDetail={state.routing_detail.bulk}
                      routing_type_id={1}
                      readOnly={readOnly}
                      stateDispatch={stateDispatch}
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
                      dataDetail={state.routing_detail.fg}
                      routing_type_id={2}
                      readOnly={readOnly}
                      stateDispatch={stateDispatch}
                    />
                  </Tabs.TabPane>
                </Tabs>
              </Col>
            </Row> */}
          </div>
        </MainLayout>
      )}
    </>
  );
};

export default RoutingCreate;
