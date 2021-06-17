/** @format */

import MainLayout from "../../../../components/MainLayout";
import Text from "antd/lib/typography/Text";
import { Col, Row } from "antd";
import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { PrinterOutlined } from "@ant-design/icons";
import {
  getNPRByID,
  getNPRItemList,
  getNPRList,
  getNPRSMDMasterData,
} from "../../../../actions/sales/nprActions";
import DetailLoading from "../../../../components/DetailLoading";
import useKeepLogs from "../../../logs/useKeepLogs";
import { getRDEmp } from "../../../../actions/hrm";
import { getUOMList } from "../../../../actions/inventory";
import { get_qa_conditions_master } from "../../../../actions/qa/qaTestAction";
import { useParams } from "react-router-dom";
import EstimateFormTab from "../estimate/EstimateFormTab";
export const NPREstimateContext = React.createContext();
const EstimateForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const [state, setState] = useState({});
  const [method, setMethod] = useState("view");
  const { user_name, department_id } = useSelector(
    (state) => state.auth.authData
  );
  useEffect(() => {
    const getData = async () => {
      dispatch(getRDEmp());
      dispatch(getNPRItemList());
      dispatch(getUOMList());
      dispatch(get_qa_conditions_master(3, 1, 1, 1));
      dispatch(getNPRSMDMasterData());
      const resp = await getNPRByID(id);
      if (resp.success) {
        setState(resp.data);
      }
    };
    getData();
  }, [id]);
  const {
    npr_no,
    npr_product_no_name,
    category_name,
    npr_created_by_no_name,
    npr_created,
    npr_request_date,
    npr_customer_name,
  } = state;
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
      ],
      back: history.goBack,
      discard: "/sales/operation/estimate",
      save: "function",
    }),
    [state.npr_no, method]
  );

  const [modal, setModal] = useState({
    visible: false,
    loading: false,
  });

  const onOpen = () => setModal((prev) => ({ ...prev, visible: true }));
  const onClose = () => setModal((prev) => ({ ...prev, visible: false }));

  const contextValue = React.useMemo(
    () => ({
      onOpen,
      onClose,
      modal,
    }),
    [onOpen, onClose, modal]
  );

  console.log("state", state);
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
