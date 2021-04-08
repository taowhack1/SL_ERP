/** @format */

import {
  getRefStatus,
  warningTextValue,
} from "../../../include/js/function_main";
import {
  convertDigit,
  getNumberFormat,
  numberFormat,
} from "../../../include/js/main_config";
import React from "react";

import Text from "antd/lib/typography/Text";
import {
  Button,
  DatePicker,
  InputNumber,
  Popconfirm,
  Tag,
  TimePicker,
} from "antd";
import {
  CheckCircleOutlined,
  CheckCircleTwoTone,
  DeleteTwoTone,
  EllipsisOutlined,
  FileSearchOutlined,
  SyncOutlined,
  ZoomInOutlined,
} from "@ant-design/icons";
import CustomLabel from "../../../components/CustomLabel";
import moment from "moment";
import CustomSelect from "../../../components/CustomSelect";

export const mrp_columns = (showModal) => [
  {
    title: "MRP Code",
    dataIndex: "mrp_no",
    width: "8%",
    align: "left",
    ellipsis: true,
  },
  {
    title: "Source",
    dataIndex: "so_no",
    width: "8%",
    align: "left",
    ellipsis: true,
  },
  {
    title: "Item",
    dataIndex: "item_no_name",
    // width: "20%",
    ellipsis: true,
  },
  {
    title: "Job Name",
    dataIndex: "mrp_description",
    ellipsis: true,
  },

  {
    title: "Plan Start",
    dataIndex: "mrp_plan_start_date",
    width: "8%",
    align: "center",
    ellipsis: true,
  },
  {
    title: "Plan End",
    dataIndex: "mrp_plan_end_date",
    width: "8%",
    align: "center",
    ellipsis: true,
  },
  {
    title: "Due Date",
    dataIndex: "mrp_delivery_date",
    width: "8%",
    align: "center",
    ellipsis: true,
  },
  {
    title: "Qty.",
    dataIndex: "mrp_qty_produce",
    width: "8%",
    align: "right",
    ellipsis: true,
    render: (value, record, index) => {
      return convertDigit(value);
    },
  },
  {
    title: "UOM",
    dataIndex: "uom_no",
    width: "8%",
    align: "center",
    ellipsis: true,
  },
  {
    title: "MRP Status",
    dataIndex: "trans_close_name",
    key: "trans_close_name",
    width: "8%",
    align: "center",
    ellipsis: true,
    render: (value, record, index) => {
      return getRefStatus(record);
    },
  },
  // {
  //   title: "RM/PK Tracking",
  //   dataIndex: "",
  //   key: "tracking",
  //   width: "6%",
  //   align: "center",
  //   colSpan: 2,
  //   ellipsis: true,
  //   render: (value, record, index) => {
  //     if (record.process_complete) {
  //       return (
  //         <div>
  //           <Tag type="primary" color="processing">
  //             <SyncOutlined spin className="button-icon" /> In Process
  //           </Tag>
  //         </div>
  //       );
  //     } else {
  //       return <div>-</div>;
  //     }
  //   },
  // },
  // {
  //   title: "Tracking",
  //   dataIndex: "tracking1",
  //   colSpan: 0,
  //   width: "2%",
  //   align: "center",
  //   ellipsis: true,
  //   render: (value, record, index) => {
  //     if (record.process_complete) {
  //       return (
  //         <ZoomInOutlined
  //           onClick={(e) => showModal(record)}
  //           className="button-icon"
  //           style={{ fontSize: 18 }}
  //         />
  //       );
  //     } else {
  //     }
  //   },
  // },
];
export const mrpFields = {
  mrp_id: null,
  mrp_no: null,
  mrp_order_date: null,
  mrp_plan_start_date: null,
  mrp_plan_end_date: null,
  mrp_delivery_date: null,
  mrp_description: null,
  mrp_agreement: null,
  mrp_qty_produce: 0,
  mrp_qty_percent_spare_rm: 0,
  mrp_qty_percent_spare_pk: 0,
  mrp_remark: null,
  mrp_lock: null,
  mrp_rows: null,
  mrp_actived: null,
  mrp_created: null,
  mrp_created_by: null,
  mrp_updated: null,
  mrp_updated_by: null,
  so_id: null,
  branch_id: null,
  item_id: null,
  process_id: null,
  tg_trans_status_id: null,
  tg_trans_close_id: null,
  mrp_mfd_bulk_lead_time_day: 5,
  mrp_mfd_fg_lead_time_day: 0,
  mrp_pr_date: null,
  mrp_pr_pk_lead_time_day: 0,
  mrp_pr_rm_lead_time_day: 0,
  mrp_qa_bulk_lead_time_day: 0,
  mrp_qa_fg_lead_time_day: 0,
  mrp_qa_pk_lead_time_day: 0,
  mrp_qa_rm_lead_time_day: 0,
  item_vendor_lead_time_day: 0,
  user_name: null,
  branch_id: 1,
  commit: 1,
  uom_no: null,
  uom_no_ref: null,
  mrp_routing: {
    bulk: [],
    fg: [],
  },
};

export const mrpRequireFields = [
  "mrp_description",
  "so_id",
  "item_id",
  "mrp_qty_produce",
  "mrp_bulk_produce_date",
  "mrp_fg_produce_date",
];
export const mrpRoutingRequireFields = [
  "machine_id",
  "mrp_routing_plan_date",
  "mrp_routing_plan_time",
];

export const mrpDetailColumns = ({ readOnly, onChange }) => [
  {
    title: "No.",
    dataIndex: "id",
    width: "4%",
    align: "center",
    render: (value, record, index) => {
      return value + 1;
    },
  },
  {
    title: (
      <div className="text-center" title="Item code">
        {!readOnly && <span className="require">* </span>} Item Code
      </div>
    ),
    dataIndex: "item_no",
    key: "item_no",
    align: "center",
    width: "11%",
    ellipsis: true,
    render: (value, record, index) => {
      return <Text className="text-value text-left">{value ?? "-"}</Text>;
    },
  },
  {
    title: (
      <div className="text-center" title="Item description">
        Description
      </div>
    ),
    dataIndex: "item_name",
    key: "item_name",
    align: "left",
    ellipsis: true,
    render: (value, record, index) => {
      return <Text className="text-value text-left">{value ?? "-"}</Text>;
    },
  },
  {
    title: (
      <div className="text-center" title="Stock available quantity">
        Available Qty.
      </div>
    ),
    dataIndex: "mrp_detail_qty_available",
    key: "mrp_detail_qty_available",
    align: "right",
    require: true,
    width: "8%",
    ellipsis: true,
    render: (value, record, index) => {
      return (
        <>
          {warningTextValue(
            value,
            4,
            value < record.mrp_detail_qty_issue ? true : false
          )}
          {/* {record.item_id && (
            <FileSearchOutlined
              className='button-icon'
              title='View Detail'
              onClick={() => viewOnHandDetail(record)}
            />
          )} */}
        </>
      );
    },
  },
  {
    title: (
      <div className="text-center" title="Qty to create Issue.">
        Issue Qty.
      </div>
    ),
    dataIndex: "mrp_detail_qty_issue",
    key: "mrp_detail_qty_issue",
    align: "right",
    require: true,
    width: "8%",
    ellipsis: true,
    render: (value, record, index) => {
      return (
        <Text className="text-value text-right">
          {convertDigit(value, 4) ?? "-"}
        </Text>
      );
    },
  },

  {
    title: (
      <div className="text-center" title="Stock unit of measure">
        Stock UOM.
      </div>
    ),
    dataIndex: "uom_no",
    key: "uom_no",
    align: "center",
    require: true,
    width: "8%",
    ellipsis: true,
    render: (value, record, index) => {
      return <Text className="text-value ">{value ?? "-"}</Text>;
    },
  },
  {
    title: (
      <div className="text-center" title="Purchase request qauntity.">
        PR Qty.
      </div>
    ),
    dataIndex: "mrp_detail_qty_pr",
    key: "mrp_detail_qty_pr",
    require: true,
    align: "right",
    width: "10%",
    render: (value, record, index) => {
      if (readOnly) {
        return (
          <Text className="text-value text-right">
            {convertDigit(value, 4) ?? "-"}
          </Text>
        );
      } else {
        return (
          <InputNumber
            disabled={record.item_id !== null ? 0 : 1}
            {...getNumberFormat(4)}
            placeholder={"Qty. to PR"}
            min={0}
            step={record.item_vendor_moq}
            className="full-width"
            name="mrp_detail_qty_pr"
            value={value}
            onChange={(data) => {
              if (
                record.mrp_detail_qty_available >=
                  record.mrp_detail_qty_issue &&
                record.item_vendor_lead_time_day &&
                data > 0
              ) {
                onChange(record.id, {
                  mrp_detail_qty_pr: data,
                  mrp_detail_pr_lead_time_day: record.item_vendor_lead_time_day,
                });
              } else if (
                record.mrp_detail_qty_available >=
                  record.mrp_detail_qty_issue &&
                record.item_vendor_lead_time_day &&
                data === 0
              ) {
                onChange(record.id, {
                  mrp_detail_qty_pr: data,
                  mrp_detail_pr_lead_time_day: 0,
                });
              } else {
                onChange(record.id, {
                  mrp_detail_qty_pr: data,
                });
              }
            }}
            size="small"
          />
        );
      }
    },
  },
  {
    title: (
      <div className="text-center" title="Minimum order quantity">
        MOQ.
      </div>
    ),
    dataIndex: "item_vendor_moq",
    key: "item_vendor_moq",
    align: "right",
    require: true,
    width: "8%",
    render: (value, record, index) => {
      return <Text className="text-value ">{convertDigit(value, 4)}</Text>;
    },
  },
  {
    title: (
      <div className="text-center" title="Purchase unit of measure">
        PUR. UOM.
      </div>
    ),
    dataIndex: "item_vendor_uom_no",
    key: "item_vendor_uom_no",
    align: "center",
    require: true,
    width: "8%",
    render: (value, record, index) => {
      return <Text className="text-value ">{value ?? "-"}</Text>;
    },
  },
  {
    title: (
      <div className="text-center" title="Lead time">
        L/T (days)
      </div>
    ),
    dataIndex: "mrp_detail_pr_lead_time_day",
    align: "center",
    width: "7%",
    render: (value, record, index) => {
      return value;
    },
  },
  {
    title: (
      <div className="text-center" title="Suggestion Date">
        Sugg. Date
      </div>
    ),
    dataIndex: "mrp_detail_suggestion_date",
    align: "center",
    width: "9%",
    render: (value, record, index) => {
      return <Text className="text-value">{value}</Text>;
    },
  },
  {
    title: (
      <div className="text-center" title="Incomming Date">
        Inc. Date
      </div>
    ),
    dataIndex: "mrp_detail_incoming_date",
    align: "center",
    width: "9%",
    render: (value, record, index) => {
      return <Text className="text-value">{value}</Text>;
    },
  },
];

export const mrpRMDetailFields = {
  id: 0,
  item_id: null,
  item_no_name: null,
  uom_id: null,
  uom_name: null,
  item_qty: 0,
  item_cal_qty: 0,
  item_on_stock_qty: 0,
  mrp_detail_lead_time_day_qa: 0,
  mrp_detail_lead_time_day_pr: 0,
};

export const mrpPKDetailFields = {
  id: 0,
  item_id: null,
  item_no_name: null,
  uom_id: null,
  uom_name: null,
  item_qty: 0,
  item_cal_qty: 0,
  item_on_stock_qty: 0,
  mrp_detail_lead_time_day_qa: 0,
  mrp_detail_lead_time_day_pr: 0,
};

export const workOrderMonitorRM = [
  {
    id: 1,
    title: "No.",
    dataIndex: "id",
    width: "5%",
    align: "left",
    render: (value, record, index) => {
      return value;
    },
  },
  {
    title: "Item",
    dataIndex: "item_no_name",

    align: "left",
    ellipsis: true,
  },
  {
    title: "Qty To Issue",
    dataIndex: "qty_to_use",
    width: "12%",
    align: "right",
    ellipsis: true,
  },

  {
    title: "Qty To PR",
    dataIndex: "qty_to_pr",
    width: "12%",
    align: "right",
    ellipsis: true,
  },
  {
    title: "Qty To Recevie",
    dataIndex: "qty_to_recevie",
    width: "12%",
    align: "right",
    ellipsis: true,
  },
  {
    title: "Lead-Time",
    dataIndex: "leadtime",
    width: "7%",
    align: "center",
    ellipsis: true,
    render: (value, record, index) => {
      return (
        <span>
          <span className="require">{value}</span> day
        </span>
      );
    },
  },
  {
    title: "PR Status",
    dataIndex: "pr_status",
    width: "7%",
    align: "center",
    ellipsis: true,
    render: (value, record, index) => {
      return value ? (
        <CheckCircleTwoTone twoToneColor="#52c41a" />
      ) : (
        <SyncOutlined spin className="button-icon" />
      );
    },
  },
  {
    title: "PO Status",
    dataIndex: "po_status",
    width: "7%",
    align: "center",
    ellipsis: true,
    render: (value, record, index) => {
      return value ? (
        <CheckCircleTwoTone twoToneColor="#52c41a" />
      ) : (
        <SyncOutlined spin className="button-icon" />
      );
    },
  },
  {
    title: "Receive Status",
    dataIndex: "receive_status",
    width: "7%",
    align: "center",
    ellipsis: true,
    render: (value, record, index) => {
      return value ? (
        <CheckCircleTwoTone twoToneColor="#52c41a" />
      ) : (
        <SyncOutlined spin className="button-icon" />
      );
    },
  },
  {
    title: "Qc Status",
    dataIndex: "qc_status",
    width: "7%",
    align: "center",
    ellipsis: true,
    render: (value, record, index) => {
      return value ? (
        <CheckCircleTwoTone twoToneColor="#52c41a" />
      ) : (
        <SyncOutlined spin className="button-icon" />
      );
    },
  },
];

export const mockupWorkOrderMonitorRM = [
  {
    id: "1",
    item_no_name: "[ 101SRLA00100 ] KELTROL CG SFT",
    qty_to_use: "1.0300	[ Kg ]",
    qty_to_pr: "100.0000 [ Kg ]",
    qty_to_use_uom: "[ Kg ]",
    qty_to_use_pr: "[ g ]",
    qty_to_use_receive: "[ Kg ]",
    qty_to_recevie: "100.0000 [ Kg ]",
    leadtime: 5,
    pr_status: true,
    po_status: true,
    receive_status: true,
    qc_status: false,
  },
  {
    id: "2",
    item_no_name: "[ 102SRLA00100 ] DI-WATER",
    qty_to_use: "400.9275 [ Kg ]",
    qty_to_pr: "241,119.0000 [ g ]",
    qty_to_recevie: "241,119.0000 [ g ]",
    qty_to_use_uom: "[ Kg ]",
    qty_to_use_pr: "[ g ]",
    qty_to_use_receive: "[ Kg ]",
    leadtime: 8,
    pr_status: true,
    po_status: false,
    receive_status: false,
    qc_status: false,
  },
];

export const mrpRoutingColumns = ({
  readOnly,
  onDelete,
  onChangeValue,
  machineList,
}) => [
  {
    title: "No.",
    width: "5%",
    dataIndex: "id",
    render: (val) => val + 1,
    align: "center",
  },
  {
    title: (
      <div className="text-center">
        <CustomLabel label="Cost Center" require readOnly={readOnly} />
      </div>
    ),
    dataIndex: "machine_cost_center_description",

    align: "left",
    render: (val, record) =>
      readOnly ? (
        <Text className="text-value">{val}</Text>
      ) : (
        <CustomSelect
          allowClear
          showSearch
          data={machineList}
          field_id="machine_id"
          field_name="machine_cost_center_description"
          name="machine_id"
          placeholder="Select Cost Center"
          size="small"
          value={val}
          onChange={(data, option) => {
            data && data
              ? onChangeValue(record.id, {
                  machine_id: data,
                })
              : onChangeValue(record.id, {
                  machine_id: null,
                });
          }}
        />
      ),
  },
  {
    title: (
      <div className="text-center">
        <CustomLabel label="Man" require readOnly={readOnly} />
      </div>
    ),
    width: "15%",
    dataIndex: "mrp_routing_worker",
    align: "right",
    render: (val, record) =>
      readOnly ? (
        <Text className="text-value">{val}</Text>
      ) : (
        <InputNumber
          name="mrp_routing_worker"
          style={{ width: "100%" }}
          placeholder="Man"
          min={0}
          size="small"
          onChange={(data) => {
            onChangeValue(record.id, {
              mrp_routing_worker: Math.round(data),
            });
          }}
          value={val}
        />
      ),
  },
  {
    title: (
      <div className="text-center">
        <CustomLabel label="Period" require readOnly={readOnly} />
      </div>
    ),
    width: "15%",
    dataIndex: "mrp_routing_plan_time",
    align: "right",
    render: (val, record) =>
      readOnly ? (
        <Text className="text-value">{val}</Text>
      ) : (
        <TimePicker
          size="small"
          format={"HH:mm"}
          showNow={false}
          name={"mrp_routing_plan_time"}
          className={"full-width"}
          placeholder="Hour : Minute"
          required
          value={val ? moment(val, "HH:mm:ss") : ""}
          onChange={(data) => {
            const time = moment(data, "HH:mm").format("HH:mm:ss");
            console.log(time);
            onChangeValue(record.id, {
              mrp_routing_plan_time: data ? time : null,
            });
          }}
        />
      ),
  },
  {
    title: (
      <div className="text-center">
        <CustomLabel label="Plan Date" require readOnly={readOnly} />
      </div>
    ),
    width: "15%",
    dataIndex: "mrp_routing_plan_date",
    align: "right",
    render: (val, record) =>
      readOnly ? (
        <Text className="text-value">{val}</Text>
      ) : (
        <DatePicker
          name={"mrp_routing_plan_date"}
          format={"DD/MM/YYYY"}
          className={"full-width"}
          placeholder="Plan date"
          size={"small"}
          required
          value={val ? moment(val, "DD/MM/YYYY") : ""}
          defaultValue={val ? moment(val, "DD/MM/YYYY") : ""}
          onChange={(data) => {
            onChangeValue(record.id, {
              mrp_routing_plan_date: data ? data.format("DD/MM/YYYY") : "",
            });
          }}
        />
      ),
  },
  {
    title: (
      <Text strong>
        <EllipsisOutlined />
      </Text>
    ),
    align: "center",
    width: "5%",
    render: (_, record) => {
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
