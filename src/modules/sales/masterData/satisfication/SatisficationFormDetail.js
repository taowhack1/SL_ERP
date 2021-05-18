import { DeleteTwoTone, EllipsisOutlined } from "@ant-design/icons";
import { Input, Popconfirm, Switch, Table } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useParams } from "react-router";
import CustomTable from "../../../../components/CustomTable";
import Search from "../../../../components/Search";
const columns = ({
  remove,
  control,
  readOnly,
  fields,
  register,
  setValue,
  id,
  user_name,
}) => [
  {
    title: "Specification.",
    dataIndex: "qa_specification_id",
    align: "left",
    ellipsis: false,
    render: (val, record, index) => {
      return (
        <>
          <input
            {...register(`npr_satisfaction_spec_detail.${index}.user_name`)}
            defaultValue={user_name}
            className="d-none"
          />
          <input
            {...register(
              `npr_satisfaction_spec_detail.${index}.npr_satisfaction_spec_id`
            )}
            htmltype="number"
            className="d-none"
          />
          <input
            {...register(`npr_satisfaction_spec_detail.${index}.category_id`)}
            htmltype="number"
            defaultValue={id}
            className="d-none"
          />
          <Controller
            control={control}
            name={`npr_satisfaction_spec_detail.${index}.npr_satisfaction_spec_name`}
            defaultValue={val}
            render={({ field: { onChange, value } }) => (
              <Input
                onChange={(val) => {
                  onChange(val);
                  setValue(`npr_satisfaction_spec_detail.${index}.commit`, 1);
                }}
                value={value}
                size={"small"}
                disabled={record.npr_satisfaction_spec_actived ? false : true}
              />
            )}
          />
        </>
      );
    },
  },
  {
    title: (
      <Text strong>
        <EllipsisOutlined />
      </Text>
    ),
    dataIndex: "id",
    align: "center",
    width: "5%",
    render: (_, record, index) => {
      if (readOnly) {
        return null;
      } else {
        return record.npr_satisfaction_spec_id !== null ? (
          <Controller
            control={control}
            name={`npr_satisfaction_spec_detail.${index}.npr_satisfaction_spec_actived`}
            render={({ field: { onChange, value } }) => (
              <Switch
                onChange={(val) => {
                  onChange(val);
                  setValue(`npr_satisfaction_spec_detail.${index}.commit`, 1);
                }}
                checked={value}
                size="small"
              />
            )}
          />
        ) : (
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
const SatisficationFormDetail = () => {
  const { id } = useParams();
  const { append, remove, fields, loading, user_name, register, setValue } =
    useFormContext();
  console.log("loading", loading);
  const getRowClassName = (record, index) => {
    let rowClass = "row-table-detail ";
    // rowClass += !record[field.status] ? "row-table-detail-inactive" : "";
    return rowClass;
  };
  console.log("fields ", fields);
  return (
    <>
      <CustomTable
        loading={loading}
        columns={columns({ remove, fields, register, setValue, id, user_name })}
        rowClassName={getRowClassName}
        dataSource={fields}
        rowKey="id"
        pageSize={1000}
        onAdd={() =>
          append({
            npr_satisfaction_spec_id: null,
            npr_satisfaction_spec_name: null,
            category_id: parseInt(id),
            user_name: user_name,
            npr_satisfaction_spec_remark: null,
            npr_satisfaction_spec_name_th: null,
            npr_satisfaction_spec_actived: true,
            commit: 1,
          })
        }
      />
    </>
  );
};

export default SatisficationFormDetail;
