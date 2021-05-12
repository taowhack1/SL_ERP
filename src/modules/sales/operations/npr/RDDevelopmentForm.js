import { Button, Col, Row } from "antd";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { sortData } from "../../../../include/js/function_main";
import { NPRFormContext } from "./RDForm";
import { saveNPRFormula } from "../../../../actions/sales/nprActions";
import RDDevelopmentTabs from "./rd/RDDevelopmentTabs";
import { useHistory } from "react-router";
import CustomLabel from "../../../../components/CustomLabel";
import CustomSelect from "../../../../components/CustomSelect";
import { report_server } from "../../../../include/js/main_config";
const initialState = {
  id: 0,
  npr_id: null,
  user_name: null,
  npr_formula_no: "New Revision",
  npr_formula_remark: null,
  npr_formula_ref_id: null,
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
};
const initialStateFormula = {
  id: 0,
  npr_formula_detail_part: null,
  npr_formula_detail_percent_qty: 0,
  npr_formula_detail_qty: 0,
  trans_id: null,
  trans_field_id: null,
  npr_formula_detail_remark: null,
  item_no_name: null,
};
const initialStateFormulaQA = {
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
};
const RDDevelopmentForm = ({ data, formula, setFormula }) => {
  const history = useHistory();
  const { id, user_name, state: mainState } = useContext(NPRFormContext);
  console.log("mainState", mainState);
  const {
    npr_customer_no: npr_formula_customer_no,
    npr_customer_name: npr_formula_customer_name,
    npr_product_no: npr_formula_product_no,
    npr_product_name: npr_formula_product_name,
    npr_sample_request_qty: npr_formula_sample_qty,
    //     tg_trans_close_id,
    // tg_trans_status_id
  } = mainState;
  const formRef = {
    npr_formula_customer_no,
    npr_formula_customer_name,
    npr_formula_product_no,
    npr_formula_product_name,
    npr_formula_sample_qty,
  };
  const { tg_trans_close_id, tg_trans_status_id } = data;
  console.log("initial formula data", data);
  // const disabledEdit = tg_trans_status_id !== 4 && tg_trans_close_id !== 3 ? false : true
  const disabledEdit = tg_trans_status_id !== 4 ? false : true;
  const [state, setState] = useState(data);
  const { npr_formula_detail, npr_formula_qa, npr_formula_id } = state;

  useEffect(() => {
    setState({
      ...data,
      ...formRef,
    });
  }, [data]);

  const onSubmit = async () => {
    const saveData = {
      ...state,
      npr_id: id,
      commit: 1,
      user_name,
    };
    console.log("saveData", saveData);
    const resp = await saveNPRFormula(npr_formula_id, saveData);
    if (resp.success) {
      const formulaLength = formula.length;
      !saveData.npr_formula_id &&
        setFormula([
          ...formula.filter((obj) => obj.npr_formula_id !== null),
          { ...resp.data, id: formulaLength - 1 },
        ]);
    }
    console.log(resp.data);
  };
  const onChange = (data) => {
    console.log("onChange", data);
    setState((prev) => ({ ...prev, ...data, commit: 1, user_name }));
  };

  const rdDevFormula = useMemo(() => {
    const onChangeHead = (data) =>
      setState((prev) => ({ ...prev, ...data, commit: 1 }));
    const onChangeFormula = (id, data) =>
      setState((prev) => ({
        ...prev,
        npr_formula_detail: prev.npr_formula_detail.map((obj) =>
          obj.id === id ? { ...obj, ...data, commit: 1 } : obj
        ),
      }));
    const onAddRowFormula = () =>
      setState((prev) => ({
        ...prev,
        npr_formula_detail: sortData([
          ...prev.npr_formula_detail,
          initialStateFormula,
        ]),
      }));
    const onDeleteRowFormula = (id) =>
      setState((prev) => ({
        ...prev,
        npr_formula_detail: sortData(
          prev.npr_formula_detail.filter((obj) => obj.id !== id)
        ),
      }));
    const setFormula = (data) =>
      setState((prev) => ({
        ...prev,
        npr_formula_detail: sortData(data),
      }));
    return {
      onChangeHead,
      onChangeFormula,
      onAddRowFormula,
      onDeleteRowFormula,
      state: data,
      setFormula,
    };
  }, [state.npr_formula_detail, setState]);
  const rdDevQA = useMemo(() => {
    const onChangeHead = (data) =>
      setState((prev) => ({ ...prev, ...data, commit: 1 }));
    const onChangeQA = (id, data) =>
      setState((prev) => ({
        ...prev,
        npr_formula_qa: prev.npr_formula_qa.map((obj) =>
          obj.id === id ? { ...obj, ...data, commit: 1 } : obj
        ),
      }));

    const onAddRowQA = () =>
      setState((prev) => ({
        ...prev,
        npr_formula_qa: sortData([
          ...prev.npr_formula_qa,
          initialStateFormulaQA,
        ]),
      }));

    const onDeleteRowQA = (id) =>
      setState((prev) => ({
        ...prev,
        npr_formula_qa: sortData(
          prev.npr_formula_qa.filter((obj) => obj.id !== id)
        ),
      }));
    const setQA = (data) =>
      setState((prev) => ({
        ...prev,
        npr_formula_qa: sortData(data),
      }));
    return {
      onChangeHead,
      onChangeQA,
      onAddRowQA,
      onDeleteRowQA,
      setQA,
      state: data,
    };
  }, [state.npr_formula_qa, setState]);

  const useFormValue = {
    onChange,
    state,
  };
  const onPrintFormula = () => {
    window.open(
      `${report_server}/report_npr_formula.aspx?npr_formula_no=${state.npr_formula_no}`,
      false
    );
  };
  const onPrintLabel = () => {
    window.open("//www.youtube.com", false);
  };

  console.log("disabledEdit :", disabledEdit, formula);
  return (
    <>
      <div className="form-section-head flex-space mb-1 mt-3">
        <div className="button-group">
          <Button
            size="small"
            loading={false}
            disabled={npr_formula_id ? false : true}
            onClick={onPrintFormula}
          >
            Print Formula
          </Button>
          <Button
            size="small"
            loading={false}
            disabled={npr_formula_id ? false : true}
            onClick={onPrintLabel}
          >
            Print QR Code
          </Button>
        </div>
        <Button
          onClick={onSubmit}
          disabled={disabledEdit}
          className={disabledEdit ? "btn-disabled" : "primary"}
          size="small"
          loading={false}
        >
          Save Change
        </Button>
      </div>
      {disabledEdit && <span className="require">* Pending sales accept.</span>}
      {!npr_formula_id && (
        <Row className="col-2 row-margin-vertical">
          <Col span={12}>
            <Row className="col-2 row-margin-vertical">
              <Col span={8}>
                <CustomLabel label="Ref. Formula :" />
              </Col>
              <Col span={16}>
                <CustomSelect
                  allowClear
                  showSearch
                  placeholder={"Select Reference Formula"}
                  data={formula.filter((obj) => obj.npr_formula_id !== null)}
                  field_id="npr_formula_id"
                  field_name="npr_formula_no"
                  value={state?.npr_formula_ref_no}
                  onChange={(val, props) => {
                    const {
                      npr_formula_id,
                      npr_formula_no,
                      npr_formula_detail,
                      npr_formula_qa,
                      npr_formula_customer_no,
                      npr_formula_customer_name,
                      npr_formula_product_no,
                      npr_formula_product_name,
                      npr_formula_sample_qty,
                      npr_formula_product_used,
                      npr_formula_product_description,
                      npr_formula_procedure,
                    } = props.data;
                    val !== null || val !== undefined
                      ? onChange({
                          npr_formula_ref_id: npr_formula_id,
                          npr_formula_ref_no: npr_formula_no,
                          npr_formula_detail: sortData(npr_formula_detail),
                          npr_formula_qa: sortData(npr_formula_qa),
                          npr_formula_customer_no,
                          npr_formula_customer_name,
                          npr_formula_product_no,
                          npr_formula_product_name,
                          npr_formula_sample_qty,
                          npr_formula_product_used,
                          npr_formula_product_description,
                          npr_formula_procedure,
                          commit: 1,
                        })
                      : onChange({
                          npr_formula_ref_id: null,
                          npr_formula_ref_no: null,
                          npr_formula_detail: null,
                          npr_formula_qa: null,
                          npr_formula_procedure: null,
                          ...formRef,
                        });
                  }}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      )}
      <RDDevelopmentTabs
        readOnly={disabledEdit}
        npr_formula_detail={npr_formula_detail}
        npr_formula_qa={npr_formula_qa}
        rdDevFormula={rdDevFormula}
        rdDevQA={rdDevQA}
        useFormValue={useFormValue}
      />
    </>
  );
};

export default React.memo(RDDevelopmentForm);
