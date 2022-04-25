/** @format */

import {
  ClearOutlined,
  LoadingOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Row, Col, DatePicker, Checkbox } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSVLink, CSVDownload } from "react-csv";
import { ExcelFile, ExcelSheet } from "react-export-excel";
import CustomSelect from "../../../../components/CustomSelect";
import ExportCSV from "./exportExcel";
const { RangePicker } = DatePicker;
const moment = require("moment");
const SearchTableItemBalance = (props = []) => {
  const [type, setType] = useState("find");
  console.log("props:>> ", props);
  const {
    setMainState,
    mainState,
    type_id = 1,
    onChangeItem = () => {},
    typeButtonSubmit,
    listItemBalance,
    ItemBalanceLoading,
    listDataItem,
    ItemLoading,
    setlistItemBalance,
  } = props && props.data;
  const reset_state = () => {
    changeState({
      item_id: null,
      date_start: null,
      date_end: null,
      isBalanceZero: null,
    });
    setlistItemBalance([]);
  };
  const changeState = (stateKeyValue) => {
    setMainState({
      ...mainState,
      ...stateKeyValue,
    });
  };
  const button_type = (type) => {
    if (type == "find") {
      setType("find");
      typeButtonSubmit("find");
    } else {
      setType("findDetail");
      typeButtonSubmit("findDetail");
    }
  };
  console.log("type :>> ", type);
  const data_export = (data) => {
    return (
      <>
        <fieldset disabled={listItemBalance.length > 0 ? false : true}>
          <ExportCSV
            csvData={listItemBalance.length > 0 ? listItemBalance : []}
            fileName='item_balance'
            type={type}
          />
        </fieldset>
      </>
    );
  };
  console.log("listItemBalance props:>> ", listItemBalance);
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
            <Text strong>{`Date`}:</Text>
          </Col>
          <Col span={4}>
            <RangePicker
              name='stock_card_date_start'
              className='full-width'
              format={"DD/MM/YYYY"}
              value={[
                mainState.date_start
                  ? moment(mainState.date_start, "YYYY-MM-DD")
                  : "",
                mainState.date_end
                  ? moment(mainState.date_end, "YYYY-MM-DD")
                  : "",
              ]}
              onChange={(data) => {
                data
                  ? changeState({
                      date_start: data[0].format("YYYY-MM-DD"),
                      date_end: data[1].format("YYYY-MM-DD"),
                    })
                  : changeState({
                      date_start: null,
                      date_end: null,
                    });
              }}
            />
          </Col>
          <Col span={1}></Col>
          <Col span={1}>
            <Text strong>{`Item`}:</Text>
          </Col>
          <Col span={6}>
            <CustomSelect
              allowClear
              showSearch
              datas
              placeholder={"Item"}
              field_id={"item_id"}
              field_name={"item_no_name"}
              data={listDataItem}
              value={mainState.item_id}
              onChange={(data, option) => {
                data !== undefined
                  ? changeState({
                      item_id: data,
                    })
                  : changeState({ item_id: null });
              }}
            />
          </Col>
          <Col span={1}></Col>
          <Col span={2}>
            <Button
              type='primary'
              className='search-button'
              name='find'
              icon={<SearchOutlined style={{ marginRight: 5, size: "20px" }} />}
              onClick={() => button_type("find")}>
              ค้นหา
            </Button>
          </Col>
        </Row>
        <Row style={{ marginTop: 10 }}>
          <Col span={2}></Col>
          <Col span={2}></Col>
          <Col span={4}>
            <Checkbox
              name='isBalanceZero'
              checked={mainState.isBalanceZero}
              onChange={(e) => {
                e.target.checked
                  ? changeState({
                      isBalanceZero: 1,
                    })
                  : changeState({
                      isBalanceZero: 0,
                    });
              }}>
              ไม่แสดงยอดที่เป็น 0
            </Checkbox>
          </Col>
          <Col span={1}></Col>
          <Col span={1}></Col>
          <Col span={2}>
            <p>{data_export(listItemBalance)} </p>
            {/* <>
              <fieldset disabled={listItemBalance.length > 0 ? false : true}>
                <ExportCSV
                  csvData={listItemBalance}
                  fileName='item_balance'
                  type={type}
                />
              </fieldset>
            </> */}
          </Col>
          <Col span={1}></Col>
          <Col span={3}>
            {" "}
            <Button
              className='search-button'
              danger
              icon={<ClearOutlined />}
              onClick={reset_state}>
              Clear Search
            </Button>
          </Col>
          <Col span={1}></Col>
          <Col span={2}>
            <Button
              type='primary'
              className='search-button'
              name='findDetail'
              style={{ fontsize: "8px" }}
              icon={<SearchOutlined style={{ marginRight: 3, size: "20px" }} />}
              onClick={() => button_type("findDetail")}>
              ค้นหาแบบละเอียด
            </Button>
          </Col>
        </Row>
        <Row style={{ marginTop: 10 }}>
          <Col span={2}></Col>
          <Col span={2}></Col>
          <Col span={4}></Col>
          <Col span={1}></Col>
          <Col span={1}></Col>
          <Col span={6}></Col>
          <Col span={1}></Col>
          <Col span={2}>
            {/* <p>{listItemBalance && data_export(listItemBalance)} </p> */}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default React.memo(SearchTableItemBalance);
