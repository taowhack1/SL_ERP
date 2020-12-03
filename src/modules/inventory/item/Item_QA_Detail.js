import {
  Button,
  Row,
  Col,
  InputNumber,
  AutoComplete,
  Typography,
  Input,
  Space,
} from "antd";
import {
  DeleteTwoTone,
  PlusOutlined,
  EllipsisOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import numeral from "numeral";
import { item_qa_columns, item_qa_detail_fields } from "../config/item";
import CustomSelect from "../../../components/CustomSelect";
import { convertDigit } from "../../../include/js/main_config";

const { Text } = Typography;

const ItemQADetail = ({ readOnly, data_qa_detail, qaDetailDispatch }) => {
  const {
    test_case_subject,
    test_case_specification,
    test_case_method,
  } = useSelector((state) => state.qa.qa_master_data);
  const vendors = useSelector((state) => state.purchase.vendor.vendor_list);
  const addLine = () => {
    qaDetailDispatch({ type: "ADD_ROW", payload: item_qa_detail_fields });
  };

  const delLine = (id) => {
    qaDetailDispatch({ type: "DEL_ROW", payload: { id: id } });
  };

  const onChangeValue = (rowId, data) => {
    qaDetailDispatch({
      type: "CHANGE_DETAIL_VALUE",
      payload: {
        id: rowId,
        data: data,
      },
    });
  };
  console.log(data_qa_detail);
  return (
    <>
      <Row className="col-2 row-margin-vertical detail-tab-row">
        <Col span={24}>
          <Space>
            <Text strong style={{ fontSize: 16, marginRight: 10 }}>
              {/* <span className="require">* </span> */}
              <ProfileOutlined style={{ marginRight: 10 }} />
              QA Test Case
            </Text>
          </Space>
        </Col>
      </Row>
      {/* Column Header */}
      <Row gutter={2} className="detail-table-head">
        {item_qa_columns &&
          item_qa_columns.map((col, key) => {
            return (
              <Col key={col.id} span={col.size} className="col-outline">
                {col.require && !readOnly && (
                  <span className="require">* </span>
                )}
                <Text strong>{col.name}</Text>
              </Col>
            );
          })}

        <Col span={1} className="col-outline">
          <Text strong>
            <EllipsisOutlined />
          </Text>
        </Col>
      </Row>
      {!readOnly ? (
        <>
          {/* Edit Form */}
          {data_qa_detail.map((line, key) => (
            <Row
              key={line.id}
              style={{
                marginBottom: 0,
                border: "1px solid white",
                backgroundColor: "#FCFCFC",
              }}
              name={`row-${key}`}
              gutter={6}
              className="col-2"
            >
              <Col span={6} className="text-string">
                <CustomSelect
                  allowClear
                  showSearch
                  size={"small"}
                  placeholder={"Subject"}
                  name="qa_subject_id"
                  field_id="qa_subject_id"
                  field_name="qa_subject_name"
                  value={line.qa_subject_name}
                  data={test_case_subject}
                  onChange={(data, option) => {
                    data && data
                      ? onChangeValue(line.id, {
                          qa_subject_id: option.data.qa_subject_id,
                          qa_subject_name: option.data.qa_subject_name,
                        })
                      : onChangeValue(line.id, {
                          qa_subject_id: null,
                          qa_subject_name: null,
                        });
                  }}
                />
              </Col>
              <Col span={6} className="text-string">
                <CustomSelect
                  allowClear
                  showSearch
                  size={"small"}
                  placeholder={"Specification"}
                  name="qa_specification_id"
                  field_id="qa_specification_id"
                  field_name="qa_specification_name"
                  value={line.qa_specification_name}
                  data={test_case_specification}
                  onChange={(data, option) => {
                    data && data
                      ? onChangeValue(line.id, {
                          qa_specification_id: option.data.qa_specification_id,
                          qa_specification_name:
                            option.data.qa_specification_name,
                        })
                      : onChangeValue(line.id, {
                          qa_specification_id: null,
                          qa_specification_name: null,
                        });
                  }}
                />
              </Col>
              <Col span={5} className="text-string">
                <CustomSelect
                  allowClear
                  showSearch
                  size={"small"}
                  placeholder={"Method"}
                  name="qa_method_id"
                  field_id="qa_method_id"
                  field_name="qa_method_name"
                  value={line.qa_method_name}
                  data={test_case_method}
                  onChange={(data, option) => {
                    data && data
                      ? onChangeValue(line.id, {
                          qa_method_id: option.data.qa_method_id,
                          qa_method_name: option.data.qa_method_name,
                        })
                      : onChangeValue(line.id, {
                          qa_method_id: null,
                          qa_method_name: null,
                        });
                  }}
                />
              </Col>
              <Col span={6} className="text-string">
                <Input
                  name="item_qa_remark"
                  size="small"
                  placeholder={"Remark"}
                  onChange={(e) =>
                    onChangeValue(line.id, { item_qa_remark: e.target.value })
                  }
                  value={line.item_qa_remark}
                />
              </Col>

              <Col span={1} style={{ textAlign: "center" }}>
                <DeleteTwoTone onClick={() => delLine(line.id)} />
              </Col>
            </Row>
          ))}
          <div style={{ marginTop: 10 }}>
            <Button
              type="dashed"
              onClick={() => {
                addLine();
              }}
              block
            >
              <PlusOutlined /> Add a line
            </Button>
          </div>
        </>
      ) : (
        <>
          {/* View Form */}
          {data_qa_detail.map((line, key) => (
            <Row
              key={line.id}
              style={{
                marginBottom: 0,
                border: "1px solid white",
                backgroundColor: "#FCFCFC",
              }}
              gutter={6}
              className="col-2"
            >
              <Col span={6} className="text-string">
                <Text>{line.qa_subject_name}</Text>
              </Col>
              <Col span={6} className="text-string">
                <Text>{line.qa_specification_name}</Text>
              </Col>
              <Col span={5} className="text-string">
                <Text>{line.qa_method_name}</Text>
              </Col>
              <Col span={6} className="text-string">
                <Text>{line.item_qa_remark}</Text>
              </Col>
            </Row>
          ))}
        </> //close tag
      )}
      {/* end readonly */}
    </>
  );
};

export default ItemQADetail;
