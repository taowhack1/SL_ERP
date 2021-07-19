import {
  Button,
  Col,
  DatePicker,
  Divider,
  InputNumber,
  message,
  Popconfirm,
  Row,
  TimePicker,
} from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import CustomLabel from "../../../../../components/CustomLabel";
import CustomSelect from "../../../../../components/CustomSelect";
import CustomTable from "../../../../../components/CustomTable";
const columns = () => [
  {
    title: (
      <div className="text-center">
        <Text strong>Cost Center</Text>
      </div>
    ),
    dataIndex: "machine_cost_center_description",
    align: "left",
    ellipsis: true,
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <Text strong>Date</Text>
      </div>
    ),
    dataIndex: "plan_job_date_old",
    width: "15%",
    align: "center",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <Text strong>New Date</Text>
      </div>
    ),
    dataIndex: "plan_job_date",
    width: "15%",
    align: "center",
    render: (val, record) =>
      record.plan_job_date_old === val
        ? "-"
        : <Text style={{ color: "blue" }}>{val}</Text> || "-",
  },
  {
    title: (
      <div className="text-center">
        <Text strong>Period</Text>
      </div>
    ),
    dataIndex: "plan_job_plan_time",
    width: "15%",
    align: "center",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <Text strong>Woker</Text>
      </div>
    ),
    dataIndex: "plan_job_plan_worker",
    width: "15%",
    align: "center",
    render: (val) => val || "-",
  },
];
const FormRight = (props) => {
  const {
    plan_job_id,
    otherPlan,
    jobDetail: { mrp_no, so_no, item_no_name, item_no_name_ref },
    setSelectedPlan,
    setOtherPlan,
    conditions: { loading, isUpdate },
    setConditions,
  } = props;
  const onUpdatePlan = () => {
    setConditions((prev) => ({ ...prev, loading: true, isUpdate: false }));
    message.success("Update change completed.");
    setOtherPlan((prev) =>
      prev.map((obj) => ({ ...obj, plan_job_date_old: obj.plan_job_date }))
    );
    setConditions((prev) => ({ ...prev, loading: false, isUpdate: false }));
  };
  const onDiscard = () => {
    setConditions((prev) => ({ ...prev, loading: true, isUpdate: false }));
    message.warning("Discard change completed.");
    setOtherPlan((prev) =>
      prev.map((obj) => ({ ...obj, plan_job_date: obj.plan_job_date_old }))
    );
    setConditions((prev) => ({ ...prev, loading: false, isUpdate: false }));
  };
  const onSelectPlan = (plan) => setSelectedPlan(plan);
  console.log("form right render..", otherPlan);
  return (
    <>
      <div className="full-wh" style={{ padding: "5px 20px" }}>
        <div className="title-bar">
          <h3>
            <b>Job Detail</b>
          </h3>
        </div>
        <Row className="col-2 ">
          <Col span={5}>
            <CustomLabel readOnly={false} label={"S/O No. :"} />
          </Col>
          <Col span={19}>{so_no || "-"}</Col>
        </Row>
        <Row className="col-2 ">
          <Col span={5}>
            <CustomLabel readOnly={false} label={"MRP No. :"} />
          </Col>
          <Col span={19}>{mrp_no || "-"}</Col>
        </Row>
        <Row className="col-2 ">
          <Col span={5}>
            <CustomLabel readOnly={false} label={"FG Code. :"} />
          </Col>
          <Col span={19}>{item_no_name || "-"}</Col>
        </Row>
        <Row className="col-2 ">
          <Col span={5}>
            <CustomLabel readOnly={false} label={"Bulk Code. :"} />
          </Col>
          <Col span={19}>{item_no_name_ref || "-"}</Col>
        </Row>
        <div className="title-bar mt-3">
          <h3>
            <b>Reference Cost Center</b>
          </h3>
        </div>
        <CustomTable
          loading={loading}
          rowClassName={(row) =>
            row.plan_job_id === plan_job_id
              ? "row-table-detail selected-row"
              : "row-table-detail pointer"
          }
          columns={columns()}
          dataSource={otherPlan}
          rowKey="plan_job_id"
          pagination={false}
          onClick={(row) => onSelectPlan(row)}
        />
        <div
          className="w-100 text-center 
        mt-2"
        >
          {isUpdate ? (
            <>
              <Button
                className="primary"
                loading={loading}
                onClick={onUpdatePlan}
              >
                Update
              </Button>
              <Button className="ml-3" onClick={onDiscard} loading={loading}>
                Discard
              </Button>
            </>
          ) : (
            <>
              <Button className="" disabled>
                Update
              </Button>
              <Button className="ml-3" disabled>
                Discard
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default React.memo(FormRight);
