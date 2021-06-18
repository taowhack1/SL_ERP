/** @format */

import React, { useState } from "react";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import MainLayout from "../../../../components/MainLayout";
import DeliveryOrderFormDetail from "./DeliveryOrderFormDetail";
import DeliveryOrderFormHead from "./DeliveryOrderFormHead";
export const DeliveryOrderContext = React.createContext();
const DeliveryOrderForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const [state, setState] = useState({});
  const [method, setMethod] = useState(id === "new" ? id : "view");
  const { user_name, department_id } = useSelector(
    (state) => state.auth.authData
  );
  const layoutConfig = useMemo(
    () => ({
      projectId: 7,
      title: "SALES",
      home: "/sales",
      show: true,
      breadcrumb: ["Sales", "NPR", "Delivery Order"],
      search: false,
      create: "",
      buttonAction: method === "view" ? ["Edit", "Back"] : ["Save", "Discard"],
      edit: () => setMethod("edit"),
      //   action: [
      //     {
      //       name: (
      //         <span>
      //           <PrinterOutlined className="pd-right-1 button-icon" />
      //           Print NPR
      //         </span>
      //       ),
      //       link: `${process.env.REACT_APP_REPORT_SERVER}/report_npr.aspx?npr_no=${state.npr_no}`,
      //     },
      //   ],
      back: history.goBack,
      discard: "/sales/operation/do",
      save: "function",
    }),
    [state, method]
  );
  return (
    <>
      <MainLayout {...layoutConfig}>
        <DeliveryOrderContext.Provider
          value={{
            method,
            state,
            setState,
            user_name,
            department_id,
            dispatch,
          }}>
          <div id='form'>
            <DeliveryOrderFormHead></DeliveryOrderFormHead>
            <DeliveryOrderFormDetail></DeliveryOrderFormDetail>
          </div>
        </DeliveryOrderContext.Provider>
      </MainLayout>
    </>
  );
};

export default DeliveryOrderForm;
