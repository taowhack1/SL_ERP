import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Input,
  Typography,
  Checkbox,
  Space,
  Switch,
  message,
} from "antd";
import MainLayout from "../../components/MainLayout";
import Comments from "../../components/Comments";
import {
  createNewItems,
  upDateItem,
} from "../../actions/inventory/itemActions";
import {
  item_detail_fields,
  item_fields,
  item_file,
  item_filling_detail_fields,
  item_formula_detail_fields,
  item_formula_part_fields,
  item_production_process_fields,
  item_qa_detail_fields,
  item_require_fields,
  item_weight_detail,
} from "./config/item";
import { validateFormHead } from "../../include/js/function_main";
import { getMasterDataItem } from "../../actions/inventory";
import { reducer } from "./reducers";
import Authorize from "../system/Authorize";
import { useHistory } from "react-router-dom";
import TabPanel from "./item/TabPanel";
import { get_all_vendor } from "../../actions/purchase/vendorActions";
import ItemFileUpload from "./item/ItemFileUpload";
import { get_qa_test_case_master } from "../../actions/qa/qaTestAction";
import { get_sale_master_data } from "../../actions/sales";
const { Text } = Typography;
const initialStateHead = item_fields;
const initialStateDetail = [item_detail_fields];
const initialStateFormula = [item_formula_detail_fields];
const initialStateQA = [item_qa_detail_fields];
const initialStateFilling = [item_filling_detail_fields];
const initialStateWeight = item_weight_detail;
const initialStateProductionProcess = [item_production_process_fields];
const initialStateFormulaPart = [item_formula_part_fields];
const ItemCreate = (props) => {
  const history = useHistory();
  const authorize = Authorize();
  authorize.check_authorize();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth.authData);
  useEffect(() => {
    dispatch(getMasterDataItem(auth.user_name));

    dispatch(get_all_vendor());
  }, []);

  const data = props.location.state ? props.location.state : 0;

  const [data_head, headDispatch] = useReducer(reducer, initialStateHead);
  const [data_detail, detailDispatch] = useReducer(reducer, initialStateDetail);
  const [data_formula_detail, formulaDetailDispatch] = useReducer(
    reducer,
    initialStateFormula
  );
  const [data_formula_part, formulaPartDetailDispatch] = useReducer(
    reducer,
    initialStateFormulaPart
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
  const [
    data_production_process_detail,
    productionProcessDetailDispatch,
  ] = useReducer(reducer, initialStateProductionProcess);

  const [data_file, setFile] = useState({
    item_image: null,
    certificate: {
      2: null,
      3: null,
      4: null,
      5: null,
      6: null,
    },
  });

  useEffect(() => {
    dispatch(get_sale_master_data());
    headDispatch({
      type: "SET_HEAD",
      payload:
        data && data.data_head
          ? { ...data.data_head, commit: 1, user_name: auth.user_name }
          : { ...item_fields, commit: 1, user_name: auth.user_name },
    });

    detailDispatch({
      type: "SET_DETAIL",
      payload:
        data && data.data_detail.length
          ? data.data_detail
          : [item_detail_fields],
    });
    formulaDetailDispatch({
      type: "SET_DETAIL",
      payload:
        data && data.data_formula_detail.length
          ? data.data_formula_detail
          : [item_formula_detail_fields],
    });
    productionProcessDetailDispatch({
      type: "SET_DETAIL",
      payload:
        data && data.data_process.length
          ? data.data_process
          : [item_production_process_fields],
    });
    qaDetailDispatch({
      type: "SET_DETAIL",
      payload:
        data && data.data_qa_detail.length
          ? data.data_qa_detail
          : [item_qa_detail_fields],
    });
    weightDetailDispatch({
      type: "SET_DETAIL",
      payload:
        data && data.data_weight_detail.length
          ? data.data_weight_detail
          : item_weight_detail,
    });
    fillingDetailDispatch({
      type: "SET_DETAIL",
      payload:
        data && data.data_filling_detail.length
          ? data.data_filling_detail
          : [item_filling_detail_fields],
    });
    setFile(data.data_file ?? item_file);
  }, []);

  const upDateFormValue = (data) => {
    headDispatch({ type: "CHANGE_HEAD_VALUE", payload: data });
  };
  const updateFile = (data, type) => {
    type === 1
      ? setFile({ ...data_file, ...data })
      : setFile({
          ...data_file,
          certificate: { ...data_file.certificate, ...data },
        });
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
      console.log("SAVE PROCESS", data_production_process_detail);
      console.log("SAVE WEIGHT", data_weight_detail);
      console.log("SAVE FILLING", data_filling_detail);
      const validate = validateFormHead(data_head, item_require_fields);
      // const validate = {
      //   validate: true,
      // };

      if (validate.validate) {
        const data = {
          access_right: {
            vendor: true,
            formula: true,
            process: true,
            qa: true,
            weight: true,
            filling_process: true,
            attach_file: true,
          },
          data_head: data_head,
          data_detail: data_detail,
          data_formula_detail: data_formula_detail,
          data_process: data_production_process_detail,
          data_qa_detail: data_qa_detail,
          data_weight_detail: data_weight_detail,
          data_filling_detail: data_filling_detail,
          data_file: data_file,
        };
        console.log("validate pass");
        data_head.item_id
          ? dispatch(
              upDateItem(
                data_head.item_id,
                data,
                auth.user_name,
                redirect_to_view
              )
            )
          : dispatch(createNewItems(data, auth.user_name, redirect_to_view));
      } else {
        message.warning({
          content: "Please fill your form completely.",
          key,
          duration: 2,
        });
      }
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

  console.log("SAVE HEAD", data_head);
  console.log("SAVE DETAIL", data_detail);
  console.log("SAVE QA", data_qa_detail);
  console.log("SAVE FORMULA", data_formula_detail);
  console.log("SAVE WEIGHT", data_weight_detail);
  console.log("SAVE FILLING", data_filling_detail);
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
                <strong style={{ color: "#FF8C00" }}>
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
                data_file={data_file}
                updateFile={updateFile}
                readOnly={false}
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
              data_file={data_file}
              updateFile={updateFile}
              data_head={data_head}
              headDispatch={headDispatch}
              data_detail={data_detail}
              detailDispatch={detailDispatch}
              // Formula
              data_formula_detail={data_formula_detail}
              formulaDetailDispatch={formulaDetailDispatch}
              data_formula_part={data_formula_part}
              formulaPartDetailDispatch={formulaPartDetailDispatch}
              // QA
              data_qa_detail={data_qa_detail}
              qaDetailDispatch={qaDetailDispatch}
              data_filling_detail={data_filling_detail}
              fillingDetailDispatch={fillingDetailDispatch}
              data_weight_detail={data_weight_detail}
              weightDetailDispatch={weightDetailDispatch}
              data_production_process_detail={data_production_process_detail}
              productionProcessDetailDispatch={productionProcessDetailDispatch}
              upDateFormValue={upDateFormValue}
              readOnly={false}
            />
          </Col>
        </Row>
      </div>
      <Comments data={[]} />
    </MainLayout>
  );
};

export default ItemCreate;
