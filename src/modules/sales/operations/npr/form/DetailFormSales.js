import { Col, Row, Divider } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useContext } from "react";
import { NPRFormContext } from "./NPRRDForm";

const DetailFormSales = () => {
  const { data, loading, npr_id } = useContext(NPRFormContext);
  const {
    npr_product_no_name,
    npr_no,
    npr_customer_no_name,
    npr_created_by_no_name,
    npr_request_date,
    npr_company_name,
    npr_formula_no,
  } = data || {};
  return (
    <>
      <Row className="col-2 mt-1 mb-1" gutter={16} style={{ padding: 20 }}>
        <Col span={14}>
          <Row className="col-2 mt-1 mb-1" gutter={8}>
            <Col span={6}>
              <Text strong>NPR No. :</Text>
            </Col>
            <Col span={18}>
              <Text>{`${npr_no || "-"}`}</Text>
            </Col>
          </Row>
          <Row className="col-2 mt-1 mb-1" gutter={8}>
            <Col span={6}>
              <Text strong>Product :</Text>
            </Col>
            <Col span={18}>
              <Text>{`${npr_product_no_name || "-"}`}</Text>
            </Col>
          </Row>
          <Row className="col-2 mt-1 mb-1" gutter={8}>
            <Col span={6}>
              <Text strong>Confirm Formula No. :</Text>
            </Col>
            <Col span={18}>
              <Text>{`${npr_formula_no || "-"}`}</Text>
            </Col>
          </Row>
          <Divider className="divider-sm" />
          <Row className="col-2 mt-1 mb-1">
            <Col span={6}>
              <Text strong>Sales Person :</Text>
            </Col>
            <Col span={18}>{`${npr_created_by_no_name || "-"}`}</Col>
          </Row>
          <Row className="col-2 mt-1 mb-1">
            <Col span={6}>
              <Text strong>Example Request Date :</Text>
            </Col>
            <Col span={18}>{`${npr_request_date || "-"}`}</Col>
          </Row>
        </Col>
        <Col span={10}>
          <Row className="col-2 mt-1 mb-1" gutter={8}>
            <Col span={8}>
              <Text strong>Customer :</Text>
            </Col>
            <Col span={16}>
              <Text>{`${npr_customer_no_name || "-"}`}</Text>
            </Col>
          </Row>
          <Row className="col-2 mt-1 mb-1" gutter={8}>
            <Col span={8}>
              <Text strong>Company Name :</Text>
            </Col>
            <Col span={16}>
              <Text>{`${npr_company_name || "-"}`}</Text>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default React.memo(DetailFormSales);
