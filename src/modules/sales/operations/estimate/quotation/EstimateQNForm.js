import { Row, Col, DatePicker } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useState } from "react";
import CustomLabel from "../../../../../components/CustomLabel";
import CustomSelect from "../../../../../components/CustomSelect";
import moment from "moment";
const EstimateQNForm = ({ id, readOnly }) => {
  const [state, setState] = useState({});
  const onSubmit = () => {
    // Do Submit
  };

  return (
    <>
      <Row className="col-2 mt-1 mb-1" gutter={16}>
        <Col span={12}>
          <Row className="col-2 mt-1 mb-1" gutter={16}>
            <Col span={6}>
              <CustomLabel require readOnly={readOnly} label={"Customer"} />
            </Col>
            <Col span={18}>
              <CustomSelect
                allowClear
                showSearch
                placeholder={"Select"}
                size={"small"}
                data={[]}
                field_id="id"
                field_name="name"
                value={val}
                onChange={(val, props) => {
                  // const { trans_id, trans_field_id, item_cost, item_no_name } =
                  //   props.data;
                  val !== undefined
                    ? onChange({
                        //   trans_id,
                        //   trans_field_id,
                      })
                    : onChange({
                        //   trans_id: null,
                        //   trans_field_id: null,
                      });
                }}
              />
            </Col>
          </Row>
          <Row className="col-2 mt-1 mb-1" gutter={16}>
            <Col span={6}>
              <CustomLabel readOnly={readOnly} label={"Currency"} />
            </Col>
            <Col span={18}>
              <Text>THB</Text>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row className="col-2 mt-1 mb-1" gutter={16}>
            <Col span={6}>
              <CustomLabel require readOnly={readOnly} label={"Expire Date"} />
            </Col>
            <Col span={18}>
              <DatePicker
                format={"DD/MM/YYYY"}
                className={"full-width"}
                name="qn_exp_date"
                placeholder="Expire Date"
                value={
                  state.qn_exp_date
                    ? moment(state.qn_exp_date, "DD/MM/YYYY")
                    : ""
                }
                onChange={(data) => {
                  onChange({
                    qn_exp_date: data.format("DD/MM/YYYY"),
                  });
                }}
              />
            </Col>
          </Row>
          <Row className="col-2 mt-1 mb-1" gutter={16}>
            <Col span={6}>
              <CustomLabel
                require
                readOnly={readOnly}
                label={"Payment Terms"}
              />
            </Col>
            <Col span={18}>
              <CustomSelect
                allowClear
                showSearch
                name="payment_term_id"
                placeholder={"Payment Term"}
                field_id="payment_term_id"
                field_name="payment_term_no_name"
                value={state.payment_term_no_name}
                data={[]}
                onChange={(data, option) => {
                  data !== undefined
                    ? onChange({
                        ...option.data,
                      })
                    : onChange({
                        payment_term_no_name: null,
                        payment_term_id: null,
                        payment_term_name: null,
                        payment_term_no: null,
                      });
                }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default React.memo(EstimateQNForm);
