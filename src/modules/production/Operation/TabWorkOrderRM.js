import React from "react";
import TabWorkOrderRMDetail from "./TabWorkOrderRMDetail";

const TabWorkOrderRM = ({ itemList }) => {
  console.log("TabWorkOrderRM");
  return (
    <>
      <TabWorkOrderRMDetail />
    </>
  );
};

export default React.memo(TabWorkOrderRM);
