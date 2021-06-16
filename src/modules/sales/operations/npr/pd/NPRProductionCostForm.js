/** @format */

import React, { useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router";
import MainLayout from "../../../../../components/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import { PrinterOutlined } from "@ant-design/icons";
import {
  getNPRByID,
  getNPRPDCost,
  saveNPRPDCost,
} from "../../../../../actions/sales/nprActions";
import NPRProductionCostFormTabList from "./NPRProductionCostFormTabList";
import { Button, Col, message, Row } from "antd";
import Text from "antd/lib/typography/Text";
import { FormProvider } from "react-hook-form";
import { getProductionEmp } from "../../../../../actions/hrm";
import moment from "moment";
import {
  sortData,
  validateFormDetail,
  validateFormHead,
} from "../../../../../include/js/function_main";
export const NPRPDContext = React.createContext();

const NPRPRoductionCostForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { department, id } = useParams();
  const [state, setState] = useState({});
  const [costing, setCosting] = useState({});
  const [batchSize, setBatchSize] = useState([]);
  const [rawMatt, setRawMatt] = useState([]);
  const [packaging, setPackaging] = useState([]);
  const [method, setMethod] = useState("view");
  const { user_name, department_id } = useSelector(
    (state) => state.auth.authData
  );
  const { production: PDEmp } = useSelector((state) => state.hrm.employee);

  const { tg_trans_status_id: tg_trans } = costing;
  console.log("tg_trans ", tg_trans);
  const layoutConfig = useMemo(
    () => ({
      projectId: 7,
      title: "SALES",
      home: "/sales",
      show: true,
      breadcrumb: ["Sales", "NPR"],
      search: false,
      create: "",
      buttonAction:
        method === "view"
          ? tg_trans === 4 && ![1].includes(department_id)
            ? ["Back"]
            : ["Edit", "Back"]
          : ["Save", "Discard"],
      edit: () => {
        console.log("Click Edit");
        setMethod("edit");
      },
      action: [
        {
          name: (
            <span>
              <PrinterOutlined className="pd-right-1 button-icon" />
              Print NPR
            </span>
          ),
          link: `${process.env.REACT_APP_REPORT_SERVER}/report_npr.aspx?npr_no=${state.npr_no}`,
        },
      ],
      back: history.goBack,
      discard: "/sales/npr/pd",
      save: "function",
      onSave: () => {
        console.log("Save Click");
        const el = document.getElementById("submit");
        console.log("el", el);
        el.click();
      },
    }),
    [state.npr_no, method, tg_trans]
  );
  const {
    npr_no,
    npr_product_no_name,
    category_name,
    npr_created_by_no_name,
    npr_created,
    npr_request_date,
    npr_customer_name,
  } = state;

  const contextValue = React.useMemo(
    () => ({
      costing,
      setCosting,
      rawMatt,
      setRawMatt,
      packaging,
      setPackaging,
      batchSize,
      setBatchSize,
      npr_formula_procedure: costing.npr_formula_procedure,
      readOnly: method === "view" ? true : false,
      PDEmp,
      user_name,
      department_id,
    }),
    [
      costing,
      setCosting,
      rawMatt,
      setRawMatt,
      packaging,
      setPackaging,
      batchSize,
      setBatchSize,
      method,
      PDEmp,
      user_name,
      department_id,
    ]
  );

  useEffect(() => {
    const getData = async () => {
      const resp = await getNPRByID(id);
      if (resp.success) {
        setState(resp.data);

        const respCost = await getNPRPDCost(id);
        console.log("respCost ", respCost);
        const {
          npr_product_cost_id,
          npr_product_cost_no,
          npr_product_cost_request_by,
          npr_product_cost_request_date,
          npr_product_cost_response_date,
          tg_trans_status_id,
          tg_trans_close_id,
          npr_id,
          npr_no,
          sales_created,
          sales_created_by,
          sales_created_by_no_name,
          npr_responsed_required_by,
          npr_product_cost_response_by,
          npr_product_cost_response_by_no_name,
          npr_formula_id,
          npr_formula_no,
          npr_formula_procedure,
          npr_product_cost_detail,
          npr_formula_detail,
          npr_price_detail,
        } = respCost.data;
        setCosting({
          commit: 1,
          user_name,
          npr_product_cost_id,
          npr_product_cost_no,
          npr_product_cost_request_by,
          npr_product_cost_request_date,
          npr_product_cost_response_date,
          tg_trans_status_id: tg_trans_status_id || 1,
          tg_trans_close_id: tg_trans_close_id || 1,
          npr_id,
          npr_no,
          sales_created,
          sales_created_by,
          sales_created_by_no_name,
          npr_responsed_required_by,
          npr_product_cost_response_by,
          npr_product_cost_response_by_no_name,
          npr_formula_id,
          npr_formula_no,
          npr_formula_procedure,
        });
        setBatchSize(sortData(npr_product_cost_detail));
        setRawMatt(sortData(npr_formula_detail));
        setPackaging(sortData(npr_price_detail));
      }
    };
    dispatch(getProductionEmp());
    getData();
  }, [id, method]);
  const onSubmit = async () => {
    console.log("SUBMIT");
    console.log("SAVE @costing", costing);
    console.log("SAVE @batchSize", batchSize);
    console.log("SAVE @rawMatt", rawMatt);
    console.log("SAVE @packaging", packaging);
    const { validate: batchValidate } = validateFormDetail(batchSize, [
      "npr_product_cost_detail_batch_size",
      "npr_product_cost_detail_fg_qty",
      "npr_product_cost_detail_cost",
    ]);
    const { validate: rawMattValidate } = validateFormDetail(rawMatt, [
      "npr_formula_detail_waste_percent_qty",
    ]);
    const { validate: packagingValidate } = validateFormDetail(packaging, [
      "npr_price_detail_waste_percent_qty",
    ]);
    const { validate: costingValidate } = validateFormHead(costing, [
      "npr_product_cost_response_date",
      "npr_product_cost_response_by",
      "npr_product_cost_request_by",
      "npr_product_cost_request_date",
      "user_name",
    ]);
    if (
      [batchValidate, rawMattValidate, packagingValidate, costingValidate].some(
        (boo) => boo === false
      )
    ) {
      message.warning("Please fill your form completely.", 4);
      console.log(
        batchValidate,
        rawMattValidate,
        packagingValidate,
        costingValidate
      );
      return false;
    }

    const saveData = {
      ...costing,
      npr_product_cost_detail: batchSize,
      npr_formula_detail: rawMatt,
      npr_price_detail: packaging,
    };

    const resp = await saveNPRPDCost(saveData);
    if (resp.success) {
      setMethod("view");
    }
  };
  return (
    <>
      <FormProvider {...contextValue}>
        <MainLayout {...layoutConfig}>
          <NPRPDContext.Provider value={contextValue}>
            <div id="form">
              <div
                className="full-width text-center mb-2"
                style={{ borderBottom: "1px solid #c0c0c0" }}
              >
                <h1>NPR. COSTING</h1>
              </div>
              <div className="form-section">
                <Row className="mt-2 col-2" gutter={24}>
                  <Col span={12}>
                    <Row className="col-2 mt-1 mb-1">
                      <Col span={8}>
                        <Text strong>NPR No. :</Text>
                      </Col>
                      <Col span={16}>
                        <Text className="text-value">{npr_no || "-"}</Text>
                      </Col>
                    </Row>
                    <Row className="col-2 mt-1 mb-1">
                      <Col span={8}>
                        <Text strong>Product :</Text>
                      </Col>
                      <Col span={16}>
                        <Text className="text-value">
                          {npr_product_no_name || "-"}
                        </Text>
                      </Col>
                    </Row>
                    <Row className="col-2 mt-1 mb-1">
                      <Col span={8}>
                        <Text strong>Category :</Text>
                      </Col>
                      <Col span={16}>
                        <Text className="text-value">
                          {category_name || "-"}
                        </Text>
                      </Col>
                    </Row>
                    <Row className="col-2 mt-1 mb-1">
                      <Col span={8}>
                        <Text strong>Customer :</Text>
                      </Col>
                      <Col span={16}>
                        <Text className="text-value">
                          {npr_customer_name || "-"}
                        </Text>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={12}>
                    <Row className="col-2 mt-1 mb-1">
                      <Col span={8}>
                        <Text strong>Sales Person :</Text>
                      </Col>
                      <Col span={16}>
                        <Text className="text-value">
                          {npr_created_by_no_name || "-"}
                        </Text>
                      </Col>
                    </Row>
                    <Row className="col-2 mt-1 mb-1">
                      <Col span={8}>
                        <Text strong>Issued Date :</Text>
                      </Col>
                      <Col span={16}>
                        <Text className="text-value">{npr_created || "-"}</Text>
                      </Col>
                    </Row>
                    <Row className="col-2 mt-1 mb-1">
                      <Col span={8}>
                        <Text strong>Request Date :</Text>
                      </Col>
                      <Col span={16}>
                        <Text className="text-value">
                          {npr_request_date || "-"}
                        </Text>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <NPRProductionCostFormTabList />
              </div>
            </div>
            <button
              className="d-none"
              type="button"
              id="submit"
              onClick={onSubmit}
            >
              Submit
            </button>
          </NPRPDContext.Provider>
        </MainLayout>
      </FormProvider>
    </>
  );
};

export default NPRPRoductionCostForm;
