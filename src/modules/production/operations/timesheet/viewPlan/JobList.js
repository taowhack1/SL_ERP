import React, { useContext } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Table } from "antd";
import Text from "antd/lib/typography/Text";
import { useDispatch } from "react-redux";
import {
  resetTimesheetCtrl,
  setTimesheet,
} from "../../../../../actions/production/timesheetActions";
import { TimesheetContext } from "../TimeSheet";
const JobList = () => {
  const dispatch = useDispatch();
  const {
    workCenter,
    getworkCenterLoading: loading,
    plan_job_id: selected_plan_job_id,
  } = useContext(TimesheetContext);
  const { plan_job_detail } = workCenter || {};
  const onSelectJob = (plan_job_id) => {
    dispatch(setTimesheet({ plan_job_id, selectedWorker: [] }));
    dispatch(resetTimesheetCtrl());
  };
  console.log("plan_job_detail", plan_job_detail);
  return (
    <>
      <Table
        size={"small"}
        loading={loading}
        pagination={{ pageSize: 20 }}
        bordered
        columns={columns({ onSelectJob })}
        rowKey={"plan_job_id"}
        rowClassName={({ plan_job_plan_ready, plan_job_id }) => {
          let className = plan_job_plan_ready ? "clickable " : "";
          className +=
            plan_job_id === selected_plan_job_id ? "selected-row" : "";
          return className;
        }}
        dataSource={plan_job_detail || []}
      />
    </>
  );
};

export default React.memo(JobList);

const columns = ({ onSelectJob }) => [
  {
    title: (
      <div className="text-left">
        <Input
          prefix={<SearchOutlined className="button-icon" />}
          placeholder={"Job List"}
          className={"pd-left-1"}
        />
      </div>
    ),
    dataIndex: "plan_job_no",
    align: "left",
    render: (
      value,
      {
        plan_job_id,
        plan_job_no,
        plan_job_date,
        plan_job_plan_ready,
        tg_trans_close_id,
      }
    ) => {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            padding: "5px",
            marginLeft: 20,
          }}
          onClick={() => onSelectJob(plan_job_id)}
        >
          <div
            style={{
              marginRight: 20,
              backgroundColor: getStatusColor({
                plan_job_plan_ready,
                tg_trans_close_id,
              }),
              width: "14px",
              height: "14px",
              borderRadius: "50%",
            }}
          />
          <Text className="text-value">
            {plan_job_no + " - " + plan_job_date}
          </Text>
        </div>
      );
    },
  },
];

const getStatusColor = ({ tg_trans_close_id, plan_job_plan_ready }) => {
  console.log("status color", tg_trans_close_id, plan_job_plan_ready);
  if ([3].includes(tg_trans_close_id)) return "#2CDB00";
  if (plan_job_plan_ready) {
    return "#1890FF";
  } else {
    return "red";
  }
};
