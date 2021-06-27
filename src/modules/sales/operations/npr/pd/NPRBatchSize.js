import {
  DeleteTwoTone,
  EllipsisOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Col, InputNumber, Popconfirm, Row, Table } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useContext } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { InputNumberField } from "../../../../../components/AntDesignComponent";
import CustomTable from "../../../../../components/CustomTable";
import { sortData } from "../../../../../include/js/function_main";
import {
  convertDigit,
  getNumberFormat,
} from "../../../../../include/js/main_config";
import { NPRPDContext } from "./NPRProductionCostForm";
const columns = ({ remove, readOnly = false, onChange, errors }) => [
  {
    title: "No.",
    dataIndex: "id",
    width: "5%",
    align: "center",
    className: "tb-col-sm",
    render: (val, _, index) => val + 1,
  },
  {
    title: (
      <div className="text-center">
        <Text>Batch Size</Text>
      </div>
    ),
    dataIndex: "npr_product_cost_detail_batch_size",
    align: "right",
    className: "tb-col-sm",
    render: (val, record, key) => (
      <>
        {readOnly ? (
          <Text>{convertDigit(val, 4)}</Text>
        ) : (
          <>
            <InputNumber
              name="npr_product_cost_detail_batch_size"
              placeholder="Batch Size"
              min={0}
              step={1}
              value={val}
              onChange={(data) => {
                onChange(record.id, {
                  npr_product_cost_detail_batch_size: data,
                });
              }}
              size="small"
              className="full-width"
              {...getNumberFormat(4)}
            />
            {errors && errors?.npr_product_cost_detail_batch_size && (
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
        <Text>{convertDigit(val, 4)}</Text>
      ) : (
        <>
          <InputNumber
            name="npr_product_cost_detail_fg_qty"
            placeholder="FG Qty"
            min={0}
            step={1}
            value={val}
            onChange={(data) => {
              onChange(record.id, {
                npr_product_cost_detail_fg_qty: data,
              });
            }}
            size="small"
            className="full-width"
            {...getNumberFormat(4)}
          />
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
        <Text>{convertDigit(val, 4)}</Text>
      ) : (
        <>
          <InputNumber
            name="npr_product_cost_detail_cost"
            placeholder="Cost"
            min={0}
            step={1}
            value={val}
            onChange={(data) => {
              onChange(record.id, {
                npr_product_cost_detail_cost: data,
              });
            }}
            size="small"
            className="full-width"
            {...getNumberFormat(4)}
          />
        </>
      ),
  },
  // {
  //   title: (
  //     <Text strong>
  //       <EllipsisOutlined />
  //     </Text>
  //   ),
  //   align: "center",
  //   dataIndex: "id",
  //   width: "5%",
  //   render: (value, record, index) => {
  //     if (readOnly) {
  //       return null;
  //     } else {
  //       return (
  //         <Popconfirm
  //           onConfirm={() => {
  //             remove(value);
  //           }}
  //           title="Are you sure you want to delete this row？"
  //           okText="Yes"
  //           cancelText="No"
  //         >
  //           <DeleteTwoTone />
  //         </Popconfirm>
  //       );
  //     }
  //   },
  // },
];
const initialState = {
  npr_product_cost_detail_batch_size: null,
  npr_product_cost_detail_fg_qty: null,
  npr_product_cost_detail_cost: null,
  npr_product_cost_detail_remark: null,
  uom_id: null,
};
const NPRBatchSize = () => {
  const { batchSize, setBatchSize, readOnly, PDEmp } = useContext(NPRPDContext);

  const append = () =>
    setBatchSize((prev) => sortData([...prev, initialState]));
  const remove = (id) =>
    setBatchSize((prev) => sortData(prev.filter((obj) => obj.id !== id)));
  const onChange = (id, data) =>
    setBatchSize((prev) =>
      prev.map((obj) => (obj.id === id ? { ...obj, ...data } : obj))
    );
  console.log("BatchSize", batchSize);
  return (
    <>
      <div className="under-line mb-1 d-flex flex-start flex-row">
        <Text strong>Batch Size</Text>
        {/* {!readOnly && (
          <Button className="ml-2 primary" size="small" onClick={append}>
            <PlusOutlined />
            Add Batch Size
          </Button>
        )} */}
      </div>

      <CustomTable
        columns={columns({ remove, readOnly, onChange })}
        dataSource={batchSize}
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
