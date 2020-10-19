import React, { useState } from "react";
import { useSelector } from "react-redux";
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
import { CheckSquareOutlined, BorderOutlined } from "@ant-design/icons";
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
import { item_fields } from "../../page_fields/inventory/item";
import { vendorColumns, vendors, companys } from "../../data/itemData";
import { getNameById } from "../../include/js/function_main";
const { Option } = Select;
const { TextArea } = Input;
const { Title, Paragraph, Text } = Typography;

const ItemView = (props) => {
  const master_data = useSelector((state) => state.inventory.master_data);
  const data = props.location.state ? props.location.state : 0;
  const [editForm, setEdit] = useState(true);

  const [formData, setData] = useState(data && data ? data : item_fields);
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
      "View",
      formData.item_no && "[ " + formData.item_no + " ] " + formData.item_name,
    ],
    search: false,
    buttonAction: ["Edit", "Discard"],
    action: [{ name: "Print", link: "www.google.co.th" }],
    step: {},
    create: "",
    save: {},
    edit: {
      data: formData,
      path: formData && "/inventory/items/edit/" + formData.item_id,
    },
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
  return (
    <MainLayout {...config}>
      <div id="form">
        <Row className="col-2">
          <Col span={11}>
            {/* <h2>
              {formData.item_no && (
                <strong>{formData.item_no ? "Edit" : "Create"} Item</strong>
              )}
            </h2> */}
            <h2 style={{ marginBottom: 8 }}>
              <strong>Item Code # {formData.item_no}</strong>
            </h2>
            <h3>
              <strong>{formData.item_name}</strong>
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
          <Col span={24} style={{ padding: "0px 5px", marginBottom: 8 }}>
            {/* <Input
              onChange={(e) => upDateFormValue({ item_name: e.target.value })}
              defaultValue={formData.item_name}
            /> */}
          </Col>
        </Row>
        <Row className="col-2">
          <Col span={24} style={{ marginLeft: 5 }}>
            <Space align="baseline">
              {formData.item_sale ? (
                <CheckSquareOutlined />
              ) : (
                <BorderOutlined />
              )}
              <Text>Can be sold</Text>
            </Space>
            <br />
            <Space align="baseline">
              {formData.item_purchase ? (
                <CheckSquareOutlined />
              ) : (
                <BorderOutlined />
              )}
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
                  disabled
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
                    <Text>{formData.item_customer_run_no}</Text>
                  </Col>
                  <Col span={2}></Col>
                  <Col span={3}>
                    <Text strong>Category </Text>
                  </Col>
                  <Col span={8}>
                    <Text>
                      {getNameById(
                        formData.category_id,
                        master_data.item_category,
                        "category_id",
                        "category_name"
                      )}
                    </Text>
                  </Col>
                </Row>
                <Row className="col-2 row-margin-vertical">
                  <Col span={3}>
                    <Text strong>Item barcode</Text>
                  </Col>
                  <Col span={8}>
                    <Text>{formData.item_barcode}</Text>
                  </Col>

                  <Col span={2}></Col>
                  <Col span={3}>
                    <Text strong>Item Type </Text>
                  </Col>
                  <Col span={8}>
                    <Text>
                      {getNameById(
                        formData.type_id,
                        master_data.item_type,
                        "type_id",
                        "type_name"
                      )}
                    </Text>
                  </Col>
                </Row>
                <Row className="col-2 row-margin-vertical">
                  <Col span={3}>
                    <Text strong>Unit of measure</Text>
                  </Col>
                  <Col span={8}>
                    <Text>
                      {getNameById(
                        formData.uom_id,
                        master_data.item_uom,
                        "uom_id",
                        "uom_no"
                      )}
                    </Text>
                  </Col>
                  <Col span={2}></Col>

                  <Col span={3}>
                    <Text strong>Sale Price</Text>
                  </Col>
                  <Col span={8}>
                    <Text>{formData.item_price}</Text>
                  </Col>
                </Row>
                <Row className="col-2">
                  <Col span={24}>
                    <Space
                      direction="vertical"
                      style={{ width: "100%", marginTop: 10 }}
                    >
                      <Text strong type="warning">
                        Description
                      </Text>
                      <Text style={{ paddingLeft: 10 }}>
                        {formData.item_remark}
                      </Text>
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
                  readOnly={true}
                  updateData={upDateFormValue}
                />
              </Tabs.TabPane>
              {/* <Tabs.TabPane tab="Note" key="3">
                <TextArea
                  rows={3}
                  placeholder={"Remark your request"}
                  onChange={(e) =>
                    upDateFormValue({ req_note: e.target.value })
                  }
                />
              </Tabs.TabPane> */}
            </Tabs>
          </Col>
        </Row>
      </div>
      <Comments data={[...dataComments]} />
    </MainLayout>
  );
};

export default ItemView;
