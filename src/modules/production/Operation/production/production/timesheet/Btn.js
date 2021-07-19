/** @format */

import React from "react";

const Btn = (props) => {
  console.log("Btn render");
  console.log("props.stepBtn", props.stepBtn);
  return (
    <div>
      {props.status === 0 ? (
        props.stepBtn === "close" ? (
          ""
        ) : (
          <div>
            <button
              disabled={props.stepBtn === "close" ? true : false}
              className='stopwatch-btn stopwatch-btn-gre'
              onClick={() => props.showConfirmstart("setup")}>
              Setup
            </button>
            <button
              disabled={props.stepBtn === "close" ? true : false}
              className='stopwatch-btn stopwatch-btn-gre'
              onClick={() => props.showConfirmstart("start")}>
              Start
            </button>
            <button
              disabled={props.stepBtn === "close" ? true : false}
              className='stopwatch-btn stopwatch-btn-gre'
              onClick={() => props.showConfirmstart("clean")}>
              clean
            </button>
          </div>
        )
      ) : (
        ""
      )}

      {props.status === 1 ? ( //When Timesheet Start
        <div>
          <button
            className='stopwatch-btn stopwatch-btn-red'
            onClick={() => props.showConfirmstop(props.stepBtn)}>
            Stop
          </button>
          {props.stepBtn === "start" ? (
            <>
              <button
                className='stopwatch-btn stopwatch-btn-gray'
                onClick={() => props.showConfirmstop("issue")}>
                Issue
              </button>
            </>
          ) : (
            <></>
          )}
        </div>
      ) : (
        ""
      )}

      {props.status === 2 ? (
        <div>
          <button
            className='stopwatch-btn stopwatch-btn-disabled'
            onClick={props.showConfirmstart}
            disabled>
            Start
          </button>
        </div>
      ) : (
        ""
      )}

      <div></div>
    </div>
  );
};

export default React.memo(Btn);
