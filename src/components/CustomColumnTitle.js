import Text from "antd/lib/typography/Text";
import React from "react";

const CustomColumnTitle = ({
  readOnly = true,
  require = false,
  title = "Title",
}) => {
  return (
    <>
      <div className="text-center">
        <Text strong>
          {!readOnly && require && <span className="require">{"* "}</span>}
          {title}
        </Text>
      </div>
    </>
  );
};

export default React.memo(CustomColumnTitle);
