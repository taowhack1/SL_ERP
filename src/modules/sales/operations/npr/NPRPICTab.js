import React from "react";
import RDFormulaList from "./RDFormulaList";
import RDPIC from "./RDPIC";
const NPRPICTab = () => {
  return (
    <>
      <div className="form-section pd-left-2 pd-right-2">
        <div className="form-section-detail" style={{ padding: 10 }}>
          <RDPIC />
        </div>
      </div>
    </>
  );
};

export default React.memo(NPRPICTab);
