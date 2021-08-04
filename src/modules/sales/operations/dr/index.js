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
import { getDR, searchDR } from "../../../../actions/sales/drActions";
import { sortData } from "../../../../include/js/function_main";

const MENU_ID = 66;
const DeliveryRequisition = (props) => {
  const [list, setList] = useState([]);
  const dispatch = useDispatch();
  const keepLog = useKeepLogs();
  const authorize = Authorize();
  authorize.check_authorize();
  const {
    dr: {
      search: { keyword, page, status },
    },
  } = useSelector((state) => state.sales.operations);
  const [state, setState] = useState([]);
  const [modal, setModal] = useState({
    visible: false,
    dr_id: null,
    so_detail_id: null,
  });
  useEffect(() => {
    const getData = async () => {
      console.log("Fetch Data...");
      const resp = await getDR();
      if (resp.success) {
        setList(sortData(resp.data));
        setState(sortData(resp.data));
        setModal((prev) => ({ ...prev, update: false }));
      }
    };
    !modal.visible && getData();
  }, [modal.visible]);

  const onClose = useCallback(() => {
    setModal((prev) => ({
      ...prev,
      visible: false,
      dr_id: null,
      so_detail_id: null,
    }));
    keepLog.keep_log_action("Close Modal DR");
  }, [setModal]);
  const [loading, setLoading] = useState(false);

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
      discard: "/sales",
      badgeCount: 0,
      openModal: () => setModal((prev) => ({ ...prev, visible: true })),
      onCancel: () => {
        console.log("Cancel");
      },
      onSearch: (value) => {
        dispatch(searchDR({ keyword: value }));
      },
      searchBar: (
        <Space size={18}>
          <div>
            <Text strong>Status :</Text>
          </div>
          <Radio.Group
            options={[
              {
                label: "All",
                value: 1,
              },
              {
                label: "Pending",
                value: 4,
              },
              {
                label: "Cancel",
                value: 3,
              },
            ]}
            onChange={(e) => dispatch(searchDR({ status: e.target.value }))}
            optionType="button"
            buttonStyle="solid"
            value={status}
            defaultValue={status}
          />
        </Space>
      ),
    }),
    [keyword, status, setModal, list]
  );

  useEffect(() => {
    setLoading(true);
    let filterData =
      status === 1
        ? list
        : list.filter((obj) => obj.tg_trans_status_id === status);
    filterData = !keyword
      ? filterData
      : filterData.filter(
          (obj) =>
            obj?.dr_no?.indexOf(keyword) >= 0 ||
            obj?.so_no?.indexOf(keyword) >= 0 ||
            obj?.dr_delivery_date?.indexOf(keyword) >= 0 ||
            obj?.customer_no_name?.indexOf(keyword) >= 0 ||
            obj?.dr_location_delivery?.indexOf(keyword) >= 0
        );

    setState(filterData);
    setLoading(false);
  }, [keyword, status]);

  const viewData = (dr_id) =>
    setModal((prev) => ({ ...prev, dr_id, visible: true }));
  const listConfig = React.useMemo(
    () => ({
      loading,
      data: state,
      viewData,
    }),
    [loading, state, viewData]
  );
  const modalConfig = React.useMemo(
    () => ({
      ...modal,
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
