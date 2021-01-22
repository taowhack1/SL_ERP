import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Tabs, Typography } from "antd";
import MainLayout from "../../components/MainLayout";
import Comments from "../../components/Comments";
import { get_log_by_id } from "../../actions/comment&log";
import Authorize from "../system/Authorize";

import WorkCenterDetail from "./WorkCenterDetail";
const { Text } = Typography;

const WorkCenterView = (props) => {

  const authorize = Authorize();
  authorize.check_authorize();
  const dispatch = useDispatch();
  const current_project = useSelector((state) => state.auth.currentProject);
  const dataComments = useSelector((state) => state.log.comment_log);
  const { data_head, data_detail } = useSelector(
    (state) => state.production.workCenter.workCenter
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
      "Work Center",
      "View",
      data_head.work_center_no && data_head.work_center_no,
    ],
    search: false,
    buttonAction: ["Edit", "Back"],
    edit: {
      data: {
        data_head: data_head,
        data_detail: data_detail,
      },
      path:
        data_head && "/production/work_center/edit/" + data_head.work_center_id,
    },
    step: {
      current: data_head && data_head.node_stay - 1,
      step: flow,
      process_complete: data_head.process_complete,
    },
    create: "",
    save: "function",
    discard: "/production/work_center",
    back: "/production/work_center",
    onSave: (e) => {
      console.log("Save");
    },
    onEdit: (e) => {
      console.log("Edit");
    },
    onApprove: (e) => {
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
  console.log(data_head, data_detail);
  return (
    <MainLayout {...config}>
      <div id="form">
        <Row className="col-2">
          <Col span={8}>
            <h2>
              <strong>
                {"View"} Work Center{" "}
                {data_head.work_center_no && "#" + data_head.work_center_no}
              </strong>
            </h2>
          </Col>
          <Col span={12}></Col>
          <Col span={2}>
            <Text strong>Create Date :</Text>
          </Col>
          <Col span={2} style={{ textAlign: "right" }}>
            <Text className="text-view">
              {data_head.work_center_created ?? "-"}
            </Text>
          </Col>
        </Row>
        <Row className="col-2">
          <Col span={24} style={{ marginBottom: 8 }}>
            <h3>
              <strong>Work Center Description</strong>
            </h3>
            <Col span={24}>
              <Text className="text-view">
                {data_head.work_center_description ?? "-"}
              </Text>
            </Col>
            <Row className="col-2 mt-2">
              <Col span={3}>
                <Text strong>Capacity Type :</Text>
              </Col>
              <Col span={21} className=" pd-left-1 col-right-1">
                <Text className="text-view">
                  {data_head.capacity_category_name ?? "-"}
                </Text>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="col-2 row-margin-vertical">
          <Col span={24}>
            <Tabs
              defaultActiveKey={"1"}
              onChange={callback}
              className="row-tab-margin-lg"
            >
              <Tabs.TabPane
                tab={<span className="tab_pane">{"Detail"}</span>}
                key={"1"}
              >
                <Row className="col-2 row-margin-vertical">
                  <Col span={12} className="col-border-right">
                    <Row className="col-2 row-margin-vertical">
                      <Col span={6} className="col-left-1">
                        <Text strong>Use For :</Text>
                      </Col>

                      <Col span={17}>
                        <Text className="text-view">
                          {data_head.type_name ?? "-"}
                        </Text>
                      </Col>
                      <Col span={1}></Col>
                    </Row>
                    <Row className="col-2 row-margin-vertical">
                      <Col span={6} className="col-left-1">
                        <Text strong>Worker :</Text>
                      </Col>

                      <Col span={17}>
                        <Text className="text-view">
                          {data_head.work_center_worker ?? "0"}
                        </Text>
                      </Col>
                      <Col span={1}></Col>
                    </Row>
                  </Col>
                  <Col span={12}>
                    <Row className="col-2 row-margin-vertical">
                      <Col span={1}></Col>

                      <Col span={8}>
                        <Text strong>Work Center Type :</Text>
                      </Col>
                      <Col span={15}>
                        <Text className="text-view">
                          {data_head.work_center_type_no_name ?? "-"}
                        </Text>
                      </Col>
                    </Row>
                    <Row className="col-2 row-margin-vertical">
                      <Col span={1}></Col>

                      <Col span={8}>
                        <Text strong>Time Used :</Text>
                      </Col>
                      <Col span={15}>
                        <Text className="text-view">
                          {data_head.work_center_time ?? "-"}
                        </Text>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <WorkCenterDetail data_detail={data_detail} readOnly={true} />
              </Tabs.TabPane>
              <Tabs.TabPane
                tab={<span className="tab_pane">{"Notes"}</span>}
                key={"2"}
              >
                <Text className="text-view">
                  {data_head.work_center_remark ?? "-"}
                </Text>
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
      <Comments data={dataComments} />
    </MainLayout>
  );
};

export default WorkCenterView;
