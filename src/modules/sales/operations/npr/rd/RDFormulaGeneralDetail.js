/** @format */

import { Checkbox, Col, Input, InputNumber, Row } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Text from "antd/lib/typography/Text";
import React from "react";
import { useSelector } from "react-redux";
import CustomLabel from "../../../../../components/CustomLabel";
import CustomSelect from "../../../../../components/CustomSelect";
import { getNumberFormat } from "../../../../../include/js/main_config";

const RDFormulaGeneralDetail = ({ readOnly, useFormValue }) => {
  const { onChange, state, category_id } = useFormValue;
  const {
    npr_formula_product_no,
    npr_formula_product_name,
    npr_formula_product_description,
    npr_formula_product_used,
    npr_formula_sample_qty,
    tg_trans_status_id,
    smd_item_cmt_category_id,
    smd_item_cmt_used_area_id,
    smd_item_cmt_type_id,
    smd_item_sp_category_id,
    smd_item_sp_taste_id,
    smd_item_sp_properties_id,
    smd_item_cmt_category_name,
    smd_item_cmt_used_area_name,
    smd_item_cmt_type_name,
    smd_item_sp_category_name,
    smd_item_sp_taste_name,
    smd_item_sp_properties_name,
  } = state;
  const {
    smd_item_cmt_category,
    smd_item_cmt_type,
    smd_item_cmt_used_area,
    smd_item_sp_category,
    smd_item_sp_properties,
    smd_item_sp_taste,
  } = useSelector((state) => state.sales.master_data.smd);
  console.log("state", state);
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
        {
          //supplement food or cosmetic  only  seee this section
          [87, 88].includes(category_id) && (
            <>
              {category_id === 88 ? ( //is costmetic ?
                <>
                  <Row className="col-2 row-margin-vertical">
                    <Col span={12}>
                      <div className="form-section">
                        <Row className="col-2 row-margin-vertical">
                          <Col span={8}>
                            <CustomLabel
                              label="Category :"
                              require
                              readOnly={readOnly}
                            />
                          </Col>
                          <Col span={16}>
                            {readOnly ? (
                              <Text>{smd_item_cmt_category_name || "-"}</Text>
                            ) : (
                              <CustomSelect
                                allowClear
                                showSearch
                                data={smd_item_cmt_category}
                                field_id="smd_item_cmt_category_id"
                                field_name="smd_item_cmt_category_name"
                                placeholder={"Select Cosmetic Category"}
                                onChange={(data, option) => {
                                  data !== undefined
                                    ? onChange({
                                        smd_item_cmt_category_id: data,
                                        smd_item_cmt_category_name:
                                          option.title,
                                      })
                                    : onChange({
                                        smd_item_cmt_category_id: null,
                                        smd_item_cmt_category_name: null,
                                      });
                                }}
                                value={smd_item_cmt_category_id}
                              />
                            )}
                          </Col>
                        </Row>
                        <Row className="col-2 row-margin-vertical">
                          <Col span={8}>
                            <CustomLabel
                              label="Used Area :"
                              require
                              readOnly={readOnly}
                            />
                          </Col>
                          <Col span={16}>
                            {readOnly ? (
                              <Text>{smd_item_cmt_used_area_name || "-"}</Text>
                            ) : (
                              <CustomSelect
                                allowClear
                                showSearch
                                data={smd_item_cmt_used_area}
                                field_id="smd_item_cmt_used_area_id"
                                field_name="smd_item_cmt_used_area_name"
                                placeholder={"Select Cosmetic Used Area"}
                                onChange={(data, option) => {
                                  data !== undefined
                                    ? onChange({
                                        smd_item_cmt_used_area_id: data,
                                        smd_item_cmt_used_area_name:
                                          option.title,
                                      })
                                    : onChange({
                                        smd_item_cmt_used_area_id: null,
                                        smd_item_cmt_used_area_name: null,
                                      });
                                }}
                                value={smd_item_cmt_used_area_id}
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
                              label="Type :"
                              require
                              readOnly={readOnly}
                            />
                          </Col>
                          <Col span={16}>
                            {readOnly ? (
                              <Text>{smd_item_cmt_type_name || "-"}</Text>
                            ) : (
                              <CustomSelect
                                allowClear
                                showSearch
                                data={smd_item_cmt_type}
                                field_id="smd_item_cmt_type_id"
                                field_name="smd_item_cmt_type_name"
                                placeholder={"Select Cosmetic Type"}
                                onChange={(data, option) => {
                                  data !== undefined
                                    ? onChange({
                                        smd_item_cmt_type_id: data,
                                        smd_item_cmt_type_name: option.title,
                                      })
                                    : onChange({
                                        smd_item_cmt_type_id: null,
                                        smd_item_cmt_type_name: null,
                                      });
                                }}
                                value={smd_item_cmt_type_id}
                              />
                            )}
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                </>
              ) : (
                <>
                  <Row className="col-2 row-margin-vertical">
                    <Col span={12}>
                      <div className="form-section">
                        <Row className="col-2 row-margin-vertical">
                          <Col span={8}>
                            <CustomLabel
                              label="Category :"
                              require
                              readOnly={readOnly}
                            />
                          </Col>
                          <Col span={16}>
                            {readOnly ? (
                              <Text>{smd_item_sp_category_name || "-"}</Text>
                            ) : (
                              <CustomSelect
                                allowClear
                                showSearch
                                data={smd_item_sp_category}
                                field_id="smd_item_sp_category_id"
                                field_name="smd_item_sp_category_name"
                                placeholder={"Select Supplement Category"}
                                onChange={(data, option) => {
                                  data !== undefined
                                    ? onChange({
                                        smd_item_sp_category_id: data,
                                        smd_item_sp_category_name: option.title,
                                      })
                                    : onChange({
                                        smd_item_sp_category_id: null,
                                        smd_item_sp_category_name: null,
                                      });
                                }}
                                value={smd_item_sp_category_id}
                              />
                            )}
                          </Col>
                        </Row>
                        <Row className="col-2 row-margin-vertical">
                          <Col span={8}>
                            <CustomLabel
                              label="Taste :"
                              require
                              readOnly={readOnly}
                            />
                          </Col>
                          <Col span={16}>
                            {readOnly ? (
                              <Text>{smd_item_sp_taste_name || "-"}</Text>
                            ) : (
                              <CustomSelect
                                allowClear
                                showSearch
                                data={smd_item_sp_taste}
                                field_id="smd_item_sp_taste_id"
                                field_name="smd_item_sp_taste_name"
                                placeholder={"Select Supplement Taste"}
                                onChange={(data, option) => {
                                  data !== undefined
                                    ? onChange({
                                        smd_item_sp_taste_id: data,
                                        smd_item_sp_taste_name: option.title,
                                      })
                                    : onChange({
                                        smd_item_sp_taste_id: null,
                                        smd_item_sp_taste_name: null,
                                      });
                                }}
                                value={smd_item_sp_taste_id}
                              />
                            )}
                          </Col>
                        </Row>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="form-section">
                        {" "}
                        <Row className="col-2 row-margin-vertical">
                          <Col span={8}>
                            <CustomLabel
                              label="Properties :"
                              require
                              readOnly={readOnly}
                            />
                          </Col>
                          <Col span={16}>
                            {readOnly ? (
                              <Text>{smd_item_sp_properties_name || "-"}</Text>
                            ) : (
                              <CustomSelect
                                allowClear
                                showSearch
                                data={smd_item_sp_properties}
                                field_id="smd_item_sp_properties_id"
                                field_name="smd_item_sp_properties_name"
                                placeholder={"Select Supplement Properties"}
                                onChange={(data, option) => {
                                  data !== undefined
                                    ? onChange({
                                        smd_item_sp_properties_id: data,
                                        smd_item_sp_properties_name:
                                          option.title,
                                      })
                                    : onChange({
                                        smd_item_sp_properties_id: null,
                                        smd_item_sp_properties_name: null,
                                      });
                                }}
                                value={smd_item_sp_properties_id}
                              />
                            )}
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                </>
              )}
            </>
          )
        }
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
