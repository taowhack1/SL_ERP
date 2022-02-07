/** @format */

import {
  ClearOutlined,
  LoadingOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Row, Col } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomSelect from "../../../../components/CustomSelect";
const SearchTableWhereUse = (props = []) => {
  console.log("props SearchTableWhereUse:>> ", props);
  const {
    inputName,
    placeholder,
    field_id,
    field_name,
    type_id,
    listDataItem,
    onChangeItem,
    state,
  } = props && props.data;
  // const inputName = (props && props.inputName) || "";
  // const placeholder = (props && props.placeholder) || "";
  // const field_id = (props && props.field_id) || "";
  // const field_name = (props && props.field_name) || "";
  // const listDataItem = (props && props.listDataItem) || [];
  // const onChangeItem = (props && props.onChangeItem) || "";
  // const state = (props && props.state) || [];
  const filter =
    props.data &&
    listDataItem &&
    listDataItem.filter((data) => data.type_id == type_id);
  console.log("filter :>> ", filter);
  const reset_state = () => {
    onChangeItem({ item_id: null, type_id });
  };

  return (
    <>
      <div className='search-table'>
        <Row className='search-header'>
          <Text className='search-title' strong>
            <SearchOutlined style={{ marginRight: 10, size: "20px" }} />
            Search Tool.
          </Text>
        </Row>
        <Row>
          <Col span={2}></Col>
          <Col span={2}>
            <Text strong>{`${inputName}`}:</Text>
          </Col>
          <Col span={8}>
            <CustomSelect
              allowClear
              showSearch
              placeholder={placeholder}
              field_id={field_id}
              field_name={field_name}
              data={filter}
              value={type_id == 1 ? state.RM : state.PK}
              onChange={(data, option) => {
                data !== undefined
                  ? onChangeItem({
                      item_id: data,
                      type_id,
                    })
                  : onChangeItem({ item_id: null });
              }}
            />
          </Col>
          <Col span={1}></Col>
          <Col span={4}>
            {" "}
            <Button
              className='search-button'
              danger
              icon={<ClearOutlined />}
              onClick={reset_state}>
              Clear Search
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default React.memo(SearchTableWhereUse);
