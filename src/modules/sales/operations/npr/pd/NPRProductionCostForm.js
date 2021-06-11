import React, { useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router";
import MainLayout from "../../../../../components/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import { PrinterOutlined } from "@ant-design/icons";
import { getNPRByID } from "../../../../../actions/sales/nprActions";
import NPRProductionCostFormTabList from "./NPRProductionCostFormTabList";
import { Col, Row } from "antd";
import Text from "antd/lib/typography/Text";
const NPRPDContext = React.createContext();

const initialState = {};
const NPRPRoductionCostForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { department, id } = useParams();
  const [state, setState] = useState(initialState);
  const [method, setMethod] = useState("view");
  const { user_name, department_id } = useSelector(
    (state) => state.auth.authData
  );
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
      discard: "/sales/npr/pd",
      save: "function",
    }),
    [state.npr_no]
  );

  useEffect(() => {
    const getData = async () => {
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
  console.log("state", state);
  return (
    <>
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
              <NPRProductionCostFormTabList method={method} />
            </div>
          </div>
        </NPRPDContext.Provider>
      </MainLayout>
    </>
  );
};

export default NPRPRoductionCostForm;
