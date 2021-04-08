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
            machine.machineStatus === "ready"
              ? "machine-card"
              : "machine-card not-ready"
          }
          key={machine.id}
          hoverable={machine.machineStatus === "ready" ? true : false}
          onClick={() =>
            machine.machineStatus === "ready" &&
            history.push(`/production/operations/production`)
          }
        >
          <Text strong>
            [ {machine.id} ]
            <br />
            {machine.title}
            <br />
            {machine.machineStatus}
          </Text>
        </Card.Grid>
      ))}
    </>
  );
};

export default CostCenter;
