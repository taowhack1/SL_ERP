import Text from "antd/lib/typography/Text";
import React, { useContext } from "react";
import {
  Controller,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";
import CustomLabel from "../../../../../components/CustomLabel";
import CustomTable from "../../../../../components/CustomTable";
import {
  convertDigit,
  getNumberFormat,
} from "../../../../../include/js/main_config";
import { InputNumber } from "antd";
import { NPRPDContext } from "./NPRProductionCostForm";
const columns = ({ readOnly, errors, onChange }) => [
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
    dataIndex: "npr_price_detail_waste_percent_qty",
    align: "right",
    width: "20%",
    className: "tb-col-sm",
    render: (val, record, key) =>
      readOnly ? (
        <Text>{convertDigit(val || 0, 4)}</Text>
      ) : (
        <>
          <InputNumber
            name="npr_price_detail_waste_percent_qty"
            placeholder="% Waste"
            min={0}
            step={1}
            value={val}
            onChange={(data) => {
              onChange(record.id, {
                npr_price_detail_waste_percent_qty: data,
              });
            }}
            size="small"
            className="full-width"
            {...getNumberFormat(4)}
          />
        </>
      ),
  },
];
const NPRItemPKList = () => {
  const { packaging, setPackaging, readOnly } = useContext(NPRPDContext);
  const onChange = (id, data) =>
    setPackaging((prev) =>
      prev.map((obj) => (obj.id === id ? { ...obj, ...data } : obj))
    );
  console.log("formula", packaging);
  return (
    <>
      <div className="under-line mb-1">
        <Text strong>Packaging</Text>
      </div>
      <CustomTable
        columns={columns({
          onChange,
          readOnly,
        })}
        dataSource={packaging}
        bordered
        rowKey={"id"}
        pagination={false}
        rowClassName="row-table-detail"
      />
    </>
  );
};

export default React.memo(NPRItemPKList);
