import { Button, Tabs } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { NPRFormContext } from "./RDForm";
import { getNPRFormula } from "../../../../actions/sales/nprActions";
import {
  sortData,
  sortDataWithoutCommit,
} from "../../../../include/js/function_main";
import RDDevelopmentForm from "./RDDevelopmentForm";
const initialState = {
  id: 0,
  npr_id: null,
  user_name: null,
  npr_formula_no: "New Revision",
  npr_formula_remark: null,
  npr_formula_id: null,
  npr_formula_ref_id: null,
  npr_formula_ref_no: null,
  npr_formula_description: null,
  npr_formula_product_no: null,
  npr_formula_product_name: null,
  npr_formula_customer_no: null,
  npr_formula_customer_name: null,
  npr_formula_sample_qty: null,
  npr_formula_product_description: null,
  npr_formula_product_used: null,
  npr_formula_procedure: null,
  commit: 1,
  npr_formula_detail: [
    {
      id: 0,
      npr_formula_detail_part: null,
      npr_formula_detail_percent_qty: 0,
      npr_formula_detail_qty: 0,
      trans_id: null,
      trans_field_id: null,
      npr_formula_detail_remark: null,
      item_no_name: null,
    },
  ],
  npr_formula_qa: [
    {
      id: 0,
      npr_formula_id: null,
      npr_formula_qa_id: null,
      npr_formula_qa_result: null,
      npr_formula_qa_remark: null,
      qa_subject_id: null,
      qa_subject_name: null,
      qa_specification_id: null,
      qa_specification_name: null,
      qa_method_id: null,
      qa_method_name: null,
    },
  ],
};

const RDFormulaList = () => {
  const { id } = useContext(NPRFormContext);
  const [formula, setFormula] = useState([initialState]);
  useEffect(() => {
    const getNPRFormulaList = async (id) => {
      const resp = await getNPRFormula(id);
      if (resp.success) {
        setFormula(sortDataWithoutCommit(resp.data));
      }
    };
    getNPRFormulaList(id);
  }, []);

  const onAddRevision = () =>
    setFormula((prev) => sortData([...prev, initialState]));
  return (
    <>
      <div className="form-section-head d-flex">
        <h3>Formula List</h3>
        {!formula.some((obj) => obj.npr_formula_id === null) && (
          <Button size="small" className="primary ml-2" onClick={onAddRevision}>
            Add Rev.
          </Button>
        )}
      </div>
      <Tabs>
        {formula.map((obj) => (
          <Tabs.TabPane tab={obj.npr_formula_no} key={obj.id}>
            <div className="mb-3">
              <RDDevelopmentForm
                data={{
                  ...obj,
                  npr_formula_detail: sortDataWithoutCommit(
                    obj.npr_formula_detail
                  ),
                  npr_formula_qa: sortDataWithoutCommit(obj.npr_formula_qa),
                }}
                formula={formula}
                setFormula={setFormula}
              />
            </div>
          </Tabs.TabPane>
        ))}
      </Tabs>
    </>
  );
};

export default React.memo(RDFormulaList);
