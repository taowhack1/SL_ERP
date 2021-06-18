import React from "react";
import EstimateFormBatchCost from "./EstimateFormBatchCost";

const EstimateFormBatchCostList = ({ data, onChangeMarkup }) => {
  const formFields = [
    {
      name: "ราคาวัตถุดิบ Raw Material",
      fields: [
        "npr_formula_detail_sum",
        "npr_formula_detail_waste",
        "npr_formula_detail_qty_markup",
        "npr_formula_detail_waste_sum_markup",
      ],
    },
    {
      name: "ราคาบรรจุภัณฑ์ Packaging",
      fields: [
        "npr_price_detail_sum",
        "npr_price_detail_waste",
        "npr_price_detail_qty_markup",
        "npr_price_detail_waste_sum_markup",
      ],
    },
    {
      name: "ราคาต้นทุนการผลิต Production Cost",
      fields: [
        "npr_product_cost_detail_cost",
        "",
        "npr_product_cost_detail_qty_markup",
        "npr_product_cost_detail_cost_markup",
      ],
    },
  ];
  return (
    <>
      {formFields.map((obj, index) => (
        <EstimateFormBatchCost
          data={data}
          name={obj.name}
          fields={obj.fields}
          key={index}
          showInput={
            index === 2 ? [true, false, true, true] : [true, true, true, true]
          }
          onChangeMarkup={onChangeMarkup}
        />
      ))}
    </>
  );
};

export default EstimateFormBatchCostList;
