import { message } from "antd";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { get_log_by_id } from "../../../../actions/comment&log";
import { updateProcessStatus } from "../../../../actions/inventory";
import { getReturnByID } from "../../../../actions/inventory/operation/return/returnActions";
import Comments from "../../../../components/Comments";
import DetailLoading from "../../../../components/DetailLoading";
import FormLayout from "../../../../components/FormLayout";
import MainLayout from "../../../../components/MainLayout";
import MainLayoutLoading from "../../../../components/MainLayoutLoading";
import ModalRemark from "../../../../components/Modal_Remark";
import { AppContext, ReturnContext } from "../../../../include/js/context";
import { returnFields } from "./config";
import ReturnHead from "./ReturnHead";
import ReturnTabs from "./ReturnTabs";
import { PrinterOutlined } from "@ant-design/icons";
const initialState = returnFields;
const readOnly = true;
const ReturnFormView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { auth, currentProject, currentMenu } = useContext(AppContext);
  const dataComments = useSelector((state) => state.log.comment_log);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState(initialState);
  const [remark, setRemark] = useState("");
  const [openRemarkModal, setOpenRemarkModal] = useState({
    visible: false,
    loading: false,
  });

  const flow =
    state.data_flow_process &&
    state.data_flow_process.map((step) => {
      return step.all_group_in_node;
    });

  const changeProcessStatus = (process_status_id, remark) => {
    if (process_status_id === 6) {
      if (remark.trim() === "") {
        // alert("Plase write remark");
        message.warning("Please write remark", 4);
        return false;
      }
      message.success({ content: "Reject", key: "validate", duration: 1 });
      setOpenRemarkModal({ visible: false, loading: false });
    }
    const statusDetail = {
      //6 = reject
      process_status_id: process_status_id,
      user_name: auth.user_name,
      process_id: state.process_id,
      process_member_remark: remark,
    };
    console.log(statusDetail);
    updateProcessStatus(statusDetail).then((res) => setLoading(true));
    // setLoading(true);
  };
  const config = {
    projectId: currentProject && currentProject.project_id,
    title: currentProject && currentProject.project_name,
    home: currentProject && currentProject.project_url,
    show: true,
    breadcrumb: ["Home", "Operations", "Return", "View", state.return_no],
    search: false,
    buttonAction: [
      state.button_edit && "Edit",
      state.button_confirm && "Confirm",
      state.button_approve && "Approve",
      state.button_reject && "Reject",
      "Back",
    ],
    discard: currentMenu.menu_url,
    back: currentMenu.menu_url,
    save: "function",
    edit: {
      path: `${currentMenu.menu_url}/edit/` + id,
    },
    action: [
      {
        name: (
          <span>
            <PrinterOutlined className='pd-right-1 button-icon' />
            ปริ้นท์ใบคืน
          </span>
        ),
        link: `${process.env.REACT_APP_REPORT_SERVER}/report_return.aspx?return_no=${state.return_no}`,
      },
      {
        name: (
          <span>
            <PrinterOutlined className='pd-right-1 button-icon' />
            ปริ้นท์ Tag สินค้า
          </span>
        ),
        link: `${process.env.REACT_APP_REPORT_SERVER}/report_return_tag.aspx?return_no=${state.return_no}`,
      },
      state.button_cancel && {
        name: "Cancel",
        cancel: true,
        link: ``,
      },
    ],
    step: {
      current: state.node_stay - 1,
      step: flow,
      process_complete: state.process_complete,
    },
    onApprove: (e) => {
      console.log("Approve");
      changeProcessStatus(5, "Approve");
    },
    onConfirm: () => {
      console.log("Confirm");
      changeProcessStatus(2, "Confirm");
    },
    onReject: () => {
      console.log("Reject");
      setOpenRemarkModal({
        visible: true,
        loading: false,
      });
    },
    onCancel: () => {
      console.log("Confirm");
      changeProcessStatus(3, "Cancel");
    },
  };
  const saveForm = useCallback(
    (data) => {
      setState({ ...state, ...data });
    },
    [state]
  );

  useEffect(() => {
    const getReturnData = async (id, user_name) =>
      await getReturnByID(id, user_name).then((res) => {
        setState(res.data[0]);
        dispatch(get_log_by_id(res.data[0].process_id));
        console.log("getReturnByID", res.data);
        setLoading(false);
      });

    console.log("useEffect", id);
    id ? getReturnData(id, auth.user_name) : setLoading(false);
  }, [id, loading]);

  const contextValue = useMemo(() => {
    return { data: state, saveForm, readOnly };
  }, [state, saveForm]);

  console.log("state", dataComments);
  return (
    <>
      <ReturnContext.Provider value={contextValue}>
        {loading ? (
          <MainLayoutLoading>
            <DetailLoading />
          </MainLayoutLoading>
        ) : (
          <MainLayout {...config}>
            <FormLayout>
              <ReturnHead />
              <ReturnTabs />
            </FormLayout>
            <Comments data={dataComments} />
          </MainLayout>
        )}
        <ModalRemark
          title={"Remark"}
          state={openRemarkModal}
          onChange={setRemark}
          onOk={() => {
            changeProcessStatus(6, remark);
          }}
          onCancel={() => {
            setOpenRemarkModal({ visible: false, loading: false });
            setRemark("");
          }}
        />
      </ReturnContext.Provider>
    </>
  );
};

export default React.memo(ReturnFormView);
