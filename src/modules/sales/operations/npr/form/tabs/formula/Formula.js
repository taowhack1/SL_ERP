import {
  PrinterTwoTone,
  QrcodeOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { Button, Tabs } from "antd";
import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useFetch } from "../../../../../../../include/js/customHooks";
import BulkSpec from "./tabs/BulkSpec";
import GeneralDetail from "./tabs/GeneralDetail";
import QA from "./tabs/QA";
import Remark from "./tabs/Remark";

const Formula = (props) => {
  const {
    key,
    npr_formula_no,
    npr_formula_revision_no,
    npr_formula_develop_by,
    npr_formula_description,
    npr_formula_created,
    npr_formula_usage,
    npr_formula_product_code,
    npr_formula_product_name,
    npr_formula_sample_req_qty,
    npr_formula_batch_size,
    npr_formula_detail,
    npr_formula_qa,
  } = props?.fields || {};

  // const { data, error, loading: getFormulaLoading } = useFetch("");
  // ฟอร์มหลัก formula Rev.x
  const formMethods = useForm({
    defaultValues: initialStateFormula,
  });

  const { reset, control, handleSubmit, watch } = formMethods;

  // สูตร npr_formula_detail
  const formulaFields = useFieldArray({
    control,
    name: "npr_formula_detail",
    defaultValues: [],
  });

  // หัวข้อ QC npr_formula_qa
  const qaFields = useFieldArray({
    control,
    name: "npr_formula_qa",
    defaultValues: [],
  });

  useEffect(() => {
    // Set data
    reset({
      ...props?.fields,
    });
  }, [props?.fields]);
  const onSubmit = (data) => console.log("onSubmit", data);
  const onError = (data) => console.log("onError", data);

  console.log("watch data", watch());
  console.log("qaFieldssssss", qaFields);
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
                formMethods,
              }}
            />
          </Tabs.TabPane>
          <Tabs.TabPane key={`2`} tab={`Formula`}>
            <BulkSpec {...{ formMethods, formulaFields }} />
          </Tabs.TabPane>
          <Tabs.TabPane key={`3`} tab={`QA`}>
            <QA {...{ formMethods, qaFields }} />
          </Tabs.TabPane>
          <Tabs.TabPane key={`4`} tab={`Remark`}>
            <Remark />
          </Tabs.TabPane>
        </Tabs>
        <button type="submit" id="submit-btn">
          SAVE
        </button>
      </form>
    </div>
  );
};

export default React.memo(Formula);

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
