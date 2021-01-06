import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
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
  item_packaging_detail_fields,
  item_formula_detail_fields,
  item_part_specification_detail_fields,
  item_part_specification_fields,
  item_qa_detail_fields,
  item_require_fields,
  item_weight_detail,
  item_part_mix_fields,
} from "./config/item";
import {
  sum2DArrOdjWithField,
  validateFormHead,
} from "../../include/js/function_main";
import { getMasterDataItem } from "../../actions/inventory";
import { reducer } from "./reducers";
import Authorize from "../system/Authorize";
import { useHistory } from "react-router-dom";
import TabPanel from "./item/TabPanel";
import { get_all_vendor } from "../../actions/purchase/vendorActions";
import ItemFileUpload from "./item/ItemFileUpload";
import { get_qa_test_case_master } from "../../actions/qa/qaTestAction";
import { get_sale_master_data } from "../../actions/sales";
import { getAllWorkCenter } from "../../actions/production/workCenterActions";
import { getAllMachine } from "../../actions/production/machineActions";
import ReducerClass from "../../include/js/ReducerClass";
import { ItemContext } from "../../include/js/context";
const { Text } = Typography;

const ItemCreate = (props) => {
  const initialStateHead = item_fields;
  const initialStateDetail = [item_detail_fields];
  const initialStateQA = [item_qa_detail_fields];
  const initialStatePackaging = [item_packaging_detail_fields];
  const initialStateWeight = item_weight_detail;

  const readOnly = false;
  const history = useHistory();
  const authorize = Authorize();
  authorize.check_authorize();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.authData);
  const itemList = useSelector((state) =>
    state.inventory.master_data.item_list.filter((item) =>
      [1, 2, 3, 4].includes(item.type_id)
    )
  );

  useEffect(() => {
    dispatch(getMasterDataItem(auth.user_name));
    dispatch(getAllWorkCenter());
    dispatch(get_all_vendor());
  }, []);

  const data = props.location.state ? props.location.state : 0;

  const [data_head, headDispatch] = useReducer(reducer, initialStateHead);
  const [data_detail, detailDispatch] = useReducer(reducer, initialStateDetail);

  const [data_qa_detail, qaDetailDispatch] = useReducer(
    reducer,
    initialStateQA
  );
  const [data_weight_detail, weightDetailDispatch] = useReducer(
    reducer,
    initialStateWeight
  );
  const [data_packaging_detail, packagingDetailDispatch] = useReducer(
    reducer,
    initialStatePackaging
  );
  const PartReducer = new ReducerClass(
    data.data_part,
    null,
    item_part_specification_fields
  );
  const PartDetailReducer = new ReducerClass(data.data_part_detail, null, [
    item_part_specification_detail_fields,
  ]);
  const PMReducer = new ReducerClass(data.data_part_mix, null, [
    item_part_mix_fields,
  ]);
  const FormulaReducer = new ReducerClass(data.data_formula, null, [
    item_formula_detail_fields,
  ]);
  PartReducer.setReducer("array");
  PartDetailReducer.setReducer("array");
  PMReducer.setReducer("array");
  FormulaReducer.setReducer("array");

  const [data_file, setFile] = useState({
    item_image: null,
    certificate: {
      2: null,
      3: null,
      4: null,
      5: null,
      6: null,
      7: null,
      8: null,
    },
  });

  const [formulaPercent, setPercent] = useState(0);
  const sumPercent = useCallback((data, field) => {
    return setPercent(sum2DArrOdjWithField(data, field));
  }, []);

  useEffect(() => {
    dispatch(get_sale_master_data());
    dispatch(getAllMachine());
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
    packagingDetailDispatch({
      type: "SET_DETAIL",
      payload:
        data && data.data_packaging_detail.length
          ? data.data_packaging_detail
          : [item_packaging_detail_fields],
    });

    PartReducer.setDataArray(data.data_part);
    PartDetailReducer.setDataArray2D(data.data_part_detail);
    PMReducer.setDataArray2D(data.data_part_mix);
    FormulaReducer.setDataArray2D(data.data_formula);
    sumPercent(data.data_formula, "item_formula_percent_qty");
    setFile(data.data_file ?? item_file);
  }, []);

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
      console.log("SAVE HEAD", data_head);
      console.log("SAVE VENDOR DETAIL", data_detail);
      console.log("SAVE PART", PartReducer.data);
      console.log("SAVE PART DETAIL", PartDetailReducer.data);
      console.log("SAVE PART MIX", PMReducer.data);
      console.log("SAVE FORMULA", FormulaReducer.data);
      console.log("SAVE QA", data_qa_detail);
      console.log("SAVE WEIGHT", data_weight_detail);
      console.log("SAVE PACKAGING", data_packaging_detail);
      console.log("SAVE FILES", data_file);

      const key = "validate";
      const validate = validateFormHead(data_head, item_require_fields);
      if (PartReducer.data.length > 1 && formulaPercent !== 100) {
        message.warning({
          content: "Please check Bulk Formula %(W/W) !!.",
          key,
          duration: 4,
        });
        return false;
      }
      if (validate.validate) {
        const data = {
          access_right: {
            vendor: true,
            formula: true,
            process: true,
            qa: true,
            weight: true,
            packaging: true,
            attach_file: true,
          },
          data_head: data_head,
          data_detail: data_detail,
          data_part: PartReducer.data,
          data_part_detail: PartDetailReducer.data,
          data_part_mix: PMReducer.data,
          data_formula: FormulaReducer.data,
          // data_process: data_production_process_detail,
          data_qa_detail: data_qa_detail,
          data_weight_detail: data_weight_detail,
          data_packaging_detail: data_packaging_detail,
          data_file: data_file,
        };
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
        return false;
      }
    },
    onEdit: (e) => {
      console.log("Edit");
    },
    onApprove: (e) => {
      console.log("Approve");
    },
    onConfirm: () => {
      console.log("Confirm");
    },
  };

  const upDateFormValue = (data) => {
    headDispatch({ type: "CHANGE_HEAD_VALUE", payload: data });
  };
  const updateFile = useCallback(
    (data, type) => {
      type === 1
        ? setFile({ ...data_file, ...data })
        : setFile({
            ...data_file,
            certificate: { ...data_file.certificate, ...data },
          });
    },
    [data_file]
  );

  const redirect_to_view = (id) => {
    history.push("/inventory/items/view/" + (id ? id : "new"));
  };

  useEffect(() => {
    data_head.type_id &&
      dispatch(get_qa_test_case_master(data_head.type_id, 1, 1, 1));
  }, [data_head.type_id]);

  const ContextValue = useMemo(() => {
    return {
      PartReducer,
      PartDetailReducer,
      PMReducer,
      FormulaReducer,
      readOnly,
      data_file,
      updateFile,
      RMList: itemList.filter((item) => item.type_id === 1),
      PKList: itemList.filter(
        (item) => item.type_id === 2 || item.type_id === 4
      ),
      BULKList: itemList.filter((item) => item.type_id === 3),
      formulaPercent,
      sumPercent,
    };
  }, [
    PartReducer,
    PartDetailReducer,
    PMReducer.data,
    FormulaReducer,
    readOnly,
    data_file,
    updateFile,
  ]);
  // console.log("initialStateHead ", initialStateHead);
  // console.log("Item Pre-run :", data_head.item_pre_run_no);
  return (
    <ItemContext.Provider value={ContextValue}>
      <MainLayout {...config}>
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
                    Pre-Running Item Code : [
                    {data_head.item_pre_run_no.join("")}]
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
                  onChange={(e) =>
                    upDateFormValue({ item_name: e.target.value })
                  }
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
                      upDateFormValue({
                        item_purchase: e.target.checked ? 1 : 0,
                      })
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
              {/* <FileContext.Provider value={{ data_file, updateFile }}> */}
              <TabPanel
                data_file={data_file}
                updateFile={updateFile}
                data_head={data_head}
                headDispatch={headDispatch}
                data_detail={data_detail}
                detailDispatch={detailDispatch}
                data_qa_detail={data_qa_detail}
                qaDetailDispatch={qaDetailDispatch}
                data_packaging_detail={data_packaging_detail}
                packagingDetailDispatch={packagingDetailDispatch}
                data_weight_detail={data_weight_detail}
                weightDetailDispatch={weightDetailDispatch}
                // data_production_process_detail={data_production_process_detail}
                // productionProcessDetailDispatch={
                //   productionProcessDetailDispatch
                // }
                upDateFormValue={upDateFormValue}
                readOnly={false}
              />
              {/* </FileContext.Provider> */}
            </Col>
          </Row>
        </div>
        <Comments data={[]} />
      </MainLayout>
    </ItemContext.Provider>
  );
};

export default React.memo(ItemCreate);
