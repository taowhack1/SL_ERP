import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Input,
  InputNumber,
  Radio,
  Row,
  Space,
  Tooltip,
} from "antd";
import Text from "antd/lib/typography/Text";
import React, { useState } from "react";
import CustomSelect from "../../../components/CustomSelect";
import { get_pre_run_no } from "../../../include/js/function_main";
import moment from "moment";
import {
  BorderOutlined,
  CheckSquareOutlined,
  PlusCircleTwoTone,
  PlusOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import CustomLabel from "../../../components/CustomLabel";
import ItemUoMConversion from "./ItemUoMConversion";
import Modal from "antd/lib/modal/Modal";
const { TextArea } = Input;

const TabItemDetail = ({
  master_data,
  data_head,
  upDateFormValue,
  customers,
  readOnly,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  let disabled_field = data_head.item_id ? 1 : 0;
  return (
    <>
      <Row>
        <Col span={12} className={"col-border-right"}>
          <Row className="col-2 row-margin-vertical">
            <Col span={6}>
              <CustomLabel title={"Item type :"} require readOnly={readOnly} />
            </Col>
            <Col span={16}>
              {readOnly ? (
                <Text className="text-view">
                  {data_head.type_name ? data_head.type_name : "-"}
                </Text>
              ) : (
                <CustomSelect
                  allowClear
                  disabled={disabled_field}
                  showSearch
                  placeholder={"Item type"}
                  name="type_id"
                  field_id="type_id"
                  field_name="type_name"
                  value={data_head.type_name}
                  data={master_data.item_type}
                  onChange={(data, option) => {
                    data !== undefined
                      ? upDateFormValue({
                          type_id: data,
                          type_name: option.title,
                          category_id: null,
                          category_name: null,
                          item_pre_run_no: get_pre_run_no(
                            data_head.item_pre_run_no,
                            0,
                            option.data.type_run_no
                          ),
                        })
                      : upDateFormValue({
                          type_id: null,
                          type_name: null,
                          category_id: null,
                          category_name: null,
                          item_pre_run_no: get_pre_run_no(
                            data_head.item_pre_run_no,
                            0,
                            "-"
                          ),
                        });
                  }}
                />
              )}
            </Col>
            <Col span={2}></Col>
          </Row>
          <Row className="col-2 row-margin-vertical">
            <Col span={6}>
              <CustomLabel
                title={"Unit of Measure :"}
                require
                readOnly={readOnly}
              />
            </Col>
            <Col span={16}>
              {readOnly ? (
                <Text className="text-view">
                  {data_head.uom_no_name ? data_head.uom_no_name : "-"}
                </Text>
              ) : (
                <CustomSelect
                  allowClear
                  showSearch
                  placeholder={"Unit of measure"}
                  name="uom_id"
                  field_id="uom_id"
                  field_name="uom_no_name"
                  value={data_head.uom_no_name}
                  data={master_data.item_uom}
                  onChange={(data, option) => {
                    data !== undefined
                      ? upDateFormValue({
                          uom_id: option.data.uom_id,
                          uom_no: option.data.uom_no,
                          uom_no_name: option.data.uom_no_name,
                          uom_name: option.data.uom_name,
                          uom_conversion: data_head?.uom_conversion?.map(
                            (obj) => {
                              return {
                                ...obj,
                                uom_id: option.data.uom_id,
                                uom_no_name: option.data.uom_no_name,
                              };
                            }
                          ),
                        })
                      : upDateFormValue({
                          uom_id: null,
                          uom_no: null,
                          uom_no_name: null,
                          uom_name: null,
                          uom_conversion: [],
                        });
                  }}
                />
              )}
            </Col>
            <Col span={2} className={"pd-left-1"}>
              {data_head.uom_id && (
                <Tooltip
                  title="Config UoM Conversion"
                  onClick={() => setModalVisible(true)}
                >
                  <SwapOutlined className="button-icon font-20" />
                </Tooltip>
              )}
            </Col>
          </Row>
          {!readOnly && data_head.uom_id && (
            <Row className="col-2 row-margin-vertical">
              <Col span={6}></Col>
              <Col span={16}>
                <span className="require">* Click icon</span>
                <SwapOutlined
                  // style={{ fontSize: 20 }}
                  onClick={() => setModalVisible(true)}
                  className="button-icon pd-left-2 pd-right-2"
                />
                <span className="require">
                  to 'Edit' or 'View' UOM conversion
                </span>
              </Col>
            </Row>
          )}
          {modalVisible && (
            <ItemUoMConversion
              readOnly={readOnly}
              data_head={data_head}
              visible={modalVisible}
              setModalVisible={setModalVisible}
              upDateFormValue={upDateFormValue}
              UoMList={master_data.item_uom}
            />
          )}
          <Row className="col-2 row-margin-vertical">
            <Col span={6}>
              <CustomLabel
                title={"Shelf life (day) :"}
                require
                readOnly={readOnly}
              />
            </Col>
            <Col span={16}>
              {readOnly ? (
                <Text className="text-view">
                  {data_head.item_shelf_life ? data_head.item_shelf_life : "-"}
                </Text>
              ) : (
                <InputNumber
                  name="item_shelf_life"
                  placeholder={"Shelf life (day)"}
                  min={0}
                  step={1}
                  precision={0}
                  className={"full-width"}
                  disabled={0}
                  value={data_head.item_shelf_life}
                  onChange={(data) =>
                    upDateFormValue({
                      item_shelf_life: data,
                    })
                  }
                />
              )}
            </Col>
            <Col span={2}></Col>
          </Row>
          <Row className="col-2 row-margin-vertical">
            <Col span={6}>
              <CustomLabel
                title={"Customer name :"}
                require
                readOnly={readOnly}
              />
            </Col>
            <Col span={16}>
              {readOnly ? (
                <Text className="text-view">
                  {data_head.customer_no_name
                    ? data_head.customer_no_name
                    : "-"}
                </Text>
              ) : (
                <CustomSelect
                  allowClear
                  disabled={data_head.item_id ? 1 : 0}
                  showSearch
                  placeholder={"Customer name"}
                  name="customer_id"
                  field_id="customer_id"
                  field_name="customer_no_name"
                  value={data_head.customer_no_name}
                  data={customers}
                  onChange={(data, option) => {
                    data !== undefined
                      ? upDateFormValue({
                          customer_id: option.data.customer_id,
                          customer_no_name: option.data.customer_no_name,
                          item_customer_run_no: option.data.customer_name_short,
                          item_pre_run_no: get_pre_run_no(
                            data_head.item_pre_run_no,
                            2,
                            option.data.customer_name_short
                          ),
                        })
                      : upDateFormValue({
                          customer_id: null,
                          customer_no_name: null,
                          item_customer_run_no: null,
                          item_pre_run_no: get_pre_run_no(
                            data_head.item_pre_run_no,
                            2,
                            "---"
                          ),
                        });
                  }}
                />
              )}
            </Col>
            <Col span={2}></Col>
          </Row>
          <Row className="col-2 row-margin-vertical">
            <Col span={6}>
              <CustomLabel
                title={"Identify benefit :"}
                require
                readOnly={readOnly}
              />
            </Col>
            <Col span={16}>
              {readOnly ? (
                <Text className="text-view">
                  {data_head.identify_benefit_no_name
                    ? data_head.identify_benefit_no_name
                    : "-"}
                </Text>
              ) : (
                <CustomSelect
                  allowClear
                  disabled={data_head.item_id ? 1 : 0}
                  showSearch
                  placeholder={"Identify benefit"}
                  name="identify_benefit_id"
                  field_id="identify_benefit_id"
                  field_name="identify_benefit_no_name"
                  value={data_head.identify_benefit_no_name}
                  data={master_data.item_benefit}
                  onChange={(data, option) => {
                    data !== undefined
                      ? upDateFormValue({
                          identify_benefit_id: option.data.identify_benefit_id,
                          identify_benefit_no_name:
                            option.data.identify_benefit_no_name,
                          item_pre_run_no: get_pre_run_no(
                            data_head.item_pre_run_no,
                            3,
                            option.data.identify_benefit_run_no
                          ),
                        })
                      : upDateFormValue({
                          identify_benefit_id: null,
                          identify_benefit_no_name: null,
                          item_pre_run_no: get_pre_run_no(
                            data_head.item_pre_run_no,
                            3,
                            "-"
                          ),
                        });
                  }}
                />
              )}
            </Col>
            <Col span={2}></Col>
          </Row>
          {data_head.type_id === 3 && (
            <Row className="col-2 row-margin-vertical">
              <Col span={6}>
                <CustomLabel title={"Effective Date :"} readOnly={readOnly} />
              </Col>
              <Col span={16}>
                {readOnly ? (
                  <Text className="text-view text-center">
                    {data_head.item_formula_effective_date
                      ? data_head.item_formula_effective_date
                      : "-"}
                  </Text>
                ) : (
                  <DatePicker
                    name={"item_formula_effective_date"}
                    format={"DD/MM/YYYY"}
                    className={"full-width"}
                    placeholder="Effective Date"
                    required
                    value={
                      data_head.item_formula_effective_date
                        ? moment(
                            data_head.item_formula_effective_date,
                            "DD/MM/YYYY"
                          )
                        : ""
                    }
                    defaultValue={
                      data_head.item_formula_effective_date
                        ? moment(
                            data_head.item_formula_effective_date,
                            "DD/MM/YYYY"
                          )
                        : ""
                    }
                    onChange={(data) => {
                      upDateFormValue({
                        item_formula_effective_date: data
                          ? data.format("DD/MM/YYYY")
                          : "",
                      });
                    }}
                  />
                )}
              </Col>
              <Col span={2}></Col>
            </Row>
          )}
        </Col>
        <Col span={12} className="row-col-right">
          <Row className="col-2 row-margin-vertical">
            <Col span={2}></Col>
            <Col span={6}>
              <CustomLabel title={"Category :"} require readOnly={readOnly} />
            </Col>
            <Col span={16}>
              {readOnly ? (
                <Text className="text-view">
                  {data_head.category_name ? data_head.category_name : "-"}
                </Text>
              ) : (
                <CustomSelect
                  allowClear
                  showSearch
                  disabled={!disabled_field && data_head.type_id ? 0 : 1}
                  placeholder={"Category"}
                  name="category_id"
                  field_id="category_id"
                  field_name="category_name"
                  value={data_head.category_name}
                  data={
                    data_head.type_id
                      ? master_data.item_category.filter(
                          (categ) => categ.type_id === data_head.type_id
                        )
                      : master_data.item_category
                  }
                  onChange={(data, option) => {
                    data !== undefined
                      ? upDateFormValue({
                          category_id: option.data.category_id,
                          category_name: option.data.category_name,
                          item_pre_run_no: get_pre_run_no(
                            data_head.item_pre_run_no,
                            1,
                            option.data.category_run_no
                          ),
                        })
                      : upDateFormValue({
                          category_id: null,
                          category_name: null,
                          item_pre_run_no: get_pre_run_no(
                            data_head.item_pre_run_no,
                            1,
                            "--"
                          ),
                        });
                  }}
                />
              )}
            </Col>
          </Row>
          <Row className="col-2 row-margin-vertical">
            <Col span={2}></Col>
            <Col span={6}>
              <CustomLabel
                title={"Storage Condition :"}
                require
                readOnly={readOnly}
              />
            </Col>
            <Col span={16}>
              {readOnly ? (
                <Text className="text-view">
                  {data_head.item_control_name
                    ? data_head.item_control_name
                    : "-"}
                </Text>
              ) : (
                <CustomSelect
                  allowClear
                  // disabled={data_head.item_id ? 1 : 0}
                  showSearch
                  placeholder={"Storage Condition"}
                  name="item_control_id"
                  field_id="item_control_id"
                  field_name="item_control_name"
                  value={data_head.item_control_name}
                  data={master_data.item_control}
                  onChange={(data, option) => {
                    data !== undefined
                      ? upDateFormValue({
                          item_control_id: option.data.item_control_id,
                          item_control_name: option.data.item_control_name,
                        })
                      : upDateFormValue({
                          item_control_id: null,
                          item_control_name: null,
                        });
                  }}
                />
              )}
            </Col>
          </Row>

          <Row className="col-2 row-margin-vertical">
            <Col span={2}></Col>
            <Col span={6}>
              <CustomLabel title={"Price approve by :"} readOnly={readOnly} />
            </Col>
            <Col span={16} className={readOnly ? "" : "pd-left-2"}>
              {readOnly ? (
                <Text className="text-view">
                  {data_head.item_price_approve === 1 ? "SL" : "Customer"}
                </Text>
              ) : (
                <Radio.Group
                  onChange={(e) =>
                    upDateFormValue({
                      item_price_approve: e.target.value,
                    })
                  }
                  value={data_head.item_price_approve}
                >
                  <Radio className="radio-vertical" value={1}>
                    SL
                  </Radio>
                  <Radio className="radio-vertical" value={2}>
                    Customer
                  </Radio>
                </Radio.Group>
              )}
            </Col>
          </Row>
          <Row className="col-2 row-tab-margin"></Row>
          <Row className="col-2 row-margin-vertical">
            <Col span={2}></Col>
            <Col span={6}>
              <CustomLabel title={"Sale to :"} readOnly={readOnly} />
            </Col>
            <Col span={16} className="pd-left-2">
              {readOnly ? (
                <>
                  <Space align="baseline">
                    {data_head.item_sale_local ? (
                      <CheckSquareOutlined />
                    ) : (
                      <BorderOutlined />
                    )}
                    <Text>Local</Text>
                  </Space>
                  <br />
                  <Space align="baseline">
                    {data_head.item_sale_export ? (
                      <CheckSquareOutlined />
                    ) : (
                      <BorderOutlined />
                    )}
                    <Text>Export</Text>
                  </Space>
                </>
              ) : (
                <>
                  <Space align="baseline">
                    <Checkbox
                      checked={data_head.item_sale_local}
                      onChange={(e) =>
                        upDateFormValue({
                          item_sale_local: e.target.checked ? 1 : 0,
                        })
                      }
                    />
                    <Text>Local</Text>
                  </Space>
                  <br />
                  <Space align="baseline">
                    <Checkbox
                      checked={data_head.item_sale_export}
                      onChange={(e) =>
                        upDateFormValue({
                          item_sale_export: e.target.checked ? 1 : 0,
                        })
                      }
                    />
                    <Text>Export</Text>
                  </Space>
                </>
              )}
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="col-2 mt-2">
        <Col span={24}>
          <Space direction="vertical" className={"full-width"}>
            <Text strong>Notes </Text>
            {readOnly ? (
              <Text className="text-view">
                {data_head.item_remark ? data_head.item_remark : "-"}
              </Text>
            ) : (
              <TextArea
                name="item_remark"
                placeholder="Notes"
                onChange={(e) =>
                  upDateFormValue({ item_remark: e.target.value })
                }
                value={data_head.item_remark}
              />
            )}
          </Space>
        </Col>
      </Row>
    </>
  );
};

export default TabItemDetail;
