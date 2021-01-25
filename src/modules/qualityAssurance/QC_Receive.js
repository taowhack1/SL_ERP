import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { Row, Col, Table, InputNumber } from "antd";
import MainLayout from "../../components/MainLayout";

import { reducer } from "./reducers";
import { get_qc_receive_list, update_qc_receive_list } from "../../actions/qa";
import Authorize from "../system/Authorize";

import { convertDigit, numberFormat } from "../../include/js/main_config";

const QCReceive = () => {
  const authorize = Authorize();
  authorize.check_authorize();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [qc_list, qcListDispatch] = useReducer(reducer, []);
  const [update, setUpdate] = useState(0);
  const auth = useSelector((state) => state.auth.authData);
  const current_project = useSelector((state) => state.auth.currentProject);
  const qc_receive_list = useSelector((state) => state.qa.qc_receive_list);
  const qc_receive_detail_list = useSelector(
    (state) => state.qa.qc_receive_detail_list
  );
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: ["Home", "QC Receive"],
    search: true,
    buttonAction: ["Save", "Discard"],
    save: "table_loading",
    discard: "/qa",
    back: "/qa",
    onBack: (e) => {
      console.log("Back");
    },
    onCancel: () => {
      console.log("Cancel");
    },
    onEdit: (e) => {
      //e.preventDefault();
      console.log("Edit");
    },
    onSave: (e) => {
      //e.preventDefault();

      setLoading(true);
      console.log("Save");
      setUpdate(!update);
      const data_update = qc_list.filter((row) => row.commit === 1);
      dispatch(update_qc_receive_list(data_update, setLoading));
    },
  };

  const onChangeValue = (rowId, data) => {
    qcListDispatch({
      type: "CHANGE_DETAIL_VALUE",
      payload: {
        id: rowId,
        data: { ...data, user_name: auth.user_name, commit: 1 },
      },
    });
  };

  const mainColumns = [
    {
      title: "Item Code",
      dataIndex: "item_no",
      key: "item_no",
      align: "left",
      width: "32%",
    },
    {
      title: "Name",
      dataIndex: "item_name",
      key: "item_name",
      align: "left",
      width: "45%",
    },
    {
      title: "Quantity on QC",
      dataIndex: "sum_stock_detail_qty_inbound",
      key: "sum_stock_detail_qty_inbound",
      align: "right",
      width: "23%",
      render: (value) => convertDigit(value),
    },
  ];

  const mockup_receive_sub_detail_columns = [
    {
      title: "Lot / Batch no.",
      dataIndex: "stock_lot_no_batch",
      key: "stock_lot_no_batch",
      width: "28%",
      align: "left",
      ellipsis: true,
    },
    {
      title: "Receive Date",
      dataIndex: "stock_detail_created",
      key: "stock_detail_created",
      width: "10%",
      align: "center",
      ellipsis: true,
    },
    {
      title: "MFG",
      dataIndex: "stock_mfg_date",
      key: "stock_mfg_date",
      width: "10%",
      align: "center",
      ellipsis: true,
    },
    {
      title: "EXP",
      dataIndex: "stock_exp_date",
      key: "stock_exp_date",
      width: "10%",
      align: "center",
      ellipsis: true,
    },
    {
      title: "Qty. Balance",
      dataIndex: "stock_detail_qty_hold",
      key: "stock_detail_qty_hold",
      width: "10%",
      align: "right",
      ellipsis: true,
    },
    {
      title: "Qty. Pass",
      dataIndex: "stock_qty_pass",
      key: "stock_qty_pass",
      width: "10%",
      align: "right",
      ellipsis: true,
      render: (value, record) => (
        <InputNumber
          {...numberFormat}
          placeholder={"Quantity Done"}
          min={0.0}
          max={record.stock_detail_qty_hold}
          step={0.001}
          size="small"
          style={{ width: "100%", backgroundColor: "#e6feff" }}
          disabled={0}
          value={record.stock_qty_pass}
          onChange={(data) => {
            console.log(data);
            let usable = record.stock_detail_qty_hold - record.stock_qty_reject;
            if (usable > 0 && data <= usable) {
              onChangeValue(record.id, { stock_qty_pass: data });
            } else {
              onChangeValue(record.id, { stock_qty_pass: usable });
            }
          }}
        />
      ),
    },
    {
      title: "Qty. Reject",
      dataIndex: "stock_qty_reject",
      key: "stock_qty_reject",
      width: "10%",
      align: "right",
      ellipsis: true,
      render: (value, record) => (
        <InputNumber
          {...numberFormat}
          placeholder={"Quantity Done"}
          min={0.0}
          max={record.stock_detail_qty_hold}
          step={0.001}
          size="small"
          style={{ width: "100%", backgroundColor: "#FFE6E6" }}
          disabled={0}
          value={record.stock_qty_reject}
          onChange={(data) => {
            let usable = record.stock_detail_qty_hold - record.stock_qty_pass;
            if (usable > 0 && data <= usable) {
              onChangeValue(record.id, { stock_qty_reject: data });
            } else {
              onChangeValue(record.id, { stock_qty_reject: usable });
            }
          }}
        />
      ),
    },
  ];

  const expandedRowRender = (record) => {
    console.log("expandedRowRender qc_list", qc_list);
    console.log("expandedRowRender record", record);
    return (
      <Table
        bordered
        columns={mockup_receive_sub_detail_columns}
        rowKey={"stock_id"}
        dataSource={qc_list.filter((batch) => batch.item_id === record.item_id)}
        pagination={false}
      />
    );
  };

  useEffect(() => {
    dispatch(get_qc_receive_list());
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    qcListDispatch({
      type: "SET_DETAIL_WOC",
      payload: qc_receive_detail_list,
    });
  }, [qc_receive_detail_list]);

  console.log("qc_list", qc_list);
  return (
    <div>
      <MainLayout {...config}>
        <Row>
          <Col span={24}>
            <Table
              bordered
              loading={loading}
              columns={mainColumns}
              rowKey={"item_id"}
              dataSource={qc_receive_list}
              expandable={{ expandedRowRender }}
              onChange={onChange}
              size="small"
            />
          </Col>
        </Row>
      </MainLayout>
    </div>
  );
};

export default withRouter(QCReceive);
