import React, { useEffect, useReduce, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Row, Col, Typography, message } from "antd";
import { reducer } from "../../reducers";
import {
  receive_fields,
  receive_detail_fields,
  receive_require_fields,
} from "../../config/receiveConfig";
import {
  create_receive,
  get_po_receive_list,
  update_receive,
} from "../../../../actions/inventory/receiveActions";
import { header_config } from "../../../../include/js/main_config";
import { api_receive_get_ref_po_detail } from "../../../../include/js/api";
import { get_log_by_id, reset_comments } from "../../../../actions/comment&log";

import MainLayout from "../../../../components/MainLayout";
import moment from "moment";
import Comments from "../../../../components/Comments";

import axios from "axios";
import Authorize from "../../../system/Authorize";
import { validateFormHead } from "../../../../include/js/function_main";
import ReceiveHead from "./ReceiveHead";
import ReceiveTabs from "./ReceiveTabs";

const { Text } = Typography;

const initialStateHead = receive_fields;
const readOnly = false;
const Receive_Create = (props) => {
  const history = useHistory();
  const authorize = Authorize();
  authorize.check_authorize();
  const dispatch = useDispatch();
  const [state, stateDispatch] = useReducer(reducer, initialStateHead);
  const [loading, setLoading] = useState(false);
  const auth = useSelector((state) => state.auth.authData);
  const dataComments = useSelector((state) => state.log.comment_log);
  const current_project = useSelector((state) => state.auth.currentProject);

  const flow =
    state &&
    state.data_flow_process &&
    state.data_flow_process.map((step) => {
      return step.all_group_in_node;
    });

  const data =
    props.location && props.location.state ? props.location.state : 0;

  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: [
      "Home",
      "Inventory",
      "Receive",
      state.receive_no ? "Edit" : "Create",
      state.receive_no && state.receive_no,
    ],
    search: false,
    buttonAction: ["Save", "Validate", "Discard"],
    step: {
      current: state && state.node_stay - 1,
      step: flow,
      process_complete: state.process_complete,
    },
    create: "",
    save: "function",
    discard: "/inventory/receive",
    onSave: (e) => {
      console.log("Save");
      const key = "validate";
      console.log(state);
      // const validate = validateFormHead(state, receive_require_fields);
      // if (validate.validate) {
      //   console.log("pass");
      //   state.receive_id
      //     ? dispatch(
      //         update_receive(
      //           state.receive_id,
      //           auth.user_name,
      //           state,
      //           data_detail,
      //           redirect_to_view
      //         )
      //       )
      //     : dispatch(
      //         create_receive(
      //           auth.user_name,
      //           state,
      //           data_detail,
      //           redirect_to_view
      //         )
      //       );
      // } else {
      //   message.warning({
      //     content: "Please fill your form completely.",
      //     key,
      //     duration: 2,
      //   });
      // }
    },
    onEdit: (e) => {
      console.log("Edit");
    },
    onApprove: (e) => {
      console.log("Approve");
    },
    onConfirm: () => {
      console.log("Confirm");
    },
  };

  useEffect(() => {
    dispatch(get_po_receive_list());
    stateDispatch({
      type: "SET_HEAD",
      payload: data.state
        ? {
            ...data.state,
            commit: 1,
            user_name: auth.user_name,
            branch_id: auth.branch_id,
            branch_name: auth.branch_name,
          }
        : {
            ...receive_fields,
            commit: 1,
            user_name: auth.user_name,
            branch_id: auth.branch_id,
            branch_name: auth.branch_name,
            receive_created: moment().format("DD/MM/YYYY"),
          },
    });
  }, []);

  const getDetail = async (data, po_id) => {
    setLoading(true);
    console.log("getDetail");
    await axios
      .get(`${api_receive_get_ref_po_detail}/${po_id}`, header_config)
      .then((res) => {
        const details = res.data[0];
        details.map((detail) => (detail.receive_sub_detail = []));
        stateDispatch({
          type: "CHANGE_HEAD_VALUE",
          payload: { ...data, receive_detail: details },
        });
        setLoading(false);
      });
  };
  const saveForm = async (data, po_id) => {
    console.log("save Data", data);
    if (po_id) {
      console.log("have po_id");
      state.po_id === data.po_id
        ? stateDispatch({ type: "CHANGE_HEAD_VALUE", payload: data })
        : getDetail(data, po_id);
    } else {
      console.log("else po_id");
      stateDispatch({ type: "CHANGE_HEAD_VALUE", payload: data });
    }
  };

  const redirect_to_view = (id) => {
    history.push("/inventory/receive/view/" + (id ? id : "new"));
  };

  const remarkFields = {
    name: "receive_remark",
    value: state.receive_remark,
    placeholder: "Remark",
  };

  useEffect(() => {
    // GET LOG
    state.process_id && dispatch(get_log_by_id(state.process_id));
    return () => {
      dispatch(reset_comments());
    };
  }, [state.tg_trans_status_id]);
  console.log("Receive Create", state);
  return (
    <MainLayout {...config}>
      <div id="form">
        <Row className="col-2">
          <Col span={8}>
            <h2>
              <strong>
                {state.receive_no ? "Edit" : "Create"} {"Receive "}
                {state.receive_no && "#" + state.receive_no}
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
        {!loading && (
          <>
            <ReceiveHead
              mainState={state}
              saveForm={saveForm}
              readOnly={readOnly}
            />
            <ReceiveTabs
              state={state}
              remarkFields={remarkFields}
              saveForm={saveForm}
              readOnly={readOnly}
            />
          </>
        )}
      </div>
      <Comments data={dataComments} />
    </MainLayout>
  );
};

export default Receive_Create;
