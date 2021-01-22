import { Popconfirm, message } from "antd";
import React, { useState } from "react";

const ConfirmDialog = (props) => {
  const { onConfirm } = props;
  const [state, setState] = useState({
    visible: false,
    condition: false,
  });

  const confirm = () => {
    setState({ ...state, visible: false });
    onConfirm();
    message.success("Selected Clear.");
  };

  const cancel = () => {
    setState({ ...state, visible: false });
  };

  const handleVisibleChange = (visible) => {
    console.log("Visible", visible);
    if (!visible) {
      // ถ้าปิดอยู่ ให้เปิด
      setState({ ...state, visible });
      return;
    }
    if (state.condition) {
      confirm(); // next step
    } else {
      setState({ ...state, visible }); // show the popconfirm
    }
  };

  return (
    <div>
      <Popconfirm
        title="Are you sure delete this task?"
        visible={state.visible}
        onVisibleChange={handleVisibleChange}
        onConfirm={confirm}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        {props.children}
      </Popconfirm>
    </div>
  );
};
export default React.memo(ConfirmDialog);
