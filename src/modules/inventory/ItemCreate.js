import React, { useEffect, useReducer, useState } from "react";
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
} from "../../actions/inventory/itemActions";
import {
  item_detail_fields,
  item_fields,
  item_filling_detail_fields,
  item_formula_detail_fields,
  item_qa_detail_fields,
  item_require_fields,
  item_vendor_require_fields,
  item_weight_detail,
} from "./config/item";
import {
  getNameById,
  get_pre_run_no,
  validateFormDetail,
  validateFormHead,
} from "../../include/js/function_main";
import $ from "jquery";
import { getMasterDataItem } from "../../actions/inventory";
import { UploadOutlined } from "@ant-design/icons";
import CustomSelect from "../../components/CustomSelect";
import { item_vendor_columns } from "./config/item";
import { reducer } from "./reducers";
import { numberFormat } from "../../include/js/main_config";
import Authorize from "../system/Authorize";
import { useHistory } from "react-router-dom";
import TabPanel from "./item/TabPanel";
import { get_all_vendor } from "../../actions/purchase/vendorActions";
import ItemFileUpload from "./item/ItemFileUpload";
import { get_qa_test_case_master } from "../../actions/qa/qaTestAction";
import { get_sale_master_data } from "../../actions/sales";
const { Option } = Select;
const { TextArea } = Input;
const { Title, Paragraph, Text } = Typography;
const initialStateHead = item_fields;
const initialStateDetail = [item_detail_fields];
const initialStateFormula = [item_formula_detail_fields];
const initialStateQA = [item_qa_detail_fields];
const initialStateFilling = [item_filling_detail_fields];
const initialStateWeight = item_weight_detail;

const reader = new FileReader();
const formData = new FormData();
const ItemCreate = (props) => {
  const history = useHistory();
  const authorize = Authorize();
  authorize.check_authorize();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMasterDataItem());

    dispatch(get_all_vendor());
  }, []);

  const auth = useSelector((state) => state.auth.authData);
  const data = props.location.state ? props.location.state : 0;

  const [data_head, headDispatch] = useReducer(reducer, initialStateHead);
  const [data_detail, detailDispatch] = useReducer(reducer, initialStateDetail);
  const [data_formula_detail, formulaDetailDispatch] = useReducer(
    reducer,
    initialStateFormula
  );
  const [data_qa_detail, qaDetailDispatch] = useReducer(
    reducer,
    initialStateQA
  );
  const [data_weight_detail, weightDetailDispatch] = useReducer(
    reducer,
    initialStateWeight
  );
  const [data_filling_detail, fillingDetailDispatch] = useReducer(
    reducer,
    initialStateFilling
  );
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    dispatch(get_sale_master_data());
    headDispatch({
      type: "SET_HEAD",
      payload: data.data_head
        ? { ...data.data_head, commit: 1, user_name: auth.user_name }
        : { ...item_fields, commit: 1, user_name: auth.user_name },
    });

    detailDispatch({
      type: "SET_DETAIL",
      payload: data.data_detail ? data.data_detail : [item_detail_fields],
    });
  }, []);

  const upDateFormValue = (data) => {
    headDispatch({ type: "CHANGE_HEAD_VALUE", payload: data });
  };

  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: [
      "Home",
      "Items",
      data_head.item_no ? "Edit" : "Create",
      data_head.item_no &&
        "[ " + data_head.item_no + " ] " + data_head.item_name,
    ],
    search: false,
    buttonAction: ["Save", "Discard"],
    create: "",

    save: "function",
    discard: "/inventory/items",
    onSave: (e) => {
      console.log("Save");
      const key = "validate";
      console.log("SAVE HEAD", data_head);
      console.log("SAVE DETAIL", data_detail);
      console.log("SAVE QA", data_qa_detail);
      console.log("SAVE FORMULA", data_formula_detail);
      console.log("SAVE WEIGHT", data_weight_detail);
      console.log("SAVE FILLING", data_filling_detail);
      // const validate = validateFormHead(data_head, item_require_fields);
      // if (validate.validate) {
      //   console.log("pass");
      //   data_head.item_id
      //     ? dispatch(
      //         upDateItem(
      //           data_head.item_id,
      //           data_head,
      //           data_detail,
      //           fileList,
      //           redirect_to_view
      //         )
      //       )
      //     : dispatch(
      //         createNewItems(data_head, data_detail, fileList, redirect_to_view)
      //       );
      // } else {
      //   message.warning({
      //     content: "Please fill your form completely.",
      //     key,
      //     duration: 2,
      //   });
      // }
    },
    onEdit: (e) => {
      //e.preventDefault();
      console.log("Edit");
    },
    onApprove: (e) => {
      //e.preventDefault();
      console.log("Approve");
    },
    onConfirm: () => {
      console.log("Confirm");
    },
  };
  const redirect_to_view = (id) => {
    history.push("/inventory/items/view/" + (id ? id : "new"));
  };
  useEffect(() => {
    data_head.type_id && dispatch(get_qa_test_case_master(data_head.type_id));
  }, [data_head.type_id]);

  console.log("data_head", data_head);
  return (
    <MainLayout {...config} data={data_head}>
      <div id="form">
        <Row className="col-2">
          <Col span={11}>
            <h2>
              <strong>{data_head.item_no ? "Edit" : "Create"} Item</strong>
            </h2>
            <h3 style={{ marginBottom: 8 }}>
              {data_head.item_no ? (
                <strong>Item Code # {data_head.item_no}</strong>
              ) : (
                <strong>
                  Pre-Running Item Code : [{data_head.item_pre_run_no.join("")}]
                </strong>
              )}
            </h3>
          </Col>
          <Col span={2}></Col>
          <Col span={3}></Col>
          <Col span={8} style={{ textAlign: "right" }}>
            {/* BARCODE */}
          </Col>
        </Row>

        <Row className="col-2">
          <Col span={19} style={{ marginBottom: 8 }}>
            <h3>
              <strong>
                <span className="require">* </span>Description Name
              </strong>
            </h3>
            <Col span={24}>
              <Input
                name="item_name"
                placeholder={"Description Name"}
                onChange={(e) => upDateFormValue({ item_name: e.target.value })}
                value={data_head.item_name}
              />
            </Col>
            <div style={{ marginLeft: 10, marginTop: 10 }}>
              <Space align="baseline">
                <Checkbox
                  name="item_sale"
                  checked={data_head.item_sale}
                  onChange={(e) =>
                    upDateFormValue({ item_sale: e.target.checked ? 1 : 0 })
                  }
                />
                <Text>Can be sold</Text>
              </Space>
              <br />
              <Space align="baseline">
                <Checkbox
                  name="item_purchase"
                  checked={data_head.item_purchase}
                  onChange={(e) =>
                    upDateFormValue({ item_purchase: e.target.checked ? 1 : 0 })
                  }
                />
                <Text>Can be purchase</Text>
              </Space>
              {data_head.item_no && (
                <Space
                  align="baseline"
                  style={{ float: "right", marginRight: 10 }}
                >
                  <Text strong>Active</Text>
                  <Switch
                    name="item_actived"
                    checkedChildren={""}
                    unCheckedChildren={""}
                    checked={data_head.item_actived}
                    style={{ width: 35 }}
                    onClick={(data) =>
                      upDateFormValue({ item_actived: data ? 1 : 0 })
                    }
                  />
                </Space>
              )}
            </div>
          </Col>
          <Col span={1}></Col>
          <Col span={4}>
            <div>
              <ItemFileUpload
                fileList={fileList}
                readOnly={false}
                maxFile={1}
                setFileList={setFileList}
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
              headDispatch={headDispatch}
              data_detail={data_detail}
              detailDispatch={detailDispatch}
              data_formula_detail={data_formula_detail}
              formulaDetailDispatch={formulaDetailDispatch}
              data_qa_detail={data_qa_detail}
              qaDetailDispatch={qaDetailDispatch}
              data_filling_detail={data_filling_detail}
              fillingDetailDispatch={fillingDetailDispatch}
              data_weight_detail={data_weight_detail}
              weightDetailDispatch={weightDetailDispatch}
              upDateFormValue={upDateFormValue}
              readOnly={false}
            />
          </Col>
        </Row>
      </div>
      <Comments data={dataComments} />
    </MainLayout>
  );
};

export default ItemCreate;
