import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { Row, Col, Table } from "antd";
import MainLayout from "../../components/MainLayout";
import { quotationColumns } from "./configs";
import {
  get_sale_master_data,
  get_quotation_by_id,
  get_quotation_list,
  reset_qn,
} from "../../actions/sales";
import { reset_comments } from "../../actions/comment&log";
import { getMasterDataItem } from "../../actions/inventory";
import Authorize from "../system/Authorize";
import useKeepLogs from "../logs/useKeepLogs";
const Quotations = (props) => {
  const keepLog = useKeepLogs();
  const authorize = Authorize();
  authorize.check_authorize();
  const current_menu = useSelector((state) => state.auth.currentMenu);
  const auth = useSelector((state) => state.auth.authData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(reset_qn());
    dispatch(reset_comments());

    dispatch(get_quotation_list(auth.user_name));
    dispatch(getMasterDataItem());
  }, []);

  const dataTable = useSelector((state) => state.sales.qn.qn_list);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: ["Home", "Quotations"],
    search: true,
    create: "/sales/quotations/create",
    buttonAction: current_menu.button_create !== 0 ? ["Create"] : [],
    discard: "/sales/quotations",
    onCancel: () => {
      console.log("Cancel");
    },
  };
  return (
    <div>
      <MainLayout {...config}>
        <Row>
          <Col span={24}>
            <Table
              columns={quotationColumns}
              dataSource={dataTable}
              onChange={onChange}
              rowKey="qn_id"
              size="small"
              bordered
              rowClassName="row-pointer"
              onRow={(record, rowIndex) => {
                return {
                  onClick: (e) => {
                    // dispatch(get_quotation_by_id(record.qn_id, auth.user_name));
                    keepLog.keep_log_action(record.qn_no);
                    props.history.push({
                      pathname: "/sales/quotations/view/" + record.qn_id,
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

export default withRouter(Quotations);
