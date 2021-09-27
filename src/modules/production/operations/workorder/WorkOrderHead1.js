/** @format */
import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Input, Typography } from "antd";
import CustomSelect from "../../../../components/CustomSelect";
import { useSelector } from "react-redux";
import { WOContext } from "../../../../include/js/context";
const { Text } = Typography;
const WorkOrderHead1 = () => {
  const [readOnly, setreadOnly] = useState(false);
  return (
    <>
      <Row className='col-2'>
        <Col span={24}>
          <h3>
            <strong>Description / Job Name.</strong>
          </h3>
          <Col span={24}>
            {readOnly ? (
              <Text className='text-value text-left'></Text>
            ) : (
              <Input
                name='wo_description'
                required
                placeholder={"Description / Job Name."}
              />
            )}
          </Col>
          <Row className='col-2 mt-2' gutter={[32, 0]}>
            <Col span={12}>
              <Row className='col-2 row-margin-vertical'>
                <Col span={6}>
                  <Text strong>MRP Document :</Text>
                </Col>
                <Col span={18}>
                  {/* data_so_ref */}
                  {readOnly ? (
                    <Text className='text-value text-left'></Text>
                  ) : (
                    <CustomSelect
                      allowClear
                      showSearch
                      // size={"small"}
                      placeholder={"MRP Document"}
                      name='mrp_id'
                      field_id='mrp_id'
                      field_name='mrp_no_description'
                    />
                  )}
                </Col>
              </Row>
              <Row className='col-2 row-margin-vertical'>
                <Col span={6}>
                  <Text strong>Due Date :</Text>
                </Col>
                <Col span={18}>
                  <Text className='text-view'></Text>
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row className='col-2 row-margin-vertical'>
                <Col span={6}>
                  <Text strong>
                    {!readOnly && <span className='require'>* </span>}
                    FG Item :
                  </Text>
                </Col>
                <Col span={18}>
                  {readOnly ? (
                    <Text className='text-value text-left'></Text>
                  ) : (
                    <CustomSelect
                      allowClear
                      showSearch
                      // size={"small"}
                      placeholder={"FG Item"}
                      name='item_id'
                      field_id='so_detail_id'
                      field_name='item_no_name'
                    />
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default React.memo(WorkOrderHead1);
