import { Col, DatePicker, Input, Row } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import CustomSelect from "../../../../components/CustomSelect";
import CustomLabel from "../../../../components/CustomLabel";

const MachineTabDetail = ({ upDateFormValue, readOnly, data_head }) => {
  const { itemType } = useSelector(
    (state) => state.production.masterData.machine
  );
  return (
    <>
      <Row className="col-2 row-margin-vertical">
        <Col span={12}>
          <Row className="col-2 row-margin-vertical">
            <Col span={6}>
              <CustomLabel
                label={"Cost Center No. :"}
                require
                readOnly={readOnly}
              />
            </Col>
            <Col span={13}>
              {readOnly ? (
                <Text className="text-value">
                  {data_head.machine_cost_center}
                </Text>
              ) : (
                <Input
                  className="full-width"
                  placeholder={"eg. 11509001"}
                  value={data_head.machine_cost_center}
                  onChange={(e) =>
                    upDateFormValue({
                      machine_cost_center: e.target.value,
                    })
                  }
                />
              )}
            </Col>
          </Row>

          <Row className="col-2 row-margin-vertical">
            <Col span={6}>
              <CustomLabel
                label={"Machine Type :"}
                require
                readOnly={readOnly}
              />
            </Col>
            <Col span={13}>
              {readOnly ? (
                <Text className="text-value">
                  {data_head.machine_type_no_name ?? "-"}
                </Text>
              ) : (
                <CustomSelect
                  allowClear
                  showSearch
                  placeholder={"Machine Type"}
                  name="machine_type_id"
                  field_id="machine_type_id"
                  field_name="machine_type_no_name"
                  value={data_head.machine_type_no_name}
                  data={itemType}
                  onChange={(data, option) => {
                    data !== undefined
                      ? upDateFormValue({
                          machine_type_id: data,
                          machine_type_no_name: option.title,
                        })
                      : upDateFormValue({
                          cost_center_id: null,
                          machine_type_no_name: null,
                        });
                  }}
                />
              )}
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row className="col-2 row-margin-vertical">
            <Col span={6}>
              <CustomLabel require label={"MFG Date :"} readOnly={readOnly} />
            </Col>
            <Col span={13}>
              {readOnly ? (
                <Text className="text-value">
                  {data_head.machine_mfg_date ?? "-"}
                </Text>
              ) : (
                <DatePicker
                  format={"DD/MM/YYYY"}
                  className={"full-width"}
                  name="machine_mfg_date"
                  placeholder="MFG Date"
                  value={
                    data_head.machine_mfg_date
                      ? moment(data_head.machine_mfg_date, "DD/MM/YYYY")
                      : ""
                  }
                  onChange={(data) => {
                    data
                      ? upDateFormValue({
                          machine_mfg_date: data.format("DD/MM/YYYY"),
                        })
                      : upDateFormValue({
                          machine_mfg_date: null,
                        });
                  }}
                />
              )}
            </Col>
          </Row>

          <Row className="col-2 row-margin-vertical">
            <Col span={6}>
              <CustomLabel label={"EXP Date :"} readOnly={readOnly} />
            </Col>
            <Col span={13}>
              {readOnly ? (
                <Text className="text-value">
                  {data_head.machine_exp_date ?? "-"}
                </Text>
              ) : (
                <DatePicker
                  format={"DD/MM/YYYY"}
                  className={"full-width"}
                  name="machine_exp_date"
                  placeholder="EXP Date"
                  value={
                    data_head.machine_exp_date
                      ? moment(data_head.machine_exp_date, "DD/MM/YYYY")
                      : ""
                  }
                  onChange={(data) => {
                    data
                      ? upDateFormValue({
                          machine_exp_date: data.format("DD/MM/YYYY"),
                        })
                      : upDateFormValue({
                          machine_exp_date: null,
                        });
                  }}
                />
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default MachineTabDetail;
