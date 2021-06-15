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

const NPRProductionCostFormTabCosting = () => {
  const {
    formMethod: { control, register, errors, watch },
    readOnly,
    PDEmp,
  } = useFormContext();
  // console.log("watch", watch());
  console.log("render");
  return (
    <div className="form-section">
      <Row className="mt-2 mb-2 col-2" gutter={24}>
        <Col span={12}>
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
                <input
                  className="disabled-input"
                  readOnly={readOnly}
                  {...register("npr_product_cost_response_by")}
                />
              ) : (
                <>
                  <Controller
                    render={({ field }) =>
                      SelectField({
                        fieldProps: {
                          className: "full-width",

                          showSearch: true,
                          onChange: (val) => field.onChange(val || null),
                          ...field,
                          placeholder: "Select person in charge",
                        },
                        dataSource: PDEmp,
                        fieldName: "employee_no_name",
                        fieldId: "employee_no",
                      })
                    }
                    control={control}
                    name="npr_product_cost_response_by"
                    // rules={{ required: true }}
                  />
                  {errors && errors?.npr_product_cost_response_by && (
                    <span className="require">This field is required.</span>
                  )}
                </>
              )}
            </Col>
          </Row>
        </Col>

        <Col span={12}>
          <Row className="col-2 row-margin-vertical">
            <Col span={8}>
              <CustomLabel label="Delivery Date" require readOnly={readOnly} />
            </Col>
            <Col span={16}>
              {readOnly ? (
                <input
                  className="disabled-input"
                  readOnly={readOnly}
                  {...register("npr_product_cost_response_date")}
                />
              ) : (
                <>
                  <Controller
                    render={({ field: { value, onChange } }) =>
                      DatePickerField({
                        fieldProps: {
                          className: "full-width",
                          placeholder: "Due date",
                          format: "DD/MM/YYYY",
                          onChange: (val) => onChange(val ? val : null),
                          value: value,
                        },
                      })
                    }
                    control={control}
                    name="npr_product_cost_response_date"
                    // rules={{ required: true }}
                  />
                  {errors && errors?.npr_product_cost_response_date && (
                    <span className="require">This field is required.</span>
                  )}
                </>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
      {/* <div className="mt-3">
        <NPRBatchSize />
      </div> */}
      {/* <div className="mt-3">
        <NPRItemRMList />
      </div> */}
      {/* <div className="mt-3">
        <NPRItemPackageList />
      </div> */}
    </div>
  );
};

export default React.memo(NPRProductionCostFormTabCosting);
