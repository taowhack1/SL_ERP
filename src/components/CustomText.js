import Text from "antd/lib/typography/Text";
import React from "react";

const CustomText = (props) => {
  const getClass = () => {
    let class_name = props.className ?? "";
    if (!props.readOnly && !props.require && props.label) {
      class_name += " pd-left-1";
    }
    if (!props.label) {
      class_name += " text-value";
    }
    return class_name;
  };
  const config = {
    className: getClass(),
  };
  return (
    <>
      {props.strong ? (
        <Text {...config} strong>
          {!props.readOnly && props.require && (
            <span className="require">* </span>
          )}
          {props.children}
        </Text>
      ) : (
        <Text {...config}>{props.children}</Text>
      )}
    </>
  );
};

export default React.memo(CustomText);
