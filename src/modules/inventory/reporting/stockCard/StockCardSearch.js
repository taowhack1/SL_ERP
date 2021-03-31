/** @format */
import { ClearOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Row, Col, DatePicker } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomSelect from "../../../../components/CustomSelect";
const StockCardSearch = () => {
  return (
    <>
      <div className='search-table'>
        <Row className='search-header'>
          <Text className='search-title' strong>
            <SearchOutlined style={{ marginRight: 10, size: "20px" }} />
            Search Tool. Stock Card
          </Text>
        </Row>
        <Row className='col-2 row-margin-vertical'>
          <Col span={2}></Col>
          <Col span={2}>
            <Text strong>Item type :</Text>
          </Col>
          <Col span={4}>
            <CustomSelect
              allowClear
              showSearch
              placeholder={"item type"}
              field_id='item_type'
              field_name='item_type_no_name'
            />
          </Col>
          <Col span={1}></Col>
          <Col span={2}>
            <Text strong>Planned Date :</Text>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default React.memo(StockCardSearch);
