import { Col, Row } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Text from "antd/lib/typography/Text";
import React, { useContext } from "react";
import { Controller } from "react-hook-form";
import {
  InputField,
  InputNumberField,
  SelectField,
  TextAreaField,
} from "../../../../components/AntDesignComponent";
import CustomLabel from "../../../../components/CustomLabel";
import { getNumberFormat } from "../../../../include/js/main_config";
import { TempItemContext } from "./TempItemCreate";
const TempItemFormDetailTab = () => {
  const { control, errors, masterData } = useContext(TempItemContext);
  return (
    <>
      <div className="form-control">
        <Row className="col-2 row-margin-vertical">
          <Col span={12}>
            <Row className="col-2 row-margin-vertical">
              <Col span={6}>
                <CustomLabel label="Item Code :" require />
              </Col>
              <Col span={17}>
                <Controller
                  render={({ field }) =>
                    InputField({
                      fieldProps: {
                        placeholder: "Item Code",
                        onChange: (e) => field.onChange(e.target.value),
                      },
                    })
                  }
                  name="item_sample_no"
                  control={control}
                  rules={{ required: true }}
                />
                {errors && errors.item_sample_no && (
                  <span className="error"> * This field is required.</span>
                )}
              </Col>
            </Row>
            <Row className="col-2 row-margin-vertical">
              <Col span={6}>
                <CustomLabel label="INCI Name :" require />
              </Col>
              <Col span={17}>
                <Controller
                  render={({ field }) =>
                    InputField({
                      fieldProps: {
                        placeholder: "INCI Name",
                        onChange: (e) => field.onChange(e.target.value),
                      },
                    })
                  }
                  name="item_sample_name_inci"
                  control={control}
                  rules={{ required: true }}
                />
                {errors && errors.item_sample_name_inci && (
                  <span className="error"> * This field is required.</span>
                )}
              </Col>
            </Row>
            <Row className="col-2 row-margin-vertical">
              <Col span={6}>
                <CustomLabel label="Cost :" />
              </Col>
              <Col span={17}>
                <Controller
                  render={({ field }) =>
                    InputNumberField({
                      fieldProps: {
                        className: "full-width",
                        placeholder: "Cost",
                        defaultValue: 0.0,
                        min: 0.0,
                        max: 100,
                        step: 1.0,
                        ...getNumberFormat(4),
                        onChange: (val) => field.onChange(val || 0),
                      },
                    })
                  }
                  name="item_sample_cost"
                  control={control}
                />
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row className="col-2 row-margin-vertical">
              <Col span={6} offset={1}>
                <CustomLabel label="Item Type :" require />
              </Col>
              <Col span={16}>
                <Controller
                  render={({ field }) =>
                    SelectField({
                      fieldProps: {
                        className: "full-width",
                        placeholder: "Item Type",
                        allowClear: true,
                        showSearch: true,
                        onChange: (val) => field.onChange(val || null),
                      },
                      dataSource: masterData.type,
                      fieldId: "type_id",
                      fieldName: "type_no_name",
                    })
                  }
                  name="type_id"
                  control={control}
                  rules={{ required: true }}
                />
                {errors && errors.type_id && (
                  <span className="error"> * This field is required.</span>
                )}
              </Col>
            </Row>
            <Row className="col-2 row-margin-vertical">
              <Col span={6} offset={1}>
                <CustomLabel label="UOM :" require />
              </Col>
              <Col span={16}>
                <Controller
                  render={({ field }) =>
                    SelectField({
                      fieldProps: {
                        className: "full-width",
                        placeholder: "Unit Of Measure",
                        allowClear: true,
                        showSearch: true,
                        onChange: (val) => field.onChange(val || null),
                      },
                      dataSource: masterData.uom,
                      fieldId: "uom_id",
                      fieldName: "uom_no_name",
                    })
                  }
                  name="uom_id"
                  control={control}
                  rules={{ required: true }}
                />
                {errors && errors.uom_id && (
                  <span className="error"> * This field is required.</span>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <div className="form-control pd-left-1 pd-right-1">
        <div className="mb-1">
          <Text strong>Remark :</Text>
        </div>
        <Controller
          render={({ field }) =>
            TextAreaField({
              fieldProps: {
                className: "full-width",
                placeholder: "Remark",
                onChange: (val) => field.onChange(val || null),
              },
            })
          }
          name="item_sample_remark"
          control={control}
        />
      </div>
    </>
  );
};

export default React.memo(TempItemFormDetailTab);
