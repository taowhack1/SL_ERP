import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import CustomTable from "../../../../../../components/CustomTable";

const ComponentsForm = (props) => {
  const { fieldName = "components", columns = () => [] } = props || {};
  const { readOnly = false, register, control, loading } = useFormContext();
  const { fields } = useFieldArray({
    control,
    name: fieldName,
    defaultValue: [],
  });

  return (
    <>
      <CustomTable
        bordered
        rowKey="id"
        rowClassName="row-table-detail"
        loading={loading}
        columns={columns({ readOnly, fieldName, register, control })}
        dataSource={fields}
        pageSize={999}
      />
    </>
  );
};

export default React.memo(ComponentsForm);