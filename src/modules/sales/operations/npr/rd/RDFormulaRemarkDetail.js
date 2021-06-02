import { DeleteTwoTone, EllipsisOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Text from "antd/lib/typography/Text";
import React from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import CustomLabel from "../../../../../components/CustomLabel";
import CustomTable from "../../../../../components/CustomTable";
import moment from "moment";
const columns = ({ readOnly, remove, control, register, user_name }) => [
  {
    title: (
      <div className="text-center">
        <Text>No.</Text>
      </div>
    ),
    width: "5%",
    align: "center",
    render: (index) => index + 1,
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
      record.npr_formula_remark_created_by !== user_name ? (
        <div>{val || "-"}</div>
      ) : (
        <>
          <input
            {...register(`npr_formula_remark_detail.${index}.npr_formula_id`)}
            className="d-none"
          />
          <input
            {...register(
              `npr_formula_remark_detail.${index}.npr_formula_remark_created_by`
            )}
            className="d-none"
          />
          <input
            {...register(
              `npr_formula_remark_detail.${index}.npr_formula_remark_active`
            )}
            className="d-none"
          />
          <Controller
            render={({ field }) => <TextArea {...field} />}
            name={`npr_formula_remark_detail.${index}.npr_formula_remark`}
            defaultValue={val}
            control={control}
          />
        </>
      ),
  },
  {
    title: (
      <div className="text-center">
        <CustomLabel label={"Date"} readOnly={readOnly} />
      </div>
    ),
    dataIndex: "npr_formula_remark_created",
    align: "center",
    width: "10%",
    ellipsis: true,
    render: (val, record, index) =>
      val ? (
        <div className="text-value">
          <p>{val || "-"}</p>
        </div>
      ) : (
        <>{moment().format("DD/MM/YYYY")}</>
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
      return user_name !== record.npr_formula_remark_created_by ? null : (
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
    },
  },
];

const RDFormulaRemarkDetail = () => {
  const { control, errors, npr_formula_id, user_name, register, readOnly } =
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
  return (
    <>
      <div className="form-section">
        <>
          <CustomTable
            dataSource={fields}
            rowKey={"id"}
            columns={columns({
              control,
              errors,
              readOnly,
              remove,
              register,
              user_name,
            })}
            pageSize={50}
            rowClassName="row-table-detail"
            onAdd={!readOnly && addRow}
          />
        </>
      </div>
    </>
  );
};

export default React.memo(RDFormulaRemarkDetail);
