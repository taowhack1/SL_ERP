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
import { getAllItems } from "../../../actions/inventory/itemActions";
import { getSOReference } from "../../../actions/production/workOrderActions";
import ReducerClass from "../../../include/js/ReducerClass";
import WorkOrderHead from "./WorkOrderHead";
// import WorkCenterDetail from "./WorkCenterDetail";
const { Text } = Typography;
const { TextArea } = Input;

export const WOContext = React.createContext();
export const RMContext = React.createContext();
export const PKContext = React.createContext();
const headReducer = new ReducerClass(null, null, workOrderFields);
const RMReducer = new ReducerClass(null, null, workOrderRMDetailFields);
const PKReducer = new ReducerClass(null, null, workOrderPKDetailFields);

const WorkOrderCreate = (props) => {
  const readOnly = false;
  const authorize = Authorize();
  const history = useHistory();
  const dispatch = useDispatch();
  authorize.check_authorize();
  const auth = useSelector((state) => state.auth.authData);
  const current_project = useSelector((state) => state.auth.currentProject);
  const dataComments = useSelector((state) => state.log.comment_log);
  const data_so_ref = useSelector(
    (state) => state.production.operations.workOrder.workOrder.data_so_ref
  );

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
      headReducer.data.work_order_no ? "Edit" : "Create",
      headReducer.data.work_order_no && headReducer.data.work_order_no,
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

  useEffect(() => {
    dispatch(getAllItems());
    dispatch(getSOReference());
  }, []);

  useEffect(() => {
    // GET LOG
    headReducer.data.process_id &&
      dispatch(get_log_by_id(headReducer.data.process_id));
  }, [headReducer.data]);

  const redirect_to_view = (id) => {
    history.push("/production/work_center/view/" + (id ? id : "new"));
  };

  const headContextValue = useMemo(() => {
    console.log("headContextValue");
    return {
      readOnly,
      headReducer,
      RMReducer,
      PKReducer,
    };
  }, [readOnly, headReducer, RMReducer, PKReducer]);
  headReducer.setReducer("object");
  console.log("WorkOrderCreate Render...");
  return (
    <MainLayout {...config}>
      <div id="form">
        <Row className="col-2">
          <Col span={8}>
            <h2>
              <strong>
                {headReducer.data.work_order_id ? "Edit" : "Create"} Work Order
                {headReducer.data.work_order_no &&
                  "#" + headReducer.data.work_order_no}
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
        <WOContext.Provider value={headContextValue}>
          <WorkOrderHead />
          <WorkOrderTabPanel />
        </WOContext.Provider>
      </div>
      <Comments data={dataComments} />
    </MainLayout>
  );
};

export default React.memo(WorkOrderCreate);
