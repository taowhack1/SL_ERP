import { Checkbox, Col, Row, Divider } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useContext } from "react";
import { NPRFormContext } from "../NPRRDForm";
import CustomLabel from "../../../../../../components/CustomLabel";
import { convertDigit } from "../../../../../../include/js/main_config";

const GeneralDetail = () => {
  const { data, loading, npr_id } = useContext(NPRFormContext);
  const {
    npr_sample_request_qty,
    npr_plan_launch,
    npr_volume_order_first_time,
    npr_export,
    npr_sale_id,
    npr_production_line,
    npr_type_id,
    npr_request_cost,
    npr_request_other,
    npr_request_other_remark,
    npr_declare_weight,
  } = data || {};
  return (
    <div style={{ padding: "0px 20px" }}>
      <Row className="col-2 mt-1" gutter={16}>
        <Col span={14}>
          <Row className="col-2 mt-1 mb-1" gutter={8}>
            <Col span={6}>
              <Text strong>Declare Weight :</Text>
            </Col>
            <Col span={18}>
              <Text>{`${convertDigit(npr_declare_weight, 4) || "-"}`}</Text>
            </Col>
          </Row>
          <Row className="col-2 mt-1 mb-1" gutter={8}>
            <Col span={6}>
              <Text strong>Sell To :</Text>
            </Col>
            <Col span={18}>
              <Text>{`${npr_sale_id === 1 ? "Local" : "Export" || "-"}`}</Text>
            </Col>
          </Row>
        </Col>
        <Col span={10}>
          <Row className="col-2 mt-1 mb-1" gutter={8}>
            <Col span={8}>
              <Text strong>Production Line :</Text>
            </Col>
            <Col span={16}>
              <Text>{`${npr_production_line || "-"}`}</Text>
            </Col>
          </Row>
        </Col>
      </Row>
      <Divider className="divider-sm" />
      <Row className="col-2 mb-1" gutter={16}>
        <Col span={14}>
          <Row className="col-2 mt-1 mb-1" gutter={8}>
            <Col span={6}>
              <Text strong>Extended Request :</Text>
            </Col>
            <Col span={18}>
              <Row className="col-2 row-margin-vertical">
                <Col span={24}>
                  <Checkbox
                    checked={npr_type_id === 1 ? true : false}
                    disabled
                  />
                  <CustomLabel label={"Sample Request"} />
                  <Checkbox
                    className="ml-2"
                    checked={npr_type_id === 2 ? true : false}
                    disabled
                  />
                  <CustomLabel label={"Revision"} />
                </Col>
              </Row>
              <Row className="col-2 row-margin-vertical">
                <Col span={24}>
                  <Checkbox checked={npr_request_cost} disabled />
                  <CustomLabel label={"Cost Request"} />
                </Col>
              </Row>
              <Row className="col-2 row-margin-vertical">
                <Col span={24}>
                  <Checkbox checked={npr_request_other} disabled />
                  <CustomLabel label={"Other :"} />
                  <div className="text-value">
                    <Text>{npr_request_other_remark || "-"}</Text>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={10}>
          <Row className="col-2 mt-1 mb-1" gutter={8}>
            <Col span={12}>
              <Text strong>Sample Request Qty. :</Text>
            </Col>
            <Col span={12}>
              <Text>{`${npr_sample_request_qty || "-"}`}</Text>
              <Text strong> Pcs.</Text>
            </Col>
          </Row>
          <Row className="col-2 mt-1 mb-1" gutter={8}>
            <Col span={12}>
              <Text strong>Launch Timing :</Text>
            </Col>
            <Col span={12}>
              <Text>{`${npr_plan_launch || "-"}`}</Text>
            </Col>
          </Row>
          <Row className="col-2 mt-1 mb-1" gutter={8}>
            <Col span={12}>
              <Text strong>Volume / Order :</Text>
            </Col>
            <Col span={12}>
              <Text>{`${npr_volume_order_first_time || "-"}`}</Text>
            </Col>
          </Row>
          <Row className="col-2 mt-1 mb-1" gutter={8}>
            <Col span={12}>
              <Text strong>Export To (Specify Country) :</Text>
            </Col>
            <Col span={12}>
              <Text>{`${npr_export || "-"}`}</Text>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default React.memo(GeneralDetail);
