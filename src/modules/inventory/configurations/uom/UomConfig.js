export const uomFields = {
  uom_no: null,
  uom_name: null,
  user_name: null,
  uom_remark: "",
  uom_name_th: "",
  commit: 0,
};
export const uomFieldsReQuire = ["uom_no", "uom_name", "unit_value"];
export const uomFieldsReQuire2 = [
  "uom_no",
  "uom_name",
  "unit_value",
  "uom_name_ref",
  "ratio",
  "size_of_ref",
];

export const uomShowColumns = [
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
    title: "UoM Name",
    dataIndex: "uom_name",
    ellipsis: true,
  },
  {
    title: "Short Name",
    dataIndex: "uom_no",
    align: "left",
    ellipsis: true,
  },
];
export const dataOptions = [
  { value: "bigger", label: "Bigger than the reference Unit of Measure" },
  { value: "smaller", label: "Smaller than the reference Unit of Measure" },
  { value: "equal", label: "Equal than the reference Unit of Measure" },
];
