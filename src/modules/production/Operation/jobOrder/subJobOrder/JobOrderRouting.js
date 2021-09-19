import { DeleteTwoTone, EllipsisOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import CustomTable from "../../../../../components/CustomTable";
import { Divider } from "antd";
const JobOrderRouting = (props) => {
  const { dataSource = [], loading = false } = props;
  const { control, register, reset } = useForm();
  const { fields, append, remove } = useFieldArray({
    name: "routing",
    control,
  });
  useEffect(() => {
    reset({
      routing: [
        {
          doc_no: "MOCK-001",
          description: "MOCK-WORK-CENTER-001",
          man: 5,
          period: "04:30",
        },
      ],
    });
  }, []);
  return (
    <>
      <Divider orientation="left">Routing</Divider>
      <CustomTable
        bordered
        rowKey="id"
        rowClassName="row-table-detail"
        loading={loading}
        columns={columns({ readOnly: false, remove })}
        dataSource={fields}
        onAdd={append}
      />
    </>
  );
};

export default React.memo(JobOrderRouting);

const columns = ({ readOnly, remove }) => [
  {
    title: (
      <div className="text-center">
        <b>Work Center No.</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "doc_no",
    render: (val, record, index) => val || "MOCK-00" + (index + 1),
  },
  {
    title: (
      <div className="text-center">
        <b>Description</b>
      </div>
    ),
    align: "left",
    className: "tb-col-sm",
    // width: "10%",
    dataIndex: "description",
    render: (val, record, index) => val || "MOCK-WORK-CENTER-00" + (index + 1),
  },
  {
    title: (
      <div className="text-center">
        <b>Man</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "man",
    render: (val) => val || "5",
  },
  {
    title: (
      <div className="text-center">
        <b>Period</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "period",
    render: (val) => val || "01:00",
  },
  {
    title: (
      <div className="text-center">
        <EllipsisOutlined />
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "5%",
    dataIndex: "doc_id",
    render: (val, record, index) => (
      <DeleteTwoTone className="button-icon" onClick={() => remove(index)} />
    ),
  },
];
