/** @format */

export const transferColumnsHead = [
  {
    title: "No",
    dataIndex: "transfer_id",
    width: "20%",
    ellipsis: true,
    render: (value, record, index) => {
      return value;
    },
  },
  {
    title: "Transfer No",
    dataIndex: "transfer_no",
    width: "20%",
    align: "left",
    ellipsis: true,
  },
  {
    title: "Create By",
    dataIndex: "trans_created_by_no_name",
    width: "30%",
    align: "left",
    ellipsis: true,
  },
  {
    title: "Create Date",
    dataIndex: "trans_created",
    width: "30%",
    align: "left",
    ellipsis: true,
  },
  {
    title: "Description",
    dataIndex: "description",
    width: "40%",
    align: "left",
    ellipsis: true,
  },
];
export const transferColumnsSubtable = [
  {
    width: "2%",
  },
  {
    title: "No",
    dataIndex: "id",
    width: "3%",
    align: "left",
    ellipsis: true,
  },
  {
    title: "Item",
    dataIndex: "item",
    width: "10%",
    align: "left",
    ellipsis: true,
  },
  {
    title: "Source Location/Shelf",
    dataIndex: "sourceLocation",
    width: "10%",
    align: "left",
    ellipsis: true,
  },
  {
    title: "Destination Locations",
    dataIndex: "destinationLocation",
    width: "10%",
    align: "left",
    ellipsis: true,
  },
  {
    title: "Quantity",
    dataIndex: "qty",
    width: "5%",
    align: "left",
    ellipsis: true,
  },
  {
    title: "unit",
    dataIndex: "unit",
    width: "5%",
    align: "left",
    ellipsis: true,
  },
  {
    title: "Quantity Transfer",
    dataIndex: "qty_trafer",
    width: "5%",
    align: "left",
    ellipsis: true,
  },
  {
    title: "Unit Transfer",
    dataIndex: "unit_transfer",
    width: "5%",
    align: "left",
    ellipsis: true,
  },
];
export const TransferRequireFileds = [];
export const TransferDetailRequireFileds = [
  "destinationLocation_id",
  "sourceLocation",
  "item_id",
  "qty_trafer",
  "unit_transfer",
];
export const TransferDetailFileds = {
  id: null,
  rowId: null,
  item_id: null,
  item_name: null,
  sourceLocation: null,
  destinationLocation_id: null,
  unit_transfer: null,
  qty_trafer: null,
  qty: null,
  unit: null,
  delete_item: null,
};
export const TransferLotBatchfileds = {
  id: null,
  item_id: null,
  item_no_name: null,
};
export const TransferHeadfileds = {
  transfer_no: null,
  trans_created_by_no_name: null,
  description: null,
  trans_created: null,
};
export const TransferDetailColumns = [
  {
    id: 0,
    name: "No",
    size: 1,
    require: false,
  },
  {
    id: 1,
    name: "Item",
    size: 4,
    require: true,
  },
  {
    id: 2,
    name: "Source Location/Shelf",
    size: 4,
    require: true,
  },
  {
    id: 3,
    name: "Destination Locations",
    size: 4,
    require: true,
  },
  {
    id: 4,
    name: "Quantity",
    size: 2,
    require: false,
  },
  {
    id: 5,
    name: "Unit",
    size: 2,
    require: false,
  },
  {
    id: 6,
    name: "Quantity Transfer",
    size: 3,
    require: true,
  },
  {
    id: 7,
    name: "Unit Transfer",
    size: 3,
    require: true,
  },
];

export const mockupData = [
  {
    transfer_id: 1,
    transfer_no: "Tran-001",
    trans_created_by_no_name: "[ 2563009 ] เพชร",
    trans_created: "26-01-2021",
    description: "ทดสอบ",
  },
];

export const mockupDataDetail = [
  {
    id: 1,
    transfer_id: 1,
    transfer_no: "Tran-001",
    item: "[ 101SRLA00100 ] KELTROL CG SFT",
    sourceLocation: "[ L001 / S0104 ] Location RM / Shelf RM Usage",
    destinationLocation: "[ L002 / S0204 ] Location PK / Shelf RM Usage",
    qty: "1",
    unit: "kg",
    qty_trafer: "1",
    unit_transfer: "kg",
  },
  {
    id: 2,
    transfer_id: 1,
    transfer_no: "Tran-001",
    item: "[ 101SRLA00100 ] KELTROL CG SFT",
    sourceLocation: "[ L001 / S0104 ] Location RM / Shelf RM Usage",
    destinationLocation: "[ L002 / S0204 ] Location PK / Shelf RM Usage",
    qty: "1",
    unit: "kg",
    qty_trafer: "1",
    unit_transfer: "kg",
  },
];
