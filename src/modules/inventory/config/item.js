import React from "react";
import CustomSelect from "../../../components/CustomSelect";
import Text from "antd/lib/typography/Text";
import { Input, InputNumber, Popconfirm } from "antd";
import { DeleteTwoTone, EllipsisOutlined } from "@ant-design/icons";
import { convertDigit } from "../../../include/js/main_config";
export const item_vendor_columns = [
  {
    id: 0,
    name: "No.",
    size: 1,
    require: false,
  },
  {
    id: 1,
    name: "Vendor Name",
    size: 6,
    require: true,
  },
  {
    id: 2,
    name: "Lead Time(Day)",
    size: 3,
    require: true,
  },
  {
    id: 3,
    name: "Min. Quantity",
    size: 3,
    require: true,
  },
  {
    id: 4,
    name: "Unit",
    size: 2,
    require: true,
  },
  {
    id: 5,
    name: "Price / Unit",
    size: 3,
    require: true,
  },
  {
    id: 6,
    name: "Remark",
    size: 5,
  },
];

export const item_fields = {
  item_id: 0,
  item_id_ref: null,
  item_no: null,
  item_name: null,
  item_name_trade: null,
  item_name_vendor: null,
  item_name_th: null,
  item_image_path: null,
  item_sale: 1,
  item_purchase: 1,
  item_price: 0,
  item_cost: 0,
  item_barcode: null,
  item_weight: 0,
  item_mfd_leadtime: 0,
  item_min: 0,
  item_max: 0,
  item_customer_run_no: "SRL",

  item_price_approve: 1,
  uom_id: null,
  uom_name: null,
  type_id: null,
  type_name: null,
  category_id: null,
  category_name: null,
  tg_item_qty: null,
  branch_id: 1,
  branch_name: null,
  identify_benefit_id: 1,
  identify_benefit_no_name: "[ IDB01 ] Siri เป็นผู้ซื้อ Local",
  item_remark: null,
  item_actived: 1,
  item_created_by: null,
  item_updated_by: null,
  vat_id: 1,
  user_name: null,
  currency_id: 1,
  currency_no: "THB",
  item_trade_name: null,
  item_shelf_life: 0,
  item_sale_local: 1,
  item_sale_export: false,
  item_specification: false,
  item_msds: false,
  item_quotation: false,
  item_halal_cert: false,
  item_non_haram: false,
  item_non_halal: false,
  tg_trans_status_id: 1,
  item_control_id: 1,
  item_control_name: "None",
  item_effective_date: null,
  item_pre_run_no: ["-", "--", "SRL", "A", "-----"],
  customer_id: 1,
  customer_no_name: "[ CUS0001 ] Siri Laboratories Co., Ltd.",
  item_qa_day: 0,
  item_qa_time: null,
  item_packaging_time: null,
  commit: 1,
};

export const item_detail_fields = {
  id: null,
  item_vendor_lead_time: 0,
  item_vendor_min_qty: 0,
  item_vendor_price: 0,
  vendor_id: null,
  vendor_no_name: null,
  item_id: null,
  item_no_name: null,
  uom_id: null,
  uom_no: null,
  commit: 1,
};

export const item_show_columns = [
  {
    title: "Code",
    dataIndex: "item_no",
    width: "10%",
    align: "left",
    ellipsis: true,
  },
  {
    title: "Item Name",
    dataIndex: "item_name",
    ellipsis: true,
  },
  {
    title: "Unit",
    dataIndex: "uom_name",
    width: "10%",
    align: "left",
    ellipsis: true,
  },
  {
    title: "Type",
    dataIndex: "type_name",
    width: "10%",
    ellipsis: true,
  },
  {
    title: "Category",
    dataIndex: "category_name",
    width: "10%",
    ellipsis: true,
  },
  {
    title: "Description",
    dataIndex: "item_remark",
    ellipsis: true,
  },
];

export const item_require_fields = [
  "item_name",
  "item_customer_run_no",
  "uom_id",
  "type_id",
  "category_id",
  "item_control_id",
];
export const item_vendor_require_fields = [
  "vendor_id",
  "item_vendor_lead_time",
  "item_vendor_min_qty",
  "item_vendor_price",
  "uom_id",
  "type_id",
  "category_id",
];

export const item_qa_columns = [
  {
    id: 0,
    name: "No.",
    size: 1,
    require: false,
  },
  {
    id: 1,
    name: "QA Subject",
    size: 6,
    require: true,
  },
  {
    id: 2,
    name: "Specification",
    size: 6,
    require: true,
  },
  {
    id: 3,
    name: "Method",
    size: 5,
    require: true,
  },
  {
    id: 4,
    name: "Remark",
    size: 5,
    require: true,
  },
];

export const item_qa_detail_fields = {
  id: null,
  qa_subject_id: null,
  qa_subject_name: null,
  qa_specification_id: null,
  qa_specification_name: null,
  qa_method_id: null,
  qa_method_name: null,
  item_qa_remark: null,
  commit: 1,
};

// Packaging
export const item_packaging_weight_columns = [
  {
    id: 0,
    name: "Standard",
    size: 5,
    require: true,
  },
  {
    id: 1,
    name: "Unit",
    size: 3,
    require: false,
  },
  {
    id: 2,
    name: "Min",
    size: 5,
    require: true,
  },
  {
    id: 3,
    name: "Unit",
    size: 3,
    require: false,
  },
  {
    id: 4,
    name: "Max",
    size: 5,
    require: true,
  },
  {
    id: 5,
    name: "Unit",
    size: 3,
    require: false,
  },
];

// Packaging

export const item_packaging_process_columns = [
  {
    id: 0,
    name: "No.",
    size: 1,
    require: false,
  },
  {
    id: 1,
    name: "Item",
    size: 8,
    require: true,
  },
  {
    id: 2,
    name: "Qty / 1 Piece",
    size: 3,
    require: true,
  },
  {
    id: 3,
    name: "Unit",
    size: 2,
    require: true,
  },
  {
    id: 4,
    name: "Method",
    size: 3,
    require: true,
  },
  {
    id: 5,
    name: "Remark",
    size: 6,
    require: false,
  },
];

export const item_packaging_detail_fields = {
  id: null,
  qa_method_id: null,
  item_id_packaging: null,
  item_packaging_qty: 0,
  item_id: null,
  item_no_name: null,
  item_packaging_remark: null,
  commit: 1,
};

export const item_weight_detail = [
  {
    id: 0,
    weight_type_id: 1,
    item_weight_standard_qty: 0,
    item_weight_min_qty: 0,
    item_weight_max_qty: 0,
    item_id: null,
    item_weight_remark: null,
    commit: 1,
  },
  {
    id: 1,
    weight_type_id: 2,
    item_weight_standard_qty: 0,
    item_weight_min_qty: 0,
    item_weight_max_qty: 0,
    item_id: null,
    item_weight_remark: null,
    commit: 1,
  },
  {
    id: 2,
    weight_type_id: 3,
    item_weight_standard_qty: 0,
    item_weight_min_qty: 0,
    item_weight_max_qty: 0,
    item_id: null,
    item_weight_remark: null,
    commit: 1,
  },
];

export const item_file = {
  item_image: null,
  certificate: {
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
  },
};

export const item_formula_columns = [
  {
    id: 1,
    name: "No.",
    size: 1,
    require: false,
  },
  {
    id: 2,
    name: "RM Code",
    size: 14,
    require: true,
  },
  {
    id: 3,
    name: "%(W/W)",
    size: 8,
    require: true,
  },
];
export const itemPartConditionColumns = (
  readOnly,
  onChange,
  onDelete,
  Save
) => [
  {
    id: 1,
    title: "No.",
    dataIndex: "id",
    width: "5%",
    align: "center",
    render: (value, record, index) => {
      return value + 1;
    },
  },
  {
    id: 2,
    title: <div className="text-center">Condition</div>,
    dataIndex: "item_part_specification_detail_condition",
    key: "item_part_specification_detail_condition",
    align: "left",
    // width: "40%",
    render: (value, record, index) => {
      if (readOnly) {
        return value;
      } else {
        return (
          <Input
            size={"small"}
            placeholder={"Condition"}
            name="item_part_specification_detail_condition"
            value={record.item_part_specification_detail_condition}
            onChange={(e) => {
              onChange(record.id, {
                item_part_specification_detail_condition: e.target.value,
              });
            }}
            onBlur={() => Save(record.id)}
          />
        );
      }
    },
  },
  {
    id: 3,
    title: <div className="text-center">Set</div>,
    dataIndex: "item_part_specification_detail_set",
    key: "item_part_specification_detail_set",
    align: "left",
    // width: "40%",
    render: (value, record, index) => {
      if (readOnly) {
        return value;
      } else {
        return (
          <Input
            size={"small"}
            placeholder={"Set"}
            name="item_part_specification_detail_set"
            value={record.item_part_specification_detail_set}
            onChange={(e) => {
              onChange(record.id, {
                item_part_specification_detail_set: e.target.value,
              });
            }}
            onBlur={() => Save(record.id)}
          />
        );
      }
    },
  },
  {
    title: (
      <Text strong>
        <EllipsisOutlined />
      </Text>
    ),
    align: "center",
    width: "5%",
    render: (value, record, index) => {
      if (readOnly) {
        return null;
      } else {
        return (
          <Popconfirm
            onConfirm={() => {
              onDelete(record.id);
            }}
            title="Are you sure you want to delete this row？"
            okText="Yes"
            cancelText="No"
          >
            <DeleteTwoTone />
          </Popconfirm>
        );
      }
    },
  },
];

export const item_production_process_columns = [
  {
    id: 0,
    name: "No.",
    size: 1,
    require: false,
  },
  {
    id: 1,
    name: "Work Center",
    size: 7,
    require: true,
  },
  {
    id: 2,
    name: "Worker",
    size: 3,
    require: true,
  },
  {
    id: 3,
    name: "Time Used",
    size: 3,
    require: true,
  },
  {
    id: 4,
    name: "Remark",
    size: 8,
    require: false,
  },
];

// PART
export const testData = {
  data_part: [
    {
      id: 0,
      item_part_specification_id: null,
      item_part_specification_time: "01:00:00",
      item_part_specification_worker: 3,
      item_part_specification_remark: null,
      item_part_sort: 1,
      item_part_description: "Part A",
      work_center_id: null,
      work_center_no: null,
      work_center_description: null,
      work_center_no_description: null,
      machine_id_main: null,
      machine_no_main: null,
      machine_name_main: null,
      machine_no_name_main: null,
      machine_id_sub: null,
      machine_no_sub: null,
      machine_name_sub: null,
      machine_no_name_sub: null,
      data_id: 0,
    },
    {
      id: 1,
      item_part_specification_id: null,
      item_part_specification_time: "01:30:00",
      item_part_specification_worker: 1,
      item_part_specification_remark: null,
      item_part_sort: 2,
      item_part_description: "Part B",
      work_center_id: null,
      work_center_no: null,
      work_center_description: null,
      work_center_no_description: null,
      machine_id_main: null,
      machine_no_main: null,
      machine_name_main: null,
      machine_no_name_main: null,
      machine_id_sub: null,
      machine_no_sub: null,
      machine_name_sub: null,
      machine_no_name_sub: null,
      data_id: 1,
    },
    {
      id: 2,
      item_part_specification_id: null,
      item_part_specification_time: "00:30:00",
      item_part_specification_worker: 2,
      item_part_specification_remark: null,
      item_part_sort: 3,
      item_part_description: "A+B",
      work_center_id: null,
      work_center_no: null,
      work_center_description: null,
      work_center_no_description: null,
      machine_id_main: null,
      machine_no_main: null,
      machine_name_main: null,
      machine_no_name_main: null,
      machine_id_sub: null,
      machine_no_sub: null,
      machine_name_sub: null,
      machine_no_name_sub: null,
      data_id: 2,
    },
  ],
  data_part_detail: [
    [
      {
        id: 0,
        item_part_specification_id: null,
        item_part_specification_detail_id: null,
        item_part_specification_detail_condition: "Con 1 A",
        item_part_specification_detail_set: "Set 1 A",
        item_part_specification_detail_remark: null,
      },
      {
        id: 1,
        item_part_specification_id: null,
        item_part_specification_detail_id: null,
        item_part_specification_detail_condition: "Con 2 A",
        item_part_specification_detail_set: "Set 2 A",
        item_part_specification_detail_remark: null,
      },
      {
        id: 2,
        item_part_specification_id: null,
        item_part_specification_detail_id: null,
        item_part_specification_detail_condition: "Con 3 A",
        item_part_specification_detail_set: "Set 3 A",
        item_part_specification_detail_remark: null,
      },
    ],
    [
      {
        id: 0,
        item_part_specification_id: null,
        item_part_specification_detail_id: null,
        item_part_specification_detail_condition: "Con 1 B",
        item_part_specification_detail_set: "Set 1 B",
        item_part_specification_detail_remark: null,
      },
      {
        id: 1,
        item_part_specification_id: null,
        item_part_specification_detail_id: null,
        item_part_specification_detail_condition: "Con 2 B",
        item_part_specification_detail_set: "Set 2 B",
        item_part_specification_detail_remark: null,
      },
      {
        id: 2,
        item_part_specification_id: null,
        item_part_specification_detail_id: null,
        item_part_specification_detail_condition: "Con 3 B",
        item_part_specification_detail_set: "Set 3 B",
        item_part_specification_detail_remark: null,
      },
    ],
    [
      {
        id: 0,
        item_part_specification_id: null,
        item_part_specification_detail_id: null,
        item_part_specification_detail_condition: "Con 1 A+B",
        item_part_specification_detail_set: "Set 1 A+B",
        item_part_specification_detail_remark: null,
      },
      {
        id: 1,
        item_part_specification_id: null,
        item_part_specification_detail_id: null,
        item_part_specification_detail_condition: "Con 2 A+B",
        item_part_specification_detail_set: "Set 2 A+B",
        item_part_specification_detail_remark: null,
      },
      {
        id: 2,
        item_part_specification_id: null,
        item_part_specification_detail_id: null,
        item_part_specification_detail_condition: "Con 3 A+B",
        item_part_specification_detail_set: "Set 3 A+B",
        item_part_specification_detail_remark: null,
      },
    ],
  ],
  data_part_mix: [
    [],
    [],
    [
      {
        id: 0,
        item_part_mix_id: null,
        item_part_mix_remark: null,
        item_part_sort_mix: 1,
        // item_part_description: "Part A",
        commit: 1,
      },
      {
        id: 1,
        item_part_mix_id: null,
        item_part_mix_remark: null,
        item_part_sort_mix: 2,
        // item_part_description: "Part B",
        commit: 1,
      },
    ],
  ],
  data_formula: [
    [
      {
        item_formula_id: null,
        item_part_sort: 0,
        item_id_formula: 4,
        item_no_name: "[ 101SRLA00400 ] Olivem 1000",
        machine_id_formula: null,
        item_formula_percent_qty: 12.5,
        item_formula_remark: null,
      },
      {
        item_formula_id: null,
        item_part_sort: 0,
        item_id_formula: 5,
        item_no_name: "[ 101SRLA00500 ] Lipomulse luxe",
        machine_id_formula: null,
        item_formula_percent_qty: 35.53,
        item_formula_remark: null,
      },
    ],
    [
      {
        item_formula_id: null,
        item_part_sort: 1,
        item_id_formula: 3,
        item_no_name: "[ 101SRLA00300 ] CARBOPOL@ULTREZ21 POLYMER",
        machine_id_formula: null,
        item_formula_percent_qty: 3,
        item_formula_remark: "ทดสอบ3",
      },
      {
        item_formula_id: null,
        item_part_sort: 1,
        item_id_formula: 5,
        item_no_name: "[ 101SRLA00500 ] Lipomulse luxe",
        machine_id_formula: null,
        item_formula_percent_qty: 15.5321,
        item_formula_remark: null,
      },
    ],
    [],
  ],
};
export const item_part_specification_fields = {
  id: 0,
  item_part_specification_id: null,
  item_part_specification_time: "00:00:00",
  item_part_specification_worker: 0,
  item_part_specification_remark: null,
  item_id: null,
  item_no: null,
  item_name: null,
  item_no_name: null,
  item_part_sort: 1,
  item_part_description: "New..",
  work_center_id: null,
  work_center_no: null,
  work_center_description: null,
  work_center_no_description: null,
  machine_id_main: null,
  machine_no_main: null,
  machine_name_main: null,
  machine_no_name_main: null,
  machine_id_sub: null,
  machine_no_sub: null,
  machine_name_sub: null,
  machine_no_name_sub: null,
  data_id: 0,
};
// PART DETAIL

export const item_part_specification_detail_fields = {
  id: 0,
  item_part_specification_id: null,
  item_part_specification_detail_id: null,
  item_part_specification_detail_condition: null,
  item_part_specification_detail_set: null,
  item_part_specification_detail_remark: null,
};
//PART FORMULA

export const item_formula_detail_fields = {
  id: 0,
  item_formula_id: null,
  item_id: null,
  item_id_formula: null,
  item_formula_percent_qty: 0,
  item_part_specification_id: null,
  item_formula_remark: null,
  machine_id_formula: null,
  commit: 1,
};
// PRODUCTION PROCESS
export const item_production_process_fields = {
  id: null,
  work_center_id: null,
  work_center_time: null,
  work_center_worker: 0,
  item_process_remark: null,
  commit: 1,
};

export const item_part_mix_fields = {
  id: 0,
  item_part_sort_mix: null,
  item_part_mix_id: null,
  item_part_mix_remark: null,
  // item_part_description: null,
  commit: 1,
};

export const itemFormulaColumns = (
  readOnly,
  onChange,
  onDelete,
  Save,
  { itemList }
) => [
  {
    id: 1,
    title: "No.",
    dataIndex: "id",
    width: "5%",
    align: "center",
    render: (value, record, index) => {
      return value + 1;
    },
  },
  {
    id: 2,
    title: <div className="text-center">Raw Material Code</div>,
    dataIndex: "item_no_name",
    key: "item_no_name",
    align: "left",
    // width: "40%",
    render: (value, record, index) => {
      if (readOnly) {
        return value;
      } else {
        return (
          <CustomSelect
            allowClear
            showSearch
            size={"small"}
            placeholder={"Raw Material Code"}
            name="item_id_formula"
            field_id="item_id"
            field_name="item_no_name"
            value={record.item_no_name}
            data={itemList}
            onChange={(data, option) => {
              data && data
                ? onChange(record.id, {
                    item_id_formula: option.data.item_id,
                    item_no_name: option.data.item_no_name,
                  })
                : onChange(record.id, {
                    item_id_formula: null,
                    item_no_name: null,
                    item_formula_percent_qty: 0,
                  });
            }}
            onBlur={() => Save(record.id)}
          />
        );
      }
    },
  },
  {
    id: 3,
    title: (
      <div className="text-center">
        {!readOnly && <span className="require">* </span>}
        %(W/W)
      </div>
    ),
    dataIndex: "item_formula_percent_qty",
    key: "item_formula_percent_qty",
    align: "right",
    width: "20%",
    render: (value, record, index) => {
      if (readOnly) {
        return convertDigit(value, 4) + " %";
      } else {
        return (
          <InputNumber
            name="item_formula_percent_qty"
            placeholder="Percentage"
            value={record.item_formula_percent_qty}
            disabled={record.item_id_formula ? 0 : 1}
            defaultValue={0.0}
            min={0.0}
            max={100.0}
            formatter={(value) => `${value}%`}
            parser={(value) => value.replace("%", "")}
            precision={4}
            step={0.0001}
            onChange={(data) => {
              onChange(record.id, {
                item_formula_percent_qty: data,
              });
            }}
            onBlur={() => Save(record.id, "item_formula_percent_qty")}
            size="small"
            className="full-width"
          />
        );
      }
    },
  },
  {
    title: (
      <Text strong>
        <EllipsisOutlined />
      </Text>
    ),
    align: "center",
    width: "5%",
    render: (value, record, index) => {
      if (readOnly) {
        return null;
      } else {
        return (
          <Popconfirm
            onConfirm={() => {
              onDelete(record.id);
            }}
            title="Are you sure you want to delete this row？"
            okText="Yes"
            cancelText="No"
          >
            <DeleteTwoTone />
          </Popconfirm>
        );
      }
    },
  },
];

export const itemPartMixColumns = (
  readOnly,
  onChange,
  onDelete,
  getPartName,
  Save,
  { data_part }
) => [
  {
    id: 1,
    title: "No.",
    dataIndex: "id",
    width: "5%",
    align: "center",
    render: (value, record, index) => {
      return value + 1;
    },
  },
  {
    id: 2,
    title: <div className="text-center">Part Name</div>,
    dataIndex: "item_part_description",
    key: "item_part_description",
    align: "left",
    // width: "40%",
    render: (value, record, index) => {
      if (readOnly) {
        return getPartName(record.item_part_sort_mix);
      } else {
        return (
          <CustomSelect
            allowClear
            showSearch
            size={"small"}
            placeholder={"Select Part"}
            name="item_part_sort"
            field_id="item_part_sort"
            field_name="item_part_description"
            value={getPartName(record.item_part_sort_mix)}
            data={data_part}
            onChange={(data, option) => {
              data && data
                ? onChange(record.id, {
                    item_part_sort_mix: option.data.item_part_sort,
                    // item_part_description: option.data.item_part_description,
                  })
                : onChange(record.id, {
                    item_part_sort_mix: null,
                    // item_part_description: null,
                  });
            }}
            onBlur={() => Save(record.id)}
          />
        );
      }
    },
  },
  {
    title: (
      <Text strong>
        <EllipsisOutlined />
      </Text>
    ),
    align: "center",
    width: "5%",
    render: (value, record, index) => {
      if (readOnly) {
        return null;
      } else {
        return (
          <Popconfirm
            onConfirm={() => {
              onDelete(record.id);
            }}
            title="Are you sure you want to delete this row？"
            okText="Yes"
            cancelText="No"
          >
            <DeleteTwoTone />
          </Popconfirm>
        );
      }
    },
  },
];
