export const categoryFields = {
  category_name: null,
  type_id: null,
};
export const categoryFieldsRequire = ["category_name", "type_id"];
export const categoryShowColumns = [
  {
    width: "6%",
  },
  {
    title: "No",
    dataIndex: "category_id",
    width: "10%",
    ellipsis: true,
    render: (value, record, index) => {
      return record.id + 1;
    },
  },
  {
    title: "Category Name",
    dataIndex: "category_name",
    ellipsis: true,
  },
];
export const itemShowColumns = [
  {
    title: "No",
    width: "5%",
    dataIndex: "type_id",
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
];
