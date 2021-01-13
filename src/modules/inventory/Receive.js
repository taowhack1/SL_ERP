import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { Row, Col, Table } from "antd";
import MainLayout from "../../components/MainLayout";
import $ from "jquery";
import {
  get_receive_by_id,
  get_receive_list,
  reset_receive,
} from "../../actions/inventory/receiveActions";
import { receive_columns } from "./config";
import { reset_comments } from "../../actions/comment&log";
import Authorize from "../system/Authorize";
import useKeepLogs from "../logs/useKeepLogs";
const Receive = (props) => {
  const keepLog = useKeepLogs();
  const authorize = Authorize();
  authorize.check_authorize();
  const current_menu = useSelector((state) => state.auth.currentMenu);
  const dispatch = useDispatch();
  const [rowClick, setRowClick] = useState(false);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const receive_list = useSelector(
    (state) => state.inventory.receive.receive_list
  );
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(receive_list);
  const auth = useSelector((state) => state.auth.authData);
  useEffect(() => {
    dispatch(reset_comments());
    dispatch(reset_receive());
    dispatch(get_receive_list(auth.user_name));
  }, []);
  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: ["Home", "Receive"],
    search: true,
    create: "/inventory/receive/create",
    buttonAction: current_menu.button_create !== 0 ? ["Create"] : [],
    disabledEditBtn: !rowClick,
    discard: "/inventory/receive",
    onCancel: () => {
      console.log("Cancel");
    },
    onSearch: (value) => {
      console.log(value);
      setLoading(true);
      setTimeout(() => {
        const search_data = receive_list.filter(
          (receive) => receive.receive_no_description.indexOf(value) >= 0
        );
        setData(search_data);
        setLoading(false);
      }, 1200);
    },
  };
  useEffect(() => {
    setData(receive_list);
  }, [receive_list]);
  return (
    <div>
      <MainLayout {...config}>
        <Row>
          <Col span={24}>
            <Table
              columns={receive_columns}
              dataSource={data}
              onChange={onChange}
              rowKey={"receive_id"}
              size="small"
              loading={loading}
              onRow={(record, rowIndex) => {
                return {
                  onClick: (e) => {
                    setRowClick(true);
                    $(e.target)
                      .closest("tbody")
                      .find("tr")
                      .removeClass("selected-row");
                    $(e.target).closest("tr").addClass("selected-row");
                    keepLog.keep_log_action(record.receive_no);
                    dispatch(
                      get_receive_by_id(record.receive_id, auth.user_name)
                    );
                    props.history.push({
                      pathname: "/inventory/receive/view/" + record.receive_id,
                    });
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

export default withRouter(Receive);
