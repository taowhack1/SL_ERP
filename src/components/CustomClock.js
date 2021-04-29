import { ClockCircleOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";

const CustomClock = () => {
  useEffect(() => {
    const startTime = () => {
      var today = new Date();
      var h = today.getHours();
      var m = today.getMinutes();
      var s = today.getSeconds();
      m = checkTime(m);
      s = checkTime(s);
      const clock = document.getElementById("clock");
      if (clock) {
        clock.innerHTML = h + ":" + m + ":" + s;
      }

      var t = setTimeout(startTime, 500);
    };
    const checkTime = (i) => {
      if (i < 10) {
        i = "0" + i;
      } // add zero in front of numbers < 10
      return i;
    };
    startTime();
  }, []);
  return (
    <>
      <div className="clock-container">
        <ClockCircleOutlined
          style={{ fontSize: 20, marginRight: 10, color: "gray" }}
        />
        <span id="clock"></span>
      </div>
    </>
  );
};

export default React.memo(CustomClock);
