import { Card } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import { useHistory } from "react-router";
import "./machine.css";

const CostCenter = ({ machineList }) => {
  const history = useHistory();
  return (
    <>
      {machineList?.map((machine) => (
        <Card.Grid
          className={
            // machine.machineStatus === "ready"
            //   ?
            "machine-card"
            // : "machine-card not-ready"
          }
          key={machine.machine_id}
          // hoverable={machine.machineStatus === "ready" ? true : false}
          hoverable={true}
          onClick={() => {
            // machine.machineStatus === "ready" &&
            localStorage.setItem(
              "cost_center",
              JSON.stringify({
                id: machine.machine_cost_center,
                title: machine.machine_description,
                machine_id: machine.machine_id,
              })
            );
            history.push("/production/operations/timesheet");
          }}
        >
          <Text strong>
            [ {machine.machine_cost_center} ]
            <br />
            {machine.machine_description}
            {/* <br />
            {machine.machineStatus} */}
          </Text>
        </Card.Grid>
      ))}
    </>
  );
};

export default CostCenter;
