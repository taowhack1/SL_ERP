/** @format */

import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Typography, message } from "antd";
import MainLayout from "../../../components/MainLayout";
import Comments from "../../../components/Comments";

import { get_log_by_id } from "../../../actions/comment&log";
import Authorize from "../../system/Authorize";
import { useHistory } from "react-router-dom";
import WorkOrderTabPanel from "./WorkOrderTabPanel";
import {
  workOrderFields,
  workOrderPKDetailFields,
  workOrderRequireFields,
  workOrderRMDetailFields,
} from "../config/workOrder";
import {
  getAllItems,
  getFGMaterialList,
} from "../../../actions/inventory/itemActions";
import {
  createWorkOrder,
  getSOReference,
  updateWorkOrder,
} from "../../../actions/production/workOrderActions";
import ReducerClass from "../../../include/js/ReducerClass";
import WorkOrderHead from "./WorkOrderHead";
import { sortData, validateFormHead } from "../../../include/js/function_main";
import { WOContext } from "../../../include/js/context";
import moment from "moment";
import { clearStateItems } from "../../../actions/inventory";
// import WorkCenterDetail from "./WorkCenterDetail";
const { Text } = Typography;

const WorkOrderCreate = (props) => {
  const data =
    props.location && props.location.state ? props.location.state : 0;

  const headReducer = new ReducerClass(data.data_head, null, workOrderFields);
  const RMReducer = new ReducerClass(
    data.data_rm,
    null,
    workOrderPKDetailFields
  );
  const PKReducer = new ReducerClass(
    data.data_pk,
    null,
    workOrderRMDetailFields
  );
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
    dispatch(getSOReference());

    headReducer.setDataObject({
      ...(data.data_head ?? workOrderFields),
      commit: 1,
      user_name: auth.user_name,
    });
    RMReducer.setDataArray(data.data_rm ?? workOrderPKDetailFields);
    PKReducer.setDataArray(data.data_pk ?? workOrderRMDetailFields);
  }, []);

  useEffect(() => {
    const {
      so_id,
      item_id,
      wo_qty_produce,
      wo_qty_percent_spare_rm,
      wo_qty_percent_spare_pk,
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
                wo_qty_produce,
                wo_qty_percent_spare_rm,
                wo_qty_percent_spare_pk
              )
            : [];
        console.log("materialDetail", materialDetail);
        RMReducer.setDataArray((await materialDetail.item_formula) ?? []);
        PKReducer.setDataArray((await materialDetail.item_packaging) ?? []);
        headReducer.onChangeHeadValue({
          wo_lead_time_day_pk: materialDetail.wo_lead_time_day_pk ?? 0,
          wo_lead_time_day_pk_qa: materialDetail.wo_lead_time_day_pk_qa ?? 0,
          wo_lead_time_day_rm: materialDetail.wo_lead_time_day_rm ?? 0,
          wo_lead_time_day_rm_qa: materialDetail.wo_lead_time_day_rm_qa ?? 0,
          wo_qty_produce_ref: materialDetail.item_qty_produce_ref ?? 0,
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
    headReducer.data.wo_qty_produce,
    headReducer.data.wo_qty_percent_spare_rm,
    headReducer.data.wo_qty_percent_spare_pk,
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
      headReducer.data.wo_no ? "Edit" : "Create",
      headReducer.data.wo_no && headReducer.data.wo_no,
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
    discard: "/production/operations/wo",
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
      const validate = validateFormHead(
        headReducer.data,
        workOrderRequireFields
      );
      console.log(validate);
      if (validate.validate) {
        const saveData = {
          data_head: headReducer.data,
          data_material: sortData(RMReducer.data.concat(PKReducer.data)),
        };
        headReducer.data.wo_id
          ? dispatch(
              updateWorkOrder(
                headReducer.data.wo_id,
                saveData,
                auth.user_name,
                redirect_to_view
              )
            )
          : dispatch(
              createWorkOrder(saveData, auth.user_name, redirect_to_view)
            );
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
  }, [readOnly, headReducer, RMReducer, PKReducer]);
  return (
    <WOContext.Provider value={headContextValue}>
      <MainLayout {...config}>
        <div id="form">
          <Row className="col-2">
            <Col span={8}>
              <h2>
                <strong>
                  {headReducer.data.wo_id ? "Edit" : "Create"} MRP
                  {headReducer.data.wo_no && " #" + headReducer.data.wo_no}
                </strong>
              </h2>
            </Col>
            <Col span={12}></Col>
            <Col span={2}>
              <Text strong>Create Date :</Text>
            </Col>
            <Col span={2} style={{ textAlign: "right" }}>
              <Text className="text-view">
                {headReducer.data.wo_created ?? moment().format("DD/MM/YYYY")}
              </Text>
            </Col>
          </Row>
          <WorkOrderHead />
          <WorkOrderTabPanel />
        </div>
        <Comments data={dataComments} />
      </MainLayout>
    </WOContext.Provider>
  );
};

export default React.memo(WorkOrderCreate);
