import {
  DeleteTwoTone,
  EllipsisOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Col, InputNumber, Popconfirm, Row, Table } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { InputNumberField } from "../../../../../components/AntDesignComponent";
import CustomTable from "../../../../../components/CustomTable";
import {
  convertDigit,
  getNumberFormat,
} from "../../../../../include/js/main_config";
const columns = ({ remove, readOnly = false, error, control }) => [
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
        <Text>Batch Size</Text>
      </div>
    ),
    dataIndex: "batch_size",
    align: "right",
    className: "tb-col-sm",
    render: (val, record, key) => (
      <>
        {readOnly ? (
          <Text>{convertDigit(val, 3)}</Text>
        ) : (
          <>
            <Controller
              control={control}
              name={`npr_product_cost_detail.${key}.npr_product_cost_detail_batch_size`}
              render={({ field }) =>
                InputNumberField({
                  fieldProps: {
                    ...getNumberFormat(3),
                    placeholder: "Batch Size",
                    step: 50,
                    min: 0,
                    size: "small",
                    className: "full-width",
                    ...field,
                  },
                })
              }
              defaultValue={val}
            />
            {error && error?.npr_product_cost_response_date && (
              <span className="require">This field is required.</span>
            )}
          </>
        )}
      </>
    ),
  },
  {
    title: (
      <div className="text-center">
        <Text>FG Qty</Text>
      </div>
    ),
    dataIndex: "npr_product_cost_detail_fg_qty",
    align: "right",
    className: "tb-col-sm",
    render: (val, record, key) =>
      readOnly ? (
        <Text>{convertDigit(val, 3)}</Text>
      ) : (
        <>
          <Controller
            control={control}
            name={`npr_product_cost_detail.${key}.npr_product_cost_detail_fg_qty`}
            render={({ field }) =>
              InputNumberField({
                fieldProps: {
                  ...getNumberFormat(3),
                  placeholder: "Batch Size",
                  step: 1,
                  min: 0,
                  size: "small",
                  className: "full-width",
                  ...field,
                },
              })
            }
            defaultValue={val}
          />
          {error && error?.npr_product_cost_response_date && (
            <span className="require">This field is required.</span>
          )}
        </>
      ),
  },
  {
    title: (
      <div className="text-center">
        <Text>Cost</Text>
      </div>
    ),
    dataIndex: "npr_product_cost_detail_cost",
    align: "right",
    className: "tb-col-sm",
    render: (val, record, key) =>
      readOnly ? (
        <Text>{convertDigit(val, 3)}</Text>
      ) : (
        <>
          <Controller
            control={control}
            name={`npr_product_cost_detail.${key}.npr_product_cost_detail_cost`}
            render={({ field: { value, onChange } }) =>
              InputNumberField({
                fieldProps: {
                  ...getNumberFormat(3),
                  placeholder: "Cost",
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
          />
          {error && error?.npr_product_cost_response_date && (
            <span className="require">This field is required.</span>
          )}
        </>
      ),
  },
  {
    title: (
      <Text strong>
        <EllipsisOutlined />
      </Text>
    ),
    align: "center",
    width: "5%",
    render: (value, record, index) => {
      if (readOnly) {
        return null;
      } else {
        return (
          <Popconfirm
            onConfirm={() => {
              remove(index);
            }}
            title="Are you sure you want to delete this row？"
            okText="Yes"
            cancelText="No"
          >
            <DeleteTwoTone />
          </Popconfirm>
        );
      }
    },
  },
];
const initialState = {
  npr_product_cost_detail_batch_size: null,
  npr_product_cost_detail_fg_qty: null,
  npr_product_cost_detail_cost: null,
  npr_product_cost_detail_remark: null,
  uom_id: null,
};
const NPRBatchSize = () => {
  const {
    formMethod: { control, register, formState: error },
    readOnly,
    PDEmp,
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "npr_product_cost_detail",
  });

  console.log("BatchSize", fields);
  return (
    <>
      <div className="under-line mb-1 d-flex flex-start flex-row">
        <Text strong>Batch Size</Text>
        {!readOnly && (
          <Button
            className="ml-2 primary"
            size="small"
            onClick={() => append(initialState)}
          >
            <PlusOutlined />
            Add Batch Size
          </Button>
        )}
      </div>

      <CustomTable
        columns={columns({ remove, control, register, error, readOnly })}
        dataSource={fields}
        bordered
        rowKey={"id"}
        className="w-50 table-detail"
        pagination={false}
        rowClassName="row-table-detail"
      />
    </>
  );
};

export default React.memo(NPRBatchSize);
