import React, { useEffect, useMemo, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Input,
  Tabs,
  Typography,
  DatePicker,
  Radio,
  TimePicker,
  InputNumber,
} from "antd";
import MainLayout from "../../../components/MainLayout";
import moment from "moment";
import Comments from "../../../components/Comments";
import { reducer } from "../reducers";
import CustomSelect from "../../../components/CustomSelect";
import { get_log_by_id } from "../../../actions/comment&log";
import {
  work_center_detail_fields,
  work_center_fields,
} from "../config/master_data";
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
// import WorkCenterDetail from "./WorkCenterDetail";
const { Text } = Typography;
const { TextArea } = Input;

const initialStateHead = workOrderFields;
const initialStateRM = [workOrderRMDetailFields];
const initialStatePK = [workOrderPKDetailFields];
export const WOContext = React.createContext();

const WorkOrderCreate = (props) => {
  const history = useHistory();
  const authorize = Authorize();
  authorize.check_authorize();
  const dispatch = useDispatch();
  const data_so_ref = useSelector(
    (state) => state.production.operations.workOrder.workOrder.data_so_ref
  );
  const data =
    props.location && props.location.state ? props.location.state : 0;
  const auth = useSelector((state) => state.auth.authData);
  const current_project = useSelector((state) => state.auth.currentProject);
  const dataComments = useSelector((state) => state.log.comment_log);
  const [data_head, headDispatch] = useReducer(reducer, initialStateHead);
  const [data_rm_detail, rmDetailDispatch] = useReducer(
    reducer,
    initialStateRM
  );
  const [data_pk_detail, pkDetailDispatch] = useReducer(
    reducer,
    initialStatePK
  );

  const flow =
    data_head &&
    data_head.data_flow_process &&
    data_head.data_flow_process.map((step) => {
      return step.all_group_in_node;
    });

  const callback = (key) => {};

  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: [
      "Home",
      "Operations",
      "Work Order",
      data_head.work_order_no ? "Edit" : "Create",
      data_head.work_order_no && data_head.work_order_no,
    ],
    search: false,
    buttonAction: ["Save", "Discard"],
    step: {
      current: data_head && data_head.node_stay - 1,
      step: flow,
      process_complete: data_head.process_complete,
    },
    create: "",
    save: "function",
    discard: "/production/operations/wo",
    onSave: (e) => {
      //e.preventDefault();
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
    // GET LOG
    data_head.process_id && dispatch(get_log_by_id(data_head.process_id));
  }, [data_head]);

  const upDateFormValue = (data) => {
    headDispatch({ type: "CHANGE_HEAD_VALUE", payload: data });
  };

  const redirect_to_view = (id) => {
    history.push("/production/work_center/view/" + (id ? id : "new"));
  };
  useEffect(() => {
    dispatch(getAllItems());
    dispatch(getSOReference());
  }, []);

  const contextValue = useMemo(() => {
    return { data_head, upDateFormValue };
  }, [data_head, upDateFormValue]);
  console.log("WorkOrderCreate");
  return (
    <MainLayout {...config}>
      <div id="form">
        <Row className="col-2">
          <Col span={8}>
            <h2>
              <strong>
                {data_head.work_order_id ? "Edit" : "Create"} Work Order{" "}
                {data_head.work_order_no && "#" + data_head.work_order_no}
              </strong>
            </h2>
          </Col>
          <Col span={12}></Col>
          <Col span={2}>
            <Text strong>Create Date :</Text>
          </Col>
          <Col span={2} style={{ textAlign: "right" }}>
            <Text className="text-view">{data_head.work_order_created}</Text>
          </Col>
        </Row>
        <Row className="col-2">
          <Col span={24}>
            <h3>
              <strong>
                <span className="require">* </span>Description / Job Name.
              </strong>
            </h3>
            <Col span={24}>
              <Input
                name="work_center_description"
                required
                placeholder={"Description / Job Name."}
                onChange={(e) =>
                  upDateFormValue({ work_center_description: e.target.value })
                }
                value={data_head.work_center_description}
              />
            </Col>
            <Row className="col-2 mt-2" gutter={[32, 0]}>
              <Col span={12}>
                <Row className="col-2 row-margin-vertical">
                  <Col span={6}>
                    <Text strong>
                      <span className="require">* </span>SO Document :
                    </Text>
                  </Col>
                  <Col span={18}>
                    {/* data_so_ref */}
                    <CustomSelect
                      allowClear
                      showSearch
                      // size={"small"}
                      placeholder={"SO Document"}
                      name="so_id"
                      field_id="so_id"
                      field_name="so_no"
                      value={data_head.so_no}
                      data={data_so_ref ?? []}
                      onChange={(data, option) => {
                        data && data
                          ? upDateFormValue({
                              so_id: option.data.so_id,
                              so_no: option.data.so_no,
                              so_detail: option.data.so_detail,
                              item_id: null,
                              item_no_name: null,
                              wo_delivery_date: null,
                              wo_qty: 0,
                              uom_id: null,
                              uom_no: null,
                            })
                          : upDateFormValue({
                              so_id: null,
                              so_no: null,
                              so_detail: null,
                              item_id: null,
                              item_no_name: null,
                              wo_delivery_date: null,
                              wo_qty: 0,
                              uom_id: null,
                              uom_no: null,
                            });
                      }}
                    />
                  </Col>
                </Row>
                <Row className="col-2 row-margin-vertical">
                  <Col span={6}>
                    <Text strong className="pd-left-1">
                      Due Date :
                    </Text>
                  </Col>
                  <Col span={18}>
                    <Text className="text-view">
                      {data_head.wo_delivery_date ?? "DD/MM/YYYY"}
                    </Text>
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <Row className="col-2 row-margin-vertical">
                  <Col span={6}>
                    <Text strong>
                      <span className="require">* </span>FG Item :
                    </Text>
                  </Col>
                  <Col span={18}>
                    <CustomSelect
                      allowClear
                      showSearch
                      // size={"small"}
                      placeholder={"SO Document"}
                      name="item_id"
                      field_id="item_id"
                      field_name="item_no_name"
                      value={data_head.item_no_name}
                      data={data_head.so_detail ?? []}
                      onChange={(data, option) => {
                        data && data
                          ? upDateFormValue({
                              item_id: option.data.item_id,
                              item_no_name: option.data.item_no_name,
                              wo_delivery_date:
                                option.data.so_detail_delivery_date,
                              wo_qty: option.data.so_detail_qty,
                              uom_id: option.data.uom_id,
                              uom_no: option.data.uom_no,
                            })
                          : upDateFormValue({
                              item_id: null,
                              item_no_name: null,
                              wo_delivery_date: null,
                              wo_qty: 0,
                              uom_id: null,
                              uom_no: null,
                            });
                      }}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <WOContext.Provider value={contextValue}>
          <WorkOrderTabPanel
            readOnly={false}
            data_rm_detail={data_rm_detail}
            rmDetailDispatch={rmDetailDispatch}
            data_pk_detail={data_pk_detail}
            pkDetailDispatch={pkDetailDispatch}
          />
        </WOContext.Provider>
      </div>
      <Comments data={dataComments} />
    </MainLayout>
  );
};

export default WorkOrderCreate;
