/** @format */

import {
  ClearOutlined,
  LoadingOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Row, Col, Input } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterItem } from "../actions/inventory";
import CustomSelect from "./CustomSelect";
import Search from "./Search";

const SearchTable = (props) => {
  const dispatch = useDispatch();
  const master_data = useSelector((state) => state.inventory.master_data);
  const {
    pageSize,
    page,
    keyword,
    status_name,
    status_id,
    search_text,
    category_id,
    type_id,
    type_no_name,
    category_no_name,
  } = props.filter_item_list;
  const changeState = (stateKeyValue, stateKey) => {
    dispatch(filterItem({ ...stateKeyValue }));
  };
  const changeSearchBox = (value) => {
    dispatch(filterItem({ search_text: value }));
  };
  const reset_state = () => {
    dispatch(
      filterItem({
        page: 1,
        pageSize: 20,
        keyword: null,
        item_id: null,
        search_text: "",
        category_id: null,
        type_id: null,
        status_id: 99,
        status_name: "All",
        type_no_name: null,
        type_id: null,
      })
    );
  };
  useEffect(() => {
    console.log("Search ", props?.filter_item_list);
    props.onChangeSearch && props.onChangeSearch(props.filter_item_list);
  }, [props?.filter_item_list]);

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
            <Text strong>Item Type:</Text>
          </Col>
          <Col span={8}>
            <CustomSelect
              allowClear
              showSearch
              placeholder={"Item Type"}
              field_id='type_id'
              field_name='type_no_name'
              value={type_no_name}
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
              searchValue={search_text}
              //value={search_text}
              // search={search}
              // loading={loading}
            />
          </Col>
        </Row>
        <Row className='row-margin-vertical'>
          <Col span={2}></Col>
          <Col span={2}>
            <Text strong>Item Category:</Text>
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
              value={category_no_name}
              data={
                type_id
                  ? master_data.item_category.filter(
                      (categ) => categ.type_id === type_id
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
            <Text strong>{"Item Status : "}</Text>
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
              value={status_name}
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

export default React.memo(SearchTable);
