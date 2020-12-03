import {
  Button,
  Row,
  Col,
  InputNumber,
  AutoComplete,
  Typography,
  Input,
} from "antd";
import {
  DeleteTwoTone,
  PlusOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import numeral from "numeral";
import {
  item_formula_columns,
  item_formula_detail_fields,
  item_part_specification_fields,
  item_process_specification_columns,
  item_qa_columns,
  item_qa_detail_fields,
} from "../config/item";
import CustomSelect from "../../../components/CustomSelect";
import { convertDigit, numberFormat } from "../../../include/js/main_config";
import PartSpecificationDetail from "./PartSpecification_Detail";
import BulkFormula from "./BulkFormula";
import { reducer } from "../reducers";

const { Text, Title } = Typography;

const PartSpecification = ({
  partName,
  readOnly,
  data_part_detail,
  partDetailDispatch,
  data_formula_detail,
  formulaDetailDispatch,
  item_list,
}) => {
  return (
    <>
      <div className="group-row">
        <Row className="col-2 row-margin-vertical">
          <Col span={24}>
            {/* Column Header */}
            <Row className="col-2 row-margin-vertical">
              <Col span={12}>
                <Row>
                  <Col span={1}></Col>
                  <Col span={10}>
                    <Title level={5}>{partName}</Title>
                  </Col>
                </Row>
              </Col>
              <Col span={12}></Col>
            </Row>

            <div className="detail-container">
              <PartSpecificationDetail
                readOnly={readOnly}
                // data_formula_detail={data_formula_detail}
                // formulaDetailDispatch={formulaDetailDispatch}
                data_part_detail={data_part_detail}
                partDetailDispatch={partDetailDispatch}
                item_list={item_list}
              />
            </div>
            <Row className="col-2 row-margin-vertical">
              <Col span={12}>
                <Row>
                  <Col span={1}></Col>
                  <Col span={6}>
                    <Text strong>Schedule Time :</Text>
                  </Col>
                  <Col span={12}>
                    <InputNumber
                      placeholder={"Minutes"}
                      min={0}
                      step={1}
                      precision={0}
                      style={{ width: "100%" }}
                      disabled={0}
                      defaultValue={0}
                      name="item_vendor_lead_time"
                      // value={line.item_vendor_lead_time}
                      // onChange={(data) =>
                      //   onChangeValue(line.id, { item_vendor_lead_time: data })
                      // }
                      size="small"
                    />
                  </Col>
                  <Col span={5}>
                    <Text strong className="pd-left-2">
                      Minutes
                    </Text>
                  </Col>
                </Row>
              </Col>
              <Col span={12}></Col>
            </Row>
            <div className="detail-container mt-4">
              <BulkFormula
                readOnly={readOnly}
                data_formula_detail={data_formula_detail}
                formulaDetailDispatch={formulaDetailDispatch}
                item_list={item_list}
              />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default React.memo(PartSpecification);
