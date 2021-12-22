/** @format */

import { ClearOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Row, Col } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterItem } from "../../actions/inventory";
import CustomSelect from "../../components/CustomSelect";
import Search from "../../components/Search";

const SO_SearchTable = (props) => {
  const dispatch = useDispatch();
  const master_data = useSelector((state) => state.inventory.master_data);
  const [state, setState] = useState({
    type_id: null,
    type_no_name: null,
    category_id: null,
    category_no_name: null,
    search_text: "",
    status_id: 99,
    status_name: "All",
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
    dispatch(
      filterItem({ page: 1, pageSize: 20, keyword: null, item_id: null })
    );
    setState({
      type_id: null,
      type_no_name: null,
      category_id: null,
      category_no_name: null,
      search_text: "",
      status_id: 99,
      status_name: "All",
    });
  };
  useEffect(() => {
    console.log("Search", state);
    props.onChangeSearch && props.onChangeSearch(state);
  }, [state]);
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
            <Text strong>Sales Type :</Text>
          </Col>
          <Col span={8}>
            <CustomSelect
              allowClear
              showSearch
              placeholder={"Sales Type :"}
              field_id='type_id'
              field_name='type_no_name'
              value={state.type_no_name}
              data={master_data.item_type}
              onChange={(data, option) => {
                data !== undefined
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
          <Col span={9}>
            <Search
              onSearch={changeSearchBox}
              search={state.search_text}
              // search={search}
              // loading={loading}
            />
          </Col>
        </Row>
        <Row className='row-margin-vertical'>
          <Col span={2}></Col>
          <Col span={2}>
            <Text strong>Production Type :</Text>
          </Col>
          <Col span={8}>
            <CustomSelect
              // size="small"
              allowClear
              showSearch
              // disabled={disable_category}
              placeholder={"Category"}
              field_id='category_id'
              field_name='category_no_name'
              value={state.category_no_name}
              data={
                state.type_id
                  ? master_data.item_category.filter(
                      (categ) => categ.type_id === state.type_id
                    )
                  : master_data.item_category
              }
              onChange={(data, option) => {
                data !== undefined
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
            <Button
              className='search-button'
              danger
              icon={<ClearOutlined />}
              onClick={reset_state}>
              Clear Search
            </Button>
          </Col>
          <Col span={8}></Col>
        </Row>
        <Row className='col-2'>
          <Col span={2}></Col>
          <Col span={2}>
            <Text strong>{"SO Status : "}</Text>
          </Col>
          <Col span={8}>
            <CustomSelect
              // size="small"
              allowClear
              showSearch
              // disabled={disable_category}
              placeholder={"Status"}
              field_id='status_id'
              field_name='status_name'
              value={state.status_name}
              data={[
                {
                  id: 0,
                  status_id: 99,
                  status_name: "All",
                },
                {
                  id: 1,
                  status_id: 1,
                  status_name: "Pending",
                },
                {
                  id: 2,
                  status_id: 2,
                  status_name: "Waiting",
                },
                {
                  id: 3,
                  status_id: 3,
                  status_name: "Cancel",
                },
                {
                  id: 4,
                  status_id: 4,
                  status_name: "Complete",
                },
              ]}
              onChange={(data, option) => {
                data !== undefined
                  ? changeState({
                      status_id: option.data.status_id,
                      status_name: option.data.status_name,
                    })
                  : changeState({
                      status_id: 99,
                      status_name: "All",
                    });
              }}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default React.memo(SO_SearchTable);
