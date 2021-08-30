import {
  EllipsisOutlined,
  PrinterOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Col, Divider, Row, Table, Tabs } from "antd";
import Modal from "antd/lib/modal/Modal";
import Text from "antd/lib/typography/Text";
import React, { useMemo, useState } from "react";
import CustomLabel from "../../../../../components/CustomLabel";
import CustomTable from "../../../../../components/CustomTable";
import MainLayout from "../../../../../components/MainLayout";
import Search from "../../../../../components/Search";
import useSubTable from "../../../../../include/js/customHooks/useSubTable";
import { getStatusByName } from "../../../../../include/js/function_main";
import { convertDigit } from "../../../../../include/js/main_config";
import ModalCreateNewJobOrder from "./ModalCreateNewJobOrder";

const SubJobOrder = (props) => {
  const data = props?.location?.state;
  const [modal, setModal] = useState({
    visible: false,
  });
  console.log("data", data);
  const {
    job_order_no,
    item_no_name,
    description,
    job_order_updated,
    job_order_fg_no,
    job_order_bulk_no,
    fg_qty,
    bulk_qty,
    mrp_no,
    item_no_name_bulk,
    item_no_name_fg,
  } = mockDataJob[0];

  const expandedRowRender = (row) => {
    return (
      <CustomTable
        columns={[]}
        dataSource={[]}
        size="small"
        className="drop-shadow w-90"
        rowClassName="row-table-detail "
        rowKey="id"
        bordered
      />
    );
  };

  const onOpen = () => setModal((prev) => ({ ...prev, visible: true }));
  const onClose = () => setModal((prev) => ({ ...prev, visible: false }));
  const layoutConfig = useMemo(
    () => ({
      projectId: 10, // project ID from DB
      title: "PRODUCTION", // project name
      home: "/production/operations/job_order", // path
      show: true, // bool show sub - tool bar
      breadcrumb: ["Production", "Operations", "Job Order", job_order_no], // [1,2,3] = 1 / 2 / 3
      search: false, // bool show search
      searchValue: null, //search string
      buttonAction: ["Save", "Discard"], // button
      badgeCont: 0, //number
      step: null, // object {current:0,step:[],process_complete:bool}
      create: "", // path or "modal" and use openModal() instead
      edit: "", // object {data: any , path : "string"} or function
      discard: "/production/operations/job_order", //path
      back: "", //path
      save: "", //path if not path use "function" and use onSave instead.
      onConfirm: () => console.log("Confirm"),
      onApprove: () => console.log("Approve"),
      onReject: () => console.log("Reject"),
      onCancel: () => console.log("Cancel"),
      onSearch: (keyword) => console.log("Search Key", keyword),
      openModal: () => console.log("openModal"),
      searchBar: null, //html code this show below search input
    }),
    []
  );

  return (
    <MainLayout {...layoutConfig}>
      <div id="form">
        <div className="under-line pm-3 text-center">
          <h1>JOB ORDER</h1>
        </div>
        <Row className="col-2 mt-1 mb-1" gutter={16}>
          <Col span={12}>
            <Row className="col-2 mt-1 mb-1" gutter={8}>
              <Col span={6}>
                <CustomLabel readOnly={false} label="MRP No." />
              </Col>
              <Col span={18}>{mrp_no}</Col>
            </Row>
            <Row className="col-2 mt-1 mb-1" gutter={8}>
              <Col span={6}>
                <CustomLabel readOnly={false} label="ชื่องาน :" />
              </Col>
              <Col span={18}>{description}</Col>
            </Row>
            <Row className="col-2 mt-1 mb-1" gutter={8}>
              <Col span={6}>
                <CustomLabel readOnly={false} label="Bulk Item :" />
              </Col>
              <Col span={18}>{item_no_name_fg}</Col>
            </Row>
            <Row className="col-2 mt-1 mb-1" gutter={8}>
              <Col span={6}>
                <CustomLabel readOnly={false} label="FG Item :" />
              </Col>
              <Col span={18}>{item_no_name_bulk}</Col>
            </Row>
            <Row className="col-2 mt-1 mb-1" gutter={8}>
              <Col span={6}>
                <CustomLabel readOnly={false} label="เปลี่ยนแปลงล่าสุด :" />
              </Col>
              <Col span={18}>{job_order_updated}</Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row className="col-2 mt-1 mb-1" gutter={8}>
              <Col span={6}>
                <CustomLabel readOnly={false} label="Job Bulk No :" />
              </Col>
              <Col span={18}>{job_order_bulk_no}</Col>
            </Row>
            <Row className="col-2 mt-1 mb-1" gutter={8}>
              <Col span={6}>
                <CustomLabel readOnly={false} label="Job FG No :" />
              </Col>
              <Col span={18}>{job_order_fg_no}</Col>
            </Row>
            <Row className="col-2 mt-1 mb-1" gutter={8}>
              <Col span={6}>
                <CustomLabel readOnly={false} label="Batch Size" />
              </Col>
              <Col span={18}>{convertDigit(bulk_qty, 4)}</Col>
            </Row>
            <Row className="col-2 mt-1 mb-1" gutter={8}>
              <Col span={6}>
                <CustomLabel readOnly={false} label="FG Qty." />
              </Col>
              <Col span={18}>{convertDigit(fg_qty, 4)}</Col>
            </Row>
          </Col>
        </Row>
        <Divider />
        <Tabs>
          <Tabs.TabPane tab="Job Order ย่อย">
            <div className="d-flex flex-space w-100 mb-1">
              {/* <div>
                <Button className="primary" onClick={onOpen}>
                  แบ่ง Job เพิ่ม
                </Button>
              </div> */}
              {/* <div>
                <Search placeholder="Search" />
              </div> */}
            </div>
            <Table
              columns={subJobOrderColumns({
                title: "Bulk - Job Order ( 900.0000 / 1,000.0000 Kg.)",
                className: "col-sm bg-tb-primary",
              })}
              dataSource={mockDataJobBulk}
              size="small"
              // expandable={{ expandedRowRender }}
              className="mb-3"
              rowClassName="row-table-detail"
              rowKey="id"
              bordered
              footer={() => (
                <div className="w-100" style={{ height: 35 }}>
                  <Button
                    type="primary"
                    style={{ float: "right" }}
                    onClick={onOpen}
                  >
                    แบ่งจ้อบ
                  </Button>
                </div>
              )}
              pagination={false}
            />
            <Table
              columns={subJobOrderColumns({
                title: "FG - Job Order  ( 300.0000 / 300.0000 pcs.)",
                className: "col-sm bg-tb-secondary",
              })}
              dataSource={mockDataJobFG}
              size="small"
              // expandable={{ expandedRowRender }}
              className="mb-3"
              rowClassName="row-table-detail"
              rowKey="id"
              bordered
              footer={() => (
                <div className="w-100" style={{ height: 35 }}>
                  <Button
                    type="primary"
                    style={{ float: "right" }}
                    onClick={onOpen}
                  >
                    แบ่งจ้อบ
                  </Button>
                </div>
              )}
              pagination={false}
            />
          </Tabs.TabPane>
        </Tabs>
      </div>
      <ModalCreateNewJobOrder {...modal} onClose={onClose} />
    </MainLayout>
  );
};

export default SubJobOrder;

const subJobOrderColumns = ({ title, className }) => [
  {
    title,
    align: "center",
    className,
    children: [
      {
        title: (
          <div className="text-center">
            <b>No.</b>
          </div>
        ),
        align: "center",
        className: "col-sm",
        width: "5%",
        dataIndex: "id",
        // sorter: (a, b) => a.id - b.id,
        render: (val) => val,
      },
      {
        title: (
          <div className="text-center">
            <b>Job No.</b>
          </div>
        ),
        align: "center",
        className: "col-sm",
        width: "10%",
        dataIndex: "job_order_no",
        render: (val) => val || "-",
      },
      {
        title: (
          <div className="text-center">
            <b>Job Name</b>
          </div>
        ),
        align: "left",
        className: "col-sm",
        // width: "10%",
        dataIndex: "job_order_description",
        render: (val) => val || "-",
      },
      {
        title: (
          <div className="text-center">
            <b>Quantity</b>
          </div>
        ),
        align: "right",
        className: "col-sm",
        width: "10%",
        dataIndex: "job_order_qty",
        render: (val) => (val && convertDigit(val, 4)) || "-",
      },
      {
        title: (
          <div className="text-center">
            <b>UOM</b>
          </div>
        ),
        align: "center",
        className: "col-sm",
        // width: "10%",
        dataIndex: "uom_no",
        render: (val) => val || "-",
      },

      {
        title: (
          <div className="text-center">
            <b>Status</b>
          </div>
        ),
        align: "center",
        className: "col-sm",
        width: "10%",
        dataIndex: "trans_status_name",
        // sorter: (a, b) => a.tg_trans_status_id - b.tg_trans_status_id,
        render: (val) => (val && getStatusByName(val)) || "-",
      },
      {
        title: (
          <div className="text-center">
            <b>Action</b>
          </div>
        ),
        align: "center",
        className: "col-sm",
        width: "10%",
        dataIndex: "tg_job_order_start_date",
        render: (val) => <Button type="dashed">Confirm</Button>,
      },
      {
        title: (
          <div className="text-center">
            <b>View / Print</b>
          </div>
        ),
        align: "center",
        className: "col-sm",
        width: "10%",
        dataIndex: "tg_job_order_start_date",
        render: (val) => (
          <div>
            <SearchOutlined className="button-icon" />
            <PrinterOutlined className="button-icon pd-left-2" />
          </div>
        ),
      },
    ],
  },
];

const mockDataJob = [
  {
    id: 1,
    job_order_fg_no: "FP2100001",
    job_order_bulk_no: "BP2100001",
    mrp_no: "MRP202108001",
    description: "AT-MRP202108002-0000121-C411SMTA000100-300.000000 pcs",
    job_order_updated: "26/08/2021 17.30",
    item_no_name_fg: "C411SMTA000100",
    item_no_name_bulk: "C311SMTA000100",
    fg_qty: 300,
    bulk_qty: 1000,
  },
];

const mockDataJobBulk = [
  {
    id: 1,
    job_order_no: "BP2100001-001",
    job_order_description: "C311SMTA000100-300.000000 kg",
    job_order_type_name: "Job Bulk",
    job_order_type_id: 3,
    tg_job_order_start_date: "-",
    trans_status_name: "-",
    job_order_qty: 300,
    uom_no: "kg",
  },
  {
    id: 2,
    job_order_no: "BP2100001-002",
    job_order_description: "C311SMTA000100-300.000000 kg",
    job_order_type_name: "Job Bulk",
    job_order_type_id: 3,
    tg_job_order_start_date: "-",
    trans_status_name: "-",
    job_order_qty: 300,
    uom_no: "kg",
  },
  {
    id: 3,
    job_order_no: "BP2100001-003",
    job_order_description: "C311SMTA000100-300.000000 kg",
    job_order_type_name: "Job Bulk",
    job_order_type_id: 3,
    tg_job_order_start_date: "-",
    trans_status_name: "-",
    job_order_qty: 300,
    uom_no: "kg",
  },
  // {
  //   id: 4,
  //   job_order_no: "BP2100001-004",
  //   job_order_description: "C311SMTA000100-100.000000 kg",
  //   job_order_type_name: "Job Bulk",
  //   job_order_type_id: 3,
  //   tg_job_order_start_date: "-",
  //   trans_status_name: "-",
  //   job_order_qty: 100,
  //   uom_no: "kg",
  // },
];
const mockDataJobFG = [
  {
    id: 1,
    job_order_no: "FP2100001-001",
    job_order_description: "C411SMTA000100-300.000000 pcs",
    job_order_type_name: "Job FG",
    job_order_type_id: 4,
    tg_job_order_start_date: "-",
    trans_status_name: "-",
    job_order_qty: 300,
    uom_no: "pcs",
  },
];
