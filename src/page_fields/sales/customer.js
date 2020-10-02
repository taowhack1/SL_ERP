export const customer_fiels = {
  customer_id: null,
  customer_no: null,
  customer_name: null,
  customer_name_th: null,
  customer_address: null,
  customer_address_th: null,
  customer_tax: null,
  customer_email: null,
  customer_phone: null,
  customer_mobile: null,
  customer_website: null,
  language_id: 1,
  province_id: null,
  district_id: null,
  tambon_id: null,
  zip_id: null,
  country_id: null,
  vat_id: 1,
  payment_term_id: null,
  customer_remark: null,
  customer_actived: null,
  customer_created: null,
  customer_created_by: null,
  customer_updated: null,
  customer_updated_by: null,
  customer_company: 0,
  customer_contact: 0,
  currency_id: 1,
};

export const customer_columns = [
  {
    title: "Name",
    dataIndex: "customer_name",
    key: "customer_name",
    width: "30%",
    align: "left",
  },
  {
    title: "Phone",
    dataIndex: "customer_phone",
    key: "customer_phone",
    width: "15%",
    align: "left",
  },
  {
    title: "Mobile",
    dataIndex: "customer_mobile",
    key: "customer_mobile",
    width: "15%",
    align: "left",
  },
  {
    title: "Email",
    dataIndex: "customer_email",
    key: "customer_email",
    width: "20%",
    align: "left",
  },
  {
    title: "Tax ID",
    dataIndex: "customer_tax",
    key: "customer_tax",
    width: "20%",
    align: "left",
  },
];
