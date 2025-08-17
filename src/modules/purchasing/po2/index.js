/** @format */

import React, { useState, useEffect, useContext, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  Row,
  Col,
  Table,
  Button,
  Space,
  Typography,
  Divider,
  Tabs,
  Modal,
  Popconfirm,
  message,
  Badge,
} from "antd";
import MainLayout from "../../../components/MainLayout";
import {
  columnsEditDueDate,
  mrp_list_detail,
  po_list_columns,
} from "../config/po";
import { filterPO } from "../../../actions/purchase/PO_Actions";
import { reset_comments } from "../../../actions/comment&log";
import $ from "jquery";

import useKeepLogs from "../../logs/useKeepLogs";
import Authorize from "../../system/Authorize";
import PRList2 from "../operations/po/PRList2";
import PRListAuto from "../operations/po/PRListAuto";
import {
  sortData,
  validateFormDetail,
} from "../../../include/js/function_main";
import { useFetch } from "../../../include/js/customHooks";
import { AppContext } from "../../../include/js/context";
import CustomSelect from "../../../components/CustomSelect";
import Text from "antd/lib/typography/Text";
import Axios from "axios";
import { header_config } from "../../../include/js/main_config";
import { FormOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import CustomTable from "../../../components/CustomTable";
import {
  updatePRDueDateFormReport,
  update_pr,
} from "../../../actions/purchase/PR_Actions";
import CancelPR from "../CancelPR";
import useSearch from "../../../include/js/customHooks/useSearch";
import SearchPO from "../components/SearchPO";
const apiGetPRbyMRP = `/purchase/pr/detail_by_mrp`;
const apiGetPO = `/purchase/po`;
const PO = (props) => {
  const authorize = Authorize();
  authorize.check_authorize();
  const keepLog = useKeepLogs();
  const auth = useSelector((state) => state.auth.authData);
  const current_menu = useSelector((state) => state.auth.currentMenu);
  const dispatch = useDispatch();
  const {
    auth: { user_name },
  } = useContext(AppContext);
  const [rowClick, setRowClick] = useState(false);
  const listDataPo = useFetch(`${apiGetPO}/${user_name}&0`, !user_name);
  console.log("listDataPo :>> ", listDataPo);
  const { filter } = useSelector((state) => state.purchase.po);
  const { pageSize, page, keyword, po_status } = filter || {};


  useEffect(() => {
    if (user_name == "9999999") {
      dispatch(filterPO({ po_status: "Pending Approve" }));
    }
  }, [user_name]);

  const readOnly = false;
  const [mrp, setMrp] = useState({ mrp_id: null, listMRP: [], mpr_no: null });
  const refSearchInput = useRef();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState(0);
  const [modalData, setModalData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [BadgeCount, setBadgeCount] = useState(0);
  const onChange = (pagination) => {
    const { current, pageSize } = pagination;
    dispatch(filterPO({ page: current, pageSize }));
  };

  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: ["Home", "Purchase Orders"],
    search: false,
    create: "/purchase/po/new&mrp",
    buttonAction: current_menu.button_create !== 0 ? ["Create"] : [],
    edit: {},
    disabledEditBtn: !rowClick,
    discard: "/purchase/po",
    // badgeCount: pr_ref.length,
    onCancel: () => {
      console.log("Cancel");
    },
  };

  const GetPR_Detail_by_MRP = async (mrp_id, mrp_no) => {
    const data_mpr = await mpr_detail_data(mrp_id);
    console.log("data_mpr", data_mpr);
    setMrp({ ...mrp, listMRP: data_mpr.data, mrp_id: mrp_id, mrp_no: mrp_no });
  };

  const mpr_detail_data = (mrp_id) => {
    try {
      return Axios.get(`${apiGetPRbyMRP}/${mrp_id}`, header_config)
        .then((resp) => {
          if (resp.status === 200) {
            console.log("GetPR_Detail_by_MRP :>> ", resp.data);
            return {
              success: true,
              data: sortData(resp.data),
              //data: resp.data,
              message: "Success",
            };
          } else {
            return { success: false, data: [], message: resp };
          }
        })
        .catch((error) => {
          console.error(error);
          if (error?.response) {
            console.error(error.response);
          }
          return { success: false, data: [], message: error };
        });
    } catch (error) {
      console.log(error);
      return { success: false, data: [], message: error };
    }
  };
  const editDueDate = (val, record) => {
    setModalData([record]);
    setModalVisible(true);
  };
  const onModalOk = async () => {
    const prDetail = {
      pr_detail_due_date: modalData[0].edit_pr_detail_due_date,
      pr_detail_id: modalData[0].pr_detail_id,
      commit: 1,
    };
    const { validate } = validateFormDetail(modalData, [
      "edit_pr_detail_due_date",
    ]);
    if (validate) {
      const resp = await updatePRDueDateFormReport([prDetail], user_name);
      if (resp.success) {
        setModalVisible(false);
        setModalData([]);
        GetPR_Detail_by_MRP(mrp.mrp_id);
      } else {
        message.error("Error!.", resp);
      }
    } else {
      message.error("Error!. Please fill your form completely.");
    }
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


  const searchHook = useSearch({
    endpoint: `${process.env.REACT_APP_API_SERVER_V2}/purchase/po/search`,
    initialParams: {
      user_name: auth.user_name,
      filter: {
        create_date: undefined,
        due_date: undefined,
      },
    },
    debounceMs: 1000,
    mapResult: (res) => res,
    storageKey: "POState",
  });

  console.log("mrp.length :>> ", mrp);
  return (
    <div>
      <MainLayout {...config}>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane
            tab={
              <Badge count={BadgeCount}>
                <Text strong className="pd-right-2">
                  PR ทั่วไป
                </Text>
              </Badge>
            }
            key="1"
          >
            <Row gutter={24}>
              <Col span={6}>
                <PRList2 setBadgeCount={setBadgeCount} />
              </Col>
              <Col span={18}>
                <Row >
                  <Col span={24}>
                    <SearchPO
                      hook={searchHook}
                      initialUI={{
                        po: searchHook.params.filter?.po || "",
                        vendor: { label: searchHook.params?.filter?.selected_vendor?.label || searchHook.params?.filter?.vendor || "", value: "" },
                        request_by: { label: searchHook.params.filter?.request_by || "", value: "" },
                        create_date: [searchHook.params.filter?.create_date_start || null, searchHook.params.filter?.create_date_end],
                        due_date: [searchHook.params.filter?.due_date_start || null, searchHook.params.filter?.due_date_end],
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Table
                      columns={po_list_columns({
                        refSearchInput,
                        searchText,
                        setSearchText,
                        searchedColumn,
                        setSearchedColumn,
                      })}
                      dataSource={searchHook?.data}
                      rowKey={"po_id"}
                      loading={searchHook?.loading ? true : false}
                      onChange={onChange}
                      size="small"
                      pagination={false}
                      scroll={{ y: 480 }}
                      onRow={(record, rowIndex) => {
                        return {
                          onClick: (e) => {
                            setRowClick(true);
                            $(e.target)
                              .closest("tbody")
                              .find("tr")
                              .removeClass("selected-row");
                            $(e.target).closest("tr").addClass("selected-row");
                            keepLog.keep_log_action(record.po_no);
                            props.history.push({
                              pathname: "/purchase/po/" + record.po_id,
                            });
                            console.log("po click");
                          },
                        };
                      }}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Tabs.TabPane>
          <Tabs.TabPane tab="PR AUTO" key="2">
            <Row gutter={24}>
              <Col span={6}>
                <PRListAuto
                  setMrp={setMrp}
                  mrp={mrp}
                  GetPR_Detail_by_MRP={GetPR_Detail_by_MRP}
                />
              </Col>
              <Col span={18}>
                <Table
                  columns={mrp_list_detail({
                    refSearchInput,
                    searchText,
                    setSearchText,
                    searchedColumn,
                    setSearchedColumn,
                    editDueDate,
                  })}
                  dataSource={mrp.listMRP}
                  rowKey={"po_id"}
                  loading={listDataPo?.loading ? true : false}
                  onChange={onChange}
                  size="small"
                  pagination={{
                    pageSize,
                    current: page,
                    pageSizeOptions: ["15", "20", "30", "50", "100", "1000"],
                  }}
                  footer={() => (
                    <>
                      <Space level={24}>
                        <Button
                          size="small"
                          onClick={() => {
                            props.history.push({
                              pathname: "/purchase/po/new&" + mrp.mrp_no,
                            });
                          }}
                        //disabled={!countSelectPRAuto}
                        //className=''loading={rejectLoading}
                        >
                          Create PO With PR AUTO
                        </Button>
                      </Space>
                    </>
                  )}
                />
              </Col>
            </Row>
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <Badge>
                <Text strong className="pd-right-2">
                  Cancel PR Auto
                </Text>
              </Badge>
            }
            key="3"
          >
            <Row gutter={24}>
              <Col span={6}>
                <CancelPR />
              </Col>
            </Row>
          </Tabs.TabPane>
        </Tabs>
        <Modal
          title={
            <>
              <FormOutlined className="button-icon" />
              <span className="pd-left-1">Edit Due Date</span>
            </>
          }
          width={800}
          visible={modalVisible}
          destroyOnClose
          onCancel={onModalCancel}
          onOk={onModalOk}
          footer={[
            readOnly ? (
              <Button key="back" className={"primary"} onClick={onModalCancel}>
                Back
              </Button>
            ) : (
              <Popconfirm
                key="discard"
                icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                onConfirm={() => {
                  onModalCancel();
                }}
                title={
                  <Text strong>
                    {"Are you sure to "}
                    <span className="require">Discard</span>
                    {" ?"}
                  </Text>
                }
                okText="Yes"
                cancelText="No"
              >
                <Button key="back">Discard</Button>
              </Popconfirm>
            ),
            !readOnly && (
              <Popconfirm
                key="confirm"
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
                okText="Yes"
                cancelText="No"
              >
                <Button key="submit" className="primary">
                  Confirm
                </Button>
              </Popconfirm>
            ),
          ]}
        >
          <CustomTable
            columns={columnsEditDueDate(onChangeValue)}
            dataSource={modalData}
            focusLastPage={true}
            rowClassName="row-table-detail"
            rowKey={"id"}
          />
        </Modal>
      </MainLayout>
    </div>
  );
};

export default withRouter(PO);
