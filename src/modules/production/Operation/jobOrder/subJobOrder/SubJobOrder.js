import { PrinterOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Col, Divider, message, Row, Table, Tabs } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useMemo, useState } from "react";
import { useParams } from "react-router";
import CustomLabel from "../../../../../components/CustomLabel";
import MainLayout from "../../../../../components/MainLayout";
import { useFetch } from "../../../../../include/js/customHooks";
import { getStatusByName } from "../../../../../include/js/function_main";
import { convertDigit } from "../../../../../include/js/main_config";
import ModalCreateNewJobOrder from "./ModalCreateNewJobOrder";
const initialStateModal = {
  visible: false,
  job_order_id: null,
  routing_detail_type_id: null,
  uom_no: null,
};
const apiGetJobByMRPId = `/production/job_order/mrp`;
const SubJobOrder = (props) => {
  const { id } = useParams();
  console.log("api", `${apiGetJobByMRPId}/${id}`);
  const { data, loading, fetchData } = useFetch(`${apiGetJobByMRPId}/${id}`);
  console.log("mainData", data);
  const {
    job_order,
    bulk_job_order_no,
    fg_job_order_no,
    item_no,
    item_name,
    item_no_ref,
    mrp_id,
    mrp_no,
    mrp_qty_produce,
    mrp_qty_produce_open,
    mrp_qty_produce_balance,
    mrp_qty_produce_ref,
    mrp_qty_produce_ref_open,
    mrp_qty_produce_ref_balance,
    mrp_so_running_no,
    uom_no,
    uom_no_ref,
    bulk_job_order_no_description,
    fg_job_order_no_description,
  } = data?.length ? data[0] : {};
  const formConfig = {
    //Seperateable
    sepBulk: mrp_qty_produce_ref_balance,
    sepFG: mrp_qty_produce_balance,
    bulk_job_order_no_description,
    fg_job_order_no_description,
  };

  const [jobBulk, jobFG] = [
    job_order?.filter(
      ({ routing_detail_type_id }) => routing_detail_type_id === 1
    ),
    job_order?.filter(
      ({ routing_detail_type_id }) => routing_detail_type_id === 2
    ),
  ];

  const [modal, setModal] = useState(initialStateModal);

  const onOpen = ({ routing_detail_type_id }) =>
    setModal((prev) => ({
      ...prev,
      visible: true,
      routing_detail_type_id,
      uom_no: routing_detail_type_id === 1 ? uom_no_ref : uom_no,
      mrp_id,
      ...formConfig,
    }));
  const onClose = (isUpdate = false) => {
    console.log("onClose", isUpdate);
    setModal((prev) => ({ ...prev, ...initialStateModal }));
    // fetchData();
  };
  const viewJob = ({ job_order_id, routing_detail_type_id }) =>
    setModal((prev) => ({
      ...prev,
      visible: true,
      job_order_id,
      routing_detail_type_id,
      mrp_id,
      ...formConfig,
    }));
  const onPrint = (job_order_no = null) => {
    if (!job_order_no) return message.error("Missing Job No.");
    window.open(
      `${process.env.REACT_APP_REPORT_SERVER}/report_job_order_part.aspx?job_order_no=${job_order_no}`
    );
  };

  const layoutConfig = useMemo(
    () => ({
      projectId: 10, // project ID from DB
      title: "PRODUCTION", // project name
      home: "/production/operations/job_order", // path
      show: true, // bool show sub - tool bar
      breadcrumb: ["Production", "Operations", "Job Order", mrp_no], // [1,2,3] = 1 / 2 / 3
      search: false, // bool show search
      searchValue: null, //search string
      buttonAction: ["Back"], // button
      badgeCont: 0, //number
      step: null, // object {current:0,step:[],process_complete:bool}
      create: "", // path or "modal" and use openModal() instead
      edit: "", // object {data: any , path : "string"} or function
      discard: "/production/operations/job_order", //path
      back: "/production/operations/job_order", //path
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
          <Col span={15}>
            <Row className="col-2 mt-1 mb-1" gutter={8}>
              <Col span={6}>
                <CustomLabel readOnly={false} label="MRP No." />
              </Col>
              <Col span={18}>{mrp_no}</Col>
            </Row>
            <Row className="col-2 mt-1 mb-1" gutter={8}>
              <Col span={6}>
                <CustomLabel readOnly={false} label="S/O :" />
              </Col>
              <Col span={18}>{mrp_so_running_no}</Col>
            </Row>
            <Row className="col-2 mt-1 mb-1" gutter={8}>
              <Col span={6}>
                <CustomLabel readOnly={false} label="Bulk Item :" />
              </Col>
              <Col span={18}>{item_no_ref || "-"}</Col>
            </Row>
            <Row className="col-2 mt-1 mb-1" gutter={8}>
              <Col span={6}>
                <CustomLabel readOnly={false} label="FG Item :" />
              </Col>
              <Col span={18}>{item_no || "-"}</Col>
            </Row>
            <Row className="col-2 mt-1 mb-1" gutter={8}>
              <Col span={6}>
                <CustomLabel readOnly={false} label="Last Updated :" />
              </Col>
              <Col span={18}>{"-"}</Col>
            </Row>
          </Col>
          <Col span={9}>
            <Row className="col-2 mt-1 mb-1" gutter={8}>
              <Col span={6}>
                <CustomLabel readOnly={false} label="Job Bulk No :" />
              </Col>
              <Col span={18}>{bulk_job_order_no || "-"}</Col>
            </Row>
            <Row className="col-2 mt-1 mb-1" gutter={8}>
              <Col span={6}>
                <CustomLabel readOnly={false} label="Job FG No :" />
              </Col>
              <Col span={18}>{fg_job_order_no || "-"}</Col>
            </Row>
            <Row className="col-2 mt-1 mb-1" gutter={8}>
              <Col span={6}>
                <CustomLabel readOnly={false} label="Batch Size :" />
              </Col>
              <Col span={18}>
                <Text className="text-value">
                  {mrp_qty_produce_ref
                    ? convertDigit(mrp_qty_produce_ref, 6)
                    : "-"}
                </Text>
                <Text className="ml-3" strong>
                  {uom_no_ref || ""}
                </Text>
              </Col>
            </Row>
            <Row className="col-2 mt-1 mb-1" gutter={8}>
              <Col span={6}>
                <CustomLabel readOnly={false} label="FG Qty. :" />
              </Col>
              <Col span={18}>
                <Text className="text-value">
                  {mrp_qty_produce ? convertDigit(mrp_qty_produce, 6) : "-"}
                </Text>
                <Text className="ml-3" strong>
                  {uom_no || ""}
                </Text>
              </Col>
            </Row>
          </Col>
        </Row>
        <Divider />
        <Tabs>
          <Tabs.TabPane tab="Job Order ย่อย">
            <Table
              columns={subJobOrderColumns({
                title: `Bulk - Job Order ( ${convertDigit(
                  mrp_qty_produce_ref_open || 0,
                  6
                )} / ${convertDigit(mrp_qty_produce_ref || 0, 6)} ${
                  uom_no_ref || uom_no || "-"
                } )`,
                className: "col-sm bg-tb-primary",
                onPrint,
                viewJob,
                routing_detail_type_id: 1,
              })}
              dataSource={jobBulk}
              loading={loading}
              size="small"
              className="mb-3"
              rowClassName="row-table-detail"
              rowKey="id"
              bordered
              footer={() => (
                <div className="w-100" style={{ height: 35 }}>
                  <Button
                    type={formConfig?.sepBulk ? "primary" : ""}
                    style={{ float: "right" }}
                    onClick={() => onOpen({ routing_detail_type_id: 1 })}
                    disabled={!formConfig?.sepBulk}
                  >
                    แบ่ง Job
                  </Button>
                </div>
              )}
              pagination={false}
            />
            <Table
              columns={subJobOrderColumns({
                title: `FG - Job Order ( ${convertDigit(
                  mrp_qty_produce_open || 0,
                  6
                )} / ${convertDigit(mrp_qty_produce || 0, 6)} ${
                  uom_no || "-"
                })`,
                className: "col-sm bg-tb-secondary",
                onPrint,
                viewJob,
                routing_detail_type_id: 2,
              })}
              dataSource={jobFG}
              size="small"
              className="mb-3"
              rowClassName="row-table-detail"
              rowKey="id"
              bordered
              footer={() => (
                <div className="w-100" style={{ height: 35 }}>
                  <Button
                    type={formConfig?.sepFG ? "primary" : ""}
                    style={{ float: "right" }}
                    onClick={() => onOpen({ routing_detail_type_id: 2 })}
                    disabled={!formConfig?.sepFG}
                  >
                    แบ่ง Job
                  </Button>
                </div>
              )}
              pagination={false}
            />
          </Tabs.TabPane>
        </Tabs>
      </div>
      <ModalCreateNewJobOrder
        {...modal}
        onClose={onClose}
        fetchData={fetchData}
        onPrint={onPrint}
      />
    </MainLayout>
  );
};

export default SubJobOrder;

const subJobOrderColumns = ({
  title,
  className,
  onPrint,
  viewJob,
  routing_detail_type_id = 1,
}) => [
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
        render: (val) => (val && convertDigit(val, 6)) || "-",
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
      // {
      //   title: (
      //     <div className="text-center">
      //       <b>Action</b>
      //     </div>
      //   ),
      //   align: "center",
      //   className: "col-sm",
      //   width: "10%",
      //   dataIndex: "button_confirm",
      //   render: (_, { button_confirm, button_recall, button_cancel }) => (
      //     <Space size={18}>
      //       {button_confirm === 1 && <Button type="primary">Confirm</Button>}
      //       {button_recall === 1 && (
      //         <Button type="default" danger>
      //           Cancel Confirm
      //         </Button>
      //       )}
      //       {button_cancel === 1 && (
      //         <Button type="default" danger>
      //           Cancel
      //         </Button>
      //       )}
      //     </Space>
      //   ),
      // },
      {
        title: (
          <div className="text-center">
            <b>View / Print</b>
          </div>
        ),
        align: "center",
        className: "col-sm",
        width: "10%",
        dataIndex: "job_order_id",
        render: (val, { job_order_no, button_confirm = true }) => (
          <div>
            <SearchOutlined
              className="button-icon"
              onClick={() =>
                viewJob({ job_order_id: val, routing_detail_type_id })
              }
            />
            {/* {!button_confirm ? ( */}
            <PrinterOutlined
              className="button-icon pd-left-2"
              onClick={() => onPrint(job_order_no)}
            />
            {/* ) : (
              <PrinterOutlined className="text-disabled pd-left-2 disabled" />
            )} */}
          </div>
        ),
      },
    ],
  },
];
