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
  mrpRequireFields,
  mrpRoutingRequireFields,
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
import MRPHead from "./MRPHead";
import {
  sortData,
  validateFormDetail,
  validateFormHead,
} from "../../../include/js/function_main";
import { MRPContext } from "../../../include/js/context";
import moment from "moment";
import MainLayoutLoading from "../../../components/MainLayoutLoading";
import DetailLoading from "../../../components/DetailLoading";
import { mainReducer } from "../../../include/reducer";
import { CalculatorOutlined } from "@ant-design/icons";
import { getAllMachine } from "../../../actions/production/machineActions";

const { Text } = Typography;
const initialState = {
  ...mrpFields,
  mrp_qty_produce_ref: 0, // bulk production
  mrp_qty_produce_ref_used: 1, //ไม่ใช้ Bulk ในสต็อก
  mrp_qty_produce_ref_before: 0, //ยอดผลิต Bulk ไม่รวมหักสต็อก
  mrp_qty_produce_ref_stock: 0, //ยอด Bulk ค้างสต็อก
  item_qty_produce_bulk_request: 0, //ยอด Bulk แบบกำหนดเองให้คำนวณ RM ใหม่
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
    dispatch(getAllMachine());
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
      so_detail_id,
      calRPM,
      mrp_qty_produce_ref_used,
      item_qty_produce_bulk_request = 0,
      type_id,
    } = state;

    const getMaterial = async () => {
      setLoading({
        ...loading,
        detailLoading: true,
      });
      console.log(
        "getMaterial",
        `
          type_id : ${type_id}
          so_id : ${so_id}
          so_detail_id : ${so_detail_id}
          item_id : ${item_id}
          qty_to_produce : ${mrp_qty_produce}
          ref_used : ${mrp_qty_produce_ref_used}
          qty_bulk_to_produce : ${item_qty_produce_bulk_request}
        `
      );

      if ([3, 4].includes(type_id)) {
        console.log("CASE CALCULATE TYPE ", type_id);
        await getFGMaterialList(
          so_id,
          item_id,
          mrp_qty_produce,
          so_detail_id,
          mrp_qty_produce_ref_used,
          item_qty_produce_bulk_request
        )
          .then((res) => {
            const materialDetail = res.data[0];
            console.log("getRPMDetail materialDetail", materialDetail);
            stateDispatch({
              type: "SET_DATA_OBJECT",
              payload: materialDetail
                ? {
                    ...state,
                    ...materialDetail,
                    user_name: auth.user_name,
                    branch_id: auth.branch_id,
                    tg_trans_status_id: 1,
                    uom_no: materialDetail?.uom_no,
                    rm_detail:
                      sortData(materialDetail?.item_formula ?? []) ?? [],
                    pk_detail:
                      sortData(materialDetail?.item_packaging ?? []) ?? [],
                    item_formula: null,
                    calRPM: false,
                    mrp_routing: {
                      bulk: sortData(
                        materialDetail.mrp_routing.filter(
                          (obj) => obj.routing_detail_type_id === 1
                        )
                      ),
                      fg: sortData(
                        materialDetail.mrp_routing.filter(
                          (obj) => obj.routing_detail_type_id === 2
                        )
                      ),
                    },
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
      } else if ([5].includes(type_id)) {
        console.log("CASE CALCULATE TYPE ", type_id);
        setLoading({
          ...loading,
          detailLoading: false,
        });
      } else {
        console.log("CASE CALCULATE TYPE ", type_id);
        setLoading({
          ...loading,
          detailLoading: false,
        });
      }
    };

    so_id && so_detail_id && calRPM
      ? getMaterial()
      : setLoading({
          ...loading,
          detailLoading: false,
        });
  }, [state]);

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
    projectId: 10,
    title: "PRODUCTION",
    home: "/production",
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
    disabledSaveBtn: state?.calRPM,
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
      if (
        state?.type_id === 4 &&
        (!state?.mrp_routing?.fg?.length || !state?.mrp_routing?.bulk?.length)
      ) {
        message.warning("Please Check Routing. Missing Bulk or FG Routing.", 6);
        return false;
      }
      if (state?.type_id === 3 && !state?.mrp_routing?.bulk?.length) {
        message.warning("Please Check Routing. Missing Bulk Routing.", 6);
        return false;
      }

      if (
        state.rm_detail.some(
          (obj) =>
            obj.auto_genarate_item === 0 || obj.auto_genarate_item === undefined
        )
      ) {
        message.error({
          content:
            "Some vendor of Raw Material item not available. Please contact Purchasing Department.",
          duration: 4,
          key: "alert_rm",
        });
        return false;
      }

      if (
        state.pk_detail.some(
          (obj) =>
            obj.auto_genarate_item === 0 || obj.auto_genarate_item === undefined
        )
      ) {
        message.error({
          content:
            "Some vendor of Package Material item not available. Please contact Purchasing Department",
          duration: 4,
          key: "alert_pk",
        });
        return false;
      }
      const mrpRoutingDetail = state.mrp_routing.bulk.concat(
        state.mrp_routing.fg
      );
      const validate = validateFormHead(state, mrpRequireFields);
      const validateRouting = validateFormDetail(
        mrpRoutingDetail,
        mrpRoutingRequireFields
      );

      if (validate.validate) {
        if (!validateRouting.validate) {
          message.error({
            content: <span>Please check your routing form.</span>,
            duration: 4,
            key: "alert_validate",
          });
          return false;
        }
        if (state.calRPM === true) {
          message.error({
            content: (
              <span>
                Please click
                <CalculatorOutlined
                  className="button-icon pd-left-1 pd-right-1"
                  style={{ fontSize: 20 }}
                />
                icon to calculate RPM before save.
              </span>
            ),
            duration: 4,
            key: "alert_cal_rpm",
          });
          return false;
        }
        const saveData = {
          data_head: [
            {
              ...state,
              mrp_routing: sortData(
                state.mrp_routing.bulk.concat(state.mrp_routing.fg)
              ),
              mrp_detail: sortData(state.pk_detail.concat(state.rm_detail)),
              pk_detail: null,
              rm_detail: null,
              item_formula: null,
              item_packaging: null,
            },
          ],
          // data_material: sortData(state.rm_detail.concat(state.pk_detail)),
        };
        state.mrp_id
          ? updateMRP(state.mrp_id, saveData, auth.user_name, redirect_to_view)
          : createMRP(saveData, auth.user_name, redirect_to_view);
      } else {
        message.error({
          content: <span>Please fill your form completely</span>,
          duration: 4,
          key: "alert_validate",
        });
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
  console.log("MRPCreate state : ", state);
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
