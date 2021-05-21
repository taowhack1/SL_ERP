import React, {
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Row, Col, Typography, message } from "antd";
import { reducer } from "../../reducers";
import {
  receive_fields,
  receive_require_fields,
} from "../../config/receiveConfig";
import {
  create_receive,
  getReceiveById,
  get_po_receive_list,
  update_receive,
} from "../../../../actions/inventory/receiveActions";
import { header_config } from "../../../../include/js/main_config";
import { api_receive_get_ref_po_detail } from "../../../../include/js/api";

import MainLayout from "../../../../components/MainLayout";
import moment from "moment";
import Comments from "../../../../components/Comments";

import axios from "axios";
import Authorize from "../../../system/Authorize";
import {
  sortData,
  validateFormHead,
} from "../../../../include/js/function_main";
import ReceiveHead from "../receive/ReceiveHead";
import ReceiveTabs from "../receive/ReceiveTabs";
import DetailLoading from "../../../../components/DetailLoading";
import { AppContext, ReceiveContext } from "../../../../include/js/context";
import { getAllItems } from "../../../../actions/inventory/itemActions";
import { get_all_vendor } from "../../../../actions/purchase/vendorActions";

const { Text } = Typography;

const ReceivePDCreate = (props) => {
  const history = useHistory();
  const authorize = Authorize();
  authorize.check_authorize();
  const dispatch = useDispatch();

  const { auth, currentProject, currentMenu } = useContext(AppContext);
  const { action, id } = useParams();
  console.log("action", action);
  const { readOnly } = props?.location?.state ?? {
    readOnly: action !== "view" ? false : true,
  };

  const initialStateHead = {
    ...receive_fields,
    commit: 1,
    user_name: auth.user_name,
    branch_id: auth.branch_id,
    branch_name: auth.branch_name,
    receive_created: moment().format("DD/MM/YYYY"),
  };
  const [state, stateDispatch] = useReducer(reducer, initialStateHead);
  const [loading, setLoading] = useState(false);
  const dataComments = useSelector((state) => state.log.comment_log);

  const flow =
    state &&
    state.data_flow_process &&
    state.data_flow_process.map((step) => {
      return step.all_group_in_node;
    });

  const remarkFields = {
    name: "receive_remark",
    value: state.receive_remark,
    placeholder: "Remark",
  };

  const data =
    props.location && props.location.state ? props.location.state : 0;
  const redirectToView = (id) => {
    console.log("redirect id", id);
    return history.push({
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
      "Production Receive",
      state.receive_pd_no ? "Edit" : "Create",
      state.receive_pd_no && state.receive_pd_no,
    ],
    search: false,
    buttonAction:
      action !== "create" && readOnly
        ? [
            state && state.button_edit && "Edit",
            state && state.button_confirm && "Confirm",
            state && state.button_approve && "Approve",
            state && state.button_reject && "Reject",
            "Back",
          ]
        : ["Save", "Discard"],
    action: readOnly
      ? [
          readOnly && {
            name: "Print",
            link: `${
              process.env.REACT_APP_REPORT_SERVER
            }/report_receive2.aspx?receive_pd_no=${
              state && state.receive_pd_no
            }`,
          },
          state &&
            state.button_cancel && {
              name: "Cancel",
              cancel: true,
              link: ``,
            },
        ]
      : null,
    step: {
      current: state && state.node_stay - 1,
      step: flow,
      process_complete: state.process_complete,
    },
    create: "",
    save: "function",

    discard: currentMenu.menu_url,
    back: currentMenu.menu_url,
    onSave: (e) => {
      console.log("Save", state);
      const key = "validate";
      const validate = validateFormHead(state, receive_require_fields);
      if (validate.validate) {
        console.log("pass", state);
        state.receive_id
          ? dispatch(
              update_receive(
                state.receive_id,
                auth.user_name,
                state,
                redirectToView
              )
            )
          : dispatch(create_receive(auth.user_name, state, redirectToView));
      } else {
        console.log("not pass", state);
        message.warning({
          content: "Please fill your form completely.",
          key,
          duration: 2,
        });
      }
    },
  };

  useEffect(() => {
    setLoading(true);
    dispatch(get_all_vendor());
    dispatch(get_po_receive_list());
    dispatch(getAllItems());
    const getData = async () =>
      await getReceiveById(id, auth.user_name).then((res) => {
        const receiveData = {
          ...res[0].value.data.main_master,
          receive_detail: sortData(res[1].value),
        };
        console.log("receiveData", receiveData);
        stateDispatch({
          type: "SET_HEAD",
          payload: receiveData,
        });
        setLoading(false);
      });
    id && getData();
    action === "create" && setLoading(false);
  }, []);

  const getDetail = async (data, po_id) => {
    setLoading(true);
    console.log("getDetail", po_id);
    if (!po_id) {
      stateDispatch({
        type: "SET_HEAD",
        payload: initialStateHead,
      });
    } else {
      await axios
        .get(`${api_receive_get_ref_po_detail}/${po_id}`, header_config)
        .then((res) => {
          const details = res.data[0];
          details.map((detail) => (detail.receive_sub_detail = []));
          stateDispatch({
            type: "CHANGE_HEAD_VALUE",
            payload: { ...data, receive_detail: sortData(details) },
          });

          // setLoading(false);
        });
    }
    setTimeout(() => setLoading(false), 800);
  };

  const saveForm = async (data, po_id) => {
    console.log("save Data", data);
    state.po_id === data.po_id
      ? stateDispatch({ type: "CHANGE_HEAD_VALUE", payload: data })
      : getDetail(data, po_id);
  };

  const contextValue = useMemo(() => {
    return {
      readOnly,
      mainState: state,
      initialStateHead,
      saveForm,
      loading,
    };
  }, [readOnly, state, initialStateHead, saveForm, loading]);
  console.log("Receive State", state);
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
                  {state.receive_pd_no && "#" + state.receive_pd_no}
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
            <ReceiveHead
              initialStateHead={initialStateHead}
              mainState={state}
              saveForm={saveForm}
              readOnly={readOnly}
            />
            {loading ? (
              <DetailLoading loading={loading} />
            ) : (
              <ReceiveTabs
                mainState={state}
                remarkFields={remarkFields}
                saveForm={saveForm}
                readOnly={readOnly}
              />
            )}
          </>
        </div>
        <Comments data={dataComments} />
      </ReceiveContext.Provider>
    </MainLayout>
  );
};

export default React.memo(ReceivePDCreate);
