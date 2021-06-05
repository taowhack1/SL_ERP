import { Button, Checkbox, Col, Input, Modal, Row, Spin, Table } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useState } from "react";
const columns = [
  {
    title: <Input data={[]} placeholder={"Search Formula"} />,
    className: "tb-col-sm",
    children: [
      {
        title: (
          <div className="text-center">
            <Text strong>Check</Text>
          </div>
        ),
        dataIndex: "npr_formula_id",
        align: "center",
        render: (val, record) => <Checkbox />,
        className: "tb-col-sm",
        width: "15%",
      },
      {
        title: (
          <div className="text-center">
            <Text strong>Formula No.</Text>
          </div>
        ),
        dataIndex: "npr_formula_no",
        align: "left",
        render: (val, record) => <Text className="pd-left-3">{val}</Text>,
        className: "tb-col-sm",
        width: "85%",
      },
    ],
  },
];
const mockupData1 = [
  {
    id: 0,
    npr_formula_id: 1,
    npr_formula_no: "KCC-AP-01A / NPRm001-2021-001",
  },
  {
    id: 1,
    npr_formula_id: 2,
    npr_formula_no: "KCC-AP-01B / NPRm001-2021-002",
  },
  {
    id: 2,
    npr_formula_id: 3,
    npr_formula_no: "KCC-AP-01C / NPRm001-2021-003",
  },
  {
    id: 4,
    npr_formula_id: 4,
    npr_formula_no: "KCC-AP-01D / NPRm001-2021-004",
  },
];
const mockupData2 = [
  {
    id: 0,
    npr_formula_id: 1,
    npr_formula_no: "KCC-BB-01A / NPRm005-2021-001",
  },
  {
    id: 1,
    npr_formula_id: 2,
    npr_formula_no: "KCC-BB-01B / NPRm005-2021-002",
  },
];
const ModalSelectFormula = (props) => {
  console.log("props", props);
  const { modal, setModal } = props;
  const [loading, setLoading] = useState(false);
  const onCancel = () => {
    console.log("Discard");
    setModal({ ...modal, visible: false });
  };
  const onOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setModal({ ...modal, visible: false });
      console.log("Compare");
    }, 1800);
  };
  return (
    <>
      <Modal
        visible={modal.visible}
        width={800}
        title={"Select formula to compare."}
        destroyOnClose
        footer={[
          <Button loading={loading} onClick={onCancel}>
            Discard
          </Button>,
          <Button className="primary" loading={loading} onClick={onOk}>
            Compare
          </Button>,
        ]}
        onCancel={onCancel}
        onOk={onOk}
        confirmLoading={loading}
      >
        <Spin spinning={loading}>
          <Row className="col-2 mt-1" gutter={16}>
            <Col span={12}>
              <div className="full-width text-center">
                <Text strong>NPRm001-2021</Text>
              </div>
              <Table
                columns={columns}
                className="mt-3"
                rowClassName="row-table-detail"
                dataSource={mockupData1}
                bordered
                pagination={false}
                scroll={450}
              />
            </Col>
            <Col span={12}>
              <div className="full-width text-center">
                <Text strong>NPRm005-2021</Text>
              </div>

              <Table
                columns={columns}
                className="mt-3"
                rowClassName="row-table-detail"
                dataSource={mockupData2}
                bordered
                pagination={false}
                scroll={450}
              />
            </Col>
          </Row>
        </Spin>
      </Modal>
    </>
  );
};

export default React.memo(ModalSelectFormula);
