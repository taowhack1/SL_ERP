import { Input, Row } from "antd";
import Form from "antd/lib/form/Form";
import Text from "antd/lib/typography/Text";
import React, { useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
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
const ModalQCTestCaseForm = (props) => {
  const auth = useSelector((state) => state.auth.authData);
  const { fields, data_head, type } = props;
  const item_type_list = useSelector(
    (state) => state.inventory.master_data.item_type
  );
  const [state, setState] = useState({
    [fields[0]]: null,
    [fields[1]]: null,
  });
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
  const upDateFormValue = (data) => {
    // headDispatch({ type: "CHANGE_HEAD_VALUE", payload: data });
    setState({ ...state, ...data });
  };
  useEffect(() => {
    setState({ [fields[0]]: null, [fields[1]]: null });
  }, [fields]);
  console.log(state);
  return (
    <>
      <Row className="col-2 row-margin-vertical">
        <Text strong>
          <span className="require">* </span>Item Type
        </Text>
      </Row>
      <Row className="col-2 row-margin-vertical">
        <CustomSelect
          allowClear
          showSearch
          placeholder={"Item type"}
          name="type_id"
          field_id="type_id"
          field_name="type_name"
          value={data_head.type_name}
          data={item_type_list}
          onChange={(data, option) => {
            data && data
              ? upDateFormValue({
                  type_id: data,
                  type_no: option.data.type_no,
                  type_name: option.title,
                  commit: 1,
                  user_name: auth.user_name,
                  branch_id: auth.branch_id,
                })
              : upDateFormValue({
                  type_id: null,
                  type_no: null,
                  type_name: null,
                  commit: 0,
                  user_name: null,
                  branch_id: null,
                });
          }}
        />
      </Row>
      {/* {getSelectRef(type)} */}
      <Row className="col-2 row-margin-vertical">
        <Text strong>
          <span className="require">* </span>Name
        </Text>
      </Row>
      <Row className="col-2 row-margin-vertical">
        <Input
          name={fields[0]}
          onChange={(e) =>
            upDateFormValue({
              [fields[0]]: e.target.value,
            })
          }
          value={state[fields[0]]}
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
            upDateFormValue({
              [fields[1]]: e.target.value,
            })
          }
          value={state[fields[1]]}
          placeholder="Description"
        />
      </Row>
    </>
  );
};

export default React.memo(ModalQCTestCaseForm);
