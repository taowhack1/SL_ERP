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
const { Option } = Select;
const { TextArea } = Input;
const { Title, Paragraph, Text } = Typography;

const ItemCreate = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    // $("input").attr("readonly", true).css("border", "none");
    dispatch(getSelectDetail());
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
              <strong>Name</strong>
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
                  <Col span={2}></Col>
                  <Col span={3}>
                    <Text strong>Item Type </Text>
                  </Col>
                  <Col span={8}>
                    <Select
                      onChange={(data) => upDateFormValue({ type_id: data })}
                      value={getNameById(
                        formData.type_id,
                        master_data.item_type,
                        "type_id",
                        "type_name"
                      )}
                    >
                      {master_data.item_type &&
                        master_data.item_type.map((type) => {
                          return (
                            <Option key={type.type_id} value={type.type_id}>
                              {type.type_no}
                            </Option>
                          );
                        })}
                    </Select>
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
                    <Select
                      placeholder={"Select Category"}
                      onSelect={(data) =>
                        upDateFormValue({
                          category_id: data,
                        })
                      }
                      style={{ width: "100%" }}
                      value={getNameById(
                        formData.category_id,
                        master_data.item_category,
                        "category_id",
                        "category_name"
                      )}
                    >
                      {master_data.item_category.map((categ) => {
                        return (
                          <Option
                            key={categ.category_id}
                            value={categ.category_id}
                          >
                            {categ.category_name}
                          </Option>
                        );
                      })}
                    </Select>
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
                <Row className="col-2">
                  <Col span={24}>
                    <Space direction="vertical" style={{ width: "100%" }}>
                      <Text strong>Description </Text>
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
              <Tabs.TabPane tab="Purchase" key="2">
                <Row
                  className="col-2 row-margin-vertical"
                  style={{ paddingBottom: 25 }}
                >
                  <Col span={2}>
                    <Text strong>Qty. Min.</Text>
                  </Col>
                  <Col span={3}>
                    <InputNumber
                      placeholder={"Min"}
                      min={0.0}
                      step={0.0001}
                      precision={4}
                      style={{ width: "100%" }}
                      disabled={0}
                      defaultValue={0}
                      value={formData.item_min}
                      onChange={(data) => upDateFormValue({ item_min: data })}
                      size="small"
                    />
                  </Col>
                  <Col span={2}></Col>
                  <Col span={2}>
                    <Text strong>Qty. Max.</Text>
                  </Col>
                  <Col span={3}>
                    <InputNumber
                      placeholder={"Max"}
                      min={0.0}
                      step={0.0001}
                      precision={4}
                      style={{ width: "100%" }}
                      disabled={0}
                      defaultValue={0}
                      value={formData.item_max}
                      onChange={(data) => upDateFormValue({ item_max: data })}
                      size="small"
                    />
                  </Col>
                  <Col span={12}></Col>
                </Row>
                <Line
                  vendors={vendors}
                  companys={companys}
                  units={autoCompleteUnit}
                  dataLine={formData.vendor ? formData.vendor : []}
                  // autoData={autoCompleteItem}
                  columns={vendorColumns}
                  // readOnly={false}
                  updateData={upDateFormValue}
                />
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
      <Comments data={[...dataComments]} />
    </MainLayout>
  );
};

export default ItemCreate;
