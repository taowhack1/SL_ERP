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
import StockCardSearch from "./StockCardSearch";
import CustomSelect from "../../../../components/CustomSelect";
import { ClearOutlined, FileOutlined, SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import { getConfigurationItemType } from "../../../../actions/inventory/configurations/type/typeItemAction";
import { getConfigurationCategory } from "../../../../actions/inventory/configurations/category/categoryAction";
import { getAllItems } from "../../../../actions/inventory/itemActions";
import { getMasterDataItem } from "../../../../actions/inventory";
import { useHistory } from "react-router";
import { validateFormHead } from "../../../../include/js/function_main";
const StockCard = () => {
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
  const [type, setType] = useState(itemType);
  const [category, setcategory] = useState(itemCategory);
  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: ["Home", "Stock Card"],
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
    stock_card_date_start: null,
    stock_card_date_end: null,
    all: false,
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
      stock_card_date_start: null,
      stock_card_date_end: null,
      all: false,
    });
  };
  const FieldsRequire = [
    "stock_card_date_start",
    "stock_card_date_end",
    "type_id",
    "category_id",
    "item_id",
  ];
  const FieldsRequire_all_check = ["stock_card_date_start"];
  useEffect(() => {
    dispatch(getMasterDataItem(auth.user_name, setLoading, false));
    dispatch(getConfigurationItemType());
    dispatch(getConfigurationCategory());
  }, []);

  // dispatch(getAllItems(auth.user_name));

  const dateFormat = "DD/MM/YYYY";

  const showReport = (formButton) => {
    console.log("formButton", formButton);
    let validate = null;
    if (state.all == true) {
      validate = validateFormHead(state, FieldsRequire_all_check);
    } else {
      validate = validateFormHead(state, FieldsRequire);
    }
    if (validate.validate) {
      if (formButton == "Exel Download") {
        if (state.item_id != null) {
          const link = `${process.env.REACT_APP_REPORT_SERVER}/report_stock_card.aspx?item_type=${state.type_id}&item_category=${state.category_id}&item_code=${state.item_id}&date_start=${state.stock_card_date_start}&date_end=${state.stock_card_date_end}&export_excel=true`;
          window.open(link);
        }
        if (state.all == true) {
          const link = `${process.env.REACT_APP_REPORT_SERVER}/report_stock_card.aspx?&all=all&date_start=${state.stock_card_date_start}&date_end=${state.stock_card_date_end}&export_excel=true`;
          window.open(link);
        }
      } else {
        if (state.item_id != null) {
          const link = `${process.env.REACT_APP_REPORT_SERVER}/report_stock_card.aspx?item_type=${state.type_id}&item_category=${state.category_id}&item_code=${state.item_id}&date_start=${state.stock_card_date_start}&date_end=${state.stock_card_date_end}`;
          window.open(link);
        }
        if (state.all == true) {
          const link = `${process.env.REACT_APP_REPORT_SERVER}/report_stock_card.aspx?&all=all&date_start=${state.stock_card_date_start}&date_end=${state.stock_card_date_end}`;
          window.open(link);
        }
      }
    }
  };
  console.log("state", state);
  return (
    <MainLayout {...config}>
      <div id="form">
        <Row className="col-2">
          <Row></Row>
          <Col span={8}>
            <h2>
              <SearchOutlined style={{ marginRight: 10, size: "20px" }} /> Stock
              Card Search
            </h2>
          </Col>
          <Col span={12}></Col>
          <Col span={2}></Col>
          <Col span={2} className="text-right">
            <Text className="text-view"></Text>
          </Col>
        </Row>
        <Row className="row-margin">
          <Col span={3}>
            <Text strong>All item :</Text>
          </Col>
          <Col span={18}>
            <Row>
              <Checkbox
                name="item_type_all"
                checked={state.all}
                onChange={(e) => {
                  changeState({
                    all: e.target.checked,
                    type_id: null,
                    category_id: null,
                    item_id: null,
                  });
                }}
              >
                All
              </Checkbox>
              <Col span={12}></Col>
            </Row>
          </Col>
          <Col span={1}></Col>
        </Row>
        <Row className="row-margin">
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
                  name="type_id"
                  data={itemType}
                  field_id="type_id"
                  field_name="type_no_name"
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
        <Row className="row-margin">
          <Col span={3}>
            <Text strong>Item category : </Text>
          </Col>
          <Col span={18}>
            <Row>
              {/* <Checkbox
                name='item_category_all'
                checked={state.item_category_all}
                onChange={(e) => {
                  changeState({ item_category_all: e.target.checked });
                }}>
                All
              </Checkbox> */}
              <Col span={12}>
                <CustomSelect
                  disabled={state.all ? true : false}
                  allowClear
                  placeholder={"Item category"}
                  name="category_id"
                  data={
                    state.type_id
                      ? itemCategory.filter(
                          (categorys) => categorys.type_id === state.type_id
                        )
                      : itemCategory
                  }
                  field_id="category_id"
                  field_name="category_no_name"
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
        </Row>
        <Row className="row-margin">
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
                  name="item_id"
                  field_id="item_id"
                  field_name="item_no_name"
                  data={
                    state.category_id
                      ? items.filter(
                          (item) => item.category_id === state.category_id
                        )
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
        <Row className="row-margin">
          <Col span={3}>
            <Text strong>Date : </Text>
          </Col>
          <Col span={18}>
            <Row>
              <Col span={12}>
                <RangePicker
                  name="stock_card_date_start"
                  required={true}
                  className="full-width"
                  format={dateFormat}
                  value={[
                    state.stock_card_date_start
                      ? moment(state.stock_card_date_start, "YYYY-MM-DD")
                      : "",
                    state.stock_card_date_end
                      ? moment(state.stock_card_date_end, "YYYY-MM-DD")
                      : "",
                  ]}
                  onChange={(data) => {
                    data
                      ? changeState({
                          stock_card_date_start: data[0].format("YYYY-MM-DD"),
                          stock_card_date_end: data[1].format("YYYY-MM-DD"),
                        })
                      : changeState({
                          stock_card_date_start: null,
                          stock_card_date_end: null,
                        });
                  }}
                />
              </Col>
            </Row>
          </Col>
          <Col span={1}></Col>
        </Row>
        <Row className="row-margin">
          <Col span={3}>
            <Text strong></Text>
          </Col>
          <Col span={18}>
            <Row>
              <Col span={4}>
                <Button
                  type="primary"
                  name="showReport"
                  className="full-width"
                  icon={<SearchOutlined />}
                  onClick={(e) => showReport(e.target.textContent)}
                  value="showReport"
                >
                  Search
                </Button>
              </Col>
              <Col span={4}></Col>
              <Col span={4}>
                <Button
                  className="search-button"
                  danger
                  icon={<ClearOutlined />}
                  className="full-width"
                  onClick={reset_state}
                >
                  Clear Search
                </Button>{" "}
              </Col>
            </Row>
          </Col>
          <Col span={1}></Col>
        </Row>
        <Row className="row-margin">
          <Col span={3}>
            <Text strong></Text>
          </Col>
          <Col span={18}>
            <Row>
              <Col span={4}>
                <Button
                  type="default"
                  name="excel"
                  className="full-width"
                  icon={<FileOutlined />}
                  value="excel"
                  onClick={(e) => showReport(e.target.textContent)}
                >
                  Exel Download
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

export default StockCard;
