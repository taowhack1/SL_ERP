/** @format */

export const columns = [
  {
    id: 1,
    title: "No.",
    dataIndex: "id",
    width: "3%",
    align: "center",
    render: (value, record, index) => {
      return index + 1;
    },
  },
  {
    id: 2,
    title: "Item Code",
    dataIndex: "ItemCode",
    width: "10%",
    align: "left",
  },
  {
    id: 3,
    title: "Item Name",
    dataIndex: "ItemName",
    width: "10%",
    align: "left",
  },
  {
    id: 4,
    title: "Lot / Batch no",
    dataIndex: "Lot",
    width: "10%",
    align: "left",
  },
  {
    id: 6,
    title: "Quantity on Qc.",
    dataIndex: "Quantity",
    width: "10%",
    align: "center",
  },
  {
    id: 6,
    title: "Qty. Pass",
    dataIndex: "Pass",
    width: "10%",
    align: "center",
  },
  {
    id: 6,
    title: "Qty. Reject",
    dataIndex: "Reject",
    width: "10%",
    align: "center",
  },
  //   {
  //     id: 5,
  //     title: "Working Time",
  //     dataIndex: "routing_working_time_hour",
  //     width: "10%",
  //     align: "center",
  //     render: (value, record, index) => {
  //       return `${value} hour`;
  //     },
  //   },
];

export const datamackup = [
  {
    id: 1,
    ItemCode: "101SRLA000500",
    ItemName: "Lipomulse luxe",
    Lot: "[ ABCD / 1213100035 ]",
    Quantity: "1.0",
    Pass: "1.0",
    Reject: "0",
  },
];
