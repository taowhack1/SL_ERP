import React, { useCallback, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Row, Col, Space, Radio } from "antd";
import MainLayout from "../../../../components/MainLayout";
import $ from "jquery";
import { useDispatch, useSelector } from "react-redux";
import { updateSOFilter } from "../../../../actions/sales";
import Authorize from "../../../system/Authorize";
import useKeepLogs from "../../../logs/useKeepLogs";
import Text from "antd/lib/typography/Text";
import DRList from "./DRList";
import DRForm from "./form/DRForm";
import { getDR } from "../../../../actions/sales/drActions";
import { sortData } from "../../../../include/js/function_main";

const MENU_ID = 66;
const DeliveryRequisition = (props) => {
  const dispatch = useDispatch();
  const keepLog = useKeepLogs();
  const authorize = Authorize();
  authorize.check_authorize();
  const current_menu = useSelector((state) =>
    state.auth.menus.find((obj) => obj.menu_id === MENU_ID)
  );
  const auth = useSelector((state) => state.auth.authData);
  const {
    dr: {
      search: { keyword, page, status },
    },
  } = useSelector((state) => state.sales.operations);
  //   const [rowClick, setRowClick] = useState(false);

  const [state, setState] = useState([]);
  const [modal, setModal] = useState({
    visible: false,
  });
  useEffect(() => {
    const getData = async () => {
      const resp = await getDR();
      if (resp.success) {
        setState(sortData(resp.data));
      }
    };
    getData();
  }, []);

  const onClose = useCallback(
    () => setModal((prev) => ({ ...prev, visible: false })),
    [setModal]
  );
  const [loading, setLoading] = useState(false);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const config = React.useMemo(
    () => ({
      projectId: 7,
      title: "Sales",
      home: "/sales",
      show: true,
      breadcrumb: ["Sales", "Operation", "Delivery Requisition"],
      search: true,
      searchValue: keyword,
      create: "modal",
      buttonAction: ["Create"],
      // disabledEditBtn: !rowClick,
      discard: "/sales",
      badgeCount: 0,
      openModal: () => setModal((prev) => ({ ...prev, visible: true })),
      onCancel: () => {
        console.log("Cancel");
      },
      onSearch: (value) => {
        console.log(value);
        dispatch(updateSOFilter({ keyword: value }));
      },
      searchBar: (
        <Space size={18}>
          <div>
            <Text strong>Status :</Text>
          </div>
          <Radio.Group
            options={[
              {
                label: "Pending",
                value: 1,
              },
              {
                label: "Complete",
                value: 2,
              },
              {
                label: "Cancel",
                value: 3,
              },
              {
                label: "All",
                value: 4,
              },
            ]}
            onChange={(e) => console.log({ status: e.target.value })}
            optionType="button"
            buttonStyle="solid"
            value={status}
            defaultValue={status}
          />
        </Space>
      ),
    }),
    [keyword, status, setModal]
  );

  useEffect(() => {
    setLoading(true);

    // let filterData =
    //   filter.salesType === 3
    //     ? so_list
    //     : so_list.filter((obj) => obj.so_type_id === filter.salesType);
    // filterData = !filter.keyword
    //   ? filterData
    //   : filterData.filter(
    //       (obj) =>
    //         obj?.so_no?.indexOf(filter.keyword) >= 0 ||
    //         obj?.qn_no?.indexOf(filter.keyword) >= 0 ||
    //         obj?.customer_no_name?.indexOf(filter.keyword) >= 0 ||
    //         obj?.so_created_by_no_name?.indexOf(filter.keyword) >= 0 ||
    //         obj?.so_created?.indexOf(filter.keyword) >= 0 ||
    //         obj?.so_description?.indexOf(filter.keyword) >= 0
    //     );

    // setState(filterData);
    setLoading(false);
  }, [keyword, status]);
  const listConfig = React.useMemo(
    () => ({
      loading,
      data: state,
    }),
    [loading, state]
  );
  const modalConfig = React.useMemo(
    () => ({
      visible: modal.visible,
      onClose,
    }),
    [modal.visible, onClose]
  );
  return (
    <div>
      <MainLayout {...config}>
        <Row>
          <Col span={24}>
            <DRList {...listConfig} />
          </Col>
        </Row>
      </MainLayout>
      <DRForm {...modalConfig} />
    </div>
  );
};

export default withRouter(DeliveryRequisition);
