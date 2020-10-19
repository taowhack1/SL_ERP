import React, { useState } from "react";
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
import { vendorColumns, vendors, companys } from "../../data/itemData";
const { Option } = Select;
const { TextArea } = Input;
const { Title, Paragraph, Text } = Typography;

const ItemView = (props) => {
  const data = props.location.state ? props.location.state : 0;
  const [editForm, setEdit] = useState(true);

  const [formData, setData] = useState(
    data && data
      ? data
      : {
          id: 0,
          itemName: "TEST PRODUCT NAME",
          itemCode: "102SLA03" + Math.floor(Math.random() * 10020),
          itemBarcode: Math.floor(Math.random() * 12351123122122453).toString(),

          itemQtyOnhand: null,
          itemUnit: 0,
          itemCateg: 0,
          itemDesc: "ทดสอบบันทึก",
          itemSold: 0,
          itemPurchase: 1,
          itemSalePrice: 100,
          itemType: 0,
          itemImg: "/",
          vendor: [
            {
              id: 0,
              vendorName: "vendorName",
              companyName: "companyName",
              itemQty: 0,
              itemUnit: "pc",
              itemPrice: 100.25,
            },
          ],
        }
  );
  const callback = (key) => {};

  const upDateFormValue = (data) => {
    setData({ ...formData, ...data });
  };
  const getCategName = (id) => {
    switch (id) {
      case 0:
        return "Raw Material";
      case 1:
        return "Packaging";
      case 2:
        return "Bulk";
      case 3:
        return "Finish Good";
      default:
        return "Others";
    }
  };
  const getUnitName = (id) => {
    switch (id) {
      case 0:
        return "unit";
      case 1:
        return "pc";
      case 2:
        return "liter";
      case 3:
        return "pack";
      default:
        return id;
    }
  };
  const config = {
    projectId: 2,
    title: "PURCHASE",
    show: true,
    breadcrumb: [
      "Home",
      "Items",
      "View",
      formData.itemCode && "[ " + formData.itemCode + " ] " + formData.itemName,
    ],
    search: false,
    buttonAction: ["Edit", "Discard"],
    action: [{ name: "Print", link: "www.google.co.th" }],
    step: {},
    create: "",
    save: {},
    edit: {
      data: formData,
      path: formData && "/purchase/items/edit/" + formData.id,
    },
    discard: "/purchase/items",
    onSave: (e) => {
      e.preventDefault();
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
              <strong>Item</strong>
            </h2> */}
          </Col>
          <Col span={2}></Col>
          <Col span={3}></Col>
          <Col span={8} style={{ textAlign: "right" }}>
            <Barcode
              value={formData.itemBarcode}
              width={1.5}
              height={30}
              fontSize={14}
            />
          </Col>
        </Row>
        <Row className="col-2">
          <Col span={24} style={{ padding: "0px 5px", marginBottom: 8 }}>
            <Title level={4}>{formData.itemName}</Title>
          </Col>
        </Row>
        <Row className="col-2">
          <Col span={24} style={{ marginLeft: 5 }}>
            <Space align="baseline">
              {formData.itemSold ? <CheckSquareOutlined /> : <BorderOutlined />}
              <Text>Can be sold</Text>
            </Space>
            <br />
            <Space align="baseline">
              {formData.itemPurchase ? (
                <CheckSquareOutlined />
              ) : (
                <BorderOutlined />
              )}
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
                    <Text>{formData.itemCode}</Text>
                  </Col>
                  <Col span={2}></Col>
                  <Col span={3}>
                    <Text strong>Category </Text>
                  </Col>
                  <Col span={8}>
                    <Text>{formData.itemCateg}</Text>
                  </Col>
                </Row>
                <Row className="col-2 row-margin-vertical">
                  <Col span={3}>
                    <Text strong>Item barcode</Text>
                  </Col>
                  <Col span={8}>
                    <Text>{formData.itemBarcode}</Text>
                  </Col>

                  <Col span={2}></Col>

                  <Col span={3}>
                    <Text strong>Sale Price</Text>
                  </Col>
                  <Col span={8}>
                    <Text>{formData.itemSalePrice}</Text>
                  </Col>
                </Row>
                <Row className="col-2 row-margin-vertical">
                  <Col span={3}>
                    <Text strong>Unit of measure</Text>
                  </Col>
                  <Col span={8}>
                    <Text>{getUnitName(formData.itemUnit)}</Text>
                  </Col>
                  <Col span={2}></Col>
                  <Col span={3}>
                    <Text strong>Item Type </Text>
                  </Col>
                  <Col span={8}>
                    <Text>{getCategName(formData.itemType)}</Text>
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
                        {formData.itemDesc}
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
            </Tabs>
          </Col>
        </Row>
      </div>
      <Comments data={[...dataComments]} />
    </MainLayout>
  );
};

export default ItemView;
