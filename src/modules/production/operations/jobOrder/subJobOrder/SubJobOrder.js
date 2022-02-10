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
const apiGetJobByMRPId = `/production/job_order/mrp_v2`;
const SubJobOrder = (props) => {
  const { id } = useParams();
  const { data, loading, fetchData } = useFetch(`${apiGetJobByMRPId}/${id}`);
  const {
    job_order_detail,
    item_id,
    item_no,
    type_id,
    item_job_order_no,
    item_ref_id,
    item_ref_no,
    type_ref_id,
    item_ref_job_order_no,
    mrp_id,
    mrp_no,
    mrp_item_qty_produce,
    mrp_item_qty_produce_open,
    mrp_item_qty_produce_balance,
    mrp_item_ref_qty_produce,
    mrp_item_ref_qty_produce_open,
    mrp_item_ref_qty_produce_balance,
    mrp_so_running_no,
    uom_no,
    uom_ref_no,
    bulk_job_order_no_description,
    fg_job_order_no_description,
    // } = data?.length ? data[0] : {};
  } = data?.data?.length ? data?.data[0] : {};
  const formConfig = {
    //Seperateable
    sepBulk: [3].includes(type_id)
      ? mrp_item_qty_produce_balance
      : mrp_item_ref_qty_produce_balance,
    sepFG: mrp_item_qty_produce_balance,
    sepSet: mrp_item_qty_produce_balance,
    bulk_job_order_no_description,
    fg_job_order_no_description,
  };

  const [jobBulk, jobFG, jobSet] = [
    job_order_detail?.filter(
      ({ routing_detail_type_id }) => routing_detail_type_id === 1
    ),
    job_order_detail?.filter(({ routing_detail_type_id }) =>
      [2].includes(routing_detail_type_id)
    ),
    job_order_detail?.filter(({ routing_detail_type_id }) =>
      [3].includes(routing_detail_type_id)
    ),
  ];

  const [modal, setModal] = useState(initialStateModal);

  const onOpen = ({ routing_detail_type_id }) =>
    setModal((prev) => ({
      ...prev,
      visible: true,
      routing_detail_type_id,
      uom_no:
        type_id !== 3 && routing_detail_type_id === 1 ? uom_ref_no : uom_no,
      mrp_id,
      ...formConfig,
    }));

  const onClose = (isUpdate = false) => {
    console.log("onClose", isUpdate);
    setModal((prev) => ({ ...prev, ...initialStateModal }));
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
    [mrp_no]
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
                <CustomLabel readOnly={false} label="Item :" />
              </Col>
              <Col span={18}>{item_no || "-"}</Col>
            </Row>
            <Row className="col-2 mt-1 mb-1" gutter={8}>
              <Col span={6}>
                <CustomLabel readOnly={false} label="Item Ref.:" />
              </Col>
              <Col span={18}>{item_ref_no || "-"}</Col>
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
              <Col span={8}>
                <CustomLabel readOnly={false} label="Job Item No. :" />
              </Col>
              <Col span={16}>{item_job_order_no || "-"}</Col>
            </Row>
            <Row className="col-2 mt-1 mb-1" gutter={8}>
              <Col span={8}>
                <CustomLabel readOnly={false} label="Job Item Ref. No.:" />
              </Col>
              <Col span={16}>{item_ref_job_order_no || "-"}</Col>
            </Row>
            <Row className="col-2 mt-1 mb-1" gutter={8}>
              <Col span={6}>
                <CustomLabel readOnly={false} label="Item Qty. :" />
              </Col>
              <Col span={18}>
                <Text className="text-value">
                  {mrp_item_qty_produce
                    ? convertDigit(mrp_item_qty_produce, 6)
                    : "-"}
                </Text>
                <Text className="ml-3" strong>
                  {uom_no || ""}
                </Text>
              </Col>
            </Row>
            <Row className="col-2 mt-1 mb-1" gutter={8}>
              <Col span={6}>
                <CustomLabel readOnly={false} label="Batch Size :" />
              </Col>
              <Col span={18}>
                <Text className="text-value">
                  {mrp_item_ref_qty_produce
                    ? convertDigit(mrp_item_ref_qty_produce, 6)
                    : "-"}
                </Text>
                <Text className="ml-3" strong>
                  {uom_ref_no || ""}
                </Text>
              </Col>
            </Row>
          </Col>
        </Row>
        <Divider />
        <Tabs>
          <Tabs.TabPane tab="Job Order ย่อย">
            {/* Bulk - JOB ORDER */}
            {([3].includes(type_id) ||
              ([4].includes(type_id) && item_ref_id)) && (
              <Table
                columns={subJobOrderColumns({
                  title: (
                    <div>
                      {`Bulk - Job Order ( `}
                      <span
                        className={formConfig?.sepBulk ? "require" : "complete"}
                      >
                        {`${convertDigit(
                          type_id === 3
                            ? mrp_item_qty_produce_open
                            : mrp_item_ref_qty_produce_open || 0,
                          6
                        )} / ${convertDigit(
                          type_id === 3
                            ? mrp_item_qty_produce
                            : mrp_item_ref_qty_produce || 0,
                          6
                        )}`}
                      </span>
                      {` ${uom_ref_no || uom_no || "-"} )`}
                    </div>
                  ),
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
            )}

            {/* FG - JOB ORDER */}
            {[4].includes(type_id) && (
              <Table
                columns={subJobOrderColumns({
                  title: (
                    <div>
                      {`FG - Job Order ( `}
                      <span
                        className={formConfig?.sepFG ? "require" : "complete"}
                      >
                        {`${convertDigit(
                          mrp_item_qty_produce_open || 0,
                          6
                        )} / ${convertDigit(mrp_item_qty_produce || 0, 6)}`}
                      </span>
                      {` ${uom_no || "-"} )`}
                    </div>
                  ),

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
            )}
            {/* Set - JOB ORDER */}
            {[5].includes(type_id) && (
              <Table
                columns={subJobOrderColumns({
                  title: (
                    <div>
                      {`Set - Job Order ( `}
                      <span
                        className={formConfig?.sepSet ? "require" : "complete"}
                      >
                        {`${convertDigit(
                          mrp_item_qty_produce_open || 0,
                          6
                        )} / ${convertDigit(mrp_item_qty_produce || 0, 6)}`}
                      </span>
                      {` ${uom_no || "-"} )`}
                    </div>
                  ),

                  className: "col-sm bg-tb-secondary",
                  onPrint,
                  viewJob,
                  routing_detail_type_id: 3,
                })}
                dataSource={jobSet}
                size="small"
                className="mb-3"
                rowClassName="row-table-detail"
                rowKey="id"
                bordered
                footer={() => (
                  <div className="w-100" style={{ height: 35 }}>
                    <Button
                      type={formConfig?.sepSet ? "primary" : ""}
                      style={{ float: "right" }}
                      onClick={() => onOpen({ routing_detail_type_id: 3 })}
                      disabled={!formConfig?.sepSet}
                    >
                      แบ่ง Job
                    </Button>
                  </div>
                )}
                pagination={false}
              />
            )}
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
        ellipsis: true,
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
        dataIndex: "uom_no",
        width: "8%",
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
        render: (val) => (val && getStatusByName(val)) || "-",
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
        dataIndex: "job_order_id",
        render: (val, { job_order_no, button_confirm = true }) => (
          <div>
            <SearchOutlined
              className="button-icon"
              onClick={() =>
                viewJob({ job_order_id: val, routing_detail_type_id })
              }
            />
            <PrinterOutlined
              className="button-icon pd-left-2"
              onClick={() => onPrint(job_order_no)}
            />
          </div>
        ),
      },
    ],
  },
];
