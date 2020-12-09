import { Button, Row, Col, Typography, Input } from "antd";
import {
  DeleteTwoTone,
  PlusOutlined,
  EllipsisOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import React, { useEffect, useReducer } from "react";
import numeral from "numeral";
import {
  item_part_specification_detail_fields,
  item_process_specification_columns,
} from "../config/item";
import { reducer } from "../reducers";
const { Text } = Typography;

const PartSpecification = ({
  item_part_id,
  readOnly,
  data_part_detail,
  partDetailDispatch,
}) => {
  const [detail, detailDispatch] = useReducer(reducer, data_part_detail);

  const addLine = () => {
    detailDispatch({
      type: "ADD_ROW",
      payload: {
        ...item_part_specification_detail_fields,
      },
    });
  };

  const delLine = (rowId) => {
    detailDispatch({
      type: "DEL_ROW",
      payload: {
        id: rowId,
      },
    });
  };

  const onChangeValue = (rowId, data) => {
    detailDispatch({
      type: "CHANGE_DETAIL_VALUE",
      payload: {
        id: rowId,
        data: data,
      },
    });
  };

  useEffect(() => {
    !readOnly &&
      partDetailDispatch({
        type: "CHANGE_HEAD_VALUE",
        payload: {
          [item_part_id]: detail,
        },
      });
  }, [detail]);
  return (
    <>
      <Row className="col-2 row-margin-vertical  detail-tab-row">
        <Col span={7}>
          <Text strong style={{ fontSize: 16 }}>
            <ProfileOutlined style={{ marginRight: 10 }} /> Part Specification
          </Text>
        </Col>
        <Col span={6} className="text-left"></Col>
        <Col span={11} className="text-right"></Col>
      </Row>
      {/* Column Header */}
      <div className="detail-form">
        <Row gutter={2} className="detail-table-head">
          {item_process_specification_columns &&
            item_process_specification_columns.map((col, key) => {
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
            {detail.map((line, key) => (
              <Row
                key={line.id}
                style={{
                  margin: "0px 1px",
                  backgroundColor: key % 2 ? "#F8F8F8" : "#FCFCFC",
                }}
                name={`row-${key}`}
                gutter={4}
                className="form-row"
              >
                <Col span={1} className="text-center">
                  {key + 1}
                </Col>
                <Col span={14} className="text-left">
                  <Input
                    size="small"
                    placeholder="Condition"
                    name="item_part_specification_detail_condition"
                    field_id="item_part_specification_detail_condition"
                    value={line.item_part_specification_detail_condition}
                    onChange={(e) =>
                      onChangeValue(line.id, {
                        item_part_specification_detail_condition:
                          e.target.value,
                      })
                    }
                  />
                </Col>
                <Col span={8} className="text-left">
                  <Input
                    name="item_part_specification_detail_set"
                    size="small"
                    placeholder={"Set"}
                    onChange={(e) =>
                      onChangeValue(line.id, {
                        item_part_specification_detail_set: e.target.value,
                      })
                    }
                    value={line.item_part_specification_detail_set}
                  />
                </Col>

                <Col span={1} style={{ textAlign: "center" }}>
                  <DeleteTwoTone onClick={() => delLine(line.id)} />
                </Col>
              </Row>
            ))}
            <Button
              type="dashed"
              onClick={() => {
                addLine();
              }}
              style={{ borderRadius: 3, marginTop: 10 }}
              block
            >
              <PlusOutlined /> Add a line
            </Button>
          </>
        ) : (
          <>
            {/* View Form */}
            {data_part_detail.map((line, key) => (
              <Row
                key={line.id}
                style={{
                  margin: "0px 1px",
                  backgroundColor: key % 2 ? "#F8F8F8" : "#FCFCFC",
                }}
                name={`row-${key}`}
                gutter={4}
                className="form-row"
              >
                <Col span={1} className="text-center">
                  <Text className="text-value">{key + 1}</Text>
                </Col>
                <Col span={14}>
                  <Text className="text-left text-value">
                    {line.item_part_specification_detail_condition ?? "-"}
                  </Text>
                </Col>
                <Col span={8}>
                  <Text className="text-left text-value">
                    {line.item_part_specification_detail_set ?? "-"}
                  </Text>
                </Col>
              </Row>
            ))}
          </> //close tag
        )}
        {/* end readonly */}
      </div>
    </>
  );
};

export default PartSpecification;
