import Text from "antd/lib/typography/Text";
import React from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { InputNumberField } from "../../../../../components/AntDesignComponent";
import CustomLabel from "../../../../../components/CustomLabel";
import CustomTable from "../../../../../components/CustomTable";
import {
  convertDigit,
  getNumberFormat,
} from "../../../../../include/js/main_config";
const columns = ({ control, readOnly, register, errors }) => [
  {
    title: "No.",
    dataIndex: "id",
    width: "5%",
    align: "center",
    className: "tb-col-sm",
    render: (val, _, index) => index + 1,
  },
  {
    title: (
      <div className="text-center">
        <Text>Item</Text>
      </div>
    ),
    dataIndex: "item_no_name",
    align: "left",
    ellipsis: true,
    className: "tb-col-sm",
  },
  {
    title: (
      <div className="text-center">
        <CustomLabel require readOnly={readOnly} label={"% Waste"} />
      </div>
    ),
    dataIndex: "npr_product_cost_waste_percent_qty",
    align: "right",
    width: "20%",
    className: "tb-col-sm",
    render: (val, record, key) =>
      readOnly ? (
        <Text>{convertDigit(val || 0, 3)}</Text>
      ) : (
        <>
          <input
            {...register(`npr_formula_detail.${key}.npr_formula_detail_id`)}
            className="d-none"
          />
          <Controller
            control={control}
            name={`npr_formula_detail.${key}.npr_formula_detail_waste_percent_qty`}
            render={({ field: { value, onChange } }) =>
              InputNumberField({
                fieldProps: {
                  ...getNumberFormat(4),
                  placeholder: "% Waste",
                  step: 1,
                  min: 0,
                  size: "small",
                  className: "full-width",
                  value,
                  onChange: (val) => onChange(val),
                },
              })
            }
            defaultValue={val}
            rules={{ required: true }}
          />
          {errors &&
            errors?.npr_formula_detail?.key
              ?.npr_formula_detail_waste_percent_qty && (
              <span className="require">This field is required.</span>
            )}
        </>
      ),
  },
];
const NPRItemRMList = () => {
  const {
    formMethod: { control, register, errors, watch },
    readOnly,
  } = useFormContext();
  const { fields: formula } = useFieldArray({
    control: control,
    name: "npr_formula_detail",
  });
  const { fields: packaging } = useFieldArray({
    control: control,
    name: "npr_price_detail",
  });
  console.log("packaging", packaging);
  console.log("formula", formula);
  // const { npr_formula_procedure } = watch();
  return (
    <>
      <div className="under-line mb-1">
        <Text strong>Procedure :</Text>
      </div>
      {/* <p className="pre-wrap pd-left-2">{`${npr_formula_procedure}`}</p> */}

      <div className="under-line mb-1">
        <Text strong>Formula</Text>
      </div>
      <CustomTable
        columns={columns({
          control,
          register,
          errors,
          readOnly,
        })}
        dataSource={formula}
        bordered
        rowKey={"id"}
        pagination={false}
        rowClassName="row-table-detail"
      />
    </>
  );
};

export default React.memo(NPRItemRMList);
