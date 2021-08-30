import { Button, Col, Divider, Input, InputNumber, Row, Tabs } from "antd";
import Modal from "antd/lib/modal/Modal";
import Text from "antd/lib/typography/Text";
import React from "react";
import CustomLabel from "../../../../../components/CustomLabel";
import CustomTable from "../../../../../components/CustomTable";
import {
  convertDigit,
  getNumberFormat,
} from "../../../../../include/js/main_config";

const ModalCreateNewJobOrder = ({ visible = true, onClose }) => {
  return (
    <Modal
      visible={visible}
      width={900}
      title="Job Order"
      destroyOnClose
      okText={"Save"}
      cancelText={"Discard"}
      onOk={onClose}
      onCancel={onClose}
    >
      <Row className="col-2 mt-1 mb-1" gutter={16}>
        <Col span={14}>
          <Row className="col-2 mt-1 mb-1" gutter={8}>
            <Col span={10}>
              <CustomLabel
                label="จำนวนคงเหลือที่แบ่งได้ :"
                require
                readOnly={false}
              />
            </Col>
            <Col span={14}>
              <Text strong>{convertDigit(100, 4)}</Text>
              <Text strong className="pd-left-2">
                {"kg"}
              </Text>
            </Col>
          </Row>
          <Divider />
          <Row className="col-2 mt-1 mb-1" gutter={8}>
            <Col span={10}>
              <CustomLabel label="ชื่องาน :" require readOnly={false} />
            </Col>
            <Col span={14}>
              <Input className="w-100" placeholder={"ชื่องาน"} />
            </Col>
          </Row>
          <Row className="col-2 mt-1 mb-1" gutter={8}>
            <Col span={10}>
              <CustomLabel
                label="จำนวนที่ต้องการแบ่ง :"
                require
                readOnly={false}
              />
            </Col>
            <Col span={14}>
              <InputNumber
                {...getNumberFormat(4)}
                min={0}
                className="w-50"
                defaultValue={100}
              />
              <Button className="primary ml-2">คำนวณวัดถุดิบ</Button>
            </Col>
          </Row>
        </Col>
        <Col span={12}></Col>
      </Row>
      <Tabs>
        <Tabs.TabPane tab="Raw Material" key="1">
          <CustomTable
            bordered
            className="w-100"
            rowKey="id"
            columns={columns()}
            dataSource={mockRM}
            pageSize={999}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Packaging" key="2">
          <CustomTable
            bordered
            className="w-100"
            rowKey="id"
            columns={columns()}
            dataSource={mockPK}
            pageSize={999}
          />
        </Tabs.TabPane>
      </Tabs>
    </Modal>
  );
};

export default React.memo(ModalCreateNewJobOrder);

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
    render: (val) => val,
  },
  {
    title: (
      <div className="text-center">
        <b>Item Code.</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "20%",
    dataIndex: "item_no",
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
    // width: "10%",
    dataIndex: "item_name",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>Quantity</b>
      </div>
    ),
    align: "right",
    className: "tb-col-sm",
    width: "15%",
    dataIndex: "qty",
    render: (val) => convertDigit(val || 0, 6),
  },
  {
    title: (
      <div className="text-center">
        <b>UOM</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "uom_no",
    render: (val) => val || "-",
  },
];

const mockRM = [
  {
    id: 1,
    item_no: "C102SRLA000100",
    item_name: "RM-MOCKUP-0001",
    qty: 76.1234,
    uom_no: "kg",
  },
  {
    id: 2,
    item_no: "C102SRLA000200",
    item_name: "RM-MOCKUP-0002",
    qty: 16.2,
    uom_no: "kg",
  },
  {
    id: 3,
    item_no: "C102SRLA000300",
    item_name: "RM-MOCKUP-0003",
    qty: 9.827,
    uom_no: "kg",
  },
  {
    id: 4,
    item_no: "C102SRLA000400",
    item_name: "RM-MOCKUP-0004",
    qty: 1.235,
    uom_no: "kg",
  },
  {
    id: 5,
    item_no: "C102SRLA000500",
    item_name: "RM-MOCKUP-0005",
    qty: 0.05,
    uom_no: "kg",
  },
];

const mockPK = [
  {
    id: 1,
    item_no: "C204SRLA000100",
    item_name: "PK-MOCKUP-0001",
    qty: 100,
    uom_no: "pcs",
  },
  {
    id: 2,
    item_no: "C204SRLA000200",
    item_name: "PK-MOCKUP-0002",
    qty: 100,
    uom_no: "pcs",
  },
  {
    id: 3,
    item_no: "C204SRLA000300",
    item_name: "PK-MOCKUP-0003",
    qty: 80,
    uom_no: "pcs",
  },
  {
    id: 4,
    item_no: "C204SRLA000400",
    item_name: "PK-MOCKUP-0004",
    qty: 50,
    uom_no: "pcs",
  },
  {
    id: 5,
    item_no: "C204SRLA000500",
    item_name: "PK-MOCKUP-0005",
    qty: 200,
    uom_no: "pcs",
  },
];
