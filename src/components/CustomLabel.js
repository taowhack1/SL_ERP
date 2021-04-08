import Text from "antd/lib/typography/Text";
import React from "react";

const CustomLabel = ({
  label = "",
  require = false,
  readOnly = false,
  style,
}) => {
  return (
    <>
      <Text
        strong
        className={!require && !readOnly ? "pd-left-1" : ""}
        style={style}
      >
        {!readOnly && require && <span className="require">* </span>}
        {label}
      </Text>
    </>
  );
};

export default React.memo(CustomLabel);
