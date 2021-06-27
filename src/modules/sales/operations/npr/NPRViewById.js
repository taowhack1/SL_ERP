import React, { useEffect, useMemo, useState } from "react";
import { useHistory, useParams, useRouteMatch } from "react-router";
import MainLayout from "../../../../components/MainLayout";
import NPRTabs from "./NPRTabs";
import {
  getNPRByID,
  getNPRItemList,
  getNPRSMDMasterData,
} from "../../../../actions/sales/nprActions";
import NPRHead from "./NPRHead";
import { get_qa_conditions_master } from "../../../../actions/qa/qaTestAction";
import { useDispatch, useSelector } from "react-redux";
import { getRDEmp } from "../../../../actions/hrm";
import { PrinterOutlined } from "@ant-design/icons";
import { getUOMList } from "../../../../actions/inventory";
import { SET_LOADING } from "../../../../actions/types";
export const NPRFormContext = React.createContext();
const initialState = {
  npr_responsed_required_by: null,
  npr_responsed_delivery_date: null,
  user_name: null,
  npr_responsed_remark: null,
  tg_trans_status_id: 1,
  npr_formula_detail: [],
};
const NPRViewById = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { department, id } = useParams();
  const [state, setState] = useState(initialState);
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
      buttonAction: ["Back"],
      edit: {},
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
      discard: "/sales/npr",
      save: "function",
    }),
    [state.npr_no]
  );
  useEffect(() => {
    const getData = async () => {
      dispatch(getNPRItemList());
      dispatch(getUOMList());
      dispatch(get_qa_conditions_master(3, 1, 1, 1));
      dispatch(getNPRSMDMasterData());
      const resp = await getNPRByID(id);
      if (resp.success) {
        setState(resp.data);
        dispatch({ type: SET_LOADING, payload: false });
      }
    };
    getData();
  }, [id]);

  console.log("data", state);
  return (
    <>
      <MainLayout {...layoutConfig}>
        <NPRFormContext.Provider
          value={{ id, state, setState, user_name, department_id, department }}
        >
          <div id="form">
            <div
              className="full-width text-center mb-2"
              style={{ borderBottom: "1px solid #c0c0c0" }}
            >
              <h1>NEW PRODUCT REQUISITION FORM</h1>
            </div>
            <NPRHead state={state} />
            <NPRTabs state={state} />
          </div>
        </NPRFormContext.Provider>
      </MainLayout>
    </>
  );
};

export default NPRViewById;
