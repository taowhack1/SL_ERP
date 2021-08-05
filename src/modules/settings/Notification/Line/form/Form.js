/** @format */

import { Col, Row } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useContext } from "react";
import { Controller } from "react-hook-form";
import {
  InputField,
  TextAreaField,
} from "../../../../../components/AntDesignComponent";
import { AppContext } from "../../../../../include/js/context";

const Form = ({
  formArray: { fields },
  form: { control, register },
  readOnly,
  lineData,
}) => {
  const {
    auth: { user_name, employee_no_name_eng },
  } = useContext(AppContext);
  return (
    <>
      <Row gutter={[24, 8]} className='col-2 row-margin-vertical'>
        <Col span={24}>
          <Row className='col-2 mt-1 mb-1'>
            <Col span={4}>
              <Text strong>Token :</Text>
            </Col>
            <Col span={16}>
              <Controller
                name='token'
                control={control}
                render={({ field }) =>
                  InputField({
                    fieldProps: {
                      placeholder: "line Token",
                      className: "w-100",
                      ...field,
                    },
                  })
                }
              />
            </Col>
          </Row>
          <Row className='col-2 mt-1 mb-1'>
            <Col span={4}>
              <Text strong>ชื่อห้อง :</Text>
            </Col>
            <Col span={16}>
              <Controller
                name='line_room'
                control={control}
                render={({ field }) =>
                  InputField({
                    fieldProps: {
                      placeholder: "ชื่อห้อง",
                      className: "w-100",
                      ...field,
                    },
                  })
                }
              />
            </Col>
          </Row>
          <Row className='col-2 mt-1 mb-1'>
            <Col span={4}>
              <Text strong>ข้อความ :</Text>
            </Col>
            <Col span={16}>
              <Controller
                name='line_message'
                control={control}
                render={({ field }) =>
                  TextAreaField({
                    fieldProps: {
                      placeholder: "ข้อความ",
                      className: "w-100",
                      rows: 4,
                      ...field,
                    },
                  })
                }
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Form;
