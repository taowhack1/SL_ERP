/** @format */
import React, { useState } from "react";
import MainLayout from "../../../../components/MainLayout";
import { useSelector } from "react-redux";
import {
  Button,
  Col,
  DatePicker,
  Input,
  message,
  Modal,
  Popconfirm,
  Row,
  Table,
} from "antd";
import SearchTableCheckPo from "./SearchTableCheckPo";
import { useFetch } from "../../../../include/js/customHooks";
import { api_mrp } from "../../../../include/js/api";
import moment from "moment";
import {
  CloseSquareTwoTone,
  EditTwoTone,
  FormOutlined,
  QuestionCircleOutlined,
  SaveTwoTone,
  SwapOutlined,
} from "@ant-design/icons";
import Text from "antd/lib/typography/Text";
import CustomTable from "../../../../components/CustomTable";
import { validateFormDetail } from "../../../../include/js/function_main";
import { updatePODueDateFormReport } from "../../../../actions/purchase/PO_Actions";
const api_check_po_due_date = "/purchase/report/check_po_due_date";
const columnsEditDueDate = (onChangeValue) => [
  {
    title: "PO no.",
    dataIndex: "po_no",
    width: "3%",
    align: "center",
    ellipsis: false,
  },
  {
    title: "Item Name",
    dataIndex: "po_detail_item",
    width: "5%",
    align: "left",
    ellipsis: true,
  },
  {
    title: "PO Due Date",
    dataIndex: "po_detail_due_date",
    width: "3%",
    align: "center",
    ellipsis: false,
  },
  {
    title: "Edit Due Date To",
    dataIndex: "edit_po_detail_due_date",
    width: "5%",
    align: "center",
    ellipsis: false,
    render: (val, record) => (
      <DatePicker
        format={"DD/MM/YYYY"}
        size='small'
        className={"full-width check-field"}
        name={"edit_po_detail_due_date"}
        placeholder='Edit Due Date'
        value={val ? moment(val, "DD/MM/YYYY") : null}
        onChange={(data) => {
          data
            ? onChangeValue(record.id, {
                edit_po_detail_due_date: data.format("DD/MM/YYYY"),
              })
            : onChangeValue(record.id, {
                receive_detail_sub_receive_date: null,
              });
        }}
      />
    ),
  },
];
const columns = (editDueDate) => [
  {
    title: "No.",
    dataIndex: "id",
    width: "3%",
    align: "center",
    ellipsis: false,
    render: (val) => val,
  },
  {
    title: "PR no.",
    dataIndex: "pr_no",
    width: "5%",
    align: "left",
    ellipsis: false,
  },
  {
    title: "PO no.",
    dataIndex: "po_no",
    width: "5%",
    align: "left",
    ellipsis: false,
  },
  {
    title: "PO Due Date.",
    dataIndex: "po_detail_due_date",
    width: "5%",
    align: "center",
    ellipsis: false,
    render: (val, record) => (
      <>
        <Text style={{ color: "blue", marginRight: 10 }}>{val}</Text>
        <EditTwoTone onClick={(e) => editDueDate(val, record)} />
      </>
    ),
  },
  {
    title: "Item Name",
    dataIndex: "po_detail_item",
    width: "20%",
    align: "left",
    ellipsis: true,
  },
  {
    title: "PO Qty.",
    dataIndex: "po_detail_qty",
    width: "5%",
    align: "right",
    ellipsis: false,
  },
  {
    title: "Unit.",
    dataIndex: "uom_no",
    width: "3%",
    align: "left",
    ellipsis: false,
  },
  {
    title: "PO Descript",
    dataIndex: "po_description",
    width: "10%",
    align: "left",
    ellipsis: false,
  },
];
const CheckPoDuedate = () => {
  const { user_name } = useSelector((state) => state.auth.authData);
  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: ["Home", "Report", "Check PO Due Date"],
    search: false,
    buttonAction: [],
  };
  const readOnly = false;
  const [state, setState] = useState({ mrp_id: null });
  const [modalData, setModalData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const {
    data: listData,
    loading: DataLoading,
    fetchData,
  } = useFetch(`${api_check_po_due_date}/${state.mrp_id}`);
  const { data: listDataMrp, loading: DataMrpLoading } = useFetch(
    `${api_mrp}/all/${user_name}`
  );
  const onChangeMRP = ({
    mrp_id,
    mrp_description,
    so_no_description,
    item_no_name,
    mrp_delivery_date,
  }) => {
    setState({
      ...state,
      mrp_id,
      mrp_description,
      so_no_description,
      item_no_name,
      mrp_delivery_date,
    });
    fetchData();
  };
  const editDueDate = (val, record) => {
    setModalData([record]);
    setModalVisible(true);
  };
  const onModalCancel = () => {
    setModalData([]);
    setModalVisible(false);
  };
  const onChangeValue = (id, data) => {
    setModalData(
      modalData.map((obj) => (obj.id === id ? { ...obj, ...data } : obj))
    );
  };
  const onModalOk = async () => {
    const poDetail = {
      po_detail_due_date: modalData[0].edit_po_detail_due_date,
      po_detail_id: modalData[0].po_detail_id,
      commit: 1,
    };
    const { validate } = validateFormDetail(modalData, [
      "edit_po_detail_due_date",
    ]);
    if (validate || state.length === 0) {
      const resp = await updatePODueDateFormReport([poDetail], user_name);
      console.log("resp :>> ", resp);
      if (resp.success) {
        setModalVisible(false);
        setModalData([]);
        fetchData();
      } else {
        message.error("Error!.", resp);
      }
    } else {
      message.error("Error!. Please fill your form completely.");
    }
  };
  console.log("state :>> ", state);
  return (
    <>
      <MainLayout {...config}>
        <Row>
          <Col span={24}>
            <Table
              title={() => (
                <SearchTableCheckPo
                  listData={listData}
                  listDataMrp={listDataMrp}
                  onChangeMRP={onChangeMRP}
                  state={state}
                />
              )}
              columns={columns(editDueDate)}
              dataSource={listData}
              loading={DataLoading ? true : false}
              rowKey={"id"}
              bordered
              pagination={{
                pageSize: 30,
              }}
              size={"small"}></Table>
          </Col>
        </Row>

        <Modal
          title={
            <>
              <FormOutlined className='button-icon' />
              <span className='pd-left-1'>Edit Due Date</span>
            </>
          }
          width={800}
          visible={modalVisible}
          destroyOnClose
          onCancel={onModalCancel}
          onOk={onModalOk}
          footer={[
            readOnly ? (
              <Button key='back' className={"primary"} onClick={onModalCancel}>
                Back
              </Button>
            ) : (
              <Popconfirm
                key='discard'
                icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                onConfirm={() => {
                  onModalCancel();
                }}
                title={
                  <Text strong>
                    {"Are you sure to "}
                    <span className='require'>Discard</span>
                    {" ?"}
                  </Text>
                }
                okText='Yes'
                cancelText='No'>
                <Button key='back'>Discard</Button>
              </Popconfirm>
            ),
            !readOnly && (
              <Popconfirm
                key='confirm'
                onConfirm={() => {
                  onModalOk();
                }}
                icon={<QuestionCircleOutlined style={{ color: "green" }} />}
                title={
                  <Text strong>
                    {"Are you sure to "}
                    <span style={{ color: "green" }}>Confirm</span>
                    {" ?"}
                  </Text>
                }
                okText='Yes'
                cancelText='No'>
                <Button key='submit' className='primary'>
                  Confirm
                </Button>
              </Popconfirm>
            ),
          ]}>
          <CustomTable
            columns={columnsEditDueDate(onChangeValue)}
            dataSource={modalData}
            focusLastPage={true}
            rowClassName='row-table-detail'
            rowKey={"id"}
          />
        </Modal>
      </MainLayout>
    </>
  );
};

export default CheckPoDuedate;
