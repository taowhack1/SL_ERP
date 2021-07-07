import { Col, Input, InputNumber, Row } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import { useSelector } from "react-redux";
import CustomLabel from "../../../../components/CustomLabel";
import CustomSelect from "../../../../components/CustomSelect";
import { convertDigit, numberFormat } from "../../../../include/js/main_config";

const CustomerSalesTab = ({ data_head, upDateFormValue, readOnly }) => {
  const customer_payment_terms = useSelector(
    (state) => state.accounting.master_data.customer_payment_terms
  );
  return (
    <Row className="col-2 row-margin-vertical">
      <Col span={12}>
        <Row className="row-margin">
          <Col span={7}>
            <CustomLabel
              label="Condition Billing"
              require
              readOnly={readOnly}
            />
          </Col>
          <Col span={16}>
            {readOnly ? (
              <Text className="pre-wrap">
                {data_head.customer_condition_billing || "-"}
              </Text>
            ) : (
              <Input
                name="customer_condition_billing"
                placeholder="e.g. Affter Delivery"
                value={data_head.customer_condition_billing}
                onChange={(data) => {
                  upDateFormValue({
                    customer_condition_billing: data.target.value,
                  });
                }}
                className={"full-width"}
                // size="small"
              />
            )}
          </Col>
          <Col span={1}></Col>
        </Row>
        <Row className="row-margin">
          <Col span={7}>
            <CustomLabel label="Payment Terms" require readOnly={readOnly} />
          </Col>
          <Col span={16}>
            {readOnly ? (
              <Text className="pre-wrap">
                {data_head.payment_term_no_name || "-"}
              </Text>
            ) : (
              <CustomSelect
                placeholder={"Payment Term"}
                allowClear
                showSearch
                name="payment_term_id"
                field_id="payment_term_id"
                field_name="payment_term_no_name"
                value={data_head.payment_term_no_name}
                data={customer_payment_terms}
                onChange={(data, option) =>
                  data
                    ? upDateFormValue({
                        payment_term_id: data,
                        payment_term_no_name: option.title,
                      })
                    : upDateFormValue({
                        payment_term_id: null,
                        payment_term_no_name: null,
                      })
                }
              />
            )}
          </Col>
          <Col span={1}></Col>
        </Row>
        <Row className="row-margin">
          <Col span={7}>
            <CustomLabel label="Credit Limit" require readOnly={readOnly} />
          </Col>
          <Col span={16}>
            <Row>
              <Col span={12}>
                {readOnly ? (
                  <Text className="pre-wrap">
                    {convertDigit(data_head.customer_limit_credit || 0, 3)}
                  </Text>
                ) : (
                  <InputNumber
                    name="customer_limit_credit"
                    placeholder="Credit Limit"
                    value={data_head.customer_limit_credit}
                    precision={3}
                    {...numberFormat}
                    step={5}
                    onChange={(data) => {
                      upDateFormValue({
                        customer_limit_credit: data,
                      });
                    }}
                    className={"full-width"}
                    // size="small"
                  />
                )}
              </Col>
              <Col span={12}>
                <Text
                  strong
                  style={{
                    verticalAlign: "middle",
                    paddingLeft: 10,
                  }}
                >
                  {data_head.currency_no}
                </Text>
              </Col>
            </Row>
          </Col>
          <Col span={1}></Col>
        </Row>
      </Col>
    </Row>
  );
};

export default React.memo(CustomerSalesTab);
