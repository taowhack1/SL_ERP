import React from "react";

const Display = (props) => {
  console.log("display render");
  return (
    <div className={"timer-display"}>
      <span className="timer">
        {props.time.h >= 10 ? props.time.h : "0" + props.time.h}
      </span>
      <span className="timer-colon">:</span>
      <span className="timer">
        {props.time.m >= 10 ? props.time.m : "0" + props.time.m}
      </span>
      <span className="timer-colon">:</span>
      <span className="timer">
        {props.time.s >= 10 ? props.time.s : "0" + props.time.s}
      </span>
    </div>
  );
};

export default React.memo(Display);
