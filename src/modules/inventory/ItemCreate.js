import React, { useEffect, useReducer, useState } from "react";
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
import {
  item_detail_fields,
  item_fields,
  item_require_fields,
  item_vendor_require_fields,
} from "./config/item";
import {
  getNameById,
  validateFormDetail,
  validateFormHead,
} from "../../include/js/function_main";
import $ from "jquery";
import { getMasterDataItem } from "../../actions/inventory";
import { UploadOutlined } from "@ant-design/icons";
import CustomSelect from "../../components/CustomSelect";
import { item_vendor_columns } from "./config/item";
import { reducer } from "./reducers";
import { numberFormat } from "../../include/js/main_config";
import Authorize from "../system/Authorize";
import { useHistory } from "react-router-dom";
import { get_all_vendor } from "../../actions/purchase/vendorActions";
const { Option } = Select;
const { TextArea } = Input;
const { Title, Paragraph, Text } = Typography;
const initialStateHead = item_fields;
const initialStateDetail = [item_detail_fields];

const ItemCreate = (props) => {
  const history = useHistory();
  const authorize = Authorize();
  authorize.check_authorize();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMasterDataItem());
    dispatch(get_all_vendor());
  }, []);
  const master_data = useSelector((state) => state.inventory.master_data);
  const auth = useSelector((state) => state.auth.authData);
  const data = props.location.state ? props.location.state : 0;

  const [data_head, headDispatch] = useReducer(reducer, initialStateHead);
  const [data_detail, detailDispatch] = useReducer(reducer, initialStateDetail);

  const callback = (key) => {};

  useEffect(() => {
    headDispatch({
      type: "SET_HEAD",
      payload: data.data_head
        ? { ...data.data_head, commit: 1, user_name: auth.user_name }
        : { ...item_fields, commit: 1, user_name: auth.user_name },
    });

    detailDispatch({
      type: "SET_DETAIL",
      payload: data.data_detail ? data.data_detail : [item_detail_fields],
    });
  }, []);

  const upDateFormValue = (data) => {
    headDispatch({ type: "CHANGE_HEAD_VALUE", payload: data });
  };

  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: [
      "Home",
      "Items",
      data_head.item_no ? "Edit" : "Create",
      data_head.item_no &&
        "[ " + data_head.item_no + " ] " + data_head.item_name,
    ],
    search: false,
    buttonAction: ["Save", "Discard"],
    create: "",

    save: "function",
    discard: "/inventory/items",
    onSave: (e) => {
      console.log("Save");
      const key = "validate";

      const validate = validateFormHead(data_head, item_require_fields);
      // const validate_detail = validateFormDetail(
      //   data_detail,
      //   item_vendor_require_fields
      // );
      if (validate.validate) {
        console.log("pass");
        data_head.item_id
          ? dispatch(
              upDateItem(
                data_head.item_id,
                data_head,
                data_detail,
                redirect_to_view
              )
            )
          : dispatch(createNewItems(data_head, data_detail, redirect_to_view));
      } else {
        message.warning({
          content: "Please fill your form completely.",
          key,
          duration: 2,
        });
      }

      // data_head.item_no
      //   ? dispatch(upDateItem(data_head.item_id, data_head, data_detail))
      //   : dispatch(createNewItems(data_head, data_detail));
    },
    onEdit: (e) => {
      //e.preventDefault();
      console.log("Edit");
    },
    onApprove: (e) => {
      //e.preventDefault();
      console.log("Approve");
    },
    onConfirm: () => {
      console.log("Confirm");
    },
  };
  const redirect_to_view = (id) => {
    history.push("/inventory/items/view/" + (id ? id : "new"));
  };
  console.log("data_head", data_head);
  return (
    <MainLayout {...config} data={data_head}>
      <div id="form">
        <Row className="col-2">
          <Col span={11}>
            <h2>
              <strong>{data_head.item_no ? "Edit" : "Create"} Item</strong>
            </h2>
            <h3 style={{ marginBottom: 8 }}>
              {data_head.item_no && (
                <strong>Item Code # {data_head.item_no}</strong>
              )}
            </h3>
          </Col>
          <Col span={2}></Col>
          <Col span={3}></Col>
          <Col span={8} style={{ textAlign: "right" }}>
            {data_head.item_no && (
              <Barcode
                value={data_head.item_barcode}
                width={1.5}
                height={30}
                fontSize={14}
              />
            )}
          </Col>
        </Row>
        <Row className="col-2">
          <Col span={24} style={{ marginBottom: 8 }}>
            <h3>
              <strong>
                <span className="require">* </span>Description Name
              </strong>
            </h3>
            <Col span={24}>
              <Input
                name="item_name"
                placeholder={"Description Name"}
                onChange={(e) => upDateFormValue({ item_name: e.target.value })}
                value={data_head.item_name}
              />
            </Col>
          </Col>
        </Row>
        <Row className="col-2">
          <Col span={24} style={{ marginLeft: 5 }}>
            <Space align="baseline">
              <Checkbox
                name="item_sale"
                checked={data_head.item_sale}
                onChange={(e) =>
                  upDateFormValue({ item_sale: e.target.checked ? 1 : 0 })
                }
              />
              <Text>Can be sold</Text>
            </Space>
            <br />
            <Space align="baseline">
              <Checkbox
                name="item_purchase"
                checked={data_head.item_purchase}
                onChange={(e) =>
                  upDateFormValue({ item_purchase: e.target.checked ? 1 : 0 })
                }
              />
              <Text>Can be purchase</Text>
            </Space>
            {data_head.item_no && (
              <Space
                align="baseline"
                style={{ float: "right", marginRight: 10 }}
              >
                <Text strong>Active</Text>
                <Switch
                  name="item_actived"
                  checkedChildren={""}
                  unCheckedChildren={""}
                  checked={data_head.item_actived}
                  style={{ width: 35 }}
                  onClick={(data) =>
                    upDateFormValue({ item_actived: data ? 1 : 0 })
                  }
                />
              </Space>
            )}
          </Col>
        </Row>

        <Row className="col-2 row-tab-margin">
          <Col span={24}>
            <Tabs defaultActiveKey="1" onChange={callback}>
              <Tabs.TabPane
                tab={
                  <span>
                    <span className="require">* </span>
                    Detail
                  </span>
                }
                key="1"
              >
                <Row className="col-2 row-margin-vertical">
                  <Col span={3}>
                    <Text strong>
                      <span className="require">* </span>SRL
                    </Text>
                  </Col>
                  <Col span={8}>
                    <Input
                      name="item_customer_run_no"
                      disabled={data_head.item_id ? 1 : 0}
                      placeholder="Customer or vendor short name"
                      onChange={(e) =>
                        upDateFormValue({
                          item_customer_run_no: e.target.value,
                        })
                      }
                      value={data_head.item_customer_run_no}
                    />
                  </Col>
                  <Col span={2}></Col>
                  <Col span={3}>
                    <Text strong>
                      <span className="require">* </span>Item type{" "}
                    </Text>
                  </Col>
                  <Col span={8}>
                    <CustomSelect
                      allowClear
                      disabled={data_head.item_id ? 1 : 0}
                      showSearch
                      placeholder={"Item type"}
                      name="type_id"
                      field_id="type_id"
                      field_name="type_name"
                      value={data_head.type_name}
                      data={master_data.item_type}
                      onChange={(data, option) => {
                        data && data
                          ? upDateFormValue({
                              type_id: data,
                              type_name: option.title,
                              category_id: null,
                              category_name: null,
                            })
                          : upDateFormValue({
                              category_id: null,
                              category_name: null,
                            });
                      }}
                    />
                  </Col>
                </Row>
                <Row className="col-2 row-margin-vertical">
                  <Col span={3}>
                    <Text strong>Item barcode</Text>
                  </Col>
                  <Col span={8}>
                    <Input
                      disabled
                      placeholder={"Barcode"}
                      onChange={(e) =>
                        upDateFormValue({ item_barcode: e.target.value })
                      }
                      value={data_head.item_barcode}
                    />
                  </Col>

                  <Col span={2}></Col>
                  <Col span={3}>
                    <Text strong>
                      <span className="require">* </span>Category{" "}
                    </Text>
                  </Col>
                  <Col span={8}>
                    <CustomSelect
                      allowClear
                      showSearch
                      disabled={data_head.item_id ? 1 : 0}
                      placeholder={"Category"}
                      name="category_id"
                      field_id="category_id"
                      field_name="category_name"
                      value={data_head.category_name}
                      data={
                        data_head.type_id
                          ? master_data.item_category.filter(
                              (categ) => categ.type_id === data_head.type_id
                            )
                          : master_data.item_category
                      }
                      onChange={(data, option) => {
                        data && data
                          ? upDateFormValue({
                              category_id: option.data.category_id,
                              category_name: option.data.category_name,
                            })
                          : upDateFormValue({
                              category_id: null,
                              category_name: null,
                            });
                      }}
                    />
                  </Col>
                </Row>
                <Row className="col-2 row-margin-vertical">
                  <Col span={3}>
                    <Text strong>
                      <span className="require">* </span>Unit of measure
                    </Text>
                  </Col>
                  <Col span={8}>
                    <CustomSelect
                      allowClear
                      showSearch
                      placeholder={"Unit of measure"}
                      name="uom_id"
                      field_id="uom_id"
                      field_name="uom_no"
                      value={data_head.uom_no}
                      data={master_data.item_uom}
                      onChange={(data, option) => {
                        data && data
                          ? upDateFormValue({
                              uom_id: option.data.uom_id,
                              uom_no: option.data.uom_no,
                            })
                          : upDateFormValue({
                              uom_id: null,
                              uom_no: null,
                            });
                      }}
                    />
                  </Col>
                  <Col span={2}></Col>
                  <Col span={3}></Col>
                  <Col span={8}></Col>
                </Row>
                <Row className="col-2">
                  <Col span={24}>
                    <Space direction="vertical" style={{ width: "100%" }}>
                      <Text strong>Notes </Text>
                      <TextArea
                        name="item_remark"
                        placeholder="Notes"
                        onChange={(e) =>
                          upDateFormValue({ item_remark: e.target.value })
                        }
                        value={data_head.item_remark}
                      />
                    </Space>
                  </Col>
                </Row>
              </Tabs.TabPane>
              <Tabs.TabPane tab="R&D" key="2">
                <Row className="col-2 row-margin-vertical">
                  <Col
                    span={12}
                    // style={{
                    //   borderRight: "1px solid #c4c4c4",
                    // }}
                  >
                    <Row className="col-2 row-margin-vertical">
                      <Col span={6}>
                        <Text strong>Trade name</Text>
                      </Col>
                      <Col span={16}>
                        <Input
                          name="item_trade_name"
                          placeholder="Item Trade name"
                          onChange={(e) =>
                            upDateFormValue({
                              item_trade_name: e.target.value,
                            })
                          }
                          value={data_head.item_trade_name}
                        />
                      </Col>
                      <Col span={2}></Col>
                    </Row>
                    <Row className="col-2 row-margin-vertical">
                      <Col span={6}>
                        <Text strong>Shelf life (day) </Text>
                      </Col>
                      <Col span={16}>
                        <InputNumber
                          name="item_shelf_life"
                          placeholder={"Shelf life (day)"}
                          min={0}
                          step={1}
                          precision={0}
                          style={{ width: "100%" }}
                          disabled={0}
                          value={data_head.item_shelf_life}
                          onChange={(data) =>
                            upDateFormValue({
                              item_shelf_life: data,
                            })
                          }
                        />
                      </Col>
                      <Col span={2}></Col>
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
                          <Checkbox
                            checked={data_head.item_sale_local}
                            onChange={(e) =>
                              upDateFormValue({
                                item_sale_local: e.target.checked ? 1 : 0,
                              })
                            }
                          />
                          <Text>Local</Text>
                        </Space>
                        <br />
                        <Space align="baseline">
                          <Checkbox
                            checked={data_head.item_sale_export}
                            onChange={(e) =>
                              upDateFormValue({
                                item_sale_export: e.target.checked ? 1 : 0,
                              })
                            }
                          />
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
                        <Checkbox
                          checked={data_head.item_specification}
                          onChange={(e) =>
                            upDateFormValue({
                              item_specification: e.target.checked ? 1 : 0,
                            })
                          }
                        />
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
                        <Checkbox
                          checked={data_head.item_msds}
                          onChange={(e) =>
                            upDateFormValue({
                              item_msds: e.target.checked ? 1 : 0,
                            })
                          }
                        />
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
                        <Checkbox
                          checked={data_head.item_quotation}
                          onChange={(e) =>
                            upDateFormValue({
                              item_quotation: e.target.checked ? 1 : 0,
                            })
                          }
                        />
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
                        <Checkbox
                          checked={data_head.item_halal_cert}
                          onChange={(e) =>
                            upDateFormValue({
                              item_halal_cert: e.target.checked ? 1 : 0,
                            })
                          }
                        />
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
                        <Checkbox
                          checked={data_head.item_non_haram}
                          onChange={(e) =>
                            upDateFormValue({
                              item_non_haram: e.target.checked ? 1 : 0,
                            })
                          }
                        />
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
                        <Checkbox
                          checked={data_head.item_non_halal}
                          onChange={(e) =>
                            upDateFormValue({
                              item_non_halal: e.target.checked ? 1 : 0,
                            })
                          }
                        />
                      </Col>
                      <Col span={9}>
                        <Text strong> Non-Halal.</Text>
                      </Col>
                      <Col span={10}></Col>
                    </Row>
                  </Col>
                </Row>
              </Tabs.TabPane>
              <Tabs.TabPane tab={"Purchase"} key="3">
                <Row className="col-2 row-margin-vertical">
                  <Col span={3}>
                    <Text strong>Sale price</Text>
                  </Col>
                  <Col span={8}>
                    <InputNumber
                      {...numberFormat}
                      style={{ width: "100%" }}
                      value={data_head.item_price}
                      precision={3}
                      onChange={(data) => upDateFormValue({ item_price: data })}
                    />
                  </Col>
                </Row>
                <Row className="col-2 row-tab-margin-lg"></Row>
                <Line
                  readOnly={false}
                  detailDispatch={detailDispatch}
                  data_detail={data_detail}
                />
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
      <Comments data={dataComments} />
    </MainLayout>
  );
};

export default ItemCreate;
