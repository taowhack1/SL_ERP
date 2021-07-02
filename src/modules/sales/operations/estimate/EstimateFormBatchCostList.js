import React from "react";
import EstimateFormBatchCost from "./EstimateFormBatchCost";

const EstimateFormBatchCostList = ({ data, onChangeMarkup }) => {
  const formName = [
    {
      name: "ราคาวัตถุดิบ Raw Material",
    },
    {
      name: "ราคาบรรจุภัณฑ์ Packaging",
    },
    {
      name: "ราคาต้นทุนการผลิต Production Cost",
    },
  ];

  const formFields = [
    "npr_estimate_detail_sub_amount",
    "npr_estimate_detail_sub_waste_percent_qty",
    "npr_estimate_detail_sub_mark_up_percent_qty",
    "npr_estimate_detail_sub_total_amount",
  ];
  return (
    <>
      {data?.npr_estimate_detail_sub
        ?.filter((obj1) => obj1.npr_estimate_type_id === 1)
        ?.map((obj, index) => (
          <EstimateFormBatchCost
            data={obj}
            name={formName[index]?.name}
            fields={formFields}
            key={obj?.npr_estimate_type_id}
            showInput={
              obj?.npr_estimate_type_id === 3
                ? [true, false, true, true]
                : [true, true, true, true]
            }
            onChangeMarkup={onChangeMarkup}
          />
        ))}
    </>
  );
};

export default EstimateFormBatchCostList;
