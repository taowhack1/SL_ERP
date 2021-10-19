import { Checkbox, Col, Row, Table } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useContext } from "react";
import { NPRFormContext } from "../NPRRDForm";
import CustomLabel from "../../../../../../components/CustomLabel";
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
const DetailOfSampleRequest = () => {
  const { data } = useContext(NPRFormContext);
  const {
    npr_target_price,
    npr_texture_appearance,
    npr_production_benchmark,
    npr_production_claim,
    npr_formula_level,
    npr_special_requirement,
    npr_formulation_id,
    npr_packaging_id,
    npr_remark,
    npr_color,
    npr_odor,
  } = data || {};

  const formulation = [
    {
      subject_left: "TARGET PRICE",
      subject_right: "TAXURE APPERANCE",
      val_left: npr_target_price || "-",
      val_right: npr_texture_appearance || "-",
    },
    {
      subject_left: "PRODUCT BENCHMARK",
      subject_right: "COLOR",
      val_left: npr_production_benchmark || "-",
      val_right: npr_color || "-",
    },
    {
      subject_left: "PRODUCT CLAIM",
      subject_right: "ODOR",
      val_left: npr_production_claim || "-",
      val_right: npr_odor || "-",
    },
    {
      subject_left: "FORMULA LEVEL",
      subject_right: "SPECIAL REQUIREMENT",
      val_left: npr_formula_level || "-",
      val_right: npr_special_requirement || "-",
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
                checked={npr_formulation_id === 1 ? true : false}
              />
              <Text className="ml-2">SL</Text>
            </Col>
            <Col span={3}>
              <Checkbox
                disabled
                checked={npr_formulation_id === 2 ? true : false}
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
            <Col span={4}>
              <CustomLabel label="Packaging :" />
            </Col>
            <Col span={6}>
              <Checkbox
                disabled
                checked={npr_packaging_id === 1 ? true : false}
              />
              <Text className="ml-2">Standard for testing</Text>
            </Col>
            <Col span={10}>
              <Checkbox
                disabled
                checked={npr_packaging_id === 2 ? true : false}
              />
              <Text className="ml-2">
                Require actual packaging for testing, specify
              </Text>
            </Col>
          </Row>
          <Row className="col-2 row-margin-vertical">
            <Col span={24}>
              <CustomLabel label="Remark :" />
            </Col>
            <Col span={24}>
              <Text className="ml-4">{npr_remark || "-"}</Text>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default React.memo(DetailOfSampleRequest);
