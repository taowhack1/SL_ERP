import React from "react";
import Controller from "./Controller";
import TimerBox from "./TimerBox";
const Timer = () => {
  return (
    <div className="ts-controller-container">
      <TimerBox />
      <Controller />
    </div>
  );
};

export default Timer;
