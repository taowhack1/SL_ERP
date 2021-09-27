import React, { useContext } from "react";
import { MRPContext } from "../../../../include/js/context";
import RoutingDetail from "../../masterData/routing/mrpRouting/RoutingDetail";
import { mrpRoutingColumns } from "../../config/mrp";
import moment from "moment";

const MRPRouting = () => {
  const { mainState, mainStateDispatch, readOnly } = useContext(MRPContext);
  console.log("MRPRouting Page", mainState);
  const triggerHead = (routing_type_id, produce_date) => {
    if (routing_type_id)
      mainStateDispatch({
        type: "CHANGE_OBJ_VALUE",
        payload:
          routing_type_id === 1
            ? {
                mrp_bulk_produce_date: produce_date,
                mrp_routing: {
                  ...mainState.mrp_routing,
                  bulk: mainState.mrp_routing.bulk.map((obj) => ({
                    ...obj,
                    mrp_routing_plan_date: produce_date,
                  })),
                },
              }
            : {
                mrp_fg_produce_date: produce_date,
                mrp_routing: {
                  ...mainState.mrp_routing,
                  fg: mainState.mrp_routing.fg.map((obj) => ({
                    ...obj,
                    mrp_routing_plan_date: produce_date,
                  })),
                },
              },
      });
  };

  return (
    <>
      <RoutingDetail
        state={mainState}
        stateDispatch={mainStateDispatch}
        readOnly={readOnly}
        detailField={"mrp_routing"}
        columns={mrpRoutingColumns}
        triggerHead={triggerHead}
      />
    </>
  );
};

export default MRPRouting;
