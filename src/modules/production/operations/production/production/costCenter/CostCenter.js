import { Card } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import { useHistory } from "react-router";
import { useFetch } from "../../../../../../include/js/customHooks";
import "./machine.css";

const apiWorkCenter = `/production/machine`;
const WorkCenter = () => {
  const { data: workCenter, error, loading } = useFetch(apiWorkCenter);
  const history = useHistory();
  return (
    <>
      {workCenter?.map((machine) => (
        <Card.Grid
          className={"machine-card"}
          key={machine?.machine_id}
          hoverable={true}
          onClick={() => {
            localStorage.setItem(
              "cost_center",
              JSON.stringify({
                id: machine?.machine_cost_center,
                title: machine?.machine_description,
                machine_id: machine?.machine_id,
              })
            );
            history.push("/production/operations/timesheet");
          }}
        >
          <Text strong>
            [ {machine?.machine_cost_center} ]
            <br />
            {machine?.machine_description}
          </Text>
        </Card.Grid>
      ))}
    </>
  );
};

export default React.memo(WorkCenter);
