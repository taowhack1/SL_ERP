import React from "react";
import FormulaDevelopment from "./FormulaDevelopment";
import { Divider } from "antd";
const FormulaList = () => {
  return (
    <div className="mt-3">
      <h3>Formula Development ( การพัฒนาสูตร )</h3>
      <Divider className="divider-sm" />
      <FormulaDevelopment />
    </div>
  );
};

export default React.memo(FormulaList);
