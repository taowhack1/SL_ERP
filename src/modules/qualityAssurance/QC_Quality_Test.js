import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { Row, Col, Table, Typography } from "antd";
import MainLayout from "../../components/MainLayout";
import { reducer } from "./reducers";
import { update_qc_receive_list } from "../../actions/qa";
import Authorize from "../system/Authorize";
import ModalCreateQCTestCase from "./ModalCreateQCTestCase";
import $ from "jquery";
import { get_qa_test_case } from "../../actions/qa/qaTestAction";
const initialData = {};

const QATestCase = () => {
  const authorize = Authorize();
  authorize.check_authorize();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [qc_list, qcListDispatch] = useReducer(reducer, []);
  const [update, setUpdate] = useState(0);
  const auth = useSelector((state) => state.auth.authData);
  const current_project = useSelector((state) => state.auth.currentProject);
  const qc_receive_list = useSelector((state) => state.qa.qc_receive_list);
  const qc_receive_detail_list = useSelector(
    (state) => state.qa.qc_receive_detail_list
  );

  const [data_head, headDispatch] = useReducer(reducer, initialData);
  const [rowClick, setRowClick] = useState(false);

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: ["Home", "Quality Test List"],
    search: true,
    buttonAction: ["Create", "Back"],
    disabledEditBtn: !rowClick,
    create: "modal",
    save: {},
    edit: "modal",
    discard: "/qa",
    back: "/qa",

    openModal: (title) => {
      setVisible(true);
    },
    onBack: (e) => {
      console.log("Back");
    },
    onCancel: () => {
      console.log("Cancel");
    },
    onEdit: () => {
      // setVisible(true);
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

  const onEdit = (record) => {
    console.log("onEdit", record.id);
  };
  const onDelete = (record) => {
    console.log("onDelete", record.id);
  };

  const mainColumns = [
    {
      title: "Subject",
      dataIndex: "qc_test_subject",
      key: "qc_test_subject",
      align: "left",
      width: "40%",
    },
    {
      title: "Description",
      dataIndex: "subject_description",
      key: "subject_description",
      align: "left",
      width: "40%",
    },
    {
      title: "Number of Specification",
      dataIndex: "count_specification",
      key: "count_specification",
      align: "right",
      width: "20%",
    },
  ];

  const qc_subject_data = [
    {
      id: 0,
      subject_id: 0,
      qc_test_subject: "Appearance",
      subject_description: "คำอธิบาย 1",
      count_specification: 3,
    },
    {
      id: 1,
      subject_id: 1,
      qc_test_subject: "Color",
      subject_description: "ทดสอบสี 2",
      count_specification: 12,
    },
    ,
    {
      id: 2,
      subject_id: 2,
      qc_test_subject: "Odor",
      subject_description: "คำอธิบาย 3",
      count_specification: 7,
    },
    {
      id: 3,
      subject_id: 3,
      qc_test_subject: "pH(Initial)",
      subject_description: "คำอธิบาย 4",
      count_specification: 103,
    },
  ];

  const qc_specification_columns = [
    {
      title: "Specification",
      dataIndex: "specification_name",
      key: "specification_name",
      width: "40%",
      align: "left",
      ellipsis: true,
    },
    {
      title: "Description",
      dataIndex: "specification_description",
      key: "specification_description",
      width: "40%",
      align: "left",
      ellipsis: true,
    },
    {
      title: "Number of Method",
      dataIndex: "count_method",
      key: "count_method",
      width: "20%",
      align: "right",
      ellipsis: true,
    },
  ];

  const qc_specification_data = [
    {
      id: 0,
      subject_id: 0,
      specification_id: 0,
      specification_name: "Opaque vicous liquid",
      specification_description: "ตัวอย่าง 1",
      count_method: 5,
    },
    {
      id: 1,
      subject_id: 0,
      specification_id: 1,
      specification_name: "Opaque",
      specification_description: "ตัวอย่าง 2",
      count_method: 8,
    },
    {
      id: 2,
      subject_id: 0,
      specification_id: 2,
      specification_name: "Math to standard",
      specification_description: "ตัวอย่าง 3",
      count_method: 2,
    },
    {
      id: 3,
      subject_id: 1,
      specification_id: 3,
      specification_name: "Opaque vicous liquid",
      specification_description: "ตัวอย่าง 1",
      count_method: 5,
    },
    {
      id: 4,
      subject_id: 2,
      specification_id: 4,
      specification_name: "5.0 - 7.0",
      specification_description: "ตัวอย่าง 1",
      count_method: 8,
    },
    {
      id: 5,
      subject_id: 1,
      specification_id: 5,
      specification_name: "Math to standard",
      specification_description: "ตัวอย่าง 2",
      count_method: 2,
    },
  ];

  const expandedRowRender = (record) => {
    console.log("expandedRowRender qc_list", qc_list);
    console.log("expandedRowRender record", record);
    return (
      <Table
        bordered
        columns={qc_specification_columns}
        rowKey={"specification_id"}
        dataSource={qc_specification_data.filter(
          (spec) => spec.subject_id === record.subject_id
        )}
        pagination={true}
        size="small"
        onRow={(record, index) => {
          return {
            onClick: (e) => {
              console.log(index, record);
              $("*").removeClass("selected-row");
              $(e.target)
                .closest("tbody")
                .find("tr")
                .removeClass("selected-row");
              $(e.target).closest("tr").addClass("selected-row");

              setRowClick(true);
              select_row(record);
            },
          };
        }}
      />
    );
  };

  useEffect(() => {
    // dispatch(get_qc_receive_list());
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

  const modalSave = (data) => {
    console.log("Save", data);
    setVisible(false);
  };
  const modalCancel = (data) => {
    console.log("Cancel", data);
    setVisible(false);
  };
  const [modalConfig, setModalConfig] = useState({
    modalTitle: "Subject",
    modalSave: modalSave,
    modalCancel: modalCancel,
    setVisible,
    data_head: data_head,
    headDispatch,
    initialData,
    modalType: "subject",
  });

  const select_row = (record) => {
    console.log(record);
    headDispatch({
      type: "SET_HEAD",
      payload: record,
    });
    setModalConfig({
      ...modalConfig,
      data_head: record,
    });
    // setVisible(true);
  };
  console.log(data_head);
  return (
    <div>
      <MainLayout {...config}>
        <Row>
          <Col span={24}>
            <Table
              bordered
              loading={loading}
              columns={mainColumns}
              rowKey={"subject_id"}
              dataSource={qc_subject_data}
              expandable={{ expandedRowRender }}
              onChange={onChange}
              size="small"
              onRow={(record, index) => {
                return {
                  onClick: (e) => {
                    $(e.target)
                      .closest("tbody")
                      .find("tr")
                      .removeClass("selected-row");
                    $(e.target).closest("tr").addClass("selected-row");

                    setRowClick(true);
                    select_row(record);
                  },
                };
              }}
            />
          </Col>
        </Row>
      </MainLayout>
      <ModalCreateQCTestCase {...modalConfig} visible={visible} />
    </div>
  );
};

export default withRouter(QATestCase);
