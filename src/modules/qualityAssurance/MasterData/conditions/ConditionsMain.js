import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";
import { SET_DEFUALT_CONDITIONS } from "../../../../actions/types";
import { Table } from "antd";
import Authorize from "../../../system/Authorize";
import useKeepLogs from "../../../logs/useKeepLogs";
import MainLayout from "../../../../components/MainLayout";
import { qcTestItemMainColumns } from "../../configs/qcTestItemConfig";
import { sortData } from "../../../../include/js/function_main";
import { getAllQAConditionsGroupByItemType } from "../../../../actions/qa/qaTestAction";
import { AppContext } from "../../../../include/js/context";
const ConditionsMain = (props) => {
  const { currentProject, currentMenu } = useContext(AppContext);
  const history = useHistory();
  const keepLog = useKeepLogs();
  const authorize = Authorize();
  authorize.check_authorize();
  const dispatch = useDispatch();
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const { loading, conditions } = useSelector((state) => state.qa);
  const [data, setData] = useState(conditions?.list);
  useEffect(() => {
    dispatch(getAllQAConditionsGroupByItemType());
    return () => dispatch({ type: SET_DEFUALT_CONDITIONS });
  }, []);

  useEffect(() => {
    setData(conditions?.list);
  }, [conditions]);

  const config = {
    projectId: currentProject && currentProject.project_id,
    title: currentProject && currentProject.project_name,
    home: currentProject && currentProject.project_url,
    show: true,
    breadcrumb: ["Home", "QA", "Master Data", "Conditions"],
    search: true,
    create: "",
    buttonAction: [],
    edit: {},
    back: currentProject.project_url ?? "#",
    onCancel: () => {
      console.log("Cancel");
    },
    onSearch: (text) => {
      console.log(text);
      setData(
        text
          ? conditions.list.filter(
              (type) =>
                type.type_no_name.toUpperCase().indexOf(text.toUpperCase()) >= 0
            )
          : conditions.list
      );
    },
  };
  return (
    <>
      <MainLayout {...config} loading={loading}>
        <Table
          loading={loading}
          columns={qcTestItemMainColumns}
          dataSource={sortData(data)}
          onChange={onChange}
          bordered
          pagination={{ pageSize: 10 }}
          size="small"
          rowKey="type_id"
          onRow={(record, rowIndex) => {
            return {
              onClick: (e) => {
                keepLog.keep_log_action(record.type_no_name);
                history.push({
                  pathname: `${currentMenu.menu_url}/view/` + record.type_id,
                  state: { readOnly: true },
                });
              },
            };
          }}
        />
      </MainLayout>
    </>
  );
};

export default withRouter(ConditionsMain);
