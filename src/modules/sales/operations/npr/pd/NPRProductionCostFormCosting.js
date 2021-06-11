import { Col, DatePicker, Row } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import CustomLabel from "../../../../../components/CustomLabel";
import CustomSelect from "../../../../../components/CustomSelect";
import CustomTable from "../../../../../components/CustomTable";
import NPRBatchSize from "./NPRBatchSize";
import NPRItemPackageList from "./NPRItemPackageList";
import NPRItemRMList from "./NPRItemRMList";

const NPRProductionCostFormCosting = () => {
  return (
    <div className="form-section">
      <Row className="mt-2 mb-2 col-2" gutter={24}>
        <Col span={12}>
          <Row className="col-2 row-margin-vertical">
            <Col span={8}>
              <CustomLabel
                label="Person In Charge"
                require
                // readOnly={disabledAssign}
              />
            </Col>
            <Col span={16}>
              <CustomSelect
                showSearch
                allowClear
                //   disabled={disabledAssign}
                placeholder="Person In Charge"
                //   data={pu}
                className="w-100"
                name="npr_price_request_by"
                field_id="employee_no"
                field_name="employee_no_name"
                //   value={state.npr_price_request_by}
                //   onChange={(val, record) =>
                //     val !== undefined
                //       ? onChangeHead({
                //           npr_price_request_by: record.data.employee_no,
                //         })
                //       : onChangeHead({ npr_price_request_by: null })
                //   }
              />
            </Col>
          </Row>
        </Col>

        <Col span={12}>
          <Row className="col-2 row-margin-vertical">
            <Col span={8}>
              <CustomLabel label="Delivery Date" require />
            </Col>
            <Col span={16}>
              <DatePicker
                name={"npr_price_request_date"}
                format={"DD/MM/YYYY"}
                className={"full-width"}
                placeholder="Delivery Date"
                //   disabled={disabledAssign}
                required
                //   value={
                //     state.npr_price_request_date
                //       ? moment(state.npr_price_request_date, "DD/MM/YYYY")
                //       : null
                //   }
                //   onChange={(val) =>
                //     onChangeHead({
                //       npr_price_request_date: val
                //         ? moment(val).format("DD/MM/YYYY")
                //         : null,
                //     })
                //   }
              />
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

export default NPRProductionCostFormCosting;
