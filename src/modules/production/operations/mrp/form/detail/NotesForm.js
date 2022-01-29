import { Row } from "antd";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextAreaField } from "../../../../../../components/AntDesignComponent";

const NotesForm = () => {
  const { control, readOnly = false } = useFormContext();
  return (
    <>
      <Controller
        {...{
          name: `mrp_remark`,
          control,
          rules: { required: false },
          defaultValue: null,
          render: ({ field }) => {
            return TextAreaField({
              fieldProps: {
                className: "w-100",
                placeholder: "Remark",
                ...field,
              },
            });
          },
        }}
      />
    </>
  );
};

export default React.memo(NotesForm);
