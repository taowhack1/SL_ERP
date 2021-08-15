/** @format */

export const customer_fields = {
  customer_id: null,
  customer_no: null,
  customer_name: null,
  customer_name_th: null,
  customer_name_short: null,
  customer_address: null,
  customer_address_th: null,
  customer_sold_to: null,
  customer_ship_to: null,
  customer_limit_credit: null,
  customer_company: null,
  customer_contact: null,
  customer_tax_no: null,
  customer_email: null,
  customer_phone: null,
  customer_mobile: null,
  customer_website: null,
  customer_remark: null,
  customer_actived: null,
  customer_created: null,
  customer_created_by: null,
  customer_updated: null,
  customer_updated_by: null,
  language_id: null,
  country_id: null,
  province_id: null,
  district_id: null,
  tambon_id: null,
  zip_id: null,
  payment_term_id: null,
  cnv_customer_created: null,
  customer_no_name: null,
  language_no: null,
  language_name: null,
  language_no_name: null,
  country_no: null,
  country_name: null,
  country_no_name: null,
  province_no: null,
  province_name: null,
  province_no_name: null,
  district_no: null,
  district_name: null,
  district_no_name: null,
  tambon_no: null,
  tambon_name: null,
  tambon_no_name: null,
  zip_no: null,
  zip_name: null,
  zip_no_name: null,
  payment_term_no: null,
  payment_term_name: null,
  payment_term_no_name: null,
  vat_no: null,
  vat_name: null,
  vat_no_name: null,
  currency_name: null,
  vat_id: 1,
  vat_rate: 0.07,
  currency_id: 1,
  currency_no: "THB",
  commit: 1,
};

export const customer_columns = [
  {
    title: "Code",
    dataIndex: "customer_no",
    key: "customer_no",
    width: "10%",
    align: "center",
  },
  {
    title: "Name",
    dataIndex: "customer_name",
    key: "customer_name",
    width: "30%",
    ellipsis: true,
    align: "left",
  },
  {
    title: "Phone",
    dataIndex: "customer_phone",
    key: "customer_phone",
    width: "10%",
    ellipsis: true,
    align: "left",
  },
  {
    title: "Mobile",
    dataIndex: "customer_mobile",
    key: "customer_mobile",
    width: "10%",
    ellipsis: true,
    align: "left",
  },
  {
    title: "Email",
    dataIndex: "customer_email",
    key: "customer_email",
    width: "20%",
    ellipsis: true,
    align: "left",
  },
  {
    title: "Tax ID",
    dataIndex: "customer_tax_no",
    key: "customer_tax_no",
    width: "20%",
    ellipsis: true,
    align: "left",
  },
];

export const customer_require_fields = [
  "customer_name",
  "customer_name_short",
  "currency_id",
  "payment_term_id",
  "customer_limit_credit",
  "customer_category_id",
  "customer_group_id",
];

export const addressColumns1 = [
  {
    id: 1,
    title: "No.",
    dataIndex: "id",
    width: "1%",
    align: "center",
    render: (value, record, index) => {
      return value + 1;
    },
  },
  {
    id: 2,
    title: "Address. Category",
    dataIndex: "category",
    width: "5%",
    align: "center",
    render: (value, record, index) => {
      return value + 1;
    },
  },
  {
    id: 2,
    title: "Address. Detail",
    dataIndex: "detail",
    width: "5%",
    align: "center",
    render: (value, record, index) => {
      return value + 1;
    },
  },
  {
    id: 2,
    title: "Address. Status",
    dataIndex: "status",
    width: "5%",
    align: "center",
    render: (value, record, index) => {
      return value + 1;
    },
  },
];

export const addressData = [
  { id: 1, address_type_name: "Contact", address_type_id: 1 },
  { id: 2, address_type_name: "Invoice Address", address_type_id: 2 },
  { id: 3, address_type_name: "Delivery Address", address_type_id: 3 },
  { id: 4, address_type_name: "Private Address", address_type_id: 4 },
];
export const addressColumns = [
  {
    id: 0,
    name: "No",
    size: 1,
    require: false,
  },
  {
    id: 1,
    name: "Address Category",
    size: 3,
    require: true,
  },
  {
    id: 2,
    name: "Address Detail",
    size: 9,
    require: true,
  },
  {
    id: 3,
    name: "Contact Name.",
    size: 6,
    require: false,
  },
  {
    id: 4,
    name: "Contact Phone No.",
    size: 4,
    require: false,
  },
];
export const CustomerDetailFileds = {
  customer_detail_address: null,
  customer_detail_name: null,
  customer_detail_position: null,
  customer_detail_remark: null,
  customer_detail_actived: true,
  address_type_id: 2,

  // customer_detail_created_by: null,
  // customer_detail_updated_by: null,
};
