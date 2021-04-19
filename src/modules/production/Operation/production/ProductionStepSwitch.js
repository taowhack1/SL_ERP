import React from "react";
import ProductionRMCheck from "./ProductionRMCheck";
import ProductionSelectMachine from "./production/costCenter/ProductionSelectMachine";
import ProductionViewJobDetail from "./ProductionViewJobDetail";
import ProductionSelectWorker from "./production/worker/ProductionSelectWorker";
import TimeSheet from "./production/timesheet/TimeSheet";
import ProductionResult from "./production/ProductionResult";

const ProductionStepSwitch = ({ current, state }) => {
  const getStepPage = (step, state) => {
    switch (step) {
      case 0:
        return <ProductionViewJobDetail />;
      case 1:
        return <ProductionRMCheck />;
      case 2:
        return <ProductionSelectWorker />;
      case 3:
        return <TimeSheet />;
      case 4:
        return <ProductionResult />;

      default:
        break;
    }
  };
  return <>{getStepPage(current)}</>;
};

export default ProductionStepSwitch;
