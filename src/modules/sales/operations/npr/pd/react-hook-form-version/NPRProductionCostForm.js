/** @format */

import React, { useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router";
import MainLayout from "../../../../../components/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import { PrinterOutlined } from "@ant-design/icons";
import {
  getNPRByID,
  getNPRPDCost,
} from "../../../../../actions/sales/nprActions";
import NPRProductionCostFormTabList from "./NPRProductionCostFormTabList";
import { Button, Col, Row } from "antd";
import Text from "antd/lib/typography/Text";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { getProductionEmp } from "../../../../../actions/hrm";
import moment from "moment";
const NPRPDContext = React.createContext();

const initialState = {
  npr_id: null,
  npr_formula_id: null,
  npr_product_cost_request_date: null,
  npr_product_cost_request_by: null,
  user_name: null,
  npr_product_cost_remark: null,
  commit: 1,
  npr_product_cost_description: null,
  npr_product_cost_response_date: null,
  npr_product_cost_response_by: null,
  tg_trans_status_id: 1,
  tg_trans_close_id: 1,
  npr_product_cost_detail: [1, 2, 3],
  npr_price_detail: [4, 5, 6],
  npr_formula_detail: [7, 8, 9],
};
const NPRPRoductionCostForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { department, id } = useParams();
  const [state, setState] = useState(initialState);
  const [method, setMethod] = useState("view");
  // const { user_name, department_id } = useSelector(
  //   (state) => state.auth.authData
  // );
  const { production: PDEmp } = useSelector((state) => state.hrm.employee);
  const layoutConfig = useMemo(
    () => ({
      projectId: 7,
      title: "SALES",
      home: "/sales",
      show: true,
      breadcrumb: ["Sales", "NPR"],
      search: false,
      create: "",
      buttonAction: method === "view" ? ["Edit", "Back"] : ["Save", "Discard"],
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
    [state.npr_no, method]
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

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      npr_id: null,
      npr_formula_id: null,
      npr_product_cost_request_date: null,
      npr_product_cost_request_by: null,
      user_name: null,
      npr_product_cost_remark: null,
      commit: 1,
      npr_product_cost_description: null,
      npr_product_cost_response_date: null,
      npr_product_cost_response_by: null,
      tg_trans_status_id: 1,
      tg_trans_close_id: 1,
      npr_product_cost_detail: [],
      npr_price_detail: [],
      npr_formula_detail: [],
    },
  });

  const { fields: batchFields } = useFieldArray({
    control,
    name: "npr_product_cost_detail",
  });
  const { fields: formulaFields } = useFieldArray({
    control,
    name: "npr_formula_detail",
  });
  const { fields: packageFields } = useFieldArray({
    control,
    name: "npr_price_detail",
  });

  const contextValue = React.useMemo(
    () => ({
      formMethod: { register, control, handleSubmit, reset, errors, watch },
      readOnly: method === "view" ? true : false,
      PDEmp,
    }),
    [register, control, handleSubmit, reset, errors, watch, method, PDEmp]
  );

  useEffect(() => {
    const getData = async () => {
      const resp = await getNPRByID(id);
      if (resp.success) {
        setState(resp.data);

        const respCost = await getNPRPDCost(id);
        console.log("respCost ", respCost);
        const {
          npr_product_cost_detail,
          npr_formula_detail,
          npr_price_detail,
          npr_formula_id,
          npr_formula_no,
          npr_no,
          npr_responsed_required_by,
          sales_created_by,
        } = respCost.data;
        reset({
          npr_product_cost_detail,
          npr_formula_detail,
          npr_price_detail,
          npr_formula_id,
          npr_formula_no,
          npr_no,
          npr_responsed_required_by,
          sales_created_by,
        });
      }
    };
    dispatch(getProductionEmp());
    getData();
  }, [id, method]);
  const onSubmit = (data) => {
    console.log("SUBMIT");
    console.log("onSubmit ", data);
  };
  console.log("@DATA Main : ", watch());
  console.log("@DATA batch : ", batchFields);
  console.log("@DATA formula : ", formulaFields);
  console.log("@DATA package : ", packageFields);
  return (
    <>
      <FormProvider {...contextValue}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <MainLayout {...layoutConfig}>
            <NPRPDContext.Provider value={[]}>
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
                          <Text className="text-value">
                            {npr_created || "-"}
                          </Text>
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
            </NPRPDContext.Provider>
          </MainLayout>
          <button type="submit" id="submit" className="">
            Submit
          </button>
        </form>
      </FormProvider>
    </>
  );
};

export default NPRPRoductionCostForm;
