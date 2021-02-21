import React, { useEffect, useMemo, useReducer, useState } from "react";
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
};
const MRPCreate = (props) => {
  const data =
    props.location && props.location.state ? props.location.state : 0;
  const [loading, setLoading] = useState(true);
  const [state, stateDispatch] = useReducer(mainReducer, initialState);
  const headReducer = new ReducerClass(data.data_head, null, mrpFields);
  const RMReducer = new ReducerClass(data.data_rm, null, mrpPKDetailFields);
  const PKReducer = new ReducerClass(data.data_pk, null, mrpRMDetailFields);
  headReducer.setReducer("object");
  RMReducer.setReducer("array");
  PKReducer.setReducer("array");

  const readOnly = false;
  const authorize = Authorize();
  const history = useHistory();
  const dispatch = useDispatch();
  authorize.check_authorize();
  const auth = useSelector((state) => state.auth.authData);
  const current_project = useSelector((state) => state.auth.currentProject);
  const dataComments = useSelector((state) => state.log.comment_log);

  useEffect(() => {
    dispatch(getAllItems());
    dispatch(getSOReference());

    headReducer.setDataObject({
      ...(data.data_head ?? mrpFields),
      commit: 1,
      user_name: auth.user_name,
    });
    RMReducer.setDataArray(data.data_rm ?? mrpPKDetailFields);
    PKReducer.setDataArray(data.data_pk ?? mrpRMDetailFields);
  }, []);

  useEffect(() => {
    const {
      so_id,
      item_id,
      mrp_qty_produce,
      mrp_qty_percent_spare_rm,
      mrp_qty_percent_spare_pk,
      so_detail_id,
    } = headReducer.data;
    console.log("useEffect change so_id", headReducer.data);
    const getMaterial = async () => {
      try {
        const materialDetail =
          so_id && so_detail_id
            ? await getFGMaterialList(
                so_id,
                item_id,
                mrp_qty_produce,
                mrp_qty_percent_spare_rm,
                mrp_qty_percent_spare_pk
              )
            : [];
        console.log("materialDetail", materialDetail);
        RMReducer.setDataArray((await materialDetail.item_formula) ?? []);
        PKReducer.setDataArray((await materialDetail.item_packaging) ?? []);
        headReducer.onChangeHeadValue({
          mrp_lead_time_day_pk: materialDetail.mrp_lead_time_day_pk ?? 0,
          mrp_lead_time_day_pk_qa: materialDetail.mrp_lead_time_day_pk_qa ?? 0,
          mrp_lead_time_day_rm: materialDetail.mrp_lead_time_day_rm ?? 0,
          mrp_lead_time_day_rm_qa: materialDetail.mrp_lead_time_day_rm_qa ?? 0,
          mrp_qty_produce_ref: materialDetail.item_qty_produce_ref ?? 0,
          branch_id: auth.branch_id,
          item_id_ref: materialDetail.item_id_ref,
          item_qty_produce_ref: materialDetail.item_qty_produce_ref ?? 0,
          user_name: auth.user_name,
          tg_trans_status_id: 1,
          uom_no: materialDetail.uom_no,
        });
      } catch (error) {
        console.log(error);
      }
    };
    // so_id && so_detail_id && getMaterial();
    getMaterial();
  }, [
    headReducer.data.so_detail_id,
    headReducer.data.mrp_qty_produce,
    headReducer.data.mrp_qty_percent_spare_rm,
    headReducer.data.mrp_qty_percent_spare_pk,
  ]);
  useEffect(() => {
    // GET LOG
    headReducer.data.process_id &&
      dispatch(get_log_by_id(headReducer.data.process_id));
  }, [headReducer.data]);

  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: [
      "Home",
      "Operations",
      "MRP",
      headReducer.data.mrp_no ? "Edit" : "Create",
      headReducer.data.mrp_no && headReducer.data.mrp_no,
    ],
    search: false,
    buttonAction: ["Save", "Discard"],
    step: {
      current: headReducer.data && headReducer.data.node_stay - 1,
      step: headReducer.getFlow(),
      process_complete: headReducer.data.process_complete,
    },
    create: "",
    save: "function",
    discard: "/production/operations/mrp",
    onSave: (e) => {
      //e.preventDefault();
      console.log("Save");
      console.log("HEAD DATA : ", headReducer.data);
      console.log("RM DATA : ", RMReducer.data);
      console.log("PK DATA : ", PKReducer.data);
      if (RMReducer.data.some((obj) => obj.auto_genarate_item === 0)) {
        message.error({
          content: "Can't Save !!. Some vendor of RM item not available.",
          duration: 4,
          key: "validate",
        });
        return false;
      }
      if (PKReducer.data.some((obj) => obj.auto_genarate_item === 0)) {
        message.error({
          content: "Can't Save !!. Some vendor of RM item not available.",
          duration: 4,
          key: "validate",
        });
        return false;
      }
      const validate = validateFormHead(headReducer.data, mrpRequireFields);
      console.log(validate);
      if (validate.validate) {
        const saveData = {
          data_head: headReducer.data,
          data_material: sortData(RMReducer.data.concat(PKReducer.data)),
        };
        headReducer.data.mrp_id
          ? dispatch(
              updateMRP(
                headReducer.data.mrp_id,
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

  const headContextValue = useMemo(() => {
    return {
      readOnly,
      headReducer,
      RMReducer,
      PKReducer,
      so_id: headReducer.data.so_id,
      so_detail_id: headReducer.data.so_detail_id,
    };
  }, [readOnly, headReducer, RMReducer.data, PKReducer.data]);
  console.log("MRPCreate", data);
  console.log(RMReducer.data);
  console.log(PKReducer.data);
  return (
    <MRPContext.Provider value={headContextValue}>
      {/* {loading ? (
        <MainLayoutLoading>
          <DetailLoading />
        </MainLayoutLoading>
      ) : ( */}
      <MainLayout {...config}>
        <div id="form">
          <Row className="col-2">
            <Col span={8}>
              <h2>
                <strong>
                  {headReducer.data.mrp_id ? "Edit" : "Create"} MRP
                  {headReducer.data.mrp_no && " #" + headReducer.data.mrp_no}
                </strong>
              </h2>
            </Col>
            <Col span={12}></Col>
            <Col span={2}>
              <Text strong>Create Date :</Text>
            </Col>
            <Col span={2} style={{ textAlign: "right" }}>
              <Text className="text-view">
                {headReducer.data.mrp_created ?? moment().format("DD/MM/YYYY")}
              </Text>
            </Col>
          </Row>
          <MRPHead />
          <MRPTabPanel />
        </div>
        <Comments data={dataComments} />
      </MainLayout>
      {/* )} */}
    </MRPContext.Provider>
  );
};

export default React.memo(MRPCreate);
