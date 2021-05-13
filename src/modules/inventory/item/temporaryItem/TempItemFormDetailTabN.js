import { Col, Input, InputNumber, Row } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Text from "antd/lib/typography/Text";
import React, { useContext } from "react";
import CustomLabel from "../../../../components/CustomLabel";
import CustomSelect from "../../../../components/CustomSelect";
import { getNumberFormat } from "../../../../include/js/main_config";
import { TempItemContext } from "./TempItemForm";
const TempItemFormDetailTab = () => {
  const { masterData, state, onChange, readOnly } = useContext(TempItemContext);
  return (
    <>
      <div className="form-control pd-left-1 pd-right-1">
        <Row className="col-2 row-margin-vertical">
          <Col span={12}>
            <Row className="col-2 row-margin-vertical">
              <Col span={6}>
                <CustomLabel label="Item Code :" require readOnly={readOnly} />
              </Col>
              <Col span={17}>
                <Input
                  placeholder={"Item Code"}
                  className={
                    readOnly ? "full-wdith disabled-input" : "full-wdith"
                  }
                  disabled={readOnly}
                  onChange={(e) => onChange({ item_sample_no: e.target.value })}
                  value={state.item_sample_no}
                />
              </Col>
            </Row>
            <Row className="col-2 row-margin-vertical">
              <Col span={6}>
                <CustomLabel label="INCI Name :" require readOnly={readOnly} />
              </Col>
              <Col span={17}>
                <Input
                  placeholder={"INCI Name"}
                  className={
                    readOnly ? "full-wdith disabled-input" : "full-wdith"
                  }
                  disabled={readOnly}
                  onChange={(e) =>
                    onChange({ item_sample_name_inci: e.target.value })
                  }
                  value={state.item_sample_name_inci}
                />
              </Col>
            </Row>
            <Row className="col-2 row-margin-vertical">
              <Col span={6}>
                <CustomLabel label="Vendor Name :" readOnly={readOnly} />
              </Col>
              <Col span={17}>
                <Input
                  placeholder={"Vendor Name"}
                  className={
                    readOnly ? "full-wdith disabled-input" : "full-wdith"
                  }
                  disabled={readOnly}
                  onChange={(e) =>
                    onChange({ item_sample_name_vendor: e.target.value })
                  }
                  value={state.item_sample_name_vendor}
                />
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row className="col-2 row-margin-vertical">
              <Col span={6} offset={1}>
                <CustomLabel label="Item Type :" require readOnly={readOnly} />
              </Col>
              <Col span={16}>
                {readOnly ? (
                  <Text>{state.type_no_name}</Text>
                ) : (
                  <CustomSelect
                    allowClear
                    showSearch
                    className={
                      readOnly ? "full-wdith disabled-input" : "full-wdith"
                    }
                    disabled={readOnly}
                    placeholder={"Item Type"}
                    name="type_no_name"
                    field_id="type_id"
                    field_name="type_no_name"
                    value={state.type_no_name}
                    data={masterData.type}
                    onChange={(data, option) => {
                      data !== undefined
                        ? onChange({
                            type_id: option.data.type_id,
                            type_no_name: option.data.type_no_name,
                          })
                        : onChange({
                            type_id: null,
                            type_no_name: null,
                          });
                    }}
                  />
                )}
              </Col>
            </Row>
            <Row className="col-2 row-margin-vertical">
              <Col span={6} offset={1}>
                <CustomLabel label="UOM :" require readOnly={readOnly} />
              </Col>
              <Col span={16}>
                {readOnly ? (
                  <Text>{state.uom_no_name}</Text>
                ) : (
                  <CustomSelect
                    allowClear
                    showSearch
                    className="full-width"
                    placeholder={"Unit Of Measure"}
                    name="uom_no_name"
                    field_id="uom_id"
                    field_name="uom_no_name"
                    value={state.uom_no_name}
                    data={masterData.uom}
                    onChange={(data, option) => {
                      data !== undefined
                        ? onChange({
                            uom_id: option.data.uom_id,
                            uom_no_name: option.data.uom_no_name,
                          })
                        : onChange({
                            uom_id: null,
                            uom_no_name: null,
                          });
                    }}
                  />
                )}
              </Col>
            </Row>
            <Row className="col-2 row-margin-vertical">
              <Col span={6} offset={1}>
                <CustomLabel label="Cost :" readOnly={readOnly} />
              </Col>
              <Col span={16}>
                <InputNumber
                  name="item_sample_cost"
                  placeholder="Cost"
                  value={state.item_sample_cost}
                  defaultValue={0.0}
                  min={0.0}
                  step={1.0}
                  {...getNumberFormat(4)}
                  onChange={(data) => {
                    onChange({
                      item_sample_cost: data,
                    });
                  }}
                  className={
                    readOnly ? "full-width disabled-input" : "full-width"
                  }
                  disabled={readOnly}
                />
              </Col>
            </Row>
          </Col>
        </Row>

        <div className="mb-1">
          <CustomLabel label="Remark :" readOnly={readOnly} />
        </div>

        <TextArea
          className={readOnly ? "full-wdith disabled-input" : "full-wdith"}
          disabled={readOnly}
          placeholder={"Remark"}
          value={state.item_sample_remark}
          onChange={(e) => onChange({ item_sample_remark: e.target.value })}
        />
      </div>
    </>
  );
};

export default React.memo(TempItemFormDetailTab);
