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
import { getSelectDetail } from "../../actions/itemActions";
const { Option } = Select;
const { TextArea } = Input;
const { Title, Paragraph, Text } = Typography;

const ItemCreate = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSelectDetail());
  }, []);
  const select_detail = useSelector((state) => state.item.select_detail);

  const data = props.location.state ? props.location.state : 0;
  const [editForm, setEdit] = useState(true);

  const [formData, setData] = useState(
    data && data
      ? data
      : {
          item_id: 0,
          item_no: null,
          item_name: null,
          item_name_th: null,
          item_image_path: null,
          item_sale: 0,
          item_purchase: 0,
          item_price: 0,
          item_cost: 0,
          item_barcode: null,
          item_weight: 0,
          item_mfd_leadtime: 0,
          item_min: 0,
          item_max: 0,
          item_customer_run_no: null,
          uom_id: null,
          type_id: null,
          category_id: null,
          item_qty_tg: null,
          branch_id: null,
          identify_benefit_id: null,
          item_remark: null,
          item_actived: 1,
          item_created_by: null,
          item_updated_by: null,
          vat_id: 1,
        }
  );

  const callback = (key) => {};

  const upDateFormValue = (data) => {
    setData({ ...formData, ...data });
  };
  const projectDetail = JSON.parse(localStorage.getItem("project_detail"));
  const config = {
    projectId: projectDetail.project_id,
    title: projectDetail.project_name,
    home: projectDetail.project_url,
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
    action: [{ name: "print", link: "www.google.co.th" }],
    step: {
      // current: formData.req_step,
      // step: ["User", "Manager", "Purchase", "Manager Purchase", "Board"],
    },
    create: "",
    // save: {
    //   data: formData,
    //   path: formData && "/inventory/items/view/" + formData.id,
    // },
    save: "function",
    discard: "/inventory/items",
    onSave: (e) => {
      e.preventDefault();
      console.log(formData);
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
  const getNameById = (id, masterData, masterField, field) => {
    const data =
      id && masterData.filter((data) => data[`${masterField}`] === id);
    console.log(data);
    const data2 = data && { ...data[0] };
    return data2 && data2[`${field}`] ? data2[`${field}`] : "";
  };
  return (
    <MainLayout {...config} data={formData}>
      <div id="form">
        <Row className="col-2">
          <Col span={11}>
            <h2>
              <strong>{formData.item_no ? "Edit" : "Create"} Item</strong>
            </h2>
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
          <Col span={24} style={{ padding: "0px 5px", marginBottom: 8 }}>
            <Title level={5}>Name </Title>
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
          </Col>
        </Row>

        <Row className="col-2 row-tab-margin">
          <Col span={24}>
            <Tabs defaultActiveKey="1" onChange={callback}>
              <Tabs.TabPane tab="Detail" key="1">
                <Row className="col-2 row-margin-vertical">
                  <Col span={3}>
                    <Text strong>Item Code </Text>
                  </Col>
                  <Col span={8}>
                    <Input
                      onChange={(e) =>
                        upDateFormValue({ item_no: e.target.value })
                      }
                      defaultValue={formData.item_no}
                      value={formData.item_no}
                    />
                  </Col>
                  <Col span={2}></Col>
                  <Col span={3}>
                    <Text strong>Item Type </Text>
                  </Col>
                  <Col span={8}>
                    <Select
                      onChange={(data) => upDateFormValue({ item_type: data })}
                      value={getNameById(
                        formData.item_type,
                        select_detail.item_type,
                        "type_id",
                        "type_name"
                      )}
                    >
                      {select_detail.item_type.map((type) => {
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
                        select_detail.item_category,
                        "category_id",
                        "category_name"
                      )}
                    >
                      {select_detail.item_category.map((categ) => {
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
                        select_detail.item_uom,
                        "uom_id",
                        "uom_no"
                      )}
                    >
                      {select_detail.item_uom.map((uom) => {
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
