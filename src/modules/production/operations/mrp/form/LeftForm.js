import { Button, Col, Popconfirm, Row, Spin } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import {
  DatePickerField,
  InputNumberField,
  SelectField,
} from "../../../../../components/AntDesignComponent";
import CustomLabel from "../../../../../components/CustomLabel";
import { getNumberFormat } from "../../../../../include/js/main_config";
import { useFetch } from "../../../../../include/js/customHooks";
import moment from "moment";
import { DeleteOutlined } from "@ant-design/icons";

const apiSOList = `/list/so`;
const apiItemList = `/production/mrp/item_produce`;

const LeftForm = () => {
  const {
    control,
    register,
    formState: { errors },
    readOnly = true,
    loading = false,
    setValue,
    unregister,
  } = useFormContext();
  const [
    so_id,
    so_no_description,
    item_no_name,
    item_so_detail_id,
    mrp_item_plan_date,
    mrp_item_qty_produce,
    type_id,
    mrp_item_ref_qty_produce,
    item_ref_id,
    item_ref_no_name,
    mrp_item_ref_plan_date,
  ] = useWatch({
    control,
    name: [
      "so_id",
      "so_no_description",
      "item_no_name",
      "item_so_detail_id",
      "mrp_item_plan_date",
      "mrp_item_qty_produce",
      "type_id",
      "mrp_item_ref_qty_produce",
      "item_ref_id",
      "item_ref_no_name",
      "mrp_item_ref_plan_date",
    ],
    defaultValue: [null, "-", "-", null, null, 0, null, 0, null, null],
  });

  const { data: soList, loading: soListLoading } = useFetch(
    `${apiSOList}`,
    readOnly
  );
  const { data: itemList, loading: getItemListLoading } = useFetch(
    `${apiItemList}/${so_id}`,
    !so_id
  );

  return (
    <>
      <Spin spinning={loading}>
        <Row className="col-2 mt-1 mb-1" gutter={8}>
          <Col span={8}>
            <CustomLabel readOnly={readOnly} require label={"SO documents :"} />
          </Col>
          <Col span={16}>
            {readOnly ? (
              <Text className="pre-wrap">{`${so_no_description}`}</Text>
            ) : (
              <>
                <Controller
                  {...{
                    name: `so_id`,
                    control,
                    rules: { required: true },
                    defaultValue: null,
                    render: ({ field }) => {
                      const { onChange } = field;
                      return SelectField({
                        fieldId: "so_id",
                        fieldName: "so_no_description",
                        dataSource: soList || [],
                        fieldProps: {
                          disabled: soListLoading,
                          className: "w-100",
                          placeholder: "SO Document",
                          showSearch: true,
                          allowClear: true,
                          ...field,
                          onChange: (id, obj, index) => {
                            onChange(id || null);
                            // set default
                            setValue("item_so_detail_id", null);
                            setValue("mrp_item_plan_date", null);
                            setValue("mrp_item_qty_produce", 0);
                            setValue("so_detail_id", null);
                            setValue("item_id", null);
                            setValue("so_due_date", null);
                            setValue("type_id", null);
                            setValue("item_ref_id", null);
                            setValue("mrp_item_ref_qty_produce", null);
                            setValue("item_ref_no_name", null);
                            setValue("mrp_item_ref_plan_date", null);
                            setValue("item_set_spec", []);
                            setValue("item_bulk_spec", []);
                            setValue("item_fg_spec", []);
                            setValue("item_routing_spec", []);
                          },
                        },
                      });
                    },
                  }}
                />
                <br />
                {errors?.so_id && (
                  <Text strong className="require">
                    This field is required.
                  </Text>
                )}
              </>
            )}
          </Col>
        </Row>

        <Row className="col-2 mt-1 mb-1" gutter={8}>
          <Col span={8}>
            <CustomLabel readOnly={readOnly} require label={"Item :"} />
          </Col>
          <Col span={16}>
            {readOnly ? (
              <Text className="pre-wrap">{`${item_no_name}`}</Text>
            ) : (
              <>
                <Controller
                  {...{
                    name: `item_so_detail_id`,
                    control,
                    rules: { required: true },
                    defaultValue: item_so_detail_id,
                    render: ({ field }) => {
                      const { onChange } = field;
                      return SelectField({
                        fieldId: "item_so_detail_id",
                        fieldName: "item_no_name",
                        dataSource: itemList?.data || [],
                        fieldProps: {
                          disabled: !so_id || getItemListLoading,
                          className: "w-100",
                          placeholder: "Item",
                          showSearch: true,
                          // allowClear: true,
                          ...field,
                          onChange: (id, { obj }) => {
                            console.log("obj", obj);
                            onChange(id || null);

                            if (obj.type_id !== 4 || !obj.item_ref_id) {
                              setValue("item_ref_id", null);
                              setValue("mrp_item_ref_qty_produce", null);
                              setValue("item_ref_no_name", null);
                              setValue("mrp_item_ref_plan_date", null);
                              unregister([
                                "item_ref_id",
                                "mrp_item_ref_qty_produce",
                                "item_ref_no_name",
                                "mrp_item_ref_plan_date",
                              ]);
                            }

                            setValue(
                              "mrp_item_qty_produce",
                              obj.tg_so_detail_qty_balance
                            );
                            setValue("so_detail_id", obj.so_detail_id);
                            setValue("item_id", obj.item_id);
                            setValue(
                              "so_due_date",
                              obj.so_detail_delivery_date
                            );
                            setValue("type_id", obj.type_id);
                            setValue(
                              "item_so_detail_id",
                              obj.item_so_detail_id
                            );
                            setValue("item_ref_id", obj.item_ref_id);
                            setValue(
                              "mrp_item_ref_qty_produce",
                              obj.mrp_item_ref_qty_produce
                            );
                            setValue("item_ref_no_name", obj.item_ref_no_name);

                            setValue("item_set_spec", []);
                            setValue("item_bulk_spec", []);
                            setValue("item_fg_spec", []);
                            setValue("item_routing_spec", []);
                          },
                        },
                      });
                    },
                  }}
                />
                <br />
                {errors?.item_so_detail_id && (
                  <Text strong className="require">
                    This field is required.
                  </Text>
                )}
              </>
            )}
          </Col>
        </Row>
        <Row className="col-2 mt-1 mb-1" gutter={8}>
          <Col span={8}>
            <CustomLabel readOnly={readOnly} require label={"Plan date :"} />
          </Col>
          <Col span={16}>
            {readOnly ? (
              <>
                <input className="d-none" {...register("mrp_item_plan_date")} />
                <Text className="pre-wrap">{`${mrp_item_plan_date}`}</Text>
              </>
            ) : (
              <>
                <Controller
                  {...{
                    name: `mrp_item_plan_date`,
                    control,
                    rules: { required: true },
                    defaultValue: mrp_item_plan_date,
                    render: ({ field }) => {
                      const { onChange, value } = field;
                      return DatePickerField({
                        fieldProps: {
                          disabled: !item_so_detail_id,
                          className: "w-100",
                          placeholder: "Date Picker",
                          format: "DD/MM/YYYY",
                          value: value ? moment(value, "DD/MM/YYYY") : null,
                          onChange: (date) =>
                            onChange(
                              date ? moment(date).format("DD/MM/YYYY") : null
                            ),
                        },
                      });
                    },
                  }}
                />
                <br />
                {errors?.mrp_item_plan_date && (
                  <Text strong className="require">
                    This field is required.
                  </Text>
                )}
              </>
            )}
          </Col>
        </Row>
        <Row className="col-2 mt-1 mb-1" gutter={8}>
          <Col span={8}>
            <CustomLabel readOnly={readOnly} require label={"Qty. :"} />
          </Col>
          <Col span={16}>
            {readOnly ? (
              <Text className="text-value">{`${mrp_item_qty_produce}`}</Text>
            ) : (
              <Controller
                {...{
                  name: `mrp_item_qty_produce`,
                  control,
                  rules: { required: true },
                  defaultValue: mrp_item_qty_produce,
                  render: ({ field }) => {
                    return InputNumberField({
                      fieldProps: {
                        disabled: !so_id || !item_so_detail_id,
                        className: "w-100",
                        placeholder: "Qty.",
                        min: 0,
                        ...getNumberFormat(6),
                        ...field,
                      },
                    });
                  },
                }}
              />
            )}
            <br />
            {errors?.mrp_item_qty_produce && (
              <Text strong className="require">
                This field is required.
              </Text>
            )}
          </Col>
        </Row>
        {[4].includes(type_id) && (
          <div
            style={{
              backgroundColor: "#F2F2F2",
              padding: 10,
              border: "0.5px solid #cfcfcf",
              borderRadius: 5,
            }}
          >
            {item_ref_id && (
              <div
                className="w-100 text-right mb-2"
                // style={{ backgroundColor: "#c3c3c3" }}
              >
                <Popconfirm
                  onConfirm={() => {
                    setValue("item_ref_id", null);
                    setValue("mrp_item_ref_qty_produce", null);
                    setValue("item_ref_no_name", null);
                    setValue("mrp_item_ref_plan_date", null);
                    unregister([
                      "item_ref_id",
                      "mrp_item_ref_qty_produce",
                      "item_ref_no_name",
                      "mrp_item_ref_plan_date",
                    ]);
                  }}
                  title="ไม่ต้องการผลิต Bulk ใช่หรือไม่ ?"
                  okText="ใช่"
                  cancelText="ยกเลิก"
                >
                  <DeleteOutlined
                    style={{
                      color: "red",
                      fontSize: 20,
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  />
                </Popconfirm>
              </div>
            )}
            <Row className="col-2 mt-1 mb-1" gutter={8}>
              <Col span={8}>
                <CustomLabel readOnly={readOnly} label={"Bulk :"} />
              </Col>
              <Col span={16} className="text-right">
                <>
                  <input className="d-none" {...register("item_ref_id")} />
                  <Text className="pre-wrap">{`${
                    item_ref_no_name || "-"
                  }`}</Text>
                </>
              </Col>
            </Row>

            <Row className="col-2 mt-1 mb-1" gutter={8}>
              <Col span={8}>
                <CustomLabel readOnly={readOnly} label={"Plan date :"} />
              </Col>
              <Col span={16}>
                {readOnly ? (
                  <>
                    <input
                      className="d-none"
                      {...register("mrp_item_ref_plan_date")}
                    />
                    <Text className="pre-wrap">{`${mrp_item_ref_plan_date}`}</Text>
                  </>
                ) : (
                  <>
                    <Controller
                      {...{
                        name: `mrp_item_ref_plan_date`,
                        control,
                        rules: { required: item_ref_id },
                        defaultValue: null,
                        render: ({ field }) => {
                          const { onChange, value } = field;
                          return DatePickerField({
                            fieldProps: {
                              disabled: !item_ref_id,
                              className: "w-100",
                              placeholder: "Date Picker",
                              format: "DD/MM/YYYY",
                              value: value ? moment(value, "DD/MM/YYYY") : null,
                              onChange: (date) =>
                                onChange(
                                  date
                                    ? moment(date).format("DD/MM/YYYY")
                                    : null
                                ),
                            },
                          });
                        },
                      }}
                    />
                    <br />
                    {errors?.mrp_item_ref_plan_date && (
                      <Text strong className="require">
                        This field is required.
                      </Text>
                    )}
                  </>
                )}
              </Col>
            </Row>

            <Row className="col-2 mt-1 mb-1" gutter={8}>
              <Col span={8}>
                <CustomLabel readOnly={readOnly} label={"Qty. :"} />
              </Col>
              <Col span={16}>
                {readOnly ? (
                  <>
                    <input
                      className="d-none"
                      {...register("mrp_item_ref_qty_produce")}
                    />
                    <Text className="text-value">{`${mrp_item_ref_qty_produce}`}</Text>
                  </>
                ) : (
                  <>
                    <Controller
                      {...{
                        name: `mrp_item_ref_qty_produce`,
                        control,
                        rules: { required: item_ref_id },
                        render: ({ field }) => {
                          return InputNumberField({
                            fieldProps: {
                              disabled: !item_ref_id,
                              className: "w-100",
                              placeholder: "Qty.",
                              min: 0,
                              ...getNumberFormat(6),
                              ...field,
                            },
                          });
                        },
                      }}
                    />
                    {errors?.mrp_item_ref_qty_produce && (
                      <Text strong className="require">
                        This field is required.
                      </Text>
                    )}
                  </>
                )}
              </Col>
            </Row>
          </div>
        )}
      </Spin>
      {!readOnly && (
        <Row className="col-2 mt-1 mb-1" gutter={8}>
          <Col span={16} offset={8}>
            <Button
              htmlType="submit"
              type="primary"
              className="w-100"
              disabled={loading}
              loading={loading}
            >
              Calculate Material
            </Button>
          </Col>
        </Row>
      )}
    </>
  );
};

export default React.memo(LeftForm);
