export const uomFields = {
  uom_id: null,
  uom_no: null,
  uom_name: null,
  uom_no_name: null,
  commit: null,
};
export const uomFieldsReQuire = ["uom_no", "uom_name"];
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
    title: "Uom Name",
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
