import { Button, Col, Row } from "antd";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { sortData } from "../../../../include/js/function_main";
import { NPRFormContext } from "./RDForm";
import {
  saveNPRFormula,
  saveNPRFormulaRemark,
} from "../../../../actions/sales/nprActions";
import RDDevelopmentTabs from "./rd/RDDevelopmentTabs";
import { useHistory } from "react-router";
import CustomLabel from "../../../../components/CustomLabel";
import CustomSelect from "../../../../components/CustomSelect";
import { useForm, FormProvider } from "react-hook-form";
import { useDispatch } from "react-redux";
import { SET_LOADING } from "../../../../actions/types";
import { formEdit, formView } from "../../../../include/js/formType";

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
const RDDevelopmentForm = ({
  data,
  formula,
  refFormula,
  setFormula,
  isFinished,
  initialState,
}) => {
  const [formMethod, setFormMethod] = useState(formView);
  const [disabledBatchUpdate, setDisabledBatchUpdate] = useState(true);
  const { tg_trans_status_id } = data;

  const {
    id,
    user_name,
    department_id,
    state: mainState,
  } = useContext(NPRFormContext);

  const {
    npr_customer_no: npr_formula_customer_no,
    npr_customer_name: npr_formula_customer_name,
    npr_product_no: npr_formula_product_no,
    npr_product_name: npr_formula_product_name,
    npr_sample_request_qty: npr_formula_sample_qty,
    category_id,
    npr_id,
  } = mainState;

  const formRef = {
    npr_formula_customer_no,
    npr_formula_customer_name,
    npr_formula_product_no,
    npr_formula_product_name,
    npr_formula_sample_qty,
  };
  const status = {
    disabledEdit:
      tg_trans_status_id !== 4 &&
      !isFinished &&
      (user_name === mainState.npr_responsed_required_by || department_id === 1)
        ? false
        : true,
    isFormulaReference: npr_id !== data.npr_id && data.npr_id !== null,
  };

  const [state, setState] = useState(data);
  const methods = useForm({
    defaultValues: {
      npr_formula_remark_detail: sortData(data.npr_formula_remark_detail),
    },
  });

  const {
    npr_formula_detail,
    npr_formula_qa,
    npr_formula_id,
    npr_no: npr_formula_no_ref,
  } = state;

  useEffect(() => {
    console.log("formula data", data);
    if (data.npr_formula_id) {
      setState(data);
      setFormMethod(formView);
    } else {
      setState({
        ...data,
        ...formRef,
      });
      setFormMethod(formEdit);
    }
    methods.reset({
      npr_formula_remark_detail: sortData(data.npr_formula_remark_detail),
    });
  }, [data]);

  const onSubmit = async (data) => {
    console.log("onSubmit", data);
    // if (isFinished) {
    // const saveData = data.npr_formula_remark_detail.filter(
    //   (obj) =>
    //     obj.npr_formula_remark !== null &&
    //     obj.npr_formula_remark_created_by !== null
    // );
    // console.log("remark data", data);
    // console.log("saveData", saveData);
    // const resp2 = await saveNPRFormulaRemark(npr_formula_id, saveData);
    // console.log("sucess", resp2);
    // } else {
    const saveData2 = {
      ...state,
      ...data,
      npr_formula_detail: state.npr_formula_detail.filter(
        (obj) =>
          obj.trans_field_id !== null &&
          obj.trans_id !== null &&
          obj.npr_formula_detail_percent_qty !== null
      ),
      npr_formula_qa: state.npr_formula_qa.filter(
        (obj) => obj.qa_specification_id !== null
      ),
      npr_formula_remark_detail: data.npr_formula_remark_detail.filter(
        (obj) =>
          obj.npr_formula_remark !== null &&
          obj.npr_formula_remark_created_by !== null
      ),
      npr_id: id,
      commit: 1,
      user_name,
    };
    console.log("saveData2", saveData2);
    const resp = await saveNPRFormula(npr_formula_id, saveData2);
    if (resp.success) {
      console.log("resp save", resp);
      const formulaLength = formula.length;
      !saveData2.npr_formula_id
        ? setFormula([
            ...formula.filter((obj) => obj.npr_formula_id !== null),
            { ...resp.data, id: formulaLength - 1 },
          ])
        : setFormula(
            formula.map((obj) =>
              obj.npr_formula_id === saveData2.npr_formula_id
                ? { ...obj, ...resp.data }
                : obj
            )
          );
      setFormMethod(formView);
      setDisabledBatchUpdate(true);
      // }
      console.log(resp.data);
    }
    setFormMethod(formView);
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

  const useFormValue = useMemo(
    () => ({
      onChange,
      state,
      category_id,
    }),
    [onChange, state, category_id]
  );

  const onPrintFormula = () => {
    window.open(
      `${process.env.REACT_APP_REPORT_SERVER}/report_npr_formula.aspx?npr_formula_no=${state.npr_formula_no}`,
      false
    );
  };

  const onPrintLabel = () => {
    window.open(
      `${process.env.REACT_APP_REPORT_SERVER}/report_npr_formula_qr_code.aspx?npr_formula_no=${state.npr_formula_no}`,
      false
    );
  };
  const readOnly = formMethod === formView;
  const formContextValue = useMemo(
    () => ({
      ...methods,
      readOnly,
      npr_formula_id,
      user_name,
      tg_trans_status_id,
      disabledBatchUpdate,
    }),
    [methods, formMethod, tg_trans_status_id, disabledBatchUpdate]
  );
  console.log("readOnly : ", readOnly, " formula :", state);
  return (
    <>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormProvider {...formContextValue}>
          {status.isFormulaReference && (
            <h3>{`Formula From [ ${npr_formula_no_ref} ]`}</h3>
          )}
          {formMethod === formView && disabledBatchUpdate ? (
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
              {((!status.disabledEdit && tg_trans_status_id !== 4) ||
                tg_trans_status_id === 4) && (
                <Button
                  className={"primary"}
                  size="small"
                  loading={false}
                  onClick={() =>
                    tg_trans_status_id !== 4
                      ? setFormMethod(formEdit)
                      : setDisabledBatchUpdate(false)
                  }
                >
                  Edit Form
                </Button>
              )}
            </div>
          ) : (
            <div className="form-section-head d-flex flex-end mb-1 mt-3">
              <>
                <Button
                  htmlType={"submit"}
                  className={"primary"}
                  size="small"
                  loading={false}
                >
                  Save Change
                </Button>
              </>
            </div>
          )}
          {/* {tg_trans_status_id === 4 && disabledBatchUpdate ? (
            <Button
              className={"primary"}
              size="small"
              loading={false}
              onClick={() => setDisabledBatchUpdate(false)}
            >
              Edit Batch Size
            </Button>
          ) : (
            tg_trans_status_id === 4 &&
            !disabledBatchUpdate && (
              <Button
                htmlType={"submit"}
                className={"primary"}
                size="small"
                loading={false}
              >
                Save Change
              </Button>
            )
          )} */}
          {status.disabledEdit && (
            <span className="require">* Pending Sales Accept.</span>
          )}
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
                      disabled={status.disabledEdit}
                      placeholder={"Select Reference Formula"}
                      data={refFormula}
                      field_id="npr_formula_id"
                      field_name="npr_formula_no"
                      value={state?.npr_formula_ref_no}
                      onChange={(val, props) => {
                        val !== null && val !== undefined
                          ? onChange({
                              ...props.data,
                              npr_formula_ref_id: props.data.npr_formula_id,
                              npr_formula_ref_no: props.data.npr_formula_no,
                              npr_formula_detail: sortData(
                                props.data.npr_formula_detail
                              ),
                              npr_formula_qa: sortData(
                                props.data.npr_formula_qa
                              ),
                              npr_formula_id: null,
                              tg_trans_close_id: 1,
                              tg_trans_status_id: 2,
                              commit: 1,
                            })
                          : onChange({ ...initialState, ...formRef });
                      }}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          )}
          <RDDevelopmentTabs
            // readOnly={status.disabledEdit}
            npr_formula_detail={npr_formula_detail}
            npr_formula_qa={npr_formula_qa}
            rdDevFormula={rdDevFormula}
            rdDevQA={rdDevQA}
            useFormValue={useFormValue}
            npr_formula_id={npr_formula_id}
          />
        </FormProvider>
      </form>
    </>
  );
};

export default React.memo(RDDevelopmentForm);
