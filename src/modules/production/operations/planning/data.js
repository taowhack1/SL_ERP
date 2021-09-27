export const rawData = {
  breakTime: [
    ["12:00", "13:00"],
    ["19:00", "20:00"],
  ],
  machine: [
    {
      id: "MOCKUP20092101",
      title: "Mix 300kg",
    },
    {
      id: "MOCKUP20092102",
      title: "Mix 50kg",
    },
    {
      id: "MOCKUP20092103",
      title: "Filling & Packing #1",
    },
    {
      id: "MOCKUP20092104",
      title: "Filling & Packing #2",
    },
  ],
  plan2: [
    {
      id: 1,
      resourceId: "MOCKUP20092101", //machine_id
      start: "2021-09-01", //plan_job_date
      title: "", //ปล่อยว่าง
      color: "white", //ส่งมาแบบนี้
      sumDayHour: "08:00", // เวลารวมกะเช้า
      sumNightHour: "04:00", // เวลารวมกะดึก
      extends: {
        //ใช้คีย์นี้เท่านั้น
        job_detail: [
          // ใช้คีย์นี้
          {
            id: 0,
            plan_job_no: "PLN2021040002",
            plan_job_plan_time: "08:00:00",
            plan_job_worker: 1,
            shift_job_id: 1,
          },
          {
            id: 3,
            plan_job_no: "PLN2021040003",
            plan_job_plan_time: "04:00:00",
            plan_job_worker: 2,
            shift_job_id: 2,
          },
        ],
      },
    },
    {
      id: "A-11502212-20210405",
      resourceId: "MOCKUP20092101", //เครื่อง
      start: "2021-09-02", //วันที่เริ่ม
      title: "", //ปล่อยว่าง
      color: "white",
      sumDayHour: "08:00",
      sumNightHour: "00:00",
      extends: {
        //ใช้คีย์นี้เท่านั้น
        job_detail: [
          {
            id: 0,
            plan_job_no: "PLN2021040002",
            plan_job_plan_time: "04:00:00",
            plan_job_worker: 1,
            shift_job_id: 1,
          },
          {
            id: 1,
            plan_job_no: "PLN2021040003",
            plan_job_plan_time: "04:00:00",
            plan_job_worker: 1,
            shift_job_id: 1,
          },
        ],
      },
    },
    {
      id: "A-11502212-20210406",
      resourceId: "MOCKUP20092103", //เครื่อง
      start: "2021-09-03", //วันที่เริ่ม
      title: "", //ปล่อยว่าง
      color: "white",
      sumDayHour: "08:00",
      sumNightHour: "00:00",
      extends: {
        //ใช้คีย์นี้เท่านั้น
        job_detail: [
          {
            id: 0,
            plan_job_no: "PLN2021040002",
            plan_job_plan_time: "04:00:00",
            plan_job_worker: 1,
            shift_job_id: 1,
          },
          {
            id: 1,
            plan_job_no: "PLN2021040003",
            plan_job_plan_time: "04:00:00",
            plan_job_worker: 1,
            shift_job_id: 1,
          },
        ],
      },
    },
  ],
  plan3: [
    {
      id: "A-11502212-20210404",
      resourceId: "MOCKUP20092101", //เครื่อง
      start: "2021-09-01", //วันที่เริ่ม
      title: "", //ปล่อยว่าง
      color: "white",
      isDay: true,
    },
    {
      id: "A-11502212-20210404",
      resourceId: "MOCKUP20092102", //เครื่อง
      start: "2021-09-02", //วันที่เริ่ม
      title: "", //ปล่อยว่าง
      color: "white",
      isDay: true,
    },
  ],
};
