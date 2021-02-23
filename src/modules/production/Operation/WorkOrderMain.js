/** @format */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";
import { Row, Col, Table, Button, Tabs } from "antd";
import MainLayout from "../../../components/MainLayout";

import $ from "jquery";
import Authorize from "../../system/Authorize";
import useKeepLogs from "../../logs/useKeepLogs";

import {
  mockupWorkOrderMonitorRM,
  workOrderMonitorRM,
  work_order_columns,
} from "../config/workOrder";
import WorkOrderSearchTool from "./WorkOrderSearchTool";
import {
  getAllWorkOrder,
  getWorkOrderByID,
} from "../../../actions/production/workOrderActions";
import { reset_comments } from "../../../actions/comment&log";
import Modal from "antd/lib/modal/Modal";
import Search from "../../../components/Search";

const WorkOrderMain = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (record) => {
    console.log(record);
    setIsModalVisible(true);
    setTitleModal(record.wo_no_description);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const dispatch = useDispatch();

  const history = useHistory();
  const keepLog = useKeepLogs();
  const authorize = Authorize();
  authorize.check_authorize();
  const auth = useSelector((state) => state.auth.authData);
  const [rowClick, setRowClick] = useState(false);
  const [loading, setLoading] = useState(false);
  const [titleModal, setTitleModal] = useState(false);
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
    breadcrumb: ["Home", "Operations", "MRP"],
    search: true,
    create: "/production/operations/mrp/create",
    buttonAction: ["Create"],
    edit: {},
    disabledEditBtn: !rowClick,
    discard: "/production",
    onCancel: () => {
      console.log("Cancel");
    },
    onSearch: (searchText) => {
      searchText
        ? setStateWO(
            workOrderList.filter(
              (wo) =>
                wo.item_no_name.indexOf(searchText) >= 0 ||
                wo.wo_no_description.indexOf(searchText) >= 0
            )
          )
        : setStateWO(workOrderList);
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
  const onSearch = (value, search) => {};
  return (
    <div>
      <MainLayout {...config}>
        <Row className='row-tab-margin-lg'>
          <Col span={24}>
            <Table
              title={() => (
                <WorkOrderSearchTool onChangeSeach={onChangeSeach} />
              )}
              loading={loading}
              columns={work_order_columns(showModal)}
              dataSource={stateWO}
              onChange={onChange}
              bordered
              size='small'
              rowKey='mrp_id'
              onRow={(record, rowIndex) => {
                return {
                  onClick: (e) => {
                    if (e.target.localName == "td") {
                      setRowClick(true);
                      $(e.target)
                        .closest("tbody")
                        .find("tr")
                        .removeClass("selected-row");
                      $(e.target).closest("tr").addClass("selected-row");
                      keepLog.keep_log_action(record.mrp_no);
                      dispatch(
                        getWorkOrderByID(
                          record.mrp_id,
                          auth.user_name,
                          redirect_to_view
                        )
                      );
                    } else {
                    }
                  },
                };
              }}
            />
          </Col>
        </Row>
        <Modal
          width={1500}
          title={titleModal}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}>
          <Tabs onChange={() => console.log("tab change")} type='card'>
            <Tabs.TabPane tab='Raw Material' key='1'>
              <Search style={{ width: "20%", float: "right" }} />
              <Table
                size='small'
                bordered
                pagination={{ pageSize: 15 }}
                columns={workOrderMonitorRM}
                dataSource={mockupWorkOrderMonitorRM}
                rowKey='id'
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab='Packaging' key='2'>
              <Table size='small' bordered pagination={{ pageSize: 15 }} />
            </Tabs.TabPane>
          </Tabs>
        </Modal>
      </MainLayout>
    </div>
  );
};

export default withRouter(WorkOrderMain);
