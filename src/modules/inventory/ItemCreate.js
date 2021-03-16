import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
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
  Popconfirm,
} from "antd";
import MainLayout from "../../components/MainLayout";
import Comments from "../../components/Comments";
import {
  createNewItems,
  upDateItem,
} from "../../actions/inventory/itemActions";
import {
  item_vendor_fields,
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
  fillingProcessFields,
  itemQAFields,
  itemVendorFields,
  itemVendorDocumentFields,
} from "./config/item";
import {
  sortData,
  sortDataWithoutCommit,
  sum2DArrOdjWithField,
  validateFormHead,
} from "../../include/js/function_main";
import { getMasterDataItem } from "../../actions/inventory";
import { reducer } from "./reducers";
import Authorize from "../system/Authorize";
import { useHistory } from "react-router-dom";
import ItemTabList from "./item/ItemTabList";
import { get_all_vendor } from "../../actions/purchase/vendorActions";
import ItemFileUpload from "./item/ItemFileUpload";
import { get_qa_conditions_master } from "../../actions/qa/qaTestAction";
import { get_sale_master_data } from "../../actions/sales";
import { getAllWorkCenter } from "../../actions/production/workCenterActions";
import { getAllMachine } from "../../actions/production/machineActions";
import ReducerClass from "../../include/js/ReducerClass";
import { ItemContext } from "../../include/js/context";
import Barcode from "react-barcode";
import { convertDigit } from "../../include/js/main_config";
import { mainReducer } from "../../include/reducer";
import ItemRevisionDetail from "./item/ItemRevisionDetail";
import { getCountry } from "../../actions/hrm";
const { Text } = Typography;

const initialStateHead = {
  ...item_fields,
  qa_spec: sortData([itemQAFields]),
  pu_vendor: [itemVendorFields],
};
const initialStateDetail = [item_vendor_fields];
const initialStatePackaging = [item_packaging_detail_fields];
const initialStateWeight = item_weight_detail;
const initialStateFillingProcess = [fillingProcessFields];
const initialStatePart = [item_part_specification_fields];

const ItemCreate = (props) => {
  const qaFormRef = useRef();
  const vendorFormRef = useRef();
  const readOnly = false;
  const history = useHistory();
  const authorize = Authorize();
  authorize.check_authorize();
  const dispatch = useDispatch();
  const current_project = useSelector((state) => state.auth.currentProject);
  const auth = useSelector((state) => state.auth.authData);
  const { department_id } = useSelector((state) => state.auth.authData);
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
  // const [data_detail, detailDispatch] = useReducer(reducer, initialStateDetail);
  const [vendorFile, setVendorFile] = useState([itemVendorDocumentFields]);
  const [data_weight_detail, weightDetailDispatch] = useReducer(
    reducer,
    initialStateWeight
  );
  const [data_packaging_detail, packagingDetailDispatch] = useReducer(
    reducer,
    initialStatePackaging
  );
  const [statePart, statePartDispatch] = useReducer(
    mainReducer,
    initialStatePart
  );
  const [filling, setFilling] = useState(initialStateFillingProcess);

  const [data_file, setFile] = useState(item_file);

  const [formulaPercent, setPercent] = useState(0);

  useEffect(() => {
    dispatch(get_sale_master_data());
    dispatch(getAllMachine());
    dispatch(getCountry());
    console.log("data.data_head", data.data_head);
    headDispatch({
      type: "SET_HEAD",
      payload:
        data && data.data_head
          ? {
              ...data.data_head,
              commit: 1,
              user_name: auth.user_name,
              qa_spec:
                data.data_head.qa_spec.length <= 0
                  ? sortData([itemQAFields])
                  : data.data_head.qa_spec,
              pu_vendor:
                data.data_head?.pu_vendor?.length <= 0
                  ? []
                  : sortDataWithoutCommit(data.data_head.pu_vendor),
            }
          : { ...initialStateHead, commit: 1, user_name: auth.user_name },
    });
    console.log(
      " ISUS ",
      data?.data_head?.pu_vendor?.map((obj, key) => {
        return {
          id: key,
          certificate: obj.item_vendor_detail_document.certificate,
        };
      })
    );
    setVendorFile(
      data?.data_head?.pu_vendor?.map((obj, key) => {
        return {
          id: key,
          certificate: obj.item_vendor_detail_document.certificate,
        };
      }) || [itemVendorDocumentFields]
    );
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
    statePartDispatch({
      type: "SET_ARRAY",
      payload: data.data_part ?? [item_part_specification_fields],
    });
    setFile(data.data_file ?? item_file);
    setFilling(data.data_filling ?? []);
  }, []);

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
      console.log(
        "SAVE VENDOR DETAIL",
        vendorFormRef.current && JSON.parse(vendorFormRef.current?.value)
      );
      console.log("SAVE PART", statePart);
      // console.log("SAVE QA", data_qa_detail);
      console.log("SAVE WEIGHT", data_weight_detail);
      console.log("SAVE PACKAGING", data_packaging_detail);
      console.log("SAVE FILES", data_file);
      console.log("SAVE FILLING", filling);

      const key = "validate";
      const validate = validateFormHead(data_head, item_require_fields);
      console.log("formulaPercent", formulaPercent);
      if (
        statePart.length > 1 &&
        convertDigit(formulaPercent, 4) !== convertDigit(100, 4)
      ) {
        message.warning({
          content: "Please check Bulk Formula %(W/W) !!.",
          key,
          duration: 4,
        });
        return false;
      }
      // if (
      //   department_id === 13 &&
      //   [1, 2].includes(data_head.type_id) &&
      //   !data_detail[0].vendor_id
      // ) {
      //   console.log("Purchase Person");
      //   message.warning({
      //     content: 'Please fill "Purchase Vendor" form completely.',
      //     key,
      //     duration: 4,
      //   });
      //   return false;
      // }
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
            filling: true,
          },
          data_head: data_head,
          data_detail:
            vendorFormRef.current && vendorFormRef.current?.value
              ? JSON.parse(vendorFormRef.current.value).map((obj, key) => {
                  return {
                    ...obj,
                    item_vendor_detail_document: vendorFile[key],
                  };
                })
              : [],
          data_part: statePart,
          data_qa_detail:
            qaFormRef.current && qaFormRef.current?.value
              ? JSON.parse(qaFormRef.current.value)
              : [],
          data_weight_detail: data_weight_detail,
          data_packaging_detail: data_packaging_detail,
          data_file: data_file,
          data_filling: filling,
        };
        console.log("saveeeeeee", data);
        if (data_head.isChangeRevision || !data_head.item_id) {
          if (data?.data_head?.uom_conversion?.length)
            data.data_head.uom_conversion.map((obj) => {
              return { ...obj, commit: 1, user_name: auth.user_name };
            });
          dispatch(createNewItems(data, auth.user_name, redirect_to_view));
        } else {
          dispatch(
            upDateItem(
              data_head.item_id,
              data,
              auth.user_name,
              redirect_to_view
            )
          );
        }
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
    console.log("upDateFormValue", data);
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
  const updateFileVendor = (headId, fileList) => {
    setVendorFile(
      vendorFile.map((obj) =>
        obj.id === headId ? { ...obj, certificate: fileList } : obj
      )
    );
  };
  const addVendorFile = () => {
    setVendorFile(sortData([...vendorFile, itemVendorDocumentFields]));
  };
  const delVendorFile = (vendorId) => {
    setVendorFile(
      vendorFile.map((obj) =>
        obj.id === vendorId ? { ...obj, active: 0 } : obj
      )
    );
  };

  const sumPercent = () => {
    console.log("sumPercent", statePart);
    return setPercent(
      sum2DArrOdjWithField(
        statePart.map((obj) => obj.item_formula),
        "item_formula_percent_qty"
      )
    );
  };
  const redirect_to_view = (id) => {
    history.push("/inventory/items/view/" + (id ? id : "new"));
  };

  useEffect(() => {
    data_head.type_id &&
      dispatch(get_qa_conditions_master(data_head.type_id, 1, 1, 1));
  }, [data_head.type_id]);

  const ContextValue = useMemo(() => {
    return {
      statePart,
      statePartDispatch,
      filling,
      setFilling,
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
      saveForm: upDateFormValue,
      data_head,
      qaFormRef,
      vendorFormRef,
      vendorFile,
      updateFileVendor,
      addVendorFile,
      delVendorFile,
    };
  }, [
    statePart,
    statePartDispatch,
    filling,
    setFilling,
    readOnly,
    data_file,
    updateFile,
    upDateFormValue,
    data_head,
    qaFormRef,
    vendorFormRef,
    vendorFile,
    updateFileVendor,
    addVendorFile,
    delVendorFile,
  ]);

  useEffect(() => {
    sumPercent();
  }, [statePart.length]);
  console.log("vendorFile", vendorFile);
  return (
    <ItemContext.Provider value={ContextValue}>
      <MainLayout {...config}>
        <div id="form">
          <Row className="col-2">
            <Col span={19}>
              <Row>
                <Col span={24}>
                  <h2>
                    <strong>
                      {data_head.item_no ? "Edit" : "Create"} Item
                    </strong>
                  </h2>
                </Col>
              </Row>
              <Row className={"col-2 row-margin-vertical"}>
                <Col span={24}>
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
              </Row>
              <Row className={"col-2 row-margin-vertical"}>
                <Col span={24}>
                  <h3>
                    <strong>
                      <span className="require">* </span>Description Name
                    </strong>
                  </h3>
                </Col>
              </Row>
              <Row>
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
              </Row>
              <Row className={"col-2 row-margin-vertical"}>
                <Col span={24}>
                  <div style={{ marginLeft: 10, marginTop: 10 }}>
                    <Space align="baseline">
                      <Checkbox
                        name="item_sale"
                        checked={data_head.item_sale}
                        onChange={(e) =>
                          upDateFormValue({
                            item_sale: e.target.checked ? 1 : 0,
                          })
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
                    {/* {data_head.item_no && (
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
                    )} */}
                  </div>
                </Col>
              </Row>
            </Col>
            <Col span={1}></Col>
            <Col span={4} className="text-center">
              {/* BARCODE */}
              <Row className={"col-2 row-margin-vertical"}>
                <Col span={24} className={"text-right"}>
                  {data_head.item_no && (
                    <Barcode
                      value={data_head.item_no}
                      width={1}
                      height={50}
                      fontSize={14}
                    />
                  )}
                </Col>
              </Row>
              <Row className={"col-2 row-margin-vertical"}>
                <Col span={24} className={"text-left"}>
                  <ItemFileUpload
                    data_file={data_file}
                    updateFile={updateFile}
                    readOnly={false}
                    maxFile={1}
                    file_type_id={1}
                    upload_type={"Card"}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          {data_head.item_id && data_head.type_id <= 4 ? (
            <ItemRevisionDetail
              data_head={data_head}
              readOnly={readOnly}
              upDateFormValue={upDateFormValue}
            />
          ) : null}
          <Row>
            <Col span={24}>
              <ItemTabList
                data_file={data_file}
                updateFile={updateFile}
                data_head={data_head}
                headDispatch={headDispatch}
                data_packaging_detail={data_packaging_detail}
                packagingDetailDispatch={packagingDetailDispatch}
                data_weight_detail={data_weight_detail}
                weightDetailDispatch={weightDetailDispatch}
                upDateFormValue={upDateFormValue}
                readOnly={false}
              />
            </Col>
          </Row>
        </div>
        <Comments data={[]} />
      </MainLayout>
    </ItemContext.Provider>
  );
};

export default React.memo(ItemCreate);
