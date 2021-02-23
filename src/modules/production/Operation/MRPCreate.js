import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Typography, message } from "antd";
import MainLayout from "../../../components/MainLayout";
import Comments from "../../../components/Comments";

import { get_log_by_id } from "../../../actions/comment&log";
import Authorize from "../../system/Authorize";
import { useHistory } from "react-router-dom";
import MRPTabPanel from "./MRPTabPanel";
import {
  mrpFields,
  mrpPKDetailFields,
  mrpRequireFields,
  mrpRMDetailFields,
} from "../config/mrp";
import {
  getAllItems,
  getFGMaterialList,
} from "../../../actions/inventory/itemActions";
import {
  createMRP,
  getSOReference,
  updateMRP,
} from "../../../actions/production/mrpActions";
import ReducerClass from "../../../include/js/ReducerClass";
import MRPHead from "./MRPHead";
import { sortData, validateFormHead } from "../../../include/js/function_main";
import { MRPContext } from "../../../include/js/context";
import moment from "moment";
import MainLayoutLoading from "../../../components/MainLayoutLoading";
import DetailLoading from "../../../components/DetailLoading";
import { mainReducer } from "../../../include/reducer";
// import WorkCenterDetail from "./WorkCenterDetail";
const { Text } = Typography;
const initialState = {
  ...mrpFields,
  rm_detail: [],
  pk_detail: [],
  calRPM: false,
};
const MRPCreate = (props) => {
  const data =
    props.location && props.location.state ? props.location.state : 0;
  const readOnly = false;
  const authorize = Authorize();
  const history = useHistory();
  const dispatch = useDispatch();
  authorize.check_authorize();
  const auth = useSelector((state) => state.auth.authData);
  const current_project = useSelector((state) => state.auth.currentProject);
  const dataComments = useSelector((state) => state.log.comment_log);
  const calBtn = useRef();

  const [loading, setLoading] = useState({
    fullPageLoading: false,
    headLoading: false,
    detailLoading: false,
  });
  const [state, stateDispatch] = useReducer(mainReducer, initialState);

  useEffect(() => {
    // First Run App. Set and get data
    setLoading({
      ...loading,
      fullPageLoading: true,
    });
    dispatch(getAllItems());
    dispatch(getSOReference());
    stateDispatch({
      type: "SET_DATA_OBJECT",
      payload: data
        ? {
            ...data,
            commit: 1,
            user_name: auth?.user_name,
            branch_id: auth?.branch_id,
          }
        : initialState,
    });
    setLoading({
      ...loading,
      fullPageLoading: false,
    });
  }, []);

  const getRPMDetail = useCallback(() => {
    // Calculate RM & PK Material
    const {
      so_id,
      item_id,
      mrp_qty_produce,
      mrp_qty_percent_spare_rm,
      mrp_qty_percent_spare_pk,
      so_detail_id,
      calRPM,
    } = state;
    console.log("useEffect change so_id", state);
    const getMaterial = async () => {
      setLoading({
        ...loading,
        detailLoading: true,
      });

      await getFGMaterialList(
        so_id,
        item_id,
        mrp_qty_produce,
        mrp_qty_percent_spare_rm,
        mrp_qty_percent_spare_pk
      )
        .then((res) => {
          const materialDetail = res.data[0];
          console.log("materialDetail", materialDetail);
          stateDispatch({
            type: "SET_DATA_OBJECT",
            payload: materialDetail
              ? {
                  ...state,
                  mrp_lead_time_day_pk:
                    materialDetail?.mrp_lead_time_day_pk ?? 0,
                  mrp_lead_time_day_pk_qa:
                    materialDetail?.mrp_lead_time_day_pk_qa ?? 0,
                  mrp_lead_time_day_rm:
                    materialDetail?.mrp_lead_time_day_rm ?? 0,
                  mrp_lead_time_day_rm_qa:
                    materialDetail?.mrp_lead_time_day_rm_qa ?? 0,
                  mrp_qty_produce_ref:
                    materialDetail?.item_qty_produce_ref ?? 0,
                  branch_id: auth.branch_id,
                  item_id_ref: materialDetail?.item_id_ref,
                  item_qty_produce_ref:
                    materialDetail?.item_qty_produce_ref ?? 0,
                  user_name: auth.user_name,
                  tg_trans_status_id: 1,
                  uom_no: materialDetail?.uom_no,
                  rm_detail: sortData(materialDetail?.item_formula ?? []) ?? [],
                  pk_detail:
                    sortData(materialDetail?.item_packaging ?? []) ?? [],
                  calRPM: false,
                }
              : initialState,
          });
          setTimeout(() => {
            setLoading({
              ...loading,
              detailLoading: false,
            });
            message.success({
              key: "notify2",
              content: "RPM has been updated",
              duration: 3,
            });
          }, [500]);
        })
        .catch((error) => {
          message.error(error);
          setLoading({
            ...loading,
            detailLoading: false,
          });
        });
    };

    so_id && so_detail_id && calRPM
      ? getMaterial()
      : setLoading({
          ...loading,
          detailLoading: false,
        });
  }, [state.calRPM, state.mrp_qty_produce, state.so_detail_id]);

  useEffect(() => {
    // GET LOG
    state.process_id && dispatch(get_log_by_id(state.process_id));
  }, [state]);

  const flow =
    state.data_flow_process &&
    state.data_flow_process.map((step) => {
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
      "MRP",
      state.mrp_no ? "Edit" : "Create",
      state.mrp_no && state.mrp_no,
    ],
    search: false,
    buttonAction: ["Save", "Discard"],
    step: {
      current: state && state.node_stay - 1,
      step: flow,
      process_complete: state.process_complete,
    },
    create: "",
    save: "function",
    discard: "/production/operations/mrp",
    onSave: (e) => {
      //e.preventDefault();
      console.log("Save");
      console.log("HEAD DATA : ", state);
      console.log("RM DATA : ", state.rm_detail);
      console.log("PK DATA : ", state.pk_detail);
      if (state.rm_detail.some((obj) => obj.auto_genarate_item === 0)) {
        message.error({
          content:
            "Some vendor of RM item not available. Please contact Purchasing Department.",
          duration: 4,
          key: "validate",
        });
        return false;
      }
      if (state.pk_detail.some((obj) => obj.auto_genarate_item === 0)) {
        message.error({
          content:
            "Some vendor of RM item not available. Please contact Purchasing Department",
          duration: 4,
          key: "validate",
        });
        return false;
      }
      const validate = validateFormHead(state, mrpRequireFields);
      console.log(validate);
      if (validate.validate) {
        const saveData = {
          data_head: state,
          data_material: sortData(state.rm_detail.concat(state.pk_detail)),
        };
        state.mrp_id
          ? dispatch(
              updateMRP(
                state.mrp_id,
                saveData,
                auth.user_name,
                redirect_to_view
              )
            )
          : dispatch(createMRP(saveData, auth.user_name, redirect_to_view));
      }
    },
    onEdit: (e) => {
      //e.preventDefault();
      console.log("Edit");
    },
    onApprove: (e) => {
      //e.preventDefault();
      console.log("Approve");
    },
    onConfirm: () => {
      console.log("Confirm");
    },
  };

  const redirect_to_view = (id) => {
    history.push("/production/operations/mrp/view/" + (id ? id : "new"));
  };
  const { fullPageLoading, headLoading, detailLoading } = loading;

  const headContextValue = useMemo(() => {
    return {
      readOnly,
      // headReducer,
      // RMReducer,
      calBtn,
      detailLoading,
      getRPMDetail,
      mainState: state,
      mainStateDispatch: stateDispatch,
      initialState,
      so_id: state.so_id,
      so_detail_id: state.so_detail_id,
    };
  }, [readOnly, state, detailLoading]);

  console.log("MRPCreate", state);
  return (
    <MRPContext.Provider value={headContextValue}>
      {fullPageLoading ? (
        <MainLayoutLoading>
          <DetailLoading />
        </MainLayoutLoading>
      ) : (
        <MainLayout {...config}>
          <div id="form">
            <Row className="col-2">
              <Col span={8}>
                <h2>
                  <strong>
                    {state.mrp_id ? "Edit" : "Create"} MRP
                    {state.mrp_no && " #" + state.mrp_no}
                  </strong>
                </h2>
              </Col>
              <Col span={12}></Col>
              <Col span={2}>
                <Text strong>Create Date :</Text>
              </Col>
              <Col span={2} style={{ textAlign: "right" }}>
                <Text className="text-view">
                  {state.mrp_created ?? moment().format("DD/MM/YYYY")}
                </Text>
              </Col>
            </Row>
            <MRPHead />
            {detailLoading ? <DetailLoading /> : <MRPTabPanel />}
          </div>
          <Comments data={dataComments} />
        </MainLayout>
      )}
    </MRPContext.Provider>
  );
};

export default React.memo(MRPCreate);
