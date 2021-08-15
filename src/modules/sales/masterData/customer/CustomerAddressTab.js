/** @format */

import {
  DeleteTwoTone,
  EllipsisOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Col, Input, Row } from "antd";
import React, { useEffect } from "react";
import {
  addressColumns,
  addressData,
  CustomerDetailFileds,
} from "../../configs/customer";
import Text from "antd/lib/typography/Text";
import CustomSelect from "../../../../components/CustomSelect";
import TextArea from "antd/lib/input/TextArea";
import { Switch } from "antd";
const CustomerAddressTab = ({
  dataDetail,
  detailDispatch,
  readOnly,
  user_name,
}) => {
  const addLine = () => {
    detailDispatch({
      type: "ADD_ROW",
      payload: { ...CustomerDetailFileds, user_name: user_name },
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
  console.log("dataDetail_in", dataDetail);
  return (
    <>
      <div className="detail-form">
        <Row gutter={2} className="detail-table-head">
          {addressColumns &&
            addressColumns.map((col, key) => {
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
            {dataDetail.length > 0 &&
              dataDetail.map((line, key) => (
                <Row className="form-row" key={key} name={`row-${key}`}>
                  <Col span={1} className="text-center">
                    {key + 1}
                  </Col>
                  <Col span={3} className="text-left">
                    <CustomSelect
                      data={addressData}
                      style={{ width: "100%" }}
                      field_id="address_type_id"
                      field_name="address_type_name"
                      name="address_type_id"
                      placeholder="Select Category"
                      value={line.address_type_id}
                      onChange={(data, option) => {
                        data && data
                          ? onChangeValue(line.id, {
                              address_type_id: data,
                            })
                          : onChangeValue(line.id, {
                              address_type_id: null,
                            });
                      }}
                    />
                  </Col>
                  <Col span={9} className="text-left">
                    <TextArea
                      name="customer_detail_address"
                      autoSize={{ minRows: 1, maxRows: 2 }}
                      placeholder="Enter Address"
                      value={line.customer_detail_address}
                      onChange={(e) => {
                        onChangeValue(line.id, {
                          customer_detail_address: e.target.value,
                        });
                      }}
                    ></TextArea>
                  </Col>
                  <Col span={6} className="text-left">
                    <Input
                      name="customer_detail_name"
                      placeholder="Contact Name"
                      value={line.customer_detail_name}
                      onChange={(e) => {
                        onChangeValue(line.id, {
                          customer_detail_name: e.target.value,
                        });
                      }}
                    />
                  </Col>
                  <Col span={4} className="text-left">
                    <Input
                      name="customer_detail_mobile"
                      placeholder="Contact Phone No."
                      value={line.customer_detail_mobile}
                      onChange={(e) => {
                        onChangeValue(line.id, {
                          customer_detail_mobile: e.target.value,
                        });
                      }}
                    />
                  </Col>
                  {/* <Col span={4} className="text-center">
                    <Switch
                      name="customer_detail_actived"
                      checkedChildren="Active"
                      unCheckedChildren="In Active"
                      defaultChecked={
                        line.customer_detail_actived ? true : false
                      }
                      onChange={(e) => {
                        onChangeValue(line.id, { customer_detail_actived: e });
                      }}
                    />
                  </Col> */}
                  <Col span={1} style={{ textAlign: "center" }}>
                    <DeleteTwoTone onClick={(e) => delLine(line.id)} />
                  </Col>
                </Row>
              ))}
            <div style={{ marginTop: 10 }}>
              <Button
                type="dashed"
                block
                onClick={() => {
                  addLine();
                }}
              >
                <PlusOutlined />
                Add a line
              </Button>
            </div>
          </>
        ) : (
          <>
            {dataDetail.length > 0 &&
              dataDetail.map((line, key) => (
                <Row
                  className="form-row"
                  key={key}
                  name={`row-${key}`}
                  gutter={3}
                >
                  <Col span={1} className="text-center">
                    {key + 1}
                  </Col>
                  <Col span={3} className="text-left">
                    <Text>{line?.address_type_name}</Text>
                  </Col>
                  <Col span={9} className="text-left">
                    <Text className="pre-wrap">
                      {line?.customer_detail_address}
                    </Text>
                  </Col>
                  <Col span={6} className="text-left">
                    <Text className="pre-wrap">
                      {line?.customer_detail_name}
                    </Text>
                  </Col>
                  <Col span={4} className="text-left">
                    <Text className="pre-wrap">
                      {line?.customer_detail_mobile}
                    </Text>
                  </Col>
                  {/* <Col span={4} className="text-center">
                    <Switch
                      checkedChildren="Active"
                      unCheckedChildren="In Active"
                      disabled
                      defaultChecked={
                        line.customer_detail_actived ? true : false
                      }
                    />
                  </Col> */}
                </Row>
              ))}
          </>
        )}
      </div>
    </>
  );
};

export default React.memo(CustomerAddressTab);
