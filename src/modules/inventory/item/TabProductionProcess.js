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
      <Row className="col-2 mt-1">
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
