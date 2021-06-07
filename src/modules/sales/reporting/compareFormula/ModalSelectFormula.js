import { Button, Checkbox, Col, Modal, Row, Spin, Table } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useState } from "react";
const columns = ({ checked_id, onChange, keyId, keyNo }) => [
  {
    title: (
      <div className="text-center">
        <Text strong>Check</Text>
      </div>
    ),
    dataIndex: "npr_formula_id",
    align: "center",
    render: (val, record) => (
      <Checkbox
        checked={checked_id === val ? true : false}
        onChange={(e) => {
          e.target.checked
            ? onChange({
                [keyId]: val,
                [keyNo]: record.npr_formula_no,
              })
            : onChange({
                [keyId]: null,
                [keyNo]: null,
              });
        }}
      />
    ),
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
  const { modal, setModal, onClickCompareFormula } = props;
  const { visible, npr_no_1, npr_no_2, npr_formula_1, npr_formula_2 } = modal;
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    npr_formula_id_1: null,
    npr_formula_no_1: null,
    npr_formula_id_2: null,
    npr_formula_no_2: null,
  });
  const onCancel = () => {
    setModal({ ...modal, visible: false });
  };
  const onOk = async () => {
    const {
      npr_formula_id_1,
      npr_formula_no_1,
      npr_formula_id_2,
      npr_formula_no_2,
    } = state;
    setLoading(true);
    const resp = await onClickCompareFormula({
      npr_formula_id_1,
      npr_formula_no_1,
      npr_formula_id_2,
      npr_formula_no_2,
    });
    setLoading(false);
    if (resp.success) {
      setModal({ ...modal, visible: false });
    }
  };
  const onChangeFormula = (data) => setState({ ...state, ...data });

  const disabledCompare = !state.npr_formula_id_1 || !state.npr_formula_id_2;
  return (
    <>
      <Modal
        visible={visible}
        width={800}
        title={"Select formula to compare."}
        footer={[
          <Button loading={loading} onClick={onCancel}>
            Discard
          </Button>,
          <Button
            className={disabledCompare ? "" : "primary"}
            disabled={disabledCompare}
            loading={loading}
            onClick={onOk}
          >
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
                <Text strong>{npr_no_1}</Text>
              </div>
              <Table
                columns={columns({
                  checked_id: state.npr_formula_id_1,
                  onChange: onChangeFormula,
                  keyId: "npr_formula_id_1",
                  keyNo: "npr_formula_no_1",
                })}
                className="mt-3"
                rowClassName="row-table-detail"
                dataSource={npr_formula_1}
                bordered
                pagination={false}
                scroll={450}
              />
            </Col>
            <Col span={12}>
              <div className="full-width text-center">
                <Text strong>{npr_no_2}</Text>
              </div>

              <Table
                columns={columns({
                  checked_id: state.npr_formula_id_2,
                  onChange: onChangeFormula,
                  keyId: "npr_formula_id_2",
                  keyNo: "npr_formula_no_2",
                })}
                className="mt-3"
                rowClassName="row-table-detail"
                dataSource={npr_formula_2}
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
