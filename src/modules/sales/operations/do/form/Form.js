import React from "react";
import Detail from "./Detail";
import Head from "./Head";

const Form = () => {
  return (
    <div id="form">
      <Head />
      <Detail />
    </div>
  );
};

export default React.memo(Form);
