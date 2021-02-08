import React, { useContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Tabs, Typography, message } from "antd";
import MainLayout from "../../../../components/MainLayout";

import Comments from "../../../../components/Comments";
import Detail from "./Receive_Detail";
import { get_log_by_id } from "../../../../actions/comment&log";
import {
  getReceiveById,
  receive_actions,
} from "../../../../actions/inventory/receiveActions";
import ModalRemark from "../../../../components/Modal_Remark";
import { report_server } from "../../../../include/js/main_config";
import Authorize from "../../../system/Authorize";
import { AppContext, ReceiveContext } from "../../../../include/js/context";
import { useHistory, useParams } from "react-router-dom";
import { receive_fields } from "../../config/receiveConfig";
import ReceiveHead from "./ReceiveHead";
import DetailLoading from "../../../../components/DetailLoading";
import ReceiveTabs from "./ReceiveTabs";
import { sortData } from "../../../../include/js/function_main";
const { Text } = Typography;

const Receive_View = (props) => {
  const history = useHistory();
  const authorize = Authorize();
  authorize.check_authorize();
  const dispatch = useDispatch();
  const [reload, setReload] = useState(true);
  const dataComments = useSelector((state) => state.log.comment_log);
  const { auth, currentProject, currentMenu } = useContext(AppContext);
  const { action, id } = useParams();
  const readOnly = action === "view" && true;
  const [, setTab] = useState("1");
  const [remark, setRemark] = useState("");
  const [openRemarkModal, setOpenRemarkModal] = useState({
    visible: false,
    loading: false,
  });
  const [state, setState] = useState(receive_fields);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("useEffect reload");
    const getData = async () => {
      setLoading(true);
      return await getReceiveById(id, auth.user_name).then((res) => {
        const receiveData = {
          ...res[0].value.data.main_master,
          receive_detail: sortData(res[1].value),
        };
        console.log("useEffect GET RECEIVE", receiveData);
        setState(receiveData);
        setLoading(false);
        setReload(false);
      });
    };
    id && reload && getData();

    return () => {
      console.log("UnMount");
    };
  }, [reload]);

  const flow =
    state &&
    state.data_flow_process &&
    state.data_flow_process.map((step) => {
      return step.all_group_in_node;
    });

  const redirect_to_view = (id) => {
    history.push({
      pathname: `${currentMenu.menu_url}/view/` + (id ?? "new"),
      state: { readOnly: true },
    });
  };
  const config = {
    projectId: currentProject && currentProject.project_id,
    title: currentProject && currentProject.project_name,
    home: currentProject && currentProject.project_url,
    show: true,
    breadcrumb: [
      "Home",
      "Inventory",
      "Receive",
      "View",
      state.receive_no && state.receive_no,
    ],
    search: false,
    buttonAction: [
      state && state.button_edit && "Edit",
      state && state.button_confirm && "Confirm",
      state && state.button_approve && "Approve",
      state && state.button_reject && "Reject",
      "Back",
    ],
    action: [
      {
        name: "Print",
        link: `${report_server}/Report_purch/report_receive2.aspx?receive_no=${
          state && state.receive_no
        }`,
      },
      state &&
        state.button_cancel && {
          name: "Cancel",
          cancel: true,
          link: ``,
        },
    ],
    step: {
      current: state && state.node_stay - 1,
      step: flow,
      process_complete: state.process_complete,
    },
    create: "",
    edit: {
      path: `${currentMenu.menu_url}/edit/` + (id ?? "new"),
      data: { readOnly: false },
    },
    back: currentMenu.menu_url,
    onBack: (e) => {
      console.log("Back");
    },
    onSave: (e) => {
      //e.preventDefault();
      console.log("Save");
    },
    onEdit: (e) => {
      //e.preventDefault();
      console.log("Edit");
    },
    onApprove: (e) => {
      //e.preventDefault();
      console.log("Approve");
      // setLoading(true);
      const app_detail = {
        process_status_id: 5,
        user_name: auth.user_name,
        process_id: state.process_id,
        process_member_remark: "Approve",
      };
      receive_actions(app_detail, state.receive_id).then(() => setReload(true));
    },
    onConfirm: () => {
      console.log("Confirm");
      // setLoading(true);
      const app_detail = {
        process_status_id: 2,
        user_name: auth.user_name,
        process_id: state.process_id,
        process_member_remark: "Confirm",
      };
      receive_actions(app_detail, state.receive_id).then(() => setReload(true));
    },
    onReject: () => {
      console.log("Reject");
      // setLoading(true);
      setOpenRemarkModal({
        visible: true,
        loading: false,
      });
    },
    onCancel: () => {
      console.log("Cancel");
      // setLoading(true);
      const app_detail = {
        process_status_id: 3,
        user_name: auth.user_name,
        process_id: state.process_id,
        process_member_remark: "Cancel",
      };
      receive_actions(app_detail, state.receive_id).then(() => setReload(true));
    },
  };

  const changeProcessStatus = (process_status_id) => {
    if (remark.trim() === "") {
      alert("Plase write remark");
      return false;
    }
    setOpenRemarkModal({ visible: false, loading: false });
    const app_detail = {
      //6 = reject
      process_status_id: process_status_id,
      user_name: auth.user_name,
      process_id: state.process_id,
      process_member_remark: remark,
    };
    message.success({ content: "Rejected", key: "validate", duration: 2 });
    receive_actions(app_detail, state.receive_id).then(() => setReload(true));
  };
  const contextValue = useMemo(() => {
    return {
      readOnly,
      mainState: state,
      receive_fields,
      loading,
    };
  }, [readOnly, state, receive_fields, loading]);
  useEffect(() => {
    console.log("get_log");
    state.process_id && dispatch(get_log_by_id(state.process_id));
  }, [state]);
  console.log("state", state);

  return (
    <MainLayout {...config}>
      <ReceiveContext.Provider value={contextValue}>
        <div id="form">
          <Row className="col-2">
            <Col span={8}>
              <h2>
                <strong>
                  {!readOnly ? (state.receive_id ? "Edit" : "Create") : ""}{" "}
                  {"Receive "}
                  {state.receive_no && "#" + state.receive_no}
                  {state.tg_trans_status_id === 3 && (
                    <Text strong type="danger">
                      #{state.trans_status_name}
                    </Text>
                  )}
                </strong>
              </h2>
            </Col>
            <Col span={12}></Col>
            <Col span={2}>
              <Text strong>Create Date :</Text>
            </Col>
            <Col span={2} className="text-right">
              <Text className="text-view">{state.receive_created}</Text>
            </Col>
          </Row>

          <>
            <ReceiveHead mainState={state} readOnly={readOnly} />
            {loading ? (
              <DetailLoading loading={loading} />
            ) : (
              <ReceiveTabs
                mainState={state}
                remarkFields={{
                  name: "receive_remark",
                  value: state.receive_remark,
                  placeholder: "Remark",
                }}
                readOnly={readOnly}
              />
            )}
          </>
        </div>
      </ReceiveContext.Provider>
      <ModalRemark
        title={"Remark"}
        state={openRemarkModal}
        onChange={setRemark}
        onOk={() => {
          changeProcessStatus(6);
        }}
        onCancel={() => {
          setOpenRemarkModal({ visible: false, loading: false });
          setRemark("");
        }}
      />
      <Comments data={dataComments} />
    </MainLayout>
  );
};

export default Receive_View;
