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
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import numeral from "numeral";
import {
  item_formula_columns,
  item_formula_detail_fields,
  item_process_specification_columns,
  item_qa_columns,
  item_qa_detail_fields,
} from "../config/item";
import CustomSelect from "../../../components/CustomSelect";
import { convertDigit, numberFormat } from "../../../include/js/main_config";
import PartSpecificationDetail from "./PartSpecification_Detail";
import BulkFormula from "./BulkFormula";

const { Text, Title } = Typography;

const PartSpecification = ({
  partName,
  readOnly,
  data_formula_detail,
  formulaDetailDispatch,
  item_list,
}) => {
  const addLine = () => {
    formulaDetailDispatch({
      type: "ADD_ROW",
      payload: item_formula_detail_fields,
    });
  };

  const delLine = (id) => {
    formulaDetailDispatch({ type: "DEL_ROW", payload: { id: id } });
  };

  const onChangeValue = (rowId, data) => {
    formulaDetailDispatch({
      type: "CHANGE_DETAIL_VALUE",
      payload: {
        id: rowId,
        data: data,
      },
    });
  };

  const getFormulaNo = (part = "A") => {
    let arrayNo = [];
    let part_temp = part && part !== undefined ? part : "A";
    for (let i = 1; i <= 30; i++) {
      arrayNo.push({
        item_formula_part: part_temp,
        item_formula_part_no: part_temp + numeral(i).format("00"),
      });
    }
    return arrayNo;
  };
  return (
    <>
      <div className="group-row">
        <Row className="col-2 row-margin-vertical">
          <Col span={24}>
            {/* Column Header */}

            {/* <Row className="group-row-header">
              <Col span={12}>
                <Row>
                  <Col span={1}></Col>
                  <Col span={8}>
                    <Text strong>Part Name:</Text>
                  </Col>
                  <Col span={14}>
                    <Input />
                  </Col>
                  <Col span={1}></Col>
                </Row>
              </Col>
              <Col span={12}></Col>
            </Row> */}
            <Row className="col-2 row-margin-vertical">
              <Col span={12}>
                <Row>
                  <Col span={1}></Col>
                  <Col span={10}>
                    <Title level={5}>Part : {partName}</Title>
                  </Col>
                </Row>
              </Col>
              <Col span={12}></Col>
            </Row>

            <div className="detail-container">
              <PartSpecificationDetail
                readOnly={readOnly}
                data_formula_detail={data_formula_detail}
                formulaDetailDispatch={formulaDetailDispatch}
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
