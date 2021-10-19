import React from "react";
import { Table } from "antd";
const ColorAndOdorTable = () => {
  const expandedRowRender = () => {
    return (
      <Table
        bordered
        rowKey="id"
        rowClassName="row-table-detail"
        loading={loading}
        columns={revisionColumns()}
        dataSource={mockData}
        expandable={{ expandedRowRender }}
      />
    );
  };
  return (
    <>
      <Table
        bordered
        rowKey="id"
        rowClassName="row-table-detail"
        loading={loading}
        columns={columns()}
        dataSource={mockData}
        expandable={{ expandedRowRender }}
      />
    </>
  );
};

export default React.memo(ColorAndOdorTable);

const columns = () => [
  {
    title: (
      <div className="text-center">
        <b>No.</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "5%",
    dataIndex: "id",
    render: (val) => val + 1,
  },
  {
    title: (
      <div className="text-center">
        <b>Color</b>
      </div>
    ),
    align: "left",
    className: "tb-col-sm",
    //   width: "10%",
    dataIndex: "npr_color_description",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>Odor</b>
      </div>
    ),
    align: "left",
    className: "tb-col-sm",
    //   width: "10%",
    dataIndex: "npr_odor_description",
    render: (val) => val || "-",
  },
];

const revisionColumns = () => [
  {
    title: (
      <div className="text-center">
        <b>Revision No.</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "5%",
    dataIndex: "npr_formula_revision_no",
  },
  {
    title: (
      <div className="text-center">
        <b>Formula No.</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "npr_formula_no",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>Description</b>
      </div>
    ),
    align: "left",
    className: "tb-col-sm",
    //   width: "10%",
    dataIndex: "npr_formula_description",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>Create Date</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    //   width: "10%",
    dataIndex: "npr_formula_created",
    render: (val) => val || "-",
  },
];

const mockData = [
  {
    id: 0,
    doc_id: 3,
    doc_no: "DOC21010003",
    ref_no: "REF21010003",
    description: "MOCK-DATA-0003",
    date: "31/12/2021",
    status: "Complete",
  },
];
