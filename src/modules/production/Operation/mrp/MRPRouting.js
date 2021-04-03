import { DeleteTwoTone, EllipsisOutlined } from "@ant-design/icons";
import { DatePicker, InputNumber, Popconfirm, TimePicker } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useContext } from "react";
import CustomLabel from "../../../../components/CustomLabel";
import { MRPContext } from "../../../../include/js/context";
import { routingDetailColumns } from "../../masterData/routing/config";
import RoutingDetail from "../../masterData/routing/RoutingDetail";
import moment from "moment";
import CustomSelect from "../../../../components/CustomSelect";

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
        <CustomLabel label="Cost Center" require readOnly />
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
        <CustomLabel label="Man" require readOnly />
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
        <CustomLabel label="Period" require readOnly />
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
        <CustomLabel label="Period" require readOnly />
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

const MRPRouting = () => {
  const { mainState, mainStateDispatch, readOnly } = useContext(MRPContext);
  console.log("MRPRouting Page", mainState);
  return (
    <>
      <RoutingDetail
        state={mainState}
        stateDispatch={mainStateDispatch}
        readOnly={readOnly}
        detailField={"mrp_routing"}
        columns={mrpRoutingColumns}
      />
    </>
  );
};

export default MRPRouting;
