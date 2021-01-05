import { Col, DatePicker, Input, InputNumber, Row, Space } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import CustomSelect from "../../../components/CustomSelect";
import { get_pre_run_no } from "../../../include/js/function_main";
import moment from "moment";
const { TextArea } = Input;

const TabItemDetail = ({
  master_data,
  data_head,
  upDateFormValue,
  readOnly,
}) => {
  let disabled_field = data_head.item_id ? 1 : 0;
  return (
    <>
      <Row className="col-2 row-margin-vertical">
        <Col span={3}>
          <Text strong>
            {!readOnly && <span className="require">* </span>}
            Item type
          </Text>
        </Col>
        <Col span={8}>
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
                data && data
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
        <Col span={3}>
          <Text strong>
            {!readOnly && <span className="require">* </span>}
            Category
          </Text>
        </Col>
        <Col span={8}>
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
                data && data
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
        <Col span={3}>
          <Text strong>
            {!readOnly && <span className="require">* </span>}
            Unit of measure
          </Text>
        </Col>
        <Col span={8}>
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
                data && data
                  ? upDateFormValue({
                      uom_id: option.data.uom_id,
                      uom_no: option.data.uom_no,
                      uom_no_name: option.data.uom_no_name,
                      uom_name: option.data.uom_name,
                    })
                  : upDateFormValue({
                      uom_id: null,
                      uom_no: null,
                      uom_no_name: null,
                      uom_name: null,
                    });
              }}
            />
          )}
        </Col>

        <Col span={2}></Col>
        <Col span={3}>
          <Text strong>
            {!readOnly && <span className="require">* </span>}
            Storage Condition
          </Text>
        </Col>
        <Col span={8}>
          {readOnly ? (
            <Text className="text-view">
              {data_head.item_control_name ? data_head.item_control_name : "-"}
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
                data && data
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
        <Col span={3}>
          <Text strong>
            {!readOnly && <span className="require">* </span>}
            Shelf life (day)
          </Text>
        </Col>
        <Col span={8}>
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
              style={{ width: "100%" }}
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
        <Col span={3}>
          <Text strong>Item barcode</Text>
        </Col>
        <Col span={8}>
          {readOnly ? (
            <Text className="text-view">
              {data_head.item_barcode ? data_head.item_barcode : "-"}
            </Text>
          ) : (
            <Input
              disabled
              placeholder={"Barcode"}
              onChange={(e) =>
                upDateFormValue({ item_barcode: e.target.value })
              }
              value={data_head.item_barcode}
            />
          )}
        </Col>
      </Row>
      {data_head.type_id === 3 && (
        <Row className="col-2 row-margin-vertical">
          <Col span={12}>
            <Row className="col-2">
              <Col span={6}>
                <Text strong>Effective Date</Text>
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
                    style={{ width: "100%" }}
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
          </Col>
        </Row>
      )}
      <Row className="col-2">
        <Col span={24}>
          <Space direction="vertical" style={{ width: "100%" }}>
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
