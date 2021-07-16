/** @format */

import React from "react";

const Btn = (props) => {
  console.log("Btn render");
  return (
    <div>
      {props.status === 0 ? (
        <div>
          <button
            className='stopwatch-btn stopwatch-btn-gre'
            onClick={() => props.showConfirmstart("setup")}>
            Setup
          </button>
          <button
            className='stopwatch-btn stopwatch-btn-gre'
            onClick={() => props.showConfirmstart("start")}>
            Start
          </button>
          <button
            className='stopwatch-btn stopwatch-btn-gre'
            onClick={() => props.showConfirmstart("clean")}>
            clean
          </button>
          {/* <button
            className="stopwatch-btn stopwatch-btn-gray"
            onClick={props.showConfirmstop}
          >
            Issue
          </button> */}
        </div>
      ) : (
        ""
      )}

      {props.status === 1 ? ( //When Timesheet Start
        <div>
          <button
            className='stopwatch-btn stopwatch-btn-red'
            onClick={props.showConfirmstop}>
            Stop
          </button>

          <button
            className='stopwatch-btn stopwatch-btn-gray'
            onClick={() => props.showConfirmstop("issue")}>
            Issue
          </button>
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
