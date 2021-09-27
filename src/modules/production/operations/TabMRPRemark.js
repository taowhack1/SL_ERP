import TextArea from "antd/lib/input/TextArea";
import Text from "antd/lib/typography/Text";
import React, { useContext, useState } from "react";
import { MRPContext } from "../../../include/js/context";

const TabMRPRemark = () => {
  const { mainState, mainStateDispatch, readOnly } = useContext(MRPContext);

  const [state, setState] = useState(mainState?.mrp_remark ?? "");

  return (
    <>
      {readOnly ? (
        <Text className="text-value">{state}</Text>
      ) : (
        <TextArea
          name="mrp_remark"
          placeholder="Remark"
          onChange={(e) => setState(e.target.value)}
          onBlur={() => {
            mainStateDispatch({
              type: "CHANGE_OBJ_VALUE",
              payload: { mrp_remark: state },
            });
          }}
          value={state.mrp_remark}
        />
      )}
    </>
  );
};

export default React.memo(TabMRPRemark);
