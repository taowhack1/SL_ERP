/** @format */

import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Input,
  Row,
  Space,
  Table,
} from "antd";
import Text from "antd/lib/typography/Text";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "../../../../components/MainLayout";
import Authorize from "../../../system/Authorize";
import CustomSelect from "../../../../components/CustomSelect";
import { ClearOutlined, FileOutlined, SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import { getConfigurationItemType } from "../../../../actions/inventory/configurations/type/typeItemAction";
import { getConfigurationCategory } from "../../../../actions/inventory/configurations/category/categoryAction";
import { getAllItems } from "../../../../actions/inventory/itemActions";
import { getMasterDataItem } from "../../../../actions/inventory";
import { report_server } from "../../../../include/js/main_config";
import { useHistory } from "react-router";
import { validateFormHead } from "../../../../include/js/function_main";
const StockValue = () => {
  const { RangePicker } = DatePicker;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const authorize = Authorize();
  const history = useHistory();
  authorize.check_authorize();
  const auth = useSelector((state) => state.auth.authData);
  const itemType = useSelector((state) => state.inventory.configurations.type);
  const itemCategory = useSelector(
    (state) => state.inventory.configurations.category
  );
  const items = useSelector((state) => state.inventory.master_data.item_list);
  console.log("itemType", itemType);
  console.log("item", items);
  const [type, setType] = useState(itemType);
  const [category, setcategory] = useState(itemCategory);
  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: ["Home", "Stock Value"],
    search: false,
    create: "",
    buttonAction: "",
    edit: {},
    discard: "",
  };
  const [state, setState] = useState({
    type_id: null,
    category_id: null,
    item_id: null,
    item_type_all: false,
    item_category_all: false,
    item_id_all: false,
    stock_value_year: null,
    stock_value_month: null,
    all: false,
    eachLotBatch: false,
    stock_value_date: null,
  });
  const changeState = (stateKeyValue) => {
    setState({
      ...state,
      ...stateKeyValue,
    });
  };
  const reset_state = () => {
    setState({
      type_id: null,
      category_id: null,
      item_id: null,
      item_type_all: false,
      item_category_all: false,
      item_id_all: false,
      stock_value_year: null,
      stock_value_month: null,
      all: false,
      eachLotBatch: false,
      stock_value_date: null,
    });
  };
  const FieldsRequire = ["stock_value_year", "type_id"];
  const FieldsRequire_all_check = ["stock_value_date"];
  useEffect(() => {
    dispatch(getMasterDataItem(auth.user_name, setLoading, false));
    dispatch(getConfigurationItemType());
    dispatch(getConfigurationCategory());
  }, []);

  // dispatch(getAllItems(auth.user_name));

  const showReport = (formButton) => {
    console.log("formButton", formButton);
    console.log("state", state);
    let validate = null;
    const server_report_eachLotBatch =
      "http://192.168.1.211:8080/report_petch/report_stock_value_loatbatch.aspx";
    const server_report =
      "http://192.168.1.211:8080/report_petch/report_stock_value.aspx";
    const report_eachLotBatch_all = `${server_report_eachLotBatch}?item_all=1&stock_value_year=${state.stock_value_year}&stock_value_month=${state.stock_value_month}&stock_value_type=1`;
    const report_eachLotBatch = `${server_report_eachLotBatch}?item_all=0&item_type=${state.type_id}&item_code=${state.item_id}&stock_value_year=${state.stock_value_year}&stock_value_month=${state.stock_value_month}&stock_value_type=1`;
    const report_all = `${server_report}?item_all=1&stock_value_year=${state.stock_value_year}&stock_value_month=${state.stock_value_month}&stock_value_type=2`;
    const report = `${server_report}?item_all=0&item_type=${state.type_id}&item_code=${state.item_id}&stock_value_year=${state.stock_value_year}&stock_value_month=${state.stock_value_month}&stock_value_type=2`;
    if (state.all == true) {
      validate = validateFormHead(state, FieldsRequire_all_check);
    } else {
      validate = validateFormHead(state, FieldsRequire);
    }
    if (validate.validate) {
      if (state.eachLotBatch) {
        if (state.all) {
          window.open(report_eachLotBatch_all);
        } else {
          window.open(report_eachLotBatch);
        }
      } else {
        if (state.all) {
          window.open(report_all);
          console.log("report_all");
        } else {
          window.open(report);
          console.log("report");
        }
      }
    }
  };
  const exportExcel = (formButton) => {
    console.log("formButton", formButton);
    let validate = null;
    const server_report_eachLotBatch =
      "http://192.168.1.211:8080/report_purch/report_stock_card_lotbatch.aspx";
    const server_report =
      "http://192.168.1.211:8080/report_purch/report_stock_card.aspx";
    if (state.all == true) {
      validate = validateFormHead(state, FieldsRequire_all_check);
    } else {
      validate = validateFormHead(state, FieldsRequire);
    }
    // if (validate.validate) {

    // }
  };

  return (
    <MainLayout {...config}>
      <div id='form'>
        <Row className='col-2'>
          <Row></Row>
          <Col span={8}>
            <h2>
              <SearchOutlined style={{ marginRight: 10, size: "20px" }} /> Stock
              Value Search
            </h2>
          </Col>
          <Col span={12}></Col>
          <Col span={2}></Col>
          <Col span={2} className='text-right'>
            <Text className='text-view'></Text>
          </Col>
        </Row>
        <Row className='row-margin'>
          <Col span={3}>
            <Text strong>All item :</Text>
          </Col>
          <Col span={18}>
            <Row>
              <Checkbox
                name='item_type_all'
                checked={state.all}
                onChange={(e) => {
                  changeState({
                    all: e.target.checked,
                    type_id: null,
                    category_id: null,
                    item_id: null,
                  });
                }}>
                All
              </Checkbox>
              <Col span={12}></Col>
            </Row>
          </Col>
          <Col span={1}></Col>
        </Row>
        <Row className='row-margin'>
          <Col span={3}>
            <Text strong>Lot / batch :</Text>
          </Col>
          <Col span={18}>
            <Row>
              <Checkbox
                name='item_type_all'
                checked={state.eachLotBatch}
                onChange={(e) => {
                  changeState({
                    eachLotBatch: e.target.checked,
                  });
                }}>
                Each Lot / batch
              </Checkbox>
              <Col span={12}></Col>
            </Row>
          </Col>
          <Col span={1}></Col>
        </Row>
        <Row className='row-margin'>
          <Col span={3}>
            <Text strong>Item type :</Text>
          </Col>
          <Col span={18}>
            <Row>
              {/* <Checkbox
                  name='item_type_all'
                  checked={state.item_type_all}
                  onChange={(e) => {
                    changeState({ item_type_all: e.target.checked });
                  }}>
                  All
                </Checkbox> */}
              <Col span={12}>
                <CustomSelect
                  disabled={state.all ? true : false}
                  allowClear
                  placeholder={"Item type"}
                  name='type_id'
                  data={itemType}
                  field_id='type_id'
                  field_name='type_no_name'
                  onChange={(data) => {
                    data
                      ? changeState({
                          type_id: data,
                        })
                      : changeState({
                          type_id: null,
                        });
                  }}
                  value={state.type_id}
                />
              </Col>
            </Row>
          </Col>
          <Col span={1}></Col>
        </Row>
        {/* <Row className='row-margin'>
          <Col span={3}>
            <Text strong>Item category : </Text>
          </Col>
          <Col span={18}>
            <Row>
              <Col span={12}>
                <CustomSelect
                  disabled={state.all ? true : false}
                  allowClear
                  placeholder={"Item category"}
                  name='category_id'
                  data={
                    state.type_id
                      ? itemCategory.filter(
                          (categorys) => categorys.type_id === state.type_id
                        )
                      : itemCategory
                  }
                  field_id='category_id'
                  field_name='category_no_name'
                  onChange={(data, option) => {
                    data
                      ? changeState({
                          category_id: data,
                          category_id_type_id: option.data.type_id,
                        })
                      : changeState({
                          category_id: null,
                          category_id_type_id: null,
                        });
                  }}
                  value={state.category_id}
                />
              </Col>
            </Row>
          </Col>
          <Col span={1}></Col>
        </Row> */}
        <Row className='row-margin'>
          <Col span={3}>
            <Text strong>Item code : </Text>
          </Col>
          <Col span={18}>
            <Row>
              {/* <Checkbox
                  name='itme_id_all'
                  checked={state.item_id_all}
                  onChange={(e) => {
                    changeState({ item_id_all: e.target.checked });
                  }}>
                  All
                </Checkbox> */}
              <Col span={12}>
                <CustomSelect
                  disabled={state.all ? true : false}
                  placeholder={"Item code"}
                  name='item_id'
                  field_id='item_id'
                  field_name='item_no_name'
                  data={
                    state.type_id
                      ? items.filter((item) => item.type_id === state.type_id)
                      : items
                  }
                  onChange={(data) => {
                    data
                      ? changeState({
                          item_id: data,
                        })
                      : changeState({
                          item_id: null,
                        });
                  }}
                  value={state.item_id}
                />
              </Col>
            </Row>
          </Col>
          <Col span={1}></Col>
        </Row>
        <Row className='row-margin'>
          <Col span={3}>
            <Text strong>Month : </Text>
          </Col>
          <Col span={18}>
            <Row>
              <Col span={12}>
                <DatePicker
                  picker='month'
                  name='stock_value_year'
                  required={true}
                  className='full-width'
                  value={
                    state.stock_value_date
                      ? moment(state.stock_value_date, "YYYY-MM")
                      : ""
                  }
                  onChange={(data) => {
                    data
                      ? changeState({
                          stock_value_date: data.format("YYYY-MM"),
                          stock_value_year: data.format("YYYY"),
                          stock_value_month: data.format("MM"),
                        })
                      : changeState({
                          stock_value_year: null,
                          stock_value_month: null,
                          stock_value_date: null,
                        });
                  }}
                />
                {/* <DatePicker
                stock_value_year: null,
                stock_value_month: null,
                  name='stock_value_year'
                  required={true}
                  className='full-width'
                  value={[
                    state.stock_card_date_start
                      ? moment(state.stock_card_date_start, "DD/MM/YYYY")
                      : "",
                  ]}
                  onChange={(data) => {
                    data
                      ? changeState({
                          stock_card_date_start: data[0].format("DD/MM/YYYY"),
                        })
                      : changeState({
                          stock_card_date_start: null,
                        });
                  }}
                />  */}
              </Col>
            </Row>
          </Col>
          <Col span={1}></Col>
        </Row>
        <Row className='row-margin'>
          <Col span={3}>
            <Text strong></Text>
          </Col>
          <Col span={18}>
            <Row>
              <Col span={4}>
                <Button
                  type='primary'
                  name='showReport'
                  className='full-width'
                  icon={<SearchOutlined />}
                  onClick={(e) => showReport(e.target.textContent)}
                  value='showReport'>
                  Search
                </Button>
              </Col>
              <Col span={4}></Col>
              <Col span={4}>
                <Button
                  className='search-button'
                  danger
                  icon={<ClearOutlined />}
                  className='full-width'
                  onClick={reset_state}>
                  Clear Search
                </Button>{" "}
              </Col>
            </Row>
          </Col>
          <Col span={1}></Col>
        </Row>
        <Row className='row-margin'>
          <Col span={3}>
            <Text strong></Text>
          </Col>
          <Col span={18}>
            <Row>
              <Col span={4}>
                <Button
                  type='default'
                  name='excel'
                  className='full-width'
                  icon={<FileOutlined />}
                  value='excel'
                  onClick={(e) => exportExcel(e.target.textContent)}>
                  Export Excel
                </Button>
              </Col>
              <Col span={4}></Col>
              <Col span={4}></Col>
            </Row>
          </Col>
          <Col span={1}></Col>
        </Row>
      </div>
    </MainLayout>
  );
};

export default StockValue;
