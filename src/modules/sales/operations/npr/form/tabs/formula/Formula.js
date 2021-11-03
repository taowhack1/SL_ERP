import {
  PrinterTwoTone,
  QrcodeOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { Button, Tabs } from "antd";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useFetch } from "../../../../../../../include/js/customHooks";
import BulkSpec from "./tabs/BulkSpec";
import GeneralDetail from "./tabs/GeneralDetail";
import QA from "./tabs/QA";
import Remark from "./tabs/Remark";

const Formula = (props) => {
  const { data, error, loading: getFormulaLoading } = useFetch("");
  // ฟอร์มหลัก
  const formMethods = useForm({
    defaultValues: null,
  });

  const { reset, control, handleSubmit } = formMethods;

  // สูตร
  const formulaArray = useFieldArray({
    control,
    name: "npr_formula",
  });

  // หัวข้อ QC
  const qaArray = useFieldArray({
    control,
    name: "npr_qa",
  });

  const {
    key,
    npr_formula_no,
    npr_formula_revision_no,
    npr_formula_detail,
    npr_formula_qa,
    npr_formula_develop_by,
    npr_formula_description,
    npr_formula_created,
    npr_formula_usage,
    npr_formula_product_code,
    npr_formula_product_name,
    npr_formula_sample_req_qty,
    npr_formula_batch_size,
  } = props?.fields || {};

  const onSubmit = (data) => console.log("onSubmit", data);
  const onError = (data) => console.log("onError", data);

  return (
    <div className="pd-2">
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Tabs
          {...{
            tabBarExtraContent: (
              <div>
                <Button
                  size="small"
                  loading={false}
                  icon={<SendOutlined />}
                  // disabled={npr_formula_id ? false : true}
                  // onClick={() => onPrintFormula(batchSize)}
                  className="primary mr-4"
                >
                  ส่งตัวอย่าง
                </Button>
                <Button
                  size="small"
                  loading={false}
                  icon={<PrinterTwoTone />}
                  // disabled={npr_formula_id ? false : true}
                  // onClick={() => onPrintFormula(batchSize)}
                >
                  Print Formula
                </Button>
                <Button
                  size="small"
                  loading={false}
                  icon={<QrcodeOutlined className="button-icon" />}
                  // disabled={
                  //   npr_formula_id && tg_trans_status_id === 4 ? false : true
                  // }
                  // onClick={onPrintLabel}
                >
                  Print QR Code
                </Button>
              </div>
            ),
          }}
        >
          <Tabs.TabPane key={`1`} tab={`Detail`}>
            <GeneralDetail
              {...{
                fields: {
                  npr_formula_develop_by,
                  npr_formula_description,
                  npr_formula_created,
                  npr_formula_usage,
                  npr_formula_product_code,
                  npr_formula_product_name,
                  npr_formula_sample_req_qty,
                  npr_formula_batch_size,
                },
              }}
            />
          </Tabs.TabPane>
          <Tabs.TabPane key={`2`} tab={`Formula`}>
            <BulkSpec {...{ npr_formula_detail }} />
          </Tabs.TabPane>
          <Tabs.TabPane key={`3`} tab={`QA`}>
            <QA {...{ npr_formula_qa }} />
          </Tabs.TabPane>
          <Tabs.TabPane key={`4`} tab={`Remark`}>
            <Remark />
          </Tabs.TabPane>
        </Tabs>
      </form>
    </div>
  );
};

export default React.memo(Formula);

const initialState = {
  id: null,
  npr_formula_id: null,
  npr_formula_no: null,
  npr_formula_description: null,
  npr_formula_batch_size: 0,
  npr_formula_product_description: null,
  npr_formula_product_used: null,
  npr_formula_procedure: null,
  npr_formula_remark: null,
  npr_formula_actived: null,
  npr_formula_created: null,
  npr_formula_created_by: null,
  npr_formula_updated: null,
  npr_formula_updated_by: null,
  tg_trans_status_id: 2,
  tg_trans_close_id: 1,
  npr_formula_ref_id: null,
  npr_option_id: null,
  commit: 1,
};

const mockupData = {
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
  formula: [
    {
      id: 1,
      npr_formula_id: 1,
      // 1 = draft , 2 = อยู่ระหว่างพัฒนาสูตร , 3 = ยกเลิก , 4 = รอ CS รับตัวอย่าง , 5 = รับตัวอย่างแล้ว , 6 = รอผลการประเมิน , 7 = ประเมินแล้ว , 8 = Final
      npr_formula_status: 2,
      npr_formula_revision_no: 0,
      npr_formula_no: "NPR001-2021-001-01A", // 01 = รหัสสี-กลิ่น , A = Revision สูตร 1
      npr_formula_develop_by: "2563002",
      npr_formula_description: "สูตร 1 สีแดง กลิ่นสตรอเบอร์รี่",
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
          qa_subject_id: 1,
          qa_specification_id: 1,
        },
        {
          npr_formula_qa_id: 1,
          npr_formula_qa_result: "Mockup - Result 2",
          npr_formula_qa_remark: "Mockup - Remark 2",
          qa_subject_id: 3,
          qa_specification_id: 2,
        },
      ],
    },
  ],
};
