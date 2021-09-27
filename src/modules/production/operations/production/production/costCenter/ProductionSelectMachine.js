import { Card } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMachine } from "../../../../../../actions/production/machineActions";
import DetailLoading from "../../../../../../components/DetailLoading";
import CostCenter from "./CostCenter";
import "./machine.css";
const ProductionSelectMachine = () => {
  const dispatch = useDispatch();
  const { loading, machine } = useSelector((state) => state.production);
  useEffect(() => {
    dispatch(getAllMachine());
  }, []);
  return (
    <>
      {loading ? (
        <DetailLoading />
      ) : (
        <div style={{ minHeight: 500 }}>
          <Card title="Select Cost Center">
            {/* <Card> */}
            <CostCenter machineList={machine.machineList} />
          </Card>
        </div>
      )}
    </>
  );
};

export default ProductionSelectMachine;
