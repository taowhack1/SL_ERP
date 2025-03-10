/** @format */

import { Col, DatePicker, Row, Tag } from "antd";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import { getGraph360Day } from "../../../actions/production/DashboardsAction";
import { sortData } from "../../../include/js/function_main";
import Authorize from "../../system/Authorize";
import moment from "moment";
import $ from "jquery";

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
  //const authorize = Authorize();
  console.log("date :>> ", date2);
  //authorize.check_authorize();
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
    let success = [];

    let DataTransformer = [];

    if (data.length > 0) {
      DataTransformer = Object.values(
        ...data?.filter((obj) => obj.date == date)?.map((obj) => {
          return obj.detail;
        })
      );
    }
    console.log("DataTransformer :>> ", DataTransformer);
    let DataSet = DataTransformer.filter((obj, index) => {
      return obj.date == date;
    })?.map((obj, index) => {
      total =
        total +
        obj.freeze +
        obj.plan_job_plan_time_hour +
        obj.tg_plan_job_actual_time_hour +
        obj.tg_plan_job_actual_time_ot;
      machine_name.push(obj.machine_description);
      ot.push(obj.tg_plan_job_actual_time_ot);
      success.push(obj.tg_plan_job_actual_time_hour);
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
        ? plan[index] + success[index] == 8
          ? tempOt.push(0)
          : tempOt.push(
            success[index] == 0
              ? obj.plan_job_plan_time_hour - plan[index]
              : obj.plan_job_plan_time_hour - success[index] - plan[index]
          )
        : tempOt.push(plan[index] >= obj.plan_job_plan_time_hour ? 0 : 0);
      return { ...obj };
    });
    console.log("tempOt :>> ", tempOt);
    console.log("freeze :>> ", freeze);
    console.log("machine_name :>> ", machine_name);
    console.log("success :>> ", success);
    console.log("plan :>> ", plan);
    // console.log(
    //   "tempOt fn :>> ",
    //   tempOt.reduce((sum, number) => {
    //     return sum + number / tempOt.length;
    //   }, 0)
    // );
    let graphDay = [
      {
        name: "success",
        data: [
          parseInt(
            success.reduce((sum, number) => {
              return sum + number / success.length;
            }, 0)
          ),
        ],
        plan_day: findUniqueValues(plan_day),
        colors: "#2ECC71",
      },
      {
        name: "plan",
        data: [
          parseInt(
            plan.reduce((sum, number) => {
              return sum + number / plan.length;
            }, 0)
          ),
        ],
        plan_day: findUniqueValues(plan_day),
        colors: "#0000FF",
      },
      {
        name: "tempOt",
        data: [
          parseInt(
            DataTransformer.filter((obj, index) => {
              return obj.date == date;
            })
              .map((obj, index) => {
                return obj.tg_plan_job_actual_time_hour >= 8
                  ? 0
                  : obj.plan_job_plan_time_hour >= 8
                    ? 0
                    : 8.0 - obj.plan_job_plan_time_hour;
              })
              .reduce((sum, number) => {
                return sum + number / tempOt.length;
              }, 0)
          ),
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
          parseInt(
            freeze.reduce((sum, number) => {
              return sum + number / freeze.length;
            }, 0)
          ),
        ],
        plan_day: findUniqueValues(plan_day),
        colors: "#FFFFFF",
      },
    ];
    let graphMachine2 = [
      {
        name: "success",
        data: success,
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

    let graphMachine = [
      {
        name: "success",
        data: DataTransformer.filter((obj, index) => {
          return obj.date == date;
        }).map((obj, index) => {
          return obj.tg_plan_job_actual_time_hour >= 8
            ? 8
            : obj.tg_plan_job_actual_time_hour;
        }),
        machine_description: machine_name,
        colors: "#2ECC71",
      },
      {
        name: "tempot",
        data: DataTransformer.filter((obj, index) => {
          return obj.date == date;
        }).map((obj, index) => {
          return obj.tg_plan_job_actual_time_hour >= 8
            ? obj.tg_plan_job_actual_time_ot
            : 0;
        }),
        machine_description: machine_name,
        colors: "#CC0000",
      },
      {
        name: "plan",
        data: DataTransformer.filter((obj, index) => {
          return obj.date == date;
        }).map((obj, index) => {
          return obj.tg_plan_job_actual_time_hour >= obj.plan_job_plan_time_hour
            ? 0
            : obj.tg_plan_job_actual_time_hour <= obj.plan_job_plan_time_hour
              ? obj.plan_job_plan_time_hour - obj.tg_plan_job_actual_time_hour
              : obj.plan_job_plan_time_hour;
        }),
        machine_description: machine_name,
        colors: "#0000FF",
      },
      {
        name: "freeze",
        data: DataTransformer.filter((obj, index) => {
          return obj.date == date;
        }).map((obj, index) => {
          return obj.tg_plan_job_actual_time_hour >= 8
            ? 0
            : obj.plan_job_plan_time_hour >= 8
              ? 0
              : 8.0 - obj.plan_job_plan_time_hour;
        }),
        machine_description: machine_name,
        colors: "#FFFFFF",
      },
      {
        name: "ot",
        data: DataTransformer.filter((obj, index) => {
          return obj.date == date;
        }).map((obj, index) => {
          return obj.tg_plan_job_actual_time_hour >= 8
            ? 0
            : obj.tg_plan_job_actual_time_ot;
        }),
        machine_description: machine_name,
        colors: "#CC0000",
      },
      {
        name: "freeze",
        data: DataTransformer.filter((obj, index) => {
          return obj.date == date;
        }).map((obj, index) => {
          return obj.freeze;
        }),
        machine_description: machine_name,
        colors: "#FFFFFF",
      },
    ];
    console.log(`graphDay`, graphDay);
    if (type == "machine") {
      console.log("graphMachine if:>> ", graphMachine);
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
      console.log("graphDay[0].plan_day :>> ", graphDay, graphDay[0].plan_day);
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
            events: {
              click: (event, chartContext, config) => {
                console.log("Chart clicked", event, chartContext, config);
              },
            }
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
    console.log("graphMachine2 :>> ", graphMachine2);
  };

  const renderGraph365Day = (params) => {
    console.log("planData :>> ", planData);
    function getMachineCapacityYearly(machine_id = null) {

      let plan = [];
      let success = [];
      let ot = [];
      let tempOt = [];
      let freeze = [];
      let date_plan = [];
      let filter = [];

      filter.push(
        params.reduce((a, c) => {
          const filterMachine = c.detail.filter((res) => res.machine_id == machine_id);

          a.push({
            ...c,
            date_plan: date_plan.push(c.date.substr(0, 10)),
            plan: filterMachine
              .filter((res) => res.plan_job_plan_time_hour >= 0)
              .reduce((acc, cur) => acc + cur.plan_job_plan_time_hour, 0),
            cplan: plan.push(
              filterMachine
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
                .reduce((acc, cur) => acc + cur / filterMachine.length, 0)
            ),
            success: filterMachine
              .filter((res) => res.tg_plan_job_actual_time_hour >= 0)
              .reduce((acc, cur) => acc + cur.tg_plan_job_actual_time_hour, 0),
            csuccess: success.push(
              filterMachine
                .filter((res) => res.tg_plan_job_actual_time_hour >= 0)
                .reduce(
                  (acc, cur) =>
                    acc + cur.tg_plan_job_actual_time_hour / filterMachine.length,
                  0
                )
            ),
            ot: filterMachine
              .filter((res) => res.tg_plan_job_actual_time_ot >= 0)
              .reduce(
                (acc, cur) =>
                  acc + cur.tg_plan_job_actual_time_ot / filterMachine.length,
                0
              ),
            cot: ot.push(
              filterMachine
                .filter((res) => res.tg_plan_job_actual_time_ot >= 0)
                .reduce(
                  (acc, cur) =>
                    acc + cur.tg_plan_job_actual_time_ot / filterMachine.length,
                  0
                )
            ),

            ctempOt: tempOt.push(
              parseInt(
                filterMachine
                  .map((res) =>
                    res.tg_plan_job_actual_time_hour >= 8
                      ? 0
                      : res.plan_job_plan_time_hour >= 8
                        ? 0
                        : 8.0 - res.plan_job_plan_time_hour
                  )
                  .reduce((acc, cur) => acc + cur / filterMachine.length, 0)
              )
            ),
            freeze: filterMachine
              .filter((res) => res.freeze >= 0)
              .reduce((acc, cur) => acc + cur.freeze / filterMachine.length, 0),
            cfreeze: freeze.push(
              filterMachine
                .filter((res) => res.freeze >= 0)
                .reduce((acc, cur) => acc + cur.freeze / filterMachine.length, 0)
            ),
          });
          return a;
        }, [])
      );

      let graphMonth = [
        {
          name: "success",
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

      return graphMonth
    }

    const mixing300 = getMachineCapacityYearly(41);
    const mixing50 = getMachineCapacityYearly(49);
    const mixing1000 = getMachineCapacityYearly(50);
    const mixing2000 = getMachineCapacityYearly(51);

    setstateGraph12Month({
      series: [...mixing300],
      options: {
        colors: [...mixing300?.map((color) => color.colors)],
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
                console.log("e", event)
                selectDate(params, $(event?.target).html());
              }
            }
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
          categories: [...mixing300[0].date_plan],
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

    setStateMixingCream50L({
      series: [...mixing50],
      options: {
        colors: [...mixing50?.map((color) => color.colors)],
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
                console.log("e", event)
                selectDate(params, $(event?.target).html());
              }
            }
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
          categories: [...mixing50[0].date_plan],
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

    setStateMixingCream1000L({
      series: [...mixing1000],
      options: {
        colors: [...mixing1000?.map((color) => color.colors)],
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
                console.log("e", event)
                selectDate(params, $(event?.target).html());
              }
            }
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
          categories: [...mixing1000[0].date_plan],
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

    setStateMixingCream2000L({
      series: [...mixing2000],
      options: {
        colors: [...mixing2000?.map((color) => color.colors)],
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
                console.log("e", event)
                selectDate(params, $(event?.target).html());
              }
            }
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
          categories: [...mixing2000[0].date_plan],
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

    // console.log("graphMonth FN360DAY:>> ", graphMonth);
    // console.log("graphMonth FN360DAY: success>> ", success);
    // console.log("graphMonth FN360DAY: plan>> ", plan);
    // console.log("graphMonth FN360DAY: tempOt>> ", tempOt);
    // console.log("temp_testSum :>> ", temp_testSum);
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
        events: {
          click: (event, chartContext, config) => {
            console.log("Chart clicked", event, chartContext, config);
          },
          dataPointSelection: (event, chartContext, config) => {
            const seriesIndex = config.seriesIndex;
            const dataPointIndex = config.dataPointIndex;
            const value = config.w.config.series[seriesIndex].data[dataPointIndex];

            console.log("Data point clicked", {
              seriesIndex,
              dataPointIndex,
              value,
            });

            // Update state with selected data
            // setSelectedData({ seriesIndex, dataPointIndex, value });
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
            console.log("chartContext", chartContext)
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
  const [stateMixingCream50L, setStateMixingCream50L] = useState({
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
  const [stateMixingCream1000L, setStateMixingCream1000L] = useState({
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
  const [stateMixingCream2000L, setStateMixingCream2000L] = useState({
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
    const currentDate = moment(date2, "DD/MM/YYYY").format('DD/MM/YYYY')

    console.log("dateDefaults :>> ", dateDefaults, currentDate);
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
    console.log("selectDate :>> ", params, date);
    renderGraphMachineAndMount(params, date, "machine");
    renderGraphMachineAndMount(params, date, "day");
  };

  console.log("stateGraphMachine :>> ", stateGraphMachine);
  console.log("planData 2:>> ", planData);
  //console.log("graph :>> ", renderGrap());
  console.log("stateGraph12Month :>> ", stateGraph12Month);
  return (
    <>
      <Row gutter={[8, 8]}>
        <h2>Mixing - Cream 50 L</h2>
        <div className="scroll__container">
          {/* {renderGrap()} */}
          <Chart
            type="bar"
            width={60 * planData.length}
            height={300}
            series={stateMixingCream50L.series}
            options={stateMixingCream50L.options}
          ></Chart>
        </div>
        <h2>Mixing - Cream 300 L</h2>
        <div className="scroll__container">
          {/* {renderGrap()} */}
          <Chart
            type="bar"
            width={60 * planData.length}
            height={300}
            series={stateGraph12Month.series}
            options={stateGraph12Month.options}
          ></Chart>
        </div>
        <h2>Mixing - Cream 1,000 L</h2>
        <div className="scroll__container">
          {/* {renderGrap()} */}
          <Chart
            type="bar"
            width={60 * planData.length}
            height={300}
            series={stateMixingCream1000L.series}
            options={stateMixingCream1000L.options}
          ></Chart>
        </div>
        <h2>Mixing - Cream 2,000 L</h2>
        <div className="scroll__container">
          {/* {renderGrap()} */}
          <Chart
            type="bar"
            width={60 * planData.length}
            height={300}
            series={stateMixingCream2000L.series}
            options={stateMixingCream2000L.options}
          ></Chart>
        </div>
        <Col span={24} style={{ background: "#C6C6CC" }}>
          {/* <span style={{ marginLeft: 10 }}>Autorefresh in </span> */}
          <Tag color="#0000FF" style={{ marginLeft: 100 }}>
            plan
          </Tag>
          <Tag color="#2ECC71">success</Tag>
          {/* <Tag color='#FFA500'>break</Tag> */}
          <Tag color="#000000">holiday</Tag>
          <Tag color="#CC0000">OT</Tag>
          <Tag color="#FFFFFF" style={{ color: "#000000" }}>
            freeze
          </Tag>
          <span style={{ marginLeft: 30 }}>View in </span>
          <DatePicker
            picker="year"
            defaultValue={date2}
            format={"YYYY"}
            onChange={(data) => {
              data ? changeYear(data) : setDate(null);
            }}
          />
        </Col>
      </Row>
    </>
  );
};

export default DashboardsIndex;
