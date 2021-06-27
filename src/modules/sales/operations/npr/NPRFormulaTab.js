import React from "react";
import RDFormulaList from "./rd/RDFormulaList";

const NPRFormulaTab = () => {
  return (
    <>
      <div className="form-section pd-left-2 pd-right-2">
        <div className="form-section-detail" style={{ padding: 10 }}>
          <RDFormulaList />
        </div>
      </div>
    </>
  );
};

export default React.memo(NPRFormulaTab);
