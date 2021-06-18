import { Button, Divider, Row, Col, message } from "antd";
import Modal from "antd/lib/modal/Modal";
import Text from "antd/lib/typography/Text";
import React, { useContext, useEffect, useState } from "react";
import { getEstimateCalculate } from "../../../../actions/sales/nprActions";
import { convertDigit } from "../../../../include/js/main_config";
import { NPREstimateContext } from "./EstimateForm";
import EstimateFormBatch from "./EstimateFormBatch";
const initialState = {
  npr_id: null,
  npr_formula_id: null,
  npr_product_cost_detail_id: null,
  npr_product_cost_detail_batch_size: 0,
  npr_product_cost_detail_fg_qty: 0,
  npr_formula_detail_sum: 0,
  npr_formula_detail_waste: 0,
  npr_formula_detail_waste_sum: 0,
  npr_formula_detail_waste_sum_markup: 0,
  npr_formula_detail_qty_markup: 0,
  npr_price_detail_sum: 0,
  npr_price_detail_waste: 0,
  npr_price_detail_waste_sum: 0,
  npr_price_detail_waste_sum_markup: 0,
  npr_price_detail_qty_markup: 0,
  npr_product_cost_detail_cost: 0,
  npr_product_cost_detail_cost_markup: 0,
  npr_product_cost_detail_qty_markup: 0,
  tg_npr_estimate_detail_total_amount: 0,
};
const ModalEstimateFormCalculator = ({
  visible = false,
  onOk,
  // loading = false,
}) => {
  const {
    estimate: { npr_estimate_calculate },
  } = useContext(NPREstimateContext);

  const { onClose } = useContext(NPREstimateContext);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(initialState);

  const onSubmit = () => {
    // Do Submit
    setLoading(true);
    setTimeout(() => {
      message.success("Hello");
      setLoading(false);
    }, 1000);
  };

  const getBatchCost = async (id) => {
    id
      ? setState(
          npr_estimate_calculate.filter(
            (obj) => obj.npr_product_cost_detail_id === id
          )[0]
        )
      : setState(initialState);
  };

  const onChangeMarkup = async (data) => {
    console.log(data);
    const dataGet = { ...state, ...data };
    const resp = await getEstimateCalculate(dataGet);
    console.log("onChangeMarkUp", resp);
    if (resp.success) {
      setState(resp.data[0]);
    }
  };

  useEffect(() => {
    getBatchCost(state.npr_product_cost_detail_id);
  }, []);

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
            className="primary"
            onClick={onSubmit}
            loading={loading}
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
          />
        </div>
      </Modal>
    </>
  );
};

export default React.memo(ModalEstimateFormCalculator);
