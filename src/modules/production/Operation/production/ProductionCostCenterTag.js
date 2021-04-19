import React from "react";

const ProductionCostCenterTag = () => {
  const { id, title } = JSON.parse(localStorage.getItem("cost_center"));
  return (
    <>
      {title && (
        <div className="cc-tag primary">
          <h4>{"[ " + id + " ] " + title}</h4>
        </div>
      )}
    </>
  );
};

export default ProductionCostCenterTag;
