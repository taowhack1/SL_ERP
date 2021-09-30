/** @format */

import { Col, Row, Tag } from "antd";
import React from "react";
import Chart from "react-apexcharts";

const respData = [
  {
    id: 1,
    machine_id: 1,
    freeze: 16,
    machine_plan_time: 8,
    machine_plan_day: "24-09-2021",
    machine_work_tiem: 2,
    machine_work_tiem_ot: 0,
    machine_name: "เครื่อง mixer",
  },
  {
    id: 2,
    machine_id: 2,
    freeze: 18,
    machine_plan_time: 8,
    machine_plan_day: "24-09-2021",
    machine_work_tiem: 2,
    machine_work_tiem_ot: 0,
    machine_name: "เครื่อง Filling & Packing",
  },
  {
    id: 2,
    machine_id: 3,
    freeze: 18,
    machine_plan_time: 8,
    machine_plan_day: "25-09-2021",
    machine_work_tiem: 6,
    machine_work_tiem_ot: 0,
    machine_name: "เครื่องทดสอบ",
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
    let machine_name = [];
    let plan_day = [];
    let plan = [];
    let ot = [];
    let name = [];
    let freeze = [];
    let total = 0;
    let sucess = [];
    let graphDay_sucess = [];

    arr
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
        obj.machine_plan_day == date
          ? plan_day.push(obj.machine_plan_day)
          : plan_day.push();
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
    return { graphMachine, graphDay };
  };
  // const reDataGraphLeft = (params) => {
  //   let callData = reData(respData);
  //   console.log("callData :>> ", callData);
  // };
  // reDataGraphLeft();
  console.log("reData :>> ", reData(respData));
  const graphMachine = reData(respData).graphMachine;
  const graphDay = reData(respData).graphDay;
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
    series: [
      {
        name: "Plan",
        data: [0, 0, 8],
      },
      {
        name: "success",
        data: [8, 0, 0],
      },
      {
        name: "OT",
        data: [1.33, 0, 0],
      },
      {
        name: "holiday",
        data: [0, 24, 0],
      },
      {
        name: "freeze",
        data: [14.67, 0, 18],
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
          width={200}
          height={300}
          series={state3.series}
          options={state3.options}></Chart>
      </Row>
    </>
  );
};

export default DashboardsIndex;
