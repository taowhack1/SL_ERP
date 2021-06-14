/** @format */

import React, { useState } from "react";
import Text from "antd/lib/typography/Text";
import { Modal, Button, Table, Row, Col, Divider, InputNumber } from "antd";
import CustomSelect from "../../../../components/CustomSelect";
const columns = (showModal) => [
  {
    title: "Batch Size.",
    align: "left",
    dataIndex: "batch",
    width: "5%",
    render: (val) => val,
  },
  {
    title: "Date",
    align: "center",
    dataIndex: "date",
    width: "10%",
  },
  {
    title: "Sale",
    align: "left",
    dataIndex: "sale",
    width: "15%",
  },
  {
    title: (
      <div className='text-center'>
        <Text>Action</Text>
      </div>
    ),
    align: "left",
    dataIndex: "npr_product_name",
    align: "center",
    width: "10%",
    ellipsis: true,
    render: (val) => {
      return (
        <>
          <Button className='primary' onClick={() => console.log("Print")}>
            Print
          </Button>
          <Button className='primary' onClick={showModal}>
            Edit
          </Button>
        </>
      );
    },
  },
];
const dataSource = [
  {
    batch: "100",
    date: "10/06/2021",
    sale: "phaichayon boonyong",
  },
  {
    batch: "200",
    date: "10/06/2021",
    sale: "phaichayon boonyong",
  },
];
const select = [
  {
    label: "100",
    value: "100",
  },
  {
    label: "200",
    value: "200",
  },
];
const EstimateFormTabHistory = () => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  return (
    <>
      <Button className='primary' onClick={showModal}>
        Add
      </Button>

      <Table
        className='mt-1'
        size={"small"}
        rowKey={"id"}
        columns={columns(showModal)}
        dataSource={dataSource}
        bordered
        pagination={{
          pageSize: 15,
          pageSizeOptions: ["10", "15", "20", "25", "30", "50"],
        }}
        // onRow={(record) => ({
        //   onClick: (e) => {
        //     viewRecord(record);
        //     keepLog.keep_log_action("View NPR : ", record.npr_no);
        //   },
        // })}
      />
      <Modal
        title='Edit Estimate '
        visible={visible}
        onOk={handleOk}
        width={1000}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}>
        <Row>
          <Col span={3}>Batch Size</Col>
          <Col span={6}>
            <CustomSelect
              placeholder='Select batch size'
              data={select}
              allowClear
              field_id='label'
              field_name='value'></CustomSelect>
          </Col>
        </Row>
        <Divider />
        <div className='form-section'>
          <Text strong>ราคาวัตถุดิบ Raw Material</Text>
          <Row gutter={[8, 8]}>
            <Col span={3}>ราคาต้นทุน</Col>
            <Col span={3}>+</Col>
            <Col span={3}>เผื่อเสีย</Col>
            <Col span={3}>+</Col>
            <Col span={3}>mark up</Col>
            <Col span={3}>=</Col>
            <Col span={3}>Total</Col>
            <Col span={3}></Col>

            <Col span={3}>
              <InputNumber min={0} />
              {/*ราคาต้นทุน  */}
            </Col>
            <Col span={3}></Col>
            <Col span={3}>
              <InputNumber
                defaultValue={3}
                min={0}
                max={100}
                formatter={(value) => `${value}%`}
                parser={(value) => value.replace("%", "")}
              />
              {/*เผื่อเสีย  */}
            </Col>
            <Col span={3}></Col>
            <Col span={3}>
              <InputNumber
                defaultValue={10}
                min={0}
                max={100}
                formatter={(value) => `${value}%`}
                parser={(value) => value.replace("%", "")}
              />
              {/*mark up  */}
            </Col>
            <Col span={3}></Col>
            <Col span={3}>
              <InputNumber disabled={true} />
              {/*total  */}
            </Col>
            <Col span={3}></Col>
          </Row>
          <Divider />
          <Text strong>ราคาวัตถุดิบ packinging</Text>
          <Row gutter={[8, 8]}>
            <Col span={3}>ราคาต้นทุน</Col>
            <Col span={3}>+</Col>
            <Col span={3}>เผื่อเสีย</Col>
            <Col span={3}>+</Col>
            <Col span={3}>mark up</Col>
            <Col span={3}>=</Col>
            <Col span={3}>Total</Col>
            <Col span={3}></Col>

            <Col span={3}>
              <InputNumber min={0} />
              {/*ราคาต้นทุน  */}
            </Col>
            <Col span={3}></Col>
            <Col span={3}>
              <InputNumber
                defaultValue={3}
                min={0}
                max={100}
                formatter={(value) => `${value}%`}
                parser={(value) => value.replace("%", "")}
              />
              {/*เผื่อเสีย  */}
            </Col>
            <Col span={3}></Col>
            <Col span={3}>
              <InputNumber
                defaultValue={10}
                min={0}
                max={100}
                formatter={(value) => `${value}%`}
                parser={(value) => value.replace("%", "")}
              />
              {/*mark up  */}
            </Col>
            <Col span={3}></Col>
            <Col span={3}>
              <InputNumber disabled={true} />
              {/*total  */}
            </Col>
            <Col span={3}></Col>
          </Row>
          <Divider />
          <Text strong>ราคาวัตถุดิบ </Text>
          <Row gutter={[8, 8]}>
            <Col span={3}>ราคาต้นทุน</Col>
            <Col span={3}>+</Col>
            <Col span={3}>เผื่อเสีย</Col>
            <Col span={3}>+</Col>
            <Col span={3}>mark up</Col>
            <Col span={3}>=</Col>
            <Col span={3}>Total</Col>
            <Col span={3}></Col>

            <Col span={3}>
              <InputNumber min={0} />
              {/*ราคาต้นทุน  */}
            </Col>
            <Col span={3}></Col>
            <Col span={3}>
              <InputNumber
                defaultValue={3}
                min={0}
                max={100}
                formatter={(value) => `${value}%`}
                parser={(value) => value.replace("%", "")}
              />
              {/*เผื่อเสีย  */}
            </Col>
            <Col span={3}></Col>
            <Col span={3}>
              <InputNumber
                defaultValue={10}
                min={0}
                max={100}
                formatter={(value) => `${value}%`}
                parser={(value) => value.replace("%", "")}
              />
              {/*mark up  */}
            </Col>
            <Col span={3}></Col>
            <Col span={3}>
              <InputNumber disabled={true} />
              {/*total  */}
            </Col>
            <Col span={3}></Col>
          </Row>
          <Divider />
          <Row gutter={[8, 8]}>
            <Col span={3}></Col>
            <Col span={3}></Col>
            <Col span={3}></Col>
            <Col span={3}></Col>
            <Col span={3}></Col>
            <Col span={3}></Col>
            <Col span={3}></Col>
            <Col span={3}></Col>

            <Col span={3}></Col>
            <Col span={3}></Col>
            <Col span={3}></Col>
            <Col span={3}></Col>
            <Col span={3}></Col>
            <Col span={3} style={{ textAlign: "right" }}>
              <Text strong>Total </Text>
            </Col>
            <Col span={3}>
              <InputNumber disabled={true} />
              {/*total  */}
            </Col>
            <Col span={3}></Col>
          </Row>
        </div>
      </Modal>
    </>
  );
};

export default EstimateFormTabHistory;
