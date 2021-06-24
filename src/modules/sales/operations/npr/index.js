import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNPRList } from "../../../../actions/sales/nprActions";
import DetailLoading from "../../../../components/DetailLoading";
import MainLayout from "../../../../components/MainLayout";
import { sortData } from "../../../../include/js/function_main";
import NPRTable from "./NPRTable";

const NPRList = () => {
  const dispatch = useDispatch();
  const { branch_id } = useSelector((state) => state.auth.authData);
  const { operations, loading } = useSelector((state) => state.sales);
  const list = operations.npr.list;
  const [state, setState] = useState(list);
  useEffect(() => {
    dispatch(getNPRList(branch_id));
  }, []);
  useEffect(() => {
    setState(sortData(list?.filter((obj) => obj.tg_trans_status_id !== 1)));
  }, [list]);
  const layoutConfig = {
    projectId: 7,
    title: "SALES",
    home: "/sales",
    show: true,
    breadcrumb: ["Sales", "NPR"],
    search: true,
    create: "",
    buttonAction: [],
    edit: {
      path: "/sales/npr/rd/1",
    },
    discard: "",
    onCancel: () => {
      console.log("Cancel");
    },
    onSearch: (w) => {
      const text = w.toUpperCase();
      setState(
        list.filter(
          (obj) =>
            obj.npr_no?.toUpperCase()?.indexOf(text) >= 0 ||
            (obj.npr_product_name &&
              obj.npr_product_name?.toUpperCase()?.indexOf(text) >= 0) ||
            (obj.npr_customer_name &&
              obj.npr_customer_name?.toUpperCase()?.indexOf(text) >= 0) ||
            (obj.npr_created_by_name &&
              obj.npr_created_by_name?.toUpperCase()?.indexOf(text) >= 0) ||
            (obj.npr_responsed_required_by_name &&
              obj.npr_responsed_required_by_name
                ?.toUpperCase()
                ?.indexOf(text) >= 0) ||
            (obj.npr_request_date &&
              obj.npr_request_date?.toUpperCase()?.indexOf(text) >= 0) ||
            (obj.trans_status &&
              obj.trans_status?.toUpperCase()?.indexOf(text) >= 0) ||
            (obj.npr_responsed_by &&
              obj.npr_responsed_by?.toUpperCase()?.indexOf(text) >= 0)
        )
      );
    },
  };
  return (
    <>
      <MainLayout {...layoutConfig}>
        {loading ? <DetailLoading /> : <NPRTable dataSource={state} />}
      </MainLayout>
    </>
  );
};

export default NPRList;
