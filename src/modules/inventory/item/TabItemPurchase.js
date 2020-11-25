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
  data_head,
  data_detail,
  detailDispatch,
  readOnly,
}) => {
  return (
    <>
      <Row className="col-2 row-margin-vertical  detail-tab-row">
        <Col span={24}>
          <Text strong className="detail-tab-header">
            Vendor
          </Text>
        </Col>
      </Row>
      <Line
        readOnly={readOnly}
        detailDispatch={detailDispatch}
        data_head={data_head}
        data_detail={data_detail}
      />
    </>
  );
};

export default TabItemPurchase;
