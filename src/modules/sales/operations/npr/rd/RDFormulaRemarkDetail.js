import { DeleteTwoTone, EllipsisOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Text from "antd/lib/typography/Text";
import React from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";
import CustomLabel from "../../../../../components/CustomLabel";
import CustomTable from "../../../../../components/CustomTable";
import DetailLoading from "../../../../../components/DetailLoading";
const columns = ({ readOnly, remove, control }) => [
  {
    title: (
      <div className="text-center">
        <Text>No.</Text>
      </div>
    ),
    width: "5%",
    align: "center",
    render: (val, record, index) => index + 1,
  },
  {
    title: (
      <div className="text-center">
        <CustomLabel label={"Remark"} require readOnly={readOnly} />
      </div>
    ),
    dataIndex: "npr_formula_remark",
    align: "left",
    ellipsis: true,
    render: (val, record, index) =>
      readOnly ? (
        <div className="text-value">
          <p>{val || "-"}</p>
        </div>
      ) : (
        <Controller
          render={({ field }) => <TextArea {...field} />}
          name={`npr_formula_remark_detail.${index}.npr_formula_remark`}
          defaultValue={val}
          control={control}
        />
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

const RDFormulaRemarkDetail = () => {
  const { loading } = useSelector((state) => state.sales);
  const { control, errors, readOnly, npr_formula_id, user_name } =
    useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "npr_formula_remark_detail",
  });
  const addRow = () =>
    append({
      npr_formula_remark: null,
      npr_formula_remark_active: 1,
      npr_formula_id,
      npr_formula_remark_created_by: user_name,
    });
  console.log(fields);
  return (
    <>
      <div className="form-section ">
        {loading ? (
          <DetailLoading />
        ) : (
          <>
            <CustomTable
              dataSource={fields}
              rowKey={"id"}
              columns={columns({ control, errors, readOnly, remove })}
              pageSize={50}
              rowClassName="row-table-detail"
              onAdd={!readOnly && addRow}
            />
          </>
        )}
      </div>
    </>
  );
};

export default RDFormulaRemarkDetail;
