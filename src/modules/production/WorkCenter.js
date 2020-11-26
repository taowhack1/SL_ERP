import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";
import { Row, Col, Table } from "antd";
import MainLayout from "../../components/MainLayout";
import {
  getAllItems,
  get_item_by_id,
} from "../../actions/inventory/itemActions";
import $ from "jquery";
import Authorize from "../system/Authorize";
import useKeepLogs from "../logs/useKeepLogs";
import SearchTable from "../../components/SearchTable";
import { work_center_columns } from "./config/master_data";
const WorkCenter = (props) => {
  const history = useHistory();
  const keepLog = useKeepLogs();
  const authorize = Authorize();
  authorize.check_authorize();
  const auth = useSelector((state) => state.auth.authData);
  const current_menu = useSelector((state) => state.auth.currentMenu);
  const dispatch = useDispatch();
  const [rowClick, setRowClick] = useState(false);
  const [loading, setLoading] = useState(false);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const dataWorkCenter = useSelector(
    (state) => state.inventory.master_data.item_list
  );
  const [workCenter, setWorkCenter] = useState([]);
  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: ["Home", "WorkCenter"],
    search: false,
    create: "/production/work_conter/create",
    // buttonAction: current_menu.button_create !== 0 ? ["Create"] : [],
    buttonAction: ["Create"],
    edit: {},
    disabledEditBtn: !rowClick,
    discard: "/production/work_conter",
    onCancel: () => {
      console.log("Cancel");
    },
  };
  // const onChangeSeach = ({ type_id, category_id, search_text }) => {
  //   console.log("search_text", search_text);
  //   let search_data = dataWorkCenter;

  //   if (type_id) {
  //     category_id
  //       ? (search_data = search_data.filter(
  //           (item) => item.category_id === category_id
  //         ))
  //       : (search_data = search_data.filter(
  //           (item) => item.type_id === type_id
  //         ));
  //   }
  //   setWorkCenter(
  //     search_data.filter(
  //       (item) =>
  //         item.item_name.indexOf(search_text) >= 0 ||
  //         item.item_no.indexOf(search_text) >= 0
  //     )
  //   );
  // };

  // useEffect(() => {
  //   dispatch(getAllItems());
  // }, []);

  useEffect(() => {
    // setWorkCenter(dataWorkCenter);
  }, [dataWorkCenter.length]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      return () => {
        clearTimeout();
      };
    }, 1200);
  }, [workCenter]);

  const redirect_to_view = (id) => {
    history.push("/production/work_conter/view/" + (id ? id : "new"));
  };

  return (
    <div>
      <MainLayout {...config}>
        <Row className="row-tab-margin-lg">
          <Col span={24}>
            <Table
              // title={() => <SearchTable onChangeSeach={onChangeSeach} />}
              loading={loading}
              columns={work_center_columns}
              dataSource={workCenter}
              onChange={onChange}
              bordered
              size="small"
              rowKey="item_id"
              onRow={(record, rowIndex) => {
                return {
                  onClick: (e) => {
                    setRowClick(true);
                    $(e.target)
                      .closest("tbody")
                      .find("tr")
                      .removeClass("selected-row");
                    $(e.target).closest("tr").addClass("selected-row");
                    // keepLog.keep_log_action(record.item_no);
                    // dispatch(
                    //   get_item_by_id(
                    //     record.item_id,
                    //     auth.user_name,
                    //     redirect_to_view
                    //   )
                    // );
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

export default withRouter(WorkCenter);
