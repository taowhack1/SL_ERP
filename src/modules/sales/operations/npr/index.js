/** @format */

import { Radio, Space } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRDEmp } from "../../../../actions/hrm";
import {
  apiNPRRD,
  filterNPR,
  filterNPR_RD,
  getNPRList,
} from "../../../../actions/sales/nprActions";
import ConfigColumn from "../../../../components/ConfigColumn";
import DetailLoading from "../../../../components/DetailLoading";
import MainLayout from "../../../../components/MainLayout";
import { useFetch } from "../../../../include/js/customHooks";
import { sortData } from "../../../../include/js/function_main";
import NPRTable from "./NPRTable";
const NPRList = () => {
  const dispatch = useDispatch();
  const { operations } = useSelector((state) => state.sales);
  const list = operations.npr;
  const { filter_rd } = operations.npr;
  const { pageSize, page, keyword } = filter_rd || {};
  const [state, setState] = useState([]);
  const [modal, setModal] = useState({
    visible: false,
  });
  const {
    data: listDataNPR,
    loading: NPRloading,
    fetchData,
  } = useFetch(`${apiNPRRD}`);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
    const { current, pageSize } = pagination;
    dispatch(filterNPR_RD({ page: current, pageSize }));
  };
  const getSearchData = (keyword) => {
    const search_data =
      listDataNPR &&
      sortData(
        keyword
          ? listDataNPR.filter(
              (npr) =>
                npr?.npr_no?.toUpperCase()?.indexOf(keyword) >= 0 ||
                (npr?.npr_product_name &&
                  npr?.npr_product_name?.toUpperCase()?.indexOf(keyword) >=
                    0) ||
                (npr?.npr_customer_name &&
                  npr?.npr_customer_name?.toUpperCase()?.indexOf(keyword) >=
                    0) ||
                (npr?.npr_created_by_name &&
                  npr?.npr_created_by_name?.toUpperCase()?.indexOf(keyword) >=
                    0) ||
                (npr?.npr_responsed_required_by_name &&
                  npr?.npr_responsed_required_by_name
                    ?.toUpperCase()
                    ?.indexOf(keyword) >= 0) ||
                (npr?.npr_request_date &&
                  npr?.npr_request_date?.toUpperCase()?.indexOf(keyword) >=
                    0) ||
                (npr?.trans_status &&
                  npr?.trans_status?.toUpperCase()?.indexOf(keyword) >= 0) ||
                (npr?.npr_responsed_by &&
                  npr?.npr_responsed_by?.toUpperCase()?.indexOf(keyword) >= 0)
            )
          : listDataNPR
      );
    return search_data;
  };

  useEffect(() => {
    dispatch(getRDEmp());
    //dispatch(getNPRList());
    setModal((prev) => ({ ...prev, update: false }));
  }, []);
  useEffect(() => {
    console.log("list", list);
    const respSearch = getSearchData(keyword);
    setState(respSearch);
  }, [keyword, listDataNPR]);
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
      dispatch(filterNPR_RD({ keyword: text }));
    },
    searchValue: keyword || null,
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
                setState(sortData(listDataNPR));
                break;
              case 1:
                setState(
                  sortData(listDataNPR.filter((obj) => obj.branch_id === 1))
                );
                break;
              case 3:
                setState(
                  sortData(listDataNPR.filter((obj) => obj.branch_id === 3))
                );
                break;
              default:
                setState(sortData(listDataNPR));
                break;
            }
          }}
          optionType='button'
          buttonStyle='solid'
          defaultValue={0}
        />
      </Space>
    ),
    // configColumn: <ConfigColumn {...modalConfig} />,
  };

  console.log("List", state);
  return (
    <>
      <MainLayout {...layoutConfig}>
        {NPRloading ? (
          <DetailLoading />
        ) : (
          <NPRTable
            dataSource={state}
            pageSize={pageSize}
            page={page}
            onChange={onChange}
          />
        )}
      </MainLayout>
    </>
  );
};

export default NPRList;
