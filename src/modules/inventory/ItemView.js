import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Input,
  Tabs,
  Radio,
  Select,
  AutoComplete,
  Typography,
  InputNumber,
  Checkbox,
  Space,
  Switch,
  message,
  Upload,
  Button,
} from "antd";
import MainLayout from "../../components/MainLayout";
import moment from "moment";
import Line from "../../components/VendorLine";
import {
  autoCompleteUser,
  locationData,
  autoCompleteUnit,
} from "../../data/inventoryData";
import Comments from "../../components/Comments";
import { dataComments } from "../../data";
import Barcode from "react-barcode";
import { vendorColumns, vendors, companys } from "../../data/itemData";
import {
  getSelectDetail,
  createNewItems,
  upDateItem,
} from "../../actions/inventory/itemActions";
import { item_fields } from "./config/item";
import { getNameById } from "../../include/js/function_main";
import $ from "jquery";
import { getMasterDataItem } from "../../actions/inventory";
import {
  BorderOutlined,
  CheckSquareOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import CustomSelect from "../../components/CustomSelect";
import { item_vendor_columns } from "./config/item";
import numeral from "numeral";

const { Option } = Select;
const { TextArea } = Input;
const { Title, Paragraph, Text } = Typography;
const ItemView = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMasterDataItem());
  }, []);
  const data_head = useSelector((state) => state.inventory.item.item_head);
  const data_detail = useSelector((state) => state.inventory.item.item_detail);

  // const data_head = useSelector(state=>state.inventory.item.item_head);
  // const data_detail = useSelector(state=>state.inventory.item.item_detail);

  const callback = (key) => {};

  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project.project_id,
    title: current_project.project_name,
    home: current_project.project_url,
    show: true,
    breadcrumb: [
      "Home",
      "Items",
      "View",
      data_head.item_no &&
        "[ " + data_head.item_no + " ] " + data_head.item_name,
    ],
    search: false,
    buttonAction: ["Edit", "Discard"],
    create: "",
    edit: {
      data: {
        data_head: data_head,
        data_detail: data_detail,
      },
      path: data_head && "/inventory/items/edit/" + data_head.item_id,
    },

    // save: "function",
    discard: "/inventory/items",
    onSave: (e) => {
      e.preventDefault();
      console.log("Save");
    },
    onEdit: (e) => {
      e.preventDefault();
      console.log("Edit");
    },
    onApprove: (e) => {
      e.preventDefault();
      console.log("Approve");
    },
    onConfirm: () => {
      console.log("Confirm");
    },
  };

  return (
    <MainLayout {...config}>
      <div id="form">
        <Row className="col-2">
          <Col span={11}>
            {/* <h2>
              <strong>{data_head.item_no ? "Edit" : "Create"} Item</strong>
            </h2> */}
            <h3 style={{ marginBottom: 8 }}>
              {data_head.item_no && (
                <strong>
                  Item Code {data_head.item_no ? "#" + data_head.item_no : "-"}
                </strong>
              )}
            </h3>
          </Col>
          <Col span={2}></Col>
          <Col span={3}></Col>
          <Col span={8} style={{ textAlign: "right" }}>
            {/* <Barcode
              value={data_head.item_barcode}
              width={1.5}
              height={30}
              fontSize={14}
            /> */}
          </Col>
        </Row>
        <Row className="col-2">
          <Col span={24} style={{ marginBottom: 15 }}>
            <h3>
              <strong>Description Name</strong>
            </h3>
            <Text className="text-view">
              {data_head.item_name ? data_head.item_name : "-"}
            </Text>
          </Col>
        </Row>
        <Row className="col-2">
          <Col span={24} style={{ marginLeft: 5 }}>
            <Space align="baseline">
              {data_head.item_sale ? (
                <CheckSquareOutlined />
              ) : (
                <BorderOutlined />
              )}
              <Text>Can be sold</Text>
            </Space>
            <br />
            <Space align="baseline">
              {data_head.item_purchase ? (
                <CheckSquareOutlined />
              ) : (
                <BorderOutlined />
              )}
              <Text>Can be purchase</Text>
            </Space>

            {data_head.item_no && (
              <Space
                align="baseline"
                style={{ float: "right", marginRight: 10 }}
              >
                <Text strong>Active</Text>
                <Switch
                  checkedChildren={""}
                  unCheckedChildren={""}
                  disabled
                  checked={data_head.item_actived}
                  style={{ width: 35 }}
                />
              </Space>
            )}
          </Col>
        </Row>

        <Row className="col-2 row-tab-margin">
          <Col span={24}>
            <Tabs defaultActiveKey="1" onChange={callback}>
              <Tabs.TabPane tab="Detail" key="1">
                <Row className="col-2 row-margin-vertical">
                  <Col span={3}>
                    <Text strong>SRL</Text>
                  </Col>
                  <Col span={8} className="text-string">
                    <Text className="text-view">
                      {data_head.item_customer_run_no
                        ? data_head.item_customer_run_no
                        : "-"}
                    </Text>
                  </Col>
                  <Col span={2}></Col>
                  <Col span={3}>
                    <Text strong>Item type </Text>
                  </Col>
                  <Col span={8} className="text-string">
                    <Text className="text-view">
                      {data_head.type_name ? data_head.type_name : "-"}
                    </Text>
                  </Col>
                </Row>
                <Row className="col-2 row-margin-vertical">
                  <Col span={3}>
                    <Text strong>Item barcode</Text>
                  </Col>
                  <Col span={8} className="text-string">
                    <Text className="text-view">
                      {data_head.item_barcode ? data_head.item_barcode : "-"}
                    </Text>
                  </Col>

                  <Col span={2}></Col>
                  <Col span={3}>
                    <Text strong>Category </Text>
                  </Col>
                  <Col span={8} className="text-string">
                    <Text className="text-view">
                      {data_head.category_name ? data_head.category_name : "-"}
                    </Text>
                  </Col>
                </Row>
                <Row className="col-2 row-margin-vertical">
                  <Col span={3}>
                    <Text strong>Unit of measure</Text>
                  </Col>
                  <Col span={8} className="text-string">
                    <Text className="text-view">
                      {data_head.uom_no ? data_head.uom_no : "-"}
                    </Text>
                  </Col>
                  <Col span={2}></Col>
                  <Col span={3}></Col>
                  <Col span={8}></Col>
                </Row>
                <Row className="col-2">
                  <Col span={24}>
                    <Space direction="vertical" style={{ width: "100%" }}>
                      <Text strong>Notes </Text>
                      <Text className="text-view">
                        {data_head.item_remark ? data_head.item_remark : "-"}
                      </Text>
                    </Space>
                  </Col>
                </Row>
              </Tabs.TabPane>
              <Tabs.TabPane tab="R&D" key="2">
                <Row className="col-2 row-margin-vertical">
                  <Col span={12}>
                    <Row className="col-2 row-margin-vertical">
                      <Col span={6}>
                        <Text strong>Trade name</Text>
                      </Col>
                      <Col span={16} className="text-string">
                        <Text className="text-view">
                          {data_head.item_trade_name
                            ? data_head.item_trade_name
                            : "-"}
                        </Text>
                      </Col>
                      <Col span={2}></Col>
                    </Row>
                    <Row className="col-2 row-margin-vertical">
                      <Col span={6}>
                        <Text strong>Shelf life (day) </Text>
                      </Col>
                      <Col span={5} className="text-number">
                        <Text className="text-view">
                          {data_head.item_shelf_life
                            ? data_head.item_shelf_life
                            : "-"}
                        </Text>
                        <Text strong> Days</Text>
                      </Col>
                      <Col span={13}></Col>
                    </Row>
                  </Col>
                  <Col span={12}>
                    <Row className="col-2 row-margin-vertical">
                      <Col span={2}></Col>
                      <Col span={4}>
                        <Text strong>Sale to</Text>
                      </Col>
                      <Col span={18}>
                        <Space align="baseline">
                          {data_head.item_sale_local ? (
                            <CheckSquareOutlined />
                          ) : (
                            <BorderOutlined />
                          )}
                          <Text>Local</Text>
                        </Space>
                        <br />
                        <Space align="baseline">
                          {data_head.item_sale_export ? (
                            <CheckSquareOutlined />
                          ) : (
                            <BorderOutlined />
                          )}
                          <Text>Export</Text>
                        </Space>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row
                  className="col-2 row-margin-vertical"
                  style={{
                    borderBottom: "1px solid #E5E5E5",
                    paddingBottom: 10,
                  }}
                >
                  <Col span={24}>
                    <Text strong>Documents</Text>
                  </Col>
                </Row>
                <Row className="col-2 row-tab-margin">
                  <Col
                    span={12}
                    style={{
                      borderRight: "1px solid #c4c4c4",
                    }}
                  >
                    <Row className="col-2 row-margin-vertical">
                      <Col span={2}></Col>
                      <Col span={2}>
                        {data_head.item_specification ? (
                          <CheckSquareOutlined />
                        ) : (
                          <BorderOutlined />
                        )}
                      </Col>
                      <Col span={9}>
                        <Text strong> Specification.</Text>
                      </Col>
                      <Col span={10}>
                        <Upload {...props}>
                          {/* <Button icon={<UploadOutlined />}>
                            Click to Upload
                          </Button> */}
                        </Upload>
                      </Col>
                      <Col span={1}></Col>
                    </Row>
                    <Row className="col-2 row-margin-vertical">
                      <Col span={2}></Col>
                      <Col span={2}>
                        {data_head.item_msds ? (
                          <CheckSquareOutlined />
                        ) : (
                          <BorderOutlined />
                        )}
                      </Col>
                      <Col span={9}>
                        <Text strong> MSDS.</Text>
                      </Col>
                      <Col span={10}>
                        <Upload {...props}>
                          {/* <Button icon={<UploadOutlined />}>
                            Click to Upload
                          </Button> */}
                        </Upload>
                      </Col>
                      <Col span={1}></Col>
                    </Row>
                    <Row className="col-2 row-margin-vertical">
                      <Col span={2}></Col>
                      <Col span={2}>
                        {data_head.item_quotation ? (
                          <CheckSquareOutlined />
                        ) : (
                          <BorderOutlined />
                        )}
                      </Col>
                      <Col span={9}>
                        <Text strong> Quotation.</Text>
                      </Col>
                      <Col span={10}>
                        <Upload {...props}>
                          {/* <Button icon={<UploadOutlined />}>
                            Click to Upload
                          </Button> */}
                        </Upload>
                      </Col>
                      <Col span={1}></Col>
                    </Row>
                  </Col>
                  {/* Right Row */}
                  <Col span={12}>
                    <Row className="col-2 row-margin-vertical">
                      <Col span={1}></Col>
                      <Col span={2}></Col>
                      <Col span={2}>
                        {data_head.item_halal_cert ? (
                          <CheckSquareOutlined />
                        ) : (
                          <BorderOutlined />
                        )}
                      </Col>
                      <Col span={9}>
                        <Text strong> Halal Cert.</Text>
                      </Col>
                      <Col span={10}>
                        <Upload {...props}>
                          {/* <Button icon={<UploadOutlined />}>
                            Click to Upload
                          </Button> */}
                        </Upload>
                      </Col>
                    </Row>
                    <Row className="col-2 row-margin-vertical">
                      <Col span={1}></Col>
                      <Col span={2}></Col>
                      <Col span={2}>
                        {data_head.item_non_haram ? (
                          <CheckSquareOutlined />
                        ) : (
                          <BorderOutlined />
                        )}
                      </Col>
                      <Col span={9}>
                        <Text strong> Non-Haram Statement.</Text>
                      </Col>
                      <Col span={10}>
                        <Upload {...props}>
                          {/* <Button icon={<UploadOutlined />}>
                            Click to Upload
                          </Button> */}
                        </Upload>
                      </Col>
                    </Row>
                    <Row className="col-2 row-margin-vertical">
                      <Col span={1}></Col>
                      <Col span={2}></Col>
                      <Col span={2}>
                        {data_head.item_non_halal ? (
                          <CheckSquareOutlined />
                        ) : (
                          <BorderOutlined />
                        )}
                      </Col>
                      <Col span={9}>
                        <Text strong> Non-Halal.</Text>
                      </Col>
                      <Col span={10}></Col>
                    </Row>
                  </Col>
                </Row>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Purchase" key="3">
                <Row className="col-2 row-margin-vertical">
                  <Col span={3}>
                    <Text strong>Sale price</Text>
                  </Col>
                  <Col span={3} className="text-number">
                    <Text className="text-view">
                      {numeral(data_head.item_price).format("0,0.000")}
                    </Text>
                  </Col>
                </Row>
                <Row className="col-2 row-tab-margin-lg"></Row>
                <Line data_detail={data_detail} readOnly={true} />
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
      <Comments data={dataComments} />
    </MainLayout>
  );
};

export default ItemView;
