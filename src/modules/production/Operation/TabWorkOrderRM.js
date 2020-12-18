import React from "react";
import TabWorkOrderRMDetail from "./TabWorkOrderRMDetail";

const TabWorkOrderRM = ({ itemList }) => {
  console.log("TabWorkOrderRM");
  return (
    <>
      <TabWorkOrderRMDetail itemList={itemList} />
    </>
  );
};

export default React.memo(TabWorkOrderRM);
