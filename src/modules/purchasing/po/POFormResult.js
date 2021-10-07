import { Col, Row } from "antd";
import CustomLabel from "../../../components/CustomLabel";
import React from "react";
import Text from "antd/lib/typography/Text";
import TableResultPO from "./TableResultPO";
import { useFormContext } from "react-hook-form";
const POFormResult = () => {
  const { getPO } = useFormContext();
  return (
    <>
      <Row gutter={32}>
        <Col span={12}>
          <Row>
            <Col span={8}>
              <CustomLabel label="Description :" require readOnly={false} />
            </Col>
            <Col span={16}>
              <Text>{`Description.........`}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <CustomLabel label="Vat :" require readOnly={false} />
            </Col>
            <Col span={16}>
              <Text>{`7 %`}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <CustomLabel label="Currency :" require readOnly={false} />
            </Col>
            <Col span={16}>
              <Text>{`THB`}</Text>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row>
            <Col span={8}>
              <CustomLabel label="Vendor :" require readOnly={false} />
            </Col>
            <Col span={16}>
              <Text>{`Mock - Vendor`}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <CustomLabel label="Payment Terms :" require readOnly={false} />
            </Col>
            <Col span={16}>
              <Text>{`100%`}</Text>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col span={24}>
          <TableResultPO />
        </Col>
      </Row>
    </>
  );
};

export default React.memo(POFormResult);
