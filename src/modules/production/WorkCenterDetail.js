import {
  DeleteTwoTone,
  EllipsisOutlined,
  PlusOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { Button, Col, Input, InputNumber, Row } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import { useSelector } from "react-redux";
import CustomSelect from "../../components/CustomSelect";
import { numberFormat } from "../../include/js/main_config";
import {
  work_center_detail_columns,
  work_center_detail_fields,
} from "./config/master_data";

const WorkCenterDetail = ({ data_detail, detailDispatch, readOnly }) => {
  const { machineList } = useSelector((state) => state.production.machine);
  const addLine = () => {
    detailDispatch({
      type: "ADD_ROW",
      payload: work_center_detail_fields,
    });
  };

  const delLine = (id) => {
    detailDispatch({ type: "DEL_ROW", payload: { id: id } });
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
  return (
    <>
      <Row className="col-2 detail-tab-row">
        <Col span={24}>
          <Text strong style={{ fontSize: 16 }}>
            <ProfileOutlined style={{ marginRight: 10 }} /> Machine or Tool
          </Text>
        </Col>
      </Row>
      <div className="detail-form">
        <Row gutter={2} className="detail-table-head">
          {work_center_detail_columns &&
            work_center_detail_columns.map((col, key) => {
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
            {data_detail.length > 0 &&
              data_detail.map((line, key) => (
                <Row
                  key={key}
                  style={{
                    margin: "0px 1px",
                    backgroundColor: "#FCFCFC",
                  }}
                  name={`row-${key}`}
                  gutter={3}
                  className="form-row"
                >
                  <Col span={1} className="text-center">
                    {key + 1}
                  </Col>
                  <Col span={12} className="text-left">
                    <CustomSelect
                      allowClear
                      showSearch
                      size="small"
                      placeholder={"Select Machine"}
                      name="machine_no_name"
                      field_id="machine_id"
                      field_name="machine_no_name"
                      value={line.machine_no_name}
                      data={machineList}
                      onChange={(data, option) => {
                        data && data
                          ? onChangeValue(line.id, {
                              machine_id: option.data.machine_id,
                              machine_no_name: option.data.machine_no_name,
                            })
                          : onChangeValue(line.id, {
                              machine_id: null,
                              machine_no_name: null,
                            });
                      }}
                    />
                  </Col>
                  <Col span={10} className="text-left">
                    <Input
                      name="work_center_detail_remark"
                      size="small"
                      placeholder={"Remark"}
                      onChange={(e) =>
                        onChangeValue(line.id, {
                          work_center_detail_remark: e.target.value,
                        })
                      }
                      value={line.work_center_detail_remark}
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
            {data_detail.length > 0 &&
              data_detail.map((line, key) => (
                <Row
                  key={key}
                  style={{
                    marginBottom: 0,
                    border: "1px solid white",
                    backgroundColor: "#FCFCFC",
                  }}
                  gutter={6}
                  className="col-2"
                >
                  <Col span={1} className="text-center">
                    <Text>{key + 1}</Text>
                  </Col>
                  <Col span={12}>
                    <Text className="text-left">
                      {line.machine_no_name ?? "-"}
                    </Text>
                  </Col>
                  <Col span={10}>
                    <Text className="text-left">
                      {line.work_center_detail_remark ?? "-"}
                    </Text>
                  </Col>
                </Row>
              ))}
          </> //close tag
        )}
      </div>
      {/* end readonly */}
    </>
  );
};

export default WorkCenterDetail;
