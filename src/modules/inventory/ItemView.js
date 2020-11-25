import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Input,
  Tabs,
  Radio,
  Select,
  AutoComplete,
  Typography,
  InputNumber,
  Checkbox,
  Space,
  Switch,
  message,
  Upload,
  Button,
} from "antd";
import MainLayout from "../../components/MainLayout";
import moment from "moment";
import Line from "../../components/VendorLine";
import {
  autoCompleteUser,
  locationData,
  autoCompleteUnit,
} from "../../data/inventoryData";
import Comments from "../../components/Comments";
import { dataComments } from "../../data";
import Barcode from "react-barcode";
import { vendorColumns, vendors, companys } from "../../data/itemData";
import {
  getSelectDetail,
  createNewItems,
  upDateItem,
  item_actions,
} from "../../actions/inventory/itemActions";
import { item_fields } from "./config/item";
import { getNameById } from "../../include/js/function_main";
import $ from "jquery";
import { getMasterDataItem } from "../../actions/inventory";
import {
  BorderOutlined,
  CheckSquareOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import CustomSelect from "../../components/CustomSelect";
import { item_vendor_columns } from "./config/item";
import numeral from "numeral";
import Authorize from "../system/Authorize";
import ItemPreview from "./item/ItemFileUpload";
import TabPanel from "./item/TabPanel";
import { get_log_by_id } from "../../actions/comment&log";
import ModalRemark from "../../components/Modal_Remark";

const { Option } = Select;
const { TextArea } = Input;
const { Title, Paragraph, Text } = Typography;
const ItemView = (props) => {
  const authorize = Authorize();
  authorize.check_authorize();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.authData);
  const {
    data_head,
    data_detail,
    data_formula_detail,
    data_qa_detail,
    data_weight_detail,
    data_filling_detail,
    data_file,
  } = useSelector((state) => state.inventory.item);

  const dataComment = useSelector((state) => state.log.comment_log);
  const [remark, setRemark] = useState("");
  const [openRemarkModal, setOpenRemarkModal] = useState({
    visible: false,
    loading: false,
  });
  const flow =
    data_head.data_flow_process &&
    data_head.data_flow_process.map((step) => {
      return step.all_group_in_node;
    });
  const changeProcessStatus = (process_status_id) => {
    if (remark.trim() === "") {
      alert("Plase write remark");
      return false;
    }
    setOpenRemarkModal({ visible: false, loading: false });
    const app_detail = {
      process_status_id: process_status_id,
      user_name: auth.user_name,
      process_id: data_head.process_id,
      process_member_remark: remark,
    };
    message.success({ content: "Reject", key: "validate", duration: 1 });
    dispatch(item_actions(app_detail, data_head.item_id));
    setRemark("");
  };

  useEffect(() => {
    dispatch(getMasterDataItem());
  }, []);
  useEffect(() => {
    console.log("GET_LOG");
    data_head.process_id && dispatch(get_log_by_id(data_head.process_id));
  }, [data_head]);

  // const data_head = useSelector(state=>state.inventory.item.item_head);
  // const data_detail = useSelector(state=>state.inventory.item.item_detail);

  const callback = (key) => {};

  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: [
      "Home",
      "Items",
      "View",
      data_head.item_no &&
        "[ " + data_head.item_no + " ] " + data_head.item_name,
    ],
    search: false,
    buttonAction: [
      data_head.button_edit && "Edit",
      data_head.button_confirm && "Confirm",
      data_head.button_approve && "Approve",
      data_head.button_reject && "Reject",
      "Back",
    ],
    create: "",
    edit: {
      data: {
        data_head: data_head,
        data_detail: data_detail,
        data_formula_detail: data_formula_detail,
        data_qa_detail: data_qa_detail,
        data_weight_detail: data_weight_detail,
        data_filling_detail: data_filling_detail,
        data_file: data_file,
      },
      path: data_head && "/inventory/items/edit/" + data_head.item_id,
    },
    step: {
      current: data_head.node_stay - 1,
      step: flow,
      process_complete: data_head.process_complete,
    },
    // save: "function",
    discard: "/inventory/items",
    back: "/inventory/items",
    onSave: (e) => {
      //e.preventDefault();
      console.log("Save");
    },
    onEdit: (e) => {
      //e.preventDefault();
      console.log("Edit");
    },
    onApprove: (e) => {
      const app_detail = {
        process_status_id: 5,
        user_name: auth.user_name,
        process_id: data_head.process_id,
        process_member_remark: remark,
      };
      dispatch(item_actions(app_detail, data_head.item_id));
    },
    onConfirm: () => {
      const app_detail = {
        process_status_id: 2,
        user_name: auth.user_name,
        process_id: data_head.process_id,
      };
      dispatch(item_actions(app_detail, data_head.item_id));
      console.log("Confirm");
    },
    onReject: () => {
      console.log("Reject");
      setOpenRemarkModal({
        visible: true,
        loading: false,
      });
    },
    onCancel: () => {
      console.log("Cancel");
      const app_detail = {
        process_status_id: 3,
        user_name: auth.user_name,
        process_id: data_head.process_id,
      };
      dispatch(item_actions(app_detail, data_head.item_id));
    },
  };
  console.log("SAVE HEAD", data_head);
  console.log("SAVE DETAIL", data_detail);
  console.log("SAVE QA", data_qa_detail);
  console.log("SAVE FORMULA", data_formula_detail);
  console.log("SAVE WEIGHT", data_weight_detail);
  console.log("SAVE FILLING", data_filling_detail);
  return (
    <MainLayout {...config}>
      <div id="form">
        <Row className="col-2">
          <Col span={11}>
            {/* <h2>
              <strong>{data_head.item_no ? "Edit" : "Create"} Item</strong>
            </h2> */}
            <h3 style={{ marginBottom: 8 }}>
              {data_head.item_no && (
                <strong>
                  Item Code {data_head.item_no ? "#" + data_head.item_no : "-"}
                </strong>
              )}
            </h3>
          </Col>
          <Col span={2}></Col>
          <Col span={3}></Col>
          <Col span={8} style={{ textAlign: "right" }}>
            {/* <Barcode
              value={data_head.item_barcode}
              width={1.5}
              height={30}
              fontSize={14}
            /> */}
          </Col>
        </Row>
        <Row className="col-2">
          <Col span={19} style={{ marginBottom: 15 }}>
            <h3>
              <strong>Description Name</strong>
            </h3>
            <Text className="item_name text-view">
              {data_head.item_name ? data_head.item_name : "-"}
            </Text>
            <Col span={24} style={{ marginLeft: 5, marginTop: 10 }}>
              <Space align="baseline">
                {data_head.item_sale ? (
                  <CheckSquareOutlined />
                ) : (
                  <BorderOutlined />
                )}
                <Text>Can be sold</Text>
              </Space>
              <br />
              <Space align="baseline">
                {data_head.item_purchase ? (
                  <CheckSquareOutlined />
                ) : (
                  <BorderOutlined />
                )}
                <Text>Can be purchase</Text>
              </Space>

              {data_head.item_no && (
                <Space
                  align="baseline"
                  style={{ float: "right", marginRight: 10 }}
                >
                  <Text strong>Active</Text>
                  <Switch
                    checkedChildren={""}
                    unCheckedChildren={""}
                    disabled
                    checked={data_head.item_actived}
                    style={{ width: 35 }}
                  />
                </Space>
              )}
            </Col>
          </Col>
          <Col span={1}></Col>
          <Col span={4}>
            <div>
              <ItemPreview
                data_file={data_file}
                // updateFile={updateFile}
                readOnly={true}
                maxFile={1}
                file_type_id={1}
                upload_type={"Card"}
              />
            </div>
          </Col>
        </Row>

        <Row className="col-2 row-tab-margin">
          <Col span={24}>
            <TabPanel
              data_head={data_head}
              data_detail={data_detail}
              data_formula_detail={data_formula_detail}
              data_qa_detail={data_qa_detail}
              data_weight_detail={data_weight_detail}
              data_filling_detail={data_filling_detail}
              data_file={data_file}
              // headDispatch={headDispatch}
              // detailDispatch={detailDispatch}
              // upDateFormValue={upDateFormValue}
              readOnly={true}
            />
          </Col>
        </Row>
      </div>
      <ModalRemark
        title={"Remark"}
        state={openRemarkModal}
        onChange={setRemark}
        onOk={() => {
          changeProcessStatus(6);
        }}
        onCancel={() => {
          setOpenRemarkModal({ visible: false, loading: false });
          setRemark("");
        }}
      />
      <Comments data={dataComment} />
    </MainLayout>
  );
};

export default ItemView;
