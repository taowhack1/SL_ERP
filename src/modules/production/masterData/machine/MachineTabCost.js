import { Col, InputNumber, Row } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import CustomLabel from "../../../../components/CustomLabel";
import {
  convertDigit,
  getNumberFormat,
} from "../../../../include/js/main_config";

const MachineTabCost = ({ upDateFormValue, readOnly, data_head }) => {
  return (
    <>
      <div>
        <Row>
          <Col span={12} className="col-border-right">
            <Row className="col-2 row-margin-vertical">
              <Col span={7}>
                <CustomLabel label={"Work Area & Tools"} readOnly={readOnly} />
              </Col>
              <Col span={12} className="text-right">
                {readOnly ? (
                  <Text className="text-value">
                    {convertDigit(data_head.machine_cost_floor, 2)}
                  </Text>
                ) : (
                  <InputNumber
                    className="full-width"
                    min={0}
                    {...getNumberFormat(2)}
                    onChange={(val) =>
                      upDateFormValue({
                        machine_cost_floor: val,
                      })
                    }
                    placeholder={"eg. 1xx.x"}
                    value={data_head.machine_cost_floor}
                  />
                )}
              </Col>
              <Col span={3} offset={1}>
                <Text className="text-value" strong>
                  {"THB / hr."}
                </Text>
              </Col>
            </Row>
            <Row className="col-2 row-margin-vertical">
              <Col span={7}>
                <CustomLabel label={"DL"} readOnly={readOnly} />
              </Col>
              <Col span={12} className="text-right">
                {readOnly ? (
                  <Text className="text-value">
                    {convertDigit(data_head.machine_cost_dl, 2)}
                  </Text>
                ) : (
                  <InputNumber
                    className="full-width"
                    min={0}
                    {...getNumberFormat(2)}
                    onChange={(val) =>
                      upDateFormValue({
                        machine_cost_dl: val,
                      })
                    }
                    placeholder={"eg. 1xx.x"}
                    value={data_head.machine_cost_dl}
                  />
                )}
              </Col>
              <Col span={3} offset={1}>
                <Text className="text-value" strong>
                  {"THB / hr."}
                </Text>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row className="col-2 row-margin-vertical">
              <Col span={6} offset={1}>
                <CustomLabel label={"Power"} readOnly={readOnly} />
              </Col>
              <Col span={12} className="text-right">
                {readOnly ? (
                  <Text className="text-value">
                    {convertDigit(data_head.machine_cost_el, 2)}
                  </Text>
                ) : (
                  <InputNumber
                    className="full-width"
                    min={0}
                    {...getNumberFormat(2)}
                    onChange={(val) =>
                      upDateFormValue({
                        machine_cost_el: val,
                      })
                    }
                    placeholder={"eg. 1xx.x"}
                    value={data_head.machine_cost_el}
                  />
                )}
              </Col>
              <Col span={3} offset={1}>
                <Text className="text-value" strong>
                  {"THB / hr."}
                </Text>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default MachineTabCost;
