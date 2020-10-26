import React, { useState, useEffect } from "react";
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
const Quotations = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(reset_qn());
    dispatch(reset_comments());
    dispatch(get_sale_master_data());
    dispatch(get_quotation_list());
    dispatch(getMasterDataItem());
  }, []);
  const getData = (qn_id, user_name) => {
    dispatch(get_quotation_by_id(qn_id, user_name));
  };
  const dataTable = useSelector((state) => state.sales.qn.qn_list);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const auth = useSelector((state) => state.auth.authData[0]);
  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project.project_id,
    title: current_project.project_name,
    home: current_project.project_url,
    show: true,
    breadcrumb: ["Home", "Quotations"],
    search: true,
    create: "/sales/quotations/create",
    buttonAction: ["Create"],
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
              rowClassName="row-pointer"
              onRow={(record, rowIndex) => {
                return {
                  onClick: (e) => {
                    getData(record.qn_id, auth.user_name);
                    props.history.push({
                      pathname: "/sales/quotations/view/" + record.qn_id,
                      // state: record.qn_id,
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
