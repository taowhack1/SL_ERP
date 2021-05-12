import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNPRList } from "../../../../actions/sales/nprActions";
import DetailLoading from "../../../../components/DetailLoading";
import MainLayout from "../../../../components/MainLayout";
import NPRTable from "./NPRTable";

const NPRList = () => {
  const dispatch = useDispatch();
  const { operations, loading } = useSelector((state) => state.sales);
  const { list } = operations.npr;
  const [state, setState] = useState(list);
  useEffect(() => {
    dispatch(getNPRList());
  }, []);
  useEffect(() => {
    setState(list);
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
      path: "/sales/npr/1",
    },
    discard: "",
    onCancel: () => {
      console.log("Cancel");
    },
    onSearch: (w) => {
      const text = w.toUpperCase();
      // setState(
      //   list.filter(
      //     (obj) =>
      //       obj.npr_no.toUpperCase().indexOf(text) > 0 ||
      //       (obj.npr_product_name &&
      //         obj.npr_product_name.toUpperCase().indexOf(text) > 0) ||
      //       (obj.npr_customer_name &&
      //         obj.npr_customer_name.toUpperCase().indexOf(text) > 0) ||
      //       (obj.npr_created_by_name &&
      //         obj.npr_created_by_name.toUpperCase().indexOf(text) > 0) ||
      //       (obj.npr_responsed_by &&
      //         obj.npr_responsed_by.toUpperCase().indexOf(text) > 0)
      //   )
      // );
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