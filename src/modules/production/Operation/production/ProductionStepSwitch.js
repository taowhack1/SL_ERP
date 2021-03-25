import React from "react";
import ProductionRMCheck from "./ProductionRMCheck";
import ProductionSelectMachine from "./ProductionSelectMachine";
import ProductionSelectWorker from "./ProductionSelectWorker";

const ProductionStepSwitch = ({ step, state }) => {
  const getStepPage = (step, state) => {
    switch (step) {
      case 0:
        return <ProductionRMCheck state={state} />;
      case 1:
        return <ProductionSelectMachine />;
      case 2:
        return <ProductionSelectWorker />;
      default:
        break;
    }
  };
  return <>{getStepPage(step.current, state)}</>;
};

export default ProductionStepSwitch;
