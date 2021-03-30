import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Tabs, Typography } from "antd";
import MainLayout from "../../../../components/MainLayout";
// import Detail from "./Issue_Detail";
import Comments from "../../../../components/Comments";
import { get_log_by_id } from "../../../../actions/comment&log";
import Authorize from "../../../system/Authorize";
import { BorderOutlined, CheckSquareOutlined } from "@ant-design/icons";
import MachineTabDetail from "./MachineTabDetail";
import MachineTabCost from "./MachineTabCost";

const { Text } = Typography;

// const initialStateDetail = [issue_detail_fields];

const MachineView = (props) => {
  const authorize = Authorize();
  authorize.check_authorize();
  const dispatch = useDispatch();
  const current_project = useSelector((state) => state.auth.currentProject);
  const dataComments = useSelector((state) => state.log.comment_log);
  const { data_head } = useSelector(
    (state) => state.production.machine.machine
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
      "Machine",
      "View",
      data_head.machine_cost_center && data_head.machine_cost_center,
    ],
    search: false,
    buttonAction: ["Edit", "Back"],
    edit: {
      data: {
        data_head: data_head,
      },
      path: data_head && "/production/machine/edit/" + data_head.machine_id,
    },
    step: {
      current: data_head && data_head.node_stay - 1,
      step: flow,
      process_complete: data_head.process_complete,
    },
    discard: "/production/machine",
    back: "/production/machine",
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

  return (
    <MainLayout {...config}>
      <div id="form">
        <Row className="col-2">
          <Col span={8}>
            <h2>
              <strong>
                {"View"} Machine{" "}
                {data_head.machine_cost_center &&
                  "#" + data_head.machine_cost_center}
              </strong>
            </h2>
          </Col>
          <Col span={12}></Col>
          <Col span={2}>
            <Text strong>Create Date :</Text>
          </Col>
          <Col span={2} style={{ textAlign: "right" }}>
            <Text className="text-view">{data_head.machine_created}</Text>
          </Col>
        </Row>
        <Row className="col-2">
          <Col span={24} style={{ marginBottom: 8 }}>
            <h3>
              <strong>Machine Name</strong>
            </h3>
            <Col span={24}>
              <Text className="text-view">{data_head.machine_description}</Text>
            </Col>
          </Col>
        </Row>
        <Row className="col-2 mt-1 mb-1 pd-left-1">
          <Col span={1}>
            {data_head.machine_process_time ? (
              <CheckSquareOutlined />
            ) : (
              <BorderOutlined />
            )}
          </Col>
          <Col span={23}> This process have time start - stop</Col>
        </Row>
        <Row className="col-2 mb-1 pd-left-1">
          <Col span={1}>
            {data_head.machine_process_scan ? (
              <CheckSquareOutlined />
            ) : (
              <BorderOutlined />
            )}
          </Col>
          <Col span={23}> This process have RM Scan</Col>
        </Row>
        <Row className="col-2 mb-1 pd-left-1">
          <Col span={1}>
            {data_head.machine_process_qty ? (
              <CheckSquareOutlined />
            ) : (
              <BorderOutlined />
            )}
          </Col>
          <Col span={23}>
            This process have input quantity after stop process
          </Col>
        </Row>

        <Row className="col-2">
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
                <MachineTabDetail readOnly={true} data_head={data_head} />
              </Tabs.TabPane>
              <Tabs.TabPane
                tab={<span className="tab_pane">{"Cost"}</span>}
                key={"2"}
              >
                <MachineTabCost readOnly={true} data_head={data_head} />
              </Tabs.TabPane>
              <Tabs.TabPane
                tab={
                  <span className="tab_pane">
                    {/* <span className="require">* </span> */}
                    {"Notes"}
                  </span>
                }
                key={"3"}
              >
                <Text className="text-view">{data_head.machine_remark}</Text>
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
      <Comments data={dataComments} />
    </MainLayout>
  );
};

export default MachineView;
