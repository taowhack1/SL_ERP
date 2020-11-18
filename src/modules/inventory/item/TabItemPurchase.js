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
} from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import { useSelector } from "react-redux";
import CustomSelect from "../../../components/CustomSelect";
import Line from "../../../components/VendorLine";
import { numberFormat } from "../../../include/js/main_config";
const { TextArea } = Input;

const TabItemPurchase = ({
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
      {/* <Row className="col-2 row-margin-vertical">
        <Col span={3}>
          <Text strong>Currency</Text>
        </Col>
        <Col span={7}>
          <CustomSelect
            placeholder={"Currency"}
            allowClear
            showSearch
            name="currency_id"
            field_id="currency_id"
            field_name="currency_no"
            value={data_head.currency_no}
            data={currency_list}
            onChange={(data, option) =>
              data
                ? upDateFormValue({
                    currency_id: data,
                    currency_no: option.title,
                  })
                : upDateFormValue({
                    currency_id: null,
                    currency_no: null,
                  })
            }
          />
        </Col>
      </Row>
      <Row className="col-2 row-margin-vertical">
        <Col span={3}>
          <Text strong>Item Cost</Text>
        </Col>
        <Col span={7}>
          <InputNumber
            {...numberFormat}
            style={{ width: "100%" }}
            value={data_head.item_cost}
            precision={3}
            onChange={(data) => upDateFormValue({ item_cost: data })}
          />
        </Col>
        <Col span={2}>
          <Text strong className="pl-1">
            {data_head.currency_no}
          </Text>
        </Col>
        <Col span={1}></Col>
      </Row> */}
      <Row
        className="col-2 row-margin-vertical"
        style={{
          borderBottom: "1px solid #E5E5E5",
          paddingBottom: 10,
        }}
      >
        <Col span={24}>
          <Text strong className="detail-tab-header">
            Vendor
          </Text>
        </Col>
      </Row>
      <Line
        readOnly={false}
        detailDispatch={detailDispatch}
        data_detail={data_detail}
      />
    </>
  );
};

export default TabItemPurchase;
