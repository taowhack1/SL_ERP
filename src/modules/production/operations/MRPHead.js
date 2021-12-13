import React, { useContext, useEffect, useState } from "react";
import {
  Row,
  Col,
  Input,
  Typography,
  InputNumber,
  DatePicker,
  message,
  Spin,
  Checkbox,
  Button,
} from "antd";
import CustomSelect from "../../../components/CustomSelect";
import { useSelector } from "react-redux";
import { MRPContext } from "../../../include/js/context";
import { convertDigit, getNumberFormat } from "../../../include/js/main_config";
import CustomLabel from "../../../components/CustomLabel";
import moment from "moment";
import { CalculatorOutlined } from "@ant-design/icons";
import { useFetch } from "../../../include/js/customHooks";
const { Text } = Typography;
const resetValue = {
  so_detail_id: null,
  item_id: null,
  item_no_name: null,
  mrp_delivery_date: null,
  mrp_qty_produce: 0,
  type_id: null,
  uom_id: null,
  uom_no: null,
  calRPM: false,
  mrp_qty_produce_ref: 0,
  mrp_qty_produce_ref_used: 1, //ไม่ใช้ Bulk ในสต็อก
  mrp_qty_produce_ref_before: 0, //ยอดผลิต Bulk ไม่รวมหักสต็อก
  mrp_qty_produce_ref_stock: 0, //ยอด Bulk ค้างสต็อก
  item_qty_produce_bulk_request: 0,
  mrp_pr_rm_lead_time_day: null,
  mrp_pr_pk_lead_time_day: null,
  mrp_bulk_produce_date: null,
  mrp_fg_produce_date: null,
  rm_detail: [],
  pk_detail: [],
};
const apiItemProduceList = `/production/mrp/item_produce`;
const MRPHead = () => {
  const [config, setConfig] = useState({
    editBulk: false,
    disabledEditBulk: true,
  });
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
  const { data: itemProduceList, loading: getItemProduceListLoading } =
    useFetch(`${apiItemProduceList}/${mainState?.so_id}`, !mainState?.so_id);
  const { data: itemList } = itemProduceList || {};
  console.log("itemProduceList", itemProduceList);
  const onChangeConfig = (data) => setConfig((prev) => ({ ...prev, ...data }));

  const onChange = (data) => {
    console.log("onChange Data", data);
    // setState({ ...mainState, ...data });
    mainStateDispatch({
      type: "CHANGE_OBJ_VALUE",
      payload: data,
    });
  };

  const Reset = () => {
    mainStateDispatch({ type: "RESET_DATA", payload: initialState });
  };

  useEffect(() => {
    if (!readOnly) {
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
      !mainState.calRPM && onChangeConfig({ disabledEditBulk: false });
    }
  }, [mainState?.calRPM]);

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
            <Col span={12} className="col-border-right">
              <Row className="col-2 row-margin-vertical">
                <Col span={8}>
                  <Text strong>
                    {!readOnly && <span className="require">* </span>}
                    SO Document :
                  </Text>
                </Col>
                <Col span={14}>
                  {readOnly ? (
                    <Text className="pre-wrap">
                      {mainState.so_no_description}
                    </Text>
                  ) : (
                    <CustomSelect
                      allowClear
                      showSearch
                      disabled={detailLoading}
                      placeholder={"SO Document"}
                      name="so_id"
                      field_id="so_id"
                      field_name="so_no_description"
                      value={mainState.so_no_description}
                      data={SOList}
                      onChange={async (data, option) => {
                        data !== undefined
                          ? onChange({
                              ...resetValue,
                              so_id: option.data.so_id,
                              so_no_description: option.data.so_no_description,
                              so_detail: option.data.so_detail,
                              // item_id: null,
                              // so_detail_id: null,
                              // item_no_name: null,
                              // mrp_delivery_date: null,
                              // mrp_qty_produce: 0,
                              // uom_id: null,
                              // uom_no: null,
                              // mrp_qty_produce_ref: 0,
                              // mrp_qty_produce_ref_used: 1, //ไม่ใช้ Bulk ในสต็อก
                              // mrp_qty_produce_ref_before: 0, //ยอดผลิต Bulk ไม่รวมหักสต็อก
                              // mrp_qty_produce_ref_stock: 0, //ยอด Bulk ค้างสต็อก
                              // item_qty_produce_bulk_request: 0,
                            })
                          : Reset();
                      }}
                    />
                  )}
                </Col>
              </Row>
              <Row className="col-2 row-margin-vertical">
                <Col span={8}>
                  <Text strong>
                    {!readOnly && <span className="require">* </span>}
                    Item :
                  </Text>
                </Col>
                <Col span={14}>
                  {readOnly ? (
                    <Text className="pre-wrap">{mainState.item_no_name}</Text>
                  ) : (
                    <CustomSelect
                      allowClear
                      showSearch
                      disabled={detailLoading || getItemProduceListLoading}
                      placeholder={"Item"}
                      name="item_id"
                      field_id="so_detail_id"
                      field_name="item_no_name"
                      value={mainState.so_detail_id}
                      data={itemList || []}
                      onChange={(data, option) => {
                        data !== undefined
                          ? onChange({
                              ...resetValue,
                              so_detail_id: option.data.so_detail_id,
                              item_id: option.data.item_id,
                              item_no_name: option.data.item_no_name,
                              mrp_delivery_date:
                                option.data.so_detail_delivery_date,
                              mrp_qty_produce:
                                option.data.tg_so_detail_qty_balance,
                              type_id: option?.data?.type_id,
                              uom_id: option.data.uom_id,
                              uom_no: option.data.uom_no,
                              calRPM: true,
                            })
                          : onChange({
                              ...resetValue,
                            });
                      }}
                    />
                  )}
                </Col>
              </Row>
              <Row className="col-2 row-margin-vertical">
                <Col span={8}>
                  <CustomLabel
                    label={
                      mainState?.uom_no
                        ? `Qty. ( ${mainState?.uom_no} ) :`
                        : "Qty. :"
                    }
                    require
                    readOnly={readOnly}
                  />
                </Col>
                <Col span={14} className={"text-value"}>
                  {readOnly ? (
                    <Text className="text-value">
                      {convertDigit(mainState.mrp_qty_produce, 6)}
                    </Text>
                  ) : (
                    <InputNumber
                      {...getNumberFormat(6)}
                      min={0}
                      step={1}
                      disabled={detailLoading || !mainState.item_id}
                      placeholder={"Qty. to produce"}
                      name={"mrp_qty_produce"}
                      className="full-width"
                      value={mainState.mrp_qty_produce}
                      onChange={(data) => {
                        onChange({
                          ...resetValue,
                          ...mainState,
                          mrp_qty_produce: data,
                          mrp_qty_produce_ref: 0,
                          // mrp_qty_produce_ref_used: 1, //ไม่ใช้ Bulk ในสต็อก
                          mrp_qty_produce_ref_before: 0, //ยอดผลิต Bulk ไม่รวมหักสต็อก
                          mrp_qty_produce_ref_stock: 0, //ยอด Bulk ค้างสต็อก
                          item_qty_produce_bulk_request: 0,
                          mrp_pr_rm_lead_time_day: null,
                          mrp_pr_pk_lead_time_day: null,
                          mrp_bulk_produce_date: null,
                          mrp_fg_produce_date: null,
                          rm_detail: [],
                          pk_detail: [],
                          calRPM: true,
                        });
                      }}
                    />
                  )}
                </Col>
              </Row>
              <Row className="col-2 row-margin-vertical">
                <Col span={14} className={"text-value"} offset={8}>
                  {readOnly ? (
                    <Text className="require">
                      {mainState?.mrp_qty_produce_ref_used
                        ? "* Include bulk on stock"
                        : "* Not include bulk on stock"}
                    </Text>
                  ) : (
                    <>
                      <Checkbox
                        onChange={(e) => {
                          onChange({
                            ...resetValue,
                            ...mainState,
                            mrp_qty_produce_ref_used: e.target.checked ? 1 : 0,
                            mrp_qty_produce_ref: 0,
                            mrp_qty_produce_ref_before: 0, //ยอดผลิต Bulk ไม่รวมหักสต็อก
                            mrp_qty_produce_ref_stock: 0, //ยอด Bulk ค้างสต็อก
                            item_qty_produce_bulk_request: 0,
                            mrp_pr_rm_lead_time_day: null,
                            mrp_pr_pk_lead_time_day: null,
                            mrp_bulk_produce_date: null,
                            mrp_fg_produce_date: null,
                            // item_qty_produce_bulk_request: 0,
                            // mrp_qty_produce_ref:0,
                            calRPM: true,
                          });
                        }}
                        checked={mainState.mrp_qty_produce_ref_used}
                      />
                      <Text strong className="ml-2">
                        Include bulk on stock
                      </Text>
                    </>
                  )}
                </Col>
              </Row>
              <Row className="col-2 row-margin-vertical">
                <Col span={14} offset={8}>
                  {!readOnly && (
                    <Button
                      disabled={!mainState.calRPM}
                      loading={detailLoading}
                      block
                      className={mainState.calRPM ? "primary mt-2" : "mt-2"}
                      icon={<CalculatorOutlined />}
                      ref={calBtn}
                      onClick={getRPMDetail}
                    >
                      Calculate
                    </Button>
                  )}
                </Col>
              </Row>
              {mainState.type_id !== 3 && (
                <Row className="col-2 row-margin-vertical">
                  <Col span={8}>
                    <CustomLabel
                      label={`Bulk For FG. ( ${
                        mainState?.uom_no_ref || mainState?.uom_no || " - "
                      } ) :`}
                      require
                      readOnly={readOnly}
                    />
                  </Col>
                  <Col
                    span={14}
                    className={readOnly ? "text-left" : "text-right"}
                  >
                    {detailLoading ? (
                      <Spin spinning />
                    ) : (
                      <Text className="text-value pd-right-2">
                        {convertDigit(mainState?.mrp_qty_produce_ref_before, 6)}
                      </Text>
                    )}
                  </Col>
                </Row>
              )}

              <Row className="col-2 row-margin-vertical">
                <Col span={8}>
                  <CustomLabel
                    label={`Use Bulk On Stock. ( ${
                      mainState?.uom_no_ref || mainState?.uom_no || " - "
                    } ) :`}
                    require
                    readOnly={readOnly}
                  />
                </Col>
                <Col
                  span={14}
                  className={readOnly ? "text-left" : "text-right"}
                >
                  {detailLoading ? (
                    <Spin spinning />
                  ) : (
                    <Text className="text-value pd-right-2">
                      {convertDigit(mainState?.mrp_qty_produce_ref_stock, 6)}
                    </Text>
                  )}
                </Col>
              </Row>
              <Row className="col-2 row-margin-vertical">
                <Col span={8}>
                  <CustomLabel
                    label={`Bulk Production. ( ${
                      mainState?.uom_no_ref || mainState?.uom_no || " - "
                    } ) :`}
                    require
                    readOnly={readOnly}
                  />
                </Col>
                <Col
                  span={14}
                  className={readOnly ? "text-left" : "text-right"}
                >
                  {detailLoading ? (
                    <Spin spinning />
                  ) : readOnly || mainState.type_id === 3 ? (
                    <Text className="text-value pd-right-2">
                      {convertDigit(mainState.mrp_qty_produce_ref, 6)}
                    </Text>
                  ) : (
                    <InputNumber
                      {...getNumberFormat(6)}
                      min={0}
                      step={1}
                      disabled={
                        detailLoading ||
                        !mainState.item_id ||
                        !mainState.mrp_qty_produce_ref_before
                      }
                      placeholder={"Qty. to produce"}
                      name={"item_qty_produce_bulk_request"}
                      className="w-100"
                      value={
                        mainState.item_qty_produce_bulk_request ||
                        mainState.mrp_qty_produce_ref
                      }
                      onChange={(data) => {
                        onChange({
                          ...mainState,
                          item_qty_produce_bulk_request: data,
                          mrp_pr_rm_lead_time_day: null,
                          mrp_pr_pk_lead_time_day: null,
                          mrp_bulk_produce_date: null,
                          mrp_fg_produce_date: null,
                          calRPM: true,
                          rm_detail: [],
                          pk_detail: [],
                        });
                      }}
                    />
                  )}
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row className="col-2 row-margin-vertical">
                <Col span={6}>
                  <CustomLabel
                    label={"Bulk Plan Date :"}
                    readOnly={readOnly}
                    require
                  />
                </Col>
                <Col span={16}>
                  {readOnly ? (
                    <Text className="text-value">
                      {mainState.mrp_bulk_produce_date}
                    </Text>
                  ) : (
                    <DatePicker
                      name={"mrp_bulk_produce_date"}
                      format={"DD/MM/YYYY"}
                      className={"full-width"}
                      placeholder="Plan date"
                      required
                      value={
                        mainState.mrp_bulk_produce_date
                          ? moment(
                              mainState.mrp_bulk_produce_date,
                              "DD/MM/YYYY"
                            )
                          : ""
                      }
                      onChange={(data) => {
                        const date = data ? data.format("DD/MM/YYYY") : "";
                        onChange({
                          mrp_bulk_produce_date: date,
                          mrp_routing: {
                            ...mainState.mrp_routing,
                            bulk: mainState.mrp_routing.bulk.map((obj) => ({
                              ...obj,
                              mrp_routing_plan_date: date,
                            })),
                          },
                        });
                      }}
                    />
                  )}
                </Col>
              </Row>
              <Row className="col-2 row-margin-vertical">
                <Col span={6}>
                  <CustomLabel
                    label={"FG Plan Date :"}
                    readOnly={readOnly}
                    require
                  />
                </Col>
                <Col span={16}>
                  {readOnly ? (
                    <Text className="text-value">
                      {mainState.mrp_fg_produce_date}
                    </Text>
                  ) : (
                    <DatePicker
                      name={"mrp_fg_produce_date"}
                      format={"DD/MM/YYYY"}
                      className={"full-width"}
                      placeholder="Plan date"
                      required
                      value={
                        mainState.mrp_fg_produce_date
                          ? moment(mainState.mrp_fg_produce_date, "DD/MM/YYYY")
                          : ""
                      }
                      onChange={(data) => {
                        const date = data ? data.format("DD/MM/YYYY") : "";
                        onChange({
                          mrp_fg_produce_date: date,
                          mrp_routing: {
                            ...mainState.mrp_routing,
                            fg: mainState.mrp_routing.fg.map((obj) => ({
                              ...obj,
                              mrp_routing_plan_date: date,
                            })),
                          },
                        });
                      }}
                    />
                  )}
                </Col>
              </Row>
              <Row className="col-2 row-margin-vertical">
                <Col span={6}>
                  <CustomLabel label={"Delivery Date : "} readOnly={readOnly} />
                </Col>
                <Col span={16}>
                  <Text className="text-value">
                    {mainState.mrp_delivery_date ?? "DD/MM/YYYY"}
                  </Text>
                </Col>
              </Row>

              <Row className="col-2 row-margin-vertical">
                <Col span={6}>
                  <CustomLabel label={"Vendor L/T "} readOnly={readOnly} />
                </Col>
                <Col span={16}>
                  <Row className="col-2">
                    {detailLoading ? (
                      <Col span={24}>
                        <Spin spinning />
                      </Col>
                    ) : (
                      <Col span={24}>
                        <div>
                          <Text className="text-left pd-right-2" strong>
                            RM :
                          </Text>
                          <Text className="text-left">
                            {mainState.mrp_pr_rm_lead_time_day || "-"}
                          </Text>
                          <Text className="text-left pd-left-2" strong>
                            days
                          </Text>
                        </div>
                        <div>
                          <Text className="text-left pd-right-2" strong>
                            PK :
                          </Text>
                          <Text className="text-left pd-left-1">
                            {mainState.mrp_pr_pk_lead_time_day || "-"}
                          </Text>
                          <Text className="text-left pd-left-2" strong>
                            days
                          </Text>
                        </div>
                      </Col>
                    )}
                  </Row>
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
