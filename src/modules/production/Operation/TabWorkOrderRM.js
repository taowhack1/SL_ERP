import React from "react";
import TabWorkOrderRMDetail from "./TabWorkOrderRMDetail";

const TabWorkOrderRM = ({
  readOnly,
  data_rm_detail,
  rmDetailDispatch,
  itemList,
}) => {
  console.log("TabWorkOrderRM");
  return (
    <>
      <TabWorkOrderRMDetail
        readOnly={readOnly}
        data_rm_detail={data_rm_detail}
        rmDetailDispatch={rmDetailDispatch}
        itemList={itemList}
      />
    </>
  );
};

export default React.memo(TabWorkOrderRM);
