import { Col, Row } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import CustomLabel from "../../../../components/CustomLabel";

const SatisficationFormHead = () => {
  const { control, errors, register, getValues } = useFormContext();
  return (
    <>
      <div className="mb-2">
        <Row className="col-2 row-margin-vertical">
          <Col span={12}>
            <div className="form-section">
              <Row className="col-2 row-margin-vertical">
                <Col span={24}>
                  <Text strong>Category : </Text>
                </Col>
                <Col span={24}>
                  <div className="pd-left-2">
                    <h2>{getValues("category_name")}</h2>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
          <Col span={12}></Col>
        </Row>
      </div>
    </>
  );
};

export default React.memo(SatisficationFormHead);
