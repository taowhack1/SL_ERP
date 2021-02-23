import React, { useContext, useEffect, useState } from "react";
import {
  Row,
  Col,
  Input,
  Typography,
  InputNumber,
  DatePicker,
  Button,
  notification,
  message,
} from "antd";
import CustomSelect from "../../../components/CustomSelect";
import { useSelector } from "react-redux";
import { MRPContext } from "../../../include/js/context";
import { convertDigit, getNumberFormat } from "../../../include/js/main_config";
import CustomLabel from "../../../components/CustomLabel";
import ToggleReadOnlyElement from "../../../components/ToggleReadOnlyElement";
import moment from "moment";
import {
  CalculatorOutlined,
  CheckCircleOutlined,
  CheckOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
const { Text } = Typography;
const { RangePicker } = DatePicker;
const disabledDate = (current) => {
  // Can not select days before today and today
  return current && current - 1 < moment().subtract(1, "days").endOf("day");
};
const MRPHead = () => {
  const SOList = useSelector(
    (mainState) => mainState.production.operations.mrp.mrp.data_so_ref
  );
  const {
    calBtn,
    detailLoading,
    getRPMDetail,
    mainState,
    mainStateDispatch,
    initialState,
    readOnly,
  } = useContext(MRPContext);
  // const {
  //   mrp_description,
  //   mrp_due_date,
  //   so_id,
  //   so_no_description,
  //   item_id,
  //   item_no_name,
  //   so_detail_id,
  // } = mainState;
  // const [mainState, setState] = useState({
  //   mrp_description: mrp_description,
  //   mrp_due_date: mrp_due_date,
  //   so_id: so_id,
  //   so_no_description: so_no_description,
  //   item_id: item_id,
  //   item_no_name: item_no_name,
  //   so_detail_id: so_detail_id,
  // });
  const onChange = (data) => {
    console.log("onChange Data", data);
    // setState({ ...mainState, ...data });
    mainStateDispatch({
      type: "CHANGE_OBJ_VALUE",
      payload: data,
    });
    // calBtn.current.click();
    // headReducer.onChangeHeadValue({ ...mainState, ...data });
  };
  // const calRPM = (data) => {
  //   mainStateDispatch({ type: "CHANGE_OBJ_VALUE", payload: { calRPM: true } });
  //   getRPMDetail();
  // };
  const Reset = () => {
    mainStateDispatch({ type: "RESET_DATA", payload: initialState });

    // setState({
    //   mrp_description: null,
    //   mrp_due_date: null,
    //   so_id: null,
    //   so_no_description: null,
    //   item_id: null,
    //   item_no_name: null,
    //   so_detail_id: null,
    // });
  };
  const openNotificationWithIcon = (
    type,
    text = "",
    title = "Notification"
  ) => {
    notification[type]({
      message: title,
      description: text,
      duration: 6,
    });
  };

  useEffect(() => {
    mainState.calRPM &&
      message.warning({
        key: "notify1",
        content: (
          <span>
            Click
            <CalculatorOutlined
              className="button-icon pd-left-1 pd-right-1"
              style={{ fontSize: 20 }}
            />
            icon to calculate RPM.
          </span>
        ),
        duration: 6,
      });
    // openNotificationWithIcon(
    //   "warning",
    //   <span>
    //     Click
    //     <CalculatorOutlined
    //       className="button-icon pd-left-1 pd-right-1"
    //       style={{ fontSize: 20 }}
    //     />
    //     icon to calculate RPM.
    //   </span>
    // );
  }, [mainState.calRPM]);
  return (
    <>
      <Row className="col-2">
        <Col span={24}>
          <h3>
            <strong>
              {!readOnly && <span className="require">* </span>}
              Description / Job Name :
            </strong>
          </h3>
          <Col span={24}>
            {readOnly ? (
              <Text className="text-value text-left">
                {mainState.mrp_description}
              </Text>
            ) : (
              <Input
                name="mrp_description"
                required
                placeholder={"Description / Job Name."}
                disabled={detailLoading}
                onChange={(e) =>
                  onChange({
                    mrp_description: e.target.value,
                  })
                }
                value={mainState.mrp_description}
              />
            )}
          </Col>
          <Row className="col-2 mt-2" gutter={[32, 0]}>
            <Col span={12}>
              <Row className="col-2 row-margin-vertical">
                <Col span={6}>
                  <Text strong>
                    {!readOnly && <span className="require">* </span>}
                    SO Document :
                  </Text>
                </Col>
                <Col span={17}>
                  {/* data_so_ref */}
                  {readOnly ? (
                    <Text className="text-value text-left">
                      {mainState.so_no_description}
                    </Text>
                  ) : (
                    <CustomSelect
                      allowClear
                      showSearch
                      // size={"small"}
                      disabled={detailLoading}
                      placeholder={"SO Document"}
                      name="so_id"
                      field_id="so_id"
                      field_name="so_no_description"
                      value={mainState.so_no_description}
                      data={SOList}
                      onChange={async (data, option) => {
                        data && data
                          ? onChange({
                              so_id: option.data.so_id,
                              so_no_description: option.data.so_no_description,
                              so_detail: option.data.so_detail,
                              item_id: null,
                              item_no_name: null,
                              mrp_due_date: null,
                              mrp_qty_produce: 0,
                              uom_id: null,
                              uom_no: null,
                            })
                          : Reset();
                      }}
                    />
                  )}
                </Col>
              </Row>
              <Row className="col-2 row-margin-vertical">
                <Col span={6}>
                  <CustomLabel
                    title={"Plan Date :"}
                    readOnly={readOnly}
                    require
                  />
                </Col>
                <Col span={17}>
                  {readOnly ? (
                    <Text className="text-value text-left">
                      {mainState.mrp_plan_start_date +
                        " - " +
                        mainState.mrp_plan_end_date}
                    </Text>
                  ) : (
                    <RangePicker
                      format={"DD/MM/YYYY"}
                      name="mrp_plan_start_date"
                      className="full-width"
                      disabled={detailLoading}
                      disabledDate={disabledDate}
                      onChange={(data) => {
                        data
                          ? onChange({
                              ...mainState,
                              mrp_plan_start_date: data[0].format("DD/MM/YYYY"),
                              mrp_plan_end_date: data[1].format("DD/MM/YYYY"),
                            })
                          : onChange({
                              ...mainState,
                              mrp_plan_start_date: null,
                              mrp_plan_end_date: null,
                            });
                      }}
                      // onBlur={() => {
                      //   Save("mrp_plan_start_date");
                      // }}
                      value={[
                        mainState.mrp_plan_start_date
                          ? moment(mainState.mrp_plan_start_date, "DD/MM/YYYY")
                          : "",
                        mainState.mrp_plan_end_date
                          ? moment(mainState.mrp_plan_end_date, "DD/MM/YYYY")
                          : "",
                      ]}
                    />
                  )}
                </Col>
              </Row>
              <Row className="col-2 row-margin-vertical">
                <Col span={9}>
                  <Text className="require" strong>
                    <span className="require">* </span>
                    RM Lead Time (days):
                  </Text>
                </Col>
                <Col span={15}>
                  <Text className="text-left">
                    {mainState.mrp_lead_time_day_rm +
                      mainState.mrp_lead_time_day_rm_qa}
                  </Text>
                </Col>
              </Row>
              <Row className="col-2 row-margin-vertical">
                <Col span={9}>
                  <Text className="require" strong>
                    <span className="require">* </span>
                    PK Lead Time (days):
                  </Text>
                </Col>
                <Col span={15}>
                  <Text className="text-left">
                    {mainState.mrp_lead_time_day_pk +
                      mainState.mrp_lead_time_day_pk_qa}
                  </Text>
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row className="col-2 row-margin-vertical">
                <Col span={6}>
                  <Text strong>
                    {!readOnly && <span className="require">* </span>}
                    FG Item :
                  </Text>
                </Col>
                <Col span={16}>
                  {readOnly ? (
                    <div className="col-wrap ">
                      {/* <Text className="text-value text-left"> */}
                      {mainState.item_no_name}
                      {/* </Text> */}
                    </div>
                  ) : (
                    <CustomSelect
                      allowClear
                      showSearch
                      // size={"small"}
                      disabled={detailLoading}
                      placeholder={"FG Item"}
                      name="item_id"
                      field_id="so_detail_id"
                      field_name="item_no_name"
                      value={mainState.item_no_name}
                      data={mainState.so_detail ?? []}
                      onChange={(data, option) => {
                        data && data
                          ? onChange({
                              so_detail_id: option.data.so_detail_id,
                              item_id: option.data.item_id,
                              item_no_name: option.data.item_no_name,
                              mrp_due_date: option.data.so_detail_delivery_date,
                              mrp_qty_produce:
                                option.data.tg_so_detail_qty_balance,
                              uom_id: option.data.uom_id,
                              uom_no: option.data.uom_no,
                              calRPM: true,
                              rm_detail: [],
                              pk_detail: [],
                            })
                          : onChange({
                              so_detail_id: null,
                              item_id: null,
                              item_no_name: null,
                              mrp_due_date: null,
                              mrp_qty_produce: 0,
                              uom_id: null,
                              uom_no: null,
                              calRPM: false,
                              rm_detail: [],
                              pk_detail: [],
                            });
                      }}
                    />
                  )}
                </Col>
              </Row>
              <Row className="col-2 row-margin-vertical">
                <Col span={6}>
                  <CustomLabel
                    title={"Qty. To Produce"}
                    require
                    readOnly={readOnly}
                  />
                </Col>
                <Col span={16} className={readOnly ? "text-right" : ""}>
                  <ToggleReadOnlyElement
                    readOnly={readOnly}
                    value={convertDigit(mainState.mrp_qty_produce, 3)}
                  >
                    <InputNumber
                      {...getNumberFormat(3)}
                      min={0}
                      step={1}
                      disabled={detailLoading}
                      placeholder={"Qty. to produce"}
                      name={"mrp_qty_produce"}
                      defaultValue={0}
                      className="full-width"
                      value={mainState.mrp_qty_produce}
                      onChange={(data) => {
                        onChange({
                          ...mainState,
                          mrp_qty_produce: data,
                          calRPM: true,
                          rm_detail: [],
                          pk_detail: [],
                        });
                      }}
                      // onBlur={(data) => {
                      //   Save("mrp_qty_produce");
                      // }}
                    />
                  </ToggleReadOnlyElement>
                </Col>
                <Col span={1}>
                  {!readOnly && detailLoading ? (
                    <LoadingOutlined className="button-icon pd-left-1 " />
                  ) : mainState.calRPM ? (
                    // <Button
                    //   ref={calBtn}
                    //   onClick={getRPMDetail}
                    //   // disabled={!mainState.calRPM}
                    // >
                    //   Calculate
                    // </Button>
                    <CalculatorOutlined
                      onClick={getRPMDetail}
                      className="button-icon pd-left-1 "
                      style={{ fontSize: 27, marginTop: 2 }}
                    />
                  ) : (
                    mainState.item_id && (
                      <CheckOutlined
                        className=" pd-left-1 "
                        style={{ color: "#5CFF05", marginTop: 5 }}
                      />
                    )
                  )}
                </Col>
              </Row>
              {/* {mainState.calRPM && (
                <Row className="col-2 ">
                  <Col span={6}></Col>
                  <Col span={18}>
                    <span className={"require"} style={{ fontSize: 14 }}>
                      * Click{" "}
                      <CalculatorOutlined className="button-icon pd-left-1 pd-right-1" />{" "}
                      to calculate RPM.
                    </span>
                  </Col>
                </Row>
              )} */}
              <Row className="col-2 row-margin-vertical">
                <Col span={6}>
                  <CustomLabel title={"Unit of Measure"} readOnly={readOnly} />
                </Col>
                <Col span={18}>
                  <Text className="text-view">{mainState.uom_no ?? "-"}</Text>
                </Col>
              </Row>
              <Row className="col-2 row-margin-vertical">
                <Col span={6}>
                  <CustomLabel title={"Delivery Date : "} readOnly={readOnly} />
                </Col>
                <Col span={18}>
                  <Text className="text-view">
                    {mainState.mrp_due_date ?? "DD/MM/YYYY"}
                  </Text>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default React.memo(MRPHead);
