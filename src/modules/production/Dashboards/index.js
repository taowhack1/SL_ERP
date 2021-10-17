/** @format */

import { Col, DatePicker, Row, Tag } from "antd";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import { getGraph360Day } from "../../../actions/production/DashboardsAction";
import { sortData } from "../../../include/js/function_main";
import Authorize from "../../system/Authorize";
import moment from "moment";
const temp_api = [
  {
    date: "01-09-2021",
    detail: [
      {
        date: "01-09-2021",
        id: 1,
        machine_id: 1,
        freeze: 24,
        plan_job_plan_time_hour: 6,
        plan_job_date: "01-09-2021",
        tg_plan_job_actual_time_hour: 8,
        tg_plan_job_actual_time_ot: 2,
        machine_description: "เครื่อง mixer",
      },
      {
        date: "01-09-2021",
        id: 2,
        machine_id: 2,
        freeze: 24,
        plan_job_plan_time_hour: 8,
        plan_job_date: "01-09-2021",
        tg_plan_job_actual_time_hour: 8,
        tg_plan_job_actual_time_ot: 0,
        machine_description: "เครื่อง Filling & Packing",
      },
    ],
  },
  {
    date: "02-09-2021",
    detail: [
      {
        date: "02-09-2021",
        id: 1,
        machine_id: 1,
        freeze: 24,
        plan_job_plan_time_hour: 6,
        plan_job_date: "02-09-2021",
        tg_plan_job_actual_time_hour: 0,
        tg_plan_job_actual_time_ot: 0,
        machine_description: "เครื่อง mixer",
      },
      {
        date: "02-09-2021",
        id: 2,
        machine_id: 2,
        freeze: 24,
        plan_job_plan_time_hour: 6,
        plan_job_date: "02-09-2021",
        tg_plan_job_actual_time_hour: 0,
        tg_plan_job_actual_time_ot: 0,
        machine_description: "เครื่อง Filling & Packing",
      },
    ],
  },
];

const DashboardsIndex = () => {
  const [date2, setDate] = useState(moment());
  const [planData, setPlanData] = useState([]);
  const authorize = Authorize();
  console.log("date :>> ", date2);
  authorize.check_authorize();
  const renderGraphMachineAndMount = (data, date, type) => {
    console.log("type :>> ", type);
    console.log("date :>> ", date);
    console.log("data renderGraphMachineAndMount:>> ", data);
    const findUniqueValues = (arr) => [...new Set(arr)];
    const isCheck8hr = (value) => value >= 8;
    let machine_name = [];
    let plan_day = [];
    let plan = [];
    let ot = [];
    let tempOt = [];
    let freeze = [];
    let total = 0;
    let sucess = [];

    let DataTransformer = [];

    if (data.length > 0) {
      DataTransformer = Object.values(
        ...data
          .filter((obj) => obj.date == date)
          .map((obj) => {
            return obj.detail;
          })
      );
    }
    console.log("DataTransformer :>> ", DataTransformer);
    let DataSet = DataTransformer.filter((obj, index) => {
      return obj.date == date;
    }).map((obj, index) => {
      total =
        total +
        obj.freeze +
        obj.plan_job_plan_time_hour +
        obj.tg_plan_job_actual_time_hour +
        obj.tg_plan_job_actual_time_ot;
      machine_name.push(obj.machine_description);
      ot.push(obj.tg_plan_job_actual_time_ot);
      sucess.push(obj.tg_plan_job_actual_time_hour);
      obj.tg_plan_job_actual_time_hour >= obj.plan_job_plan_time_hour
        ? plan.push(0)
        : obj.tg_plan_job_actual_time_hour <= obj.plan_job_plan_time_hour
        ? plan.push(
            obj.plan_job_plan_time_hour - obj.tg_plan_job_actual_time_hour
          )
        : plan.push(obj.plan_job_plan_time_hour);
      freeze.push(obj.freeze);
      plan_day.push(obj.date);
      obj.tg_plan_job_actual_time_ot !== 0
        ? plan[index] + sucess[index] == 8
          ? tempOt.push(0)
          : tempOt.push(
              sucess[index] == 0
                ? 8 - plan[index]
                : 8 - sucess[index] - plan[index]
            )
        : tempOt.push(plan[index] >= 8 ? 0 : 0);
      return { ...obj };
    });
    console.log("tempOt :>> ", tempOt);
    console.log("freeze :>> ", freeze);
    console.log("machine_name :>> ", machine_name);
    console.log("sucess :>> ", sucess);
    console.log("plan :>> ", plan);
    // console.log(
    //   "tempOt fn :>> ",
    //   tempOt.reduce((sum, number) => {
    //     return sum + number / tempOt.length;
    //   }, 0)
    // );
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
        machine_description: machine_name,
        colors: "#2ECC71",
      },
      {
        name: "plan",
        data: plan,
        machine_description: machine_name,
        colors: "#0000FF",
      },
      {
        name: "freeze",
        data: tempOt,
        machine_description: machine_name,
        colors: "#FFFFFF",
      },
      {
        name: "ot",
        data: ot,
        machine_description: machine_name,
        colors: "#CC0000",
      },
      {
        name: "freeze",
        data: freeze,
        machine_description: machine_name,
        colors: "#FFFFFF",
      },
    ];

    if (type == "machine") {
      console.log("graphMachine if:>> ", graphMachine);
      // setGraphMachine({
      //   ...graphMachine,
      // });
      setstateGraphMachine({
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
            categories: graphMachine[0]?.machine_description,
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
      });
      return {
        ...graphMachine,
      };
    }
    if (type == "day") {
      console.log("graphDay[0].plan_day :>> ", graphDay[0].plan_day);
      setstateGraphDay({
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
            categories: graphDay[0].plan_day,
            Width: "20%",
          },
          grid: {
            show: false,
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
      });
      // setGraphDay({
      //   ...graphDay,
      // });
      // return {
      //   ...graphDay,
      // };
    }
    console.log(
      "graphMachine[0].machine_description :>> ",
      graphMachine[0]?.machine_description
    );
  };

  const renderGraph365Day = (params) => {
    console.log("planData :>> ", planData);
    let plan = [];
    let success = [];
    let ot = [];
    let tempOt = [];
    let freeze = [];
    let date_plan = [];
    console.log(
      "params renderGraph365Day:>> ",
      params.map((obj, i) => moment(obj.date, "DD/MM/YYYY").format("M"))
    );
    let i = 0;
    let temp_testSum = [];
    let filter = [];
    //let graphMonth = [];
    // for (i = 1; i <= 12; i++) {
    //   filter.push(
    //     params.filter(
    //       (obj, index) => moment(obj.date, "DD/MM/YYYY").format("M") == i
    //     )
    //   );
    // }
    // for (i = 1; i <= 12; i++) {
    filter.push(
      params
        // .filter(
        //   (obj, index) => moment(obj.date, "DD/MM/YYYY").format("M") == i
        // )
        .reduce((a, c) => {
          a.push({
            ...c,
            date_plan: date_plan.push(c.date.substr(0, 10)),
            plan: c.detail
              .filter((res) => res.plan_job_plan_time_hour >= 0)
              .reduce((acc, cur) => acc + cur.plan_job_plan_time_hour, 0),
            cplan: plan.push(
              c.detail
                .map((res) =>
                  res.tg_plan_job_actual_time_hour >=
                  res.plan_job_plan_time_hour
                    ? 0
                    : res.tg_plan_job_actual_time_hour <=
                      res.plan_job_plan_time_hour
                    ? res.plan_job_plan_time_hour -
                      res.tg_plan_job_actual_time_hour
                    : res.plan_job_plan_time_hour
                )
                .reduce((acc, cur) => acc + cur / c.detail.length, 0)
            ),
            success: c.detail
              .filter((res) => res.tg_plan_job_actual_time_hour >= 0)
              .reduce((acc, cur) => acc + cur.tg_plan_job_actual_time_hour, 0),
            csuccess: success.push(
              c.detail
                .filter((res) => res.tg_plan_job_actual_time_hour >= 0)
                .reduce(
                  (acc, cur) =>
                    acc + cur.tg_plan_job_actual_time_hour / c.detail.length,
                  0
                )
            ),
            ot: c.detail
              .filter((res) => res.tg_plan_job_actual_time_ot >= 0)
              .reduce(
                (acc, cur) =>
                  acc + cur.tg_plan_job_actual_time_ot / c.detail.length,
                0
              ),
            cot: ot.push(
              c.detail
                .filter((res) => res.tg_plan_job_actual_time_ot >= 0)
                .reduce(
                  (acc, cur) =>
                    acc + cur.tg_plan_job_actual_time_ot / c.detail.length,
                  0
                )
            ),
            ctempOt: tempOt.push(
              c.detail
                .map((res) =>
                  res.tg_plan_job_actual_time_ot !== 0 || null
                    ? res.plan_job_plan_time_hour +
                        res.tg_plan_job_actual_time_hour >=
                      8
                      ? 0
                      : res.tg_plan_job_actual_time_hour == 0
                      ? 8 - res.plan_job_plan_time_hour
                      : 8 - res.plan_job_plan_time_hour
                    : res.plan_job_plan_time_hour == 0
                    ? 0
                    : res.plan_job_plan_time_hour >= 8
                    ? 0
                    : 0
                )
                .reduce((acc, cur) => acc + cur / c.detail.length, 0)
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
        }, [])
    );
    console.log("graphMonth filter :>> ", filter);
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
        data: tempOt,
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

    // setstateGraph12Month({
    //   date: 1,
    //   mountNumber: 1,
    //   id: 1,
    //   data: {
    //     series: [...graphMonth],
    //     options: {
    //       colors: [...graphMonth?.map((color) => color.colors)],
    //       chart: {
    //         width: "20%",
    //         type: "bar",
    //         height: 350,
    //         stacked: true,
    //         toolbar: {
    //           show: false,
    //         },
    //         events: {
    //           click: (event, chartContext, config) => {
    //             console.log(
    //               "click_date  :>> ",
    //               event.explicitOriginalTarget.textContent
    //             );
    //             if (event.target.localName == "tspan") {
    //               selectDate(event.explicitOriginalTarget.textContent);
    //             }
    //           },
    //         },
    //       },
    //       plotOptions: {
    //         bar: {
    //           horizontal: false,
    //           columnWidth: "30%",
    //           endingShape: "flat",
    //         },
    //       },
    //       dataLabels: {
    //         enabled: false,
    //       },
    //       stroke: {
    //         show: true,
    //         width: 0.2,
    //         colors: ["#000000"],
    //       },
    //       annotations: {
    //         position: "back",
    //         yaxis: [
    //           {
    //             y: 8,
    //             borderColor: "#D7D7D7",
    //             strokeDashArray: 0,
    //           },
    //           {
    //             y: 12,
    //             borderColor: "#D7D7D7",
    //             strokeDashArray: 0,
    //           },
    //           {
    //             y: 20,
    //             borderColor: "#D7D7D7",
    //             strokeDashArray: 0,
    //           },
    //           {
    //             y: 24,
    //             borderColor: "#C3C3C3",
    //             strokeDashArray: 0,
    //           },
    //         ],
    //       },
    //       responsive: [
    //         {
    //           breakpoint: 480,
    //           options: {
    //             legend: {
    //               position: "bottom",
    //               offsetX: -10,
    //               offsetY: 0,
    //             },
    //           },
    //         },
    //       ],
    //       yaxis: {
    //         show: true,
    //         max: 24,
    //         tickAmount: 24,
    //         labels: {
    //           show: true,
    //           formatter: (value) => {
    //             return [8, 12, 20, 24].includes(value) ? value : " ";
    //           },
    //         },
    //       },
    //       xaxis: {
    //         categories: [...graphMonth[0].date_plan],
    //         Width: "20%",
    //         title: {
    //           text: "",
    //           offsetX: 0,
    //           offsetY: 0,
    //           style: {
    //             color: undefined,
    //             fontSize: "12px",
    //             fontFamily: "Helvetica, Arial, sans-serif",
    //             fontWeight: 600,
    //             cssClass: "apexcharts-xaxis-title",
    //           },
    //         },
    //       },
    //       grid: {
    //         show: false,
    //       },
    //       fill: {
    //         opacity: 2,
    //       },
    //       tooltip: {
    //         enabled: false,
    //         y: {
    //           formatter: function (val) {
    //             return val;
    //           },
    //         },
    //       },
    //       legend: {
    //         show: false,
    //         position: "bottom",
    //         horizontalAlign: "center",
    //       },
    //     },
    //   },
    // });
    setstateGraph12Month({
      series: [...graphMonth],
      options: {
        colors: [...graphMonth?.map((color) => color.colors)],
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
              console.log(
                "click_date  :>> ",
                event.explicitOriginalTarget.textContent
              );
              if (event.target.localName == "tspan") {
                selectDate(params, event.explicitOriginalTarget.textContent);
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
          categories: [...graphMonth[0].date_plan],
          Width: "20%",
          title: {
            text: "",
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
    });
    console.log("graphMonth FN360DAY:>> ", graphMonth);
    console.log("graphMonth FN360DAY: success>> ", success);
    console.log("graphMonth FN360DAY: plan>> ", plan);
    console.log("graphMonth FN360DAY: tempOt>> ", tempOt);
    console.log("temp_testSum :>> ", temp_testSum);
  };
  const [stateGraphMachine, setstateGraphMachine] = useState({
    series: [],
    options: {
      position: "front",
      colors: [],
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
        categories: [],
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
  });
  const [stateGraphDay, setstateGraphDay] = useState({
    series: [],
    options: {
      position: "front",
      colors: [],
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
        categories: [],
        Width: "20%",
      },
      grid: {
        show: false,
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
  });
  const [stateGraph12Month, setstateGraph12Month] = useState({
    series: [],
    options: {
      colors: [],
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
            if (event.target.localName == "tspan") {
              setstateGraphMachine(
                renderGraphMachineAndMount(
                  temp_api,
                  event.explicitOriginalTarget.textContent
                ).graphMachine
              );
              setstateGraphDay(
                renderGraphMachineAndMount(
                  temp_api,
                  event.explicitOriginalTarget.textContent
                ).graphDay
              );
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
        categories: [],
        Width: "20%",
        title: {
          text: "",
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
  });
  const [refresh, setRefresh] = useState(false);
  const { user_name } = useSelector((state) => state.auth.authData);
  const getGraph360DayFN = async (date, change) => {
    const resp = await getGraph360Day(date, change);
    console.log("getGraph360DayFN", resp);
    resp.success && setPlanData(sortData(resp.data));
    const dateDefaults = moment(date2, "DD/MM/YYYY")
      .add(-3, "days")
      .format("DD/MM/YYYY");
    //Differenceconst dateDefaults = "04/10/2021";
    console.log("dateDefaults :>> ", dateDefaults);
    renderGraph365Day(sortData(resp.data));
    if (change == true) {
      renderGraphMachineAndMount(
        sortData(resp.data),
        `${dateDefaults}`,
        "machine"
      );
      renderGraphMachineAndMount(sortData(resp.data), `${dateDefaults}`, "day");
    }
  };
  useEffect(() => {
    getGraph360DayFN(date2, true);
  }, []);

  const changeYear = (data) => {
    console.log("data :>> ", data);
    getGraph360DayFN(data, false);
  };
  const selectDate = (params, date) => {
    console.log("params params :>> ", params);
    renderGraphMachineAndMount(params, date, "machine");
    renderGraphMachineAndMount(params, date, "day");
  };
  // setTimeout(() => {
  //   setRefresh(!refresh);
  //   getGraph360DayFN(date2, true);
  //   console.log("Auto refresh :>> ", refresh);
  // }, 10000);
  // auto_refresh();
  // const renderGrap = () => {
  //   let i = 0;
  //   let graph = [];
  //   for (i = 1; i <= 1; i++) {
  //     graph.push(
  //       <Chart
  //         style={{
  //           borderRight: "5px solid #c0c0c0",
  //           marginLeft: 5,
  //         }}
  //         key={i}
  //         type='bar'
  //         width={1800}
  //         height={300}
  //         series={stateGraph12Month.series}
  //         options={stateGraph12Month.options}></Chart>
  //     );
  //   }
  //   return graph;
  // };
  console.log("stateGraphMachine :>> ", stateGraphMachine);
  console.log("planData 2:>> ", planData);
  //console.log("graph :>> ", renderGrap());
  console.log("stateGraph12Month :>> ", stateGraph12Month);
  return (
    <>
      <Row gutter={[8, 16]}>
        {/* <div>DashboardsIndex</div> */}
        <Col span={4}>
          <Chart
            type='bar'
            width={200}
            height={400}
            series={stateGraphDay.series}
            options={stateGraphDay.options}></Chart>
        </Col>
        <Col>
          <Chart
            type='bar'
            width={
              85 * stateGraphMachine?.series[0]?.machine_description?.length
            }
            height={400}
            series={stateGraphMachine.series}
            options={stateGraphMachine.options}></Chart>
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
          {/* <Tag color='#FFA500'>break</Tag> */}
          <Tag color='#000000'>holiday</Tag>
          <Tag color='#CC0000'>OT</Tag>
          <Tag color='#FFFFFF' style={{ color: "#000000" }}>
            freeze
          </Tag>
          <span style={{ marginLeft: 30 }}>View in </span>
          <DatePicker
            picker='year'
            defaultValue={date2}
            format={"YYYY"}
            onChange={(data) => {
              data ? changeYear(data) : setDate(null);
            }}
          />
        </Col>

        <div className='scroll__container'>
          {/* {renderGrap()} */}
          <Chart
            type='bar'
            width={60 * planData.length}
            height={300}
            series={stateGraph12Month.series}
            options={stateGraph12Month.options}></Chart>
        </div>
      </Row>
    </>
  );
};

export default DashboardsIndex;
