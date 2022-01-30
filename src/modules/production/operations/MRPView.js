import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Typography, message } from "antd";
import MainLayout from "../../../components/MainLayout";
import Comments from "../../../components/Comments";
import { get_log_by_id } from "../../../actions/comment&log";
import Authorize from "../../system/Authorize";
import MRPTabPanel from "./MRPTabPanel";
import { getMRPByID } from "../../../actions/production/mrpActions";
import MRPHead from "./MRPHead";
import { sortData } from "../../../include/js/function_main";
import { MRPContext } from "../../../include/js/context";
import ModalRemark from "../../../components/Modal_Remark";
import { updateProcessStatus } from "../../../actions/inventory";
import MainLayoutLoading from "../../../components/MainLayoutLoading";
import DetailLoading from "../../../components/DetailLoading";
import { useHistory, useParams } from "react-router-dom";
const { Text } = Typography;

const MRPView = (props) => {
  const readOnly = true;
  const { id } = useParams();
  const authorize = Authorize();

  const dispatch = useDispatch();
  authorize.check_authorize();
  const auth = useSelector((state) => state.auth.authData);
  const current_project = useSelector((state) => state.auth.currentProject);
  const dataComments = useSelector((state) => state.log.comment_log);
  const [state, setState] = useState({
    data_head: null,
    data_material: null,
  });
  const [loading, setLoading] = useState(true);
  const [remark, setRemark] = useState("");
  const [openRemarkModal, setOpenRemarkModal] = useState({
    visible: false,
    loading: false,
  });
  const flow = state?.data_flow_process?.map((step) => {
    return step.all_group_in_node;
  });

  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: [
      "Home",
      "Operations",
      "Work Order",
      "View",
      state?.mrp_no && state?.mrp_no,
    ],
    search: false,
    buttonAction: [
      state?.button_edit && "Edit",
      state?.button_confirm && "Confirm",
      state?.button_approve && "Approve",
      state?.button_reject && "Reject",
      "Back",
    ],
    step: {
      current: state?.node_stay - 1,
      step: flow,
      process_complete: state?.process_complete,
    },
    create: "",
    save: "function",
    back: "/production/operations/mrp",
    discard: "/production/operations/mrp",
    action: [
      // {
      //   name: "Production",
      //   callBack: () =>
      //     history.push("/production/operations/production", state),
      // },
      state &&
        state?.button_cancel && {
          name: (
            <div className="text-center">
              <Text className="error">Cancel</Text>
            </div>
          ),
          cancel: true,
          link: ``,
        },
    ],
    edit: {
      data: state,
      path: state && "/production/operations/mrp/edit/" + state?.mrp_id,
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
  const changeProcessStatus = (process_status_id, remark) => {
    if (process_status_id === 6) {
      if (remark.trim() === "") {
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
      process_id: state?.process_id,
      process_member_remark: remark,
    };
    updateProcessStatus(statusDetail).then((res) => {
      setLoading(true);
    });
  };

  useEffect(() => {
    const getData = async (id, user_name) =>
      await getMRPByID(id, user_name).then((res) => {
        const resData = res[0]?.value?.data[0];
        console.log("getMRPByID", resData);
        const data = {
          ...resData,
          rm_detail:
            sortData(resData.mrp_detail.filter((obj) => obj.type_id === 1)) ??
            [],
          pk_detail:
            sortData(resData.mrp_detail.filter((obj) => obj.type_id === 2)) ??
            [],
          mrp_routing: {
            bulk: sortData(
              resData.mrp_routing.filter(
                (obj) => obj.routing_detail_type_id === 1
              )
            ),
            fg: sortData(
              resData.mrp_routing.filter(
                (obj) => obj.routing_detail_type_id === 2
              )
            ),
          },
        };

        setState(data);
        dispatch(get_log_by_id(data?.process_id));
        setLoading(false);
      });

    id && loading ? getData(id, auth.user_name) : setLoading(false);
  }, [id, loading]);
  const headContextValue = useMemo(() => {
    return {
      readOnly,
      mainState: state,
    };
  }, [loading, id]);

  return (
    <MRPContext.Provider value={headContextValue}>
      {loading ? (
        <MainLayoutLoading>
          <DetailLoading />
        </MainLayoutLoading>
      ) : (
        <MainLayout {...config}>
          {/* Form */}
          <div id="form">
            <Row className="col-2">
              <Col span={8}>
                <h2>
                  <strong>
                    {"View"} MRP
                    {state?.mrp_no && " #" + state?.mrp_no}
                    {state?.tg_trans_status_id === 3 && (
                      <Text strong type="danger">
                        #{state?.trans_status_name}
                      </Text>
                    )}
                  </strong>
                </h2>
              </Col>
              <Col span={12}></Col>
              <Col span={2}>
                <Text strong>Create Date :</Text>
              </Col>
              <Col span={2} style={{ textAlign: "right" }}>
                <Text className="text-view">{state?.mrp_created}</Text>
              </Col>
            </Row>

            <MRPHead />
            <MRPTabPanel />
          </div>
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
    </MRPContext.Provider>
  );
};

export default React.memo(MRPView);
