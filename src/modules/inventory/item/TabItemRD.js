import { UploadOutlined } from "@ant-design/icons";
import {
  Checkbox,
  Col,
  Input,
  InputNumber,
  Row,
  Tabs,
  Upload,
  Button,
  Space,
  Radio,
} from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import { useSelector } from "react-redux";
import CustomSelect from "../../../components/CustomSelect";
import Line from "../../../components/VendorLine";
import { numberFormat } from "../../../include/js/main_config";
const { TextArea } = Input;

const TabItemRD = ({
  key,
  master_data,
  data_head,
  upDateFormValue,
  data_detail,
  detailDispatch,
}) => {
  const currency_list = useSelector(
    (state) => state.accounting.master_data.currency
  );
  return (
    <>
      <Row className="col-2 row-margin-vertical">
        <Col
          span={12}
          style={{
            borderRight: "1px solid #c4c4c4",
          }}
        >
          <Row className="col-2 row-margin-vertical">
            <Col span={6}>
              <Text strong>Item trade name</Text>
            </Col>
            <Col span={16}>
              <Input
                name="item_trade_name"
                placeholder="Item trade name"
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
              <Text strong>Vendor item name </Text>
            </Col>
            <Col span={16}>
              <Input
                name="vendor_item_name"
                placeholder="Vendor item name"
                onChange={(e) =>
                  upDateFormValue({
                    vendor_item_name: e.target.value,
                  })
                }
                value={data_head.vendor_item_name}
              />
            </Col>
            <Col span={2}></Col>
          </Row>
          <Row className="col-2 row-margin-vertical">
            <Col span={6}>
              <Text strong>Customer name </Text>
            </Col>
            <Col span={16}>
              <CustomSelect name="customer_id" placeholder="Customer Name" />
            </Col>
            <Col span={2}></Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row className="col-2 row-margin-vertical">
            <Col span={2}></Col>
            <Col span={6}>
              <Text strong>Price Approve By</Text>
            </Col>
            <Col span={16}>
              <Radio.Group
                onChange={(e) =>
                  upDateFormValue({
                    item_price_approve_id: e.target.value,
                  })
                }
                value={data_head.item_price_approve_id}
              >
                <Radio className="radio-vertical" value={1}>
                  SL
                </Radio>
                <Radio className="radio-vertical" value={2}>
                  Customer
                </Radio>
              </Radio.Group>
            </Col>
          </Row>
          <Row className="col-2 row-tab-margin"></Row>
          <Row className="col-2 row-margin-vertical">
            <Col span={2}></Col>
            <Col span={6}>
              <Text strong>Sale to</Text>
            </Col>
            <Col span={16}>
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
              <Upload>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
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
              <Upload>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
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
              <Upload>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
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
              <Upload>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
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
              <Upload>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
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
    </>
  );
};

export default TabItemRD;
