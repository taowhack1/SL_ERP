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
  data_file,
  updateFile,
  fileList,
  setFileList,
  data_head,
  headDispatch,
  data_detail,
  detailDispatch,
  upDateFormValue,
  readOnly,
  data_formula_detail,
  formulaDetailDispatch,
  data_qa_detail,
  qaDetailDispatch,
  data_filling_detail,
  fillingDetailDispatch,
  data_weight_detail,
  weightDetailDispatch,
}) => {
  const { department_id } = useSelector((state) => state.auth.authData);
  // 10 = MIS , 11 = RD , 13 = PU , 18 = SA
  console.log("fileList", fileList);
  const { type_id } = data_head;
  const callback = (key) => {};
  const master_data = useSelector((state) => state.inventory.master_data);
  const customers = useSelector((state) => state.sales.master_data.customers);
  console.log("department_id", department_id);
  return (
    <>
      <Tabs
        defaultActiveKey={"1"}
        onChange={callback}
        className="row-tab-margin-lg"
      >
        <Tabs.TabPane
          tab={
            <span className="tab_pane">
              <span className="require">* </span>
              {"General Detail"}
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
        {type_id !== undefined &&
          type_id &&
          [1, 2, 3, 4, 5].includes(type_id) &&
          [1, 10, 11].includes(department_id) && (
            <Tabs.TabPane
              tab={
                <span className="tab_pane">
                  <span className="require">* </span>
                  {"R&D Detail"}
                </span>
              }
              key={"2"}
            >
              <TabItemRD
                data_file={data_file}
                updateFile={updateFile}
                data_head={data_head}
                master_data={master_data}
                customers={customers}
                upDateFormValue={upDateFormValue}
                readOnly={readOnly}
              />
            </Tabs.TabPane>
          )}
        {type_id !== undefined &&
          type_id &&
          type_id === 3 &&
          [1, 10, 11].includes(department_id) && (
            <Tabs.TabPane
              tab={
                <span className="tab_pane">
                  <span className="require">* </span>
                  {"Bulk Formula"}
                </span>
              }
              key={"3"}
            >
              <TabBulkFormula
                data_head={data_head}
                upDateFormValue={upDateFormValue}
                // formula
                data_formula_detail={data_formula_detail}
                formulaDetailDispatch={formulaDetailDispatch}
                readOnly={readOnly}
              />
            </Tabs.TabPane>
          )}
        {type_id !== undefined &&
          type_id &&
          [1, 2, 3, 4, 5].includes(type_id) &&
          [1, 10, 11, 18].includes(department_id) && (
            <Tabs.TabPane
              tab={
                <span className="tab_pane">
                  <span className="require">* </span>
                  {"QA"}
                </span>
              }
              key={"4"}
            >
              <TabItemQA
                data_qa_detail={data_qa_detail}
                qaDetailDispatch={qaDetailDispatch}
                readOnly={readOnly}
              />
            </Tabs.TabPane>
          )}
        {type_id !== undefined &&
          type_id &&
          ![3, 4, 5].includes(type_id) &&
          [1, 10, 13].includes(department_id) && (
            <Tabs.TabPane
              tab={
                <span className="tab_pane">
                  <span className="require">* </span>
                  {"Purchase Vendor"}
                </span>
              }
              key={"5"}
            >
              <TabItemPurchase
                data_head={data_head}
                data_detail={data_detail}
                detailDispatch={detailDispatch}
                upDateFormValue={upDateFormValue}
                readOnly={readOnly}
              />
            </Tabs.TabPane>
          )}
        {type_id !== undefined &&
          type_id &&
          [4, 5].includes(type_id) &&
          [1, 10, 11, 18].includes(department_id) && (
            <Tabs.TabPane
              tab={
                <span className="tab_pane">
                  <span className="require">* </span>
                  {"FG Filling Process"}
                </span>
              }
              key={"6"}
            >
              <TabFillingProcess
                uom_no_name={data_head.uom_no_name}
                data_filling_detail={data_filling_detail}
                fillingDetailDispatch={fillingDetailDispatch}
                data_weight_detail={data_weight_detail}
                weightDetailDispatch={weightDetailDispatch}
                readOnly={readOnly}
              />
            </Tabs.TabPane>
          )}
      </Tabs>
    </>
  );
};

export default TabPanel;
