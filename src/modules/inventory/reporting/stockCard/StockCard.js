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
import { ClearOutlined, SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import { getConfigurationItemType } from "../../../../actions/inventory/configurations/type/typeItemAction";
import { getConfigurationCategory } from "../../../../actions/inventory/configurations/category/categoryAction";
import { getAllItems } from "../../../../actions/inventory/itemActions";
import { getMasterDataItem } from "../../../../actions/inventory";
const StockCard = () => {
  const { RangePicker } = DatePicker;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const authorize = Authorize();
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
    item_type: null,
    item_category: null,
    item_id: null,
    item_type_all: null,
    item_category_all: null,
    item_id_all: null,
    stock_catd_date_start: null,
    stock_catd_end_date: null,
  });
  const changeState = (stateKeyValue) => {
    setState({
      ...state,
      ...stateKeyValue,
    });
  };
  const reset_state = () => {
    setState({
      item_type: null,
      item_category: null,
      item_id: null,
      item_type_all: null,
      item_category_all: null,
      item_id_all: null,
      stock_catd_date_start: null,
      stock_catd_end_date: null,
    });
  };
  useEffect(() => {
    //dispatch(getMasterDataItem(auth.user_name, setLoading, false));
    dispatch(getConfigurationItemType());
    dispatch(getConfigurationCategory());
  }, []);

  // dispatch(getAllItems(auth.user_name));

  const dateFormat = "DD/MM/YYYY";

  return (
    <MainLayout {...config}>
      <div id='form'>
        <Row className='col-2'>
          <Row></Row>
          <Col span={8}>
            <h2>
              <SearchOutlined style={{ marginRight: 10, size: "20px" }} /> Stock
              Card Search
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
            <Text strong>Item type :</Text>
          </Col>
          <Col span={18}>
            <Row>
              <Checkbox name='item_type_all'>All</Checkbox>
              <Col span={12}>
                <CustomSelect
                  allowClear
                  placeholder={"Item type"}
                  name='type_id'
                  data={itemType}
                  field_id='type_id'
                  field_name='type_no_name'
                />
              </Col>
            </Row>
          </Col>
          <Col span={1}></Col>
        </Row>
        <Row className='row-margin'>
          <Col span={3}>
            <Text strong>Item category : </Text>
          </Col>
          <Col span={18}>
            <Row>
              <Checkbox name='item_category_all'>All</Checkbox>
              <Col span={12}>
                <CustomSelect
                  allowClear
                  placeholder={"Item category"}
                  name='item_category'
                  data={itemCategory}
                  field_id='category_id'
                  field_name='category_no_name'
                />
              </Col>
            </Row>
          </Col>
          <Col span={1}></Col>
        </Row>
        <Row className='row-margin'>
          <Col span={3}>
            <Text strong>Item code : </Text>
          </Col>
          <Col span={18}>
            <Row>
              <Checkbox name='itme_id_all'>All</Checkbox>
              <Col span={12}>
                <CustomSelect placeholder={"Item code"} name='item_id' />
              </Col>
            </Row>
          </Col>
          <Col span={1}></Col>
        </Row>
        <Row className='row-margin'>
          <Col span={3}>
            <Text strong>Date : </Text>
          </Col>
          <Col span={18}>
            <Row>
              <Checkbox name='date_all'>All</Checkbox>
              <Col span={12}>
                <RangePicker
                  className='full-width'
                  format={dateFormat}
                  value={[
                    state.stock_catd_date_start
                      ? moment(state.stock_catd_date_start, "DD/MM/YYYY")
                      : "",
                    state.stock_catd_date_end
                      ? moment(state.stock_catd_date_end, "DD/MM/YYYY")
                      : "",
                  ]}
                  onChange={(data) => {
                    data
                      ? changeState({
                          stock_catd_date_start: data[0].format("DD/MM/YYYY"),
                          stock_catd_date_end: data[1].format("DD/MM/YYYY"),
                        })
                      : changeState({
                          stock_catd_date_start: null,
                          stock_catd_date_end: null,
                        });
                  }}
                />
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
              <Col span={1}></Col>
              <Col span={4}>
                <Button
                  type='primary'
                  className='full-width'
                  icon={<SearchOutlined />}
                  //style={{ width: 150 }}
                >
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
                  onClick={reset_state}
                  //style={{ width: 150 }}
                >
                  Clear Search
                </Button>{" "}
              </Col>
            </Row>
          </Col>
          <Col span={1}></Col>
        </Row>
      </div>
    </MainLayout>
  );
};

export default StockCard;
