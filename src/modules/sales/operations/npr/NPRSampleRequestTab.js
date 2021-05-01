import { Checkbox, Col, Row, Table } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import CustomLabel from "../../../../components/CustomLabel";
const columns = [
  {
    title: "",
    dataIndex: "subject_left",
    align: "left",
    render: (val) => <Text strong>{val}</Text>,
    width: "20%",
  },
  {
    title: "",
    dataIndex: "val_left",
    align: "left",
    width: "30%",
  },
  {
    title: "",
    dataIndex: "subject_right",
    align: "left",
    render: (val) => <Text strong>{val}</Text>,
    width: "20%",
  },
  {
    title: "",
    dataIndex: "val_right",
    align: "left",
    width: "30%",
  },
];
const NPRSampleRequestTab = ({ state }) => {
  const formulation = [
    {
      subject_left: "TARGET PRICE",
      subject_right: "TAXURE APPERANCE",
      val_left: state.npr_target_price,
      val_right: state.npr_texture_apperance,
    },
    {
      subject_left: "PRODUCT BENCHMARK",
      subject_right: "COLOR",
      val_left: state.npr_production_benchmark,
      val_right: state.npr_color,
    },
    {
      subject_left: "PRODUCT CLAIM",
      subject_right: "ODOR",
      val_left: state.npr_production_claim,
      val_right: state.npr_odor,
    },
    {
      subject_left: "FORMULA LEVEL",
      subject_right: "SPECIAL REQUIREMENT",
      val_left: state.npr_formula_level,
      val_right: state.npr_special_requirement,
    },
  ];
  return (
    <>
      <div className="form-section pd-left-2 pd-right-2 mb-3">
        <div className="form-section-detail">
          <Row className="col-2 row-margin-vertical">
            <Col span={4}>
              <CustomLabel label="FORMULATION :" />
            </Col>
            <Col span={3}>
              <Checkbox
                disabled
                checked={state.npr_formulation_id === 1 ? true : false}
              />
              <Text className="ml-2">SL</Text>
            </Col>
            <Col span={3}>
              <Checkbox
                disabled
                checked={state.npr_formulation_id === 2 ? true : false}
              />
              <Text className="ml-2">Customer</Text>
            </Col>
          </Row>
          <Table
            columns={columns}
            dataSource={formulation}
            showHeader={false}
            pagination={false}
            size={"small"}
            rowKey={"subject_left"}
            className="full-width mt-2 mb-2"
            bordered
          />

          <Row className="col-2 row-margin-vertical">
            <Col span={24}>
              <CustomLabel label="Remark :" />
            </Col>
            <Col span={24}>
              <Text className="ml-4">{state.npr_remark || "-"}</Text>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default NPRSampleRequestTab;
