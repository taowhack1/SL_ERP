import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";
import { Row, Col, Table } from "antd";
import MainLayout from "../../../components/MainLayout";
import {
  getAllItems,
  get_item_by_id,
} from "../../../actions/inventory/itemActions";
import $ from "jquery";
import Authorize from "../../system/Authorize";
import useKeepLogs from "../../logs/useKeepLogs";
import SearchTable from "../../../components/SearchTable";
import { item_show_columns } from "../../inventory/config/item";
import { work_order_columns } from "../config/workOrder";
import WorkOrderSearchTool from "./WorkOrderSearchTool";
import {
  getAllWorkOrder,
  getWorkOrderByID,
} from "../../../actions/production/workOrderActions";
import { reset_comments } from "../../../actions/comment&log";
const WorkOrderMain = (props) => {
  const dispatch = useDispatch();

  const history = useHistory();
  const keepLog = useKeepLogs();
  const authorize = Authorize();
  authorize.check_authorize();
  const auth = useSelector((state) => state.auth.authData);
  const current_menu = useSelector((state) => state.auth.currentMenu);
  const [rowClick, setRowClick] = useState(false);
  const [loading, setLoading] = useState(false);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const { workOrderList } = useSelector(
    (state) => state.production.operations.workOrder
  );
  const [stateWO, setStateWO] = useState(workOrderList);

  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: ["Home", "Operations", "Work Order"],
    search: false,
    create: "/production/operations/wo/create",
    buttonAction: ["Create"],
    edit: {},
    disabledEditBtn: !rowClick,
    discard: "/production",
    onCancel: () => {
      console.log("Cancel");
    },
  };
  const onChangeSeach = ({
    wo_id,
    item_id,
    wo_plan_start_date,
    wo_plan_end_date,
    wo_due_date_start,
    wo_due_date_end,
  }) => {
    let search_data = workOrderList;

    console.log(
      wo_id,
      item_id,
      wo_plan_start_date,
      wo_plan_end_date,
      wo_due_date_start,
      wo_due_date_end
    );
    if (wo_id) {
      search_data = search_data.filter((data) => data.wo_id === wo_id);
    }
    if (item_id) {
      search_data = search_data.filter((data) => data.item_id === item_id);
    }
    if (wo_plan_start_date) {
      search_data = search_data.filter(
        (data) =>
          data.wo_plan_start_date >= wo_plan_start_date &&
          data.wo_plan_end_date <= wo_plan_end_date
      );
    }
    if (wo_due_date_start) {
      search_data = search_data.filter(
        (data) =>
          data.wo_due_date >= wo_due_date_start &&
          data.wo_due_date <= wo_due_date_end
      );
    }
    setStateWO(search_data);
  };

  useEffect(() => {
    dispatch(getAllWorkOrder(auth.user_name));
    dispatch(reset_comments());
  }, []);
  useEffect(() => {
    setStateWO(workOrderList);
  }, [workOrderList.length]);
  const redirect_to_view = (id) => {
    history.push("wo/view/" + (id ? id : "new"));
  };

  return (
    <div>
      <MainLayout {...config}>
        <Row className="row-tab-margin-lg">
          <Col span={24}>
            <Table
              title={() => (
                <WorkOrderSearchTool onChangeSeach={onChangeSeach} />
              )}
              loading={loading}
              columns={work_order_columns}
              dataSource={stateWO}
              onChange={onChange}
              bordered
              size="small"
              rowKey="wo_id"
              onRow={(record, rowIndex) => {
                return {
                  onClick: (e) => {
                    setRowClick(true);
                    $(e.target)
                      .closest("tbody")
                      .find("tr")
                      .removeClass("selected-row");
                    $(e.target).closest("tr").addClass("selected-row");
                    keepLog.keep_log_action(record.wo_no);
                    dispatch(
                      getWorkOrderByID(
                        record.wo_id,
                        auth.user_name,
                        redirect_to_view
                      )
                    );
                  },
                };
              }}
            />
          </Col>
        </Row>
      </MainLayout>
    </div>
  );
};

export default withRouter(WorkOrderMain);
