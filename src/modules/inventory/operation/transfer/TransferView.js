import React, { useEffect, useReducer } from "react";
import MainLayout from "../../../../components/MainLayout";
import { Row, Col, Input, Tabs, Typography, message } from "antd";
import TransferDetail from "./TransferDetail";
import { reducer } from "../../../production/reducers";
import moment from "moment";
import {
  TransferDetailFileds,
  TransferDetailRequireFileds,
  TransferHeadfileds,
  TransferRequireFileds,
} from "./TransferConfig";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Authorize from "../../../system/Authorize";
const TransferView = () => {
  const { TextArea } = Input;
  const { Title, Text } = Typography;
  const dispatch = useDispatch();
  const history = useHistory();
  const authorize = Authorize();
  //   const data =
  //     props.location && props.location.state ? props.location.state : 0;
  const current_project = useSelector((state) => state.auth.currentProject);
  const auth = useSelector((state) => state.auth.authData);
  const initialStateDetail = [TransferDetailFileds];
  const initialStateHead = [TransferHeadfileds];
  const initialStateItem = [];
  const [dataHead, headDispatch] = useReducer(reducer, initialStateHead);
  const [dataDetail, detailDispatch] = useReducer(reducer, initialStateDetail);
  const item = null;
  //   const flow =
  //     dataHead &&
  //     dataHead.data_flow_process &&
  //     dataHead.data_flow_process.map((step) => {
  //       return step.all_group_in_node;
  //     });
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: ["Home", "Transfer", "View"],
    search: false,
    buttonAction: ["Edit", "Discard"],
    create: "",
    edit: {
      path: "/inventory/edit/",
    },
    discard: "/inventory/transfer",
  };
  return (
    <MainLayout {...config}>
      <div id="form">
        {/* Head */}
        <Row className="col-2">
          <Col span={8}>
            <h2>
              <strong>Transfer </strong>
            </h2>
          </Col>
          <Col span={12}></Col>
          <Col span={2}>
            <Text strong>Create Date :</Text>
          </Col>
          <Col span={2} style={{ textAlign: "right" }}>
            <Text className="text-view"></Text>
          </Col>
        </Row>
        {/* tab detail */}
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>Transfer No :</Text>
          </Col>
          <Col span={8}>
            <Text className="text-view"></Text>
          </Col>
          <Col span={2}></Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>Create By :</Text>
          </Col>
          <Col span={8}>
            <Text className="text-view"></Text>
          </Col>
          <Col span={2}></Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>Description :</Text>
          </Col>
          <Col span={8}>
            <Text strong>ทดสอบ</Text>
          </Col>
        </Row>
        {/* tab */}
        <Row className="col-2 row-tab-margin-l">
          <Col span={24}>
            <div className="mt-3">
              {/* <TransferDetail
                dataDetail={dataDetail}
                detailDispatch={detailDispatch}
                readOnly={false}
              /> */}
            </div>
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
};

export default TransferView;
