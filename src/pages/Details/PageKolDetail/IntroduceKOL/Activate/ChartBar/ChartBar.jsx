import "./ChartBar.css";
import React from "react";

const ChartBar = (props) => {
  let barFillHeight = "0%";

  if (props.maxValue > 0) {
    barFillHeight = Math.round((props.books / props.maxValue) * 100) + "%";
  }

  return (
    <div className="chart-bar" key={props.id}>
      <div className="chart-bar__label" key='1'>{props.books}</div>
      <div className="chart-bar__inner" key='2'>
        <div
          className="chart-bar__fill"
          style={{ height: barFillHeight }}
        ></div>
      </div>
      <div className="chart-bar__label" key='3'>{props.month}</div>
    </div>
  );
};

export default ChartBar;
