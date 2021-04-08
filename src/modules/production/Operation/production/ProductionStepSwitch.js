import React from "react";
import ProductionRMCheck from "./ProductionRMCheck";
import ProductionSelectMachine from "./production/costCenter/ProductionSelectMachine";
import ProductionViewJobDetail from "./ProductionViewJobDetail";
import ProductionSelectWorker from "./production/worker/ProductionSelectWorker";

const ProductionStepSwitch = ({ step, state }) => {
  const getStepPage = (step, state) => {
    switch (step) {
      case 0:
        return <ProductionViewJobDetail />;
      case 1:
        return <ProductionRMCheck state={state} />;
      case 2:
        return <ProductionSelectWorker />;
      // case 3:
      //   return <ProductionSelectMachine />;

      default:
        break;
    }
  };
  return <>{getStepPage(step.current, state)}</>;
};

export default ProductionStepSwitch;
