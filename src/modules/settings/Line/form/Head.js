/** @format */

import { Col, Input, Row } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import CustomLabel from "../../../../components/CustomLabel";
import TextArea from "antd/lib/input/TextArea";
const readOnly = false;
const Head = () => {
  return (
    <>
      <Row className='col-2 row-margin-vertical' gutter={[24, 8]}>
        <Col span={12}>
          <Row className='col-2 row-margin-vertical'>
            <Col span={8}>
              <CustomLabel label='Create By (Auto Field):' require />
            </Col>
            <Col span={16}>
              {readOnly ? (
                <Text className='pre-wrap'></Text>
              ) : (
                <>{/* input here */}</>
              )}
            </Col>
          </Row>
          <Row className='col-2 row-margin-vertical'>
            <Col span={8}>
              <CustomLabel label='ชื่อการแจ้งเตือน :' />
            </Col>
            <Col span={16}>
              {readOnly ? (
                <Text className='pre-wrap'></Text>
              ) : (
                <>
                  <>{/* input here */}</>
                </>
              )}
            </Col>
          </Row>
          <Row className='col-2 row-margin-vertical'>
            <Col span={8}>
              <CustomLabel label='หัวข้อการแจ้งเตือน :' />
            </Col>
            <Col span={16}>
              {readOnly ? (
                <Text className='pre-wrap'></Text>
              ) : (
                <>
                  <>{/* input here */}</>
                </>
              )}
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row className='col-2 row-margin-vertical'>
            <Col span={6}>
              <CustomLabel label='Col2 :' />
            </Col>
            <Col span={16}>
              {readOnly ? (
                <Text className='pre-wrap'>{}</Text>
              ) : (
                <>
                  <>{/* input here */}</>
                </>
              )}
            </Col>
          </Row>
          <Row className='col-2 row-margin-vertical'>
            <Col span={6}>
              <CustomLabel label='Col2 :' />
            </Col>
            <Col span={16}>
              {readOnly ? (
                <Text className='pre-wrap'>{}</Text>
              ) : (
                <>
                  <>{/* input here */}</>
                </>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Head;
