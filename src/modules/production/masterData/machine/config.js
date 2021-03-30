export const work_center_columns = [
  {
    title: "Code",
    dataIndex: "work_center_no",
    width: "10%",
    align: "left",
    ellipsis: true,
  },
  {
    title: "Description",
    dataIndex: "work_center_description",
    ellipsis: true,
  },
  {
    title: "Type",
    dataIndex: "work_center_type_name",
    width: "10%",
    align: "left",
    ellipsis: true,
  },
  {
    title: "Use For",
    dataIndex: "type_name",
    width: "20%",
    ellipsis: true,
  },
];
export const machine_columns = [
  {
    title: "Code",
    dataIndex: "machine_cost_center",
    width: "10%",
    align: "left",
    ellipsis: true,
  },
  {
    title: "Name",
    dataIndex: "machine_description",
    ellipsis: true,
  },
  {
    title: "Type",
    dataIndex: "machine_type_name",
    width: "15%",
    align: "left",
    ellipsis: true,
  },
  {
    title: "Category",
    dataIndex: "machine_category_name",
    width: "20%",
    align: "left",
    ellipsis: true,
  },
  {
    title: "Remark",
    dataIndex: "machine_remark",
    width: "20%",
    ellipsis: true,
  },
];

export const machine_fields = {
  machine_id: null,
  machine_cost_center: null,
  machine_description: null,
  machine_description_th: null,
  machine_mfg_date: null,
  machine_exp_date: null,
  machine_remark: null,
  machine_actived: 1,
  machine_created: null,
  machine_created_by: null,
  machine_updated: null,
  machine_updated_by: null,
  branch_id: 1,
  machine_type_id: null,
  machine_type_name: null,
  machine_category_id: null,
  machine_category_name: null,
  machine_type_tool_id: 1,
  machine_cost_floor: 0,
  machine_cost_dl: 0,
  machine_cost_el: 0,
};

export const machine_require_fields = [
  "machine_description",
  "machine_type_id",
  "machine_mfg_date",
];

export const work_center_fields = {
  work_center_description: null,
  branch_id: 1,
  type_id: null,
  work_center_type_id: null,
  work_center_category_id: null,
  capacity_category_id: 1,
  user_name: null,
  work_center_time: null,
  work_center_remark: null,
  work_center_agreement: null,
  work_center_worker: 0,
  work_center_actived: 1,
  commit: 1,
};

export const work_center_require_fields = [
  "type_id",
  "work_center_description",
  "work_center_type_id",
  "work_center_category_id",
  "capacity_category_id",
  "work_center_time",
  "work_center_worker",
];
export const work_center_detail_fields = {
  id: null,
  work_center_detail_worker: 0,
  machine_id: null,
  work_center_detail_remark: null,
  commit: 1,
};
export const work_center_detail_require_fields = ["machine_id"];

export const work_center_detail_columns = [
  {
    id: 0,
    name: "No",
    size: 1,
    require: true,
  },
  {
    id: 1,
    name: "Machine or Tool",
    size: 12,
    require: true,
  },
  {
    id: 2,
    name: "Remark",
    size: 10,
    require: false,
  },
];

// machine_description;
// machine_cost_center;
// machine_type_id;
// branch_id;
// user_name;
// machine_cost_floor;
// machine_cost_dl;
// machine_cost_el;
// machine_remark;
// machine_mfg_date;
// machine_exp_date;
// commit;
// machine_cost_center_main > machine_cost_center_main;
// machine_description_main > machine_description_main;
// machine_cost_center_description_main > machine_cost_center_description_main;
// machine_cost_center_sub > machine_cost_center_sub;
// machine_description_sub > machine_description_sub;
// machine_cost_center_description_sub > machine_cost_center_description_sub;
// machine_cost_center > machine_cost_center;
// machine_description > machine_description;
