import { Checkbox, Col, Input, InputNumber, Row } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Text from "antd/lib/typography/Text";
import React from "react";
import CustomLabel from "../../../../../components/CustomLabel";
import { getNumberFormat } from "../../../../../include/js/main_config";

const RDFormulaGeneralDetail = ({ readOnly, useFormValue }) => {
  const { onChange, state } = useFormValue;
  const {
    npr_formula_product_no,
    npr_formula_product_name,
    npr_formula_product_description,
    npr_formula_product_used,
    npr_formula_sample_qty,
    tg_trans_status_id,
  } = state;
  return (
    <>
      <>
        <Row className="col-2">
          <Col span={12}>
            <div className="form-section">
              <Row className="col-2 row-margin-vertical">
                <Col span={8}>
                  <CustomLabel label="Result :" readOnly={readOnly} />
                </Col>
                <Col span={16}>
                  <Checkbox
                    disabled={readOnly}
                    checked={tg_trans_status_id === 4 ? true : false}
                    onChange={(e) =>
                      onChange({ tg_trans_status_id: e.target.checked ? 4 : 2 })
                    }
                    className="mr-3"
                  />

                  <Text>Finished</Text>
                </Col>
              </Row>
              <Row className="col-2 row-margin-vertical">
                <Col span={8}>
                  <CustomLabel
                    label="Sample Quantity :"
                    require
                    readOnly={readOnly}
                  />
                </Col>
                <Col span={16}>
                  {readOnly ? (
                    <Text>{npr_formula_sample_qty}</Text>
                  ) : (
                    <InputNumber
                      name="npr_formula_sample_qty"
                      placeholder="Sameple Quantity"
                      defaultValue={0.0}
                      min={0.0}
                      {...getNumberFormat(4)}
                      step={0.0001}
                      value={npr_formula_sample_qty}
                      onChange={(data) => {
                        onChange({
                          npr_formula_sample_qty: data,
                        });
                      }}
                      className="full-width"
                    />
                  )}
                </Col>
              </Row>
            </div>
          </Col>
          <Col span={12}>
            <div className="form-section">
              <Row className="col-2 row-margin-vertical">
                <Col span={8}>
                  <CustomLabel
                    label="Product Code :"
                    require
                    readOnly={readOnly}
                  />
                </Col>
                <Col span={16}>
                  {readOnly ? (
                    <Text>{npr_formula_product_no}</Text>
                  ) : (
                    <Input
                      className="full-width"
                      placeholder={"Item Code"}
                      value={npr_formula_product_no}
                      onChange={(e) =>
                        onChange({ npr_formula_product_no: e.target.value })
                      }
                    />
                  )}
                </Col>
              </Row>
              <Row className="col-2 row-margin-vertical">
                <Col span={8}>
                  <CustomLabel
                    label="Product Name :"
                    require
                    readOnly={readOnly}
                  />
                </Col>
                <Col span={16}>
                  {readOnly ? (
                    <Text>{npr_formula_product_name}</Text>
                  ) : (
                    <Input
                      className="full-width"
                      placeholder={"Item Code"}
                      value={npr_formula_product_name}
                      onChange={(e) =>
                        onChange({ npr_formula_product_name: e.target.value })
                      }
                    />
                  )}
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <div className="form-section">
          <Row className="col-2 row-margin-vertical">
            <Col span={24}>
              <CustomLabel label="Description :" require readOnly={readOnly} />
            </Col>
            <Col span={24}>
              {readOnly ? (
                <div className="pd-left-2 text-value">
                  <Text>{npr_formula_product_name}</Text>
                </div>
              ) : (
                <TextArea
                  className="full-width"
                  placeholder="Product Description"
                  value={npr_formula_product_description}
                  onChange={(e) =>
                    onChange({
                      npr_formula_product_description: e.target.value,
                    })
                  }
                />
              )}
            </Col>
          </Row>
          <Row className="col-2 row-margin-vertical">
            <Col span={24}>
              <CustomLabel label="Used :" require readOnly={readOnly} />
            </Col>
            <Col span={24}>
              {readOnly ? (
                <div className="pd-left-2 text-value">
                  <Text>{npr_formula_product_name}</Text>
                </div>
              ) : (
                <TextArea
                  className="full-width"
                  placeholder="Product Used"
                  value={npr_formula_product_used}
                  onChange={(e) =>
                    onChange({ npr_formula_product_used: e.target.value })
                  }
                />
              )}
            </Col>
          </Row>
        </div>
      </>
    </>
  );
};

export default React.memo(RDFormulaGeneralDetail);
