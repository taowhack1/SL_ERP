/** @format */

import { Col, Row } from "antd";
import React, { useCallback } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import MainLayout from "../../../../components/MainLayout";
import useKeepLogs from "../../../logs/useKeepLogs";
import Authorize from "../../../system/Authorize";
import LineForm from "./form/LineForm";
import LineList from "./LineList";

const LineMain = () => {
  const dispatch = useDispatch();
  const authorize = Authorize();
  authorize.check_authorize();
  const keepLog = useKeepLogs();
  const [state, setState] = useState([
    {
      id: 0,
      token: "token0010010",
      line_room: "ห้องทดสอบ",
      line_message: "แจ้งเตือนการเปิด po",
    },
    {
      id: 1,
      token: "token0010010",
      line_room: "ห้องทดสอบ 2",
      line_message: "แจ้งเตือนการเปิด pr",
    },
    {
      id: 2,
      token: "token0010010",
      line_room: "ห้องทดสอบ 3",
      line_message: "แจ้งเตือนการเปิด Do",
    },
  ]);
  const [modal, setModal] = useState({
    visible: false,
  });

  const onClose = useCallback(
    () => setModal((prev) => ({ ...prev, visible: false })),
    [setModal]
  );
  const [loading, setLoading] = useState(false);
  const config = React.useMemo(() => ({
    projectId: 11,
    title: "Setting",
    home: "/setting",
    show: true,
    breadcrumb: ["Setting", "Notification", "Line notify"],
    search: true,
    create: "modal",
    buttonAction: ["Create"],
    // disabledEditBtn: !rowClick,
    discard: "/setting",
    badgeCount: 0,
    openModal: () => setModal((prev) => ({ ...prev, visible: true })),
    onCancel: () => {
      console.log("Cancel");
    },
  }));
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
            <LineList {...listConfig} setModal={setModal} />
          </Col>
        </Row>
      </MainLayout>
      <LineForm {...modalConfig} />
    </div>
  );
};

export default LineMain;
