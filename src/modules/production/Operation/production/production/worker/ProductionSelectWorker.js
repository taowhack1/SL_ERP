/** @format */

import { Card } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useContext, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Worker from "./Worker";
import { getProductionEmp } from "../../../../../../actions/hrm";
import { ProductionContext } from "../../../../../../include/js/context";

const ProductionSelectWorker = () => {
  const dispatch = useDispatch();
  const { form } = useContext(ProductionContext);
  const { production: empList } = useSelector((state) => state.hrm.employee);
  // const employeeList = () => {
  //   let emp = [];
  //   for (let i = 0; i < Math.round(Math.random() * 100); i++) {
  //     emp.push({
  //       id: i,
  //       name: "TEST EMPLOYEE",
  //       photo: `https://randomuser.me/api/portraits/women/${Math.round(
  //         Math.random() * 100
  //       )}.jpg`,
  //     });
  //   }
  //   return emp;
  // };
  // const empList = employeeList();
  useEffect(() => {
    dispatch(getProductionEmp());
  }, []);
  return (
    <div style={{ minHeight: 500 }}>
      <Card>
        <Worker employeeList={empList} />
      </Card>
      <div className='select-emp-label'>
        <Text
          strong>{`Selected : ${form.worker.length} / ${form.plan.plan_job_plan_worker}`}</Text>
      </div>
    </div>
  );
};

export default ProductionSelectWorker;
