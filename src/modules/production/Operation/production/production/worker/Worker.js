import { UserOutlined } from "@ant-design/icons";
import { Card } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import Meta from "antd/lib/card/Meta";
import React, { useRef, useState } from "react";
import "../costCenter/machine.css";

const Worker = ({ employeeList }) => {
  const [select, setSelect] = useState([]);
  const onSelect = (id) => {
    if (select.includes(id)) {
      setSelect(select.filter((fid) => fid !== id));
    } else {
      setSelect([...select, id]);
    }
  };
  console.log("select list", select, select.length);
  return (
    <>
      {employeeList?.map((emp) => (
        <Card.Grid
          className={
            select.includes(emp.id) ? "worker-card selected" : "worker-card"
          }
          key={emp.id}
          onClick={() => onSelect(emp.id)}
        >
          <Card
            cover={
              <img alt="example" width="120px" height="160px" src={emp.photo} />
            }
          >
            <Meta title={emp.name}></Meta>
          </Card>
        </Card.Grid>
      ))}
    </>
  );
};

export default Worker;
