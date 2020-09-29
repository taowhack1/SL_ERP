export const columns = [
  {
    title: "Reference",
    dataIndex: "transfer_ref_code",
  },
  {
    title: "From",
    dataIndex: "transfer_from",
    sorter: {
      compare: (a, b) => a.chinese - b.chinese,
      multiple: 3,
    },
  },
  {
    title: "To",
    dataIndex: "transfer_to",
    sorter: {
      compare: (a, b) => a.math - b.math,
      multiple: 2,
    },
  },
  {
    title: "Contact",
    dataIndex: "transfer_contact",
    sorter: {
      compare: (a, b) => a.english - b.english,
      multiple: 1,
    },
  },
  {
    title: "Request Date",
    dataIndex: "transfer_req_date",
    ellipsis: true,
  },
  {
    title: "Scheduled Date",
    dataIndex: "transfer_sch_date",
    ellipsis: true,
  },
  {
    title: "Source Document",
    dataIndex: "transfer_source_doc",
    ellipsis: true,
  },
  {
    title: "Status",
    dataIndex: "transfer_status",
    ellipsis: true,
  },
];
export const columnsItem = [
  {
    title: "Code",
    dataIndex: "itemCode",
  },
  {
    title: "Barcode",
    dataIndex: "itemBarcode",
    sorter: {
      compare: (a, b) => a.chinese - b.chinese,
      multiple: 3,
    },
  },
  {
    title: "Item Name",
    dataIndex: "itemName",
    sorter: {
      compare: (a, b) => a.math - b.math,
      multiple: 2,
    },
  },
  {
    title: "Qty On Hand",
    dataIndex: "itemQtyOnhand",
    sorter: {
      compare: (a, b) => a.english - b.english,
      multiple: 1,
    },
  },
  {
    title: "Category",
    dataIndex: "itemCateg",
    ellipsis: true,
  },
  {
    title: "Description",
    dataIndex: "itemDesc",
    ellipsis: true,
  },
];

export const columnsMove = [
  {
    title: "Date",
    dataIndex: "tfReqDate",
  },
  {
    title: "Reference",
    dataIndex: "tfRefCode",
    sorter: {
      compare: (a, b) => a.chinese - b.chinese,
      multiple: 3,
    },
  },
  {
    title: "Item",
    dataIndex: "tfItem",
    sorter: {
      compare: (a, b) => a.english - b.english,
      multiple: 1,
    },
  },
  {
    title: "Lot/Batch No.",
    dataIndex: "tfLot",
    sorter: {
      compare: (a, b) => a.english - b.english,
      multiple: 1,
    },
  },
  {
    title: "From",
    dataIndex: "tfForm",
    sorter: {
      compare: (a, b) => a.english - b.english,
      multiple: 1,
    },
  },
  {
    title: "To",
    dataIndex: "tfTo",
    sorter: {
      compare: (a, b) => a.english - b.english,
      multiple: 1,
    },
  },
  {
    title: "Qty",
    dataIndex: "tfQty",
    sorter: {
      compare: (a, b) => a.english - b.english,
      multiple: 1,
    },
  },
  {
    title: "Unit",
    dataIndex: "tfUnit",
    sorter: {
      compare: (a, b) => a.english - b.english,
      multiple: 1,
    },
  },
  {
    title: "Status",
    dataIndex: "tfStatus",
    sorter: {
      compare: (a, b) => a.english - b.english,
      multiple: 1,
    },
  },
];

export const dataMove = [
  {
    id: 0,
    tfReqDate: "17/09/2020",
    tfRefCode: "TF2009-000001",
    tfItem: "[102SLA030001] Item 1",
    tfLot: "20080001",
    tfForm: "Location 1",
    tfTo: "Location 2",
    tfQty: 300.0,
    tfUnit: "Liter",
    tfStatus: "Done",
  },
  {
    id: 1,
    tfReqDate: "18/09/2020",
    tfRefCode: "TF2009-000002",
    tfItem: "[102SLA030002] Item 2",
    tfLot: "20080012",
    tfForm: "Location 3",
    tfTo: "Location 2",
    tfQty: 50.0,
    tfUnit: "pc",
    tfStatus: "Done",
  },
  {
    id: 2,
    tfReqDate: "20/09/2020",
    tfRefCode: "",
    tfItem: "[102SLA030003] Item 4",
    tfLot: "20080003",
    tfForm: "Location 1",
    tfTo: "Location 4",
    tfQty: 120.0,
    tfUnit: "pack",
    tfStatus: "Draft",
  },
  {
    id: 3,
    tfReqDate: "23/09/2020",
    tfRefCode: "TF2009-000003",
    tfItem: "[102SLA030005] Item 99",
    tfLot: "20080001",
    tfForm: "Location 1",
    tfTo: "Location 2",
    tfQty: 390.0,
    tfUnit: "Liter",
    tfStatus: "To Approve",
  },
];
export const reqColumns = [
  {
    title: "Reference",
    dataIndex: "req_code",
  },
  {
    title: "Request Date",
    dataIndex: "req_date",
    ellipsis: true,
  },
  {
    title: "Location",
    dataIndex: "req_to",
    ellipsis: true,
  },
  {
    title: "Contact",
    dataIndex: "req_contact",
    sorter: {
      compare: (a, b) => a.chinese - b.chinese,
      multiple: 3,
    },
  },
  {
    title: "Description",
    dataIndex: "req_desc",
    ellipsis: true,
  },
];

export const data = [
  {
    key: 1,
    transfer_ref_code: "TF2008-00001",
    transfer_from: "WH/RM",
    transfer_to: "WH/QC",
    transfer_contact: "Somsak",
    transfer_req_date: "17/09/2020",
    transfer_sch_date: "20/09/2020",
    transfer_source_doc: "QC2008-00001",
    transfer_status: "Confirm",
  },
  {
    key: 2,
    transfer_ref_code: "TF2008-00002",
    transfer_from: "WH/FG",
    transfer_to: "WH/Delivery",
    transfer_contact: "Somsak",
    transfer_req_date: "17/09/2020",
    transfer_sch_date: "30/09/2020",
    transfer_source_doc: "SO2008-00001",
    transfer_status: "To Approve",
  },
  {
    key: 3,
    transfer_ref_code: "TF2008-00003",
    transfer_from: "WH/RM",
    transfer_to: "WH/MN",
    transfer_contact: "Somsak",
    transfer_req_date: "19/09/2020",
    transfer_sch_date: "23/09/2020",
    transfer_source_doc: "-",
    transfer_status: "Done",
  },
  {
    key: 4,
    transfer_ref_code: "TF2008-00004",
    transfer_from: "WH/RM",
    transfer_to: "WH/MN",
    transfer_contact: "Somsak",
    transfer_req_date: "17/09/2020",
    transfer_sch_date: "20/09/2020",
    transfer_source_doc: "-",
    transfer_status: "Draft",
  },
  {
    key: 5,
    transfer_ref_code: "TF2008-00005",
    transfer_from: "WH/Bluk",
    transfer_to: "WH/Packaging",
    transfer_contact: "KriangKrai",
    transfer_req_date: "17/09/2020",
    transfer_sch_date: "20/09/2020",
    transfer_source_doc: "PK2008-00001",
    transfer_status: "Draft",
  },
  {
    key: 6,
    transfer_ref_code: "TF2008-00006",
    transfer_from: "WH/RM",
    transfer_to: "WH/MN",
    transfer_contact: "Somsak",
    transfer_req_date: "20/09/2020",
    transfer_sch_date: "27/09/2020",
    transfer_source_doc: "-",
    transfer_status: "Draft",
  },
  {
    key: 7,
    transfer_ref_code: "TF2008-00007",
    transfer_from: "WH/RM",
    transfer_to: "WH/MN",
    transfer_contact: "KriangKrai",
    transfer_req_date: "19/09/2020",
    transfer_sch_date: "23/09/2020",
    transfer_source_doc: "-",
    transfer_status: "Draft",
  },
];

export const columnsLocation = [
  {
    title: "Location",
    dataIndex: "transfer_ref_code",
  },
  {
    title: "Warehouse",
    dataIndex: "transfer_from",
    sorter: {
      // compare: (a, b) => a.chinese - b.chinese,
      multiple: 3,
    },
  },
  {
    title: "Description",
    dataIndex: "transfer_to",
    sorter: {
      // compare: (a, b) => a.math - b.math,
      multiple: 2,
    },
  },
];

export const autoCompleteUser = [
  { value: "2559001 สุรเชษฐ อุ่นหล้า" },
  { value: "2563002 ตุลาการ สังอ่อนดี" },
  { value: "2563003 กิตติกานต์ สันติศานติ์" },
  { value: "2563005 ทัศน์วรรณ  วรรณะ" },
  { value: "2563006 อารียา พิกุลทอง" },
  { value: "2563007 ปณิจชัย แจงเล็ก" },
];
export const autoCompleteItem = [
  { value: "[102SRLA01700] SCT-995" },
  { value: "[102SRLA00200] GLYCENRINE" },
  {
    value: "[109SRLA00700] SWD-4511 D&C Red 7 Ca Lake Synthtic Wax Dispersion",
  },
  { value: "[102SRLA02100] OXETAL VD-92" },
];
export const autoCompleteUnit = [
  { value: "unit" },
  { value: "pc" },
  { value: "cm" },
  { value: "g" },
  { value: "lbs" },
  { value: "kg" },
];
export const locationData = [
  {
    id: 1,
    name: "Location 1",
  },
  {
    id: 2,
    name: "Location 2",
  },
  {
    id: 3,
    name: "Location 3",
  },
  {
    id: 4,
    name: "Location 4",
  },
  {
    id: 5,
    name: "Location 5",
  },
  {
    id: 6,
    name: "Location 6",
  },
  {
    id: 7,
    name: "Location 7",
  },
  {
    id: 8,
    name: "Location 8",
  },
  {
    id: 9,
    name: "Location 9",
  },
  {
    id: 10,
    name: "Location 10",
  },
  {
    id: 11,
    name: "Location 11",
  },
];

export const reqItemLine = [
  {
    line_id: 0,
    item_name: `line_0`,
    item_qty: 0.0001,
    item_lot: 1,
    item_qty_done: 0,
    item_unit: "pc",
  },
  {
    line_id: 1,
    item_name: `line_1`,
    item_qty: 0.0001,
    item_lot: 2,
    item_qty_done: 0,
    item_unit: "unit",
  },
];
