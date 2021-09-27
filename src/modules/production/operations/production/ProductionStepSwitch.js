import React from "react";
import ProductionRMCheck from "./ProductionRMCheck";
import ProductionSelectMachine from "./production/costCenter/ProductionSelectMachine";
import ProductionViewJobDetail from "./ProductionViewJobDetail";
import ProductionSelectWorker from "./production/worker/ProductionSelectWorker";
import TimeSheet from "./production/timesheet/TimeSheet";
import ProductionResult from "./production/ProductionResult";
import ProductionSelectPlan from "./production/ProductionSelectPlan";

const ProductionStepSwitch = ({ current, state }) => {
  const getStepPage = (step, state) => {
    switch (step) {
      case 1:
        return <ProductionSelectPlan />;
      case 2:
        return <ProductionRMCheck />;
      case 3:
        return <ProductionSelectWorker />;
      case 4:
        return <TimeSheet />;
      case 5:
        return <ProductionResult />;

      default:
        break;
    }
  };
  return <>{getStepPage(current)}</>;
};

export default ProductionStepSwitch;
