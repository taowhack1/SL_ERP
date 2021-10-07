import { Divider } from "antd";
import React from "react";
let timer = {
  hh: 0,
  mm: 0,
  ss: 0,
};
const TimerBox = (props) => {
  const stopTimer = () => {};
  return (
    <div className="text-center">
      <div className="text-center">
        <h2>
          <b>จับเวลา</b>
        </h2>
      </div>
      <Divider className="divider-sm" />
      <div className={"ts-timer"}>
        <span className="hour ts-timer-counter" id="counter-hh">
          00
        </span>
        <span className="timer-colon">:</span>
        <span className="minutes ts-timer-counter" id="counter-mm">
          00
        </span>
        <span className="timer-colon">:</span>
        <span className="seconds ts-timer-counter" id="counter-ss">
          00
        </span>
      </div>
      <div id="timer"></div>
    </div>
  );
};

export default React.memo(TimerBox);
