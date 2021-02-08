import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
const mockupFields = {
  name: "remark",
  value: null,
  placeholder: "Remark",
};
const CustomRemark = ({ fields = mockupFields, saveForm }) => {
  const [state, setState] = useState({
    [fields.name]: fields.value,
  });
  console.log("CustomRemark");
  return (
    <>
      <TextArea
        rows={2}
        name={fields.name}
        placeholder={fields.placeholder ?? "Remark"}
        value={state[fields.name]}
        onChange={(e) => setState({ [fields.name]: e.target.value })}
        onBlur={() => saveForm && saveForm(state)}
        className={"full-width"}
      />
    </>
  );
};

export default React.memo(CustomRemark);
