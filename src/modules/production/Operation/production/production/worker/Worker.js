import { UserOutlined } from "@ant-design/icons";
import { Card, message } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import Meta from "antd/lib/card/Meta";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ProductionContext } from "../../../../../../include/js/context";
import "../costCenter/machine.css";

const Worker = ({ employeeList }) => {
  const { form, tsFunction } = useContext(ProductionContext);
  const [select, setSelect] = useState(form.worker || []);
  const onSelect = (id, name) => {
    console.log(id, name);
    if (select.includes(id)) {
      setSelect(select.filter((fid) => fid !== id));
      message.warning({
        content: (
          <span>
            You deselect <b>{name}</b>
          </span>
        ),
      });
    } else {
      if (form.plan.plan_job_plan_worker === select.length)
        return message.warning({
          content: `Number of worker has limit by plan ( ${form.worker.length} / ${form.plan.plan_job_plan_worker} )`,
          key: "limit",
          duration: 4,
        });
      message.success({
        content: (
          <span>
            You select <b>{name}</b>
          </span>
        ),
      });
      setSelect([...select, id]);
    }
  };
  useEffect(() => {
    tsFunction("SELECT_WORKER", select);
  }, [select]);
  console.log("select list", select, select.length);
  return (
    <>
      {employeeList?.map((emp) => (
        <Card.Grid
          className={
            select.includes(emp.employee_no)
              ? "worker-card selected"
              : "worker-card"
          }
          key={emp.employee_no}
          onClick={() => onSelect(emp.employee_no, emp.employee_no_name)}
        >
          <Card
            cover={
              <img
                alt="example"
                height={120}
                src={
                  emp.employee_image ||
                  require("../../../../../../image/unnamed.png")
                }
              />
            }
          >
            <Meta title={`[ ${emp.employee_no} ]`}></Meta>
            <Meta title={emp.employee_name_eng}></Meta>
          </Card>
        </Card.Grid>
      ))}
    </>
  );
};

export default React.memo(Worker);
