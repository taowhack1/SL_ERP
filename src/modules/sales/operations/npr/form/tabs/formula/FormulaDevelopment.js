import React, { useCallback, useContext, useState } from "react";
import { Table, Tabs } from "antd";
import { NPRFormContext } from "../../NPRRDForm";
import { PlusOutlined } from "@ant-design/icons";
import Formula from "./Formula";

const initialStateTabs = {
  activeKey: [],
  panes: [],
};
let readOnly = false;
let newTabIndex = 0;
const FormulaDevelopment = () => {
  const { data, loading } = useContext(NPRFormContext);
  const [tabs, setTabs] = useState(initialStateTabs);
  const onChange = (activeKey) => {
    setTabs((prev) => ({ ...prev, activeKey }));
  };

  const onEdit = (targetKey, action) => {
    console.log("onEdit", targetKey, action);
    if (action === "add") {
      add(targetKey);
    }
    if (action === "remove") {
      remove(targetKey);
    }
  };

  const add = useCallback(
    (targetKey) => {
      const { panes } = tabs;
      const newPanes = panes[targetKey];
      newTabIndex++;
      console.log("add newPanes", targetKey, newPanes);
      newPanes.push({
        ...initialStateFormula,
        npr_formula_revision_no: newTabIndex,
      });

      setTabs((prev) => ({
        ...prev,
        activeKey: `${newTabIndex}`,
        panes: { ...prev?.panes, [targetKey]: newPanes },
      }));
    },
    [tabs, setTabs]
  );

  const remove = useCallback(
    (targetKey) => {
      const { activeKey, panes } = tabs;
      let newActiveKey = activeKey;
      let lastIndex;
      panes.forEach((pane, index) => {
        if (pane?.key === targetKey) {
          lastIndex = index - 1;
        }
      });
      const newPanes = panes?.filter((pane) => {
        return pane?.key !== targetKey;
      });
      if (newPanes?.length && newActiveKey === targetKey) {
        newActiveKey =
          lastIndex >= 0 ? newPanes[lastIndex]?.key : newPanes[0]?.key;
      }
      console.log("newActiveKey", newActiveKey);
      setTabs((prev) => ({
        ...prev,
        activeKey: `${newActiveKey}`,
        panes: newPanes,
      }));
    },
    [tabs, setTabs]
  );

  const onExpand = (bool = false, row) => {
    console.log("ex");
    if (bool) {
      setTabs((prev) => ({
        ...prev,
        panes: {
          ...prev?.panes,
          [row["npr_option_id"]]: prev?.panes[row["npr_option_id"]]
            ? prev?.panes[row["npr_option_id"]]
            : {
                //แยกตาม npr_option_id ex. { 1 : { activeKey : ... , npr_formula : [] }}
                activeKey: row?.npr_formula[row?.npr_formula?.length - 1] || 1, //activeKey = Last index formula
                npr_formula: row?.npr_formula, //formula
              },
        },
        // activeKey: `${
        //   row?.npr_formula[row?.npr_formula?.length - 1]
        //     ?.npr_formula_revision_no || 0
        // }`,
      }));
    }
  };

  const expandedRowRender = useCallback(
    ({ row, onChange, onEdit }) => {
      {
        /*
        panes = npr_formula[]
      */
      }
      const { panes } = tabs;
      const { activeKey = "1", npr_formula = [] } =
        panes[row?.npr_option_id] || {};
      return (
        <div
          className="pd-left-1 detail-container"
          style={{ backgroundColor: "white", borderRadius: 10 }}
        >
          <div className="under-line mb-2">
            <h3>Formula List</h3>
          </div>
          <div className="card-container">
            <Tabs
              {...{
                type: readOnly ? "card" : "editable-card",
                // activeKey: `${activeKey}`,
                onChange,
                onEdit: (targetKey, action) => onEdit(targetKey, action),
                addIcon: (
                  <>
                    <PlusOutlined className="button-icon" />{" "}
                    <b className="button-icon">Add Formula</b>
                  </>
                ),
              }}
            >
              {/* All Formula in color & odor */}
              {npr_formula?.map((obj, index) => (
                <Tabs.TabPane
                  tab={`Rev.${obj?.npr_formula_revision_no}`}
                  key={`${obj?.npr_formula_revision_no}`}
                  closeIcon={<></>}
                >
                  <Formula {...{ fields: obj }} key={`${index}`} />
                </Tabs.TabPane>
              ))}
            </Tabs>
          </div>
        </div>
      );
    },
    [tabs, setTabs]
  );

  console.log("panes", tabs?.panes);
  return (
    <>
      <Table
        bordered
        rowKey="id"
        rowClassName="row-table-detail"
        loading={loading}
        columns={columns()}
        dataSource={mockData}
        expandable={{
          onExpand: onExpand,
          expandRowByClick: true,
          expandedRowRender: (row) =>
            expandedRowRender({ row, add, remove, onChange, onEdit }),
        }}
        pagination={false}
        footer={null}
      />
    </>
  );
};

export default React.memo(FormulaDevelopment);

const columns = () => [
  {
    title: (
      <div className="text-center">
        <b>No.</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "5%",
    dataIndex: "id",
    // render: (val) => val + 1,
  },
  {
    title: (
      <div className="text-center">
        <b>Color</b>
      </div>
    ),
    align: "left",
    className: "tb-col-sm",
    //   width: "10%",
    dataIndex: "npr_color_description",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>Odor</b>
      </div>
    ),
    align: "left",
    className: "tb-col-sm",
    //   width: "10%",
    dataIndex: "npr_odor_description",
    render: (val) => val || "-",
  },
];

const initialStateFormula = {
  id: 1,
  npr_formula_id: 1,
  // 1 = draft , 2 = อยู่ระหว่างพัฒนาสูตร , 3 = ยกเลิก , 4 = รอ CS รับตัวอย่าง , 5 = รับตัวอย่างแล้ว , 6 = รอผลการประเมิน , 7 = ประเมินแล้ว , 8 = Final
  npr_formula_status: 2,
  npr_formula_revision_no: 0,
  npr_formula_no: "NPR018-2021-002-0",
  npr_formula_develop_by: "2563002",
  npr_formula_description: "สูตร 1 สีแดง กลิ่นสตรอเบอร์รี่",
  npr_formula_created: "20/10/2021",
  npr_formula_usage: "1. Step 1 \n 2. Step 2 \n 3. Step 3",
  npr_formula_product_code: "Mockup - Product Code",
  npr_formula_product_name: "Mockup - Product Name",
  npr_formula_sample_req_qty: 20,
  npr_formula_batch_size: 300,
  npr_formula_remark: "Mockup - Remark",
  npr_formula_detail: [],
  npr_formula_qa: [],
};

const mockData = [
  {
    id: 1,
    npr_id: null,
    npr_color_description: "Red",
    npr_odor_description: "Strawberry",
    npr_formula_no: "NPR018-2021-002", //เลขที่ NPR
    npr_amount_of_formula: 1,
    npr_option_id: 3,
    npr_option_no: "NPR001-2021-001-01", //เลขที่ 01 หมายถึงเลขที่กลิ่น
    npr_option_description: "ทดสอง สูตร 1",
    npr_option_color: "แดง",
    npr_option_odor: "กุหลาบ",
    npr_option_plan_sample_qty: 10, // จำนวนที่ขอตัวอย่าง
    npr_option_actual_sample_qty: null, //จำนวนที่ส่งมอบจริง
    npr_option_plan_sample_date: "05/11/2021", // วันที่ต้องการตัวอย่าง
    npr_option_actual_sample_date: null, // วันที่ส่งตัวอย่าง
    npr_option_response_rd_by: null, //รับผิดชอบโดย
    npr_option_response_rd_date: null, //วันที่มอบหมาย
    npr_option_response_rd_remark: null, //มอบหมาย remark
    npr_option_updated: "05/11/2021", //วันที่อัปเดตล่าสุด
    tg_trans_status_id: 2,
    tg_trans_close_id: 1,
    npr_formula: [
      {
        id: 1,
        npr_formula_id: 1,
        // 1 = draft , 2 = อยู่ระหว่างพัฒนาสูตร , 3 = ยกเลิก , 4 = รอ CS รับตัวอย่าง , 5 = รับตัวอย่างแล้ว , 6 = รอผลการประเมิน , 7 = ประเมินแล้ว , 8 = Final
        npr_formula_status: 2,
        npr_formula_revision_no: 0,
        npr_formula_no: "NPR018-2021-002-0",
        npr_formula_develop_by: "2563002",
        npr_formula_description: "สูตร 1 สีแดง กลิ่นสตรอเบอร์รี่ 1234",
        npr_formula_created: "20/10/2021",
        npr_formula_usage: "1. Step 1 \n 2. Step 2 \n 3. Step 3",
        npr_formula_product_code: "Mockup - Product Code",
        npr_formula_product_name: "Mockup - Product Name",
        npr_formula_sample_req_qty: 20,
        npr_formula_batch_size: 300,
        npr_formula_remark: "Mockup - Remark",
        npr_formula_detail: [
          {
            npr_formula_detail_id: 0,
            npr_formula_detail_part: "A",
            npr_formula_detail_run_no: "01",
            npr_formula_detail_part_run_no: "A01",
            npr_formula_detail_percent_qty: 8.33,
            npr_formula_detail_cost: 30,
            item_id: 1,
            item_no_name: "[Mockup-Item] Mockup - Item 1",
            uon_id: 1,
            uom_no: "Kg.",
          },
          {
            npr_formula_detail_id: 1,
            npr_formula_detail_part: "A",
            npr_formula_detail_run_no: "02",
            npr_formula_detail_part_run_no: "A02",
            npr_formula_detail_percent_qty: 14.2,
            npr_formula_detail_cost: 8.5,
            item_id: 2,
            item_no_name: "[Mockup-Item] Mockup - Item 2",
            uon_id: 1,
            uom_no: "Kg.",
          },
          {
            npr_formula_detail_id: 2,
            npr_formula_detail_part: "B",
            npr_formula_detail_run_no: "03",
            npr_formula_detail_part_run_no: "B03",
            npr_formula_detail_percent_qty: 79.47,
            npr_formula_detail_cost: 8.5,
            item_id: 3,
            item_no_name: "[Mockup-Item] Mockup - Item 3",
            uon_id: 1,
            uom_no: "Kg.",
          },
        ],
        npr_formula_qa: [
          {
            npr_formula_qa_id: 0,
            npr_formula_qa_result: "Mockup - Result 1",
            npr_formula_qa_remark: "Mockup - Remark 1",
            qa_subject_id: 143,
            qa_specification_id: 302,
          },
          {
            npr_formula_qa_id: 1,
            npr_formula_qa_result: "Mockup - Result 2",
            npr_formula_qa_remark: "Mockup - Remark 2",
            qa_subject_id: 129,
            qa_specification_id: 399,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    npr_color_description: "Yellow",
    npr_odor_description: "Banana Ba Ba na na",
    npr_formula: [
      // {
      //   id: 1,
      //   npr_formula_revision_no: 0,
      //   npr_formula_no: "NPR018-2021-002-0",
      //   npr_formula_description: "สูตร 1 สีแดง กลิ่นสตรอเบอร์รี่",
      //   npr_formula_created: "20/10/2021",
      // },
    ],
  },
];
