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
  data_head,
  readOnly,
  upDateFormValue,
  data_formula_detail,
  formulaDetailDispatch,
}) => {
  const currency_list = useSelector(
    (state) => state.accounting.master_data.currency
  );
  const item_list = useSelector((state) =>
    state.inventory.master_data.item_list.filter(
      (item) => item.type_id === 1 || item.type_id === 3
    )
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
                  data_head.item_formula_effective_date
                    ? moment(
                        data_head.item_formula_effective_date,
                        "DD/MM/YYYY"
                      )
                    : ""
                }
                defaultValue={
                  data_head.item_formula_effective_date
                    ? moment(
                        data_head.item_formula_effective_date,
                        "DD/MM/YYYY"
                      )
                    : ""
                }
                onChange={(data) => {
                  upDateFormValue({
                    item_formula_effective_date: data
                      ? data.format("DD/MM/YYYY")
                      : "",
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
            readOnly={readOnly}
            data_formula_detail={data_formula_detail}
            formulaDetailDispatch={formulaDetailDispatch}
            item_list={item_list}
          />
        </Col>
      </Row>
    </>
  );
};

export default TabBulkFormula;
