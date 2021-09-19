/** @format */

import { DeleteTwoTone, EllipsisOutlined } from "@ant-design/icons";
import { InputNumber, Popconfirm, TimePicker } from "antd";
import Text from "antd/lib/typography/Text";
import CustomLabel from "../../../../components/CustomLabel";
import React from "react";
import CustomSelect from "../../../../components/CustomSelect";
import { getNumberFormat } from "../../../../include/js/main_config";
import moment from "moment";

export const Columns = [
  {
    id: 1,
    title: "No.",
    dataIndex: "id2",
    width: "5%",
    align: "center",
    render: (value, record, index) => {
      return value + 1;
    },
  },
  {
    id: 1,
    title: "Cost Center No.",
    dataIndex: "coster_no_name",
    width: "65%",
    align: "center",
    render: (value, record, index) => {
      return value + 1;
    },
  },
  {
    id: 1,
    title: "Man.",
    dataIndex: "Man",
    width: "15%",
    align: "center",
  },
  {
    id: 1,
    title: "Period.",
    dataIndex: "Period",
    width: "15%",
    align: "center",
  },
];

export const routingDetailColumns = ({
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
        <CustomLabel label="Work Center" require readOnly />
      </div>
    ),
    dataIndex: "machine_id",
    align: "left",
    render: (val, record) =>
      readOnly ? (
        <Text className="text-value">
          {record?.machine_cost_center_description}
        </Text>
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
        <CustomLabel label="Man" require readOnly />
      </div>
    ),
    width: "15%",
    dataIndex: "routing_detail_worker",
    align: "right",
    render: (val, record) =>
      readOnly ? (
        <Text className="text-value">{val}</Text>
      ) : (
        <InputNumber
          name="routing_detail_worker"
          style={{ width: "100%" }}
          placeholder="Man"
          min={0}
          size="small"
          onChange={(data) => {
            onChangeValue(record.id, {
              routing_detail_worker: Math.round(data),
            });
          }}
          value={val}
        />
      ),
  },
  {
    title: (
      <div className="text-center">
        <CustomLabel label="Period" require readOnly />
      </div>
    ),
    width: "15%",
    dataIndex: "routing_detail_lead_time",
    align: "right",
    render: (val, record) =>
      readOnly ? (
        <Text className="text-value">{val}</Text>
      ) : (
        <TimePicker
          size="small"
          format={"HH:mm"}
          showNow={false}
          name={"routing_detail_lead_time"}
          className={"full-width"}
          placeholder="Hour : Minute"
          required
          value={val ? moment(val, "HH:mm:ss") : ""}
          onChange={(data) => {
            const time = moment(data, "HH:mm").format("HH:mm:ss");
            console.log(time);
            onChangeValue(record.id, {
              routing_detail_lead_time: data ? time : null,
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
export const routingHeadFileds = {
  item_id: null,
  item_id_ref: null,
  branch_id: null,
  routing_type_id: null,
  routing_working_time_min: null,
  routing_working_time_hour: null,
  routing_working_time_day: null,
  routing_batch_size: null,
  routing_pack_size: null,
  routing_fill_weight: null,
  routing_worker_hour: null,
  routing_capacity_min: null,
  routing_description: null,
  routing_remark: null,
  routing_detail: {
    bulk: [],
    fg: [],
  },
};
export const routingDetailFileds = {
  id: null,
  rowId: null,
  routing_detail_remark: null,
  machine_id: null,
  routing_detail_worker: null,
  routing_detail_lead_time: null,
};
export const routingHeadRequireFileds = [
  "item_id",
  // "item_id_ref",
  // "routing_working_time_min",
  // "routing_working_time_hour",
  // "routing_working_time_day",
  "routing_batch_size",
  // "routing_pack_size",
  // "routing_fill_weight",
  // "routing_capacity_min",
  // "routing_worker_hour",
  "routing_remark",
  "routing_type_id",
];
export const routingDetailRequireFileds = [
  "machine_id",
  "routing_detail_worker",
  "routing_detail_lead_time",
];
export const mockupData = [
  {
    id: 1,
    description: "test",
    routing_no: "routing001",
    fg_item: "[ 406SRLA02400 ] Sirilab Damage Care Hair Treatment Mask 100ml",
    bulk_item: "[ 306SRLA00200 ] Bulk-Sirilab Damage Care Hair Treatment Mask",
    working_time_min: "300",
    working_time_hour: "05:00",
    working_time_day: "0.208",
    batch_size: 300,
    fill_wt: "0.100",
    manperhour: "90.0",
    capacity: 10,
    pcsbatch: 3000,
  },
];
