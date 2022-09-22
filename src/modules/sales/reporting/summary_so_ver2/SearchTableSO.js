/** @format */

import { ClearOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Row } from "antd";
import Text from "antd/lib/typography/Text";
import Axios from "axios";
import React from "react";
import CustomSelect from "../../../../components/CustomSelect";
import { sortData } from "../../../../include/js/function_main";
import { header_config } from "../../../../include/js/main_config";
import ExportCSV from "./ExportExcel";
const { RangePicker } = DatePicker;
const api = "/sales/report/summry_so";
const SearchTableSO = (props = []) => {
  const {
    searchPage,
    mainSOProduction,
    setmainSOProduction,
    mainSoOther,
    setmainSoOther,
  } = props.data;
  const data_export = (data) => {
    return (
      <>
        <fieldset disabled={false}>
          <ExportCSV
            csvData={
              searchPage == "Production"
                ? mainSOProduction.listDataSoProduction
                : mainSoOther.listDataSoOther
            }
            fileName={`report_so_${searchPage}`}
          />
        </fieldset>
      </>
    );
  };
  console.log(
    "SearchTables state :>> ",
    searchPage == "Production" ? mainSOProduction : mainSoOther
  );
  const onChangeState = (state) => {
    if (searchPage == "Production") {
      setmainSOProduction({
        ...mainSOProduction,
        stateData: { ...mainSOProduction.stateData, ...state },
      });
    } else {
      setmainSoOther({
        ...mainSoOther,
        stateData: { ...mainSoOther.stateData, ...state },
      });
    }
  };
  const submit = async (page) => {
    if (searchPage == "Production") {
      setmainSOProduction({
        ...mainSOProduction,
        page: page,
      });
    } else {
      setmainSoOther({
        ...mainSoOther,
        page: page,
      });
    }
    const { data: data } = await getDataListSO(page);
    if (searchPage == "Production") {
      setmainSOProduction({
        ...mainSOProduction,
        listDataSoProduction: data,
      });
    } else {
      setmainSoOther({
        ...mainSoOther,
        listDataSoOther: data,
      });
    }
  };
  const getDataListSO = (page) => {
    let saveData = {};
    if (page == "Production") {
      saveData = {};
      saveData = {
        ...mainSOProduction.stateData,
      };
    } else {
      saveData = {};
      saveData = {
        ...mainSoOther.stateData,
      };
    }
    console.log("saveData :>> ", saveData);
    // let savedata = mainState;
    // if (type !== "find") {
    //   savedata = {
    //     ...mainState,
    //     date_start: moment(mainState.date_start).format("DD-MM-yyyy"),
    //     date_end: moment(mainState.date_end).format("DD-MM-yyyy"),
    //   };
    // }
    try {
      return Axios.get(
        `${api}/${page}/${saveData.date_start}/${saveData.date_end}/${saveData.sale_oem}`,
        header_config
      )
        .then((resp) => {
          if (resp.status === 200) {
            return {
              success: true,
              data: sortData(resp.data),
              //data: resp.data,
              message: "Success",
            };
          } else {
            return { success: false, data: [], message: resp };
          }
        })
        .catch((error) => {
          console.error(error);
          if (error?.response) {
            console.error(error.response);
          }
          return { success: false, data: [], message: error };
        });
    } catch (error) {
      console.log(error);
      return { success: false, data: [], message: error };
    }
  };
  const oem = [
    { label: "Sales OEM 1", value: "OEM 1" },
    { label: "Sales OEM 2", value: "OEM 2" },
    { label: "Sales OEM 3", value: "OEM 3" },
    { label: "Sales OEM 4", value: "OEM 4" },
  ];
  return (
    <>
      <div className='search-table'>
        <Row className='search-header'>
          <Text className='search-title' strong>
            <SearchOutlined style={{ marginRight: 10, size: "20px" }} />
            Search Tool Report So {searchPage}.
          </Text>
        </Row>
        <Row>
          <Col span={4}></Col>
          {/* 2 */}
          <Col span={2}>
            <Text strong>{`Select Date`}:</Text>
          </Col>
          <Col span={4}>
            <RangePicker
              name='stock_card_date_start'
              className='full-width'
              format={"DD/MM/YYYY"}

              onChange={(data) => {
                data
                  ? onChangeState({
                    date_start: data[0].format("YYYY-MM-DD"),
                    date_end: data[1].format("YYYY-MM-DD"),
                  })
                  : onChangeState({
                    date_start: null,
                    date_end: null,
                  });
              }}
            />
          </Col>
          {/* <Col span={1}></Col>
          <Col span={2}>
            <Text strong>{`Sales OEM`}:</Text>
          </Col>
          <Col span={4}>
            <CustomSelect
              allowClear
              showSearch
              datas
              placeholder={"Sale OEM"}
              field_id={"value"}
              field_name={"label"}
              data={oem}
              value={mainSOProduction?.stateData?.sale_oem}
              onChange={(data, option) => {
                data !== undefined
                  ? onChangeState({
                      sale_oem: data,
                    })
                  : onChangeState({ sale_oem: null });
              }}
            />
          </Col> */}
          <Col span={1}></Col>
          <Col span={2}>
            <Button
              type='primary'
              className='search-button'
              name='find'
              icon={<SearchOutlined style={{ marginRight: 5, size: "20px" }} />}
              onClick={() => submit(searchPage)}>
              ค้นหา
            </Button>
          </Col>
        </Row>
        <Row style={{ marginTop: 10 }}>
          <Col span={4}></Col>
          {/* 2 */}
          {/* <Col span={2}></Col> */}
          <Col span={4}></Col>
          {/* <Col span={1}></Col> */}
          {/* <Col span={2}></Col>
          <Col span={2}></Col> */}
          <Col span={2}>{data_export()}</Col>
          <Col span={1}></Col>
          <Col span={2}>
            <Button
              className='search-button'
              danger
              icon={<ClearOutlined />}
            //onClick={reset_state}
            >
              Clear Search
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default SearchTableSO;
