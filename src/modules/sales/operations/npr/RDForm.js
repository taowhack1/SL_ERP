/** @format */

import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
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
import DetailLoading from "../../../../components/DetailLoading";
import { getRDEmp } from "../../../../actions/hrm";
import { PrinterOutlined } from "@ant-design/icons";
import { report_server } from "../../../../include/js/main_config";
export const NPRFormContext = React.createContext();
const initialState = {
  npr_responsed_required_by: null,
  npr_responsed_delivery_date: null,
  user_name: null,
  npr_responsed_remark: null,
  tg_trans_status_id: 1,
  npr_formula_detail: [],
};
const RDForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [state, setState] = useState(initialState);
  const { user_name, department_id } = useSelector(
    (state) => state.auth.authData
  );
  // const { loading } = useSelector((state) => state.sales);
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
              <PrinterOutlined className='pd-right-1 button-icon' />
              Print NPR
            </span>
          ),
          link: `${report_server}/report_npr.aspx?npr_no=${state.npr_no}`,
        },
      ],
      back: "/sales/npr",
      discard: "/sales/npr",
      save: "function",
    }),
    [state.npr_no]
  );
  useEffect(() => {
    const getData = async () => {
      dispatch(getRDEmp());
      dispatch(getNPRItemList());
      dispatch(get_qa_conditions_master(3, 1, 1, 1));
      dispatch(getNPRSMDMasterData());
      const resp = await getNPRByID(id);
      if (resp.success) {
        setState(resp.data);
      }
    };
    getData();
  }, [id]);

  console.log("data", state);
  return (
    <>
      <MainLayout {...layoutConfig}>
        <NPRFormContext.Provider
          value={{ id, state, setState, user_name, department_id }}>
          <div id='form'>
            <div
              className='full-width text-center mb-2'
              style={{ borderBottom: "1px solid #c0c0c0" }}>
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

export default RDForm;
