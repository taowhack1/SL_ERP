import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";
import { Row, Col, Table } from "antd";
import MainLayout from "../../../components/MainLayout";

import $ from "jquery";
import Authorize from "../../system/Authorize";
import useKeepLogs from "../../logs/useKeepLogs";

import { mrp_columns } from "../config/mrp";
import MRPSearchTool from "./MRPSearchTool";
import { getAllMRP, getMRPByID } from "../../../actions/production/mrpActions";
import { reset_comments } from "../../../actions/comment&log";
const MRPMain = (props) => {
  const dispatch = useDispatch();

  const history = useHistory();
  const keepLog = useKeepLogs();
  const authorize = Authorize();
  authorize.check_authorize();
  const auth = useSelector((state) => state.auth.authData);

  const [rowClick, setRowClick] = useState(false);
  const [loading, setLoading] = useState(false);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const { mrpList, mrp } = useSelector(
    (state) => state.production.operations.mrp
  );
  const [stateMRP, setStateMRP] = useState(mrpList);

  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: ["Home", "Operations", "MRP"],
    search: true,
    create: "/production/operations/mrp/create",
    buttonAction: ["Create"],
    edit: {},
    disabledEditBtn: !rowClick,
    discard: "/production",
    badgeCount: mrp.data_so_ref.length,
    onCancel: () => {
      console.log("Cancel");
    },
    onSearch: (searchText) => {
      searchText
        ? setStateMRP(
            mrpList.filter(
              (mrp) =>
                mrp.item_no_name.indexOf(searchText) >= 0 ||
                mrp.mrp_no_description.indexOf(searchText) >= 0
            )
          )
        : setStateMRP(mrpList);
    },
  };
  const onChangeSeach = ({
    mrp_id,
    item_id,
    mrp_plan_start_date,
    mrp_plan_end_date,
    mrp_due_date_start,
    mrp_due_date_end,
  }) => {
    let search_data = mrpList;

    console.log(
      mrp_id,
      item_id,
      mrp_plan_start_date,
      mrp_plan_end_date,
      mrp_due_date_start,
      mrp_due_date_end
    );
    if (mrp_id) {
      search_data = search_data.filter((data) => data.mrp_id === mrp_id);
    }
    if (item_id) {
      search_data = search_data.filter((data) => data.item_id === item_id);
    }
    if (mrp_plan_start_date) {
      search_data = search_data.filter(
        (data) =>
          data.mrp_plan_start_date >= mrp_plan_start_date &&
          data.mrp_plan_end_date <= mrp_plan_end_date
      );
    }
    if (mrp_due_date_start) {
      search_data = search_data.filter(
        (data) =>
          data.mrp_due_date >= mrp_due_date_start &&
          data.mrp_due_date <= mrp_due_date_end
      );
    }
    setStateMRP(search_data);
  };

  useEffect(() => {
    dispatch(getAllMRP(auth.user_name));
    dispatch(reset_comments());
  }, []);
  useEffect(() => {
    setStateMRP(mrpList);
  }, [mrpList.length]);
  const redirect_to_view = (id) => {
    history.push("mrp/view/" + (id ? id : "new"));
  };

  return (
    <div>
      <MainLayout {...config}>
        <Row className="row-tab-margin-lg">
          <Col span={24}>
            <Table
              title={() => <MRPSearchTool onChangeSeach={onChangeSeach} />}
              loading={loading}
              columns={mrp_columns}
              dataSource={stateMRP}
              onChange={onChange}
              bordered
              size="small"
              rowKey="mrp_id"
              onRow={(record, rowIndex) => {
                return {
                  onClick: (e) => {
                    setRowClick(true);
                    $(e.target)
                      .closest("tbody")
                      .find("tr")
                      .removeClass("selected-row");
                    $(e.target).closest("tr").addClass("selected-row");
                    keepLog.keep_log_action(record.mrp_no);
                    dispatch(
                      getMRPByID(
                        record.mrp_id,
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

export default withRouter(MRPMain);
