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
import BulkFormula from "./Item_Bulk_Formula";
import moment from "moment";
const { TextArea } = Input;

const TabBulkFormula = ({
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
        <Col span={12}>
          <Row className="col-2 row-margin-vertical">
            <Col span={6}>
              <Text strong>Effective Date</Text>
            </Col>
            <Col span={16}>
              <DatePicker
                name={"item_formula_effective_date"}
                format={"DD/MM/YYYY"}
                style={{ width: "100%" }}
                placeholder="Effective Date"
                required
                value={
                  data_detail.item_formula_effective_date
                    ? moment(
                        data_detail.item_formula_effective_date,
                        "DD/MM/YYYY"
                      )
                    : ""
                }
                defaultValue={
                  data_detail.item_formula_effective_date
                    ? moment(
                        data_detail.item_formula_effective_date,
                        "DD/MM/YYYY"
                      )
                    : ""
                }
                onChange={(data) => {
                  detailDispatch({
                    type: "CHANGE_DETAIL_VALUE",
                    payload: {
                      item_formula_effective_date: data
                        ? data.format("DD/MM/YYYY")
                        : "",
                    },
                  });
                }}
              />
            </Col>
            <Col span={2}></Col>
          </Row>
        </Col>
      </Row>
      <Row className="col-2 row-tab-margin-lg">
        <Col span={24}>
          <BulkFormula
            readOnly={false}
            detailDispatch={detailDispatch}
            data_detail={data_detail}
          />
        </Col>
      </Row>
    </>
  );
};

export default TabBulkFormula;
