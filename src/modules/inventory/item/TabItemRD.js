import {
  BorderOutlined,
  CheckSquareOutlined,
  UploadOutlined,
} from "@ant-design/icons";
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
import { get_pre_run_no } from "../../../include/js/function_main";
import { numberFormat } from "../../../include/js/main_config";
import ItemCertificate from "./ItemCertificate";
const { TextArea } = Input;

const TabItemRD = ({
  data_file,
  updateFile,
  master_data,
  data_head,
  upDateFormValue,
  customers,
  readOnly,
}) => {
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
            <Col span={7}>
              <Text strong>Item trade name</Text>
            </Col>
            <Col span={16}>
              {readOnly ? (
                <Text className="text-view">
                  {data_head.item_name_trade ? data_head.item_name_trade : "-"}
                </Text>
              ) : (
                <Input
                  name="item_name_trade"
                  placeholder="Item trade name"
                  onChange={(e) =>
                    upDateFormValue({
                      item_name_trade: e.target.value,
                    })
                  }
                  value={data_head.item_name_trade}
                />
              )}
            </Col>
            <Col span={1}></Col>
          </Row>
          <Row className="col-2 row-margin-vertical">
            <Col span={7}>
              <Text strong>Vendor item name </Text>
            </Col>
            <Col span={16}>
              {readOnly ? (
                <Text className="text-view">
                  {data_head.item_name_vendor
                    ? data_head.item_name_vendor
                    : "-"}
                </Text>
              ) : (
                <Input
                  placeholder="Vendor item name"
                  onChange={(e) =>
                    upDateFormValue({
                      item_name_vendor: e.target.value,
                    })
                  }
                  value={data_head.item_name_vendor}
                />
              )}
            </Col>
            <Col span={1}></Col>
          </Row>
          <Row className="col-2 row-margin-vertical">
            <Col span={7}>
              <Text strong>
                {!readOnly && <span className="require">* </span>}
                Customer name
              </Text>
            </Col>
            <Col span={16}>
              {readOnly ? (
                <Text className="text-view">
                  {data_head.customer_no_name
                    ? data_head.customer_no_name
                    : "-"}
                </Text>
              ) : (
                <CustomSelect
                  allowClear
                  disabled={data_head.item_id ? 1 : 0}
                  showSearch
                  placeholder={"Customer name"}
                  name="customer_id"
                  field_id="customer_id"
                  field_name="customer_no_name"
                  value={data_head.customer_no_name}
                  data={customers}
                  onChange={(data, option) => {
                    data && data
                      ? upDateFormValue({
                          customer_id: option.data.customer_id,
                          customer_no_name: option.data.customer_no_name,
                          item_customer_run_no: option.data.customer_name_short,
                          item_pre_run_no: get_pre_run_no(
                            data_head.item_pre_run_no,
                            2,
                            option.data.customer_name_short
                          ),
                        })
                      : upDateFormValue({
                          customer_id: null,
                          customer_no_name: null,
                          item_customer_run_no: null,
                          item_pre_run_no: get_pre_run_no(
                            data_head.item_pre_run_no,
                            2,
                            "---"
                          ),
                        });
                  }}
                />
              )}
            </Col>
            <Col span={1}></Col>
          </Row>
          <Row className="col-2 row-margin-vertical">
            <Col span={7}>
              <Text strong>
                {!readOnly && <span className="require">* </span>}
                Identify benefit
              </Text>
            </Col>
            <Col span={16}>
              {readOnly ? (
                <Text className="text-view">
                  {data_head.identify_benefit_no_name
                    ? data_head.identify_benefit_no_name
                    : "-"}
                </Text>
              ) : (
                <CustomSelect
                  allowClear
                  disabled={data_head.item_id ? 1 : 0}
                  showSearch
                  placeholder={"Identify benefit"}
                  name="identify_benefit_id"
                  field_id="identify_benefit_id"
                  field_name="identify_benefit_no_name"
                  value={data_head.identify_benefit_no_name}
                  data={master_data.item_benefit}
                  onChange={(data, option) => {
                    data && data
                      ? upDateFormValue({
                          identify_benefit_id: option.data.identify_benefit_id,
                          identify_benefit_no_name:
                            option.data.identify_benefit_no_name,
                          item_pre_run_no: get_pre_run_no(
                            data_head.item_pre_run_no,
                            3,
                            option.data.identify_benefit_run_no
                          ),
                        })
                      : upDateFormValue({
                          identify_benefit_id: null,
                          identify_benefit_no_name: null,
                          item_pre_run_no: get_pre_run_no(
                            data_head.item_pre_run_no,
                            3,
                            "-"
                          ),
                        });
                  }}
                />
              )}
            </Col>
            <Col span={1}></Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row className="col-2 row-margin-vertical">
            <Col span={1}></Col>
            <Col span={7}>
              <Text strong>Price approve by</Text>
            </Col>
            <Col span={16}>
              {readOnly ? (
                <Text className="text-view">
                  {data_head.item_price_approve === 1 ? "SL" : "Customer"}
                </Text>
              ) : (
                <Radio.Group
                  onChange={(e) =>
                    upDateFormValue({
                      item_price_approve: e.target.value,
                    })
                  }
                  value={data_head.item_price_approve}
                >
                  <Radio className="radio-vertical" value={1}>
                    SL
                  </Radio>
                  <Radio className="radio-vertical" value={2}>
                    Customer
                  </Radio>
                </Radio.Group>
              )}
            </Col>
          </Row>
          <Row className="col-2 row-tab-margin"></Row>
          <Row className="col-2 row-margin-vertical">
            <Col span={1}></Col>
            <Col span={7}>
              <Text strong>Sale to</Text>
            </Col>
            <Col span={16}>
              {readOnly ? (
                <>
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
                </>
              ) : (
                <>
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
                </>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
      <ItemCertificate
        data_file={data_file}
        updateFile={updateFile}
        data_head={data_head}
        upDateFormValue={upDateFormValue}
        readOnly={readOnly}
      />
    </>
  );
};

export default TabItemRD;
