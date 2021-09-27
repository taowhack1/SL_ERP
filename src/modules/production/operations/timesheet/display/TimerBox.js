/** @format */

import { Button, Col, Row, Divider } from "antd";
import React from "react";
let timer = {
  hh: 0,
  mm: 0,
  ss: 0,
};
const TimerBox = (props) => {
  const { hh, mm, ss } = timer;

  return (
    <div className="text-center">
      <div className="text-center">
        <h2>
          <b>จับเวลา</b>
        </h2>
      </div>
      <Divider className="divider-sm" />
      <div className={"ts-timer"}>
        <span className="hour">{hh >= 10 ? hh : "0" + hh}</span>
        <span className="timer-colon">:</span>
        <span className="minutes">{mm >= 10 ? mm : "0" + mm}</span>
        <span className="timer-colon">:</span>
        <span className="seconds">{ss >= 10 ? ss : "0" + ss}</span>
      </div>
    </div>
  );
};

export default React.memo(TimerBox);
