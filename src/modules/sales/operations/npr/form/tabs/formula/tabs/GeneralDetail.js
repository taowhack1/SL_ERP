import { Col, Row } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useContext } from "react";
import CustomLabel from "../../../../../../../../components/CustomLabel";
import { NPRFormContext } from "../../../NPRRDForm";

const GeneralDetail = () => {
  const { readOnly } = useContext(NPRFormContext);
  return (
    <>
      <Row className="col-2 mt-1 mb-1" gutter={16}>
        <Col span={12} className="col-border-right">
          <Row className="col-2 mt-1 mb-1" gutter={8}>
            <Col span={8}>
              <CustomLabel readOnly={readOnly} label={`Result :`} />
            </Col>
            <Col span={16}>
              <Text>{`####`}</Text>
            </Col>
          </Row>
          <Row className="col-2 mt-1 mb-1" gutter={8}>
            <Col span={8}>
              <CustomLabel
                require
                readOnly={readOnly}
                label={`Product Code :`}
              />
            </Col>
            <Col span={16}>
              <Text>{`####`}</Text>
            </Col>
          </Row>
          <Row className="col-2 mt-1 mb-1" gutter={8}>
            <Col span={8}>
              <CustomLabel
                require
                readOnly={readOnly}
                label={`Product Name :`}
              />
            </Col>
            <Col span={16}>
              <Text>{`####`}</Text>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row className="col-2 mt-1 mb-1" gutter={8}>
            <Col span={8}>
              <CustomLabel
                require
                readOnly={readOnly}
                label={`Sample Request Qty :`}
              />
            </Col>
            <Col span={16}>
              <Text>{`####`}</Text>
            </Col>
          </Row>
          <Row className="col-2 mt-1 mb-1" gutter={8}>
            <Col span={8}>
              <CustomLabel require readOnly={readOnly} label={`Batch Size :`} />
            </Col>
            <Col span={16}>
              <Text>{`####`}</Text>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <CustomLabel readOnly={readOnly} label="Product Description :" />
        </Col>
        <Col span={24}>
          <div className="pd-left-3">
            <Text>{`#############`}</Text>
          </div>
        </Col>
        <Col span={24}>
          <CustomLabel readOnly={readOnly} label="Product Used :" />
        </Col>
        <Col span={24}>
          <div className="pd-left-3">
            <Text>{`#############`}</Text>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default React.memo(GeneralDetail);
