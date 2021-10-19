/** @format */

import { Col, Row, Tag } from "antd";
import React from "react";
import Chart from "react-apexcharts";
// series: [
//   {
//     name: "Plan",
//     data: [2, 2],
//   },
//   {
//     name: "success",
//     data: [0, 0],
//   },
//   {
//     name: "OT",
//     data: [0, 0],
//   },
//   {
//     name: "holiday",
//     data: [0, 0],
//   },
//   {
//     name: "freeze",
//     data: [22, 22],
//   },
//   {
//     name: "success2",
//     data: [0, 0],
//   },
//   {
//     name: "freeze2",
//     data: [6, 6],
//   },
// ],
// colors: [
//   "#0000FF", plan
//   "#2ECC71", sucess
//   "#CC0000", ot
//   "#000000", holiday
//   "#FFFFFF", freeze
//   "#2ECC71",
//   "#FFFFFF",
// ],

const data = [
  {
    id: 1,
    machine_id: 1,
    machine_plan_time: 4,
    machine_plan_day: "24-09-2021",
    machine_work_tiem: 0,
    machine_name: "เครื่อง mixer",
  },
  {
    id: 2,
    machine_id: 2,
    machine_plan_time: 2,
    machine_plan_day: "24-09-2021",
    machine_work_tiem: 2,
    machine_name: "เครื่อง Filling & Packing",
  },
];
// array ใหม่ ที่ต้องได้
// [
//   {
//   name: "plan"
//   data: [mixer(จำนวนตัวเลขที่ได้), Filling((จำนวนตัวเลขที่ได้)]
//   machine_name : ["เครื่อง mixer","เครื่อง Filling & Packing",]
// }
// {
//   name: "sucess"
//   data: [mixer(จำนวนตัวเลขที่ได้), Filling((จำนวนตัวเลขที่ได้)]
//   machine_name : ["เครื่อง mixer","เครื่อง Filling & Packing",]
// }
// {
//   name: "freeze"
//   data: [mixer(จำนวนตัวเลขที่ได้), Filling((จำนวนตัวเลขที่ได้)]
//   machine_name : ["เครื่อง mixer","เครื่อง Filling & Packing",]
// }
// ]
const newData = [
  {
    name: "plan",
    data: [4, 4],
    machine_name: ["เครื่อง mixer", "เครื่อง Filling & Packing"],
    colors: "#0000FF",
  },
  {
    name: "sucess",
    data: [4, 4],
    machine_name: ["เครื่อง mixer", "เครื่อง Filling & Packing"],
    colors: "#2ECC71",
  },
  {
    name: "freeze",
    data: [16, 16],
    machine_name: ["เครื่อง mixer", "เครื่อง Filling & Packing"],
    colors: "#FFFFFF",
  },
];

//แบ่งกราฟ เป็น 12ชม เช้า   และ 12 ชมกลางคืน
//12 ชมเช้า      8ชม ทำงานปกติ 4 ชมโอที
//12 ชมกลางคืน   8ชม ทำงานปกติ 4 ชมโอที
//machine.push(plan.machine_name);
const DashboardsIndex = () => {
  const renderGraphMachineRight = (params) => {
    const findUniqueValues = (arr) => [...new Set(arr)];
    const newArray = () => {
      let freeze = 24;
      return params.map((plan, index) => {
        freeze = freeze - (plan.machine_plan_time + plan.machine_work_tiem);
        return {
          ...plan,
          freeze,
        };
      });
    };
    let total = 0;
    let machine = [];
    let machine_name = [];
    let data = [];
    let name = [];
    let plantime = [];
    const planTime = () => {
      let indexplanTime = 0;
      newArray.map((plan, index) => {
        plan.machine_plan_time > 0 && plan.machine_work_tiem == 0
          ? plantime.push(plan.machine_plan_time)
          : plantime.push(0);
        indexplanTime = index + 1;
      });

      return {
        data: plantime,
        colors: "#0000FF",
      };
    };

    return planTime();
  };
  const renderGraphLeft = (params) => {};
  const renderGraphMonth = (params) => {};
  console.log(
    "newData.machine_name :>> ",
    newData.map((color) => color.colors)
  );
  console.log("newData :>> ", newData);
  console.log("renderGraphMachineRight :>> ", renderGraphMachineRight(data));
  const state = {
    series: [...newData],
    options: {
      position: "front",
      colors: [...newData.map((color) => color.colors)],
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
        categories: [...newData[0].machine_name],
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
        events: {
          click: () => {
            console.log("object :>> ");
          },
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
