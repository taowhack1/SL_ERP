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

const getStatusName = (id) => {
  switch (id) {
    case 0:
      return "Draft";
    case 1:
      return "Confirm";
    case 2:
      return "Validate";
    case 3:
      return "Done";
  }
};
export const receiveData = [
  {
    id: 0,
    r_code: "R2009-00001",
    po_code: "PO2009-0001",
    v_name: "บริษัท ผู้ขาย 1 จำกัด",
    r_location: "Location 1",
    r_create_date: "25/09/2020",
    r_schedule_date: "30/09/2020",
    r_status: getStatusName(1),
    r_total: 255550,
    r_vat: 700,
    r_include_vat: 256700,
    r_remark: "remark 1",
    dataLine: [
      {
        id: 0,
        item: "item 1",
        item_qty: 30,
        item_unit: "pc",
        item_qty_done: 30,
        item_unit_price: 50,
        item_subtotal: 1500,
        item_qty_done_detail: [
          {
            id: 0,
            d_batch_no: "20090001",
            d_receive_date: "26/09/2020",
            d_mfg: "01/09/2020",
            d_exp: "01/09/2021",
            d_qty: 30,
            d_unit: "pc",
          },
        ],
      },
      {
        id: 1,
        item: "item 2",
        item_qty: 30,
        item_unit: "pc",
        item_qty_done: 0,
        item_unit_price: 200,
        item_subtotal: 6000,
        item_qty_done_detail: [
          {
            id: 0,
            d_batch_no: null,
            d_receive_date: null,
            d_mfg: null,
            d_exp: null,
            d_qty: 0,
            d_unit: null,
          },
        ],
      },
      {
        id: 2,
        item: "item 3",
        item_qty: 75,
        item_unit: "pc",
        item_qty_done: 0,
        item_unit_price: 10,
        item_subtotal: 750,
        item_qty_done_detail: [
          {
            id: 0,
            d_batch_no: null,
            d_receive_date: null,
            d_mfg: null,
            d_exp: null,
            d_qty: 0,
            d_unit: null,
          },
        ],
      },
      {
        id: 3,
        item: "item 4",
        item_qty: 50,
        item_unit: "pc",
        item_qty_done: 0,
        item_unit_price: 50,
        item_subtotal: 2500,
        item_qty_done_detail: [
          {
            id: 0,
            d_batch_no: null,
            d_receive_date: null,
            d_mfg: null,
            d_exp: null,
            d_qty: 0,
            d_unit: null,
          },
        ],
      },
    ],
  },
  {
    id: 1,
    r_code: "R2009-00002",
    po_code: "PO2009-0002",
    v_name: "บริษัท ผู้ขาย 2 จำกัด",
    r_location: "Location 2",
    r_create_date: "25/09/2020",
    r_schedule_date: "30/09/2020",
    r_status: getStatusName(2),
    r_total: 155550,
    r_vat: 700,
    r_include_vat: 156700,
    r_remark: "remark 2",
    dataLine: [
      {
        id: 0,
        item: "item 3",
        item_qty: 120,
        item_unit: "pc",
        item_qty_done: 65,
        item_unit_price: 50,
        item_subtotal: 6000,
        item_qty_done_detail: [
          {
            id: 0,
            d_batch_no: "20090002",
            d_receive_date: "26/09/2020",
            d_mfg: "01/09/2020",
            d_exp: "01/09/2021",
            d_qty: 30,
            d_unit: "pc",
          },
          {
            id: 1,
            d_batch_no: "20090003",
            d_receive_date: "27/09/2020",
            d_mfg: "01/09/2020",
            d_exp: "01/09/2021",
            d_qty: 35,
            d_unit: "pc",
          },
        ],
      },
      {
        id: 1,
        item: "item 7",
        item_qty: 70,
        item_unit: "pc",
        item_qty_done: 30,
        item_unit_price: 200,
        item_subtotal: 14000,
        item_qty_done_detail: [
          {
            id: 0,
            d_batch_no: "20090002",
            d_receive_date: "26/09/2020",
            d_mfg: "01/09/2020",
            d_exp: "01/09/2021",
            d_qty: 10,
            d_unit: "pc",
          },
          {
            id: 1,
            d_batch_no: "20090003",
            d_receive_date: "28/09/2020",
            d_mfg: "01/09/2020",
            d_exp: "01/09/2021",
            d_qty: 10,
            d_unit: "pc",
          },
          {
            id: 2,
            d_batch_no: "20090004",
            d_receive_date: "29/09/2020",
            d_mfg: "01/09/2020",
            d_exp: "01/09/2021",
            d_qty: 10,
            d_unit: "pc",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    r_code: "R2009-00003",
    po_code: "PO2009-0003",
    v_name: "บริษัท ผู้ขาย 3 จำกัด",
    r_location: "Location 3",
    r_create_date: "25/09/2020",
    r_schedule_date: "05/10/2020",
    r_status: getStatusName(0),
    r_total: 135630,
    r_vat: 700,
    r_include_vat: 136330,
    r_remark: "remark 3",
    dataLine: [
      {
        id: 0,
        item: "item 3",
        item_qty: 120,
        item_unit: "pc",
        item_qty_done: 0,
        item_unit_price: 50,
        item_subtotal: 6000,
        item_qty_done_detail: [
          {
            id: 0,
            d_batch_no: null,
            d_receive_date: null,
            d_mfg: null,
            d_exp: null,
            d_qty: 0,
            d_unit: null,
          },
        ],
      },
      {
        id: 1,
        item: "item 7",
        item_qty: 70,
        item_unit: "pc",
        item_qty_done: 0,
        item_unit_price: 200,
        item_subtotal: 14000,
        item_qty_done_detail: [
          {
            id: 0,
            d_batch_no: null,
            d_receive_date: null,
            d_mfg: null,
            d_exp: null,
            d_qty: 0,
            d_unit: null,
          },
        ],
      },
      {
        id: 2,
        item: "item 3",
        item_qty: 75,
        item_unit: "pc",
        item_qty_done: 0,
        item_unit_price: 10,
        item_subtotal: 750,
        item_qty_done_detail: [
          {
            id: 0,
            d_batch_no: null,
            d_receive_date: null,
            d_mfg: null,
            d_exp: null,
            d_qty: 0,
            d_unit: null,
          },
        ],
      },
      {
        id: 3,
        item: "item 4",
        item_qty: 50,
        item_unit: "pc",
        item_qty_done: 0,
        item_unit_price: 50,
        item_subtotal: 2500,
        item_qty_done_detail: [
          {
            id: 0,
            d_batch_no: null,
            d_receive_date: null,
            d_mfg: null,
            d_exp: null,
            d_qty: 0,
            d_unit: null,
          },
        ],
      },
    ],
  },
  {
    id: 4,
    r_code: "R2009-00004",
    po_code: "PO2009-0004",
    v_name: "บริษัท ผู้ขาย 4 จำกัด",
    r_location: "Location 4",
    r_create_date: "25/09/2020",
    r_schedule_date: "07/10/2020",
    r_status: getStatusName(3),
    r_total: 335630,
    r_vat: 1200,
    r_include_vat: 336330,
    r_remark: "remark 4",
    dataLine: [
      {
        id: 0,
        item: "item 3",
        item_qty: 2520,
        item_unit: "liter",
        item_qty_done: 2520,
        item_unit_price: 134,
        item_subtotal: 335630,
        item_qty_done_detail: [
          {
            id: 0,
            d_batch_no: "20090002",
            d_receive_date: "26/09/2020",
            d_mfg: "01/09/2020",
            d_exp: "01/09/2021",
            d_qty: 1000,
            d_unit: "liter",
          },
          {
            id: 1,
            d_batch_no: "20090003",
            d_receive_date: "28/09/2020",
            d_mfg: "01/09/2020",
            d_exp: "01/09/2021",
            d_qty: 1000,
            d_unit: "liter",
          },
          {
            id: 2,
            d_batch_no: "20090004",
            d_receive_date: "29/09/2020",
            d_mfg: "01/09/2020",
            d_exp: "01/09/2021",
            d_qty: 520,
            d_unit: "liter",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    r_code: "R2009-00005",
    po_code: "PO2009-0005",
    v_name: "บริษัท ผู้ขาย 5 จำกัด",
    r_location: "Location 5",
    r_schedule_date: "08/10/2020",
    r_status: getStatusName(3),
    r_total: 155630,
    r_vat: 1200,
    r_include_vat: 156330,
    r_remark: "remark 5",
    dataLine: [
      {
        id: 0,
        item: "item 3",
        item_qty: 7520,
        item_unit: "pc",
        item_qty_done: 7520,
        item_unit_price: 45,
        item_subtotal: 335630,
        item_qty_done_detail: [
          {
            id: 0,
            d_batch_no: "20090002",
            d_receive_date: "26/09/2020",
            d_mfg: "01/09/2020",
            d_exp: "01/09/2021",
            d_qty: 10,
            d_unit: "pc",
          },
          {
            id: 1,
            d_batch_no: "20090003",
            d_receive_date: "28/09/2020",
            d_mfg: "01/09/2020",
            d_exp: "01/09/2021",
            d_qty: 35,
            d_unit: "pc",
          },
        ],
      },
    ],
  },
];
export const receiveColumns = [
  {
    id: 0,
    title: "Reference",
    dataIndex: "r_code",
    width: "10%",
    align: "center",
  },
  {
    id: 1,
    title: "PO Reference",
    dataIndex: "po_code",
    width: "10%",
    align: "center",
  },
  {
    id: 2,
    title: "From Vendor",
    dataIndex: "v_name",
    width: "30%",
    align: "left",
  },
  {
    id: 3,
    title: "Destination Location",
    dataIndex: "r_location",
    width: "20%",
    align: "left",
  },
  {
    id: 4,
    title: "Scheduled Date",
    dataIndex: "r_schedule_date",
    width: "20%",
    align: "center",
  },
  {
    id: 5,
    title: "Status",
    dataIndex: "r_status",
    width: "10%",
    align: "left",
  },
];
