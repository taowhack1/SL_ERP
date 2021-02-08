import React, { useContext } from "react";
import { ReturnContext } from "../include/js/context";

const FormLayout = (props) => {
  return <div id="form">{props.children}</div>;
};

export default React.memo(FormLayout);
