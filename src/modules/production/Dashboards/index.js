/** @format */

import { Col, Row, Tag } from "antd";
import React from "react";
import Chart from "react-apexcharts";
const data = [
  {
    id: 1,
    machine_id: 1,
    machine_plan_time_h: 4,
    machine_plan_day: "24-09-2021",
    machine_work_tiem: 4,
  },
  {
    id: 2,
    machine_id: 2,
    machine_plan_time_h: 4,
    machine_plan_day: "24-09-2021",
    machine_work_tiem: 4,
  },
];
const DashboardsIndex = () => {
  const renderGraphRight = (params) => {};
  const renderGraphLeft = (params) => {};
  const renderGraphMonth = (params) => {};

  const state = {
    series: [
      {
        name: "Plan",
        data: [2, 2],
      },
      {
        name: "success",
        data: [0, 0],
      },
      {
        name: "OT",
        data: [0, 0],
      },
      {
        name: "holiday",
        data: [0, 0],
      },
      {
        name: "freeze",
        data: [22, 22],
      },
      {
        name: "success2",
        data: [0, 0],
      },
      {
        name: "freeze2",
        data: [6, 6],
      },
    ],
    options: {
      position: "front",
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
        toolbar: {
          show: false,
        },
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
        width: 0.5,
        colors: ["#000000"],
      },
      annotations: {
        position: "back",
        yaxis: [
          {
            y: 8,

            borderColor: "#D7D7D7",
            strokeDashArray: 0,
          },
          {
            y: 12,
            borderColor: "#D7D7D7",
            strokeDashArray: 0,
          },
          {
            y: 20,
            borderColor: "#D7D7D7",
            strokeDashArray: 0,
          },
          {
            y: 24,
            borderColor: "#C3C3C3",
            strokeDashArray: 0,
          },
        ],
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
        categories: ["เครื่อง mixer", "เครื่อง Filling & Packing"],
        Width: "20%",
        labels: {
          show: true,
          rotate: -45,
          rotateAlways: true,
          hideOverlappingLabels: true,
          showDuplicates: false,
          trim: false,
          minHeight: undefined,
          maxHeight: 120,
          style: {
            //colors: [],
            fontSize: "12px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 400,
            cssClass: "apexcharts-xaxis-label",
          },
          offsetX: 0,
          offsetY: 0,
        },
      },
      grid: {
        show: true,
        borderColor: "#000000",
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
      markers: {
        size: 2,
        colors: undefined,
        strokeColors: "#fff",
        strokeWidth: 2,
        strokeOpacity: 0.9,
        strokeDashArray: 0,
        fillOpacity: 1,
        discrete: [],
        shape: "line",
        radius: 2,
        offsetX: 0,
        offsetY: 0,
        onClick: undefined,
        onDblClick: undefined,
        showNullDataPoints: true,
        hover: {
          size: undefined,
          sizeOffset: 3,
        },
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
        data: [0],
      },
      {
        name: "OT",
        data: [0],
      },
      {
        name: "holiday",
        data: [0],
      },
      {
        name: "freeze",
        data: [22],
      },
    ],
    options: {
      position: "front",
      colors: ["#0000FF", "#2ECC71", "#CC0000", "#000000", "#FFFFFF"],
      chart: {
        width: "20%",
        type: "bar",
        height: 350,
        stacked: true,
        toolbar: {
          show: false,
        },
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
        width: 0.5,
        colors: ["#000000"],
      },
      annotations: {
        position: "back",
        yaxis: [
          {
            y: 8,
            borderColor: "#D7D7D7",
            strokeDashArray: 0,
          },
          {
            y: 12,
            borderColor: "#D7D7D7",
            strokeDashArray: 0,
          },
          {
            y: 20,
            borderColor: "#D7D7D7",
            strokeDashArray: 0,
          },
          {
            y: 24,
            borderColor: "#C3C3C3",
            strokeDashArray: 0,
          },
        ],
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
        borderColor: "#000000",
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
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
  const state3 = {
    series: [
      {
        name: "Plan",
        data: [8, 0, 8],
      },
      {
        name: "success",
        data: [0, 0, 0],
      },
      {
        name: "OT",
        data: [0, 0, 0],
      },
      {
        name: "holiday",
        data: [0, 24, 0],
      },
      {
        name: "freeze",
        data: [16, 0, 18],
      },
    ],
    options: {
      colors: ["#0000FF", "#2ECC71", "#CC0000", "#000000", "#FFFFFF"],
      chart: {
        width: "20%",
        type: "bar",
        height: 350,
        stacked: true,
        toolbar: {
          show: false,
        },
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
      annotations: {
        position: "back",
        yaxis: [
          {
            y: 8,
            borderColor: "#D7D7D7",
            strokeDashArray: 0,
          },
          {
            y: 12,
            borderColor: "#D7D7D7",
            strokeDashArray: 0,
          },
          {
            y: 20,
            borderColor: "#D7D7D7",
            strokeDashArray: 0,
          },
          {
            y: 24,
            borderColor: "#C3C3C3",
            strokeDashArray: 0,
          },
        ],
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
        categories: ["24", "25", "26"],
        Width: "20%",
      },
      grid: {
        show: false,
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
      <Row gutter={[8, 16]}>
        {/* <div>DashboardsIndex</div> */}
        <Col span={4}>
          <Chart
            type='bar'
            width={200}
            height={400}
            series={state2.series}
            options={state2.options}></Chart>
        </Col>
        <Col>
          <Chart
            type='bar'
            width={200}
            height={400}
            series={state.series}
            options={state.options}></Chart>
        </Col>
        <Col></Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={24} style={{ background: "#C6C6CC" }}>
          <span style={{ marginLeft: 10 }}>Autorefresh in </span>
          <Tag color='#0000FF' style={{ marginLeft: 100 }}>
            plan
          </Tag>
          <Tag color='#2ECC71'>success</Tag>
          <Tag color='#FFA500'>break</Tag>
          <Tag color='#000000'>holiday</Tag>
          <Tag color='#CC0000'>OT</Tag>
          <Tag color='#FFFFFF' style={{ color: "#000000" }}>
            freeze
          </Tag>
        </Col>
        <Chart
          type='bar'
          width={200}
          height={300}
          series={state3.series}
          options={state3.options}></Chart>
      </Row>
    </>
  );
};

export default DashboardsIndex;
