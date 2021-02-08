import React, { useContext, useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { Row, Col, Table } from "antd";
import MainLayout from "../../../../components/MainLayout";
import Authorize from "../../../system/Authorize";
import useKeepLogs from "../../../logs/useKeepLogs";
import { AppContext } from "../../../../include/js/context";
import { returnListColumns } from "./config";
import { useDispatch, useSelector } from "react-redux";
import { getAllReturnList } from "../../../../actions/inventory/operation/return/returnActions";
import DetailLoading from "../../../../components/DetailLoading";
const ReturnList = (props) => {
  const history = useHistory();
  const keepLog = useKeepLogs();
  const authorize = Authorize();
  const dispatch = useDispatch();
  authorize.check_authorize();
  const { isLoading: loading, issueReturnList: returnList } = useSelector(
    (state) => state.inventory.operations.issueReturn
  );
  const { auth, currentProject, currentMenu } = useContext(AppContext);
  const [data, setData] = useState(returnList);

  const config = {
    projectId: currentProject && currentProject.project_id,
    title: currentProject && currentProject.project_name,
    home: currentProject && currentProject.project_url,
    show: true,
    breadcrumb: ["Home", "Return"],
    search: true,
    create: `${currentMenu.menu_url}/create`,
    // buttonAction: currentMenu.button_create !== 0 ? ["Create"] : [],
    buttonAction: ["Create"],
    discard: "/inventory",
    badgeCount: 0,
    onCancel: () => {
      console.log("Cancel");
    },
    onSearch: (value) => {
      const search_data = returnList.filter(
        (obj) =>
          obj.return_no_description.indexOf(value) >= 0 ||
          obj.issue_no.indexOf(value) >= 0
      );
      setData(search_data);
    },
  };
  useEffect(() => {
    dispatch(getAllReturnList(auth.user_name));
  }, [dispatch]);

  useEffect(() => {
    setData(returnList);
  }, [returnList]);
  console.log("returnList", returnList);
  return (
    <>
      <MainLayout {...config}>
        <Row>
          <Col span={24}>
            {loading ? (
              <DetailLoading></DetailLoading>
            ) : (
              <Table
                columns={returnListColumns}
                dataSource={data}
                rowKey={"return_id"}
                size={"small"}
                loading={loading}
                onRow={(record, rowIndex) => {
                  return {
                    onClick: (e) => {
                      keepLog.keep_log_action(record.receive_no);
                      history.push({
                        pathname:
                          `${currentMenu.menu_url}/view/` + record.return_id,
                        state: { readOnly: true },
                      });
                    },
                  };
                }}
              />
            )}
          </Col>
        </Row>
      </MainLayout>
    </>
  );
};

export default withRouter(ReturnList);
