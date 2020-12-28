import React, { useEffect, useMemo, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Input, Typography } from "antd";
import MainLayout from "../../../components/MainLayout";
import Comments from "../../../components/Comments";
import CustomSelect from "../../../components/CustomSelect";
import { get_log_by_id } from "../../../actions/comment&log";
import Authorize from "../../system/Authorize";
import { useHistory } from "react-router-dom";
import WorkOrderTabPanel from "./WorkOrderTabPanel";
import {
  workOrderFields,
  workOrderPKDetailFields,
  workOrderRMDetailFields,
} from "../config/workOrder";
import {
  getAllItems,
  getFGMaterialList,
} from "../../../actions/inventory/itemActions";
import { getSOReference } from "../../../actions/production/workOrderActions";
import ReducerClass from "../../../include/js/ReducerClass";
import WorkOrderHead from "./WorkOrderHead";
import { speadArray2DTo1D } from "../../../include/js/function_main";
// import WorkCenterDetail from "./WorkCenterDetail";
const { Text } = Typography;
const { TextArea } = Input;

export const WOContext = React.createContext();

const WorkOrderCreate = (props) => {
  const headReducer = new ReducerClass(null, null, workOrderFields);
  const RMReducer = new ReducerClass(null, null, workOrderRMDetailFields);
  const PKReducer = new ReducerClass(null, null, workOrderPKDetailFields);
  headReducer.setReducer("object");
  RMReducer.setReducer("array");

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
  }, []);
  useEffect(() => {
    const { so_id, item_id, wo_qty } = headReducer.data;

    const getMaterial = async () => {
      const materialDetail = await getFGMaterialList(so_id, item_id, wo_qty);
      console.log(materialDetail);
      RMReducer.setDataArray(await materialDetail.item_formula);
      headReducer.onChangeHeadValue({
        wo_qty_produce: materialDetail.item_qty_produce,
        wo_qty_produce_ref: materialDetail.item_qty_produce_ref,
        branch_id: auth.branch_id,
        item_id_ref: materialDetail.item_id_ref,
        user_name: auth.user_name,
        wo_qty_spare: 0,
        tg_trans_status_id: 1,
        uom_no: materialDetail.uom_no,
      });
    };
    so_id && item_id && getMaterial();
  }, [headReducer.data.item_id]);
  useEffect(() => {
    // GET LOG
    readOnly !== false &&
      headReducer.data.process_id &&
      dispatch(get_log_by_id(headReducer.data.process_id));
  }, [headReducer.data]);

  const data =
    props.location && props.location.state ? props.location.state : 0;

  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: [
      "Home",
      "Operations",
      "Work Order",
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
      console.log("HEAD DATA : ", headReducer.data);
      console.log("RM DATA : ", RMReducer.data);
      console.log("PK DATA : ", PKReducer.data);
      console.log("Save");
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
    history.push("/production/work_center/view/" + (id ? id : "new"));
  };

  const headContextValue = useMemo(() => {
    return {
      readOnly,
      headReducer,
      RMReducer,
      PKReducer,
    };
  }, [readOnly, headReducer, RMReducer.data, PKReducer]);
  console.log("WorkOrderCreate Render...");
  return (
    <WOContext.Provider value={headContextValue}>
      <MainLayout {...config}>
        <div id="form">
          <Row className="col-2">
            <Col span={8}>
              <h2>
                <strong>
                  {headReducer.data.work_order_id ? "Edit" : "Create"} Work
                  Order
                  {headReducer.data.wo_no && "#" + headReducer.data.wo_no}
                </strong>
              </h2>
            </Col>
            <Col span={12}></Col>
            <Col span={2}>
              <Text strong>Create Date :</Text>
            </Col>
            <Col span={2} style={{ textAlign: "right" }}>
              <Text className="text-view">
                {headReducer.data.work_order_created}
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
