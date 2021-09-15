import { Button, Tabs } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { NPRFormContext } from "../NPRViewById";
import {
  getNPRAllRevisionFormula,
  getNPRFormula,
} from "../../../../../actions/sales/nprActions";
import {
  sortData,
  sortDataWithoutCommit,
} from "../../../../../include/js/function_main";
import RDDevelopmentForm from "./RDDevelopmentForm";
const initialState = {
  id: 0,
  commit: 1,
  category_id: null,
  npr_created: null,
  npr_created_by_name: null,
  npr_created_by_no_name: null,
  npr_formula_actived: 1,
  npr_formula_created_by: null,
  npr_formula_customer_name: null,
  npr_formula_customer_no: null,
  npr_formula_customer_no_name: null,
  npr_formula_delivery_date: null,
  npr_formula_description: null,
  npr_formula_detail: null,
  npr_formula_id: null,
  npr_formula_no: "New Revision",
  npr_formula_procedure: null,
  npr_formula_product_description: null,
  npr_formula_product_name: null,
  npr_formula_product_no: null,
  npr_formula_product_no_name: null,
  npr_formula_product_used: null,
  npr_formula_qa: null,
  npr_formula_ref_id: null,
  npr_formula_ref_no: null,
  npr_formula_remark: null,
  npr_formula_running_no: null,
  npr_formula_sample_qty: null,
  npr_formula_updated_by: null,
  npr_id: null,
  npr_no: null,
  npr_updated: null,
  npr_updated_by_name: null,
  npr_updated_by_no_name: null,
  smd_item_cmt_category_id: null,
  smd_item_cmt_category_name: null,
  smd_item_cmt_type_id: null,
  smd_item_cmt_type_name: null,
  smd_item_cmt_used_area_id: null,
  smd_item_cmt_used_area_name: null,
  smd_item_sp_category_id: null,
  smd_item_sp_category_name: null,
  smd_item_sp_properties_id: null,
  smd_item_sp_properties_name: null,
  smd_item_sp_taste_id: null,
  smd_item_sp_taste_name: null,
  tg_trans_close_id: 1,
  tg_trans_status_id: 2,
  trans_close_name: null,
  trans_close_no: null,
  trans_close_no_name: null,
  trans_status_name: null,
  trans_status_no: null,
  trans_status_no_name: null,
  user_name: null,
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
  npr_formula_remark_detail: [],
};

const RDFormulaList = () => {
  const {
    id,
    user_name,
    department_id,
    state: mainState,
  } = useContext(NPRFormContext);
  const { category_id, npr_running_id, npr_id } = mainState;
  const [formula, setFormula] = useState([initialState]);
  const [refFormula, setRefFormula] = useState([]);
  useEffect(() => {
    const getNPRFormulaList = async (id) => {
      const resp = await getNPRFormula(id);
      if (resp.success) {
        console.log("getNPRFormulaList", resp);
        setFormula(sortDataWithoutCommit(resp.data));
      }
      const getNPRFormulaRef = async (npr_running_id) => {
        const resp2 = await getNPRAllRevisionFormula(npr_running_id);
        if (resp2.success) {
          setRefFormula(sortDataWithoutCommit(resp2.data));
        }
        console.log("getNPRFormulaRef", resp2);
      };
      getNPRFormulaRef(npr_running_id);
    };

    getNPRFormulaList(id);
  }, [id, npr_running_id]);

  const onAddRevision = () =>
    setFormula((prev) => sortData([...prev, { ...initialState, category_id }]));

  const isFinished = formula.some(
    (obj) =>
      obj.npr_formula_id !== null &&
      obj.tg_trans_status_id === 4 &&
      obj.npr_id === npr_id
  );
  return (
    <>
      <div className="form-section-head d-flex flex-start">
        <h3>Formula List</h3>
        {!formula.some((obj) => obj.npr_formula_id === null) &&
          !isFinished &&
          (user_name === mainState.npr_responsed_required_by ||
            department_id === 1) && (
            <Button
              size="small"
              className="primary ml-2"
              onClick={onAddRevision}
            >
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
                refFormula={refFormula}
                setFormula={setFormula}
                isFinished={isFinished}
                initialState={initialState}
              />
            </div>
          </Tabs.TabPane>
        ))}
      </Tabs>
    </>
  );
};

export default React.memo(RDFormulaList);
