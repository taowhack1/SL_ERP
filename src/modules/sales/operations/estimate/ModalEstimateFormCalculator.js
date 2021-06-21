import { Button, message } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useContext, useEffect, useState } from "react";
import {
  getEstimateCalculate,
  saveEstimate,
} from "../../../../actions/sales/nprActions";
import { NPREstimateContext } from "./EstimateForm";
import EstimateFormBatch from "./EstimateFormBatch";
const initialState = {
  npr_estimate_detail_id: null,
  npr_estimate_detail_active: true,
  tg_npr_estimate_detail_total_amount: 0,
  npr_estimate_id: null,
  npr_estimate_detal_id: null,
  npr_product_cost_detail_id: null,
  npr_product_cost_detail_batch_size: 0,
  npr_product_cost_detail_fg_qty: 0,
  npr_product_cost_detail_cost: 0,
  npr_estimate_detail_sub: [
    {
      npr_id: null,
      npr_formula_id: null,
      npr_product_cost_detail_id: null,
      npr_product_cost_detail_batch_size: null,
      npr_estimate_type_id: 1,
      npr_estimate_detail_sub_remark: null,
      npr_estimate_detail_sub_amount: 0,
      npr_estimate_detail_sub_waste_percent_qty: 0,
      npr_estimate_detail_sub_mark_up_percent_qty: 0,
      npr_estimate_detail_sub_total: 0,
      npr_estimate_detail_sub_total_amount: 0,
    },
    {
      npr_id: null,
      npr_formula_id: null,
      npr_product_cost_detail_id: null,
      npr_product_cost_detail_batch_size: null,
      npr_estimate_type_id: 2,
      npr_estimate_detail_sub_remark: null,
      npr_estimate_detail_sub_amount: 0,
      npr_estimate_detail_sub_waste_percent_qty: 0,
      npr_estimate_detail_sub_mark_up_percent_qty: 0,
      npr_estimate_detail_sub_total: 0,
      npr_estimate_detail_sub_total_amount: 0,
    },
    {
      npr_id: null,
      npr_formula_id: null,
      npr_product_cost_detail_id: null,
      npr_product_cost_detail_batch_size: null,
      npr_estimate_type_id: 3,
      npr_estimate_detail_sub_remark: null,
      npr_estimate_detail_sub_amount: 0,
      npr_estimate_detail_sub_waste_percent_qty: 0,
      npr_estimate_detail_sub_mark_up_percent_qty: 0,
      npr_estimate_detail_sub_total: 0,
      npr_estimate_detail_sub_total_amount: 0,
    },
  ],
};
const ModalEstimateFormCalculator = ({ visible = false }) => {
  const {
    npr_id,
    estimate: {
      npr_estimate_id,
      npr_estimate_remark,
      npr_estimate_description,
      tg_trans_status_id,
      tg_trans_close_id,
      npr_formula_id,
      npr_estimate_calculate,
    },
    estimate,
    user_name,
    modal: { estimateData },
  } = useContext(NPREstimateContext);

  const { onClose } = useContext(NPREstimateContext);
  const [loading, setLoading] = useState(false);
  const [isCal, setIsCal] = useState(false);
  const [state, setState] = useState(initialState);

  const onSubmit = async () => {
    // Do Submit
    setLoading(true);
    let detail = estimate.npr_estimate_detail.map((obj) =>
      obj.npr_estimate_detail_id === state.npr_estimate_detail_id ? state : obj
    );
    if (!state.npr_estimate_detail_id) {
      detail = [...detail, state];
    }
    const saveData = {
      npr_id,
      npr_estimate_id,
      npr_estimate_remark,
      npr_estimate_description,
      commit: 1,
      user_name,
      tg_trans_status_id,
      tg_trans_close_id,
      npr_estimate_detail: detail,
    };
    const resp = await saveEstimate(saveData, true);
    if (resp.success) {
      console.log("SAVE SUCCESS");
      onClose();
    }
    setLoading(false);
  };

  const getBatchCost = (id) => {
    if (id) {
      const data = npr_estimate_calculate.filter(
        (obj) => obj.npr_product_cost_detail_id === id
      )[0];
      setState({ ...state, ...data });
    } else {
      setState(initialState);
    }
  };

  const onChangeMarkup = (npr_estimate_type_id, changeData) => {
    setState({
      ...state,
      npr_id,
      npr_estimate_detail_sub: state.npr_estimate_detail_sub.map((obj) =>
        obj.npr_estimate_type_id === npr_estimate_type_id
          ? { ...obj, ...changeData }
          : obj
      ),
      npr_formula_id,
    });
    setIsCal(true);
  };
  const calculate = async () => {
    const resp = await getEstimateCalculate(state);
    if (resp.success) {
      const { npr_estimate_detail_sub, tg_npr_estimate_detail_total_amount } =
        resp.data[0];
      setState({
        ...state,
        tg_npr_estimate_detail_total_amount,
        npr_estimate_detail_sub: state.npr_estimate_detail_sub.map(
          (obj, index) => ({ ...obj, ...npr_estimate_detail_sub[index] })
        ),
      });
      setIsCal(false);
      message.success("Calculate Complete..", 4);
    }
  };

  useEffect(() => {
    estimateData ? setState(estimateData) : getBatchCost();
  }, [visible]);

  const pageStatus = {
    disabledSave:
      state.npr_product_cost_detail_id !== null && !isCal ? false : true,
  };
  return (
    <>
      <Modal
        title="Estimate"
        visible={visible}
        onCancel={onClose}
        onOk={onSubmit}
        width={1000}
        confirmLoading={loading}
        footer={[
          <Button
            disabled={loading}
            key="back"
            onClick={onClose}
            className="mr-5"
          >
            Discard
          </Button>,
          <Button
            key="submit"
            className={pageStatus.disabledSave ? "" : "primary"}
            onClick={onSubmit}
            loading={loading}
            disabled={pageStatus.disabledSave}
          >
            Save
          </Button>,
        ]}
      >
        <div className="form-section">
          <EstimateFormBatch
            data={state}
            getBatchCost={getBatchCost}
            batchList={npr_estimate_calculate}
            onChangeMarkup={onChangeMarkup}
            calculate={calculate}
            isCal={isCal}
          />
        </div>
      </Modal>
    </>
  );
};

export default React.memo(ModalEstimateFormCalculator);
