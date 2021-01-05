import React, { useState, useEffect } from "react";
import {  useSelector } from "react-redux";
import {  withRouter } from "react-router-dom";
import { Row, Col, Table } from "antd";
import $ from "jquery";
import Authorize from "../../../system/Authorize";
import useKeepLogs from "../../../logs/useKeepLogs";
import MainLayout from "../../../../components/MainLayout";
import { qcTestItemMainColumns } from "../../configs/qcTestItemConfig";
import ModalCreateQCTestCase from "../../ModalCreateQCTestCase";
const QCItemTestMain = (props) => {
  const keepLog = useKeepLogs();
  const authorize = Authorize();
  authorize.check_authorize();


  const [rowClick, setRowClick] = useState(false);
  const [loading, setLoading] = useState(false);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const dataItems = useSelector(
    (state) => state.inventory.master_data.item_list
  );
  const [items, setItems] = useState(dataItems);
  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: ["Home", "QA", "Master Data", "Quality Test Item"],
    search: false,
    // create: "modal",
    // openModal: (title_name) => {},
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

  useEffect(() => {
    setItems(dataItems);
  }, [dataItems.length]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      return () => {
        clearTimeout();
      };
    }, 1200);
  }, [items]);



  return (
    <div>
      <MainLayout {...config}>
        <Row className="row-tab-margin-lg">
          <Col span={24}>
            <Table
              loading={loading}
              columns={qcTestItemMainColumns}
              dataSource={[]}
              onChange={onChange}
              bordered
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
      <ModalCreateQCTestCase visible={false} />
    </div>
  );
};

export default withRouter(QCItemTestMain);
