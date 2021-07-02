import MainLayout from "../../../../components/MainLayout";
import Text from "antd/lib/typography/Text";
import { Col, message, Row } from "antd";
import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { ExportOutlined, PrinterOutlined } from "@ant-design/icons";
import {
  getNPRByID,
  getNPREstimate,
  saveEstimate,
} from "../../../../actions/sales/nprActions";
import { useParams } from "react-router-dom";
import EstimateFormTab from "../estimate/EstimateFormTab";
import { sortData } from "../../../../include/js/function_main";
export const NPREstimateContext = React.createContext();
const initialState = {
  npr_id: null,
  user_name: null,
  npr_estimate_remark: null,
  commit: 1,
  npr_estimate_description: null,
  tg_trans_status_id: 1,
  tg_trans_close_id: 1,
  npr_estimate_detail: [
    // {
    //   id: null,
    //   npr_estimate_detail_active: 1,
    //   npr_id: null,
    //   npr_formula_id: null,
    //   npr_product_cost_detail_id: null,
    //   npr_product_cost_detail_batch_size: 0,
    //   npr_product_cost_detail_fg_qty: 0,
    //   tg_npr_estimate_detail_total_amount: 0,
    //   npr_estimate_detail_sub: [
    //     {
    //       npr_estimate_type_id: 1,
    //       npr_estimate_detail_sub_amount: 0,
    //       npr_estimate_detail_sub_waste_percent_qty: 0,
    //       npr_estimate_detail_sub_mark_up_percent_qty: 0,
    //       npr_estimate_detail_sub_total_amount: 0,
    //     },
    //     {
    //       npr_estimate_type_id: 2,
    //       npr_estimate_detail_sub_amount: 0,
    //       npr_estimate_detail_sub_waste_percent_qty: 0,
    //       npr_estimate_detail_sub_mark_up_percent_qty: 0,
    //       npr_estimate_detail_sub_total_amount: 0,
    //     },
    //     {
    //       npr_estimate_type_id: 3,
    //       npr_estimate_detail_sub_amount: 0,
    //       npr_estimate_detail_sub_waste_percent_qty: 0,
    //       npr_estimate_detail_sub_mark_up_percent_qty: 0,
    //       npr_estimate_detail_sub_total_amount: 0,
    //     },
    //   ],
    // },
  ],
  npr_estimate_calculate: [],
};
const EstimateForm = () => {
  const history = useHistory();
  const { id } = useParams();
  const [state, setState] = useState({});
  const [method, setMethod] = useState("view");
  const [estimate, setEstimate] = useState(initialState);
  const { user_name, department_id } = useSelector(
    (state) => state.auth.authData
  );
  const [modal, setModal] = useState({
    visible: false,
    loading: false,
    estimateData: null,
  });
  useEffect(() => {
    const getData = async (id) => {
      const resp = await getNPRByID(id);
      const respEstimate = await getNPREstimate(id);
      console.log("respEstimate", respEstimate.data);
      if (resp.success) {
        setState(resp.data);
      }
      if (respEstimate.success) {
        setEstimate({
          ...respEstimate.data,
          npr_estimate_detail: sortData(respEstimate.data.npr_estimate_detail),
        });
      }
    };
    id && getData(id);
  }, [id, modal.visible]);

  const {
    npr_id,
    npr_no,
    npr_product_no_name,
    category_name,
    npr_created_by_no_name,
    npr_created,
    npr_request_date,
    npr_customer_name,
  } = state;
  const onOpen = (estimateData) =>
    setModal((prev) => ({
      ...prev,
      visible: true,
      estimateData: estimateData ?? null,
    }));
  const onClose = () => setModal((prev) => ({ ...prev, visible: false }));
  const onPrint = async () => {
    console.log("onPrint", estimate);
    if (estimate.npr_estimate_id !== null) {
      window.open(
        `${process.env.REACT_APP_REPORT_SERVER}/report_npr_estimate.aspx?npr_estimate_no=${estimate.npr_estimate_no}`
      );
    } else {
      const saveData = {
        ...estimate,
        commit: 1,
        user_name,
        tg_trans_status_id: 1,
        tg_trans_close_id: 1,
      };
      console.log("saveData", saveData);
      const resp = await saveEstimate(saveData, false);
      if (resp.success && resp.data.npr_estimate_no) {
        window.open(
          `${process.env.REACT_APP_REPORT_SERVER}/report_npr_estimate.aspx?npr_estimate_no=${resp.data.npr_estimate_no}`
        );
        setEstimate({
          ...resp.data,
          npr_estimate_detail: sortData(resp.data.npr_estimate_detail),
        });
      } else {
        message.error("Can't open estimate report. Please contact admin.");
      }
    }
  };
  const onOpenQN = async () => {
    const saveData = {
      ...estimate,
      commit: 1,
      user_name,
      tg_trans_status_id: 4,
      tg_trans_close_id: 3,
    };
    console.log("saveData", saveData);
    const resp = await saveEstimate(saveData, false);
    if (resp.success && resp.data.qn_id) {
      message.success("Open Quotations Success.", 4);
      history.push(`/sales/quotations/view/${resp.data.qn_id}`);
    }
  };

  const layoutConfig = useMemo(
    () => ({
      projectId: 7,
      title: "SALES",
      home: "/sales",
      show: true,
      breadcrumb: ["Sales", "Estimate"],
      search: false,
      create: "",
      buttonAction: method === "view" ? ["Back"] : ["Save", "Discard"],
      edit: () => setMethod("edit"),
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
        {
          name: (
            <span>
              <PrinterOutlined className="pd-right-1 button-icon" />
              Print Estimate Price
            </span>
          ),
          link: `#`,
          callBack: onPrint,
        },
        {
          name: (
            <span>
              <ExportOutlined className="pd-right-1 button-icon" />
              Estimate to Quotations
            </span>
          ),
          link: `#`,
          callBack: onOpenQN,
        },
      ],
      back: history.goBack,
      discard: "/sales/operation/estimate",
      save: "function",
    }),
    [state, estimate, method, onOpenQN, onPrint]
  );

  const contextValue = React.useMemo(
    () => ({
      npr_id,
      onOpen,
      onClose,
      modal,
      estimate,
      setEstimate,
      user_name,
      onPrint,
    }),
    [npr_id, onOpen, onClose, modal, estimate, setEstimate, user_name, onPrint]
  );

  return (
    <>
      <MainLayout {...layoutConfig}>
        <NPREstimateContext.Provider value={contextValue}>
          <div id="form">
            <div
              className="full-width text-center mb-2"
              style={{ borderBottom: "1px solid #c0c0c0" }}
            >
              <h1>NPR. Estimate</h1>
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
                      <Text className="text-value">{category_name || "-"}</Text>
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
              <EstimateFormTab method={method} />
            </div>
          </div>
        </NPREstimateContext.Provider>
      </MainLayout>
    </>
  );
};

export default EstimateForm;
