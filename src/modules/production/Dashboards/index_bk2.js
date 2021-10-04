/** @format */

import { Col, Row, Tag } from "antd";
import React from "react";
import Chart from "react-apexcharts";
var future = new Date();
future.setDate(future.getDate() + 30);
console.log("future :>> ", future);
const temp_api = [
  {
    date: "01-09-2021",
    detail: [
      {
        id: 1,
        machine_id: 1,
        freeze: 24,
        machine_plan_time: 6,
        machine_plan_day: "01-09-2021",
        machine_work_tiem: 0,
        machine_work_tiem_ot: 2,
        machine_name: "เครื่อง mixer",
      },
      {
        id: 2,
        machine_id: 2,
        freeze: 24,
        machine_plan_time: 8,
        machine_plan_day: "01-09-2021",
        machine_work_tiem: 0,
        machine_work_tiem_ot: 2,
        machine_name: "เครื่อง Filling & Packing",
      },
    ],
  },
  {
    date: "02-09-2021",
    detail: [
      {
        id: 1,
        machine_id: 1,
        freeze: 24,
        machine_plan_time: 6,
        machine_plan_day: "02-09-2021",
        machine_work_tiem: 0,
        machine_work_tiem_ot: 2,
        machine_name: "เครื่อง mixer",
      },
      {
        id: 2,
        machine_id: 2,
        freeze: 24,
        machine_plan_time: 8,
        machine_plan_day: "02-09-2021",
        machine_work_tiem: 0,
        machine_work_tiem_ot: 2,
        machine_name: "เครื่อง Filling & Packing",
      },
    ],
  },
];
console.log("temp_api :>> ", temp_api);
const respData2 = [
  {
    id: 1,
    machine_id: 1,
    freeze: 24,
    machine_plan_time: 6,
    machine_plan_day: "24-09-2021",
    machine_work_tiem: 0,
    machine_work_tiem_ot: 2,
    machine_name: "เครื่อง mixer",
  },
  {
    id: 2,
    machine_id: 2,
    freeze: 24,
    machine_plan_time: 8,
    machine_plan_day: "24-09-2021",
    machine_work_tiem: 0,
    machine_work_tiem_ot: 2,
    machine_name: "เครื่อง Filling & Packing",
  },
];
const respData = [
  {
    id: 1,
    machine_id: 1,
    freeze: 24,
    break: 0,
    machine_plan_time: 6,
    machine_plan_day: "24-09-2021",
    machine_work_tiem: 8,
    machine_work_tiem_ot: 2,
    machine_name: "เครื่อง mixer",
  },
  {
    id: 2,
    machine_id: 2,
    freeze: 24,
    break: 0,
    machine_plan_time: 8,
    machine_plan_day: "24-09-2021",
    machine_work_tiem: 6,
    machine_work_tiem_ot: 4,
    machine_name: "เครื่อง Filling & Packing",
  },
];
//เช่น 5941 และ 5942
//มีโอทีรวม 2 ชั่วโมง ของทั้งหมด 2 แท่ง เท่ากับ 8 ชั่วโมง
//ตอนเอา โอที มาวาดในแท่งซ้าย
//ก็ต้องเป็นสัดส่วน 2 ต่อ 8
//แต่แท่งสูงได้แค่ 4
//สีแดงเลยสูงแต่ 1/4

//สีน้ำเงิน น่าจะแท่งละ 4 ชั่วโมง
//จะได้เท่ากับ 8 / 16
//แท่งซ้าย จะได้ 4/8

// 8 ชม คูนจำนวนแท่ง
//แบ่งกราฟ เป็น 12ชม เช้า   และ 12 ชมกลางคืน
//12 ชมเช้า      8ชม ทำงานปกติ 4 ชมโอที
//12 ชมกลางคืน   8ชม ทำงานปกติ 4 ชมโอที
//machine.push(plan.machine_name);
const DashboardsIndex = () => {
  const reData = (arr, date = "24-09-2021") => {
    const findUniqueValues = (arr) => [...new Set(arr)];
    const isCheck8hr = (value) => value >= 8;
    let machine_name = [];
    let plan_day = [];
    let plan = [];
    let ot = [];
    let tempOt = [];
    let name = [];
    let freeze = [];
    let total = 0;
    let sucess = [];
    let graphDay_sucess = [];

    let test = arr
      .filter((obj, index) => {
        return obj.machine_plan_day == date;
      })
      .map((obj, index) => {
        total =
          total +
          obj.freeze +
          obj.machine_plan_time +
          obj.machine_work_tiem +
          obj.machine_work_tiem_ot;
        machine_name.push(obj.machine_name);
        ot.push(obj.machine_work_tiem_ot);
        sucess.push(obj.machine_work_tiem);
        obj.machine_work_tiem >= obj.machine_plan_time
          ? plan.push(0)
          : obj.machine_work_tiem <= obj.machine_plan_time
          ? plan.push(obj.machine_plan_time - obj.machine_work_tiem)
          : plan.push(obj.machine_plan_time);
        freeze.push(obj.freeze);
        plan_day.push(obj.machine_plan_day);
        obj.machine_work_tiem_ot !== 0
          ? plan[index] + sucess[index] == 8
            ? tempOt.push(0)
            : tempOt.push(
                sucess[index] == 0
                  ? 8 - plan[index]
                  : 8 - sucess[index] - plan[index]
              )
          : tempOt.push(0);
        return { ...obj };
      });

    let graphDay = [
      {
        name: "sucess",
        data: [
          sucess.reduce((sum, number) => {
            return sum + number / sucess.length;
          }, 0),
        ],
        plan_day: findUniqueValues(plan_day),
        colors: "#2ECC71",
      },
      {
        name: "plan",
        data: [
          plan.reduce((sum, number) => {
            return sum + number / plan.length;
          }, 0),
        ],
        plan_day: findUniqueValues(plan_day),
        colors: "#0000FF",
      },
      {
        name: "tempOt",
        data: [
          tempOt.reduce((sum, number) => {
            return sum + number / tempOt.length;
          }, 0),
        ],
        plan_day: findUniqueValues(plan_day),
        colors: "#FFFFFF",
      },
      {
        name: "ot",
        data: [
          ot.reduce((sum, number) => {
            return sum + number / ot.length;
          }, 0),
        ],
        plan_day: findUniqueValues(plan_day),
        colors: "#CC0000",
      },
      {
        name: "freeze",
        data: [
          freeze.reduce((sum, number) => {
            return sum + number / freeze.length;
          }, 0),
        ],
        plan_day: findUniqueValues(plan_day),
        colors: "#FFFFFF",
      },
    ];

    let graphMachine = [
      {
        name: "sucess",
        data: sucess,
        machine_name: machine_name,
        colors: "#2ECC71",
      },
      {
        name: "plan",
        data: plan,
        machine_name: machine_name,
        colors: "#0000FF",
      },
      {
        name: "freeze",
        data: tempOt,
        machine_name: machine_name,
        colors: "#FFFFFF",
      },
      {
        name: "ot",
        data: ot,
        machine_name: machine_name,
        colors: "#CC0000",
      },
      {
        name: "freeze",
        data: freeze,
        machine_name: machine_name,
        colors: "#FFFFFF",
      },
    ];
    let graphMonth = [
      {
        name: "sucess",
        data: [
          sucess.reduce((sum, number) => {
            return sum + number / sucess.length;
          }, 0),
        ],
        plan_day: findUniqueValues(plan_day),
        colors: "#2ECC71",
      },
      {
        name: "plan",
        data: [
          plan.reduce((sum, number) => {
            return sum + number / plan.length;
          }, 0),
        ],
        plan_day: findUniqueValues(plan_day),
        colors: "#0000FF",
      },
      {
        name: "tempOt",
        data: [
          tempOt.reduce((sum, number) => {
            return sum + number / tempOt.length;
          }, 0),
        ],
        plan_day: findUniqueValues(plan_day),
        colors: "#FFFFFF",
      },
      {
        name: "ot",
        data: [
          ot.reduce((sum, number) => {
            return sum + number / ot.length;
          }, 0),
        ],
        plan_day: findUniqueValues(plan_day),
        colors: "#CC0000",
      },
      {
        name: "freeze",
        data: [
          freeze.reduce((sum, number) => {
            return sum + number / freeze.length;
          }, 0),
        ],
        plan_day: findUniqueValues(plan_day),
        colors: "#FFFFFF",
      },
    ];
    return { graphMachine, graphDay, graphMonth, test, tempOt, plan, sucess };
  };
  const reData2 = (arr) => {
    const findUniqueValues = (arr) => [...new Set(arr)];
    const isCheck8hr = (value) => value >= 8;
    let machine_name = [];
    let plan_day = [];
    let plan = [];
    let ot = [];
    let tempOt = [];
    let name = [];
    let freeze = [];
    let total = 0;
    let sucess = [];
    let graphDay_sucess = [];
    let date = [];
    let test = arr.map((obj, index) => {
      total =
        total +
        obj.freeze +
        obj.machine_plan_time +
        obj.machine_work_tiem +
        obj.machine_work_tiem_ot;
      machine_name.push(obj.machine_name);
      ot.push(obj.machine_work_tiem_ot);
      sucess.push(obj.machine_work_tiem);
      obj.machine_work_tiem >= obj.machine_plan_time
        ? plan.push(0)
        : obj.machine_work_tiem <= obj.machine_plan_time
        ? plan.push(obj.machine_plan_time - obj.machine_work_tiem)
        : plan.push(obj.machine_plan_time);
      freeze.push(obj.freeze);
      plan_day.push(obj.machine_plan_day.substr(0, 2));
      obj.machine_plan_day == obj.machine_plan_day
        ? date.push(obj.machine_plan_day)
        : date.push(false);
      obj.machine_work_tiem_ot !== 0
        ? plan[index] + sucess[index] == 8
          ? tempOt.push(0)
          : tempOt.push(
              sucess[index] == 0
                ? 8 - plan[index]
                : 8 - sucess[index] - plan[index]
            )
        : tempOt.push(0);
      return { ...obj };
    });

    let graphMonth = [
      {
        name: "sucess",
        data: [
          sucess.reduce((sum, number) => {
            return sum + number / sucess.length;
          }, 0),
        ],
        plan_day: findUniqueValues(plan_day),
        colors: "#2ECC71",
      },
      {
        name: "plan",
        data: [
          plan.reduce((sum, number) => {
            return sum + number / plan.length;
          }, 0),
        ],
        plan_day: findUniqueValues(plan_day),
        colors: "#0000FF",
      },
      {
        name: "freeze",
        data: [
          tempOt.reduce((sum, number) => {
            return sum + number / tempOt.length;
          }, 0),
        ],
        plan_day: findUniqueValues(plan_day),
        colors: "#FFFFFF",
      },
      {
        name: "ot",
        data: [
          ot.reduce((sum, number) => {
            return sum + number / ot.length;
          }, 0),
        ],
        plan_day: findUniqueValues(plan_day),
        colors: "#CC0000",
      },
      {
        name: "freeze",
        data: [
          freeze.reduce((sum, number) => {
            return sum + number / freeze.length;
          }, 0),
        ],
        plan_day: findUniqueValues(plan_day),
        colors: "#FFFFFF",
      },
    ];
    let graphMachine = [
      {
        name: "sucess",
        data: sucess,
        machine_name: machine_name,
        colors: "#2ECC71",
      },
      {
        name: "plan",
        data: plan,
        machine_name: machine_name,
        colors: "#0000FF",
      },
      {
        name: "freeze",
        data: tempOt,
        machine_name: machine_name,
        colors: "#FFFFFF",
      },
      {
        name: "ot",
        data: ot,
        machine_name: machine_name,
        colors: "#CC0000",
      },
      {
        name: "freeze",
        data: freeze,
        machine_name: machine_name,
        colors: "#FFFFFF",
      },
    ];
    return { graphMonth, graphMachine, sucess, plan_day, date };
  };
  // const reDataGraphLeft = (params) => {
  //   let callData = reData(respData);
  //   console.log("callData :>> ", callData);
  // };
  // reDataGraphLeft();
  console.log("reData2 :>> ", reData2(respData2));
  console.log("reData :>> ", reData(respData));
  const graphMachine = reData(respData).graphMachine;
  const graphDay = reData(respData).graphDay;
  const graphMonth = reData2(respData2).graphMonth;
  //const graphMonth = reData(respData).graphMonth;
  console.log("graphMachine :>> ", graphMachine);
  console.log("graphDay :>> ", graphDay);
  const state = {
    series: [...graphMachine],
    options: {
      position: "front",
      colors: [...graphMachine.map((color) => color.colors)],
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
        categories: [...graphMachine[0].machine_name],
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
        enabled: false,
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
    series: [...graphDay],
    options: {
      position: "front",
      colors: [...graphDay.map((color) => color.colors)],
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
        categories: [...graphDay[0].plan_day],
        Width: "20%",
      },
      grid: {
        show: true,
        borderColor: "#B2B2B2",
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
      },
      fill: {
        opacity: 2,
      },
      tooltip: {
        enabled: false,
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
    series: [...reData2(respData2).graphMachine],
    options: {
      colors: [...graphMonth.map((color) => color.colors)],
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
        categories: [...graphMonth[0].plan_day],
        Width: "20%",
      },
      grid: {
        show: false,
      },
      fill: {
        opacity: 2,
      },
      tooltip: {
        enabled: false,
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
          width={600}
          height={300}
          series={state3.series}
          options={state3.options}></Chart>
      </Row>
    </>
  );
};

export default DashboardsIndex;
