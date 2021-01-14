export const type_fields = {
  typ_id: null,
  type_no: null,
  type_name: null,
  qc_status: null,
  commit: 1,
};
export const type_fields_require = ["type_no", "type_name", "qc_status"];
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
    title: "Qc",
    dataIndex: "qc_status",
    width: "10%",
    align: "left",
    ellipsis: true,
  },
];
