/** @format */

import React from "react";
import Chart from "react-apexcharts";
const DashboardsIndex = () => {
  const state = {
    series: [
      {
        name: "PRODUCT A",
        data: [
          8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1,
        ],
      },
      {
        name: "PRODUCT B",
        data: [
          8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1,
        ],
      },
      {
        name: "PRODUCT C",
        data: [
          8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1,
        ],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        //stackType: "100%",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      grid: {
        show: true,
        borderColor: "#90A4AE",
        strokeDashArray: 0,
        position: "back",
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
        row: {
          colors: undefined,
          opacity: 0.5,
        },
        column: {
          colors: undefined,
          opacity: 0.5,
        },
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      },
      xaxis: {
        categories: [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
          "26",
          "27",
          "28",
          "29",
          "30",
          "31",
        ],
      },
      yaxis: { min: 0, max: 24, tickAmount: 24 },
      fill: {
        opacity: 1,
      },
      legend: {
        position: "right",
        offsetX: 0,
        offsetY: 50,
      },
    },
  };
  return (
    <>
      {/* <div>DashboardsIndex</div> */}
      <Chart
        type='bar'
        width={800}
        height={400}
        series={state.series}
        options={state.options}></Chart>
    </>
  );
};

export default DashboardsIndex;
