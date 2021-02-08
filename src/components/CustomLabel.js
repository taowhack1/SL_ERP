import Text from "antd/lib/typography/Text";
import React from "react";

const CustomLabel = ({ title = "", require = false, readOnly = false }) => {
  console.log("require", require);
  return (
    <>
      <Text strong className={!require && !readOnly ? "pd-left-1" : ""}>
        {!readOnly && require && <span className="require">* </span>}
        {title}
      </Text>
    </>
  );
};

export default React.memo(CustomLabel);
