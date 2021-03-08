import { Tabs } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import CustomLabel from "../../../components/CustomLabel";
import FillingProcess from "./FillingProcess";
import ItemInventoryData from "./ItemInventoryData";
import ItemProductionData from "./ItemProductionData";
import TabItemDetail from "./TabItemDetail";
import TabPackaging from "./TabItemFG_Packaging";
import TabItemPurchase from "./TabItemPurchase";
import TabItemQA from "./TabItemQA";
import TabItemRDDetail from "./TabItemRDDetail";
import TabBulkFormula from "./TabItemRD_Bulk_Formula";

const TabPanel = ({
  data_file,
  updateFile,
  data_head,
  data_detail,
  detailDispatch,
  upDateFormValue,

  readOnly,
  // QA
  data_packaging_detail,
  packagingDetailDispatch,
  data_weight_detail,
  weightDetailDispatch,
}) => {
  const { department_id } = useSelector((state) => state.auth.authData);
  // 10 = MIS , 11 = RD , 13 = PU , 18 = SA , 20 = PD , 24 = WH , 90 = EXECUTIVE
  const { type_id } = data_head;
  const callback = (key) => {};
  const master_data = useSelector((state) => state.inventory.master_data);
  const customers = useSelector((state) => state.sales.master_data.customers);
  console.log("tab panel");
  return (
    <>
      <Tabs
        defaultActiveKey={"1"}
        onChange={callback}
        className="row-tab-margin-lg"
      >
        <Tabs.TabPane
          className="tab-top"
          tab={
            <CustomLabel label={"General Detail"} require readOnly={readOnly} />
          }
          key={"1"}
        >
          <TabItemDetail
            data_head={data_head}
            upDateFormValue={upDateFormValue}
            master_data={master_data}
            customers={customers}
            readOnly={readOnly}
          />
        </Tabs.TabPane>
        {type_id !== undefined &&
          type_id &&
          [1, 2, 3, 4, 5].includes(type_id) &&
          [1, 10, 11, 24, 90].includes(department_id) && (
            <Tabs.TabPane
              tab={
                <CustomLabel
                  label={"Inventory Data"}
                  require
                  readOnly={readOnly}
                />
              }
              key={"2"}
            >
              <ItemInventoryData />
            </Tabs.TabPane>
          )}
        {type_id !== undefined &&
          type_id &&
          [1, 2, 3, 4, 5].includes(type_id) &&
          [1, 10, 11, 90].includes(department_id) && (
            <Tabs.TabPane
              tab={
                <CustomLabel label={"R&D Detail"} require readOnly={readOnly} />
              }
              key={"3"}
            >
              <TabItemRDDetail
                data_file={data_file}
                updateFile={updateFile}
                data_head={data_head}
                master_data={master_data}
                upDateFormValue={upDateFormValue}
                readOnly={readOnly}
              />
            </Tabs.TabPane>
          )}
        {type_id !== undefined &&
          type_id &&
          type_id === 3 &&
          [1, 10, 11, 90].includes(department_id) && (
            <Tabs.TabPane
              tab={
                <CustomLabel
                  label={"Bulk Formula"}
                  require
                  readOnly={readOnly}
                />
              }
              key={"4"}
            >
              <TabBulkFormula />
            </Tabs.TabPane>
          )}

        {/* 
        ยังไม่ใช้งาน
        {type_id !== undefined &&
          type_id &&
          type_id === 3 &&
          [1, 10, 11].includes(department_id) && (
            <Tabs.TabPane
              tab={
                <span className="tab_pane">
                  <span className="require">* </span>
                  {"Production Process"}
                </span>
              }
              key={"4"}
            >
              <TabProductionProcess
                data_head={data_head}
                upDateFormValue={upDateFormValue}
                // formula
                data_production_process_detail={data_production_process_detail}
                productionProcessDetailDispatch={
                  productionProcessDetailDispatch
                }
                readOnly={readOnly}
              />
            </Tabs.TabPane>
          )} 
          ยังไม่ใช้งาน
          */}

        {type_id !== undefined &&
          type_id &&
          [1, 2, 3, 4, 5].includes(type_id) &&
          [1, 10, 11, 90].includes(department_id) && (
            <Tabs.TabPane
              tab={
                <CustomLabel
                  label={"Specification"}
                  require
                  readOnly={readOnly}
                />
              }
              key={"5"}
            >
              <TabItemQA />
            </Tabs.TabPane>
          )}
        {type_id !== undefined &&
          type_id &&
          ![3, 4, 5].includes(type_id) &&
          [1, 10, 13, 90].includes(department_id) && (
            <Tabs.TabPane
              tab={
                <CustomLabel
                  label={"Purchase Vendor"}
                  require
                  readOnly={readOnly}
                />
              }
              key={"6"}
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
          [1, 10, 11, 90].includes(department_id) && (
            // [1, 10, 11, 18].includes(department_id) && (
            <Tabs.TabPane
              tab={
                <CustomLabel label={"Packaging"} require readOnly={readOnly} />
              }
              key={"7"}
            >
              <TabPackaging
                data_file={data_file}
                data_head={data_head}
                upDateFormValue={upDateFormValue}
                uom_name={data_head.uom_name}
                data_packaging_detail={data_packaging_detail}
                packagingDetailDispatch={packagingDetailDispatch}
                data_weight_detail={data_weight_detail}
                weightDetailDispatch={weightDetailDispatch}
                readOnly={readOnly}
              />
            </Tabs.TabPane>
          )}
        {type_id !== undefined &&
          type_id &&
          [4, 5].includes(type_id) &&
          [1, 10, 11, 20, 90].includes(department_id) && (
            <Tabs.TabPane
              tab={
                <CustomLabel
                  label={"Filling Process"}
                  require
                  readOnly={readOnly}
                />
              }
              key={"8"}
            >
              <FillingProcess
                data_file={data_file}
                data_head={data_head}
                upDateFormValue={upDateFormValue}
                uom_name={data_head.uom_name}
                data_packaging_detail={data_packaging_detail}
                packagingDetailDispatch={packagingDetailDispatch}
                data_weight_detail={data_weight_detail}
                weightDetailDispatch={weightDetailDispatch}
                readOnly={readOnly}
              />
            </Tabs.TabPane>
          )}
        {type_id !== undefined &&
          type_id &&
          [2, 3].includes(type_id) &&
          [1, 10, 20].includes(department_id) && (
            <Tabs.TabPane
              tab={
                <CustomLabel
                  label={"Production Data"}
                  require
                  readOnly={readOnly}
                />
              }
              key={"9"}
            >
              <ItemProductionData />
            </Tabs.TabPane>
          )}
      </Tabs>
    </>
  );
};

export default React.memo(TabPanel);
