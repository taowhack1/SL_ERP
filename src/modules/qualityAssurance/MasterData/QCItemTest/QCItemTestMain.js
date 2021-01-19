import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";
import { Row, Col, Table } from "antd";
import $ from "jquery";
import Authorize from "../../../system/Authorize";
import useKeepLogs from "../../../logs/useKeepLogs";
import MainLayout from "../../../../components/MainLayout";
import {
  item_test_case,
  QASubjectColumns,
  qcTestItemMainColumns,
} from "../../configs/qcTestItemConfig";
import { sortData } from "../../../../include/js/function_main";
import { getAllQATestCaseGroupByItemType } from "../../../../actions/qa/qaTestAction";
const QCItemTestMain = (props) => {
  const history = useHistory();
  const keepLog = useKeepLogs();
  const authorize = Authorize();
  authorize.check_authorize();
  const dispatch = useDispatch();
  const current_project = useSelector((state) => state.auth.currentProject);

  const [rowClick, setRowClick] = useState(false);
  const [loading, setLoading] = useState(false);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  useEffect(() => {
    dispatch(getAllQATestCaseGroupByItemType());
  }, []);
  const testCaseList = useSelector((state) => state.qa.qaTestCase.list);
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: ["Home", "QA", "Master Data", "Quality Test Item"],
    search: false,
    // create: "modal",
    create: "/qa/master_data/quality_test_item/create",
    // buttonAction: current_menu.button_create !== 0 ? ["Create"] : [],
    buttonAction: ["Create"],
    edit: {},
    disabledEditBtn: !rowClick,
    discard: "/qa",
    onCancel: () => {
      console.log("Cancel");
    },
  };
  const redirect_to_view = (id, record) => {
    console.log(id, record);
    history.push({
      path: "/qa/master_data/quality_test_item/edit/" + (id ? id : "new"),
      state: record,
    });
  };
  // const expandedRowRender = () => {
  //   const data = [];
  //   return (
  //     <Table
  //       columns={QASubjectColumns}
  //       dataSource={data}
  //       pagination={{ pageSize: 20 }}
  //     />
  //   );
  // };
  return (
    <div>
      <MainLayout {...config}>
        <Table
          loading={loading}
          columns={qcTestItemMainColumns}
          dataSource={sortData(testCaseList)}
          onChange={onChange}
          bordered
          pagination={{ pageSize: 10 }}
          size="small"
          rowKey="type_id"
          onRow={(record, rowIndex) => {
            return {
              onClick: (e) => {
                setRowClick(true);
                $(e.target)
                  .closest("tbody")
                  .find("tr")
                  .removeClass("selected-row");
                $(e.target).closest("tr").addClass("selected-row");
                keepLog.keep_log_action(record.type_no_name);
                // redirect_to_view(record.type_id, record);
                history.push({
                  pathname:
                    "/qa/master_data/quality_test_item/edit/" + record.type_id,
                  state: record,
                });
              },
            };
          }}
          // expandable={{ expandedRowRender }}
        />
      </MainLayout>
    </div>
  );
};

export default withRouter(QCItemTestMain);
