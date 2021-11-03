/** @format */

import { Radio, Space } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRDEmp } from "../../../../actions/hrm";
import { getNPRList } from "../../../../actions/sales/nprActions";
import ConfigColumn from "../../../../components/ConfigColumn";
import DetailLoading from "../../../../components/DetailLoading";
import MainLayout from "../../../../components/MainLayout";
import { sortData } from "../../../../include/js/function_main";
import NPRTable from "./NPRTable";

const NPRList = () => {
  const dispatch = useDispatch();
  const { operations, loading } = useSelector((state) => state.sales);
  const list = operations.npr.list;
  const [state, setState] = useState(list);
  const [modal, setModal] = useState({
    visible: false,
  });
  useEffect(() => {
    dispatch(getRDEmp());
    dispatch(getNPRList());
    setModal((prev) => ({ ...prev, update: false }));
  }, []);
  useEffect(() => {
    console.log("list", list);
    setState(sortData(list));
  }, [list]);
  const onClose = useCallback(() => {
    setModal((prev) => ({
      ...prev,
      visible: false,
    }));
  }, [setModal, modal]);
  const configView = () => setModal((prev) => ({ ...prev, visible: true }));
  const modalConfig = React.useMemo(
    () => ({
      ...modal,
      list,
      onClose,
      configView,
    }),
    [modal.visible, onClose, configView]
  );
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
    openConfigColomn: () => setModal((prev) => ({ ...prev, visible: true })),
    onCancel: () => {
      console.log("Cancel");
    },
    onSearch: (w) => {
      const text = w.toUpperCase();
      setState(
        list.filter(
          (obj) =>
            // (department_id === 1 || obj?.rd_type_branch_id === branch_id) &&

            obj?.npr_no?.toUpperCase()?.indexOf(text) >= 0 ||
            (obj?.npr_product_name &&
              obj?.npr_product_name?.toUpperCase()?.indexOf(text) >= 0) ||
            (obj?.npr_customer_name &&
              obj?.npr_customer_name?.toUpperCase()?.indexOf(text) >= 0) ||
            (obj?.npr_created_by_name &&
              obj?.npr_created_by_name?.toUpperCase()?.indexOf(text) >= 0) ||
            (obj?.npr_responsed_required_by_name &&
              obj?.npr_responsed_required_by_name
                ?.toUpperCase()
                ?.indexOf(text) >= 0) ||
            (obj?.npr_request_date &&
              obj?.npr_request_date?.toUpperCase()?.indexOf(text) >= 0) ||
            (obj?.trans_status &&
              obj?.trans_status?.toUpperCase()?.indexOf(text) >= 0) ||
            (obj?.npr_responsed_by &&
              obj?.npr_responsed_by?.toUpperCase()?.indexOf(text) >= 0)
        )
      );
    },
    searchBar: (
      <Space size={18}>
        <div>
          <Text strong>Type of NPR :</Text>
        </div>
        <Radio.Group
          options={[
            {
              label: "ALL",
              value: 0,
            },
            {
              label: "NPR",
              value: 1,
            },
            {
              label: "NPRm",
              value: 3,
            },
          ]}
          onChange={(e) => {
            const nprType = e.target.value;
            switch (nprType) {
              case 0:
                setState(list);
                break;
              case 1:
                setState(list.filter((obj) => obj.branch_id === 1));
                break;
              case 3:
                setState(list.filter((obj) => obj.branch_id === 3));
                break;
              default:
                setState(list);
                break;
            }
          }}
          optionType='button'
          buttonStyle='solid'
          defaultValue={0}
        />
      </Space>
    ),
    configColumn: <ConfigColumn {...modalConfig} />,
  };

  console.log("List", state);
  return (
    <>
      <MainLayout {...layoutConfig}>
        {loading ? <DetailLoading /> : <NPRTable dataSource={state} />}
      </MainLayout>
    </>
  );
};

export default NPRList;
