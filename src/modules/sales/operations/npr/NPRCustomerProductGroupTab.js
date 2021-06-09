import { Checkbox, Col, Row, Tabs } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useContext } from "react";
import { NPRFormContext } from "./NPRViewById";
import CustomLabel from "../../../../components/CustomLabel";
const NPRCustomerProductGroupTab = () => {
  const { state } = useContext(NPRFormContext);
  return (
    <>
      <Row className="col-2">
        <Col span={24}>
          <Row className="col-2 row-margin-vertical">
            <Col span={3}>
              <CustomLabel label={"Customer Group"} />
            </Col>
            <Col span={3} offset={9}>
              <CustomLabel label={"Product Group"} />
            </Col>
          </Row>
          <Row className="col-2 row-margin-vertical">
            <Col span={11} offset={1}>
              <Row className="col-2 row-margin-vertical">
                <Col span={24}>
                  <Checkbox
                    disabled
                    checked={state.npr_customer_group_id === 1 ? true : false}
                  />
                  <Text className="pd-left-2">
                    <b className="pd-right-1">A</b> High potential customer
                  </Text>
                </Col>
              </Row>
              <Row className="col-2 row-margin-vertical">
                <Col span={24}>
                  <Checkbox
                    disabled
                    checked={state.npr_customer_group_id === 2 ? true : false}
                  />
                  <Text className="pd-left-2">
                    <b className="pd-right-1">B</b> Meduim potential customer
                    (Bauty Clinic , New Brand)
                  </Text>
                </Col>
              </Row>
              <Row className="col-2 row-margin-vertical">
                <Col span={24}>
                  <Checkbox
                    disabled
                    checked={state.npr_customer_group_id === 3 ? true : false}
                  />
                  <Text className="pd-left-2">
                    <b className="pd-right-1">C</b> Others customer
                  </Text>
                </Col>
              </Row>
            </Col>
            <Col span={11} offset={1}>
              <Row className="col-2 row-margin-vertical">
                <Col span={24}>
                  <Checkbox
                    disabled
                    checked={state.npr_product_group_id === 1 ? true : false}
                  />
                  <Text className="pd-left-2">
                    <b className="pd-right-1">A</b> New Product development ( 14
                    days )
                  </Text>
                </Col>
              </Row>
              <Row className="col-2 row-margin-vertical">
                <Col span={24}>
                  <Checkbox
                    disabled
                    checked={state.npr_product_group_id === 2 ? true : false}
                  />
                  <Text className="pd-left-2">
                    <b className="pd-right-1">B</b> Library formula modification
                    ( 10 days )
                  </Text>
                </Col>
              </Row>
              <Row className="col-2 row-margin-vertical">
                <Col span={24}>
                  <Checkbox
                    disabled
                    checked={state.npr_product_group_id === 3 ? true : false}
                  />
                  <Text className="pd-left-2">
                    <b className="pd-right-1">C</b> Library formula ( 7 days )
                  </Text>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default NPRCustomerProductGroupTab;
