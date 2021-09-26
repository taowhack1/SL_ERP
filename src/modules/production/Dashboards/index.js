/** @format */

import { Row } from "antd";
import React from "react";
import Chart from "react-apexcharts";
const DashboardsIndex = () => {
  const state = {
    series: [
      {
        name: "Plan",
        data: [2, 2],
      },
      {
        name: "success",
        data: [4, 2],
      },
      {
        name: "OT",
        data: [2, 2],
      },
      {
        name: "holiday",
        data: [2, 2],
      },
      {
        name: "freeze",
        data: [10, 10],
      },
      {
        name: "success2",
        data: [2, 2],
      },
      {
        name: "freeze2",
        data: [4, 4],
      },
    ],
    options: {
      colors: [
        "#0000FF",
        "#2ECC71",
        "#CC0000",
        "#000000",
        "#FFFFFF",
        "#2ECC71",
        "#FFFFFF",
      ],
      chart: {
        width: "20%",
        type: "bar",
        height: 350,
        stacked: true,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "30%",
          endingShape: "flat",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 0.2,
        colors: ["#000000"],
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
      yaxis: {
        show: true,
        max: 24,
        tickAmount: 24,
        labels: {
          show: true,
          formatter: (value) => {
            return [8, 12, 20, 24].includes(value) ? value : " ";
          },
        },
      },
      xaxis: {
        categories: ["เครื่องจัก mixer", "เครื่องจัก Filling & Packing"],
        Width: "20%",
      },
      grid: {
        show: true,
      },
      fill: {
        opacity: 2,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
      legend: {
        show: false,
        position: "bottom",
        horizontalAlign: "center",
      },
    },
  };
  const state2 = {
    series: [
      {
        name: "Plan",
        data: [2],
      },
      {
        name: "success",
        data: [4],
      },
      {
        name: "OT",
        data: [2],
      },
      {
        name: "holiday",
        data: [2],
      },
      {
        name: "freeze",
        data: [16],
      },
    ],
    options: {
      colors: ["#0000FF", "#2ECC71", "#CC0000", "#000000", "#FFFFFF"],
      chart: {
        width: "20%",
        type: "bar",
        height: 350,
        stacked: true,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "30%",
          endingShape: "flat",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 0.2,
        colors: ["#000000"],
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
      yaxis: {
        show: true,
        max: 24,
        tickAmount: 24,
        labels: {
          show: true,
          formatter: (value) => {
            return [8, 12, 20, 24].includes(value) ? value : " ";
          },
        },
      },
      xaxis: {
        categories: ["24-09-2021"],
        Width: "20%",
      },
      grid: {
        show: true,
      },
      fill: {
        opacity: 2,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
      legend: {
        show: false,
        position: "bottom",
        horizontalAlign: "center",
      },
    },
  };
  return (
    <>
      <Row>
        {/* <div>DashboardsIndex</div> */}
        <Chart
          type="bar"
          width={200}
          height={400}
          series={state2.series}
          options={state2.options}
        ></Chart>
        <Chart
          type="bar"
          width={400}
          height={400}
          series={state.series}
          options={state.options}
        ></Chart>
      </Row>
    </>
  );
};

export default DashboardsIndex;
