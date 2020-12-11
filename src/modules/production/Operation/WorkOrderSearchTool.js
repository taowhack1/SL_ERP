import { ClearOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Row, Typography, Col, DatePicker } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomSelect from "../../../components/CustomSelect";
import Search from "../../../components/Search";
const { RangePicker } = DatePicker;
const WorkOrderSearchTool = (props) => {
  const master_data = useSelector((state) => state.inventory.master_data);
  const [state, setState] = useState({
    type_id: null,
    type_no_name: null,
    category_id: null,
    category_no_name: null,
    search_text: "",
  });
  const changeState = (stateKeyValue, stateKey) => {
    setState({
      ...state,
      ...stateKeyValue,
    });
  };
  const changeSearchBox = (value) => {
    setState({
      ...state,
      search_text: value,
    });
  };
  const reset_state = () => {
    setState({
      type_id: null,
      type_no_name: null,
      category_id: null,
      category_no_name: null,
      search_text: "",
    });
  };
  useEffect(() => {
    console.log("Search", state);
    props.onChangeSeach && props.onChangeSeach(state);
  }, [state]);
  return (
    <>
      <div className="search-table">
        <Row className="search-header">
          <Text className="search-title" strong>
            <SearchOutlined style={{ marginRight: 10, size: "20px" }} />
            Search Tool.
          </Text>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={2}></Col>
          <Col span={2}>
            <Text strong>Work Order Code :</Text>
          </Col>
          <Col span={8}>
            <CustomSelect
              allowClear
              showSearch
              placeholder={"Work order code"}
              field_id="type_id"
              field_name="type_no_name"
              value={state.type_no_name}
              data={master_data.item_type}
              onChange={(data, option) => {
                data && data
                  ? changeState({
                      type_id: data,
                      type_no_name: option.title,
                      category_id: null,
                      category_no_name: null,
                    })
                  : reset_state();
              }}
            />
          </Col>
          <Col span={1}></Col>

          <Col span={2}>
            <Text strong>Planned Date :</Text>
          </Col>
          <Col span={8}>
            <RangePicker className="full-width" />
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={2}></Col>
          <Col span={2}>
            <Text strong>Item Name :</Text>
          </Col>
          <Col span={8}>
            <CustomSelect
              // size="small"
              allowClear
              showSearch
              // disabled={disable_category}
              placeholder={"Item name"}
              field_id="category_id"
              field_name="category_no_name"
              value={state.category_no_name}
              data={
                state.type_id
                  ? master_data.item_category.filter(
                      (categ) => categ.type_id === state.type_id
                    )
                  : master_data.item_category
              }
              onChange={(data, option) => {
                data && data
                  ? changeState({
                      type_id: option.data.type_id,
                      type_no_name: option.data.type_no_name,
                      category_id: data,
                      category_no_name: option.title,
                    })
                  : changeState({
                      category_id: null,
                      category_no_name: null,
                    });
              }}
            />
          </Col>

          <Col span={1}></Col>
          <Col span={2}>
            <Text strong>Deadline :</Text>
          </Col>
          <Col span={8}>
            <RangePicker className="full-width" />
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={4}></Col>
          <Col span={8}>
            <Search
              onSearch={changeSearchBox}
              search={state.search_text}
              // search={search}
              // loading={loading}
            />
          </Col>

          <Col span={1}></Col>
          <Col span={2}>
            <Button
              className="search-button"
              danger
              icon={<ClearOutlined />}
              onClick={reset_state}
            >
              Clear Search
            </Button>
          </Col>
          <Col span={8}></Col>
        </Row>
      </div>
    </>
  );
};

export default React.memo(WorkOrderSearchTool);
