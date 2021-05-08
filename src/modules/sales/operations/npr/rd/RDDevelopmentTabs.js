import { Tabs } from "antd";
import React from "react";
import RDFormula from "../RDFormula";
import RDTestItem from "../RDTestItem";
import RDFormulaGeneralDetail from "./RDFormulaGeneralDetail";
import RDFormulaProcedure from "./RDFormulaProcedure";

const RDDevelopmentTabs = ({
  readOnly,
  npr_formula_detail,
  npr_formula_qa,
  rdDevFormula,
  rdDevQA,
  useFormValue,
}) => {
  return (
    <>
      <Tabs>
        <Tabs.TabPane tab={"Detail"} key={1}>
          <RDFormulaGeneralDetail
            readOnly={readOnly}
            useFormValue={useFormValue}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab={"Formula"} key={2}>
          <RDFormulaProcedure readOnly={readOnly} useFormValue={useFormValue} />
          <RDFormula
            data={npr_formula_detail}
            {...rdDevFormula}
            readOnly={readOnly}
          />
        </Tabs.TabPane>

        <Tabs.TabPane tab={"QA"} key={3}>
          <RDTestItem data={npr_formula_qa} {...rdDevQA} readOnly={readOnly} />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};

export default React.memo(RDDevelopmentTabs);
