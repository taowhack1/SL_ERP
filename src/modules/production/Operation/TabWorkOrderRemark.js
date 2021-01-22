import TextArea from "antd/lib/input/TextArea";
import Text from "antd/lib/typography/Text";
import React, { useContext, useState } from "react";
import { WOContext } from "../../../include/js/context";

const TabWorkOrderRemark = () => {
  const { headReducer, readOnly } = useContext(WOContext);
  const [state, setState] = useState({
    wo_remark: headReducer.data.wo_remark,
  });

  return (
    <>
      {readOnly ? (
        <Text className="text-value">{state.wo_remark}</Text>
      ) : (
        <TextArea
          name="wo_remark"
          placeholder="Remark"
          onChange={(e) => setState({ ...state, wo_remark: e.target.value })}
          onBlur={() => {
            headReducer.onChangeHeadValue(state);
          }}
          value={state.wo_remark}
        />
      )}
    </>
  );
};

export default TabWorkOrderRemark;
