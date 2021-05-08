import { Checkbox, Col, Row } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useContext } from "react";
import CustomLabel from "../../../../components/CustomLabel";
import { NPRFormContext } from "./RDForm";
const NPRGeneralDetailTab = () => {
  const { state } = useContext(NPRFormContext);
  return (
    <>
      <div style={{ padding: "0px 10px" }}>
        <Row className="col-2">
          <Col span={12}>
            <Row className="col-2 row-margin-vertical">
              <Col span={8}>
                <CustomLabel label="Declare weight :" />
              </Col>
              <Col span={16}>
                <Text>{state.npr_declare_weight || "-"}</Text>
              </Col>
            </Row>

            <Row className="col-2 row-margin-vertical">
              <Col span={8}>
                <CustomLabel label="Sell to :" />
              </Col>
              <Col span={16}>
                <Checkbox
                  checked={state.npr_sale_id === 2 ? true : false}
                  disabled
                />
                <CustomLabel label={"Export"} />
                <Checkbox
                  className="ml-4"
                  checked={state.npr_sale_id === 1 ? true : false}
                  disabled
                />
                <CustomLabel label={"Local"} />
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row className="col-2 row-margin-vertical">
              <Col span={10}>
                <CustomLabel label="Production Line :" />
              </Col>
              <Col span={14}>
                <Text>{state.npr_production_line || "-"}</Text>
              </Col>
            </Row>
          </Col>
        </Row>
        <div style={{ borderTop: "1px solid #E4E4E4", marginTop: 10 }}>
          <Row className="col-2">
            <Col span={12}>
              <Row className="col-2 row-margin-vertical">
                <Col span={8}>
                  <CustomLabel label="Extended Request :" />
                </Col>
                <Col span={16}>
                  <Row className="col-2 row-margin-vertical">
                    <Col span={24}>
                      <Checkbox
                        checked={state.npr_type_id === 1 ? true : false}
                        disabled
                      />
                      <CustomLabel label={"Sample Request"} />
                      <Checkbox
                        className="ml-2"
                        checked={state.npr_type_id === 2 ? true : false}
                        disabled
                      />
                      <CustomLabel label={"Revision"} />
                    </Col>
                  </Row>
                  <Row className="col-2 row-margin-vertical">
                    <Col span={24}>
                      <Checkbox checked={state.npr_request_cost} disabled />
                      <CustomLabel label={"Cost Request"} />
                    </Col>
                  </Row>
                  <Row className="col-2 row-margin-vertical">
                    <Col span={24}>
                      <Checkbox checked={state.npr_request_other} disabled />
                      <CustomLabel label={"Other :"} />
                      <div className="text-value">
                        <Text>{state.npr_request_other_remark || "-"}</Text>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row className="col-2 row-margin-vertical">
                <Col span={10}>
                  <CustomLabel label="Sample Request Q'ty :" />
                </Col>
                <Col span={14} className="text-left">
                  <Text>{state.npr_sample_request_qty || "-"}</Text>
                  <CustomLabel label="pcs." className="ml-3" />
                </Col>
              </Row>
              <Row className="col-2 row-margin-vertical">
                <Col span={10}>
                  <CustomLabel label="Launch Timing :" />
                </Col>
                <Col span={12}>
                  <Text>{state.npr_plan_launch || "-"}</Text>
                </Col>
              </Row>
              <Row className="col-2 row-margin-vertical">
                <Col span={10}>
                  <CustomLabel label="Volume / Order :" />
                </Col>
                <Col span={14} className="text-left">
                  <Text>{state.npr_volume_order || "-"}</Text>
                  <CustomLabel label="pcs." className="ml-3" />
                </Col>
              </Row>
              <Row className="col-2 row-margin-vertical">
                <Col span={10}>
                  <CustomLabel label="Export to (specify country) :" />
                </Col>
                <Col span={12}>
                  <Text>{state.npr_export || "-"}</Text>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default NPRGeneralDetailTab;
