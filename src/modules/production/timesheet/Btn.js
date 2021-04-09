/** @format */

import React from "react";

const Btn = (props) => {
  return (
    <div>
      {props.status === 0 ? (
        <div>
          <button
            className='stopwatch-btn stopwatch-btn-gre'
            onClick={props.showConfirmstart}>
            Start
          </button>
          <button
            className='stopwatch-btn stopwatch-btn-gray'
            onClick={props.showConfirmstop}>
            Issue
          </button>
        </div>
      ) : (
        ""
      )}

      {props.status === 1 ? (
        <div>
          <button
            className='stopwatch-btn stopwatch-btn-red'
            onClick={props.showConfirmstop}>
            Stop
          </button>

          <button
            className='stopwatch-btn stopwatch-btn-gray'
            onClick={props.showConfirmstop}>
            Issue
          </button>
        </div>
      ) : (
        ""
      )}

      {props.status === 2 ? (
        <div>
          <button
            className='stopwatch-btn stopwatch-btn-yel'
            onClick={props.resume}>
            Resume
          </button>
          <button
            className='stopwatch-btn stopwatch-btn-gray'
            onClick={props.showConfirmstop}>
            Issue
          </button>
        </div>
      ) : (
        ""
      )}

      <div></div>
    </div>
  );
};

export default Btn;
