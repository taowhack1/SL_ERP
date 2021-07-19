import { Button, Col, DatePicker, InputNumber, Row, TimePicker } from "antd";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import CustomLabel from "../../../../../components/CustomLabel";
import CustomSelect from "../../../../../components/CustomSelect";

const FormLeft = (props) => {
  const { costCenter } = useSelector(
    (state) => state.production.operations.planning
  );
  const {
    selectedPlan: {
      machine_id,
      plan_job_id,
      plan_job_date,
      plan_job_date_old,
      plan_job_plan_time,
      plan_job_plan_worker,
    },
    selectedPlan,
    setSelectedPlan,
    user_name,
    setOtherPlan,
    conditions: { loading, isUpdate },
    setConditions,
  } = props;

  const onChange = (data) =>
    setSelectedPlan((prev) => ({ ...prev, ...data, commit: 1, user_name }));

  const onUpdatePlan = () => {
    console.log("plan_job_id", plan_job_id);
    console.log("selectedPlan", selectedPlan);
    setConditions((prev) => ({ ...prev, loading: true }));
    setOtherPlan((prev) => {
      const indexOfCurrentPlan = prev.findIndex(
        (obj) => obj.plan_job_id === plan_job_id
      );
      const newData = prev.map((plan, index) => {
        console.log(
          "plan index selected :",
          indexOfCurrentPlan,
          " other index :",
          index
        );
        switch (true) {
          case index < indexOfCurrentPlan:
            return { ...plan, commit: 1, user_name };
          case index === indexOfCurrentPlan:
            return { ...selectedPlan, commit: 1, user_name };
          case index > indexOfCurrentPlan:
            var newPlanDate = moment(plan_job_date, "DD/MM/YYYY");
            var oldPlanDate = moment(plan_job_date_old, "DD/MM/YYYY");
            //Difference in number of days
            const diffDate = moment
              .duration(newPlanDate.diff(oldPlanDate))
              .asDays();
            return {
              ...plan,
              plan_job_date: diffDate
                ? moment(plan.plan_job_date_old, "DD/MM/YYYY")
                    .add(diffDate, "day")
                    .format("DD/MM/YYYY")
                : plan.plan_job_date,
              commit: 1,
              user_name,
            };
          default:
            return { ...plan, commit: 1, user_name };
        }
      });
      console.log("onUpdatePlan", newData);
      return newData;
    });
    setConditions((prev) => ({ ...prev, loading: false, isUpdate: true }));
  };

  console.log("form left render.. ");
  console.log("selectedPlan", selectedPlan);
  return (
    <>
      <div className="full-wh col-border-right" style={{ padding: "5px 20px" }}>
        <div className="title-bar">
          <h3>
            <b>Selected Cost Center</b>
          </h3>
        </div>
        <Row className="col-2 row-margin-vertical">
          <Col span={24}>
            <CustomLabel label={"Cost Center :"} require />
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={24}>
            <CustomSelect
              showSearch
              data={costCenter}
              field_id={"machine_id"}
              field_name={"machine_cost_center_description"}
              className="w-100"
              placeholder={"Select Cost Center"}
              onChange={(val, row) =>
                onChange({
                  machine_id: val,
                  machine_cost_center_description:
                    row.data.machine_cost_center_description,
                })
              }
              value={machine_id}
            />
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={10}>
            <CustomLabel label={"Plan Date :"} require />
          </Col>
          <Col span={3}></Col>
          <Col span={11}>
            <CustomLabel label={"Period :"} require />
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={10}>
            <DatePicker
              placeholder={"Plan Date"}
              className="full-width"
              format={"DD/MM/YYYY"}
              value={plan_job_date ? moment(plan_job_date, "DD/MM/YYYY") : ""}
              allowClear={false}
              onChange={(val) =>
                onChange({
                  plan_job_date: val ? moment(val).format("DD/MM/YYYY") : null,
                  plan_job_date_old: plan_job_date,
                  isUpdate: true,
                })
              }
            />
          </Col>
          <Col span={3}></Col>
          <Col span={11}>
            <TimePicker
              placeholder={"Hour:minute"}
              className="full-width"
              format={"HH:mm"}
              value={moment(plan_job_plan_time, "HH:mm:ss")}
              onChange={(val) =>
                onChange({ plan_job_plan_time: moment(val).format("HH:mm:ss") })
              }
            />
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={24}>
            <CustomLabel label={"Worker :"} require />
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={10}>
            <InputNumber
              placeholder={"Amount of worker"}
              className="full-width"
              min={0}
              value={plan_job_plan_worker}
              onChange={(val) => onChange({ plan_job_plan_worker: val })}
            />
          </Col>
        </Row>
        <div className="mt-5 mb-2 text-center">
          {!isUpdate ? (
            <Button
              className="primary"
              onClick={onUpdatePlan}
              loading={loading}
            >
              Calculate Plan
            </Button>
          ) : (
            <Button className="" disabled>
              Calculate Plan
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default FormLeft;
