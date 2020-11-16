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
import TabItemDetail from "./TabItemDetail";
import TabFillingProcess from "./TabItemFG_Filling_Process";
import TabItemPurchase from "./TabItemPurchase";
import TabItemQA from "./TabItemQA";
import TabItemRD from "./TabItemRD";
import TabBulkFormula from "./TabItemRD_Bulk_Formula";

const { TextArea } = Input;
const TabPanel = ({
  data_head,
  headDispatch,
  data_detail,
  detailDispatch,
  upDateFormValue,
  readOnly,
}) => {
  const callback = (key) => {};
  const master_data = useSelector((state) => state.inventory.master_data);
  return (
    <>
      <Tabs defaultActiveKey={"1"} onChange={callback}>
        <Tabs.TabPane
          tab={
            <span>
              <span className="require">* </span>
              Detail
            </span>
          }
          key={"1"}
        >
          <TabItemDetail
            data_head={data_head}
            upDateFormValue={upDateFormValue}
            master_data={master_data}
            readOnly={readOnly}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="R&D" key={"2"}>
          <TabItemRD
            data_head={data_head}
            data_detail={data_detail}
            detailDispatch={detailDispatch}
            upDateFormValue={upDateFormValue}
            readOnly={readOnly}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="R&D Formula" key={"3"}>
          <TabBulkFormula
            data_head={data_head}
            data_detail={data_detail}
            detailDispatch={detailDispatch}
            upDateFormValue={upDateFormValue}
            readOnly={readOnly}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab={"QA"} key="4">
          <TabItemQA
            data_head={data_head}
            data_detail={data_detail}
            detailDispatch={detailDispatch}
            upDateFormValue={upDateFormValue}
            readOnly={readOnly}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab={"Purchase"} key="5">
          <TabItemPurchase
            data_head={data_head}
            data_detail={data_detail}
            detailDispatch={detailDispatch}
            upDateFormValue={upDateFormValue}
            readOnly={readOnly}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab={"R&D Filling Process"} key="6">
          <TabFillingProcess
            data_head={data_head}
            data_detail={data_detail}
            detailDispatch={detailDispatch}
            upDateFormValue={upDateFormValue}
            readOnly={readOnly}
          />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};

export default TabPanel;
