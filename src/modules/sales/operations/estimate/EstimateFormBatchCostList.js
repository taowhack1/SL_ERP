import React from "react";
import EstimateFormBatchCost from "./EstimateFormBatchCost";

const EstimateFormBatchCostList = () => {
  const title = [
    "ราคาวัตถุดิบ Raw Material",
    "ราคาบรรจุภัณฑ์ Packaging",
    "ราคาต้นทุนการผลิต Production Cost",
  ];
  return (
    <>
      {title.map((obj, index) => (
        <EstimateFormBatchCost
          title={obj}
          key={index}
          showInput={
            index === 2 ? [true, false, true, true] : [true, true, true, true]
          }
        />
      ))}
    </>
  );
};

export default EstimateFormBatchCostList;
