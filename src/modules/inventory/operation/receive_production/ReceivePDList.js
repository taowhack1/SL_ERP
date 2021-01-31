import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";
import { Row, Col, Table } from "antd";
import MainLayout from "../../../../components/MainLayout";
import $ from "jquery";
import {
  get_po_receive_list,
  get_receive_by_id,
  get_receive_list,
  reset_receive,
} from "../../../../actions/inventory/receiveActions";
import { receive_columns } from "../../config/receiveConfig";
import { reset_comments } from "../../../../actions/comment&log";
import Authorize from "../../../system/Authorize";
import useKeepLogs from "../../../logs/useKeepLogs";
import { AppContext } from "../../../../include/js/context";
import { receivePDColumns } from "./Config";
import { getAllPDReceiveList } from "../../../../actions/inventory/operation/receive/receivePDActions";
const ReceivePDList = (props) => {
  const history = useHistory();
  const keepLog = useKeepLogs();
  const authorize = Authorize();
  authorize.check_authorize();
  const { auth, currentProject, currentMenu } = useContext(AppContext);
  const dispatch = useDispatch();
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    dispatch(reset_comments());
    dispatch(getAllPDReceiveList(auth.user_name));
  }, []);
  const PDReceiveList = useSelector(
    (state) => state.inventory.operations.productionReceive.list
  );
  const [data, setData] = useState(PDReceiveList);

  const config = {
    projectId: currentProject && currentProject.project_id,
    title: currentProject && currentProject.project_name,
    home: currentProject && currentProject.project_url,
    show: true,
    breadcrumb: ["Home", "Production Receive"],
    search: true,
    create: "/inventory/receive_pd/create",
    buttonAction: currentMenu.button_create !== 0 ? ["Create"] : [],
    discard: "/inventory/receive_pd",
    // badgeCount: po_ref.length,
    onCancel: () => {
      console.log("Cancel");
    },
    onSearch: (value) => {
      console.log(value);
      setLoading(true);
      setTimeout(() => {
        const search_data = PDReceiveList.filter(
          (receive) => receive.receive_no_description.indexOf(value) >= 0
        );
        setData(search_data);
        setLoading(false);
      }, 1200);
    },
  };
  useEffect(() => {
    setData(PDReceiveList);
  }, [PDReceiveList]);
  return (
    <div>
      <MainLayout {...config}>
        <Row>
          <Col span={24}>
            <Table
              columns={receivePDColumns}
              dataSource={data}
              onChange={onChange}
              rowKey={"receive_pd_id"}
              size="small"
              loading={loading}
              onRow={(record, rowIndex) => {
                return {
                  onClick: (e) => {
                    keepLog.keep_log_action(record.receive_no);
                    history.push({
                      pathname:
                        `${currentMenu.menu_url}/view/` + record.receive_id,
                      state: { readOnly: true },
                    });
                    // dispatch(
                    //   get_receive_by_id(record.receive_id, auth.user_name)
                    // );
                    // props.history.push({
                    //   pathname: "/inventory/receive/view/" + record.receive_id,
                    // });
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

export default withRouter(ReceivePDList);
