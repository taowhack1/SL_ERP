import { Col, DatePicker, Row } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  DatePickerField,
  SelectField,
} from "../../../../../components/AntDesignComponent";
import CustomLabel from "../../../../../components/CustomLabel";
import CustomSelect from "../../../../../components/CustomSelect";
import CustomTable from "../../../../../components/CustomTable";
import NPRBatchSize from "./NPRBatchSize";
import NPRItemPackageList from "./NPRItemPackageList";
import NPRItemRMList from "./NPRItemRMList";
import moment from "moment";
import { CheckOutlined } from "@ant-design/icons";
import { Checkbox } from "antd";
import { NPRPDContext } from "./NPRProductionCostForm";
import { useContext } from "react";

const NPRProductionCostFormTabCosting = () => {
  const { costing, setCosting, readOnly, PDEmp, user_name, department_id } =
    useContext(NPRPDContext);
  // console.log("watch", watch());
  const onChange = (data) => setCosting((prev) => ({ ...prev, ...data }));
  console.log("NPRProductionCostFormTabCosting");
  return (
    <div className="form-section">
      <Row className="mt-2 mb-2 col-2" gutter={24}>
        <Col span={12}>
          <Row className="col-2 row-margin-vertical">
            <Col span={8}>
              <CustomLabel label="Finished ?" readOnly={readOnly} />
            </Col>
            <Col span={16}>
              <div className="text-left">
                {readOnly && costing.tg_trans_status_id === 4 ? (
                  <>
                    <CheckOutlined className="complete" />
                    <Text className="pd-left-2 complete" strong>
                      Finished
                    </Text>
                  </>
                ) : (
                  <>
                    <Checkbox
                      checked={costing.tg_trans_status_id === 4 ? true : false}
                      disabled={
                        readOnly || costing.npr_product_cost_id === null
                      }
                      onChange={(e) =>
                        onChange({
                          tg_trans_status_id: e.target.checked ? 4 : 2,
                          tg_trans_close_id: e.target.checked ? 3 : 1,
                        })
                      }
                    />
                    <Text className="pd-left-2" strong>
                      Finished
                    </Text>
                  </>
                )}
              </div>
            </Col>
          </Row>
          <Row className="col-2 row-margin-vertical">
            <Col span={8}>
              <CustomLabel
                label="Person In Charge"
                require
                readOnly={readOnly}
              />
            </Col>
            <Col span={16}>
              {readOnly ? (
                <Text>
                  {costing.npr_product_cost_response_by_no_name || "-"}
                </Text>
              ) : (
                <CustomSelect
                  showSearch
                  allowClear
                  disabled={readOnly}
                  placeholder="Person In Charge"
                  data={PDEmp}
                  className="w-100"
                  name="npr_product_cost_response_by"
                  field_id="employee_no"
                  field_name="employee_no_name"
                  value={costing.npr_product_cost_response_by}
                  onChange={(val, record) =>
                    val !== undefined
                      ? onChange({
                          npr_product_cost_response_by: record.data.employee_no,
                          tg_trans_status_id: 2,
                          npr_product_cost_request_by: user_name,
                          npr_responsed_required_by: user_name,
                          npr_product_cost_request_date:
                            moment().format("DD/MM/YYYY"),
                        })
                      : onChange({
                          npr_product_cost_response_by: null,
                          tg_trans_status_id: 1,
                          npr_product_cost_request_by: user_name,
                          npr_responsed_required_by: user_name,
                          npr_product_cost_request_date:
                            moment().format("DD/MM/YYYY"),
                        })
                  }
                />
              )}
            </Col>
          </Row>
        </Col>

        <Col span={12}>
          <Row className="col-2 row-margin-vertical"></Row>

          <Row className="col-2 row-margin-vertical">
            <Col span={8}>
              <CustomLabel label="Delivery Date" require readOnly={readOnly} />
            </Col>
            <Col span={16}>
              {readOnly ? (
                <Text>{costing.npr_product_cost_response_date || "-"}</Text>
              ) : (
                <DatePicker
                  name={"npr_product_cost_response_date"}
                  format={"DD/MM/YYYY"}
                  className={"full-width"}
                  placeholder="Delivery Date"
                  disabled={readOnly}
                  required
                  value={
                    costing.npr_product_cost_response_date
                      ? moment(
                          costing.npr_product_cost_response_date,
                          "DD/MM/YYYY"
                        )
                      : null
                  }
                  onChange={(val) =>
                    onChange({
                      npr_product_cost_response_date: val
                        ? moment(val).format("DD/MM/YYYY")
                        : null,
                    })
                  }
                />
              )}
            </Col>
          </Row>
        </Col>
      </Row>
      <div className="mt-3">
        <NPRBatchSize />
      </div>
      <div className="mt-3">
        <NPRItemRMList />
      </div>
      <div className="mt-3">
        <NPRItemPackageList />
      </div>
    </div>
  );
};

export default React.memo(NPRProductionCostFormTabCosting);
