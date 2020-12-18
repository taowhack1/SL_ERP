import React from "react";
import CustomText from "./CustomText";

const ToggleReadOnlyElement = (props) => {
  // console.log(props);
  return (
    <>
      {props.readOnly ? (
        <CustomText {...props}>{props.value}</CustomText>
      ) : (
        props.children
      )}
    </>
  );
};

export default React.memo(ToggleReadOnlyElement);
