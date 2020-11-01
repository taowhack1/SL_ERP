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
import { item_fields } from "../../page_fields/inventory/item";
import { getNameById } from "../../include/js/function_main";
import $ from "jquery";
import { getMasterDataItem } from "../../actions/inventory";
import { UploadOutlined } from "@ant-design/icons";
import CustomSelect from "../../components/CustomSelect";
import { item_vendor_columns } from "./config/item";
const { Option } = Select;
const { TextArea } = Input;
const { Title, Paragraph, Text } = Typography;
const props = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
const ItemCreate = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    // $("input").attr("readonly", true).css("border", "none");
    dispatch(getMasterDataItem());
  }, []);
  const master_data = useSelector((state) => state.inventory.master_data);
  const data = props.location.state ? props.location.state : 0;

  const [editForm, setEdit] = useState(true);

  const [formData, setData] = useState(
    data && data ? { ...data, commit: 1, user_name: "2563002" } : item_fields
  );

  const callback = (key) => {};

  const upDateFormValue = (data) => {
    setData({ ...formData, ...data });
  };

  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project.project_id,
    title: current_project.project_name,
    home: current_project.project_url,
    show: true,
    breadcrumb: [
      "Home",
      "Items",
      formData.item_no ? "Edit" : "Create",
      formData.item_no && "[ " + formData.item_no + " ] " + formData.item_name,
    ],
    search: false,
    buttonAction: editForm
      ? ["Save", "SaveConfirm", "Discard"]
      : ["Edit", "Approve", "Reject"],
    action: [{ name: "Print", link: "www.google.co.th" }],
    step: {
      // current: formData.req_step,
      // step: ["User", "Manager", "Purchase", "Manager Purchase", "Board"],
    },
    create: "",
    save: {
      data: formData,
      path: formData && "/inventory/items/view/" + formData.item_id,
    },
    // save: "function",
    discard: "/inventory/items",
    onSave: (e) => {
      e.preventDefault();
      console.log("Save");
      formData.item_no
        ? dispatch(upDateItem(formData, formData.item_id))
        : dispatch(createNewItems(formData));
    },
    onEdit: (e) => {
      e.preventDefault();
      console.log("Edit");
      setEdit(true);
    },
    onApprove: (e) => {
      e.preventDefault();
      console.log("Approve");
    },
    onConfirm: () => {
      console.log("Confirm");
    },
  };

  const dateConfig = {
    format: "DD/MM/YYYY HH:mm:ss",
    value: moment(),
    disabled: 1,
  };

  return (
    <MainLayout {...config} data={formData}>
      <div id="form">
        <Row className="col-2">
          <Col span={11}>
            <h2>
              <strong>{formData.item_no ? "Edit" : "Create"} Item</strong>
            </h2>
            <h3 style={{ marginBottom: 8 }}>
              {formData.item_no && (
                <strong>Item Code # {formData.item_no}</strong>
              )}
            </h3>
          </Col>
          <Col span={2}></Col>
          <Col span={3}></Col>
          <Col span={8} style={{ textAlign: "right" }}>
            <Barcode
              value={formData.item_barcode}
              width={1.5}
              height={30}
              fontSize={14}
            />
          </Col>
        </Row>
        <Row className="col-2">
          <Col span={24} style={{ marginBottom: 8 }}>
            <h3>
              <strong>Trade Name</strong>
            </h3>
            <Input
              onChange={(e) => upDateFormValue({ item_name: e.target.value })}
              defaultValue={formData.item_name}
            />
          </Col>
        </Row>
        <Row className="col-2">
          <Col span={24} style={{ marginLeft: 5 }}>
            <Space align="baseline">
              <Checkbox
                defaultChecked={formData.item_sale}
                onChange={(e) =>
                  upDateFormValue({ item_sale: e.target.checked ? 1 : 0 })
                }
              />
              <Text>Can be sold</Text>
            </Space>
            <br />
            <Space align="baseline">
              <Checkbox
                defaultChecked={formData.item_purchase}
                onChange={(e) =>
                  upDateFormValue({ item_purchase: e.target.checked ? 1 : 0 })
                }
              />
              <Text>Can be purchase</Text>
            </Space>
            {formData.item_no && (
              <Space
                align="baseline"
                style={{ float: "right", marginRight: 10 }}
              >
                <Text strong>Active</Text>
                <Switch
                  checkedChildren={""}
                  unCheckedChildren={""}
                  checked={formData.item_actived}
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
              <Tabs.TabPane tab="Detail" key="1">
                <Row className="col-2 row-margin-vertical">
                  <Col span={3}>
                    <Text strong>Description </Text>
                  </Col>
                  <Col span={8}>
                    <Input
                      placeholder="Description"
                      onChange={(e) =>
                        upDateFormValue({
                          item_customer_run_no: e.target.value,
                        })
                      }
                      defaultValue={""}
                      value={""}
                    />
                  </Col>
                  <Col span={2}></Col>
                  <Col span={3}>
                    <Text strong>Item Type </Text>
                  </Col>
                  <Col span={8}>
                    <CustomSelect
                      allowClear
                      showSearch
                      placeholder={"Item Type"}
                      field_id="type_id"
                      field_name="type_no_name"
                      value={formData.type_no_name}
                      data={master_data.item_type}
                      onChange={(data, option) => {
                        data && data
                          ? upDateFormValue({
                              type_id: data,
                              type_no_name: option.title,
                              category_id: null,
                              category_no_name: null,
                            })
                          : upDateFormValue({
                              category_id: null,
                              category_no_name: null,
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
                      onChange={(e) =>
                        upDateFormValue({ item_barcode: e.target.value })
                      }
                      defaultValue={formData.item_barcode}
                    />
                  </Col>

                  <Col span={2}></Col>
                  <Col span={3}>
                    <Text strong>Category </Text>
                  </Col>
                  <Col span={8}>
                    <CustomSelect
                      allowClear
                      showSearch
                      placeholder={"Category"}
                      field_id="category_id"
                      field_name="category_no_name"
                      value={formData.category_no_name}
                      data={
                        formData.type_id
                          ? master_data.item_category.filter(
                              (categ) => categ.type_id === formData.type_id
                            )
                          : master_data.item_category
                      }
                      onChange={(data, option) => {
                        data && data
                          ? upDateFormValue({
                              category_id: data,
                              category_no_name: option.title,
                            })
                          : upDateFormValue({
                              category_id: null,
                              category_no_name: null,
                            });
                      }}
                    />
                  </Col>
                </Row>
                <Row className="col-2 row-margin-vertical">
                  <Col span={3}>
                    <Text strong>Unit of measure</Text>
                  </Col>
                  <Col span={8}>
                    <Select
                      placeholder={"Unit of Measure"}
                      onSelect={(data) =>
                        upDateFormValue({
                          uom_id: data,
                        })
                      }
                      style={{ width: "100%" }}
                      value={getNameById(
                        formData.uom_id,
                        master_data.item_uom,
                        "uom_id",
                        "uom_no"
                      )}
                    >
                      {master_data.item_uom.map((uom) => {
                        return (
                          <Option key={uom.uom_id} value={uom.uom_id}>
                            {uom.uom_no}
                          </Option>
                        );
                      })}
                    </Select>
                  </Col>
                  <Col span={2}></Col>
                  <Col span={3}>
                    <Text strong>SRL </Text>
                  </Col>
                  <Col span={8}>
                    <Input
                      onChange={(e) =>
                        upDateFormValue({
                          item_customer_run_no: e.target.value,
                        })
                      }
                      defaultValue={formData.item_customer_run_no}
                      value={formData.item_customer_run_no}
                    />
                  </Col>
                </Row>
                <Row className="col-2">
                  <Col span={24}>
                    <Space direction="vertical" style={{ width: "100%" }}>
                      <Text strong>Notes </Text>
                      <TextArea
                        onChange={(e) =>
                          upDateFormValue({ item_remark: e.target.value })
                        }
                        defaultValue={formData.item_remark}
                      />
                    </Space>
                  </Col>
                </Row>
              </Tabs.TabPane>
              <Tabs.TabPane tab="R&D" key="2">
                <Row className="col-2 row-margin-vertical">
                  <Col span={3}>
                    <Text strong>Trade Name</Text>
                  </Col>
                  <Col span={8}>
                    <Input
                      placeholder="Item Trade Name"
                      onChange={(e) =>
                        upDateFormValue({
                          item_trade_name: e.target.value,
                        })
                      }
                      defaultValue={formData.item_trade_name}
                      value={formData.item_trade_name}
                    />
                  </Col>
                  <Col span={2}></Col>
                  <Col span={2}>
                    <Text strong>Sale to</Text>
                  </Col>
                  <Col span={9}>
                    <Row>
                      <Col span={24}>
                        <Space align="baseline">
                          <Checkbox
                            defaultChecked={formData.item_sale_to_local}
                            onChange={(e) =>
                              upDateFormValue({
                                item_sale_to_local: e.target.checked ? 1 : 0,
                              })
                            }
                          />
                          <Text>Local</Text>
                        </Space>
                        <br />
                        <Space align="baseline">
                          <Checkbox
                            defaultChecked={formData.item_sale_to_export}
                            onChange={(e) =>
                              upDateFormValue({
                                item_sale_to_export: e.target.checked ? 1 : 0,
                              })
                            }
                          />
                          <Text>Export</Text>
                        </Space>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row className="col-2 row-margin-vertical">
                  <Col span={3}>
                    <Text strong>Shelf life (day) </Text>
                  </Col>
                  <Col span={8}>
                    <InputNumber
                      placeholder={"Shelf life (day)"}
                      min={0}
                      step={1}
                      precision={0}
                      style={{ width: "100%" }}
                      disabled={0}
                      defaultValue={formData.item_shelf_life}
                      onChange={(data) =>
                        upDateFormValue(formData.id, { item_shelf_life: data })
                      }
                    />
                  </Col>
                </Row>
                <Row className="col-2 row-margin-vertical">
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
                          defaultChecked={formData.item_purchase}
                          onChange={(e) =>
                            upDateFormValue({
                              item_purchase: e.target.checked ? 1 : 0,
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
                          defaultChecked={formData.item_purchase}
                          onChange={(e) =>
                            upDateFormValue({
                              item_purchase: e.target.checked ? 1 : 0,
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
                          defaultChecked={formData.item_purchase}
                          onChange={(e) =>
                            upDateFormValue({
                              item_purchase: e.target.checked ? 1 : 0,
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
                          defaultChecked={formData.item_purchase}
                          onChange={(e) =>
                            upDateFormValue({
                              item_purchase: e.target.checked ? 1 : 0,
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
                          defaultChecked={formData.item_purchase}
                          onChange={(e) =>
                            upDateFormValue({
                              item_purchase: e.target.checked ? 1 : 0,
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
                          defaultChecked={formData.item_purchase}
                          onChange={(e) =>
                            upDateFormValue({
                              item_purchase: e.target.checked ? 1 : 0,
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
              <Tabs.TabPane tab="Purchase" key="3">
                <Row className="col-2 row-margin-vertical">
                  <Col span={3}>
                    <Text strong>Sale Price</Text>
                  </Col>
                  <Col span={8}>
                    <InputNumber
                      style={{ width: "100%" }}
                      defaultValue={formData.item_price}
                      precision={3}
                      onChange={(data) => upDateFormValue({ item_price: data })}
                    />
                  </Col>
                </Row>
                <Row className="col-2 row-tab-margin-lg"></Row>
                <Line
                  vendors={vendors}
                  companys={companys}
                  units={autoCompleteUnit}
                  dataLine={formData.vendor ? formData.vendor : []}
                  // autoData={autoCompleteItem}
                  columns={item_vendor_columns}
                  // readOnly={false}
                  updateData={upDateFormValue}
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
