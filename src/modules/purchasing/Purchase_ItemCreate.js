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
import MainLayout from "../../components/MainLayout";
import Line from "../../components/VendorLine";
import { autoCompleteUnit } from "../../data/inventoryData";
import Comments from "../../components/Comments";
import { dataComments } from "../../data";
import { units } from "../../data/units";
import { categorys } from "../../data/category";
import Barcode from "react-barcode";
import { vendorColumns, vendors, companys } from "../../data/itemData";
const { Option } = Select;
const { TextArea } = Input;
const { Title, Text } = Typography;

const ItemCreate = (props) => {
  const data =
    props.location && props.location.state ? props.location.state : 0;

  const [formData, setData] = useState(
    data && data
      ? data
      : {
          id: 0,
          itemCode: null,
          itemBarcode: Math.floor(Math.random() * 12351123122122453).toString(),
          itemName: null,
          itemQtyOnhand: null,
          itemUnit: 0,
          itemCateg: "",
          itemDesc: 0,
          itemSold: 0,
          itemPurchase: 1,
          itemSalePrice: 100,
          itemType: 0,
          itemImg: "/",
          vendor: [
            {
              id: 0,
              vendorName: "",
              companyName: "",
              itemQty: 0,
              itemUnit: "pc",
              itemPrice: 0,
            },
          ],
        }
  );

  const callback = (key) => {};

  const upDateFormValue = (data) => {
    setData({ ...formData, ...data });
  };
  console.log(formData);
  const config = {
    projectId: 2,
    title: "PURCHASE",
    show: true,
    breadcrumb: [
      "Home",
      "Items",
      formData.itemCode ? "Edit" : "Create",
      formData.itemCode && "[ " + formData.itemCode + " ] " + formData.itemName,
    ],
    search: false,
    buttonAction: ["Save", "SaveConfirm", "Discard"],

    action: [{ name: "Print", link: "www.google.co.th" }],
    step: {
      // current: formData.req_step,
      // step: ["User", "Manager", "Purchase", "Manager Purchase", "Board"],
    },
    create: "",
    save: {
      data: formData,
      path: formData && "/purchase/items/view/" + formData.id,
    },
    discard: "/purchase/items",
    onSave: (e) => {
      e.preventDefault();
      console.log(formData);
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
    <MainLayout {...config} data={formData}>
      <div id="form">
        <Row className="col-2">
          <Col span={11}>
            <h2>
              <strong>
                {formData.itemCode ? "Edit" : "Create"} Item{" "}
                {formData.itemCode
                  ? "#[ " + formData.itemCode + " ] " + formData.itemName
                  : null}
              </strong>
            </h2>
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
            <Title level={5}>Name </Title>
            <Input
              onChange={(e) => upDateFormValue({ itemName: e.target.value })}
              defaultValue={formData.itemName}
            />
          </Col>
        </Row>
        <Row className="col-2">
          <Col span={24} style={{ marginLeft: 5 }}>
            <Space align="baseline">
              <Checkbox
                defaultChecked={formData.itemSold}
                onChange={(e) =>
                  upDateFormValue({ itemSold: e.target.checked })
                }
              />
              <Text>Can be sold</Text>
            </Space>
            <br />
            <Space align="baseline">
              <Checkbox
                defaultChecked={formData.itemPurchase}
                onChange={(e) =>
                  upDateFormValue({ itemPurchase: e.target.checked })
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
                        upDateFormValue({ itemCode: e.target.value })
                      }
                      defaultValue={formData.itemCode}
                    />
                  </Col>
                  <Col span={2}></Col>
                  <Col span={3}>
                    <Text strong>Category </Text>
                  </Col>
                  <Col span={8}>
                    <Select
                      placeholder={"Category..."}
                      onSelect={(data) =>
                        upDateFormValue({
                          itemCateg: data,
                        })
                      }
                      style={{ width: "100%" }}
                      defaultValue={formData.itemCateg}
                    >
                      <Option value="null"> </Option>
                      {categorys.map((categ) => {
                        return (
                          <Option key={categ.id} value={categ.value}>
                            {categ.value}
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
                        upDateFormValue({ itemBarcode: e.target.value })
                      }
                      defaultValue={formData.itemBarcode}
                    />
                  </Col>

                  <Col span={2}></Col>

                  <Col span={3}>
                    <Text strong>Sale Price</Text>
                  </Col>
                  <Col span={8}>
                    <InputNumber
                      style={{ width: "100%" }}
                      defaultValue={formData.itemSalePrice}
                      precision={3}
                      onChange={(data) =>
                        upDateFormValue({ itemSalePrice: data })
                      }
                    />
                  </Col>
                </Row>
                <Row className="col-2 row-margin-vertical">
                  <Col span={3}>
                    <Text strong>Unit of measure</Text>
                  </Col>
                  <Col span={8}>
                    <AutoComplete
                      options={units}
                      placceholder={"Unit of measure..."}
                      defaultValue={formData.itemUnit}
                      filterOption={(inputValue, option) =>
                        option.value
                          .toUpperCase()
                          .indexOf(inputValue.toUpperCase()) !== -1
                      }
                      onSelect={(data) => upDateFormValue({ itemUnit: data })}
                      onChange={(data) => upDateFormValue({ itemUnit: data })}
                      style={{ width: "100%" }}
                    />
                  </Col>
                  <Col span={2}></Col>
                  <Col span={3}>
                    <Text strong>Item Type </Text>
                  </Col>
                  <Col span={8}>
                    <Radio.Group
                      onChange={(e) =>
                        upDateFormValue({ itemType: e.target.value })
                      }
                      defaultValue={formData.itemType}
                    >
                      <Radio value={0}>RM</Radio>
                      <Radio value={1}>PK</Radio>
                      <Radio value={2}>BULK</Radio>
                      <Radio value={3}>FG</Radio>
                      <Radio value={4}>Others</Radio>
                    </Radio.Group>
                  </Col>
                </Row>
                <Row className="col-2">
                  <Col span={24}>
                    <Space direction="vertical" style={{ width: "100%" }}>
                      <Text strong>Description </Text>
                      <TextArea
                        onChange={(e) =>
                          upDateFormValue({ itemDesc: e.target.value })
                        }
                        defaultValue={formData.itemDesc}
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
