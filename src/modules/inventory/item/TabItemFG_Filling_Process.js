import { UploadOutlined } from "@ant-design/icons";
import {
  Checkbox,
  Col,
  Input,
  InputNumber,
  Row,
  Tabs,
  Upload,
  Button,
  Space,
  Radio,
} from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import { useSelector } from "react-redux";
import CustomSelect from "../../../components/CustomSelect";
import Line from "../../../components/VendorLine";
import { numberFormat } from "../../../include/js/main_config";
import { item_filling_weight_columns } from "../config/item";
import PackagingProcess from "./Item_Packaging";
const { TextArea } = Input;

const TabFillingProcess = ({
  key,
  master_data,
  data_head,
  upDateFormValue,
  data_detail,
  detailDispatch,
  readOnly,
  packaging_uom,
}) => {
  const currency_list = useSelector(
    (state) => state.accounting.master_data.currency
  );
  return (
    <>
      <Row
        className="col-2 row-margin-vertical"
        style={{
          borderBottom: "1px solid #E5E5E5",
          paddingBottom: 10,
        }}
      >
        <Col span={24}>
          <Text strong className="detail-tab-header">
            Weight
          </Text>
        </Col>
      </Row>
      <Row className="col-2 row-margin-vertical">
        <Col
          span={18}
          // style={{
          //   borderRight: "1px solid #c4c4c4",
          // }}
        >
          <Row className="col-2 row-margin-vertical">
            <Col span={4}></Col>
            <Col span={18}>
              {/* Weight Columns */}
              <Row gutter={2} className="detail-table-head">
                {item_filling_weight_columns &&
                  item_filling_weight_columns.map((col, key) => {
                    return (
                      <Col key={col.id} span={col.size} className="col-outline">
                        {col.require && !readOnly && (
                          <span className="require">* </span>
                        )}
                        <Text strong>{col.name}</Text>
                      </Col>
                    );
                  })}
                {/* 
                <Col span={1} className="col-outline">
                  <Text strong>
                    <EllipsisOutlined />
                  </Text>
                </Col> */}
              </Row>
            </Col>
            <Col span={2}></Col>
          </Row>
          <Row className="col-2 row-margin-vertical">
            <Col span={4}>
              <Text strong>Filling Weight</Text>
            </Col>
            <Col span={18}>
              {/* weight */}
              <Row
                key={1}
                style={{
                  marginBottom: 0,
                  border: "1px solid white",
                  backgroundColor: "#FCFCFC",
                }}
                name={`row-filling`}
                gutter={6}
                className="col-2"
              >
                <Col span={5} className="text-center">
                  <InputNumber
                    {...numberFormat}
                    name="item_weight_filling_standard"
                    placeholder="Standard"
                    // value={line.item_weight_filling_standard}
                    defaultValue={0.0}
                    min={0.0001}
                    // max={100.0}
                    step={1.0}
                    onChange={(data) => {
                      console.log(data);
                      // onChangeValue(line.id, {
                      //   item_weight_filling_standard: data,
                      // });
                    }}
                    style={{ width: "100%" }}
                    size="small"
                  />
                </Col>
                <Col span={3} className="text-center">
                  {/* std. unit */}
                  <CustomSelect
                    style={{ width: "100%" }}
                    size="small"
                    placeholder="uom"
                  />
                </Col>
                <Col span={5} className="text-center">
                  <InputNumber
                    {...numberFormat}
                    name="item_weight_filling_min"
                    placeholder="Min"
                    // value={line.item_weight_filling_min}
                    defaultValue={0.0}
                    min={0.0001}
                    // max={100.0}
                    step={1.0}
                    onChange={(data) => {
                      console.log(data);
                      // onChangeValue(line.id, {
                      //   item_weight_filling_min: data,
                      // });
                    }}
                    style={{ width: "100%" }}
                    size="small"
                  />
                </Col>
                <Col span={3} className="text-center">
                  {/* std. unit */}
                  <CustomSelect style={{ width: "100%" }} size="small" />
                </Col>
                <Col span={5} className="text-center">
                  <InputNumber
                    {...numberFormat}
                    name="item_weight_filling_max"
                    placeholder="Max"
                    // value={line.item_weight_filling_max}
                    defaultValue={0.0}
                    min={0.0001}
                    // max={100.0}
                    step={1.0}
                    onChange={(data) => {
                      console.log(data);
                      // onChangeValue(line.id, {
                      //   item_weight_filling_max: data,
                      // });
                    }}
                    style={{ width: "100%" }}
                    size="small"
                  />
                </Col>
                <Col span={3} className="text-center">
                  {/* std. unit */}
                  <CustomSelect style={{ width: "100%" }} size="small" />
                </Col>
              </Row>
            </Col>
            <Col span={2}></Col>
          </Row>
          <Row className="col-2 row-margin-vertical">
            <Col span={4}>
              <Text strong>FG Weight </Text>
            </Col>
            <Col span={18}>
              <Row
                key={1}
                style={{
                  marginBottom: 0,
                  border: "1px solid white",
                  backgroundColor: "#FCFCFC",
                }}
                name={`row-filling`}
                gutter={6}
                className="col-2"
              >
                <Col span={5} className="text-center">
                  <InputNumber
                    {...numberFormat}
                    name="item_weight_filling_standard"
                    placeholder="Standard"
                    // value={line.item_weight_filling_standard}
                    defaultValue={0.0}
                    min={0.0001}
                    // max={100.0}
                    step={1.0}
                    onChange={(data) => {
                      console.log(data);
                      // onChangeValue(line.id, {
                      //   item_weight_filling_standard: data,
                      // });
                    }}
                    style={{ width: "100%" }}
                    size="small"
                  />
                </Col>
                <Col span={3} className="text-center">
                  {/* std. unit */}
                  <CustomSelect
                    style={{ width: "100%" }}
                    size="small"
                    placeholder="uom"
                  />
                </Col>
                <Col span={5} className="text-center">
                  <InputNumber
                    {...numberFormat}
                    name="item_weight_filling_min"
                    placeholder="Min"
                    // value={line.item_weight_filling_min}
                    defaultValue={0.0}
                    min={0.0001}
                    // max={100.0}
                    step={1.0}
                    onChange={(data) => {
                      console.log(data);
                      // onChangeValue(line.id, {
                      //   item_weight_filling_min: data,
                      // });
                    }}
                    style={{ width: "100%" }}
                    size="small"
                  />
                </Col>
                <Col span={3} className="text-center">
                  {/* std. unit */}
                  <CustomSelect style={{ width: "100%" }} size="small" />
                </Col>
                <Col span={5} className="text-center">
                  <InputNumber
                    {...numberFormat}
                    name="item_weight_filling_max"
                    placeholder="Max"
                    // value={line.item_weight_filling_max}
                    defaultValue={0.0}
                    min={0.0001}
                    // max={100.0}
                    step={1.0}
                    onChange={(data) => {
                      console.log(data);
                      // onChangeValue(line.id, {
                      //   item_weight_filling_max: data,
                      // });
                    }}
                    style={{ width: "100%" }}
                    size="small"
                  />
                </Col>
                <Col span={3} className="text-center">
                  {/* std. unit */}
                  <CustomSelect style={{ width: "100%" }} size="small" />
                </Col>
              </Row>
            </Col>
            <Col span={2}></Col>
          </Row>
          <Row className="col-2 row-margin-vertical">
            <Col span={4}>
              <Text strong>FG Weight / Box</Text>
            </Col>
            <Col span={18}>
              <Row
                key={1}
                style={{
                  marginBottom: 0,
                  border: "1px solid white",
                  backgroundColor: "#FCFCFC",
                }}
                name={`row-filling`}
                gutter={6}
                className="col-2"
              >
                <Col span={5} className="text-center">
                  <InputNumber
                    {...numberFormat}
                    name="item_weight_filling_standard"
                    placeholder="Standard"
                    // value={line.item_weight_filling_standard}
                    defaultValue={0.0}
                    min={0.0001}
                    // max={100.0}
                    step={1.0}
                    onChange={(data) => {
                      console.log(data);
                      // onChangeValue(line.id, {
                      //   item_weight_filling_standard: data,
                      // });
                    }}
                    style={{ width: "100%" }}
                    size="small"
                  />
                </Col>
                <Col span={3} className="text-center">
                  {/* std. unit */}
                  <CustomSelect
                    style={{ width: "100%" }}
                    size="small"
                    placeholder="uom"
                  />
                </Col>
                <Col span={5} className="text-center">
                  <InputNumber
                    {...numberFormat}
                    name="item_weight_filling_min"
                    placeholder="Min"
                    // value={line.item_weight_filling_min}
                    defaultValue={0.0}
                    min={0.0001}
                    // max={100.0}
                    step={1.0}
                    onChange={(data) => {
                      console.log(data);
                      // onChangeValue(line.id, {
                      //   item_weight_filling_min: data,
                      // });
                    }}
                    style={{ width: "100%" }}
                    size="small"
                  />
                </Col>
                <Col span={3} className="text-center">
                  {/* std. unit */}
                  <CustomSelect style={{ width: "100%" }} size="small" />
                </Col>
                <Col span={5} className="text-center">
                  <InputNumber
                    {...numberFormat}
                    name="item_weight_filling_max"
                    placeholder="Max"
                    // value={line.item_weight_filling_max}
                    defaultValue={0.0}
                    min={0.0001}
                    // max={100.0}
                    step={1.0}
                    onChange={(data) => {
                      console.log(data);
                      // onChangeValue(line.id, {
                      //   item_weight_filling_max: data,
                      // });
                    }}
                    style={{ width: "100%" }}
                    size="small"
                  />
                </Col>
                <Col span={3} className="text-center">
                  {/* std. unit */}
                  <CustomSelect style={{ width: "100%" }} size="small" />
                </Col>
              </Row>
            </Col>
            <Col span={2}></Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row className="col-2 row-margin-vertical">
            <Col span={2}></Col>
            <Col span={6}>{/* Right Col */}</Col>
            <Col span={16}>{/* LEFT Col */}</Col>
          </Row>
          <Row className="col-2 row-tab-margin"></Row>
          <Row className="col-2 row-margin-vertical">
            <Col span={2}></Col>
            <Col span={6}>{/* Right Col */}</Col>
            <Col span={16}>{/* LEFT Col */}</Col>
          </Row>
        </Col>
      </Row>
      <Row
        className="col-2 row-tab-margin-lg"
        style={{
          borderBottom: "1px solid #E5E5E5",
          paddingBottom: 10,
        }}
      >
        <Col span={24}>
          <Text strong className="detail-tab-header">
            Filling Process
          </Text>
        </Col>
      </Row>
      <Row className="col-2 row-tab-margin">
        {/* PackagingProcess */}
        <Col span={24}>
          <PackagingProcess
            data_detail={data_detail}
            detailDispatch={detailDispatch}
          />
        </Col>
      </Row>
    </>
  );
};

export default TabFillingProcess;
