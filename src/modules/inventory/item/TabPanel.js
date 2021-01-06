import { Tabs } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import TabItemDetail from "./TabItemDetail";
import TabPackaging from "./TabItemFG_Packaging";
import TabItemPurchase from "./TabItemPurchase";
import TabItemQA from "./TabItemQA";
import TabItemRD from "./TabItemRD";
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
  data_qa_detail,
  qaDetailDispatch,
  data_packaging_detail,
  packagingDetailDispatch,
  data_weight_detail,
  weightDetailDispatch,
}) => {
  const { department_id } = useSelector((state) => state.auth.authData);
  // 10 = MIS , 11 = RD , 13 = PU , 18 = SA
  const { type_id } = data_head;
  const callback = (key) => {};
  const master_data = useSelector((state) => state.inventory.master_data);
  const customers = useSelector((state) => state.sales.master_data.customers);
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
            <span className="tab_pane">
              {!readOnly && <span className="require">* </span>}
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
        {/* {type_id !== undefined &&
          type_id &&
          [1, 2, 3, 4, 5].includes(type_id) &&
          [1, 10, 11].includes(department_id) && ( */}
        <Tabs.TabPane
          tab={
            <span className="tab_pane">
              {!readOnly && <span className="require">* </span>}
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
        {/* )}
         {type_id !== undefined &&
           type_id &&
           type_id === 3 &&
           [1, 10, 11].includes(department_id) && ( */}
        <Tabs.TabPane
          tab={
            <span className="tab_pane">
              {!readOnly && <span className="require">* </span>}
              {"Bulk Formula"}
            </span>
          }
          key={"3"}
        >
          <TabBulkFormula />
        </Tabs.TabPane>
        {/* )}   */}

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

        {/* {type_id !== undefined &&
          type_id &&
          [1, 2, 3, 4, 5].includes(type_id) &&
          [1, 10, 11, 18].includes(department_id) && ( */}
        <Tabs.TabPane
          tab={
            <span className="tab_pane">
              {!readOnly && <span className="require">* </span>}
              {"Specification"}
            </span>
          }
          key={"5"}
        >
          <TabItemQA
            data_head={data_head}
            upDateFormValue={upDateFormValue}
            data_qa_detail={data_qa_detail}
            qaDetailDispatch={qaDetailDispatch}
            readOnly={readOnly}
          />
        </Tabs.TabPane>
        {/* )}
        {type_id !== undefined &&
          type_id &&
          ![3, 4, 5].includes(type_id) &&
          [1, 10, 13].includes(department_id) && ( */}
        <Tabs.TabPane
          tab={
            <span className="tab_pane">
              {!readOnly && <span className="require">* </span>}
              {"Purchase Vendor"}
            </span>
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
        {/* )}
        {type_id !== undefined &&
          type_id &&
          [4, 5].includes(type_id) &&
          [1, 10, 11, 18].includes(department_id) && ( */}
        <Tabs.TabPane
          tab={
            <span className="tab_pane">
              {!readOnly && <span className="require">* </span>}
              {"FG Packaging & Filling Process"}
            </span>
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
        {/* )} */}
      </Tabs>
    </>
  );
};

export default React.memo(TabPanel);
