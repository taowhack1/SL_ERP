import { Tabs } from "antd";
import React from "react";
import RDFormula from "./RDFormula";
import RDTestItem from "../RDTestItem";
import RDFormulaFeedback from "./RDFormulaFeedback";
import RDFormulaGeneralDetail from "./RDFormulaGeneralDetail";
import RDFormulaProcedure from "./RDFormulaProcedure";
import RDFormulaRemarkDetail from "./RDFormulaRemarkDetail";

const RDDevelopmentTabs = ({
  // readOnly,
  npr_formula_detail,
  npr_formula_qa,
  rdDevFormula,
  rdDevQA,
  useFormValue,
  npr_formula_id,
}) => {
  return (
    <>
      <Tabs>
        <Tabs.TabPane tab={"Detail"} key={1}>
          <RDFormulaGeneralDetail
            // readOnly={readOnly}
            useFormValue={useFormValue}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab={"Formula"} key={2}>
          <RDFormulaProcedure
            // readOnly={readOnly}
            useFormValue={useFormValue}
          />
          <RDFormula
            data={npr_formula_detail}
            {...rdDevFormula}
            // readOnly={readOnly}
          />
        </Tabs.TabPane>

        <Tabs.TabPane tab={"QA"} key={3}>
          <RDTestItem
            data={npr_formula_qa}
            {...rdDevQA}
            // readOnly={readOnly}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab={"Remark"} key={4}>
          <RDFormulaRemarkDetail
          // readOnly={false}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab={"Feedback"} key={5}>
          <RDFormulaFeedback
            // readOnly={readOnly}
            npr_formula_id={npr_formula_id}
          />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};

export default React.memo(RDDevelopmentTabs);
