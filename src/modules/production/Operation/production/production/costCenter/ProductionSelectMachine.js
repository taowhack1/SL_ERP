import { Card } from "antd";
import React from "react";
import { rawData } from "../../../planning/data";
import CostCenter from "./CostCenter";
import "./machine.css";
const ProductionSelectMachine = () => {
  return (
    <>
      <div style={{ minHeight: 500 }}>
        <Card title="Select Cost Center">
          {/* <Card> */}
          <CostCenter machineList={rawData.machine2} />
        </Card>
      </div>
    </>
  );
};

export default ProductionSelectMachine;
