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
  DatePicker,
} from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import { useSelector } from "react-redux";
import CustomSelect from "../../../components/CustomSelect";
import Line from "../../../components/VendorLine";
import { numberFormat } from "../../../include/js/main_config";
import BulkFormula from "./BulkFormula";
import moment from "moment";
import ProductionProcess from "./ProductionProcess";
const { TextArea } = Input;

const TabProductionProcess = ({
  data_head,
  readOnly,
  upDateFormValue,
  data_production_process_detail,
  productionProcessDetailDispatch,
}) => {
  return (
    <>
      <Row className="col-2 row-margin-vertical">
        <Col span={12}>
          <Row className="col-2 row-margin-vertical">
            <Col span={6}>
              <Text strong>Effective Date</Text>
            </Col>
            <Col span={16}>
              {readOnly ? (
                <Text className="text-view text-center">
                  {data_head.item_effective_date
                    ? data_head.item_effective_date
                    : "-"}
                </Text>
              ) : (
                <DatePicker
                  name={"item_effective_date"}
                  format={"DD/MM/YYYY"}
                  style={{ width: "100%" }}
                  placeholder="Effective Date"
                  required
                  value={
                    data_head.item_effective_date
                      ? moment(data_head.item_effective_date, "DD/MM/YYYY")
                      : ""
                  }
                  defaultValue={
                    data_head.item_effective_date
                      ? moment(data_head.item_effective_date, "DD/MM/YYYY")
                      : ""
                  }
                  onChange={(data) => {
                    upDateFormValue({
                      item_effective_date: data
                        ? data.format("DD/MM/YYYY")
                        : "",
                    });
                  }}
                />
              )}
            </Col>
            <Col span={2}></Col>
          </Row>
        </Col>
      </Row>
      <Row className="col-2 row-tab-margin-lg">
        <Col span={24}>
          <ProductionProcess
            readOnly={readOnly}
            data_production_process_detail={data_production_process_detail}
            productionProcessDetailDispatch={productionProcessDetailDispatch}
          />
        </Col>
      </Row>
    </>
  );
};

export default TabProductionProcess;
