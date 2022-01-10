import { Col, Row } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  InputNumberField,
  SelectField,
} from "../../../../../components/AntDesignComponent";
import CustomLabel from "../../../../../components/CustomLabel";
import { getNumberFormat } from "../../../../../include/js/main_config";

const LeftForm = () => {
  const {
    register,
    control,
    reset,
    formState: { errors },
    readOnly = false,
  } = useFormContext();
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
                      dataSource: [],
                      fieldProps: {
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
              {errors?.select_id && (
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
            <Text className="pre-wrap">{`SOME_FIELDS`}</Text>
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
                      dataSource: [],
                      fieldProps: {
                        className: "w-100",
                        placeholder: "Item",
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
              {errors?.select_id && (
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
      </Row>

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
                  name: `mrp_item_ref_qty_to_produce`,
                  control,
                  rules: { required: true },
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
              {errors?.select_id && (
                <Text strong className="require">
                  This field is required.
                </Text>
              )}
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default React.memo(LeftForm);
