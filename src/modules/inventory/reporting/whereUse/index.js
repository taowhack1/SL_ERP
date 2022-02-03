/** @format */

import { Col, Row, Table, Tabs } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CustomLabel from "../../../../components/CustomLabel";
import MainLayout from "../../../../components/MainLayout";
import { api_get_all_item_list } from "../../../../include/js/api";
import { useFetch } from "../../../../include/js/customHooks";
import useKeepLogs from "../../../logs/useKeepLogs";
import Authorize from "../../../system/Authorize";
import WhereUseTable from "./WhereUseTable";
import WhereUseTablePK from "./WhereUseTablePK";
const api_whereuseRM = "/inventory/report/where_useRM";
const api_whereusePK = "/inventory/report/where_usePK";
const WhereUse = () => {
  const history = useHistory();
  const keepLog = useKeepLogs();
  const authorize = Authorize();
  authorize.check_authorize();
  const auth = useSelector((state) => state.auth.authData);
  const current_menu = useSelector((state) => state.auth.currentMenu);
  const current_project = useSelector((state) => state.auth.currentProject);
  const [state, setState] = useState({ RM: null, PK: null });
  const {
    data: listDataWhereUse,
    loading: whereUseLoading,
    fetchData,
  } = useFetch(`${api_whereuseRM}/${state.RM}`);
  const {
    data: listDataWhereUsePK,
    loading: whereUsePKLoading,
    fetchData: fetchDataPK,
  } = useFetch(`${api_whereusePK}/${state.PK}`);
  const { data: listDataItem, loading: ItemLoading } = useFetch(
    `${api_get_all_item_list}/${auth?.user_name}`,
    !auth?.user_name
  );
  const onChangeItem = ({ item_id, type_id }) => {
    type_id === 1
      ? setState({ ...state, RM: item_id })
      : setState({ ...state, PK: item_id });
    type_id === 1 ? fetchData() : fetchDataPK();
    console.log("onChangeItem :>> ", item_id);
  };
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: ["Home", "Where Use"],
    search: false,
    buttonAction: [],
  };
  console.log("state :>> ", state);
  return (
    <>
      <MainLayout {...config}>
        <Tabs
          defaultActiveKey={"1"}
          type={"card"}
          size={"default"}
          style={{ marginBottom: 10, marginTop: 10 }}>
          <Tabs.TabPane className='tab-top' tab={"Item Raw material"} key={"1"}>
            <WhereUseTable
              dataSource={listDataWhereUse}
              listItem={listDataItem}
              listItemLoading={ItemLoading}
              loading={whereUseLoading}
              onChangeItem={onChangeItem}
              state={state}
            />
          </Tabs.TabPane>
          <Tabs.TabPane className='tab-top' tab={"Item Package"} key={"2"}>
            <WhereUseTablePK
              dataSource={listDataWhereUsePK}
              listItem={listDataItem}
              listItemLoading={ItemLoading}
              loading={whereUsePKLoading}
              onChangeItem={onChangeItem}
              state={state}
            />
          </Tabs.TabPane>
        </Tabs>
      </MainLayout>
    </>
  );
};

export default WhereUse;
