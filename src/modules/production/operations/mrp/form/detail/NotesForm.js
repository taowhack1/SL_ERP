import Text from "antd/lib/typography/Text";
import React from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { TextAreaField } from "../../../../../../components/AntDesignComponent";

const NotesForm = () => {
  const { control, readOnly = false } = useFormContext();
  const [mrp_remark] = useWatch({
    control,
    name: ["mrp_remark"],
    defaultValue: "-",
  });
  return (
    <>
      {readOnly ? (
        <Text className="text-value">{`${mrp_remark}`}</Text>
      ) : (
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
      )}
    </>
  );
};

export default React.memo(NotesForm);
