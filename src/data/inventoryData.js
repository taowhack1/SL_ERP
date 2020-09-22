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
  {
    key: 8,
    transfer_ref_code: "TF2008-00008",
    transfer_from: "WH/RM",
    transfer_to: "WH/MN",
    transfer_contact: "Somruk",
    transfer_req_date: "19/09/2020",
    transfer_sch_date: "23/09/2020",
    transfer_source_doc: "-",
    transfer_status: "Draft",
  },
  {
    key: 9,
    transfer_ref_code: "TF2008-00009",
    transfer_from: "WH/RM",
    transfer_to: "WH/MN",
    transfer_contact: "Amorn",
    transfer_req_date: "19/09/2020",
    transfer_sch_date: "23/09/2020",
    transfer_source_doc: "-",
    transfer_status: "Draft",
  },
  {
    key: 10,
    transfer_ref_code: "TF2008-00010",
    transfer_from: "WH/RM",
    transfer_to: "WH/MN",
    transfer_contact: "Amorn",
    transfer_req_date: "19/09/2020",
    transfer_sch_date: "23/09/2020",
    transfer_source_doc: "-",
    transfer_status: "Draft",
  },
  {
    key: 11,
    transfer_ref_code: "TF2008-00011",
    transfer_from: "WH/RM",
    transfer_to: "WH/MN",
    transfer_contact: "Amorn",
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
