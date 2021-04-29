import { Col, DatePicker, Divider, InputNumber, Row, TimePicker } from "antd";
import React from "react";
import CustomLabel from "../../../../../components/CustomLabel";
import CustomSelect from "../../../../../components/CustomSelect";
import CustomTable from "../../../../../components/CustomTable";
const columns = () => [
  {
    title: "Cost Center",
  },
  {
    title: "Date",
    width: "20%",
  },
  {
    title: "New Date",
    width: "20%",
  },
  {
    title: "Period",
    width: "15%",
  },
  {
    title: "Worker",
    width: "15%",
  },
];
const FormRight = (props) => {
  return (
    <>
      <div className="full-wh" style={{ padding: "5px 20px" }}>
        <div className="title-bar">
          <h3>Reference Cost Center</h3>
        </div>
        <CustomTable columns={columns()} />
      </div>
    </>
  );
};

export default FormRight;
