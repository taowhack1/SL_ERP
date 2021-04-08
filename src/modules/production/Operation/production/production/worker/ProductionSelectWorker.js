import { Card } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useRef } from "react";
import { useParams } from "react-router";
import Worker from "./Worker";

const ProductionSelectWorker = () => {
  const { id } = useParams();
  const employeeList = () => {
    let emp = [];
    for (let i = 0; i < Math.round(Math.random() * 100); i++) {
      emp.push({
        id: i,
        name: "TEST EMPLOYEE",
        photo: `https://randomuser.me/api/portraits/women/${Math.round(
          Math.random() * 100
        )}.jpg`,
      });
    }
    return emp;
  };
  const empList = employeeList();
  return (
    <div style={{ minHeight: 500 }}>
      <Card>
        <Worker employeeList={empList} />
      </Card>
    </div>
  );
};

export default ProductionSelectWorker;
