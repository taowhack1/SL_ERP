/** @format */

import React, { useEffect, useState } from "react";
import Text from "antd/lib/typography/Text";
import { Modal, Button, Table, Row, Col, Divider, InputNumber } from "antd";
import CustomSelect from "../../../../components/CustomSelect";
import { CalculatorOutlined } from "@ant-design/icons";
import {
  convertDigit,
  getNumberFormat,
} from "../../../../include/js/main_config";
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
    id: 1,
    batch: "100",
    date: "10/06/2021",
    sale: "phaichayon boonyong",
  },
  {
    id: 2,
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

  //? x = ( ราคาต้นทุน + ( ราคาต้นทุน * ( เผื่อเสีย / 100 ) ) )
  //? total = x + ( x * ( markup / 100 ) )

  const [total, setTotal] = useState(0);
  const [totalRM, setTotalRM] = useState(0);
  const [totalPK, setTotalPK] = useState(0);
  const [totalCS, setTotalCS] = useState(0);
  const [costRM, setCostRM] = useState(0);
  const [costPK, setCostPK] = useState(0);
  const [costCS, setCostCS] = useState(0);
  const [lostRM, setLostRM] = useState(3);
  const [lostPK, setLostPK] = useState(3);
  const [lostCS, setLostCS] = useState(3);
  const [markupRM, setMarkupRM] = useState(10);
  const [markupPK, setMarkupPK] = useState(10);
  const [markupCS, setMarkupCS] = useState(10);
  const [loading, setLoading] = useState(false);
  const [display, setDisplay] = useState(true);
  const reCal = () => {
    console.log("recal");
    const preTotalRM = costRM + costRM * (lostRM / 100);
    const preTotalPK = costPK + costPK * (lostPK / 100);
    const preTotalCS = costCS + costCS;
    setTotalRM(preTotalRM + preTotalRM * (markupRM / 100));
    setTotalPK(preTotalPK + preTotalPK * (markupPK / 100));
    setTotalCS(preTotalCS + preTotalCS * (markupCS / 100));
    const totalRMValue = preTotalRM + preTotalRM * (markupRM / 100);
    const totalPKValue = preTotalPK + preTotalPK * (markupPK / 100);
    const totalCSValue = preTotalCS + preTotalCS * (markupCS / 100);
    setTotal(totalCSValue + totalPKValue + totalRMValue);
    setLoading(true);
    setTimeout(() => {
      setDisplay(false);
      setLoading(false);
    }, 2000);
  };
  const CalculateOnchange = () => {};
  const CalculateValueBatch = () => {
    const costRMValue = 5000;
    const costPKValue = 4000;
    const costCSValue = 6000;
    const lostRMValue = 5;
    const lostPKValue = 5;
    const markupRMValue = 20;
    const markupPKValue = 20;
    const markupCSValue = 20;
    setCostRM(costRMValue);
    setCostPK(costPKValue);
    setCostCS(costCSValue);
    setLostRM(5);
    setLostPK(5);
    setMarkupRM(20);
    setMarkupPK(20);
    setMarkupCS(20);
    const preTotalRM = costRMValue + costRMValue * (lostRMValue / 100);
    const preTotalPK = costPKValue + costPKValue * (lostPKValue / 100);
    const preTotalCS = costCSValue + costCSValue;
    const totalRMValue = preTotalRM + preTotalRM * (markupRMValue / 100);
    const totalPKValue = preTotalPK + preTotalPK * (markupPKValue / 100);
    const totalCSValue = preTotalCS + preTotalCS * (markupCSValue / 100);
    setTotalRM(preTotalRM + preTotalRM * (markupRMValue / 100));
    setTotalPK(preTotalPK + preTotalPK * (markupPKValue / 100));
    setTotalCS(preTotalCS + preTotalCS * (markupCSValue / 100));
    setTotal(totalCSValue + totalPKValue + totalRMValue);
  };
  const CalculatePackage = () => {};
  const CalculateTotal = () => {};
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
        onCancel={handleCancel}
        width={1000}
        confirmLoading={confirmLoading}
        footer={[
          <Button key='back' onClick={handleCancel} className='mr-5'>
            Discard
          </Button>,
          <Button
            key='submit'
            type={display ? "" : "primary"}
            style={{ width: "10%" }}
            disabled={display}
            onClick={handleOk}
            loading={confirmLoading}>
            Save
          </Button>,
        ]}>
        <Row>
          <Col span={3}>
            <Text strong>Batch Size</Text>
          </Col>
          <Col span={6}>
            <CustomSelect
              placeholder='Select batch size'
              data={select}
              allowClear
              field_id='label'
              field_name='value'
              onChange={(e) => {
                CalculateValueBatch();
              }}></CustomSelect>
          </Col>
        </Row>
        <Divider />
        <div className='form-section'>
          <Text strong>
            <u>ราคาวัตถุดิบ Raw Material </u>
          </Text>
          <Row gutter={[8, 8]} className='mt-1'>
            <Col span={3} style={{ textAlign: "center" }}>
              <Text strong>ราคาต้นทุน</Text>
            </Col>
            <Col span={3}></Col>
            <Col span={3} style={{ textAlign: "center" }}>
              <Text strong>เผื่อเสีย</Text>
            </Col>
            <Col span={3}></Col>
            <Col span={3} style={{ textAlign: "center" }}>
              <Text strong>mark up</Text>
            </Col>
            <Col span={3}></Col>
            <Col span={3}>
              <Text strong>Total</Text>
            </Col>
            <Col span={3}></Col>

            <Col span={3}>
              <InputNumber
                min={0}
                style={{ width: "100%" }}
                {...getNumberFormat(4)}
                onChange={(value) => {
                  setCostRM(value);
                }}
                value={costRM}
              />
              {/*ราคาต้นทุน  */}
            </Col>
            <Col span={3} style={{ textAlign: "center" }}>
              <Text strong>+</Text>
            </Col>
            <Col span={3}>
              <InputNumber
                style={{ width: "100%" }}
                defaultValue={3}
                min={0}
                max={100}
                formatter={(value) => `${value}%`}
                parser={(value) => value.replace("%", "")}
                onChange={(value) => {
                  setLostRM(value);
                }}
                value={lostRM}
              />
              {/*เผื่อเสีย  */}
            </Col>
            <Col span={3} style={{ textAlign: "center" }}>
              <Text strong>+</Text>
            </Col>
            <Col span={3}>
              <InputNumber
                style={{ width: "100%" }}
                defaultValue={10}
                min={0}
                max={100}
                onChange={(value) => {
                  setMarkupRM(value);
                }}
                formatter={(value) => `${value}%`}
                parser={(value) => value.replace("%", "")}
                value={markupRM}
              />
              {/*mark up  */}
            </Col>
            <Col span={3} style={{ textAlign: "center" }}>
              <Text strong>=</Text>
            </Col>
            <Col span={3}>
              <Text>{convertDigit(totalRM, 4) ?? "-"}</Text>
              {/* <InputNumber
                style={{ width: "100%" }}
                disabled={true}
                value={totalRM}
              /> */}
              {/*total  */}
            </Col>
            <Col span={3}></Col>
          </Row>
          <Divider />
          <Text strong>
            <u>ราคาวัตถุดิบ packaging</u>
          </Text>
          <Row gutter={[8, 8]} className='mt-1'>
            <Col span={3} style={{ textAlign: "center" }}>
              <Text strong>ราคาต้นทุน</Text>
            </Col>
            <Col span={3}></Col>
            <Col span={3} style={{ textAlign: "center" }}>
              <Text strong>เผื่อเสีย</Text>
            </Col>
            <Col span={3}></Col>
            <Col span={3} style={{ textAlign: "center" }}>
              <Text strong>mark up</Text>
            </Col>
            <Col span={3}></Col>
            <Col span={3}>
              <Text strong>Total</Text>
            </Col>
            <Col span={3}></Col>

            <Col span={3}>
              <InputNumber
                style={{ width: "100%" }}
                min={0}
                value={costPK}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                onChange={(value) => {
                  setCostPK(value);
                }}
              />
              {/*ราคาต้นทุน  */}
            </Col>
            <Col span={3} style={{ textAlign: "center" }}>
              <Text strong>+</Text>
            </Col>
            <Col span={3}>
              <InputNumber
                style={{ width: "100%" }}
                defaultValue={3}
                min={0}
                max={100}
                formatter={(value) => `${value}%`}
                parser={(value) => value.replace("%", "")}
                onChange={(value) => {
                  setLostPK(value);
                }}
                value={lostPK}
              />
              {/*เผื่อเสีย  */}
            </Col>
            <Col span={3} style={{ textAlign: "center" }}>
              <Text strong>+</Text>
            </Col>
            <Col span={3}>
              <InputNumber
                style={{ width: "100%" }}
                defaultValue={10}
                min={0}
                max={100}
                formatter={(value) => `${value}%`}
                parser={(value) => value.replace("%", "")}
                onChange={(value) => {
                  setMarkupPK(value);
                }}
                value={markupPK}
              />
              {/*mark up  */}
            </Col>
            <Col span={3} style={{ textAlign: "center" }}>
              <Text strong>=</Text>
            </Col>
            <Col span={3}>
              <Text>{convertDigit(totalPK, 4) ?? "-"}</Text>
              {/* <InputNumber
                style={{ width: "100%" }}
                disabled={true}
                value={totalPK}
              /> */}
              {/*total  */}
            </Col>
            <Col span={3}></Col>
          </Row>
          <Divider />
          <Text strong>
            <u>ราคาต้นทุนการผลิต</u>
          </Text>
          <Row gutter={[8, 8]} className='mt-1'>
            <Col span={3} style={{ textAlign: "center" }}>
              <Text strong>ราคาต้นทุน</Text>
            </Col>
            <Col span={3}></Col>
            <Col span={3} style={{ textAlign: "center" }}>
              <Text strong></Text>
            </Col>
            <Col span={3}></Col>
            <Col span={3} style={{ textAlign: "center" }}>
              <Text strong>mark up</Text>
            </Col>
            <Col span={3}></Col>
            <Col span={3}>
              <Text strong>Total</Text>
            </Col>
            <Col span={3}></Col>

            <Col span={3}>
              <InputNumber
                style={{ width: "100%" }}
                min={0}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                onChange={(value) => {
                  setCostCS(value);
                }}
                value={costCS}
              />

              {/*ราคาต้นทุน  */}
            </Col>
            <Col span={3} style={{ textAlign: "center" }}>
              <Text strong></Text>
            </Col>
            <Col span={3} style={{ textAlign: "center" }}>
              <Text strong>+</Text>
              {/* <InputNumber
                style={{ width: "100%" }}
                defaultValue={3}
                min={0}
                max={100}
                formatter={(value) => `${value}%`}
                parser={(value) => value.replace("%", "")}
              /> */}
              {/*เผื่อเสีย  */}
            </Col>
            <Col span={3} style={{ textAlign: "center" }}>
              <Text strong></Text>
            </Col>
            <Col span={3}>
              <InputNumber
                style={{ width: "100%" }}
                defaultValue={10}
                min={0}
                max={100}
                formatter={(value) => `${value}%`}
                parser={(value) => value.replace("%", "")}
                onChange={(value) => {
                  setMarkupCS(value);
                }}
                value={markupCS}
              />
              {/*mark up  */}
            </Col>
            <Col span={3} style={{ textAlign: "center" }}>
              <Text strong>=</Text>
            </Col>
            <Col span={3}>
              <Text>{convertDigit(totalCS, 4) ?? "-"}</Text>
              {/* <InputNumber
                style={{ width: "100%" }}
                disabled={true}
                value={totalCS}
              /> */}
              {/*total  */}
            </Col>
            <Col span={3}></Col>
          </Row>
          <Divider />
          <Row gutter={[8, 8]}>
            <Col span={12}></Col>
            <Col span={3} style={{ width: "100%" }}>
              <Button
                block
                icon={<CalculatorOutlined className='button-icon' />}
                onClick={() => reCal()}
                loading={loading}>
                Calculate
              </Button>
            </Col>
            <Col span={3} style={{ textAlign: "center" }}>
              <Text strong>Total </Text>
            </Col>
            <Col span={3}>
              <Text>{convertDigit(total, 4) ?? "-"}</Text>
              {/* <InputNumber
                style={{ width: "100%" }}
                disabled={true}
                value={total}
              /> */}
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
