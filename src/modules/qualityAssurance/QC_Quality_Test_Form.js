import { Input, Row } from "antd";
import Form from "antd/lib/form/Form";
import Text from "antd/lib/typography/Text";
import React, { useReducer } from "react";
import CustomSelect from "../../components/CustomSelect";
import { reducer } from "./reducers";
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
};
const TestForm = (props) => {
  const { fields, data_head, type } = props;
  const [fromData, fromDispatch] = useReducer(reducer, {});
  console.log(props);
  const getSelectRef = (qualityType = 0) => {
    switch (type) {
      case 1:
        return null;
      case 2:
        return (
          <>
            <Row className="col-2 row-margin-vertical">
              <Text strong>
                <span className="require">* </span>Subject
              </Text>
            </Row>
            <Row className="col-2 row-margin-vertical">
              <CustomSelect placeholder={"Subject"}></CustomSelect>
            </Row>
          </>
        );
      case 3:
        return (
          <>
            <Row className="col-2 row-margin-vertical">
              <Text strong>
                <span className="require">* </span>Specification
              </Text>
            </Row>
            <Row className="col-2 row-margin-vertical">
              <CustomSelect placeholder={"Specification"}></CustomSelect>
            </Row>
          </>
        );
      default:
        return null;
    }
  };
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onChangeValue = (data) => {
    fromDispatch({
      type: "UPDATE_HEAD_VALUE",
      payload: data,
    });
  };

  return (
    <>
      {getSelectRef(type)}
      <Row className="col-2 row-margin-vertical">
        <Text strong>
          <span className="require">* </span>Name
        </Text>
      </Row>
      <Row className="col-2 row-margin-vertical">
        <Input
          name={fields[0]}
          onChange={(e) =>
            onChangeValue({
              [fields[0]]: e.target.value,
            })
          }
          value={data_head[fields[0]]}
          placeholder="Name"
        />
      </Row>
      <Row className="col-2 row-margin-vertical">
        <Text strong>Description</Text>
      </Row>
      <Row className="col-2 row-margin-vertical">
        <Input
          name={fields[1]}
          onChange={(e) =>
            onChangeValue({
              [fields[1]]: e.target.value,
            })
          }
          value={data_head[fields[1]]}
          placeholder="Description"
        />
      </Row>
    </>
  );
};

export default TestForm;
