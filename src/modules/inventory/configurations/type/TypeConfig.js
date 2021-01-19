export const type_fields = {
  type_no: null,
  type_name: null,
  type_verify_qc: 0,
  type_verify_stock: 0,
  type_created: null,
  type_remark: "",
  user_name: null,
  commit: 0,
};
export const type_fields_require = ["type_no", "type_name", "type_created"];
export const item_show_columns = [
  {
    title: "No",
    width: "10%",
    dataIndex: "id",
    ellipsis: true,
    render: (value, record, index) => {
      return record.id + 1;
    },
  },
  {
    title: "Type Name",
    dataIndex: "type_name",
    ellipsis: true,
  },
  {
    title: "Short Name",
    dataIndex: "type_no",
    align: "left",
    ellipsis: true,
  },
  {
    title: "Stock",
    dataIndex: "type_verify_stock",
    key: "type_verify_stock",
    width: "10%",
    align: "left",
    render: (value, record, index) => {
      return value ? "Yes" : "No";
    },
  },
  {
    title: "Qc",
    dataIndex: "type_verify_qc",
    key: "type_verify_qc",
    width: "10%",
    align: "left",
    render: (value, record, index) => {
      return value ? "Yes" : "No";
    },
    ellipsis: true,
  },
];
