/** @format */

import { Col, Row, Tag } from "antd";
import React, { useEffect } from "react";
import Chart from "react-apexcharts";
var future = new Date();
future.setDate(future.getDate() + 30);
console.log("future :>> ", future);
const salesRecord = [
  {
    day: 1,
    product: [
      { name: "a", value: 5 },
      { name: "b", value: 2 },
      { name: "a", value: 7 },
      { name: "b", value: 4 },
    ],
  },
  {
    day: 2,
    product: [
      { name: "b", value: 8 },
      { name: "b", value: 6 },
      { name: "a", value: 4 },
      { name: "b", value: 1 },
    ],
  },
  {
    day: 3,
    product: [
      { name: "b", value: 10 },
      { name: "b", value: 7 },
      { name: "a", value: 9 },
      { name: "b", value: 0 },
    ],
  },
];
const temp_api = [
  {
    date: "01-09-2021",
    detail: [
      {
        id: 1,
        machine_id: 1,
        freeze: 24,
        machine_plan_time: 8,
        machine_plan_day: "01-09-2021",
        machine_work_tiem: 8,
        machine_work_tiem_ot: 2,
        machine_name: "เครื่อง mixer",
      },
      {
        id: 2,
        machine_id: 2,
        freeze: 24,
        machine_plan_time: 8,
        machine_plan_day: "01-09-2021",
        machine_work_tiem: 8,
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
        machine_plan_time: 8,
        machine_plan_day: "02-09-2021",
        machine_work_tiem: 8,
        machine_work_tiem_ot: 2,
        machine_name: "เครื่อง mixer",
      },
      {
        id: 2,
        machine_id: 2,
        freeze: 24,
        machine_plan_time: 8,
        machine_plan_day: "02-09-2021",
        machine_work_tiem: 8,
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
    machine_plan_time: 8,
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
    machine_work_tiem: 8,
    machine_work_tiem_ot: 2,
    machine_name: "เครื่อง Filling & Packing",
  },
];

const DashboardsIndex = () => {
  const renderbyDate = (date = "01-09-2021") => {
    let plan = [];
    let success = [];
    let ot = [];
    let tempOt = [];
    let freeze = [];
    let date_plan = [];
    let machine_name = [];
    let temp_testSum = temp_api
      .filter((res) => res.date == date)
      .reduce((a, c) => {
        a.push({
          ...c,
          date_plan: date_plan.push(
            c.detail
              .filter((res) => res.machine_plan_day == date)
              .map((res) => res.machine_plan_day)
          ),
          plan: c.detail
            .filter((res) => res.machine_plan_day == date)
            .reduce((acc, cur) => acc + cur.machine_plan_time, 0),
          Cplan: plan.push(
            c.detail
              .filter((res) => res.machine_plan_day == date)
              .map((res) =>
                res.machine_work_tiem >= res.machine_plan_time
                  ? 0
                  : res.machine_work_tiem <= res.machine_plan_time
                  ? res.machine_plan_time - res.machine_work_tiem
                  : res.machine_plan_time
              )
            //.reduce((acc, cur) => acc + cur / c.detail.length, 0)
          ),
          Csuccess: success.push(
            c.detail
              .filter((res) => res.machine_plan_day == date)
              .map((res) => res.machine_work_tiem)
            //.reduce((acc, cur) => acc + cur.machine_work_tiem, 0)
          ),
          Cmachine_name: machine_name.push(
            c.detail
              .filter((res) => res.machine_plan_day == date)
              .map((res) => {
                return res.machine_name;
              })
          ),
        });
        return a;
      }, []);
    const { machine_name2 } = machine_name;
    let graphDay = [
      // {
      //   name: "sucess",
      //   data: [
      //     sucess.reduce((sum, number) => {
      //       return sum + number / sucess.length;
      //     }, 0),
      //   ],
      //   plan_day: findUniqueValues(plan_day),
      //   colors: "#2ECC71",
      // },
      // {
      //   name: "plan",
      //   data: [
      //     plan.reduce((sum, number) => {
      //       return sum + number / plan.length;
      //     }, 0),
      //   ],
      //   plan_day: findUniqueValues(plan_day),
      //   colors: "#0000FF",
      // },
      // {
      //   name: "tempOt",
      //   data: [
      //     tempOt.reduce((sum, number) => {
      //       return sum + number / tempOt.length;
      //     }, 0),
      //   ],
      //   plan_day: findUniqueValues(plan_day),
      //   colors: "#FFFFFF",
      // },
      // {
      //   name: "ot",
      //   data: [
      //     ot.reduce((sum, number) => {
      //       return sum + number / ot.length;
      //     }, 0),
      //   ],
      //   plan_day: findUniqueValues(plan_day),
      //   colors: "#CC0000",
      // },
      // {
      //   name: "freeze",
      //   data: [
      //     freeze.reduce((sum, number) => {
      //       return sum + number / freeze.length;
      //     }, 0),
      //   ],
      //   plan_day: findUniqueValues(plan_day),
      //   colors: "#FFFFFF",
      // },
    ];
    let graphMachine = [
      {
        name: "sucess",
        data: success,
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
        data: [0, 0],
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
    console.log("graphDay :>> ", graphDay);
    console.log("graphMachine :>> ", graphMachine);
    console.log("temp_testSumRender :>> ", temp_testSum);
    console.log("AllData :>> ", {
      plan,
      success,
      ot,
      freeze,
      date_plan,
      machine_name,
    });
    console.log("machine_name :>> ", ...machine_name);
    console.log("machine_name sData:>> ", sData);
    return { graphDay, graphMachine, machine_name };
  };

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
  const tempData = (params) => {
    let plan = [];
    let success = [];
    let ot = [];
    let tempOt = [];
    let freeze = [];
    let date_plan = [];
    let temp_testSum = params.reduce((a, c) => {
      a.push({
        ...c,
        date_plan: date_plan.push(c.date.substr(0, 10)),
        plan: c.detail
          .filter((res) => res.machine_plan_time >= 0)
          .reduce((acc, cur) => acc + cur.machine_plan_time, 0),
        cplan: plan.push(
          c.detail
            .map((res) =>
              res.machine_work_tiem >= res.machine_plan_time
                ? 0
                : res.machine_work_tiem <= res.machine_plan_time
                ? res.machine_plan_time - res.machine_work_tiem
                : res.machine_plan_time
            )
            .reduce((acc, cur) => acc + cur / c.detail.length, 0)
        ),
        success: c.detail
          .filter((res) => res.machine_work_tiem >= 0)
          .reduce((acc, cur) => acc + cur.machine_work_tiem, 0),
        csuccess: success.push(
          c.detail
            .filter((res) => res.machine_work_tiem >= 0)
            .reduce(
              (acc, cur) => acc + cur.machine_work_tiem / c.detail.length,
              0
            )
        ),
        ot: c.detail
          .filter((res) => res.machine_work_tiem_ot >= 0)
          .reduce(
            (acc, cur) => acc + cur.machine_work_tiem_ot / c.detail.length,
            0
          ),
        cot: ot.push(
          c.detail
            .filter((res) => res.machine_work_tiem_ot >= 0)
            .reduce(
              (acc, cur) => acc + cur.machine_work_tiem_ot / c.detail.length,
              0
            )
        ),
        ctempOt: tempOt.push(
          c.detail.filter((res) => res.machine_work_tiem >= 0)
          //.reduce((acc, cur) => acc + cur.freeze / c.detail.length, 0)
        ),
        freeze: c.detail
          .filter((res) => res.freeze >= 0)
          .reduce((acc, cur) => acc + cur.freeze / c.detail.length, 0),
        cfreeze: freeze.push(
          c.detail
            .filter((res) => res.freeze >= 0)
            .reduce((acc, cur) => acc + cur.freeze / c.detail.length, 0)
        ),
      });
      return a;
    }, []);

    let graphMonth = [
      {
        name: "sucess",
        data: success,
        date_plan: date_plan,
        colors: "#2ECC71",
      },
      {
        name: "plan",
        data: plan,
        date_plan: date_plan,
        colors: "#0000FF",
      },
      {
        name: "freeze",
        data: [0, 0],
        date_plan: date_plan,
        colors: "#FFFFFF",
      },
      {
        name: "ot",
        data: ot,
        date_plan: date_plan,
        colors: "#CC0000",
      },
      {
        name: "freeze",
        data: freeze,
        date_plan: date_plan,
        colors: "#FFFFFF",
      },
    ];
    return { graphMonth, success, temp_testSum, plan, date_plan, tempOt };
  };

  console.log("temp_api_Fn :>> ", tempData(temp_api));
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

  useEffect(() => {
    renderbyDate();
  }, []);
  const graphMachine = reData(respData).graphMachine;
  const graphDay = reData(respData).graphDay;
  const graphMonth = reData2(respData2).graphMonth;
  const graph12Month = tempData(temp_api).graphMonth;
  const renderGraphMachine = renderbyDate().graphMachine;
  console.log("reData2 :>> ", reData2(respData2));
  console.log("reData :>> ", reData(respData));
  console.log("temp_api_graphMachine :>> ", graphMachine);
  console.log("graphDay :>> ", graphDay);
  console.log("renderGraphMachine :>> ", renderGraphMachine);
  console.log("graph12Month :>> ", graph12Month);
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
        categories: graphMachine[0].machine_name,
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
    series: [...graph12Month],
    options: {
      colors: [...graph12Month.map((color) => color.colors)],
      chart: {
        width: "20%",
        type: "bar",
        height: 350,
        stacked: true,
        toolbar: {
          show: false,
        },
        events: {
          click: (event, chartContext, config) => {
            // console.log("event  :>> click", event);
            // console.log("chartContext  :>> click", chartContext);
            // console.log("config  :>> click", config);
            if (event.target.localName == "tspan") {
              renderbyDate(event.explicitOriginalTarget.textContent);
              console.log(
                "click_date  :>> ",
                event.explicitOriginalTarget.textContent
              );
            }
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
        categories: [...graph12Month[0].date_plan],
        Width: "20%",
        title: {
          text: "09-2021",
          offsetX: 0,
          offsetY: 0,
          style: {
            color: undefined,
            fontSize: "12px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 600,
            cssClass: "apexcharts-xaxis-title",
          },
        },
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
          {/* <span style={{ marginLeft: 10 }}>Autorefresh in </span> */}
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
