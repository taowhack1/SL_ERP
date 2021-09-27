import { Card, Spin } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetTimesheet,
  resetTimesheetCtrl,
  setTimesheet,
} from "../../../../../actions/production/timesheetActions";
import { useFetch } from "../../../../../include/js/customHooks";

const apiWorkCenter = `/production/machine/plan_job/0`;
const WorkCenter = () => {
  const dispatch = useDispatch();
  const {
    timesheet: { workCenterID },
  } = useSelector((state) => state?.production?.operations);
  const { data: workCenter, loading } = useFetch(apiWorkCenter);
  return (
    <>
      <Spin spinning={loading}>
        {workCenter?.map(
          ({ machine_id, machine_description, machine_cost_center }) => (
            <Card.Grid
              className={
                workCenterID !== machine_id
                  ? "machine-card"
                  : "machine-card machine-card-selected"
              }
              key={machine_id}
              hoverable={true}
              onClick={() => {
                dispatch(resetTimesheet());
                dispatch(resetTimesheetCtrl());
                dispatch(
                  setTimesheet({
                    workCenterID:
                      workCenterID !== machine_id ? machine_id : null,
                  })
                );
              }}
            >
              <Text strong>
                [ {machine_cost_center} ]
                <br />
                {machine_description}
              </Text>
            </Card.Grid>
          )
        )}
      </Spin>
    </>
  );
};

export default React.memo(WorkCenter);
