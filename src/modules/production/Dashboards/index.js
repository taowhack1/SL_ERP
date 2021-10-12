/** @format */

import { Col, Row, Tag } from "antd";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import { getGraph360Day } from "../../../actions/production/DashboardsAction";
import { sortData } from "../../../include/js/function_main";
import Authorize from "../../system/Authorize";
const temp_api = [
  {
    date: "01-09-2021",
    detail: [
      {
        date: "01-09-2021",
        id: 1,
        machine_id: 1,
        freeze: 24,
        plan_job_plan_time: 6,
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
        plan_job_plan_time: 8,
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
        plan_job_plan_time: 6,
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
        plan_job_plan_time: 6,
        plan_job_date: "02-09-2021",
        tg_plan_job_actual_time_hour: 0,
        tg_plan_job_actual_time_ot: 0,
        machine_description: "เครื่อง Filling & Packing",
      },
    ],
  },
];

const DashboardsIndex = () => {
  const authorize = Authorize();
  authorize.check_authorize();
  const renderGraphMachineAndMount = (data, date, type) => {
    console.log("type :>> ", type);
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
        obj.plan_job_plan_time +
        obj.tg_plan_job_actual_time_hour +
        obj.tg_plan_job_actual_time_ot;
      machine_name.push(obj.machine_description);
      ot.push(obj.tg_plan_job_actual_time_ot);
      sucess.push(obj.tg_plan_job_actual_time_hour);
      obj.tg_plan_job_actual_time_hour >= obj.plan_job_plan_time
        ? plan.push(0)
        : obj.tg_plan_job_actual_time_hour <= obj.plan_job_plan_time
        ? plan.push(obj.plan_job_plan_time - obj.tg_plan_job_actual_time_hour)
        : plan.push(obj.plan_job_plan_time);
      freeze.push(obj.freeze);
      plan_day.push(obj.date);
      //plan_day.push(obj.plan_job_date);
      obj.tg_plan_job_actual_time_ot !== 0
        ? plan[index] + sucess[index] == 8
          ? tempOt.push(0)
          : tempOt.push(
              sucess[index] == 0
                ? 8 - plan[index]
                : 8 - sucess[index] - plan[index]
            )
        : tempOt.push(8 - sucess[index] - plan[index]);
      return { ...obj };
    });
    console.log("tempOt :>> ", tempOt);
    console.log(
      "tempOt fn :>> ",
      tempOt.reduce((sum, number) => {
        return sum + number / tempOt.length;
      }, 0)
    );
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
            categories: graphMachine[0].machine_description,
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
  };
  const renderGraph365Day = (params) => {
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
          .filter((res) => res.plan_job_plan_time >= 0)
          .reduce((acc, cur) => acc + cur.plan_job_plan_time, 0),
        cplan: plan.push(
          c.detail
            .map((res) =>
              res.tg_plan_job_actual_time_hour >= res.plan_job_plan_time
                ? 0
                : res.tg_plan_job_actual_time_hour <= res.plan_job_plan_time
                ? res.plan_job_plan_time - res.tg_plan_job_actual_time_hour
                : res.plan_job_plan_time
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
              res.tg_plan_job_actual_time_ot !== 0
                ? res.plan_job_plan_time + res.tg_plan_job_actual_time_hour >= 8
                  ? 0
                  : res.tg_plan_job_actual_time_hour == 0
                  ? 8 - res.plan_job_plan_time
                  : 8 - res.plan_job_plan_time
                : 8 - res.plan_job_plan_time
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
              if (event.target.localName == "tspan") {
                renderGraphMachineAndMount(
                  temp_api,
                  event.explicitOriginalTarget.textContent,
                  "machine"
                );
                renderGraphMachineAndMount(
                  temp_api,
                  event.explicitOriginalTarget.textContent,
                  "day"
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
  });

  const { user_name } = useSelector((state) => state.auth.authData);
  useEffect(() => {
    const getGraph360DayFN = async () => {
      const resp = await getGraph360Day();
      console.log("getGraph360DayFN", resp);
      resp.success && setPlanData(sortData(resp.data));
      renderGraphMachineAndMount(sortData(resp.data), "02/09/2021", "machine");
      renderGraphMachineAndMount(sortData(resp.data), "02/09/2021", "day");
      renderGraph365Day(sortData(resp.data));
    };
    getGraph360DayFN();
  }, []);
  const [planData, setPlanData] = useState([]);

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
            width={500}
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
          <Tag color='#FFA500'>break</Tag>
          <Tag color='#000000'>holiday</Tag>
          <Tag color='#CC0000'>OT</Tag>
          <Tag color='#FFFFFF' style={{ color: "#000000" }}>
            freeze
          </Tag>
        </Col>
        <Chart
          className='scroll__container'
          type='bar'
          width={1920}
          height={300}
          series={stateGraph12Month.series}
          options={stateGraph12Month.options}></Chart>
      </Row>
    </>
  );
};

export default DashboardsIndex;
