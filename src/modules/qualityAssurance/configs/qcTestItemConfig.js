export const qcTestItemMainColumns = [
  {
    title: "No.",
    align: "center",
    width: "5%",
    render: (value, record, index) => {
      return index + 1;
    },
  },
  {
    title: "Item Type",
    dataIndex: "type_no_name",
    key: "type_no_name",
    align: "left",
  },
  {
    title: "Number of Subject",
    dataIndex: "count_subject",
    key: "count_subject",
    align: "right",
    width: "15%",
  },
  {
    title: "Number of Specification",
    dataIndex: "count_specification",
    key: "count_specification",
    align: "right",
    width: "15%",
  },
  {
    title: "Number of Method",
    dataIndex: "count_method",
    key: "count_method",
    align: "right",
    width: "15%",
  },
];

export const qcTestItemSubjectColumns = [
  {
    id: 1,
    name: "No.",
    size: 1,
    require: false,
  },
  {
    id: 2,
    name: "Subject Name",
    size: 11,
    require: true,
  },
  {
    id: 3,
    name: "Description",
    size: 11,
    require: false,
  },
];
export const qcTestItemSpecColumns = [
  {
    id: 1,
    name: "No.",
    size: 1,
    require: false,
  },
  {
    id: 2,
    name: "Specification Name",
    size: 11,
    require: true,
  },
  {
    id: 3,
    name: "Description",
    size: 11,
    require: false,
  },
];
export const qcTestItemMethodColumns = [
  {
    id: 1,
    name: "No.",
    size: 1,
    require: false,
  },
  {
    id: 2,
    name: "Method Name",
    size: 11,
    require: true,
  },
  {
    id: 3,
    name: "Description",
    size: 11,
    require: false,
  },
];

export const qcTestItemFields = {
  type_id: null,
  type_no_name: null,
};
export const qcTestItemSubjectFields = {
  qa_subject_id: null,
  qa_subject_no: null,
  qa_subject_name: null,
  qa_subject_no_name: null,
  qa_subject_name_th: null,
  qa_subject_remark: null,
  qa_subject_actived: null,
  qa_subject_created: null,
  qa_subject_created_by: null,
  qa_subject_updated: null,
  qa_subject_updated_by: null,
  branch_id: 1,
  branch_no: null,
  branch_name: null,
  branch_no_name: null,
  type_id: null,
  type_no: null,
  type_name: null,
  type_no_name: null,
  commit: 1,
};
export const qcTestItemSpecFields = {
  qa_specification_id: null,
  qa_specification_no: null,
  qa_specification_name: null,
  qa_specification_no_name: null,
  qa_specification_name_th: null,
  qa_specification_remark: null,
  qa_specification_actived: null,
  qa_specification_created: null,
  qa_specification_created_by: null,
  qa_specification_updated: null,
  qa_specification_updated_by: null,
  branch_id: 1,
  branch_no: null,
  branch_name: null,
  branch_no_name: null,
  type_id: null,
  type_no: null,
  type_name: null,
  type_no_name: null,
  commit: 1,
};
export const qcTestItemMethodFields = {
  qa_method_id: null,
  qa_method_no: null,
  qa_method_name: null,
  qa_method_no_name: null,
  qa_method_name_th: null,
  qa_method_remark: null,
  qa_method_actived: null,
  qa_method_created: null,
  qa_method_created_by: null,
  qa_method_updated: null,
  qa_method_updated_by: null,
  branch_id: 1,
  branch_no: null,
  branch_name: null,
  branch_no_name: null,
  type_id: null,
  type_no: null,
  type_name: null,
  type_no_name: null,
  commit: 1,
};
