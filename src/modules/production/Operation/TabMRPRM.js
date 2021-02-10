import React from "react";
import TabMRPRMDetail from "./TabMRPRMDetail";

const TabMRPRM = ({ itemList }) => {
  console.log("TabMRPRM");
  return (
    <>
      <TabMRPRMDetail />
    </>
  );
};

export default React.memo(TabMRPRM);
