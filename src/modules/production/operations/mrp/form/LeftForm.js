import { Button, Col, Row } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import {
  InputNumberField,
  SelectField,
} from "../../../../../components/AntDesignComponent";
import CustomLabel from "../../../../../components/CustomLabel";
import { getNumberFormat } from "../../../../../include/js/main_config";
import { useFetch } from "../../../../../include/js/customHooks";

const apiSOList = `/list/so`;
const apiItemList = `/production/mrp/item_produce`;

const LeftForm = () => {
  const {
    register,
    control,
    reset,
    formState: { errors },
    readOnly = false,
    watch,
    setValue,
  } = useFormContext();
  // const [so_id, item_so_detail_id, mrp_item_qty_produce] = watch([
  //   "so_id",
  //   "item_so_detail_id",
  //   "mrp_item_qty_produce",
  // ]);
  const [so_id, item_so_detail_id, mrp_item_qty_produce] = useWatch({
    control,
    name: ["so_id", "item_so_detail_id", "mrp_item_qty_produce"],
    defaultValue: [null, null, 0],
  });

  console.log("mrp_item_qty_produce", mrp_item_qty_produce);

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
      <Row className="col-2 mt-1 mb-1" gutter={8}>
        <Col span={8}>
          <CustomLabel readOnly={readOnly} require label={"SO Documents :"} />
        </Col>
        <Col span={16}>
          {readOnly ? (
            <Text className="pre-wrap">{`SOME_FIELDS`}</Text>
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
                        onChange: (id, obj, index) => onChange(id || null),
                        ...field,
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
            <Text className="pre-wrap">{`item_no_name`}</Text>
          ) : (
            <>
              <Controller
                {...{
                  name: `item_so_detail_id`,
                  control,
                  rules: { required: true },
                  defaultValue: null,
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
                        allowClear: true,
                        ...field,
                        onChange: (id, { obj }, index) => {
                          console.log("obj", obj);
                          onChange(id || null);
                          setValue(
                            "mrp_item_qty_produce",
                            obj.tg_so_detail_qty_balance
                          );
                          setValue("so_detail_id", obj.so_detail_id);
                          setValue("item_id", obj.item_id);
                          setValue(
                            "so_detail_delivery_date",
                            obj.so_detail_delivery_date
                          );
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
          <CustomLabel readOnly={readOnly} require label={"Qty. :"} />
        </Col>
        <Col span={16}>
          <>
            <Controller
              {...{
                name: `mrp_item_qty_produce`,
                control,
                rules: { required: true },
                render: ({ field }) => {
                  return InputNumberField({
                    fieldProps: {
                      disabled: !so_id && !item_so_detail_id,
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
            <br />
            {errors?.mrp_item_qty_produce && (
              <Text strong className="require">
                This field is required.
              </Text>
            )}
          </>
        </Col>
      </Row>
      {/* <Row className="col-2 mt-1 mb-1" gutter={8}>
        <Col span={8}>
          <CustomLabel readOnly={readOnly} require label={"Bulk for FG :"} />
        </Col>
        <Col span={16}>
          <Text className="pre-wrap">{`sys_advice_item_ref_qty`}</Text>
        </Col>
      </Row>
      <Row className="col-2 mt-1 mb-1" gutter={8}>
        <Col span={8}>
          <CustomLabel
            readOnly={readOnly}
            require
            label={"Use bulk on stock (uom) :"}
          />
        </Col>
        <Col span={16}>
          <Text className="pre-wrap">{`sys_reserve_item_ref_qty`}</Text>
        </Col>
      </Row> */}
      {/* 
      <Row className="col-2 mt-1 mb-1" gutter={8}>
        <Col span={8}>
          <CustomLabel
            readOnly={readOnly}
            require
            label={"Custom Bulk Production :"}
          />
        </Col>
        <Col span={16}>
          {readOnly ? (
            <Text className="pre-wrap">{`SOME_FIELDS`}</Text>
          ) : (
            <>
              <Controller
                {...{
                  name: `mrp_item_ref_qty_produce`,
                  control,
                  rules: { required: false },
                  defaultValue: null,
                  render: ({ field }) => {
                    return InputNumberField({
                      fieldProps: {
                        className: "w-100",
                        placeholder: "Bulk Qty.",
                        min: 0,
                        max: 100,
                        ...getNumberFormat(6),
                        ...field,
                      },
                    });
                  },
                }}
              />

              <br />
              {errors?.mrp_item_ref_qty_produce && (
                <Text strong className="require">
                  This field is required.
                </Text>
              )}
            </>
          )}
        </Col>
      </Row> */}
      <Row className="col-2 mt-1 mb-1" gutter={8}>
        <Col span={8}></Col>
        <Col span={16}>
          <Button htmlType="submit" type="primary" className="w-100">
            Calculate RPM
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default React.memo(LeftForm);
