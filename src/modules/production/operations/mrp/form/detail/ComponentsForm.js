import { Table } from "antd";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import CustomTable from "../../../../../../components/CustomTable";

const ComponentsForm = (props) => {
  const { fieldName = "components", columns = () => [] } = props || {};
  const {
    dataSource = [],
    loading = false,
    readOnly = false,
    reset,
    register,
  } = useFormContext();
  const { fields } = useFieldArray({
    name: fieldName,
    defaultValue: [],
  });
  console.log("fieldName : ", fieldName);
  console.log("dataSource : ", dataSource);
  console.log("fields : ", fields);
  return (
    <>
      <CustomTable
        bordered
        rowKey="id"
        rowClassName="row-table-detail"
        loading={loading}
        columns={columns({ readOnly, fieldName, register })}
        dataSource={fields}
      />
    </>
  );
};

export default React.memo(ComponentsForm);
