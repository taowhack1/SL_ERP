import { DeleteTwoTone, EllipsisOutlined } from "@ant-design/icons";
import { Input, Popconfirm, Switch, Table } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useParams } from "react-router";
import CustomTable from "../../../../components/CustomTable";
import Search from "../../../../components/Search";
const columns = ({ remove, control, readOnly, fields }) => [
  {
    title: "Specification.",
    dataIndex: "qa_specification_id",
    align: "left",
    ellipsis: false,
    render: (val, record, index) => {
      return (
        <Controller
          control={control}
          name={`npr_satisfaction_spec_detail.${index}.npr_satisfaction_spec_name`}
          defaultValue={val}
          render={({ field }) => <Input {...field} size={"small"} />}
        />
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
    render: (value, record, index) => {
      if (readOnly) {
        return null;
      } else {
        return record.npr_satisfaction_spec_id !== null ? (
          <Switch
            size="small"
            title="Active / In-Active"
            checked={record.npr_satisfaction_spec_actived}
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
  const { append, remove, fields, loading, user_name } = useFormContext();
  console.log("loading", loading);
  const onSearch = (text) => console.log(text);
  const getRowClassName = (record, index) => {
    let rowClass = "row-table-detail ";
    // rowClass += !record[field.status] ? "row-table-detail-inactive" : "";
    return rowClass;
  };

  return (
    <>
      <CustomTable
        title={() => {
          return (
            <div className="text-right table-color">
              <Search className={"half-width"} onSearch={onSearch} />
            </div>
          );
        }}
        sortDirections={["descend"]}
        loading={loading}
        columns={columns({ remove, fields })}
        rowClassName={getRowClassName}
        dataSource={fields}
        rowKey="id"
        pageSize={1000}
        onAdd={() =>
          append({
            npr_satisfaction_spec_id: null,
            npr_satisfaction_spec_name: null,
            category_id: id,
            user_name: user_name,
            npr_satisfaction_spec_remark: null,
            npr_satisfaction_spec_name_th: null,
            commit: 1,
          })
        }
      />
    </>
  );
};

export default SatisficationFormDetail;
